/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2ead4b',
          light: '#d9f3e1',
          pale: '#edf8f0',
          pressed: '#238f3d',
        },
        canvas: '#f5f1ec',
        surface: {
          DEFAULT: '#ffffff',
          soft: '#fafaf9',
        },
        ink: {
          DEFAULT: '#1a1a1a',
          secondary: '#5d5b54',
          muted: '#787671',
          placeholder: '#a4a097',
        },
        hairline: {
          DEFAULT: '#e5e3df',
          soft: '#ede9e4',
        },
        // Subject tints from Notion
        tint: {
          math: '#dcecfa',
          science: '#d9f3e1',
          language: '#fde0ec',
          art: '#ffe8d4',
          history: '#f8f5e8',
          thinking: '#e6e0f5',
        },
        // Semantic
        success: '#2ead4b',
        warning: {
          DEFAULT: '#dd5b00',
          bg: '#fff3e0',
        },
        error: {
          DEFAULT: '#d03238',
          bg: '#fde8e8',
        },
        info: {
          DEFAULT: '#0075de',
          bg: '#e3f2fd',
        },
        // Chat
        'chat-user': '#2ead4b',
        'chat-bot': '#ffffff',
        'chat-bot-border': '#e5e3df',
        // Progress
        'progress-fill': '#2ead4b',
        'progress-track': '#e5e3df',
        'streak-gold': '#f5d75e',
        // Dark surfaces
        'inverse-canvas': '#0a1530',
        'inverse-surface': '#1a2a52',
        'on-dark': '#ffffff',
        'on-dark-muted': '#a4a097',
      },
      borderRadius: {
        'xs': '4px',
        'sm-custom': '8px',
        'md-custom': '12px',
        'lg-custom': '16px',
        'xl-custom': '20px',
        'pill': '9999px',
      },
      spacing: {
        'xxs': '2px',
      },
    },
  },
  plugins: [],
};
