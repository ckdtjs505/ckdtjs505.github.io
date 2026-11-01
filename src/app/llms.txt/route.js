import { getSortedPostsData } from '../../lib/posts'
import { SITE_URL, SITE_TITLE, SITE_DESCRIPTION, AUTHOR, postUrl } from '../../lib/site'

export const dynamic = 'force-static'

// llms.txt(https://llmstxt.org): AI 도구가 사이트 구조를 한눈에 파악하도록 주는 마크다운 목차
// 대표 글을 먼저, 나머지는 시리즈별로 묶어서 나열
export function GET() {
  const posts = getSortedPostsData()
  const line = (post) => `- [${post.title}](${postUrl(post.id)})${post.summary ? `: ${post.summary}` : ''}`

  const featured = posts.filter((post) => post.featured)
  const groups = new Map()
  posts
    .filter((post) => !post.featured)
    .forEach((post) => {
      const key = post.series ?? '기타 글'
      groups.set(key, [...(groups.get(key) ?? []), post])
    })

  const sections = [
    featured.length > 0 && `## 대표 글\n\n${featured.map(line).join('\n')}`,
    // 시리즈에 속하지 않은 글은 맨 뒤로
    ...[...groups]
      .sort(([a], [b]) => (a === '기타 글') - (b === '기타 글'))
      .map(([name, items]) => `## ${name}\n\n${items.map(line).join('\n')}`),
    `## 더 보기\n\n- [About](${AUTHOR.url}): 글쓴이 ${AUTHOR.name}(${AUTHOR.alternateName}) 소개\n- [RSS](${SITE_URL}/feed.xml)\n- [Sitemap](${SITE_URL}/sitemap.xml)`,
  ].filter(Boolean)

  const text = `# ${SITE_TITLE}\n\n> ${SITE_DESCRIPTION}\n\n${sections.join('\n\n')}\n`

  return new Response(text, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
