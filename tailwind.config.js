/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // 폰 목업(프레임)을 띄울 최소 너비. 그 이하(실제 휴대폰)에서는 전체화면.
      screens: {
        device: '480px',
      },
      colors: {
        // 토스 스타일 팔레트
        toss: {
          blue: '#3182F6',
          blueDark: '#1B64DA',
          blueLight: '#E8F2FE',
          ink: '#191F28', // 기본 텍스트
          sub: '#4E5968', // 보조 텍스트
          gray: '#8B95A1', // 흐린 텍스트
          line: '#E5E8EB', // 구분선
          bg: '#F2F4F6', // 배경
          card: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: [
          'Pretendard Variable',
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'Roboto',
          'Apple SD Gothic Neo',
          'Segoe UI',
          'Malgun Gothic',
          'sans-serif',
        ],
      },
      maxWidth: {
        app: '480px',
      },
      boxShadow: {
        card: '0 2px 12px rgba(0, 0, 0, 0.05)',
        soft: '0 6px 24px rgba(0, 0, 0, 0.08)',
        btn: '0 8px 24px rgba(49, 130, 246, 0.28)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'pop': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '60%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'toast-in': {
          '0%': { opacity: '0', transform: 'translate(-50%, 12px)' },
          '100%': { opacity: '1', transform: 'translate(-50%, 0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.4s ease-out both',
        'fade-in': 'fade-in 0.3s ease-out both',
        'scale-in': 'scale-in 0.35s ease-out both',
        'pop': 'pop 0.45s cubic-bezier(0.18, 0.89, 0.32, 1.28) both',
        'toast-in': 'toast-in 0.25s ease-out both',
      },
    },
  },
  plugins: [],
}
