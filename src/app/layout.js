import './globals.css'
import MermaidListener from './MermaidListener'
import Link from 'next/link'
import JsonLd from '../components/JsonLd'
import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION, AUTHOR } from '../lib/site'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: 'javascript, react, nodejs, frontend',
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
    images: ['/assets/img/avatar.jpg'],
  },
  twitter: { card: 'summary' },
}

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
    <html lang="ko">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css" />
      </head>
      <body>
        <JsonLd data={siteJsonLd} />
        <MermaidListener />
        <header>
          <div className="container header-content">
            <a href="/" className="logo">Sonia.dev</a>
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
