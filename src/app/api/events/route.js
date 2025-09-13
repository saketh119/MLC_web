import dbConnect from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function GET() {
  try {
    const conn = await dbConnect();
    const db = conn.connection.db;

    // Prefer explicit collection to preserve legacy keys like "Event Name", "Image Url"
    let docs = await db.collection('Events').find({}).toArray();
    if (!docs || docs.length === 0) {
      // Fallback to lowercase collection name
      try {
        docs = await db.collection('events').find({}).toArray();
      } catch {}
    }

    // Friendly sort by whichever date field exists (date or Date)
    const sorted = [...(docs || [])].sort((a, b) => {
      const ad = new Date(a?.date || a?.Date || 0).getTime() || 0;
      const bd = new Date(b?.date || b?.Date || 0).getTime() || 0;
      return bd - ad; // desc
    });

    return new Response(JSON.stringify(sorted), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('❌ Error fetching events:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch events' }), {
      status: 500,
    });
  }
}
