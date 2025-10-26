const fs = require('fs');
const { MongoClient } = require('mongodb');

function loadEnv(path) {
  if (!fs.existsSync(path)) return {};
  const content = fs.readFileSync(path, 'utf8');
  const lines = content.split(/\r?\n/);
  const env = {};
  for (const line of lines) {
    const m = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) {
      let v = m[2];
      // strip optional surrounding quotes
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        v = v.slice(1, -1);
      }
      env[m[1]] = v;
    }
  }
  return env;
}

async function main() {
  const env = loadEnv('.env.local');
  const uri = env.MONGODB_URI || process.env.MONGODB_URI;
  if (!uri) {
    console.error('No MONGODB_URI found in .env.local or environment.');
    process.exit(2);
  }

  const client = new MongoClient(uri, { maxPoolSize: 5 });
  try {
    await client.connect();
    console.log('Connected to MongoDB (not printing URI)');

    // List databases
    const admin = client.db().admin();
    const { databases } = await admin.listDatabases();

    for (const dbInfo of databases) {
      const dbName = dbInfo.name;
      try {
        const db = client.db(dbName);
        const cols = await db.listCollections({}, { nameOnly: true }).toArray();
        const colNames = cols.map(c => c.name);
        const targets = ['Events', 'events'];
        const intersect = targets.filter(t => colNames.includes(t));
        if (intersect.length === 0) continue;

        console.log(`\nDatabase: ${dbName}`);
        for (const col of intersect) {
          const collection = db.collection(col);
          const count = await collection.countDocuments();
          console.log(`  Collection '${col}': ${count} document(s)`);
          if (count > 0) {
            // print up to 3 full sample documents so we can inspect field names
            const samples = await collection.find({}).limit(3).toArray();
            console.log('   sample docs (up to 3):');
            samples.forEach((s, i) => {
              console.log(`     [${i}]`, s);
            });
          }
        }
      } catch (err) {
        // ignore per-db errors
        console.error('Error checking db', dbInfo.name, err.message);
      }
    }

    console.log('\nDone.');
  } catch (err) {
    console.error('Failed to query MongoDB:', err.message);
    process.exit(3);
  } finally {
    await client.close();
  }
}

main();
