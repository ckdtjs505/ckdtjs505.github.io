import Link from 'next/link'
import PostCard from '../components/PostCard'
import { getSortedPostsData, getTagCounts } from '../lib/posts'
import { SITE_TITLE, getPostYear } from '../lib/site'

export const metadata = {
  alternates: {
    canonical: '/',
    types: { 'application/rss+xml': '/feed.xml' },
  },
}

const TOP_TAG_LIMIT = 6

function groupPostsByYear(posts) {
  const groups = []
  const byYear = new Map()

  for (const post of posts) {
    const year = getPostYear(post.date)
    if (!byYear.has(year)) {
      const group = { year, posts: [] }
      byYear.set(year, group)
      groups.push(group)
    }
    byYear.get(year).posts.push(post)
  }

  return groups
}

export default function Home() {
  const allPostsData = getSortedPostsData()
  const postsByYear = groupPostsByYear(allPostsData)
  const topTags = getTagCounts().slice(0, TOP_TAG_LIMIT)

  return (
    <section>
      <div className="profile-section">
        <img src="/assets/img/avatar.jpg" alt="Sonia의 프로필 이미지" className="profile-img" width={100} height={100} fetchPriority="high" />
        <div className="profile-info">
          <span className="profile-eyebrow">{SITE_TITLE}</span>
          <h1>Changsun Oh</h1>
          <p>
            AI와 함께 일하며 문제를 끝까지 풀어내는 7년 차 개발자입니다.<br />
            제가 겪고 풀어낸 문제들이 누군가에게 지름길이 되길 바라며 기록합니다.
          </p>
        </div>
      </div>

      <h2 className="section-title">전체 글</h2>
      <nav aria-label="주요 태그" className="home-tags">
        {topTags.map(({ tag, count }) => (
          <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`} className="home-tag">
            #{tag} <span className="tag-count">{count}</span>
          </Link>
        ))}
        <Link href="/tags" className="home-tags-all">
          모든 태그 →
        </Link>
      </nav>

      <div className="post-years">
        {postsByYear.map(({ year, posts }) => (
          <section key={year} className="post-year-group" aria-labelledby={`year-${year}`}>
            <h3 id={`year-${year}`} className="post-year-heading">
              <span>{year}</span>
              <span className="post-year-count">{posts.length}편</span>
            </h3>
            <div className="post-list">
              {posts.map((post) => (
                <PostCard key={post.id} {...post} headingTag="h4" />
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="list-end">
        <a href="#top" className="back-to-top">
          ↑ 맨 위로
        </a>
      </div>
    </section>
  )
}
