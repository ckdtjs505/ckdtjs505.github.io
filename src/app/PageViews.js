'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { GOATCOUNTER_CODE } from '../lib/site'

const SCRIPT_ID = 'goatcounter-script'

// 조회수 집계: GoatCounter(쿠키 없음, 무료). 집계 결과는 https://<code>.goatcounter.com 대시보드에서 확인
export default function PageViews() {
  const pathname = usePathname()

  useEffect(() => {
    if (!GOATCOUNTER_CODE) return
    const count = () => window.goatcounter?.count?.({ path: pathname })

    if (window.goatcounter?.count) return count()
    if (document.getElementById(SCRIPT_ID)) return

    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.async = true
    script.src = 'https://gc.zgo.at/count.js'
    script.dataset.goatcounter = `https://${GOATCOUNTER_CODE}.goatcounter.com/count`
    // 자동 집계를 끄고 직접 센다: next/link로 이동하면 페이지가 새로 로드되지 않아 count.js가 못 세기 때문
    script.dataset.goatcounterSettings = JSON.stringify({ no_onload: true })
    script.onload = count
    document.head.appendChild(script)
  }, [pathname])

  return null
}
