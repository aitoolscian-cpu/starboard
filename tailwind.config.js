/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink)',
        deep: 'var(--deep)',
        starlight: 'var(--starlight)',
        gold: 'var(--gold)',
        aurora: 'var(--aurora)',
        amber: 'var(--amber)',
        ember: 'var(--ember)',
        muted: 'var(--muted)',
      },
      fontFamily: {
        display: ['"Fraunces Variable"', 'Georgia', 'serif'],
        sans: ['"Inter Variable"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
