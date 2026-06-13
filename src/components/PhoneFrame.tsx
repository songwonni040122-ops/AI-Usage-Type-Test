import type { ReactNode } from 'react'
import StatusBar from './StatusBar'

/**
 * 큰 화면(≥480px)에서는 휴대폰 목업 안에서 앱이 동작하고,
 * 실제 휴대폰(작은 화면)에서는 전체화면으로 동작합니다.
 * 앱 콘텐츠는 폰 '화면' 영역 안에서만 스크롤되고, 하단 버튼도 그 안에 고정돼요.
 */
export default function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="device:flex device:min-h-[100dvh] device:items-center device:justify-center device:bg-gradient-to-b device:from-[#e7ecf3] device:to-[#dbe3ef] device:p-5">
      {/* 단말기 본체 */}
      <div className="device:relative device:w-[392px] device:shrink-0 device:rounded-[46px] device:bg-[#0a0a0c] device:p-[11px] device:shadow-[0_40px_80px_-24px_rgba(20,28,46,0.55)] device:ring-1 device:ring-black/40">
        {/* 다이내믹 아일랜드 */}
        <div className="absolute left-1/2 top-[19px] z-30 hidden h-[26px] w-[88px] -translate-x-1/2 rounded-full bg-black device:block" />

        {/* 화면 */}
        <div className="relative h-[100dvh] w-full overflow-hidden bg-toss-bg device:h-[min(840px,calc(100dvh_-_64px))] device:rounded-[36px]">
          <div className="flex h-full flex-col">
            <StatusBar />
            <main className="relative flex min-h-0 flex-1 flex-col">
              {children}
            </main>
          </div>
        </div>

        {/* 홈 인디케이터 */}
        <div className="absolute bottom-[17px] left-1/2 z-30 hidden h-[5px] w-[124px] -translate-x-1/2 rounded-full bg-black/30 device:block" />
      </div>
    </div>
  )
}
