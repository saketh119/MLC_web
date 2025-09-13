import dbConnect from '@/lib/mongodb';

export async function GET() {
  try {
    const conn = await dbConnect();
    const dbName = conn?.connection?.db?.databaseName || 'unknown';
    return new Response(
      JSON.stringify({ ok: true, db: dbName }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, error: err?.message || 'Failed to connect' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
