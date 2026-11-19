'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeSwitcher from './ThemeSwitcher'

export default function HeaderNav() {
  const pathname = usePathname()
  const isTags = pathname === '/tags' || pathname?.startsWith('/tags/')
  const isAbout = pathname === '/about'

  return (
    <nav aria-label="주요 메뉴" className="header-nav">
      <Link href="/tags" aria-current={isTags ? 'page' : undefined}>
        Tags
      </Link>
      <Link href="/about" aria-current={isAbout ? 'page' : undefined}>
        About
      </Link>
      <a href="https://github.com/ckdtjs505" target="_blank" rel="noopener noreferrer">
        GitHub
      </a>
      <ThemeSwitcher />
    </nav>
  )
}
