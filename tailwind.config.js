/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["'Playfair Display'", "Georgia", "serif"],
        sans: ["'Nunito'", "sans-serif"],
      },
      colors: {
        ink:    "#2d1b0e",
        paper:  "#fdf8f5",
        accent: "#c9607a",
        rose:   "#f2dde4",
        sage:   "#a8c5a0",
        muted:  "#9b8a7a",
        border: "#ede5de",
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#2d1b0e",
            fontFamily: "'Nunito', sans-serif",
            fontSize: "1.05rem",
            lineHeight: "1.85",
            a: { color: "#c9607a", textDecoration: "none", "&:hover": { textDecoration: "underline" } },
            "h1,h2,h3,h4": { fontFamily: "'Playfair Display', serif", color: "#2d1b0e" },
            strong: { color: "#2d1b0e" },
            blockquote: {
              borderLeftColor: "#c9607a",
              backgroundColor: "#fdf0f3",
              padding: "0.75rem 1.25rem",
              borderRadius: "0 0.5rem 0.5rem 0",
              fontStyle: "italic",
              color: "#6b4c5e",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
