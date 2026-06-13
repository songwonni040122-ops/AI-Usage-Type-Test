import { useEffect, useRef, useState } from 'react'
import { questions, LIKERT_OPTIONS, TOTAL_QUESTIONS } from '../data/questions'
import type { Answers } from '../lib/scoring'
import ProgressBar from './ProgressBar'

interface QuizProps {
  onComplete: (answers: Answers) => void
  /** 첫 문항에서 뒤로가기 → 시작 화면 */
  onBack: () => void
}

export default function Quiz({ onComplete, onBack }: QuizProps) {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [locked, setLocked] = useState(false)
  const timer = useRef<number | null>(null)

  const question = questions[index]
  const selected = answers[question.id]

  // 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current)
    }
  }, [])

  function goPrev() {
    if (locked) return
    if (index === 0) onBack()
    else setIndex((i) => i - 1)
  }

  function handleSelect(value: number) {
    if (locked) return
    const next: Answers = { ...answers, [question.id]: value }
    setAnswers(next)
    setLocked(true)
    // 선택 표시를 잠깐 보여준 뒤 자동으로 다음 문항(토스 스타일)
    timer.current = window.setTimeout(() => {
      setLocked(false)
      if (index + 1 >= TOTAL_QUESTIONS) onComplete(next)
      else setIndex((i) => i + 1)
    }, 280)
  }

  return (
    <div className="flex min-h-[100dvh] flex-col">
      {/* 상단: 뒤로가기 + 진행바 */}
      <header className="safe-top mx-auto w-full max-w-app px-5 pt-3">
        <div className="flex items-center gap-3">
          <button
            onClick={goPrev}
            aria-label="이전"
            className="-ml-1.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-toss-sub transition active:bg-toss-line/60"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 19l-7-7 7-7"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className="flex-1">
            <ProgressBar current={index + 1} total={TOTAL_QUESTIONS} />
          </div>
        </div>
      </header>

      {/* 문항 + 보기 */}
      <main className="mx-auto flex w-full max-w-app flex-1 flex-col px-5 pb-8">
        <div key={index} className="flex flex-1 animate-fade-up flex-col">
          <div className="flex flex-1 flex-col justify-center py-8">
            <p className="text-[14px] font-semibold text-toss-blue tabular">
              Q{index + 1}
            </p>
            <h2 className="mt-3 text-[22px] font-bold leading-[1.45] text-toss-ink">
              {question.text}
            </h2>
            <p className="mt-3 text-[13.5px] text-toss-gray">
              가장 가까운 걸 골라주세요.
            </p>
          </div>

          <div className="space-y-2.5">
            {LIKERT_OPTIONS.map((opt) => {
              const isSelected = selected === opt.value
              return (
                <button
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  className={[
                    'flex w-full items-center justify-between rounded-2xl border-2 px-5 py-4 text-left text-[16px] font-semibold transition active:scale-[0.99]',
                    isSelected
                      ? 'border-toss-blue bg-toss-blueLight text-toss-blue'
                      : 'border-transparent bg-white text-toss-ink shadow-card',
                  ].join(' ')}
                >
                  <span>{opt.label}</span>
                  <span
                    className={[
                      'flex h-6 w-6 items-center justify-center rounded-full border-2 transition',
                      isSelected
                        ? 'border-toss-blue bg-toss-blue'
                        : 'border-toss-line',
                    ].join(' ')}
                  >
                    {isSelected && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M5 13l4 4L19 7"
                          stroke="#fff"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
