import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';

export async function GET() {
  try {
    await dbConnect();
    const projects = await Project.find({}).lean();

    return new Response(JSON.stringify(projects), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error fetching projects:', err);
    return new Response(JSON.stringify({ error: 'Failed to fetch projects' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
