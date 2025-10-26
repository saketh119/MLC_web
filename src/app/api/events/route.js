import dbConnect from '@/lib/mongodb';
import Event from '@/models/Event';

export async function GET() {
  try {
    // Ensure mongoose connection (uses MONGODB_URI from env)
    await dbConnect();

  // Return events sorted by creation time (newest first)
  const events = await Event.find({}).sort({ createdAt: -1 }).lean();

    return new Response(JSON.stringify(events), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error fetching events:', err);
    return new Response(JSON.stringify({ error: 'Failed to fetch events' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
