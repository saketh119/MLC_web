import dbConnect, { getBucket } from '@/lib/mongodb';
import Image from '@/models/Image';

export async function GET(request) {
  try {
    await dbConnect();
    const images = await Image.find().sort({ createdAt: -1 });
    // Attach servedUrl for GridFS-stored files
    const mapped = images.map((img) => ({
      ...img.toObject(),
      servedUrl: img.fileId ? `/api/images/${img.fileId.toString()}` : (img.imageUrl || null),
    }));
    return new Response(JSON.stringify(mapped), {
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
