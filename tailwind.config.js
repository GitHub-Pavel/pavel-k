/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.25rem',
      screens: {
        sm: '600px',
        md: '730px',
        lg: '984px',
        xl: '1154px',
        '2xl': '1480px'
      },
    },
    colors: {
      primary: "#000200",
      negative: "#FFFFFF",
      red: "#C80000",
      gray: "#A4A4A4",
      dark: "#2E2E2E",
      white: "#FFFFFF",
      transparent: "transparent",
      current: "currentColor",
      popup: "rgba(46,46,46,0.4)",
      placeholder: "#555555",
    },
    strokeWidth: {
      '4': '4px',
    }
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
