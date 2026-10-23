import PostCard from '../components/PostCard'
import { getSortedPostsData } from '../lib/posts'

export default function Home() {
  const allPostsData = getSortedPostsData()
  const featuredPosts = allPostsData.filter((post) => post.featured)

  return (
    <section>
      <div className="profile-section">
        <img src="/assets/img/avatar.jpg" alt="Sonia의 프로필 이미지" className="profile-img" />
        <div className="profile-info">
          <h2>Changsun Oh</h2>
          <p>
            웹 프론트엔드 개발자입니다.<br />
            브라우저와 데스크톱(CEF), 보안과 빌드 도구의 경계에서 만난 문제의 원인과 의사결정을 기록합니다.
          </p>
        </div>
      </div>

      {featuredPosts.length > 0 && (
        <>
          <h2 className="section-title">대표 글</h2>
          <div className="post-list featured-list">
            {featuredPosts.map((post) => (
              <PostCard key={post.id} {...post} />
            ))}
          </div>
        </>
      )}

      <h2 className="section-title">전체 글</h2>
      <div className="post-list">
        {allPostsData.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </section>
  )
}
