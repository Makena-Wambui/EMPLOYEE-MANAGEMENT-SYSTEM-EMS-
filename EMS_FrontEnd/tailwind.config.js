/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        aguDisplay: ["'Agu Display'", "sans-serif"],
        firaCode: ["'Fira Code'", "monospace"],
        spaceMono: ["'Space Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
