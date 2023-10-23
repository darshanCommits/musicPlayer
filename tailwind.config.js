/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/js/**/*.ts"],
  theme: {
    extend: {
      colors : {
        body : "#0D1117",
        gray : "#2D3133",
        red : "#DD3D2C",
        "red-hover" : "#FF634E",
      },
      textColor : {
      }
    },
  },
  plugins: [],
}

