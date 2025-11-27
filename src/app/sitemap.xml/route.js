// Server route that returns a sitemap.xml containing only the allowed pages
const SITE = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://example.com'

export async function GET() {
  const pages = [
    '/',
    '/About',
    '/events',
    '/blogs',
    '/contact'
  ]

  const urls = pages.map((p) => {
    const loc = `${SITE.replace(/\/$/, '')}${p}`
    return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>daily</changefreq>\n    <priority>0.7</priority>\n  </url>`
  }).join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=0, s-maxage=86400'
    }
  })
}
