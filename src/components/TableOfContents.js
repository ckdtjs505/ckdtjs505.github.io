export default function TableOfContents({ toc }) {
  // 헤딩이 적은 짧은 글에는 목차가 오히려 방해가 됨
  if (!toc || toc.length < 3) return null;

  // 펼쳐 두면 모바일 첫 화면의 ~45%를 차지해 본문이 밀리므로 시리즈처럼 접어 둠
  return (
    <nav className="toc" aria-label="목차">
      <details>
        <summary>목차 <span className="toc-count">{toc.length}</span></summary>
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
