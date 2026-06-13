import { axes } from '../data/axes'
import { TOTAL_QUESTIONS } from '../data/questions'

interface LandingProps {
  onStart: () => void
}

export default function Landing({ onStart }: LandingProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* 스크롤 영역 */}
      <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-6 pt-9">
        {/* 헤더 */}
        <div className="animate-fade-up">
          <span className="inline-flex rounded-lg bg-toss-blueLight px-2.5 py-1 text-[12px] font-extrabold uppercase tracking-[0.14em] text-toss-blue">
            AI 사용유형 검사
          </span>
          <h1 className="mt-4 text-[31px] font-extrabold leading-[1.25] tracking-tight text-toss-ink">
            나는 AI를
            <br />
            <span className="text-toss-blue">어떻게 쓰는</span> 사람일까?
          </h1>
          <p className="mt-4 text-[15px] font-medium leading-relaxed text-toss-sub">
            12개의 질문으로 알아보는 나의 AI 사용 습관.
            <br />
            16가지 유형 중 내 모습을 찾아보세요.
          </p>

          {/* 핵심 숫자 강조 */}
          <div className="mt-6 grid grid-cols-3 gap-2.5">
            <Stat value={String(TOTAL_QUESTIONS)} unit="문항" />
            <Stat value="16" unit="유형" />
            <Stat value="1" unit="분 소요" />
          </div>
        </div>

        {/* 4D 프레임워크 */}
        <div className="mt-9 animate-fade-up" style={{ animationDelay: '80ms' }}>
          <h2 className="mb-3 flex items-center gap-2 text-[17px] font-extrabold text-toss-ink">
            <span className="h-[17px] w-[3px] rounded-full bg-toss-blue" />
            4가지 기준으로 진단해요
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {axes.map((axis) => (
              <div key={axis.id} className="rounded-2xl bg-white p-4 shadow-card">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[17px] font-extrabold text-toss-ink">
                      {axis.title}
                    </div>
                    <div className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-toss-gray">
                      {axis.english}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <LetterBadge>{axis.poleA.letter}</LetterBadge>
                    <LetterBadge>{axis.poleB.letter}</LetterBadge>
                  </div>
                </div>
                <p className="mt-2.5 text-[12.5px] font-medium leading-snug text-toss-sub">
                  {axis.coreQuestion}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 안내 */}
        <div
          className="mt-6 animate-fade-up rounded-2xl bg-white p-5 shadow-card"
          style={{ animationDelay: '160ms' }}
        >
          <p className="text-[13.5px] font-bold text-toss-ink">
            안심하고 검사하세요
          </p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-toss-sub">
            모든 결과는 <b className="font-bold text-toss-ink">내 기기 안에서만</b>{' '}
            계산돼요. 어떤 정보도 서버로 전송하거나 저장하지 않아요.
          </p>
        </div>

        {/* 출처 */}
        <p
          className="mt-6 animate-fade-up text-center text-[11.5px] leading-relaxed text-toss-gray"
          style={{ animationDelay: '220ms' }}
        >
          이 검사는 Anthropic의{' '}
          <b className="font-bold text-toss-sub">AI Fluency(4D)</b> 프레임워크
          <br />
          (Delegation · Description · Discernment · Diligence)를 토대로 했어요.
        </p>
      </div>

      {/* 하단 고정 CTA */}
      <div className="shrink-0 border-t border-toss-line bg-toss-bg px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3 device:pb-7">
        <button
          onClick={onStart}
          className="w-full rounded-2xl bg-toss-blue py-4 text-[17px] font-bold text-white shadow-btn transition active:scale-[0.98]"
        >
          검사 시작하기
        </button>
      </div>
    </div>
  )
}

function Stat({ value, unit }: { value: string; unit: string }) {
  return (
    <div className="rounded-2xl bg-white py-3 text-center shadow-card">
      <div className="text-[22px] font-extrabold leading-none text-toss-ink tabular">
        {value}
      </div>
      <div className="mt-1 text-[12px] font-semibold text-toss-gray">{unit}</div>
    </div>
  )
}

function LetterBadge({ children }: { children: string }) {
  return (
    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-toss-blueLight text-[13px] font-extrabold text-toss-blue">
      {children}
    </span>
  )
}
