/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Nunito', 'sans-serif'],
      },
      screens: {
        'xs':'375px',
        'ssm':'420px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1366px',
        '3xl': '1440px',
        '4xl': '1536px',
        '5xl': '1600px',
        '6xl': '1920px',
      },
    },
    plugins: [require('tailwind-scrollbar-hide')],
  },
}
  // /** @type {import('tailwindcss').Config} */
  // import tailwindScrollbarHide from 'tailwind-scrollbar-hide';

  // export default {
  //  content: [
  //     "./index.html",
  //     "./src/**/*.{js,ts,jsx,tsx}",
  //  ],

  //  theme: {
  //     extend: {
  //       screens: {
  //         'sm': '640px',
  //         'md': '768px',
  //         'lg': '1024px',
  //         'xl': '1280px',
  //         '2xl': '1366px',
  //         '3xl': '1440px',
  //         '4xl': '1536px',
  //         '5xl': '1600px',
  //         '6xl': '1920px',
  //       },
  //     },
  //  },
  //  plugins: [tailwindScrollbarHide],
  // }


