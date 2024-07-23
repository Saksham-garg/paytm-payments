/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        'difficulty-beginner': 'hsl(var(--difficulty-beginner) / <alpha-value>)',
        'difficulty-easy': 'hsl(var(--difficulty-easy) / <alpha-value>)',
        'difficulty-medium': 'hsl(var(--difficulty-medium) / <alpha-value>)',
        'difficulty-hard': 'hsl(var(--difficulty-hard) / <alpha-value>)',
        'difficulty-extreme': 'hsl(var(--difficulty-extreme) / <alpha-value>)',

        'difficulty-beginner-dark': 'hsl(var(--difficulty-beginner-dark) / <alpha-value>)',
        'difficulty-easy-dark': 'hsl(var(--difficulty-easy-dark) / <alpha-value>)',
        'difficulty-medium-dark': 'hsl(var(--difficulty-medium-dark) / <alpha-value>)',
        'difficulty-hard-dark': 'hsl(var(--difficulty-hard-dark) / <alpha-value>)',
        'difficulty-extreme-dark': 'hsl(var(--difficulty-extreme-dark) / <alpha-value>)',
      },
    },
  }
}