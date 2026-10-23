import Link from 'next/link'
import { getTagCounts } from '../../lib/posts'
import { SITE_NAME } from '../../lib/site'

export const metadata = {
  title: `태그 | ${SITE_NAME}`,
  description: '주제별로 글을 모아 봅니다.',
}

export default function TagsPage() {
  const tags = getTagCounts()

  return (
    <section>
      <div className="post-header">
        <h1>태그</h1>
        <div style={{ color: 'var(--text-secondary)' }}>
          총 {tags.length}개의 태그
        </div>
      </div>
      <div className="tag-cloud">
        {tags.map(({ tag, count }) => (
          <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`} className="tag">
            {tag} <span className="tag-count">{count}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
