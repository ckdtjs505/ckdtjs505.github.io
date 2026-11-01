import { getSortedPostsData } from '../lib/posts'
import { SITE_URL, toDate, postUrl } from '../lib/site'

export const dynamic = 'force-static'

// /about을 고치면 이 날짜도 같이 바꿔 줌 (CI는 얕은 clone이라 git 이력으로 구할 수 없음)
const ABOUT_UPDATED = '2026-11-01'

// lastmod는 날짜만 씀: 시간까지 쓰면 실제로 없는 '자정 UTC'를 꾸며 넣는 셈이라
function toDay(date) {
  return toDate(date)?.toISOString().slice(0, 10)
}

// 글을 고쳤으면 front matter의 modified, 아니면 발행일
function postModified(post) {
  return toDay(post.modified) ?? toDay(post.date)
}

export default function sitemap() {
  const posts = getSortedPostsData()
  const latest = posts.map(postModified).filter(Boolean).sort().at(-1)

  return [
    { url: `${SITE_URL}/`, lastModified: latest },
    { url: `${SITE_URL}/about`, lastModified: ABOUT_UPDATED },
    ...posts.map((post) => ({
      url: postUrl(post.id),
      lastModified: postModified(post),
    })),
  ]
}
