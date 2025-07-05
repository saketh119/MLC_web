import dbConnect from '@/lib/mongodb';
import Image from '@/models/Image';

export async function GET(request) {
  try {
    await dbConnect();
    const images = await Image.find().sort({ createdAt: -1 });
    return new Response(JSON.stringify(images), {
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
