import JsonLd from '../../components/JsonLd'
import { SITE_NAME, AUTHOR } from '../../lib/site'

const description = 'AI가 코드를 짜고 개발자 오창선(Changsun Oh)이 기획하고 검증한 프로그램을 모은 AI 박물관입니다. 2020년부터 라이브 스트리밍 웹 플레이어를 만들어 온 개발자 소개도 함께 있습니다.'

export const metadata = {
  title: `About | ${SITE_NAME}`,
  description,
  alternates: { canonical: '/about' },
  openGraph: {
    type: 'profile',
    siteName: SITE_NAME,
    title: `About | ${SITE_NAME}`,
    description,
    url: '/about',
    locale: 'ko_KR',
    images: ['/assets/img/avatar.jpg'],
  },
}

const profileJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  url: AUTHOR.url,
  mainEntity: { '@id': `${AUTHOR.url}#person` },
}

const fullStackProjects = [
  {
    id: 'nwitter',
    title: '🎃 nwitter',
    description: '트위터 클론 코딩 프로젝트입니다.',
    githubLink: 'https://github.com/ckdtjs505/nwitter',
    viewLink: 'https://ckdtjs505.github.io/nwitter/#/'
  },
  {
    id: 'afreecatv',
    title: '📺 afreecaTV',
    description: '아프리카TV 클론 코딩 프로젝트입니다.',
    githubLink: 'https://github.com/ckdtjs505/csfreecaTV',
    viewLink: 'https://csfreecatv.onrender.com/'
  }
];

// AI 도움을 받아 만든 것. 공개된 사이트나 repo가 있는 것만 건다.
const aiAppProjects = [
  {
    id: 'sonia-wiki',
    title: '🔎 Sonia Wiki',
    description: '이 블로그 글 44개에 질문하면 근거 문단과 함께 답하는 RAG 위키입니다. (FastAPI · ChromaDB · Gemini)',
    githubLink: 'https://github.com/ckdtjs505/sonia-wiki'
  },
  {
    id: 'kakao-agent-starter',
    title: '💬 카카오톡 AI 에이전트 스타터',
    description: '카카오톡 챗봇에 Gemini 에이전트를 붙이는 스킬 서버 스타터입니다. 콜백으로 5초 응답 제한을 넘깁니다.',
    githubLink: 'https://github.com/ckdtjs505/kakao-agent-starter'
  },
  {
    id: 'hamonseong',
    title: '📖 hamonseong',
    description: '사랑과은헤교회 청소년부 성경읽기 프로젝트입니다.',
    githubLink: 'https://github.com/ckdtjs505/hamonseong',
    viewLink: 'https://hamonseong.com/'
  },
  {
    id: 'self-fire',
    title: '🔥 Self-Fire (명언 앱)',
    description: '"스스로 불타오를 수 있는 사람이 되어라" - 동기부여 명언을 제공하는 모바일 앱 프로젝트입니다.',
    githubLink: 'https://github.com/ckdtjs505/self-fire',
    viewLink: 'https://ckdtjs505.github.io/self-fire/'
  }
];

