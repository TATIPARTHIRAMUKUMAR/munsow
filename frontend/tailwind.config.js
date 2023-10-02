/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms';

export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        custom1: ["'Playfair Display'","'Noto Sans JP'",  "serif" ,"sans-serif",],
      },
    },
  },
  plugins: [require('@tailwindcss/forms'),],
}

