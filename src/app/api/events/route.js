import dbConnect from '@/lib/mongodb';
import Event from '@/models/Event';
import cache from '@/lib/cache';

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const page = Math.max(1, parseInt(url.searchParams.get('page') || '1', 10));
    const limit = Math.min(50, Math.max(1, parseInt(url.searchParams.get('limit') || '12', 10)));
    const skip = (page - 1) * limit;

    const cacheKey = `events:page:${page}:limit:${limit}`;
    const cached = await cache.getCache(cacheKey);
    if (cached) {
      return new Response(JSON.stringify(cached), { status: 200, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=30' } });
    }

    await dbConnect();
    // Only select necessary fields for list view
    const [events, total] = await Promise.all([
      Event.find({}, { name: 1, title: 1, description: 1, date: 1, Date: 1, imageUrls: 1, "Image Url": 1 }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Event.countDocuments(),
    ]);

    const payload = { events, page, limit, total };
    await cache.setCache(cacheKey, payload, 30 * 1000);

    return new Response(JSON.stringify(payload), { status: 200, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=30' } });
  } catch (err) {
    console.error('Error fetching events:', err);
    return new Response(JSON.stringify({ error: 'Failed to fetch events' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
