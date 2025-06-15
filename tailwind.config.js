/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        card: {
          slateblue: "#D7E3F4",
          warmgray: "#F5F2EB",
          charcoal: "#2B2B2B",
        },
      },
      opacity: {
        entering: 1,
        exiting: 0,
      },
    },
  },
  plugins: [],
};
