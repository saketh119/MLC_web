import { fetchFeed, FEEDS } from '../../../lib/blogs'

export default async function BlogView({ feedIndex }) {
  const feed = FEEDS[feedIndex]
  const items = await fetchFeed(feed.url)

  return (
    <section>
      <h2>{feed.title}</h2>
      <p style={{ color: '#666', marginTop: 6 }}>Posts from {feed.title}</p>
      <div style={{ marginTop: 12 }}>
        {items.length === 0 ? (
          <div className="no-posts">No posts found.</div>
        ) : (
          <div className="posts-list">
            {items.map((p, i) => (
              <article key={i} className="post">
                {p.thumb && <img src={p.thumb} className="thumb" alt="" />}
                <div className="post-body">
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
