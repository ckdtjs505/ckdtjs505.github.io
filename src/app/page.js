import PostCard from '../components/PostCard'
import { getSortedPostsData } from '../lib/posts'
import { format, parseISO } from 'date-fns'

export default function Home() {
  const allPostsData = getSortedPostsData()

  return (
    <section>
      <div className="profile-section">
        <img src="/assets/img/avatar.jpg" alt="Sonia의 프로필 이미지" className="profile-img" />
        <div className="profile-info">
          <h2>Changsun Oh</h2>
          <p>
            I like JAVASCRIPT 💛<br />
            웹 프론트엔드 개발에 관한 지식과 경험을 기록합니다.
          </p>
        </div>
      </div>

      <div className="post-list">
        {allPostsData.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </section>
  )
}
