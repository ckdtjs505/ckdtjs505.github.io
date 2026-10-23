import Link from 'next/link'

export default function SeriesNav({ series, posts, currentId }) {
  if (!series || posts.length < 2) return null;

  const currentIndex = posts.findIndex((post) => post.id === currentId);

  // 시리즈 목록이 길면 본문 시작을 밀어내므로 기본은 접어 두고 현재 위치만 노출
  return (
    <nav className="series-nav" aria-label={`${series} 시리즈`}>
      <details>
        <summary className="series-header">
          <span className="series-label">시리즈</span>
          <strong>{series}</strong>
          <span className="series-count">{currentIndex + 1} / {posts.length}</span>
        </summary>
        <ol>
          {posts.map((post) => (
            <li key={post.id}>
              {post.id === currentId ? (
                <span aria-current="page">{post.title}</span>
              ) : (
                <Link href={`/posts/${post.id}`}>{post.title}</Link>
              )}
            </li>
          ))}
        </ol>
      </details>
    </nav>
  );
}
