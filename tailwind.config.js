/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      screens: {
        xs: "380px", // Custom screen size
        sm: "540px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      rotate: {
        405: "405deg",
      },
      colors: {
        primary: {
          DEFAULT: "#FFFFFF", // Light mode primary background
          dark: "#111827",    // Dark mode primary background
        },
        secondary: {
          DEFAULT: "#F5F7FA",
          dark: "#1F2937",
        },
        active: "#F0F2F5",
        hover: "#374151",
      },
      fontFamily: {
        body: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [
    require("tailwindcss/plugin")(({ matchUtilities }) => {
      matchUtilities({
        g: (value) => ({
          [`@apply ${value.replaceAll(",", " ")}`]: {},
        }),
      });
    }),
  ],
};
