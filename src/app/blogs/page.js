export const dynamic = 'force-dynamic'

import ClientBlogs from './ClientBlogs'
import './styles.css'
import { FEEDS, fetchFeed } from '@/lib/blogs'

export default async function BlogsIndex() {
  const defaultFeed = FEEDS[0]
  let initialItems = []
  let initialMerged = []
  try {
    if (defaultFeed?.url) {
      initialItems = await fetchFeed(defaultFeed.url)
    }

    // fetch all feeds and merge for the "All Recent" view
    const allResults = await Promise.all(FEEDS.map(f => (f.url ? fetchFeed(f.url).catch(() => []) : [])))
    allResults.forEach((items, i) => items.forEach(it => initialMerged.push({ ...it, source: FEEDS[i]?.title || FEEDS[i]?.id })) )
    initialMerged.sort((a, b) => new Date(b.published || 0).getTime() - new Date(a.published || 0).getTime())
  } catch (err) {
    console.warn('BlogsIndex server fetch failed', err?.message || err)
    initialItems = initialItems || []
    initialMerged = initialMerged || []
  }

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      <ClientBlogs initialActiveId={defaultFeed?.id} initialItems={initialItems} initialMerged={initialMerged} />
    </div>
  )
}
