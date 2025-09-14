import dbConnect from '@/lib/mongodb';
import Image from '@/models/Image';

export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q')?.trim();
    const limit = Math.min(parseInt(searchParams.get('limit') || '50', 10) || 50, 100);
    const skip = parseInt(searchParams.get('skip') || '0', 10) || 0;

    const filter = {};
    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: 'i' } },
        { filename: { $regex: q, $options: 'i' } },
      ];
    }

    const [items, total] = await Promise.all([
      Image.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Image.countDocuments(filter),
    ]);

    const images = items.map((img) => ({
      ...img.toObject(),
      servedUrl: img.fileId ? `/api/images/${img.fileId.toString()}` : (img.imageUrl || null),
    }));

    return new Response(JSON.stringify({ images, total, limit, skip }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching images:', error);
    return new Response(JSON.stringify({ error: 'Fetch failed' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400 });
    }
    const { title = '', imageUrl } = body;
    if (!imageUrl || typeof imageUrl !== 'string') {
      return new Response(JSON.stringify({ error: 'imageUrl is required' }), { status: 400 });
    }

    const doc = await Image.create({ title, imageUrl });
    const payload = { ...doc.toObject(), servedUrl: imageUrl };
    return new Response(JSON.stringify(payload), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating image:', error);
    return new Response(JSON.stringify({ error: 'Create failed' }), { status: 500 });
  }
}
