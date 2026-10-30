
export const metadata = {
  title: 'About | Sonia.dev',
}

const fullStackProjects = [
  {
    id: 'hamonseong',
    title: '📖 hamonseong',
    description: '사랑과은헤교회 청소년부 성경읽기 프로젝트입니다.',
    githubLink: 'https://github.com/ckdtjs505/hamonseong',
    viewLink: 'https://hamonseong.com/'
  },
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
    githubLink: 'https://github.com/ckdtjs505/csfreecaTV'
  },
  {
    id: 'guess-mind',
    title: '✏ guess-mind',
    description: '캐치마인드 클론 코딩 프로젝트입니다.',
    githubLink: 'https://github.com/ckdtjs505/guess-mind'
  }
];

const mobileAppProjects = [
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
      <div className="profile-section" style={{ marginBottom: '4rem' }}>
        <img src="/assets/img/avatar.jpg" alt="Sonia의 프로필 이미지" className="profile-img" />
        <div className="profile-info">
          <h2>안녕하세요, 개발자 오창선입니다!</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            2020년부터 라이브 스트리밍 웹 플레이어를 만들고 운영하고 있습니다. 영상이 끊기는 이유를 추적하는 일부터 CEF 생명주기, 웹 보안, 빌드 도구처럼 프론트엔드의 경계에서 생기는 문제를 끝까지 파고드는 것을 좋아합니다.
          </p>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            요즘은 AI와 함께 일하면서, 문제를 푸는 과정 자체를 파이프라인으로 만드는 데 관심이 많습니다.
          </p>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            이 블로그에는 그 과정에서 찾은 원인과 어떤 대안을 왜 버렸는지까지 기록합니다. 제가 헤맨 길이 누군가에게는 지름길이 되길 바랍니다.
          </p>
          <a href="mailto:ckdtjs304@gmail.com" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>
            이메일 보내기
          </a>
        </div>
      </div>

      <div className="portfolio-section">
        {mobileAppProjects.length > 0 && (
          <>
            <h2 style={{ marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)' }}>Mobile App Project</h2>
            <div className="project-grid">
              {mobileAppProjects.map(project => (
                <div className="post-card" key={project.id}>
                  <h3 className="post-title" style={{ marginBottom: '0.5rem' }}>{project.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.95rem' }}>{project.description}</p>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noreferrer" className="tag" style={{ textDecoration: 'none' }}>GitHub</a>
                    )}
                    {project.viewLink && (
                      <a href={project.viewLink} target="_blank" rel="noreferrer" className="tag" style={{ textDecoration: 'none' }}>View</a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {fullStackProjects.length > 0 && (
          <>
            <h2 style={{ marginBottom: '1.5rem', marginTop: mobileAppProjects.length > 0 ? '3rem' : '0', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)' }}>Full Stack Project</h2>
            <div className="project-grid">
              {fullStackProjects.map(project => (
                <div className="post-card" key={project.id}>
                  <h3 className="post-title" style={{ marginBottom: '0.5rem' }}>{project.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.95rem' }}>{project.description}</p>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noreferrer" className="tag" style={{ textDecoration: 'none' }}>GitHub</a>
                    )}
                    {project.viewLink && (
                      <a href={project.viewLink} target="_blank" rel="noreferrer" className="tag" style={{ textDecoration: 'none' }}>View</a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <h2 style={{ marginBottom: '1.5rem', marginTop: (mobileAppProjects.length > 0 || fullStackProjects.length > 0) ? '3rem' : '0', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)' }}>Frontend Project</h2>
        <div className="project-grid">
          {frontEndProjects.map(project => (
            <div className="post-card" key={project.id}>
              <h3 className="post-title" style={{ marginBottom: '0.5rem' }}>{project.title}</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.95rem' }}>{project.description}</p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {project.githubLink && (
                  <a href={project.githubLink} target="_blank" rel="noreferrer" className="tag" style={{ textDecoration: 'none' }}>GitHub</a>
                )}
                {project.viewLink && (
                  <a href={project.viewLink} target="_blank" rel="noreferrer" className="tag" style={{ textDecoration: 'none' }}>View</a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
