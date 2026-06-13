import { useEffect, useState } from 'react'
import Landing from './components/Landing'
import Quiz from './components/Quiz'
import Result from './components/Result'
import { scoreAnswers, type Answers, type QuizResult } from './lib/scoring'
import { isValidCode, typeByCode, type AIType } from './data/types'

type View = 'landing' | 'quiz' | 'result'

const BASE_TITLE = '나의 AI 사용유형 검사'

function getCodeFromUrl(): string | null {
  const code = new URLSearchParams(window.location.search).get('type')
  return code ? code.toUpperCase() : null
}

function setUrlType(code: string | null) {
  const url = new URL(window.location.href)
  if (code) url.searchParams.set('type', code)
  else url.searchParams.delete('type')
  window.history.replaceState(null, '', url.toString())
}

export default function App() {
  const [view, setView] = useState<View>('landing')
  const [result, setResult] = useState<QuizResult | null>(null)
  const [sharedType, setSharedType] = useState<AIType | null>(null)

  // 최초 로드 시 공유 링크(?type=CODE)로 들어왔는지 확인
  useEffect(() => {
    const code = getCodeFromUrl()
    if (isValidCode(code)) {
      setSharedType(typeByCode[code])
      setView('result')
    }
  }, [])

  // 화면 전환 시 스크롤 맨 위로 + 문서 제목 갱신
  useEffect(() => {
    window.scrollTo(0, 0)
    const shown = result?.type ?? (view === 'result' ? sharedType : null)
    document.title = shown ? `${shown.emoji} ${shown.name} · ${BASE_TITLE}` : BASE_TITLE
  }, [view, result, sharedType])

  function handleStart() {
    setResult(null)
    setSharedType(null)
    setUrlType(null)
    setView('quiz')
  }

  function handleComplete(answers: Answers) {
    const r = scoreAnswers(answers)
    setResult(r)
    setSharedType(null)
    setUrlType(r.code) // 결과 URL을 공유 가능하게 갱신
    setView('result')
  }

  function handleRestart() {
    setResult(null)
    setSharedType(null)
    setUrlType(null)
    setView('landing')
  }

  if (view === 'quiz') {
    return <Quiz onComplete={handleComplete} onBack={handleRestart} />
  }

  if (view === 'result' && result) {
    return (
      <Result
        type={result.type}
        axisResults={result.axisResults}
        onRestart={handleRestart}
      />
    )
  }

  if (view === 'result' && sharedType) {
    return <Result type={sharedType} shared onRestart={handleStart} />
  }

  return <Landing onStart={handleStart} />
}
