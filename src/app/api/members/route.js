import dbConnect from '@/lib/mongodb';
import Member from '@/models/members';
import cache from '@/lib/cache';

export async function GET(req) {
  await dbConnect();

  try {
    const url = new URL(req.url);
    const page = Math.max(1, parseInt(url.searchParams.get('page') || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get('limit') || '12', 10)));
    const skip = (page - 1) * limit;

    const cacheKey = `members:page:${page}:limit:${limit}`;
    const cached = await cache.getCache(cacheKey);
    if (cached) {
      return new Response(JSON.stringify(cached), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=300',
          'X-Cache': 'HIT',
        },
      });
    }

    // Return only necessary fields and use .lean() to improve performance
    const [members, total] = await Promise.all([
      Member.find({}, { name: 1, role: 1, image: 1, linkedin: 1, category: 1 }).skip(skip).limit(limit).lean(),
      Member.countDocuments(),
    ]);

    const payload = { members, page, limit, total };
    // Cache members page for 5 minutes
    await cache.setCache(cacheKey, payload, 5 * 60 * 1000);

    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300',
        'X-Cache': 'MISS',
      },
    });
  } catch (error) {
    console.error('Error fetching members:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
