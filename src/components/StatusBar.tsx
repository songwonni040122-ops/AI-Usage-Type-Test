import { useEffect, useState } from 'react'

function nowHM(): string {
  const d = new Date()
  return `${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`
}

/**
 * 폰 목업 상단의 가짜 상태바. 디바이스 프레임(≥480px)에서만 보여요.
 * 모든 아이콘은 이모지가 아니라 직접 그린 SVG입니다.
 */
export default function StatusBar() {
  const [time, setTime] = useState(nowHM)

  useEffect(() => {
    const id = window.setInterval(() => setTime(nowHM()), 15000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="hidden shrink-0 items-center justify-between px-7 pb-1 pt-3.5 text-toss-ink device:flex">
      <span className="text-[15px] font-extrabold tabular tracking-tight">
        {time}
      </span>
      <div className="flex items-center gap-1.5">
        {/* 신호 막대 */}
        <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor" aria-hidden>
          <rect x="0" y="7" width="3" height="4" rx="1" />
          <rect x="4.7" y="4.8" width="3" height="6.2" rx="1" />
          <rect x="9.3" y="2.4" width="3" height="8.6" rx="1" />
          <rect x="14" y="0" width="3" height="11" rx="1" />
        </svg>
        {/* 와이파이 */}
        <svg
          width="17"
          height="12"
          viewBox="0 0 17 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          aria-hidden
        >
          <path d="M2 4.2a10 10 0 0 1 13 0" />
          <path d="M4.4 6.8a6.4 6.4 0 0 1 8.2 0" />
          <circle cx="8.5" cy="9.6" r="1.05" fill="currentColor" stroke="none" />
        </svg>
        {/* 배터리 */}
        <svg width="27" height="13" viewBox="0 0 27 13" fill="none" aria-hidden>
          <rect
            x="0.6"
            y="0.6"
            width="22.4"
            height="11.8"
            rx="3.4"
            stroke="currentColor"
            strokeOpacity="0.4"
          />
          <rect x="2.2" y="2.2" width="16.5" height="8.6" rx="2" fill="currentColor" />
          <path
            d="M25 4.3v4.4a2 2 0 0 0 0-4.4Z"
            fill="currentColor"
            fillOpacity="0.4"
          />
        </svg>
      </div>
    </div>
  )
}
