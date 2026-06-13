import { axes, type Axis, type Pole } from '../data/axes'
import { questions } from '../data/questions'
import { typeByCode, type AIType, types } from '../data/types'

export interface AxisResult {
  axis: Axis
  /** poleA(위임/설계/검증/책임) 쪽으로의 성향, 0(완전 B) ~ 1(완전 A) */
  strengthA: number
  /** 더 우세한 극 */
  pole: Pole
  /** 우세한 극 쪽 비율 (50~100) */
  percent: number
  /** 거의 반반(중립)인지 — 결과 화면에서 '균형'으로 안내 */
  balanced: boolean
}

export interface QuizResult {
  code: string
  type: AIType
  axisResults: AxisResult[]
}

export type Answers = Record<number, number>

/**
 * 12개 문항의 5점 응답을 4개 축 점수로 환산해 유형을 계산합니다.
 * - 각 문항은 keyed('A'|'B')에 따라 poleA 점수로 정규화됩니다.
 * - 축별 합계가 중앙값보다 크면 poleA, 작으면 poleB의 글자를 코드로 사용합니다.
 */
export function scoreAnswers(answers: Answers): QuizResult {
  const axisResults: AxisResult[] = axes.map((axis) => {
    const axisQuestions = questions.filter((q) => q.axis === axis.id)

    let sumTowardA = 0
    let count = 0
    for (const q of axisQuestions) {
      const value = answers[q.id]
      if (!value) continue
      // keyed가 'A'면 값 그대로, 'B'면 뒤집어서(6 - value) poleA 점수로 환산
      sumTowardA += q.keyed === 'A' ? value : 6 - value
      count += 1
    }

    // 응답이 없으면 중립(0.5)
    const min = count * 1
    const max = count * 5
    const strengthA = max > min ? (sumTowardA - min) / (max - min) : 0.5

    const isA = strengthA >= 0.5
    const pole = isA ? axis.poleA : axis.poleB
    const percent = Math.round((isA ? strengthA : 1 - strengthA) * 100)
    // 중앙에서 ±1칸(약 8%) 이내면 균형으로 간주
    const balanced = Math.abs(strengthA - 0.5) < 0.09

    return { axis, strengthA, pole, percent, balanced }
  })

  const code = axisResults.map((r) => r.pole.letter).join('')
  const type = typeByCode[code] ?? types[0]

  return { code, type, axisResults }
}

/** 모든 문항에 응답했는지 */
export function isComplete(answers: Answers): boolean {
  return questions.every((q) => !!answers[q.id])
}
