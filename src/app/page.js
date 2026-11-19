import Link from 'next/link'
import PostCard from '../components/PostCard'
import YearJumpOpener from '../components/YearJumpOpener'
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
        <img src="/assets/img/avatar.jpg" alt="Sonia의 프로필 이미지" className="profile-img" width={72} height={72} fetchPriority="high" />
        <div className="profile-info">
          <span className="profile-eyebrow">{SITE_TITLE}</span>
          <h1>Changsun Oh</h1>
          <p>
            AI와 함께 일하며 문제를 끝까지 풀어내는 7년 차 개발자입니다.<br />
            제가 겪고 풀어낸 문제들이 누군가에게 지름길이 되길 바라며 기록합니다.
          </p>
        </div>
      </div>

      <div className="section-header">
        <h2 className="section-title">전체 글</h2>
        <YearJumpOpener />
        <nav aria-label="연도별 바로가기" className="year-jump-nav">
          {postsByYear.map(({ year }, idx) => (
            <span key={year} className="year-jump-item">
              {idx > 0 && <span className="year-jump-sep" aria-hidden="true">·</span>}
              <a href={`#year-${year}`} className="year-jump-link">{year}</a>
            </span>
          ))}
        </nav>
      </div>

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
        {postsByYear.map(({ year, posts }, idx) => {
          const heading = (
            <h3 id={`year-${year}`} className="post-year-heading" aria-label={`${year}년, ${posts.length}편`}>
              {year} <span className="post-year-sep" aria-hidden="true">·</span> <span className="post-year-count">{posts.length}편</span>
            </h3>
          )
          const list = (
            <div className="post-list">
              {posts.map((post) => (
                <PostCard key={post.id} {...post} headingTag="h4" />
              ))}
            </div>
          )

          if (idx === 0) {
            return (
              <section key={year} className="post-year-group" aria-labelledby={`year-${year}`}>
                {heading}
                {list}
              </section>
            )
          }

          return (
            <section key={year} className="post-year-group post-year-group--archived" aria-labelledby={`year-${year}`}>
              <details className="post-year-details">
                <summary className="post-year-summary">
                  {heading}
                </summary>
                {list}
              </details>
            </section>
          )
        })}
      </div>

      <div className="list-end">
        <p className="list-end-note">새 글 소식은 RSS로 받아보거나 태그로 주제별 글을 찾아볼 수 있습니다.</p>
        <div className="list-end-actions">
          <a href="/feed.xml" className="list-end-link">RSS 구독</a>
          <Link href="/tags" className="list-end-link">모든 태그</Link>
          <a href="#top" className="back-to-top">↑ 맨 위로</a>
        </div>
      </div>
    </section>
  )
}
