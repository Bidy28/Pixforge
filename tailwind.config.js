/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: token('bg'),
        surface: token('surface'),
        'surface-2': token('surface-2'),
        text: token('text'),
        muted: token('muted'),
        border: token('border'),
        accent: token('accent'),
        'accent-contrast': token('accent-contrast'),
        'accent-text': token('accent-text'),
        'accent-soft': token('accent-soft'),
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Text',
          'Inter',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      borderRadius: {
        '4xl': '28px',
        '5xl': '36px',
      },
      boxShadow: {
        card: '0 2px 12px -4px rgb(0 0 0 / 0.08), 0 8px 32px -12px rgb(0 0 0 / 0.08)',
        lift: '0 8px 24px -8px rgb(0 0 0 / 0.12), 0 24px 60px -24px rgb(0 0 0 / 0.18)',
        float: '0 24px 70px -24px rgb(0 0 0 / 0.28)',
      },
      transitionTimingFunction: {
        apple: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      maxWidth: {
        content: '1120px',
      },
    },
  },
  plugins: [],
};
