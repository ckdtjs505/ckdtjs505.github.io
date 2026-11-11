import Link from 'next/link'
import { formatDate } from '../lib/site'

export default function PostCard({ id, date, title, tags, excerpt }) {
  const tagList = typeof tags === 'string' ? tags.split(' ') : Array.isArray(tags) ? tags : [];

  return (
    <article className="post-card">
      <h2 className="post-title">
        {/* ::after 오버레이로 카드 전체를 클릭 영역으로 만들되, 실제 <a> 링크라 새 탭 열기·크롤링이 가능함 */}
        <Link href={`/posts/${id}`} className="post-card-link">{title}</Link>
      </h2>
      {excerpt && <p className="post-excerpt">{excerpt}</p>}
      {/* 날짜와 태그를 한 줄에 둬서 카드 높이를 줄이고 첫 화면에 글이 더 많이 보이게 함 */}
      <div className="post-meta">
        <span className="post-card-date">{formatDate(date)}</span>
        {tagList.length > 0 && (
          <div className="post-tags">
            {tagList.map(tag => (
              <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`} className="tag">
                {tag}
              </Link>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
