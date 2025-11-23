const fs = require('fs');
const mongoose = require('mongoose');

async function main() {
  const env = fs.readFileSync('.env.local', 'utf8');
  const line = env.split(/\r?\n/).find(l => l.trim().startsWith('MONGODB_URI='));
  if (!line) {
    console.error('No MONGODB_URI found in .env.local');
    process.exit(1);
  }
  const uri = line.split('=').slice(1).join('=');

  await mongoose.connect(uri);
  const db = mongoose.connection;

  const doc = {
    name: 'Seeded Test Event',
    description: 'This event was added by a local seed script for testing the events page.',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24),
    imageUrls: ['https://images.unsplash.com/photo-1522199710521-72d69614c702?w=1200&q=80&auto=format&fit=crop'],
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const result = await db.collection('Events').insertOne(doc);
  console.log('Inserted event id:', result.insertedId.toString());
  await mongoose.disconnect();
}

main().catch(err => { console.error(err); process.exit(1); });
