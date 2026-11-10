import PostCard from '../components/PostCard'
import { getSortedPostsData } from '../lib/posts'

export const metadata = {
  alternates: {
    canonical: '/',
    types: { 'application/rss+xml': '/feed.xml' },
  },
}

export default function Home() {
  const allPostsData = getSortedPostsData()

  return (
    <section>
      <div className="profile-section">
        <img src="/assets/img/avatar.jpg" alt="Sonia의 프로필 이미지" className="profile-img" width={100} height={100} fetchPriority="high" />
        <div className="profile-info">
          <h1>Changsun Oh</h1>
          <p>
            AI와 함께 일하며 문제를 끝까지 풀어내는 7년 차 개발자입니다.<br />
            제가 겪고 풀어낸 문제들이 누군가에게 지름길이 되길 바라며 기록합니다.
          </p>
        </div>
      </div>

      <h2 className="section-title">전체 글</h2>
      <div className="post-list">
        {allPostsData.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </section>
  )
}
