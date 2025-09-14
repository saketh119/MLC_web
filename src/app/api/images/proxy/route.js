import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';

export const runtime = 'nodejs';

const REGION = process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || 'eu-north-1';
const BUCKET = process.env.AWS_S3_BUCKET; // optional if url param is used

const s3 = new S3Client({
  region: REGION,
  // Credentials should come from env (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY)
});

function deriveBucketAndKeyFromUrl(urlStr) {
  try {
    const u = new URL(urlStr);
    // Virtual-hosted style: <bucket>.s3.<region>.amazonaws.com/<key>
    const hostParts = u.hostname.split('.');
    let bucket = null;
    if (hostParts.length >= 4 && hostParts[1] === 's3') {
      bucket = hostParts[0];
    }
    const key = decodeURIComponent(u.pathname.replace(/^\//, ''));
    return { bucket, key };
  } catch {
    return { bucket: null, key: null };
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  let key = searchParams.get('key');
  const urlParam = searchParams.get('url');

  let bucket = BUCKET || null;
  if (!key && urlParam) {
    const derived = deriveBucketAndKeyFromUrl(urlParam);
    key = derived.key;
    if (!bucket) bucket = derived.bucket;
  }

  if (!bucket || !key) {
    return new Response(JSON.stringify({ error: 'Missing bucket or key' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const res = await s3.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
    const headers = {
      'Content-Type': res.ContentType || 'application/octet-stream',
      'Cache-Control': 'public, max-age=604800, s-maxage=604800, stale-while-revalidate=86400',
    };
    if (res.ETag) headers['ETag'] = res.ETag;
    if (res.LastModified) headers['Last-Modified'] = new Date(res.LastModified).toUTCString();
    return new Response(res.Body, { headers });
  } catch (err) {
    const code = err?.$metadata?.httpStatusCode || 500;
    const msg = err?.name === 'NoSuchKey' || code === 404 ? 'Not Found' : 'S3 Fetch Error';
    console.error('S3 proxy error:', err);
    return new Response(msg, { status: code >= 400 && code < 600 ? code : 500 });
  }
}
