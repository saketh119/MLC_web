import dbConnect from '@/lib/mongodb';
import Event from '@/models/Event';


export async function GET() {
  await dbConnect();

  try {
    const events = await Event.find().sort({ date: -1 });
    return new Response(JSON.stringify(events), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('❌ Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch events' }), {
      status: 500,
    });
  }
}
