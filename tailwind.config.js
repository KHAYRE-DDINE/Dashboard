/** @type {import('tailwindcss').Config} */
module.exports = {
<<<<<<< HEAD
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
=======
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
>>>>>>> 274c5f0b1cc78a8943c599d9535d3f21de836533
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
<<<<<<< HEAD
        normalColor: "#374151",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // primary: {
        //   DEFAULT: "hsl(var(--primary))",
        //   foreground: "hsl(var(--primary-foreground))",
        // },
        // secondary: {
        //   DEFAULT: "hsl(var(--secondary))",
        //   foreground: "hsl(var(--secondary-foreground))",
        // },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
=======
        normalColor: "#374151"
>>>>>>> 274c5f0b1cc78a8943c599d9535d3f21de836533
      },
      height: {
        firstHeightFace: "838px",
        secondHeightFace: "730px",
      },
<<<<<<< HEAD
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
=======
    },
  },
  plugins: [],
>>>>>>> 274c5f0b1cc78a8943c599d9535d3f21de836533
}

