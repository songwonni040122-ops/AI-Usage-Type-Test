import { axes } from '../data/axes'
import { TOTAL_QUESTIONS } from '../data/questions'

interface LandingProps {
  onStart: () => void
}

export default function Landing({ onStart }: LandingProps) {
  return (
    <div className="relative min-h-[100dvh]">
      <div className="mx-auto max-w-app px-5 pb-32 pt-14">
        {/* 헤더 */}
        <div className="animate-fade-up text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-toss-blueLight px-3.5 py-1.5 text-sm font-semibold text-toss-blue">
            🤖 AI 사용유형 검사
          </span>
          <h1 className="mt-5 text-[28px] font-extrabold leading-tight text-toss-ink">
            나는 AI를
            <br />
            어떻게 쓰는 사람일까?
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-toss-sub">
            12개의 질문으로 알아보는 나의 AI 사용 습관.
            <br />
            16가지 유형 중 내 모습을 찾아보세요.
          </p>

          <div className="mt-5 flex items-center justify-center gap-2 text-[13px] font-medium text-toss-gray">
            <span className="rounded-lg bg-white px-2.5 py-1 shadow-card">
              ⏱️ 약 1분
            </span>
            <span className="rounded-lg bg-white px-2.5 py-1 shadow-card">
              📝 {TOTAL_QUESTIONS}문항
            </span>
            <span className="rounded-lg bg-white px-2.5 py-1 shadow-card">
              🧩 16유형
            </span>
          </div>
        </div>

        {/* 4D 프레임워크 소개 */}
        <div
          className="mt-10 animate-fade-up"
          style={{ animationDelay: '80ms' }}
        >
          <p className="mb-3 px-1 text-[13px] font-semibold text-toss-gray">
            4가지 기준으로 진단해요
          </p>
          <div className="grid grid-cols-2 gap-3">
            {axes.map((axis) => (
              <div
                key={axis.id}
                className="rounded-2xl bg-white p-4 shadow-card"
              >
                <div className="text-2xl">{axis.emoji}</div>
                <div className="mt-2 flex items-baseline gap-1.5">
                  <span className="text-[15px] font-bold text-toss-ink">
                    {axis.title}
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-toss-gray">
                    {axis.english}
                  </span>
                </div>
                <p className="mt-1 text-[12.5px] leading-snug text-toss-sub">
                  {axis.coreQuestion}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 안내 카드 */}
        <div
          className="mt-6 animate-fade-up rounded-2xl bg-white p-5 shadow-card"
          style={{ animationDelay: '160ms' }}
        >
          <div className="flex items-start gap-3">
            <span className="text-lg">🔒</span>
            <p className="text-[13.5px] leading-relaxed text-toss-sub">
              모든 결과는{' '}
              <b className="font-semibold text-toss-ink">내 기기 안에서만 계산</b>
              돼요. 어떤 정보도 서버로 전송하거나 저장하지 않아요.
            </p>
          </div>
        </div>

        {/* 출처 */}
        <p
          className="mt-6 animate-fade-up px-2 text-center text-[12px] leading-relaxed text-toss-gray"
          style={{ animationDelay: '220ms' }}
        >
          이 검사는 Anthropic의{' '}
          <b className="font-semibold text-toss-sub">AI Fluency(4D)</b> 프레임워크
          <br />
          (Delegation·Description·Discernment·Diligence)를 토대로 제작되었어요.
        </p>
      </div>

      {/* 하단 고정 CTA */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0">
        <div className="mx-auto max-w-app bg-gradient-to-t from-toss-bg via-toss-bg to-transparent px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-6">
          <button
            onClick={onStart}
            className="pointer-events-auto w-full rounded-2xl bg-toss-blue py-4 text-[17px] font-bold text-white shadow-btn transition active:scale-[0.98]"
          >
            검사 시작하기
          </button>
        </div>
      </div>
    </div>
  )
}
