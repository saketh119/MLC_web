export const metadata = { robots: { index: false, follow: false } }
export const dynamic = 'force-dynamic'

import Header from '../_components/Header'
import BlogView from '../_components/BlogView'
import { FEEDS } from '../../../lib/blogs'

export default async function BlogPage({ params }) {
  const feedIndex = FEEDS.findIndex(f => f.id === params.id)
  if (feedIndex === -1) {
    return (
      <div>
        <Header feeds={FEEDS} activeId={FEEDS[0].id} />
        <main className="blog-container"><p>Blog not found.</p></main>
      </div>
    )
  }

  return (
    <div>
      <Header feeds={FEEDS} activeId={params.id} />
      <main className="blog-container">
        <BlogView feedIndex={feedIndex} />
      </main>
    </div>
  )
}
