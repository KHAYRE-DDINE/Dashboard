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
    plugins: [
      require('daisyui'),
    ],
  }
}