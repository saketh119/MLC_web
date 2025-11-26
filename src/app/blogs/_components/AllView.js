import { FEEDS, fetchFeed } from '../../../lib/blogs'

export default async function AllView() {
  const results = await Promise.all(FEEDS.map(f => fetchFeed(f.url).catch(() => [])))
  const merged = []
  results.forEach((items, i) => items.forEach((it) => merged.push({ ...it, source: FEEDS[i].title })))
  merged.sort((a,b) => new Date(b.published).getTime() - new Date(a.published).getTime())

  return (
    <section>
      <h2>All Recent Posts</h2>
      <div style={{ marginTop: 12 }}>
        {merged.length === 0 ? <div className="no-posts">No posts found.</div> : (
          <div className="posts-list">
            {merged.map((p, idx) => (
              <article key={idx} className="post">
                <div className="post-body">
                  <div style={{ color: '#666', fontSize: 13 }}>{p.source}</div>
                  <h3><a href={p.link} target="_blank" rel="noreferrer">{p.title}</a></h3>
                  <time>{p.published ? new Date(p.published).toLocaleString() : ''}</time>
                  <p>{p.summary}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
