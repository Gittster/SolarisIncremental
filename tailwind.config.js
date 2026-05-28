/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:            '#0A0E1A',
        surface:       '#111827',
        'surface-raise': '#1C2333',
        border:        '#2A3547',
        primary:       '#4A9EFF',
        secondary:     '#64748B',
        success:       '#22C55E',
        warning:       '#F59E0B',
        critical:      '#EF4444',
        inactive:      '#374151',
        'text-primary':   '#F1F5F9',
        'text-secondary': '#94A3B8',
        'text-dim':       '#475569',
      },
      fontFamily: {
        display: ['"Space Mono"', 'ui-monospace', 'monospace'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
        data:    ['"Space Mono"', 'ui-monospace', 'monospace'],
      },
      animation: {
        'warning-glow': 'warningGlow 2s ease-in-out infinite',
      },
      keyframes: {
        warningGlow: {
          '0%, 100%': { boxShadow: '0 0 6px rgba(245,158,11,0.15), inset 0 0 0 1px rgba(245,158,11,0.4)' },
          '50%':      { boxShadow: '0 0 16px rgba(245,158,11,0.35), inset 0 0 0 1px rgba(245,158,11,0.7)' },
        },
      },
    },
  },
  plugins: [],
}
