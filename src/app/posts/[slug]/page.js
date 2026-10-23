import { getPostData, getAllPostIds, getAdjacentPosts, getSeriesPosts } from '../../../lib/posts'
import Link from 'next/link'
import { SITE_NAME, toDate, postUrl, formatDate } from '../../../lib/site'
import TableOfContents from '../../../components/TableOfContents'
import SeriesNav from '../../../components/SeriesNav'
import PostNav from '../../../components/PostNav'
import Comments from '../../../components/Comments'

export async function generateStaticParams() {
  const paths = getAllPostIds()
  return paths.map((path) => ({
    slug: path.params.slug,
  }))
}

export async function generateMetadata({ params }) {
  const postData = await getPostData(params.slug)
  const title = `${postData.title} | ${SITE_NAME}`
  const url = postUrl(decodeURIComponent(params.slug))
  const publishedTime = toDate(postData.date)?.toISOString()

  return {
    title,
    description: postData.summary,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title,
      description: postData.summary,
      url,
      publishedTime,
      tags: typeof postData.tags === 'string' ? postData.tags.split(' ') : postData.tags,
    },
  }
}

export default async function Post({ params }) {
  const postData = await getPostData(params.slug)
  const { previous, next } = getAdjacentPosts(postData.id)
  const seriesPosts = getSeriesPosts(postData.series)

  return (
    <article>
      <Link href="/" className="back-link">
        ← 목록으로 돌아가기
      </Link>
      <div className="post-header">
        <h1>{postData.title}</h1>
        <div className="post-date">
          {formatDate(postData.date)}
          {' · '}{postData.readingMinutes}분 읽기
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
      <SeriesNav series={postData.series} posts={seriesPosts} currentId={postData.id} />
      <TableOfContents toc={postData.toc} />
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      />
      <PostNav previous={previous} next={next} />
      <Comments />
    </article>
  )
}
