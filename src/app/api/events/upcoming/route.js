import dbConnect from '@/lib/mongodb';
import Event from '@/models/Event';
import cache from '@/lib/cache';

const CACHE_KEY = 'upcoming:event:v1';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function parseEventDate(e) {
  const raw = e?.date || e?.Date || e?.eventDate || e?.EventDate || null;
  if (!raw) return null;
  if (raw instanceof Date) return raw;
  if (typeof raw === 'number') return new Date(raw);
  const parsed = new Date(raw);
  return isNaN(parsed.getTime()) ? null : parsed;
}

export async function GET() {
  try {
  const cached = await cache.getCache(CACHE_KEY);
  if (cached) return new Response(JSON.stringify(cached), { status: 200, headers: { 'Content-Type': 'application/json', 'X-Cache': 'HIT' } });

    await dbConnect();

    // First try a DB-side query assuming date is stored as a Date type
    let doc = null;
    try {
      doc = await Event.findOne({ date: { $gte: new Date() } }).sort({ date: 1 }).lean();
    } catch (e) {
      // ignore and fallback
      doc = null;
    }

    // Fallback: if DB-side query returned nothing, scan documents and parse date strings
    if (!doc) {
      const docs = await Event.find({}, { name: 1, title: 1, description: 1, Date: 1, date: 1, imageUrls: 1, "Image Url": 1, registerLink: 1, register_link: 1 }).lean();
      const now = Date.now();
      const found = docs
        .map(d => ({ original: d, parsedDate: parseEventDate(d) }))
        .filter(x => x.parsedDate && x.parsedDate.getTime() >= now)
        .sort((a, b) => a.parsedDate - b.parsedDate)[0];
      doc = found ? found.original : null;
    }

    if (!doc) {
      await cache.setCache(CACHE_KEY, null, CACHE_TTL);
      return new Response(JSON.stringify(null), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    const mapped = {
      _id: doc._id,
      title: doc['Event Name'] || doc.title || doc.name || null,
      description: doc.Description || doc.description || null,
      date: (doc.date || doc.Date) ? new Date(doc.date || doc.Date).toISOString() : null,
      imageUrl: doc['Image Url'] || (Array.isArray(doc.imageUrls) && doc.imageUrls[0]) || doc.imageUrl || doc.image || null,
      registerLink: doc.registerLink || doc.register_link || doc['Register Link'] || doc.register || doc.registerUrl || doc.registerurl || null,
    };

  await cache.setCache(CACHE_KEY, mapped, CACHE_TTL);
  return new Response(JSON.stringify(mapped), { status: 200, headers: { 'Content-Type': 'application/json', 'X-Cache': 'MISS' } });
  } catch (err) {
    console.error('Error in upcoming event route:', err);
    return new Response(JSON.stringify({ error: 'Failed to fetch upcoming event' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
