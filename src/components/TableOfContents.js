export default function TableOfContents({ toc }) {
  // 헤딩이 적은 짧은 글에는 목차가 오히려 방해가 됨
  if (!toc || toc.length < 3) return null;

  return (
    <nav className="toc" aria-label="목차">
      <details open>
        <summary>목차</summary>
        <ol>
          {toc.map((heading) => (
            <li key={heading.id} className={heading.depth === 3 ? 'toc-sub' : undefined}>
              <a href={`#${heading.id}`}>{heading.text}</a>
            </li>
          ))}
        </ol>
      </details>
    </nav>
  );
}
