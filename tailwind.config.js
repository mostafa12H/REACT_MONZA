module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xl: "1280px",
        "1.5xl": "1440px",
        "2xl": "1536px",
      },
      colors: {
        primary: {
          100: "var(--color-primary-100)",
          200: "var(--color-primary-200)",
          300: "var(--color-primary-300)",
          400: "var(--color-primary-400)",
          500: "var(--color-primary-500)",
          600: "var(--color-primary-600)",
        },
        surface: {
          100: "var(--color-surface-100)",
          200: "var(--color-surface-200)",
          300: "var(--color-surface-300)",
          400: "var(--color-surface-400)",
          500: "var(--color-surface-500)",
          600: "var(--color-surface-600)",
        },
        "surface-mixed": {
          100: "var(--color-surface-mixed-100)",
          200: "var(--color-surface-mixed-200)",
          300: "var(--color-surface-mixed-300)",
          400: "var(--color-surface-mixed-400)",
          500: "var(--color-surface-mixed-500)",
          600: "var(--color-surface-mixed-600)",
        },
        dark: {
          DEFAULT: "#2E073F",
          secondary: "#7A1CAC",
          accent: "#AD49E1",
          light: "#EBD3F8",
          dark: "#0F0F0F",
          purple: "#3E065F",
          lpurple: "#d8c1f4",
          p2: "#803ea4",
        },
        sea: {
          DEFAULT: "#008DDA",
          secondary: "#41C9E2",
          accent: "#ACE2E1",
          light: "#F7EEDD",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwindcss-rtl")],
};
