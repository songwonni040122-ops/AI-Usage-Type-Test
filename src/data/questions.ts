import type { AxisId } from './axes'

export interface Question {
  id: number
  axis: AxisId
  text: string
  /**
   * 이 문항에 '그렇다'고 답할수록 어느 극에 가까운지.
   * 'A' = 해당 축의 poleA(위임/설계/검증/책임)
   * 'B' = 해당 축의 poleB(주도/대화/신뢰/자유)
   * 한쪽으로만 묻지 않도록 축마다 방향을 섞어 응답 편향을 줄였습니다.
   */
  keyed: 'A' | 'B'
}

// 5점 리커트 척도 (한 화면에 한 문항씩 응답)
export interface LikertOption {
  value: number
  label: string
}

export const LIKERT_OPTIONS: LikertOption[] = [
  { value: 5, label: '매우 그래요' },
  { value: 4, label: '그런 편이에요' },
  { value: 3, label: '보통이에요' },
  { value: 2, label: '아닌 편이에요' },
  { value: 1, label: '전혀 아니에요' },
]

export const questions: Question[] = [
  // ── 위임 (Delegation) : D(위임형) ↔ P(주도형) ──────────────
  {
    id: 1,
    axis: 'delegation',
    text: '막막한 일이 생기면, 일단 통째로 AI에게 맡기고 결과부터 받아봐요.',
    keyed: 'A', // 위임형
  },
  {
    id: 2,
    axis: 'delegation',
    text: '중요한 작업일수록 핵심은 내가 직접 하고, AI는 보조로만 써요.',
    keyed: 'B', // 주도형
  },
  {
    id: 3,
    axis: 'delegation',
    text: '초안 작성이나 자료 정리 같은 일은 거의 AI에게 시키는 편이에요.',
    keyed: 'A', // 위임형
  },

  // ── 설명 (Description) : S(설계형) ↔ C(대화형) ─────────────
  {
    id: 4,
    axis: 'description',
    text: 'AI에게 요청할 때 배경, 조건, 원하는 형식까지 구체적으로 적어줘요.',
    keyed: 'A', // 설계형
  },
  {
    id: 5,
    axis: 'description',
    text: '일단 짧게 물어보고, 대화를 주고받으며 답을 다듬어 가는 게 편해요.',
    keyed: 'B', // 대화형
  },
  {
    id: 6,
    axis: 'description',
    text: '좋은 결과가 나온 프롬프트는 따로 저장하거나 나만의 템플릿으로 만들어요.',
    keyed: 'A', // 설계형
  },

  // ── 분별 (Discernment) : V(검증형) ↔ T(신뢰형) ────────────
  {
    id: 7,
    axis: 'discernment',
    text: 'AI가 알려준 정보는 다른 출처로 한 번 더 확인하는 편이에요.',
    keyed: 'A', // 검증형
  },
  {
    id: 8,
    axis: 'discernment',
    text: 'AI의 답이 그럴듯하면 대체로 믿고 그대로 사용해요.',
    keyed: 'B', // 신뢰형
  },
  {
    id: 9,
    axis: 'discernment',
    text: 'AI 답변에서 어색하거나 틀린 부분을 종종 발견해 바로잡아요.',
    keyed: 'A', // 검증형
  },

  // ── 책임 (Diligence) : R(책임형) ↔ E(자유형) ──────────────
  {
    id: 10,
    axis: 'diligence',
    text: '결과물에 AI를 썼다면, 어디에 어떻게 썼는지 밝히는 게 맞다고 생각해요.',
    keyed: 'A', // 책임형
  },
  {
    id: 11,
    axis: 'diligence',
    text: '결과만 좋으면 출처나 사용 방식은 크게 신경 쓰지 않아요.',
    keyed: 'B', // 자유형
  },
  {
    id: 12,
    axis: 'diligence',
    text: 'AI가 만든 내용이라도 최종 책임은 사용자인 나에게 있다고 생각해요.',
    keyed: 'A', // 책임형
  },
]

export const TOTAL_QUESTIONS = questions.length
