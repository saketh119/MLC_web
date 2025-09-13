import dbConnect from '@/lib/mongodb';
import Member from '@/models/members';
import Event from '@/models/Event';

export async function POST() {
  try {
    await dbConnect();

    const members = [
      { name: 'Jane Doe', role: 'President', image: '', linkedin: '', category: 'Core Team' },
      { name: 'John Smith', role: 'Vice President', image: '', linkedin: '', category: 'Core Team' },
    ];

    const events = [
      { name: 'Intro to ML', description: 'Kickoff session', date: new Date(), imageUrls: [] },
    ];

    const [m, e] = await Promise.all([
      Member.insertMany(members, { ordered: false }).catch(() => []),
      Event.insertMany(events, { ordered: false }).catch(() => []),
    ]);

    return new Response(
      JSON.stringify({ ok: true, inserted: { members: m.length || 0, events: e.length || 0 } }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, error: err?.message || 'Seed failed' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
