/**
 * One-off script to create helpful MongoDB indexes.
 * Usage: node scripts/createIndexes.js
 * Make sure .env.local contains MONGODB_URI and optional MONGODB_DB
 */
const dbConnect = require('../src/lib/mongodb').default;

(async () => {
  try {
    const conn = await dbConnect();
    const db = conn.connection.db;
    console.log('Connected to DB:', db.databaseName);

    // Create index on events.date for faster upcoming queries
    const events = db.collection('Events');
    await events.createIndex({ date: 1 });
    console.log('Created index on Events.date');

    // Index for members.category (if filtering by category later)
    const members = db.collection('members');
    await members.createIndex({ category: 1 });
    console.log('Created index on members.category');

    process.exit(0);
  } catch (err) {
    console.error('Index creation failed:', err);
    process.exit(2);
  }
})();
