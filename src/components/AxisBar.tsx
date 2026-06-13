import { useEffect, useState } from 'react'
import type { AxisResult } from '../lib/scoring'

interface AxisBarProps {
  result: AxisResult
  delay?: number
}

export default function AxisBar({ result, delay = 0 }: AxisBarProps) {
  const { axis, strengthA, pole, percent, balanced } = result
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = window.setTimeout(() => setMounted(true), 80 + delay)
    return () => window.clearTimeout(t)
  }, [delay])

  const target = strengthA * 100
  const fill = mounted ? target : 0
  // 끝에 붙는 손잡이가 잘리지 않도록 살짝 안쪽으로
  const thumbLeft = Math.min(95, Math.max(5, fill))

  const isA = strengthA >= 0.5

  return (
    <div className="rounded-2xl bg-white p-4 shadow-card">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-lg">{axis.emoji}</span>
        <span className="text-[15px] font-bold text-toss-ink">{axis.title}</span>
        <span className="text-[10px] font-semibold uppercase tracking-wide text-toss-gray">
          {axis.english}
        </span>
        <span className="ml-auto text-[13px] font-bold text-toss-blue tabular">
          {balanced ? '균형' : `${percent}%`}
        </span>
      </div>

      {/* 트랙 */}
      <div className="relative h-2.5 w-full rounded-full bg-toss-line">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-toss-blue/45 to-toss-blue transition-[width] duration-700 ease-out"
          style={{ width: `${fill}%` }}
        />
        <div
          className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-toss-blue bg-white shadow-card transition-[left] duration-700 ease-out"
          style={{ left: `${thumbLeft}%` }}
        />
      </div>

      {/* 양극 라벨 */}
      <div className="mt-2.5 flex items-center justify-between text-[12.5px]">
        <span
          className={
            !isA
              ? 'font-bold text-toss-ink'
              : 'font-medium text-toss-gray'
          }
        >
          {axis.poleB.letter} · {axis.poleB.name}
        </span>
        <span
          className={
            isA ? 'font-bold text-toss-ink' : 'font-medium text-toss-gray'
          }
        >
          {axis.poleA.letter} · {axis.poleA.name}
        </span>
      </div>

      <p className="mt-2 text-[12.5px] leading-snug text-toss-sub">
        {balanced ? '두 성향이 비슷해요 — ' : ''}
        {pole.short}
      </p>
    </div>
  )
}
