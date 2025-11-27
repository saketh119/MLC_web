// Server route for robots.txt that disallows everything by default and explicitly
// allows the five public pages we want indexed. This relies on modern robots
// parsing (Google supports Allow + $ for exact-match patterns).
const SITE = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://example.com'

export async function GET() {
  const body = [
    'User-agent: *',
    'Disallow: /',
    // Allow exact pages (Google supports $ as end-of-string anchor)
    'Allow: /$',
    'Allow: /About$',
    'Allow: /events$',
    'Allow: /blogs$',
    'Allow: /contact$',
    '',
    `Sitemap: ${SITE.replace(/\/$/, '')}/sitemap.xml`
  ].join('\n')

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  })
}
