'use client'
import Link from 'next/link'

export default function Header({ feeds, activeId }) {
  return (
    <header className="topbar">
      <div className="brand">My Blog Hub</div>
      <nav className="menu">
        {feeds.map((f) => (
          <Link key={f.id} href={`/blogs/${f.id}`} className={`menu-item ${f.id === activeId ? 'active' : ''}`}>
            {f.title}
          </Link>
        ))}
        <Link href="/blogs/all" className="menu-item">All Recent</Link>
      </nav>
    </header>
  )
}
