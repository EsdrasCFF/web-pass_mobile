import { fontFamily } from './src/assets/styles/fonts'
import { colors } from './src/assets/styles/colors'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily,
      colors,
    },
  },
  plugins: [],
}