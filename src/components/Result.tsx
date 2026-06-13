import { useState } from 'react'
import { axes, poleByLetter } from '../data/axes'
import { typeByCode, type AIType } from '../data/types'
import type { AxisResult } from '../lib/scoring'
import AxisBar from './AxisBar'

interface ResultProps {
  type: AIType
  /** 검사로 들어온 경우에만 존재 (공유 링크로 열면 없음) */
  axisResults?: AxisResult[]
  /** 공유 링크로 열렸는지 */
  shared?: boolean
  onRestart: () => void
}

export default function Result({
  type,
  axisResults,
  shared = false,
  onRestart,
}: ResultProps) {
  const [toast, setToast] = useState<string | null>(null)
  const [open4d, setOpen4d] = useState(false)
  const matched = typeByCode[type.match]
  const letters = type.code.split('')

  function flashToast(msg: string) {
    setToast(msg)
    window.setTimeout(() => setToast(null), 2000)
  }

  async function handleShare() {
    const url = window.location.href
    const shareData = {
      title: '나의 AI 사용유형 검사',
      text: `나의 AI 사용유형은 [${type.code}] ${type.name}! 너의 유형도 궁금해.`,
      url,
    }
    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch {
        /* 사용자가 취소함 — 무시 */
      }
    } else {
      try {
        await navigator.clipboard.writeText(url)
        flashToast('결과 링크를 복사했어요')
      } catch {
        flashToast('링크 복사에 실패했어요')
      }
    }
  }

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      {/* 스크롤 영역 */}
      <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-6 pt-5">
        {/* 히어로 */}
        <div
          className="relative animate-scale-in overflow-hidden rounded-3xl p-6 text-white shadow-soft"
          style={{
            backgroundImage: `linear-gradient(135deg, ${type.gradient[0]}, ${type.gradient[1]})`,
          }}
        >
          <div className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full bg-white/15" />
          <div className="pointer-events-none absolute -bottom-14 -left-10 h-36 w-36 rounded-full bg-white/10" />

          <div className="relative">
            <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-white/75">
              {shared ? '친구의 AI 사용유형' : '나의 AI 사용유형'}
            </p>

            {/* 코드 — 글자 강조 */}
            <div className="mt-4 grid grid-cols-4 gap-2">
              {letters.map((letter, i) => (
                <div
                  key={i}
                  className="animate-pop rounded-xl bg-white/15 px-1 py-2.5 text-center backdrop-blur-sm"
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  <div className="text-[26px] font-black leading-none">
                    {letter}
                  </div>
                  <div className="mt-1.5 text-[10px] font-bold leading-tight text-white/85">
                    {poleByLetter[letter]?.pole.name}
                  </div>
                </div>
              ))}
            </div>

            <h1 className="mt-5 text-[27px] font-extrabold leading-tight tracking-tight">
              {type.name}
            </h1>
            <p className="mt-2 text-[14.5px] font-medium leading-relaxed text-white/90">
              {type.tagline}
            </p>
            <div className="my-4 h-px w-10 bg-white/40" />
            <p className="text-[14px] font-semibold italic leading-relaxed text-white/95">
              “{type.catchphrase}”
            </p>
          </div>
        </div>

        {shared && (
          <div className="mt-5 rounded-2xl bg-toss-blueLight p-4 text-center text-[13.5px] font-semibold leading-relaxed text-toss-blueDark">
            친구가 공유한 결과예요.
            <br />
            나의 AI 사용유형도 1분 만에 알아볼까요?
          </div>
        )}

        {/* 4D 분석 */}
        {axisResults && (
          <section className="mt-8">
            <SectionTitle title="나의 4D 분석" />
            <div className="space-y-3">
              {axisResults.map((r, i) => (
                <AxisBar key={r.axis.id} result={r} delay={i * 120} />
              ))}
            </div>
          </section>
        )}

        {/* 설명 */}
        <section className="mt-8">
          <SectionTitle title="이런 사람이에요" />
          <div className="rounded-2xl bg-white p-5 shadow-card">
            <p className="text-[14.5px] font-medium leading-[1.75] text-toss-sub">
              {type.summary}
            </p>
          </div>
        </section>

        {/* 강점 */}
        <section className="mt-7">
          <SectionTitle title="이게 강점이에요" accent="blue" />
          <ul className="space-y-2.5">
            {type.strengths.map((s, i) => (
              <ListItem key={i} accent="blue" text={s} />
            ))}
          </ul>
        </section>

        {/* 주의 */}
        <section className="mt-7">
          <SectionTitle title="이런 점은 주의해요" accent="amber" />
          <ul className="space-y-2.5">
            {type.cautions.map((c, i) => (
              <ListItem key={i} accent="amber" text={c} />
            ))}
          </ul>
        </section>

        {/* 성장 팁 */}
        <section className="mt-7">
          <SectionTitle title="더 성장하려면" accent="emerald" />
          <ul className="space-y-2.5">
            {type.tips.map((t, i) => (
              <ListItem key={i} accent="emerald" text={t} />
            ))}
          </ul>
        </section>

        {/* 궁합 */}
        {matched && (
          <section className="mt-7">
            <SectionTitle title="잘 맞는 유형" />
            <div className="relative overflow-hidden rounded-2xl bg-white p-5 pl-6 shadow-card">
              <div
                className="absolute inset-y-0 left-0 w-1.5"
                style={{
                  backgroundImage: `linear-gradient(${matched.gradient[0]}, ${matched.gradient[1]})`,
                }}
              />
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-toss-bg px-1.5 py-0.5 text-[11px] font-extrabold tracking-[0.1em] text-toss-sub tabular">
                  {matched.code}
                </span>
                <span className="text-[16px] font-extrabold text-toss-ink">
                  {matched.name}
                </span>
              </div>
              <p className="mt-2.5 text-[13.5px] font-medium leading-relaxed text-toss-sub">
                {type.matchReason}
              </p>
            </div>
          </section>
        )}

        {/* 4D 프레임워크 설명 (접기) */}
        <section className="mt-7">
          <button
            onClick={() => setOpen4d((v) => !v)}
            className="flex w-full items-center justify-between rounded-2xl bg-white px-5 py-4 text-left shadow-card transition active:scale-[0.99]"
          >
            <span className="text-[14.5px] font-extrabold text-toss-ink">
              AI Fluency 4D란?
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              className={`text-toss-gray transition-transform ${open4d ? 'rotate-180' : ''}`}
            >
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {open4d && (
            <div className="mt-3 animate-fade-up space-y-3">
              <p className="px-1 text-[13px] font-medium leading-relaxed text-toss-sub">
                Anthropic이 제안한 ‘AI를 잘 다루는 능력’의 4가지 핵심 요소예요. 이
                검사는 네 가지 축으로 당신의 성향을 진단했어요.
              </p>
              {axes.map((axis) => (
                <div key={axis.id} className="rounded-2xl bg-white p-4 shadow-card">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[15px] font-extrabold text-toss-ink">
                      {axis.title}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-toss-gray">
                      {axis.english}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[13px] font-medium leading-relaxed text-toss-sub">
                    {axis.description}
                  </p>
                  <div className="mt-2.5 flex gap-2 text-[11.5px] font-semibold">
                    <span className="rounded-lg bg-toss-bg px-2 py-1 text-toss-sub">
                      {axis.poleA.letter} {axis.poleA.name}
                    </span>
                    <span className="rounded-lg bg-toss-bg px-2 py-1 text-toss-sub">
                      {axis.poleB.letter} {axis.poleB.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 출처 */}
        <p className="mt-8 text-center text-[11.5px] leading-relaxed text-toss-gray">
          본 검사는 재미를 위한 자가 진단으로, 학술적 진단 도구가 아니에요.
          <br />
          이론적 토대: Anthropic, AI Fluency — Delegation · Description ·
          Discernment · Diligence
        </p>
      </div>

      {/* 하단 고정 버튼 */}
      <div className="flex shrink-0 gap-2.5 border-t border-toss-line bg-toss-bg px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3 device:pb-7">
        <button
          onClick={onRestart}
          className="flex-1 rounded-2xl bg-white py-4 text-[16px] font-bold text-toss-sub shadow-card transition active:scale-[0.98]"
        >
          {shared ? '나도 검사하기' : '다시 하기'}
        </button>
        <button
          onClick={handleShare}
          className="flex-[1.4] rounded-2xl bg-toss-blue py-4 text-[16px] font-bold text-white shadow-btn transition active:scale-[0.98]"
        >
          결과 공유하기
        </button>
      </div>

      {/* 토스트 */}
      {toast && (
        <div className="absolute bottom-24 left-1/2 z-50 -translate-x-1/2 animate-toast-in rounded-xl bg-toss-ink/95 px-4 py-2.5 text-[13.5px] font-semibold text-white shadow-soft">
          {toast}
        </div>
      )}
    </div>
  )
}

const BAR_ACCENTS: Record<string, string> = {
  blue: 'bg-toss-blue',
  amber: 'bg-amber-400',
  emerald: 'bg-emerald-400',
}

function SectionTitle({
  title,
  accent = 'blue',
}: {
  title: string
  accent?: keyof typeof BAR_ACCENTS
}) {
  return (
    <h2 className="mb-3 flex items-center gap-2 text-[18px] font-extrabold text-toss-ink">
      <span
        className={`h-[18px] w-[3px] rounded-full ${BAR_ACCENTS[accent] ?? BAR_ACCENTS.blue}`}
      />
      {title}
    </h2>
  )
}

function ListItem({ accent, text }: { accent: string; text: string }) {
  return (
    <li className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-card">
      <span
        className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${BAR_ACCENTS[accent] ?? BAR_ACCENTS.blue}`}
      />
      <span className="text-[14px] font-medium leading-relaxed text-toss-sub">
        {text}
      </span>
    </li>
  )
}
