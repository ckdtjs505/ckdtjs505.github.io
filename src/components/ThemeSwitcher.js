'use client'

import { useEffect, useState } from 'react'
import { themeList } from 'sonia-ui/tokens'

export const DEFAULT_THEME = 'sonia'

// 테마 목록은 sonia-ui에서 온다. 고른 값은 <html data-theme>와 localStorage에 남긴다.
export default function ThemeSwitcher() {
  const [theme, setTheme] = useState(DEFAULT_THEME)

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || DEFAULT_THEME)
  }, [])

  const change = (id) => {
    document.documentElement.dataset.theme = id
    try { localStorage.setItem('theme', id) } catch {}
    setTheme(id)
    window.dispatchEvent(new Event('themechange'))
  }

  return (
    <select
      className="theme-select"
      aria-label="테마"
      value={theme}
      onChange={(e) => change(e.target.value)}
    >
      {themeList.map((t) => (
        <option key={t.id} value={t.id}>{t.name}</option>
      ))}
    </select>
  )
}
