
export const metadata = {
  title: 'About | Sonia.dev',
}

const fullStackProjects = [
  {
    id: 'afreecatv',
    title: '📺 afreecaTV',
    description: '아프리카TV 클론 코딩 프로젝트입니다.',
    githubLink: 'https://github.com/ckdtjs505/csfreecaTV',
    viewLink: 'https://intense-sands-29573.herokuapp.com/'
  },
  {
    id: 'guess-mind',
    title: '✏ guess-mind',
    description: '캐치마인드 클론 코딩 프로젝트입니다.',
    githubLink: 'https://github.com/ckdtjs505/guess-mind',
    viewLink: 'https://intense-ravine-34956.herokuapp.com/'
  },
  {
    id: 'nwitter',
    title: '🎃 nwitter',
    description: '트위터 클론 코딩 프로젝트입니다.',
    githubLink: 'https://github.com/ckdtjs505/nwitter',
    viewLink: 'https://ckdtjs505.github.io/nwitter/#/'
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
  {
    id: 'hackers',
    title: '📖 Hackers',
    description: '해커스 영어 쉐도잉 음원 학습을 위해 제작한 웹사이트입니다.',
    githubLink: 'https://github.com/ckdtjs505/Hackers',
    viewLink: 'https://ckdtjs505.github.io/Hackers/'
  },
  {
    id: 'imgprocess',
    title: '🎨 ImgProcess',
    description: '이미지의 밝기와 채도를 변환할 수 있는 이미지 처리 웹사이트입니다.',
    githubLink: 'https://github.com/ckdtjs505/Imageprocess',
    viewLink: 'https://ckdtjs505.github.io/Imageprocess/'
  },
  {
    id: 'couple',
    title: '💕 Couple',
    description: '여자친구를 위해 특별히 제작한 커플 웹사이트입니다.',
    githubLink: 'https://github.com/ckdtjs505/CSJlove',
    viewLink: 'https://ckdtjs505.github.io/CSJlove/'
  },
  {
    id: 'church',
    title: '⛪ Church',
    description: '사랑과 은혜 교회 청년부를 위한 웹사이트입니다.',
    githubLink: 'https://github.com/ckdtjs505/ChurchYouth',
    viewLink: 'https://ckdtjs505.github.io/ChurchYouth/'
  }
];

export default function About() {
  return (
    <section>
      <div className="profile-section" style={{marginBottom: '4rem'}}>
        <img src="/assets/img/avatar.jpg" alt="Sonia의 프로필 이미지" className="profile-img" />
        <div className="profile-info">
          <h2>안녕하세요, 개발자 오창선입니다!</h2>
          <p style={{fontSize: '1.1rem', lineHeight: '1.6'}}>
            저는 웹 프론트엔드 개발에 관한 지식과 경험을 기록하고 공유합니다. 모던 Javascript, Node.js 등을 활용하여 다양한 오픈소스 프로젝트를 만들어가는 것을 좋아합니다.
          </p>
          <a href="mailto:your.email@example.com" className="btn-primary" style={{marginTop: '1rem', display: 'inline-block'}}>
            이메일 보내기
          </a>
        </div>
      </div>

      <div className="portfolio-section">
        {mobileAppProjects.length > 0 && (
          <>
            <h2 style={{marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)'}}>모바일 앱 프로젝트</h2>
            <div className="project-grid">
              {mobileAppProjects.map(project => (
                 <div className="post-card" key={project.id}>
                   <h3 className="post-title" style={{marginBottom: '0.5rem'}}>{project.title}</h3>
                   <p style={{color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.95rem'}}>{project.description}</p>
                   <div style={{display: 'flex', gap: '0.5rem'}}>
                     {project.githubLink && (
                       <a href={project.githubLink} target="_blank" rel="noreferrer" className="tag" style={{textDecoration: 'none'}}>GitHub</a>
                     )}
                     {project.viewLink && (
                       <a href={project.viewLink} target="_blank" rel="noreferrer" className="tag" style={{textDecoration: 'none'}}>View</a>
                     )}
                   </div>
                 </div>
              ))}
            </div>
          </>
        )}

        {fullStackProjects.length > 0 && (
          <>
            <h2 style={{marginBottom: '1.5rem', marginTop: mobileAppProjects.length > 0 ? '3rem' : '0', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)'}}>풀스택 프로젝트</h2>
            <div className="project-grid">
              {fullStackProjects.map(project => (
                 <div className="post-card" key={project.id}>
                   <h3 className="post-title" style={{marginBottom: '0.5rem'}}>{project.title}</h3>
                   <p style={{color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.95rem'}}>{project.description}</p>
                   <div style={{display: 'flex', gap: '0.5rem'}}>
                     <a href={project.githubLink} target="_blank" rel="noreferrer" className="tag" style={{textDecoration: 'none'}}>GitHub</a>
                     <a href={project.viewLink} target="_blank" rel="noreferrer" className="tag" style={{textDecoration: 'none'}}>View</a>
                   </div>
                 </div>
              ))}
            </div>
          </>
        )}

        <h2 style={{marginBottom: '1.5rem', marginTop: (mobileAppProjects.length > 0 || fullStackProjects.length > 0) ? '3rem' : '0', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)'}}>프론트엔드 프로젝트</h2>
        <div className="project-grid">
          {frontEndProjects.map(project => (
             <div className="post-card" key={project.id}>
               <h3 className="post-title" style={{marginBottom: '0.5rem'}}>{project.title}</h3>
               <p style={{color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.95rem'}}>{project.description}</p>
               <div style={{display: 'flex', gap: '0.5rem'}}>
                 {project.githubLink && (
                   <a href={project.githubLink} target="_blank" rel="noreferrer" className="tag" style={{textDecoration: 'none'}}>GitHub</a>
                 )}
                 {project.viewLink && (
                   <a href={project.viewLink} target="_blank" rel="noreferrer" className="tag" style={{textDecoration: 'none'}}>View</a>
                 )}
               </div>
             </div>
          ))}
        </div>
      </div>
    </section>
  )
}
