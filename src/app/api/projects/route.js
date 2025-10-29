import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import cache from '@/lib/cache';

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const page = Math.max(1, parseInt(url.searchParams.get('page') || '1', 10));
    const limit = Math.min(50, Math.max(1, parseInt(url.searchParams.get('limit') || '12', 10)));
    const skip = (page - 1) * limit;

    const cacheKey = `projects:page:${page}:limit:${limit}`;
    const cached = await cache.getCache(cacheKey);
    if (cached) {
      return new Response(JSON.stringify(cached), { status: 200, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=60', 'X-Cache': 'HIT' } });
    }

    await dbConnect();
    const [projects, total] = await Promise.all([
      Project.find({}, { title: 1, description: 1, githubUrl: 1 }).skip(skip).limit(limit).lean(),
      Project.countDocuments(),
    ]);

  const payload = { projects, page, limit, total };
  // Cache projects list for 5 minutes
  await cache.setCache(cacheKey, payload, 5 * 60 * 1000);

  return new Response(JSON.stringify(payload), { status: 200, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=300', 'X-Cache': 'MISS' } });
  } catch (err) {
    console.error('Error fetching projects:', err);
    return new Response(JSON.stringify({ error: 'Failed to fetch projects' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
