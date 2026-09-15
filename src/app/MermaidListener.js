'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function MermaidListener() {
  const pathname = usePathname()

  useEffect(() => {
    const applyMermaid = async () => {
      if (!window.mermaid) return

      // posts.js에서 <div class="mermaid-block" data-source="..."> 로 변환해줌
      const mermaidBlocks = document.querySelectorAll('.mermaid-block[data-source]')
      if (mermaidBlocks.length === 0) return

      window.mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',
        securityLevel: 'loose',
      })

      for (const block of mermaidBlocks) {
        if (block.dataset.mermaidRendered) continue

        // 서버에서 encodeURIComponent로 저장했으므로 decode해서 원본 mermaid 정의 복원
        const graphDefinition = decodeURIComponent(block.dataset.source)
        const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`

        block.dataset.mermaidRendered = 'pending'

        try {
          const { svg } = await window.mermaid.render(id, graphDefinition)
          block.innerHTML = svg
          block.className = 'mermaid-container'
          delete block.dataset.mermaidRendered
        } catch (err) {
          console.error('[Mermaid] 렌더링 실패:', err, '\n정의:\n', graphDefinition)
          block.dataset.mermaidRendered = 'error'
        }
      }
    }

    if (window.mermaid) {
      applyMermaid()
    } else {
      const interval = setInterval(() => {
        if (window.mermaid) {
          applyMermaid()
          clearInterval(interval)
        }
      }, 100)

      setTimeout(() => clearInterval(interval), 10000)
    }
  }, [pathname])

  return null
}
