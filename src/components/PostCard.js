import Link from 'next/link'
import { format, parseISO } from 'date-fns'

export default function PostCard({ id, date, title, tags, excerpt }) {
  const tagList = typeof tags === 'string' ? tags.split(' ') : Array.isArray(tags) ? tags : [];

  return (
    <article className="post-card">
      <h2 className="post-title">
        {/* ::after 오버레이로 카드 전체를 클릭 영역으로 만들되, 실제 <a> 링크라 새 탭 열기·크롤링이 가능함 */}
        <Link href={`/posts/${id}`} className="post-card-link">{title}</Link>
      </h2>
      {excerpt && (
        <p
          className="post-excerpt"
          style={{
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            margin: '8px 0',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {excerpt}
        </p>
      )}
      <div className="post-date">
        {date ? format(typeof date === 'string' ? parseISO(date) : new Date(date), 'LLLL d, yyyy') : 'No Date'}
      </div>
      {tagList.length > 0 && (
        <div className="post-tags">
          {tagList.map(tag => (
            <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`} className="tag">
              {tag}
            </Link>
          ))}
        </div>
      )}
    </article>
  );
}
