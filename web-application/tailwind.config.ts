import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      textColor: {
        primary: "var(--text-primary)",
      },
      backgroundColor: {
        primary: "var(--bg-primary)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "#fb923c",
      },
    },
  },
  darkMode: "selector",
  plugins: [],
} satisfies Config;
