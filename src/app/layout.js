import './globals.css'
import Script from 'next/script'
import HighlightListener from './HighlightListener'
import Link from 'next/link'

export const metadata = {
  title: '소니아 개발 블로그',
  description: '주로 자바스크립트에 대해 다룹니다 ㅎㅎ',
  keywords: 'javascript, react, nodejs'
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css" />
      </head>
      <body>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js" strategy="afterInteractive" />
        <HighlightListener />
        <header>
          <div className="container header-content">
            <a href="/" className="logo">Sonia.dev</a>
            <nav style={{display: 'flex', gap: '1.5rem'}}>
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
