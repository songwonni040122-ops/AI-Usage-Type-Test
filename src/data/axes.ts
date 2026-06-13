// ─────────────────────────────────────────────────────────────
// AI Fluency 4D 프레임워크 기반 4개 축 정의
// (Anthropic, "AI Fluency: Frameworks & Foundations")
//   1. Delegation  위임  — 무엇을 AI에게 맡길 것인가
//   2. Description  설명  — 어떻게 요청하고 전달할 것인가
//   3. Discernment  분별  — 결과를 어떻게 평가/검증할 것인가
//   4. Diligence    책임  — 어떤 태도로 책임감 있게 사용할 것인가
// 각 축은 두 개의 극(pole)으로 나뉘어 2×2×2×2 = 16개 유형을 만듭니다.
// ─────────────────────────────────────────────────────────────

export type AxisId = 'delegation' | 'description' | 'discernment' | 'diligence'

export interface Pole {
  /** 유형 코드에 쓰이는 한 글자 */
  letter: string
  /** 한국어 극 이름 (예: 위임형) */
  name: string
  /** 한 줄 설명 */
  short: string
}

export interface Axis {
  id: AxisId
  /** 코드에서의 위치 (0~3) */
  index: number
  /** 한국어 축 이름 (예: 위임) */
  title: string
  /** 영문 이름 */
  english: string
  emoji: string
  /** 이 축이 답하는 핵심 질문 */
  coreQuestion: string
  /** 이 4D 차원이 무엇인지에 대한 설명 */
  description: string
  /** 점수가 높을 때(평균 이상) 선택되는 극 */
  poleA: Pole
  /** 점수가 낮을 때 선택되는 극 */
  poleB: Pole
}

export const axes: Axis[] = [
  {
    id: 'delegation',
    index: 0,
    title: '위임',
    english: 'Delegation',
    emoji: '🎯',
    coreQuestion: '어디까지 AI에게 맡기나요?',
    description:
      '어떤 일을 AI에게 맡기고 무엇을 직접 할지 정하는 힘이에요. 나의 목표와 AI의 강점을 알고, 일을 똑똑하게 나누는 능력이죠.',
    poleA: {
      letter: 'D',
      name: '위임형',
      short: '큰 일도 과감하게 AI에게 맡겨요',
    },
    poleB: {
      letter: 'P',
      name: '주도형',
      short: '핵심은 직접 하고 AI는 거들게 해요',
    },
  },
  {
    id: 'description',
    index: 1,
    title: '설명',
    english: 'Description',
    emoji: '📝',
    coreQuestion: 'AI에게 어떻게 요청하나요?',
    description:
      '원하는 결과·방식·역할을 AI에게 명확히 전달하는 힘이에요. 좋은 프롬프트로 AI의 잠재력을 끌어내는 능력이죠.',
    poleA: {
      letter: 'S',
      name: '설계형',
      short: '맥락과 조건을 촘촘히 설계해 요청해요',
    },
    poleB: {
      letter: 'C',
      name: '대화형',
      short: '가볍게 던지고 주고받으며 다듬어요',
    },
  },
  {
    id: 'discernment',
    index: 2,
    title: '분별',
    english: 'Discernment',
    emoji: '🔍',
    coreQuestion: 'AI의 결과를 어떻게 받아들이나요?',
    description:
      'AI의 결과와 과정을 비판적으로 살펴보는 힘이에요. 그럴듯한 오류를 가려내고 품질을 평가하는 능력이죠.',
    poleA: {
      letter: 'V',
      name: '검증형',
      short: '한 번 더 따져보고 확인해요',
    },
    poleB: {
      letter: 'T',
      name: '신뢰형',
      short: '괜찮아 보이면 믿고 빠르게 활용해요',
    },
  },
  {
    id: 'diligence',
    index: 3,
    title: '책임',
    english: 'Diligence',
    emoji: '🤝',
    coreQuestion: '어떤 태도로 사용하나요?',
    description:
      'AI 사용을 투명하고 윤리적으로, 책임감 있게 다루는 태도예요. 사용 사실을 밝히고 최종 결과에 책임지는 자세죠.',
    poleA: {
      letter: 'R',
      name: '책임형',
      short: '출처와 책임, 투명함을 챙겨요',
    },
    poleB: {
      letter: 'E',
      name: '자유형',
      short: '효율을 우선하고 형식엔 얽매이지 않아요',
    },
  },
]

/** 코드 글자 → 극(Pole) + 축(Axis) 빠른 조회 */
export const poleByLetter: Record<string, { axis: Axis; pole: Pole }> = (() => {
  const map: Record<string, { axis: Axis; pole: Pole }> = {}
  for (const axis of axes) {
    map[axis.poleA.letter] = { axis, pole: axis.poleA }
    map[axis.poleB.letter] = { axis, pole: axis.poleB }
  }
  return map
})()

/** 축 id로 축 조회 */
export const axisById: Record<AxisId, Axis> = axes.reduce(
  (acc, a) => {
    acc[a.id] = a
    return acc
  },
  {} as Record<AxisId, Axis>,
)
