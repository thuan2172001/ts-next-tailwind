/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme');

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  important: true,
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', ...fontFamily.sans],
      },
      colors: {
        primary: {
          // Customize it on globals.css :root
          50: withOpacity('--tw-clr-primary-50'),
          100: withOpacity('--tw-clr-primary-100'),
          200: withOpacity('--tw-clr-primary-200'),
          300: withOpacity('--tw-clr-primary-300'),
          400: withOpacity('--tw-clr-primary-400'),
          500: withOpacity('--tw-clr-primary-500'),
          600: withOpacity('--tw-clr-primary-600'),
          700: withOpacity('--tw-clr-primary-700'),
          800: withOpacity('--tw-clr-primary-800'),
          900: withOpacity('--tw-clr-primary-900'),
        },
        red: {
          // Customize it on globals.css :root
          50: withOpacity('--tw-clr-red-50'),
          100: withOpacity('--tw-clr-red-100'),
          200: withOpacity('--tw-clr-red-200'),
          300: withOpacity('--tw-clr-red-300'),
          400: withOpacity('--tw-clr-red-400'),
          500: withOpacity('--tw-clr-red-500'),
          600: withOpacity('--tw-clr-red-600'),
          700: withOpacity('--tw-clr-red-700'),
          800: withOpacity('--tw-clr-red-800'),
          900: withOpacity('--tw-clr-red-900'),
        },
        orange: {
          // Customize it on globals.css :root
          50: withOpacity('--tw-clr-orange-50'),
          100: withOpacity('--tw-clr-orange-100'),
          200: withOpacity('--tw-clr-orange-200'),
          300: withOpacity('--tw-clr-orange-300'),
          400: withOpacity('--tw-clr-orange-400'),
          500: withOpacity('--tw-clr-orange-500'),
          600: withOpacity('--tw-clr-orange-600'),
          700: withOpacity('--tw-clr-orange-700'),
          800: withOpacity('--tw-clr-orange-800'),
          900: withOpacity('--tw-clr-orange-900'),
        },
        yellow: {
          // Customize it on globals.css :root
          50: withOpacity('--tw-clr-yellow-50'),
          100: withOpacity('--tw-clr-yellow-100'),
          200: withOpacity('--tw-clr-yellow-200'),
          300: withOpacity('--tw-clr-yellow-300'),
          400: withOpacity('--tw-clr-yellow-400'),
          500: withOpacity('--tw-clr-yellow-500'),
          600: withOpacity('--tw-clr-yellow-600'),
          700: withOpacity('--tw-clr-yellow-700'),
          800: withOpacity('--tw-clr-yellow-800'),
          900: withOpacity('--tw-clr-yellow-900'),
        },
        green: {
          // Customize it on globals.css :root
          50: withOpacity('--tw-clr-green-50'),
          100: withOpacity('--tw-clr-green-100'),
          200: withOpacity('--tw-clr-green-200'),
          300: withOpacity('--tw-clr-green-300'),
          400: withOpacity('--tw-clr-green-400'),
          500: withOpacity('--tw-clr-green-500'),
          600: withOpacity('--tw-clr-green-600'),
          700: withOpacity('--tw-clr-green-700'),
          800: withOpacity('--tw-clr-green-800'),
          900: withOpacity('--tw-clr-green-900'),
        },
        gray: {
          // Customize it on globals.css :root
          50: withOpacity('--tw-clr-gray-50'),
          100: withOpacity('--tw-clr-gray-100'),
          200: withOpacity('--tw-clr-gray-200'),
          300: withOpacity('--tw-clr-gray-300'),
          400: withOpacity('--tw-clr-gray-400'),
          500: withOpacity('--tw-clr-gray-500'),
          600: withOpacity('--tw-clr-gray-600'),
          700: withOpacity('--tw-clr-gray-700'),
          800: withOpacity('--tw-clr-gray-800'),
          900: withOpacity('--tw-clr-gray-900'),
        },
        dark: '#222222',
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: 0.99,
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: 0.4,
            filter: 'none',
          },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
      },
    },
  },
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
