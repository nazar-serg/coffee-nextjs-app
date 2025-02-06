/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        secondary: "var(--secondery)",
        "secondary-hover": "var(--secondary-hover)",
        "light-brown": "var(--light-brown)",
        yellow: "var(--yellow)",
        "light-color": "var( --light-color)",
      },
    },

    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '600px',
        md: '750px',
        lg: '1020px',
        xl: '1280px',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
