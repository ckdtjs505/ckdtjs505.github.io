import './globals.css'
import MermaidListener from './MermaidListener'
import PageViews from './PageViews'
import Link from 'next/link'
import { Outfit } from 'next/font/google'
import JsonLd from '../components/JsonLd'
import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION, AUTHOR } from '../lib/site'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: {
    types: { 'application/rss+xml': '/feed.xml' },
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: '/',
    locale: 'ko_KR',
    images: [{ url: '/og/default.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
}

// Outfit은 빌드 때 받아 직접 호스팅해서, CSS @import로 외부 요청이 줄줄이 이어지지 않게 함
const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '600', '800'],
  display: 'swap',
  variable: '--font-outfit',
})

const siteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      alternateName: SITE_TITLE,
      description: SITE_DESCRIPTION,
      inLanguage: 'ko-KR',
      publisher: { '@id': `${AUTHOR.url}#person` },
    },
    {
      '@type': 'Blog',
      '@id': `${SITE_URL}/#blog`,
      url: `${SITE_URL}/`,
      name: SITE_TITLE,
      inLanguage: 'ko-KR',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      author: { '@id': `${AUTHOR.url}#person` },
    },
    {
      '@type': 'Person',
      '@id': `${AUTHOR.url}#person`,
      ...AUTHOR,
    },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={outfit.variable}>
      <head>
        {/* Pretendard는 한글 subset이 커서 CDN을 유지하되, CSS @import 대신 head에서 바로 받아 발견 시점을 앞당김 */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
      </head>
      <body>
        <JsonLd data={siteJsonLd} />
        <MermaidListener />
        <PageViews />
        <header>
          <div className="container header-content">
            <Link href="/" className="logo">Sonia.dev</Link>
            <nav style={{display: 'flex', gap: '1.5rem'}}>
              <Link href="/tags" style={{fontWeight: 500, color: 'var(--text-secondary)'}}>
                Tags
              </Link>
              <Link href="/about" style={{fontWeight: 500, color: 'var(--text-secondary)'}}>
                About
              </Link>
              <a href="https://github.com/ckdtjs505" target="_blank" rel="noopener noreferrer" style={{fontWeight: 500, color: 'var(--text-secondary)'}}>
                GitHub
              </a>
            </nav>
          </div>
        </header>
        <main className="container">
          {children}
        </main>
      </body>
    </html>
  )
}
