import { getPostData, getAllPostIds } from '../../../lib/posts'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'

export async function generateStaticParams() {
  const paths = getAllPostIds()
  return paths.map((path) => ({
    slug: path.params.slug,
  }))
}

export async function generateMetadata({ params }) {
  const postData = await getPostData(params.slug)
  return {
    title: `${postData.title} | Sonia.dev`,
  }
}

export default async function Post({ params }) {
  const postData = await getPostData(params.slug)

  return (
    <article>
      <Link href="/" className="back-link">
        ← 목록으로 돌아가기
      </Link>
      <div className="post-header">
        <h1>{postData.title}</h1>
        <div className="post-date">
          {postData.date ? format(typeof postData.date === 'string' ? parseISO(postData.date) : new Date(postData.date), 'LLLL d, yyyy') : ''}
        </div>
        {postData.tags && (
          <div className="post-tags">
            {typeof postData.tags === 'string' 
              ? postData.tags.split(' ').map(tag => (
                  <Link href={`/tags/${encodeURIComponent(tag)}`} key={tag} className="tag">{tag}</Link>
                ))
              : Array.isArray(postData.tags) 
                ? postData.tags.map(tag => <Link href={`/tags/${encodeURIComponent(tag)}`} key={tag} className="tag">{tag}</Link>)
                : null
            }
          </div>
        )}
      </div>
      <div 
        className="post-content"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
      />
    </article>
  )
}
