module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "#4CAF50",
          secondary: "#FFC107",
          dark: "#333333",
          light: "#F5F5F5"
        },
      },
    },
    plugins: [],
  }