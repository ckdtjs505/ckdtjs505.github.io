import { getSortedPostsData } from '../../lib/posts'
import { SITE_URL, SITE_TITLE, SITE_DESCRIPTION, toDate, postUrl } from '../../lib/site'

export const dynamic = 'force-static'

const escapeXml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

export function GET() {
  const posts = getSortedPostsData().slice(0, 30)

  const items = posts
    .map((post) => {
      const date = toDate(post.date)
      const url = postUrl(post.id)
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      ${date ? `<pubDate>${date.toUTCString()}</pubDate>` : ''}
      <description>${escapeXml(post.excerpt)}</description>
    </item>`
    })
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>ko</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  })
}
