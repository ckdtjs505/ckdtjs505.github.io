// 구조화 데이터(JSON-LD)를 <script>로 출력. 제목에 '</script>'가 들어가도 태그가 닫히지 않도록 '<'를 이스케이프
export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
