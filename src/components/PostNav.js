import Link from 'next/link'

export default function PostNav({ previous, next }) {
  if (!previous && !next) return null;

  return (
    <nav className="post-nav" aria-label="이전/다음 글">
      {previous ? (
        <Link href={`/posts/${previous.id}`} className="post-nav-item">
          <span className="post-nav-label">← 이전 글</span>
          <span className="post-nav-title">{previous.title}</span>
        </Link>
      ) : <span />}
      {next ? (
        <Link href={`/posts/${next.id}`} className="post-nav-item post-nav-next">
          <span className="post-nav-label">다음 글 →</span>
          <span className="post-nav-title">{next.title}</span>
        </Link>
      ) : <span />}
    </nav>
  );
}
