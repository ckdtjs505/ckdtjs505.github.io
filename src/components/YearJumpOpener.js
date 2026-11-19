'use client'

import { useEffect } from 'react'

// 접힌 연도(<details>)로 바로가기하면 펼쳐준다. 링크 클릭과 #year-xxxx로 들어온 첫 진입 모두 처리.
export default function YearJumpOpener() {
  useEffect(() => {
    const open = (hash) => {
      if (!hash?.startsWith('#year-')) return
      const details = document.getElementById(hash.slice(1))?.closest('details')
      if (details) details.open = true
    }
    const onClick = (e) => open(e.target.closest?.('a[href^="#year-"]')?.getAttribute('href'))
    const onHash = () => open(location.hash)

    if (location.hash) {
      open(location.hash)
      document.getElementById(location.hash.slice(1))?.scrollIntoView()
    }
    document.addEventListener('click', onClick)
    window.addEventListener('hashchange', onHash)
    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('hashchange', onHash)
    }
  }, [])

  return null
}
