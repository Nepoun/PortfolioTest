import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ─── Endesga64 color overrides ────────────────────────────────────────
      // All existing class names in components stay the same.
      // We just remap what those classes actually render.
      colors: {
        // "green" → purple ramp from Endesga64
        // green-300 → light purple-pink  #f389f5
        // green-400 → medium purple      #ca52c9  (main text/border accent)
        // green-500 → strong purple      #7a09fa  (buttons, active states)
        // green-600 → hover purple       #3003d9
        green: {
          300: "#f389f5",
          400: "#ca52c9",
          500: "#7a09fa",
          600: "#3003d9",
        },

        // "gray" → Endesga64 dark purple-blacks
        // gray-300 → #c7cfdd  (light text)
        // gray-400 → #92a1b9  (muted text)
        // gray-500 → #657392  (dimmer muted)
        // gray-700 → #424c6e  (subtle borders/dividers)
        // gray-800 → #2a2f4e  (card backgrounds)
        // gray-900 → #1a1932  (section alternates)
        // gray-950 → #0e071b  (deepest background)
        gray: {
          300: "#c7cfdd",
          400: "#92a1b9",
          500: "#657392",
          700: "#424c6e",
          800: "#2a2f4e",
          900: "#1a1932",
          950: "#0e071b",
        },

        // #ff0040 — signature Endesga64 accent, used sparingly
        // Use as: text-red-accent, bg-red-accent, border-red-accent
        // Good for: hero name highlight, Steam badge, active tab dot, star icon
        "red-accent": "#ff0040",
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config