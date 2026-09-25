/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        farm: {
          dark: '#143626',      // Deep forest green
          green: '#235A3F',     // Rich field green
          medium: '#2D6A4F',    // Meadow green
          light: '#52B788',     // Fresh leaf green
          pale: '#EAF7EF',      // Soft green background
          accent: '#E9C46A',    // Sunlit warm gold
          gold: '#D4A373',      // Wheat gold
          warm: '#F4A261',      // Earthy warm amber
          earth: '#4A3728',     // Deep fertile soil brown
          tan: '#F7F4EB',       // Warm parchment cream
          clay: '#C86D51',      // Rust clay
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'base': ['1.125rem', { lineHeight: '1.75rem' }], // Default 18px body text for sunlight readability!
        'lg': ['1.25rem', { lineHeight: '1.875rem' }],
        'xl': ['1.375rem', { lineHeight: '2rem' }],
        '2xl': ['1.625rem', { lineHeight: '2.25rem' }],
        '3xl': ['2rem', { lineHeight: '2.5rem' }],
        '4xl': ['2.5rem', { lineHeight: '3rem' }],
        '5xl': ['3.25rem', { lineHeight: '3.75rem' }],
      },
      boxShadow: {
        'earth': '0 10px 30px -5px rgba(20, 54, 38, 0.08), 0 4px 12px -2px rgba(74, 55, 40, 0.05)',
        'lifted': '0 20px 35px -10px rgba(20, 54, 38, 0.12)',
      }
    },
  },
  plugins: [],
}
