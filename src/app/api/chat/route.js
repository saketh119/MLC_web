// Chat API removed — this route returns 410 Gone to indicate the chatbot feature is no longer available.
export async function POST() {
  return new Response(JSON.stringify({ error: 'Chat API removed' }), {
    status: 410,
    headers: { 'Content-Type': 'application/json' },
  })
}

export async function GET() {
  return new Response(JSON.stringify({ error: 'Chat API removed' }), {
    status: 410,
    headers: { 'Content-Type': 'application/json' },
  })
}