const frontEndProjects = [
  {
    id: 'notflix',
    title: '🎞 notflix',
    description: '넷플릭스 클론 코딩 프로젝트입니다.',
    githubLink: 'https://github.com/ckdtjs505/notflix',
    viewLink: 'https://serene-murdock-96e6de.netlify.app/#/'
  },
  {
    id: 'shortly',
    title: '🚗 Shortly',
    description: 'URL 단축 API를 활용하여 제작한 사이트입니다.',
    githubLink: 'https://github.com/ckdtjs505/frontEnd-practice/tree/master/url-shortening-api-master',
    viewLink: 'https://ckdtjs505.github.io/frontEnd-practice/url-shortening-api-master/index.html'
  },
  {
    id: 'game',
    title: '🚀 Game',
    description: '자바스크립트로 구현한 가위바위보 게임입니다.',
    githubLink: 'https://github.com/ckdtjs505/frontEnd-practice/tree/master/rock-paper-scissors-master',
    viewLink: 'https://ckdtjs505.github.io/frontEnd-practice/rock-paper-scissors-master/index.html'
  },
  {
    id: 'emoticon',
    title: '😀 emoticon',
    description: '최근 사용한 이모티콘을 저장하고 관리하는 사이트입니다.',
    githubLink: 'https://github.com/ckdtjs505/frontEnd-practice/tree/master/recentEmoticon',
    viewLink: 'https://ckdtjs505.github.io/frontEnd-practice/recentEmoticon/index.html'
  },
  {
    id: 'momentum',
    title: '🎫 Momentum',
    description: '크롬 확장 프로그램인 모멘텀(Momentum) 클론 코딩 프로젝트입니다.',
    githubLink: 'https://github.com/ckdtjs505/Momentum',
    viewLink: 'https://ckdtjs505.github.io/Momentum/'
  },
  {
    id: 'new-space',
    title: '🌌 New space',
    description: '뉴스페이스 교육을 목적으로 한 웹사이트입니다.',
    githubLink: 'https://github.com/ckdtjs505/new-space',
    viewLink: 'https://ckdtjs505.github.io/new-space/'
  },
];

export default function About() {
  return (
    <section>
      <JsonLd data={profileJsonLd} />
      <div className="profile-section" style={{ marginBottom: '4rem' }}>
        <img src="/assets/img/avatar.jpg" alt="Sonia의 프로필 이미지" className="profile-img" width={100} height={100} />
        <div className="profile-info">
          <h1>안녕하세요, 개발자 오창선입니다!</h1>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            2020년부터 라이브 스트리밍 웹 플레이어를 만들고 운영하고 있습니다. 영상이 끊기는 이유를 추적하는 일부터 CEF 생명주기, 웹 보안, 빌드 도구처럼 FE·BE 경계를 가리지 않고 생기는 문제를 끝까지 파고드는 것을 좋아합니다.
          </p>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            요즘은 AI를 동료처럼 쓰면서, 문제를 푸는 과정 자체를 파이프라인으로 만드는 데 집중하고 있습니다.
          </p>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            이 블로그에는 그 과정에서 찾은 원인과 어떤 대안을 왜 버렸는지까지 기록합니다. 제가 헤맨 길이 누군가에게는 지름길이 되길 바랍니다.
          </p>
          <a href="mailto:ckdtjs304@gmail.com" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>
            이메일 보내기
          </a>
        </div>
      </div>

      <PosterWall
        title="AI와 만든 것"
        note="코드는 AI가 짰고, 무엇을 만들지 정하고 끝까지 확인한 건 제가 했습니다."
        books={aiAppProjects.map(toBook)}
      />
      <PosterWall
        title="손으로 만든 것"
        books={[...fullStackProjects, ...frontEndProjects].map(toBook)}
      />
    </section>
  )
}

function toBook(p) {
  const [, ...rest] = p.title.split(' ')
  return { key: p.id, image: `/assets/img/projects/${p.id}.jpg`, title: rest.join(' '), href: p.viewLink || p.githubLink, github: p.githubLink, description: p.description }
}

// 카드 한 장 = 프로젝트 하나. 스크린샷 + 제목 + 설명 + GitHub 버튼.
function PosterWall({ title, note, books }) {
  return (
    <div className="poster-section">
      <h2 className="poster-section-title">{title}</h2>
      {note && <p className="poster-note">{note}</p>}
      <ul className="poster-wall">
        {books.map(book => (
          <li key={book.key} className="poster">
            <a
              href={book.href}
              className="poster-link"
              target="_blank"
              rel="noreferrer"
            >
              <img className="poster-art" src={book.image} alt="" loading="lazy" width={800} height={500} />
              <span className="poster-title">{book.title}</span>
              <span className="poster-desc">{book.description}</span>
            </a>
            {book.github && (
              <a href={book.github} className="poster-github" target="_blank" rel="noreferrer" aria-label={`${book.title} GitHub 소스`}>
                GitHub 소스 →
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
