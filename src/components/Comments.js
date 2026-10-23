'use client'

import { useEffect, useRef } from 'react'
import { GISCUS } from '../lib/site'

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
      'data-theme': 'dark_dimmed',
      'data-lang': 'ko',
      'data-loading': 'lazy',
    }).forEach(([key, value]) => script.setAttribute(key, value))

    container.appendChild(script)
    return () => {
      container.innerHTML = ''
    }
  }, [])

  // Discussions 카테고리 설정 전에는 댓글 영역을 숨김
  if (!GISCUS.categoryId) return null

  return <section className="comments" ref={containerRef} />
}
