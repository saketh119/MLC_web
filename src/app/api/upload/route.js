// src/app/api/upload/route.js

import dbConnect, { getBucket } from '@/lib/mongodb';
import Image from '@/models/Image';

export const runtime = 'nodejs';

export async function POST(req) {
  await dbConnect();
  try {
    const form = await req.formData();
    const title = form.get('title') || '';
    const file = form.get('file');

    if (!file || typeof file === 'string') {
      return new Response(JSON.stringify({ error: 'file is required' }), { status: 400 });
    }

    const bucket = getBucket();
    const filename = file.name || 'upload.bin';
    const contentType = file.type || 'application/octet-stream';
    const stream = file.stream();

    const uploadStream = bucket.openUploadStream(filename, { contentType });
    await new Promise((resolve, reject) => {
      stream.pipe(uploadStream)
        .on('error', reject)
        .on('finish', resolve);
    });

    const doc = await Image.create({
      title,
      fileId: uploadStream.id,
      filename,
      contentType,
    });

    const servedUrl = `/api/images/${uploadStream.id.toString()}`;
    return new Response(JSON.stringify({ ...doc.toObject(), servedUrl }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Upload error:', error);
    return new Response(JSON.stringify({ error: 'Failed to upload image' }), { status: 500 });
  }
}