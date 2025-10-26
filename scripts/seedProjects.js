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
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
      env[m[1]] = v;
    }
  }
  return env;
}

async function main() {
  const env = loadEnv('.env.local');
  const uri = env.MONGODB_URI || process.env.MONGODB_URI;
  const dbName = env.MONGODB_DB || process.env.MONGODB_DB || 'MLC';
  if (!uri) {
    console.error('No MONGODB_URI found.');
    process.exit(2);
  }

  const client = new MongoClient(uri, { maxPoolSize: 5 });
  try {
    await client.connect();
    const db = client.db(dbName);
    const projects = [
      { title: 'MLC Website', description: 'This website for the Machine Learning Club. Built with Next.js and Tailwind.', githubUrl: 'https://github.com/saketh119/MLC_web' },
      { title: 'Image Classifier', description: 'A simple CNN image classifier project using TensorFlow.', githubUrl: 'https://github.com/saketh119/image-classifier' },
      { title: 'Robotics Demo', description: 'Autonomous robotics demo integrating ROS and perception modules.', githubUrl: 'https://github.com/saketh119/robotics-demo' }
    ];

    const res = await db.collection('Projects').insertMany(projects, { ordered: false });
    console.log('Inserted projects:', res.insertedCount);
  } catch (err) {
    console.error('Failed to seed projects:', err.message);
  } finally {
    await client.close();
  }
}

main();
