/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-base': '#F8FAFC',
        'coral': '#4361EE',       // PRODLAB Electric Blue
        'coral-deep': '#1E40AF',  // PRODLAB Deep Blue
        'peach': '#E0E7FF',       // PRODLAB Soft Lavender/Blue Tint
        'aqua': '#0EA5E9',        // PRODLAB Sky Blue
        'aqua-deep': '#0284C7',   // PRODLAB Deep Sky
        'ink': '#0F172A',         // PRODLAB Slate Ink
        'ink-2': '#475569',       // PRODLAB Slate Secondary
        'ink-3': '#94A3B8',       // PRODLAB Slate Muted
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'sans-serif'],
        body: ['"Manrope"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        'card': '28px',
        'sheet': '32px',
        'input': '18px',
        'chip': '20px',
      },
      boxShadow: {
        'glass': '0 12px 40px rgba(67, 97, 238, 0.12)',
        'glass-hover': '0 16px 48px rgba(67, 97, 238, 0.18)',
      },
      spacing: {
        'gutter': '20px',
        'stack': '16px',
        'pill': '20px',
      }
    },
  },
  plugins: [],
}
