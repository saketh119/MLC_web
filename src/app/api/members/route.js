import dbConnect from '@/lib/mongodb';
import Member from '@/models/members';

export async function GET(req) {
  await dbConnect();

  try {
    const members = await Member.find({});
    return new Response(JSON.stringify(members), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching members:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
