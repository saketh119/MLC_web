/**
 * Migration tool to normalize event date fields into a single `date` ISODate field
 * Usage:
 *  node scripts/normalizeEventDates.js --dry-run
 *  node scripts/normalizeEventDates.js      (apply changes)
 */
const dbConnect = require('../src/lib/mongodb').default;

function parseDate(raw) {
  if (!raw) return null;
  if (raw instanceof Date) return raw;
  if (typeof raw === 'number') return new Date(raw);
  const parsed = new Date(raw);
  return isNaN(parsed.getTime()) ? null : parsed;
}

(async () => {
  const args = process.argv.slice(2);
  const dry = args.includes('--dry-run') || args.includes('-d');

  try {
    const conn = await dbConnect();
    const db = conn.connection.db;
    console.log('Connected to DB:', db.databaseName);

    const col = db.collection('Events');
    const cursor = col.find({ $or: [{ date: { $type: 'string' } }, { Date: { $exists: true } }] });

    const toUpdate = [];
    while (await cursor.hasNext()) {
      const doc = await cursor.next();
      const raw = doc.date || doc.Date || doc['Date'] || doc.eventDate || doc['Event Date'];
      const parsed = parseDate(raw);
      if (parsed) {
        toUpdate.push({ _id: doc._id, parsed });
      } else {
        console.log('Could not parse date for', doc._id, 'raw=', raw);
      }
    }

    console.log('Found', toUpdate.length, 'documents to update');
    if (dry) {
      console.log('Dry run — not applying changes');
      process.exit(0);
    }

    for (const u of toUpdate) {
      await col.updateOne({ _id: u._id }, { $set: { date: u.parsed } });
      console.log('Updated', u._id, '->', u.parsed.toISOString());
    }

    console.log('Migration complete');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed', err);
    process.exit(2);
  }
})();
