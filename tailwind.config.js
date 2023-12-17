/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms';

export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        custom1: ["'Playfair Display'","'Noto Sans JP'",  "serif" ,"sans-serif"],
      },
      colors: {
        // Normal Mode Colors
        primary: "#f3f0f9", // Example primary color
        secondary: "#000000", // Example secondary color

        // Dark Mode Colors
        dark: {
          primary: "#071437", // Example dark mode primary color
          secondary: "#ff6600", // Example dark mode secondary color
        },
      },
      boxShadow: {
        // Normal Mode Box Shadows
        "sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        "md": "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        "lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1)",

        // Dark Mode Box Shadows
        "dark-sm": "0 1px 2px 0 rgba(255, 255, 255, 0.1)",
        "dark-md": "0 4px 6px -1px rgba(255, 255, 255, 0.2)",
        "dark-lg": "0 10px 15px -3px rgba(255, 255, 255, 0.2)",
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
