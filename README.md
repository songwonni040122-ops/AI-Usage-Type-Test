# 나의 AI 사용유형 검사 🤖

MBTI 스타일의 인터랙티브 **AI 사용유형 검사** 웹앱이에요. 12개의 질문에 답하면
생성형 AI를 다루는 나의 습관을 진단해 **16가지 유형 중 하나**로 알려줘요.

이 검사는 Anthropic의 **AI Fluency(4D) 프레임워크**를 이론적 토대로 삼았어요.

> ⚠️ 재미를 위한 자가 진단이에요. 학술적 진단 도구가 아니며, 모든 계산은
> 브라우저 안에서만 이뤄지고 어떤 데이터도 서버로 전송·저장하지 않아요.

<br />

## 🧭 4D 프레임워크 — 4개의 진단 축

| 축 | Dimension | 핵심 질문 | 두 성향 |
| --- | --- | --- | --- |
| 위임 | **D**elegation | 어디까지 AI에게 맡기나요? | `D` 위임형 ↔ `P` 주도형 |
| 설명 | **D**escription | AI에게 어떻게 요청하나요? | `S` 설계형 ↔ `C` 대화형 |
| 분별 | **D**iscernment | 결과를 어떻게 받아들이나요? | `V` 검증형 ↔ `T` 신뢰형 |
| 책임 | **D**iligence | 어떤 태도로 사용하나요? | `R` 책임형 ↔ `E` 자유형 |

네 축의 조합(2×2×2×2)으로 **16가지 유형 코드**가 만들어져요.
예) `DSVR` = 위임형 · 설계형 · 검증형 · 책임형 → **AI 총괄 디렉터**

<br />

## 🧩 16가지 유형

`DSVR` AI 총괄 디렉터 · `DSVE` 스마트 자동화 엔지니어 · `DSTR` 믿음직한 설계자 ·
`DSTE` 풀오토 자동화 마니아 · `DCVR` 대화형 탐험가 · `DCVE` 빠른 실험가 ·
`DCTR` 느긋한 신뢰 파트너 · `DCTE` AI 올인 의존러 · `PSVR` 꼼꼼한 검증 장인 ·
`PSVE` 독립 연구자 · `PSTR` 신중한 실무가 · `PSTE` 실용주의 도구러 ·
`PCVR` 비판적 대화가 · `PCVE` 감각파 크리에이터 · `PCTR` 균형 잡힌 조력자 ·
`PCTE` 가벼운 입문 탐색러

<br />

## 🛠 기술 스택

- **React 18 + TypeScript** (Vite) — 프레임워크 없는 순수 SPA
- **Tailwind CSS** — 토스 스타일의 모바일 우선 반응형 디자인
- **백엔드/DB 없음** — 100% 프론트엔드, 정적 사이트로 배포 가능
- **외부 API 호출 없음** — 결과 계산은 전부 클라이언트에서 처리
- 폰트: Pretendard (CDN, 오프라인 시 시스템 폰트로 폴백)

<br />

## 🚀 실행 방법

```bash
npm install      # 의존성 설치
npm run dev      # 개발 서버 (http://localhost:5173)
npm run build    # 타입 체크 + 프로덕션 빌드 → dist/
npm run preview  # 빌드 결과 미리보기
```

### 배포

`npm run build`로 생성된 `dist/` 폴더를 그대로 정적 호스팅에 올리면 돼요
(GitHub Pages, Vercel, Netlify, Cloudflare Pages 등). `vite.config.ts`에서
`base: './'`(상대 경로)로 설정되어 있어 어떤 하위 경로에서도 동작해요.

<br />

## 📁 프로젝트 구조

```
src/
├─ data/
│  ├─ axes.ts        # 4D 4개 축·극(pole) 정의
│  ├─ questions.ts   # 12개 문항 (축마다 3개, 방향 혼합)
│  └─ types.ts       # 16개 유형의 설명·강점·주의·성장팁·궁합
├─ lib/
│  └─ scoring.ts     # 응답 → 축 점수 → 유형 코드 계산
├─ components/
│  ├─ Landing.tsx    # 시작 화면
│  ├─ Quiz.tsx       # 한 화면 한 문항, 자동 진행
│  ├─ ProgressBar.tsx
│  ├─ AxisBar.tsx    # 결과의 축별 성향 막대
│  └─ Result.tsx     # 유형 결과 + 4D 분석 + 공유
└─ App.tsx           # 화면 전환 + 공유 링크(?type=CODE) 처리
```

<br />

## 🔗 결과 공유

검사를 마치면 URL이 `?type=CODE` 형태로 바뀌어, 그 링크를 열면 해당 유형
결과가 바로 보여요. 모바일에서는 기기 공유 시트, 그 외에는 링크 복사로 동작해요.

<br />

## 📚 참고

- Anthropic, *AI Fluency: Frameworks & Foundations* — 4D 모델
  (Delegation · Description · Discernment · Diligence)
