/**
 * One-off script to create helpful MongoDB indexes.
 * Usage: node scripts/createIndexes.js
 * Make sure .env.local contains MONGODB_URI and optional MONGODB_DB
 */
// Create indexes using mongoose directly so this script can run under Node CJS
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// Try to load env from process, otherwise parse .env.local manually
let MONGODB_URI = process.env.MONGODB_URI;
let MONGODB_DB = process.env.MONGODB_DB || undefined;
if (!MONGODB_URI) {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const raw = fs.readFileSync(envPath, 'utf8');
    raw.split(/\r?\n/).forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const eq = trimmed.indexOf('=');
      if (eq === -1) return;
      const key = trimmed.slice(0, eq).trim();
      const val = trimmed.slice(eq + 1).trim();
      if (key === 'MONGODB_URI') MONGODB_URI = val.replace(/(^\"|\"$)/g, '');
      if (key === 'MONGODB_DB') MONGODB_DB = val.replace(/(^\"|\"$)/g, '');
    });
  }
}

if (!MONGODB_URI) {
  console.error('MONGODB_URI not set in environment or .env.local');
  process.exit(2);
}

(async () => {
  try {
    const opts = MONGODB_DB ? { dbName: MONGODB_DB } : {};
    const conn = await mongoose.connect(MONGODB_URI, opts);
    const db = conn.connection.db;
    console.log('Connected to DB:', db.databaseName);

    const events = db.collection('Events');
    await events.createIndex({ date: 1 });
    console.log('Created index on Events.date');
    await events.createIndex({ createdAt: -1 });
    console.log('Created index on Events.createdAt');

    const members = db.collection('members');
    await members.createIndex({ category: 1 });
    console.log('Created index on members.category');

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Index creation failed:', err);
    try { await mongoose.disconnect(); } catch(e){}
    process.exit(2);
  }
})();
