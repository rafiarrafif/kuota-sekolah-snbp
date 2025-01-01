import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans"],
      },
      colors: {
        cinnabar: {
          "50": "#fff1f1",
          "100": "#ffe0e0",
          "200": "#ffc6c6",
          "300": "#ff9e9e",
          "400": "#ff6666",
          "500": "#fd3636",
          "600": "#ec2727",
          "700": "#c60f0f",
          "800": "#a31111",
          "900": "#871515",
          "950": "#4a0505",
        },
        woodsmoke: {
          50: "#EDEDED",
          100: "#DBDBDC",
          200: "#B6B6B9",
          300: "#949498",
          400: "#717175",
          500: "#4E4E51",
          600: "#3F3F41",
          700: "#303031",
          800: "#1E1E1F",
          900: "#0F0F10",
          950: "#080808",
        },
      },
    },
  },
};
