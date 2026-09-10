'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { format, parseISO } from 'date-fns'

export default function PostCard({ id, date, title, tags, excerpt }) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/posts/${id}`);
  };

  const handleTagClick = (e, tag) => {
    // 카드 클릭 이벤트가 실행되지 않도록 이벤트 버블링 차단
    e.stopPropagation();
    router.push(`/tags/${encodeURIComponent(tag)}`);
  };

  return (
    <div className="post-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <h2 className="post-title">{title}</h2>
      {excerpt && (
        <p 
          className="post-excerpt" 
          style={{ 
            fontSize: '0.9rem', 
            color: '#666', 
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
      {tags && (
        <div className="post-tags">
          {typeof tags === 'string'
            ? tags.split(' ').map(tag => (
                <span 
                  key={tag} 
                  className="tag" 
                  onClick={(e) => handleTagClick(e, tag)}
                >
                  {tag}
                </span>
              ))
            : Array.isArray(tags)
              ? tags.map(tag => (
                  <span 
                    key={tag} 
                    className="tag" 
                    onClick={(e) => handleTagClick(e, tag)}
                  >
                    {tag}
                  </span>
                ))
              : null
          }
        </div>
      )}
    </div>
  );
}
