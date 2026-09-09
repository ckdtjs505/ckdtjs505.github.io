import { getAllTags, getPostsByTag } from '../../../lib/posts'
import PostCard from '../../../components/PostCard'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'

export async function generateStaticParams() {
  const paths = getAllTags()
  return paths.map((path) => ({
    tag: encodeURIComponent(path.params.tag),
  }))
}

export async function generateMetadata({ params }) {
  return {
    title: `태그: ${params.tag} | Sonia.dev`,
  }
}

export default async function TagPage({ params }) {
  const decodedTag = decodeURIComponent(params.tag);
  const posts = getPostsByTag(params.tag)

  return (
    <section>
      <Link href="/" className="back-link">
        ← 목록으로 돌아가기
      </Link>
      <div className="post-header">
        <h1>#{decodedTag} 태그가 포함된 포스트</h1>
        <div style={{ color: 'var(--text-secondary)' }}>
          총 {posts.length}개의 포스트를 찾았습니다.
        </div>
      </div>
      <div className="post-list">
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </section>
  )
}
