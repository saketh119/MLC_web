'use client'
import { useEffect, useState } from 'react'
import { FEEDS } from '@/lib/blogs'

export default function ClientBlogs({ initialActiveId = FEEDS[0]?.id || '', initialItems = [], initialMerged = [] }) {
  const [activeId, setActiveId] = useState(initialActiveId || FEEDS[0]?.id || '')
  const [items, setItems] = useState(initialItems || [])
  const [activePost, setActivePost] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!activeId) return

    // If we were provided initial items for the activeId on mount, skip fetching
    if (activeId === initialActiveId && Array.isArray(initialItems) && initialItems.length > 0) {
      // ensure items state is set (it already is via initialItems), and don't fetch
      return
    }

    setLoading(true)
    setError(null)
    fetch(`/api/blogs?id=${encodeURIComponent(activeId)}`)
      .then(r => r.json())
      .then((data) => {
        if (data && data.items) setItems(data.items)
        else setItems([])
      })
      .catch((err) => {
        console.error('ClientBlogs fetch error', err)
        setError('Failed to load')
        setItems([])
      })
      .finally(() => setLoading(false))
  }, [activeId, initialActiveId, initialItems])

  return (
    <div>
      {activePost && <PostModal post={activePost} onClose={() => setActivePost(null)} />}
      <header className="topbar">
        <nav className="menu">
          {FEEDS.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveId(f.id)}
              className={`menu-item ${f.id === activeId ? 'active' : ''}`}
              style={{ cursor: 'pointer' }}
            >
              {f.title}
            </button>
          ))}
          <button onClick={() => setActiveId('all')} className={`menu-item ${activeId === 'all' ? 'active' : ''}`}>All Recent</button>
        </nav>
      </header>

      <main className="blog-container">
        <div style={{ marginTop: 12 }}>
          {activeId === 'all' ? (
            <AllFeedsView initialMerged={initialMerged} />
          ) : (
            <section>
              <h2>{FEEDS.find(f => f.id === activeId)?.title}</h2>
              <p style={{ color: '#666', marginTop: 6 }}>Posts from {FEEDS.find(f => f.id === activeId)?.title}</p>
              <div style={{ marginTop: 12 }}>
                {loading ? <div className="no-posts">Loading…</div> : error ? <div className="no-posts">{error}</div> : (
                  items.length === 0 ? <div className="no-posts">No posts found.</div> : (
                    <div className="posts-list">
                      {items.map((p, i) => (
                        <article key={i} className="post">
                          {p.thumb && <img src={p.thumb} className="thumb" alt="" />}
                          <div className="post-body">
                            <h3>
                              <button onClick={() => setActivePost(p)} style={{ all: 'unset', cursor: 'pointer', color: 'inherit' }}>
                                {p.title}
                              </button>
                            </h3>
                            <time>{p.published ? new Date(p.published).toLocaleString() : ''}</time>
                            <p>{p.summary}</p>
                            <div style={{ marginTop: 8 }}>
                              <a href={p.link} target="_blank" rel="noreferrer" className="text-indigo-400 text-sm">View</a>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  )
                )}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  )
}

function AllFeedsView({ initialMerged = [] }) {
  const [merged, setMerged] = useState(initialMerged || [])
  const [loading, setLoading] = useState(initialMerged && initialMerged.length > 0 ? false : true)

  useEffect(() => {
    let mounted = true

    // If server provided merged items, use them and skip fetch
    if (initialMerged && initialMerged.length > 0) {
      setMerged(initialMerged)
      setLoading(false)
      return () => { mounted = false }
    }

    Promise.all(FEEDS.map(f => fetch(`/api/blogs?id=${encodeURIComponent(f.id)}`).then(r => r.json()).then(d => d.items || []).catch(() => [])))
      .then(results => {
        if (!mounted) return
        const merged = []
        results.forEach((items, i) => items.forEach(it => merged.push({ ...it, source: FEEDS[i].title })))
        merged.sort((a,b) => new Date(b.published).getTime() - new Date(a.published).getTime())
        setMerged(merged)
      })
      .catch(() => {})
      .finally(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [initialMerged])

  if (loading) return <div className="no-posts">Loading…</div>
  if (!merged || merged.length === 0) return <div className="no-posts">No posts found.</div>
  return (
    <div className="posts-list">
      {merged.map((p, idx) => (
        <article key={idx} className="post">
          <div className="post-body">
            <div style={{ color: '#666', fontSize: 13 }}>{p.source}</div>
            <h3><a href={p.link} target="_blank" rel="noreferrer">{p.title}</a></h3>
            <time>{p.published ? new Date(p.published).toLocaleString() : ''}</time>
            <p>{p.summary}</p>
            <div style={{ marginTop: 8 }}>
              <a href={p.link} target="_blank" rel="noreferrer" className="text-indigo-400 text-sm">View</a>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

// Modal to show full post HTML
function PostModal({ post, onClose }) {
  if (!post) return null
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 60 }}>
      <div style={{ width: '90%', maxWidth: 900, maxHeight: '90vh', overflow: 'auto', background: '#0b0b0b', padding: 20, borderRadius: 12, color: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h2 style={{ margin: 0 }}>{post.title}</h2>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#ccc', cursor: 'pointer' }}>Close</button>
        </div>
        <div style={{ color: '#999', marginBottom: 12 }}>{post.published ? new Date(post.published).toLocaleString() : ''}</div>
        <div dangerouslySetInnerHTML={{ __html: post.content }} style={{ color: '#ddd' }} />
      </div>
    </div>
  )
}
