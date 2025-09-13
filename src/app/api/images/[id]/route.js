import dbConnect, { getBucket } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(_req, { params }) {
  await dbConnect();
  const { id } = params;
  try {
    const bucket = getBucket();
    const _id = new ObjectId(id);
    const files = await bucket.find({ _id }).toArray();
    if (!files.length) {
      return new Response('Not Found', { status: 404 });
    }

    const file = files[0];
    const stream = bucket.openDownloadStream(_id);

    return new Response(stream, {
      headers: {
        'Content-Type': file.contentType || 'application/octet-stream',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (e) {
    console.error('Image stream error', e);
    return new Response('Server Error', { status: 500 });
  }
}