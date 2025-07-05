// src/app/api/upload/route.js

import dbConnect from '@/lib/mongodb';
import Image from '@/models/Image';

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const { title, imageUrl } = body;

    if (!title || !imageUrl) {
      return new Response(
        JSON.stringify({ error: 'Title and imageUrl are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const image = await Image.create({ title, imageUrl });

    return new Response(JSON.stringify(image), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Upload error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to upload image' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
