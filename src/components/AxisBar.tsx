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
  const thumbLeft = Math.min(95, Math.max(5, fill))
  const isA = strengthA >= 0.5

  return (
    <div className="rounded-2xl bg-white p-4 shadow-card">
      <div className="mb-3 flex items-baseline gap-2">
        <span className="text-[16px] font-extrabold text-toss-ink">
          {axis.title}
        </span>
        <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-toss-gray">
          {axis.english}
        </span>
        <span className="ml-auto text-[14px] font-extrabold text-toss-blue tabular">
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
        <PoleLabel
          letter={axis.poleB.letter}
          name={axis.poleB.name}
          active={!isA}
        />
        <PoleLabel
          letter={axis.poleA.letter}
          name={axis.poleA.name}
          active={isA}
          alignRight
        />
      </div>

      <p className="mt-2 text-[12.5px] font-medium leading-snug text-toss-sub">
        {balanced ? '두 성향이 비슷해요 — ' : ''}
        {pole.short}
      </p>
    </div>
  )
}

function PoleLabel({
  letter,
  name,
  active,
  alignRight,
}: {
  letter: string
  name: string
  active: boolean
  alignRight?: boolean
}) {
  return (
    <span
      className={`flex items-center gap-1.5 ${alignRight ? 'flex-row-reverse' : ''}`}
    >
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-md text-[12px] font-extrabold ${
          active ? 'bg-toss-blue text-white' : 'bg-toss-line text-toss-gray'
        }`}
      >
        {letter}
      </span>
      <span
        className={active ? 'font-bold text-toss-ink' : 'font-medium text-toss-gray'}
      >
        {name}
      </span>
    </span>
  )
}
