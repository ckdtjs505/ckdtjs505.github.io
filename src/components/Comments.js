'use client'

import { useEffect, useRef } from 'react'
import { GISCUS } from '../lib/site'

// 지금 테마가 어두운지(color-scheme)에 맞춰 giscus 테마를 고른다
const giscusTheme = () =>
  getComputedStyle(document.documentElement).colorScheme === 'light' ? 'light' : 'dark_dimmed'

export default function Comments() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container || !GISCUS.categoryId) return

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.async = true
    script.crossOrigin = 'anonymous'
    Object.entries({
      'data-repo': GISCUS.repo,
      'data-repo-id': GISCUS.repoId,
      'data-category': GISCUS.category,
      'data-category-id': GISCUS.categoryId,
      'data-mapping': 'pathname',
      'data-strict': '1',
      'data-reactions-enabled': '1',
      'data-input-position': 'top',
      'data-theme': giscusTheme(),
      'data-lang': 'ko',
      'data-loading': 'lazy',
    }).forEach(([key, value]) => script.setAttribute(key, value))

    container.appendChild(script)

    const onThemeChange = () => {
      const frame = container.querySelector('iframe.giscus-frame')
      frame?.contentWindow?.postMessage({ giscus: { setConfig: { theme: giscusTheme() } } }, 'https://giscus.app')
    }
    window.addEventListener('themechange', onThemeChange)
    return () => {
      window.removeEventListener('themechange', onThemeChange)
      container.innerHTML = ''
    }
  }, [])

  // Discussions 카테고리 설정 전에는 댓글 영역을 숨김
  if (!GISCUS.categoryId) return null

  return <section className="comments" ref={containerRef} />
}
