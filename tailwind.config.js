/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          "100": "#2563EB",
          "600": "#DBEAFE"
        },
        colorBlue: {
          "600": "#2563EB",
          "300": "#93C5FD"
        },
        colorGray: {
          "100": "#F3F4F6",
          "200": "#E5E7EB",
          "300": "#374151",
          "400": "#374151",
          "500": "#6B7280",
          "600": "#4B5563",
          "700": "#374151",
          "800": "#1F2937",
        },
        secondary: { '100': '#3B4A78', '200': '#2D2C53' },
        link: "#1865F2",
        required: "#F54747",
        backgroundErr: "#f5474742",
        grayD: "#E5E7EB",
        normalColor: "#374151",
      },
    },
    content: [
      'node_modules/daisyui/dist/**/*.js',
      'node_modules/react-daisyui/dist/**/*.js',
    ],
    plugins: [require('daisyui')],
    daisyui: {
      themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
      darkTheme: "dark", // name of one of the included themes for dark mode
      base: true, // applies background color and foreground color for root element by default
      styled: true, // include daisyUI colors and design decisions for all components
      utils: true, // adds responsive and modifier utility classes
      prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
      logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
      themeRoot: ":root", // The element that receives theme color CSS variables
    },

  }
}