import fs from 'fs'
import path from 'path'
import { ImageResponse } from 'next/og'
import { getSortedPostsData } from '../../../lib/posts'
import { SITE_NAME, formatDate } from '../../../lib/site'

export const dynamic = 'force-static'
export const dynamicParams = false

// next/og 기본 폰트에는 한글 글리프가 없어 Pretendard(OFL)를 직접 넘겨줌
const fontsDirectory = path.join(process.cwd(), 'src/assets/fonts')
const fonts = [
  { name: 'Pretendard', data: fs.readFileSync(path.join(fontsDirectory, 'Pretendard-Bold.otf')), weight: 700 },
  { name: 'Pretendard', data: fs.readFileSync(path.join(fontsDirectory, 'Pretendard-Medium.otf')), weight: 500 },
]

// 정적 export에서 확장자가 있어야 GitHub Pages가 image/png로 서빙하므로 파라미터에 .png를 포함
export function generateStaticParams() {
  return getSortedPostsData().map((post) => ({ file: `${post.id}.png` }))
}

export function GET(request, { params }) {
  const id = decodeURIComponent(params.file).replace(/\.png$/, '')
  const post = getSortedPostsData().find((p) => p.id === id)
  const tags = post?.tags ? (typeof post.tags === 'string' ? post.tags.split(' ') : post.tags).slice(0, 4) : []

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#0d1117',
          color: '#e6edf3',
          fontFamily: 'Pretendard',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {post?.series && (
            <div style={{ fontSize: 30, fontWeight: 500, color: '#58a6ff' }}>{`${post.series} 시리즈`}</div>
          )}
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.3, wordBreak: 'keep-all' }}>
            {post?.title ?? SITE_NAME}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', gap: 12 }}>
            {tags.map((tag) => (
              <div
                key={tag}
                style={{
                  fontSize: 26,
                  fontWeight: 500,
                  color: '#58a6ff',
                  background: 'rgba(88, 166, 255, 0.12)',
                  padding: '6px 18px',
                  borderRadius: 999,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
            <div style={{ fontSize: 36, fontWeight: 700 }}>{SITE_NAME}</div>
            <div style={{ fontSize: 24, fontWeight: 500, color: '#8b949e' }}>{formatDate(post?.date)}</div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, fonts }
  )
}
