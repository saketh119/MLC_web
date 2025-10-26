import dbConnect from '@/lib/mongodb';
import Event from '@/models/Event';

export async function GET() {
  try {
    await dbConnect();

    // Load all events and pick the nearest upcoming event by date.
    const docs = await Event.find({}).lean();

    const now = new Date();

    // Helper to extract a usable Date object from common field shapes
    function parseEventDate(e) {
      const raw = e?.date || e?.Date || e?.eventDate || e?.EventDate || null;
      if (!raw) return null;
      // If it's already a Date object
      if (raw instanceof Date) return raw;
      // Try numeric (timestamp)
      if (typeof raw === 'number') return new Date(raw);
      // Try string
      const parsed = new Date(raw);
      return isNaN(parsed.getTime()) ? null : parsed;
    }

    const upcoming = docs
      .map(d => ({
        original: d,
        parsedDate: parseEventDate(d),
      }))
      .filter(x => x.parsedDate && x.parsedDate >= now)
      .sort((a, b) => a.parsedDate - b.parsedDate)
      .map(x => x.original)[0] || null;

    if (!upcoming) {
      return new Response(JSON.stringify(null), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Map common field names to a small canonical shape the frontend can rely on
    const mapped = {
      _id: upcoming._id,
      title: upcoming['Event Name'] || upcoming.title || upcoming.name || null,
      description: upcoming.Description || upcoming.description || null,
      date: (upcoming.date || upcoming.Date) ? new Date(upcoming.date || upcoming.Date).toISOString() : null,
      imageUrl: upcoming['Image Url'] || (Array.isArray(upcoming.imageUrls) && upcoming.imageUrls[0]) || upcoming.imageUrl || upcoming.image || null,
      registerLink: upcoming.registerLink || upcoming.register_link || upcoming['Register Link'] || upcoming.register || upcoming.registerUrl || upcoming.registerurl || null,
    };

    return new Response(JSON.stringify(mapped), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error in upcoming event route:', err);
    return new Response(JSON.stringify({ error: 'Failed to fetch upcoming event' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
