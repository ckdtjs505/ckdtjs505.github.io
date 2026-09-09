'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function HighlightListener() {
  const pathname = usePathname()

  useEffect(() => {
    const applyHighlight = () => {
      if (window.hljs) {
        document.querySelectorAll('pre code').forEach((block) => {
          // 이미 하이라이팅된 코드가 아닐 경우에만 적용
          if (!block.classList.contains('hljs')) {
            window.hljs.highlightElement(block);
          }
        });
      }
    };

    // CDN에서 hljs가 로드될 때까지 기다렸다가 하이라이팅 적용
    if (window.hljs) {
      applyHighlight();
    } else {
      const interval = setInterval(() => {
        if (window.hljs) {
          applyHighlight();
          clearInterval(interval);
        }
      }, 100);
      
      // 5초 후에도 로드되지 않으면 인터벌 정리
      setTimeout(() => clearInterval(interval), 5000);
    }
  }, [pathname])

  return null
}
