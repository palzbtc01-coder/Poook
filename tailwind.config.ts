import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        // PRD palette
        primary: {
          DEFAULT: "#6C3BF5", // Ungu elektrik
          foreground: "#FFFFFF",
          50: "#F1ECFE",
          100: "#E0D4FD",
          200: "#C3AAFB",
          300: "#A37EF9",
          400: "#854FF7",
          500: "#6C3BF5",
          600: "#5526D6",
          700: "#421CA8",
          800: "#2F147A",
          900: "#1E0D4F",
        },
        secondary: {
          DEFAULT: "#00D4FF", // Cyan neon
          foreground: "#0A0A12",
        },
        accent: {
          DEFAULT: "#FFD600", // Kuning sorot
          foreground: "#0A0A12",
        },
        background: "#0A0A12", // Hitam biru gelap
        surface: {
          DEFAULT: "#13131F",
          light: "#1C1C2B",
        },
        border: "#252536",
        foreground: "#FFFFFF",
        muted: "#A0A0B8", // Text secondary
        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",
      },
      fontFamily: {
        display: ["'Syne Variable'", "system-ui", "sans-serif"],
        sans: ["'DM Sans Variable'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono Variable'", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "gradient-brand":
          "linear-gradient(135deg, #6C3BF5 0%, #00D4FF 100%)",
        "gradient-radial":
          "radial-gradient(ellipse at top, rgba(108,59,245,0.25), transparent 60%)",
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(108,59,245,0.55)",
        "glow-cyan": "0 0 40px -8px rgba(0,212,255,0.5)",
        card: "0 8px 30px -12px rgba(0,0,0,0.6)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        "accordion-down": {
          "0%": { height: "0", opacity: "0" },
          "100%": { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
