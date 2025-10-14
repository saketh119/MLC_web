import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("MLC");
    const events = await db.collection("events").find({}).toArray();

    return Response.json(events);
  } catch (err) {
    console.error("Error fetching events:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch events" }), {
      status: 500,
    });
  }
}
