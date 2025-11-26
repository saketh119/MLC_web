// Helper to fetch Blogger JSON feeds server-side
// FEEDS can be configured via environment variables (optional). If not provided,
// the defaults below are used.
const DEFAULT_FEEDS = [
  { id: 'blog1', title: 'Machine Learning', url: 'https://www.blogger.com/feeds/3098659665837158971/posts/default?alt=json&max-results=500' },
  { id: 'blog2', title: 'Computer Vision', url: 'https://www.blogger.com/feeds/7286100166298856936/posts/default?alt=json&max-results=500' },
  { id: 'blog3', title: 'NLP', url: 'https://www.blogger.com/feeds/6340235081924820757/posts/default?alt=json&max-results=500' },
  { id: 'blog4', title: 'Deep Learning', url: 'https://www.blogger.com/feeds/1558655629692182154/posts/default?alt=json&max-results=500' }
]

function envOr(defaultVal, envName) {
  try {
    const v = process.env?.[envName]
    return v && v.length > 0 ? v : defaultVal
  } catch (e) {
    return defaultVal
  }
}

export const FEEDS = [
  {
    id: 'blog1',
    title: envOr(DEFAULT_FEEDS[0].title, 'BLOG_FEED_1_TITLE'),
    url: envOr(DEFAULT_FEEDS[0].url, 'BLOG_FEED_1_URL'),
  },
  {
    id: 'blog2',
    title: envOr(DEFAULT_FEEDS[1].title, 'BLOG_FEED_2_TITLE'),
    url: envOr(DEFAULT_FEEDS[1].url, 'BLOG_FEED_2_URL'),
  },
  {
    id: 'blog3',
    title: envOr(DEFAULT_FEEDS[2].title, 'BLOG_FEED_3_TITLE'),
    url: envOr(DEFAULT_FEEDS[2].url, 'BLOG_FEED_3_URL'),
  },
  {
    id: 'blog4',
    title: envOr(DEFAULT_FEEDS[3].title, 'BLOG_FEED_4_TITLE'),
    url: envOr(DEFAULT_FEEDS[3].url, 'BLOG_FEED_4_URL'),
  },
]

/**
 * Server-side fetch for a Blogger JSON feed. Uses Next's fetch cache revalidation
 * by returning `fetch(url, { next: { revalidate } })`.
 */
export async function fetchFeed(url, revalidate = 300) {
  try {
    const res = await fetch(url, { next: { revalidate } });
    if (!res.ok) return [];
    const data = await res.json();
    const entries = data.feed?.entry || [];
    return entries.map((e) => {
      const title = e.title?.$t || 'Untitled';
      const link = (e.link || []).find((l) => l.rel === 'alternate')?.href || '#';
      const raw = e.summary?.$t || e.content?.$t || '';
      const published = e.published?.$t || e.updated?.$t || null;
      let thumb = e.media$thumbnail?.url || null;
      if (!thumb) {
        const m = (e.content?.$t || '').match(/<img[^>]+src=["']([^"']+)["']/i);
        if (m) thumb = m[1];
      }
      // include raw HTML content as `content` and a text `summary` for previews
      const content = e.content?.$t || e.summary?.$t || '';
      return { title, link, summary: stripHtml(raw).slice(0, 320), published, thumb, content };
    });
  } catch (err) {
    console.warn('fetchFeed error', err?.message || err);
    return [];
  }
}

function stripHtml(html = '') { return String(html).replace(/<[^>]*>/g, '').replace(/\s+/g,' ').trim(); }

