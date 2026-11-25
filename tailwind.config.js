/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    screens: {
      sm: "560px",
      md: "820px",
      lg: "1080px",
      xl: "1280px",
      "2xl": "1500px",
    },
    extend: {
      colors: {
        page: "var(--color-page)",
        surface: "var(--color-surface)",
        "surface-soft": "var(--color-surface-soft)",
        ink: "var(--color-ink)",
        muted: "var(--color-muted)",
        line: "var(--color-line)",
        focus: "var(--color-focus)",
        danger: "var(--color-danger)",
        violet: "#7c5cff",
        "violet-strong": "#5638bf",
        coral: "#ff6a88",
        amber: "#ffb84d",
      },
      maxWidth: {
        content: "1180px",
        "content-wide": "1280px",
      },
      borderRadius: {
        card: "20px",
        panel: "28px",
      },
      boxShadow: {
        card: "0 8px 28px rgb(36 23 72 / 6%)",
        lift: "0 18px 60px rgb(42 26 92 / 12%)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(115deg, #6043d6, #c34665)",
      },
    },
  },
  plugins: [],
};
