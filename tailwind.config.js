/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./lib/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Core surfaces
        dexBg: "#0A0A0A", // Background
        dexSurface: "#141414", // Surface
        dexSurfaceElevated: "#1E1E1E",
        dexBorder: "#2A2A2A",

        // Text
        dexText: "#F0F0F0", // Primary
        dexTextSecondary: "#A0A0A0",
        dexTextMuted: "#606060",

        // Accents
        dexAccent: "#F4D03F", // Accent Yellow
        dexAccentDim: "#7A6820",

        // Status
        dexGain: "#2ECC71",
        dexLoss: "#E74C3C",
        dexGrade: "#F39C12",
      },
    },
  },
  plugins: [],
};
