import dbConnect from '@/lib/mongodb';
import ImageModel from '@/models/Image';
import { v2 as cloudinary } from 'cloudinary';

export const runtime = 'nodejs';

function ensureCloudinaryConfigured() {
  const { CLOUDINARY_URL, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
  if (CLOUDINARY_URL) {
    cloudinary.config({ secure: true });
    return;
  }
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    throw new Error('Cloudinary env missing. Set CLOUDINARY_URL or CLOUDINARY_CLOUD_NAME/API_KEY/API_SECRET');
  }
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true,
  });
}

export async function POST(req) {
  await dbConnect();
  ensureCloudinaryConfigured();

  try {
    const form = await req.formData();
    const file = form.get('file');
    const title = form.get('title') || '';
    if (!file || typeof file === 'string') {
      return new Response(JSON.stringify({ error: 'file is required' }), { status: 400 });
    }

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload using Cloudinary upload_stream
    const folder = process.env.CLOUDINARY_FOLDER || 'mlc_events';
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
      stream.end(buffer);
    });

    const doc = await ImageModel.create({
      title,
      imageUrl: uploadResult.secure_url,
      filename: uploadResult.public_id,
      contentType: file.type || uploadResult.resource_type,
      length: uploadResult.bytes,
    });

    const servedUrl = uploadResult.secure_url;
    return new Response(JSON.stringify({ ...doc.toObject(), servedUrl, public_id: uploadResult.public_id }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Cloudinary upload error:', err);
    return new Response(JSON.stringify({ error: 'Cloud upload failed' }), { status: 500 });
  }
}
