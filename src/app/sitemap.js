import { getSortedPostsData } from '../lib/posts'
import { SITE_URL, toDate, postUrl } from '../lib/site'

export const dynamic = 'force-static'

export default function sitemap() {
  const posts = getSortedPostsData()

  return [
    { url: SITE_URL, lastModified: toDate(posts[0]?.date) ?? undefined },
    { url: `${SITE_URL}/about` },
    ...posts.map((post) => ({
      url: postUrl(post.id),
      lastModified: toDate(post.date) ?? undefined,
    })),
  ]
}
