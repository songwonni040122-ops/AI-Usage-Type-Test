interface ProgressBarProps {
  current: number // 1-based 현재 문항 번호
  total: number
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = Math.round((current / total) * 100)
  return (
    <div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-toss-line">
        <div
          className="h-full rounded-full bg-toss-blue transition-[width] duration-300 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="mt-2 text-right text-[12px] font-semibold tabular text-toss-gray">
        <span className="text-toss-blue">{current}</span> / {total}
      </div>
    </div>
  )
}
