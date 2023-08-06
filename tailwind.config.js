/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      minWidth: {
        80: "320px",
      },
      colors: {
        "light": "#F9F8F8",
        "light-gray": "#D9D9D9",
        "hover-gray": "#EDEDED",
        "dark-gray": "#ADADAD",
        "main-dark": "#1E1E1E",
      },
    },
  },
  plugins: [],
};
