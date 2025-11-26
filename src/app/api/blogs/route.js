import { NextResponse } from 'next/server'
import { FEEDS, fetchFeed } from '@/lib/blogs'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    const feed = FEEDS.find(f => f.id === id) || FEEDS[0]
    const items = await fetchFeed(feed.url)
    return NextResponse.json({ success: true, feed: { id: feed.id, title: feed.title }, items })
  } catch (err) {
    console.error('API /api/blogs error', err)
    return NextResponse.json({ success: false, items: [] }, { status: 500 })
  }
}
