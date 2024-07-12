/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "background-default-default": "#fff",
        whitesmoke: "#efefef",
        "black-100": "#000",
        red: {
          "100": "#ff2626",
          "200": "#ff0000",
        },
        gray: {
          "100": "#fafafa",
          "200": "rgba(0, 0, 0, 0.5)",
        },
        "text-default-tertiary": "#b3b3b3",
        "text-default-secondary": "#757575",
        "background-brand-default": "#2c2c2c",
        "text-brand-on-brand": "#f5f5f5",
        "text-neutral-default": "#303030",
        "border-default-default": "#d9d9d9",
        "text-default-default": "#1e1e1e",
        "background-positive-secondary": "#cff7d3",
        "text-positive-on-positive-secondary": "#03542d",
        silver: {
          "100": "#bfc5d2",
          "200": "#b9b9b9",
        },
        lightgray: "#d3d3d3",
        ghostwhite: "#eff2ff",
        lightslategray: {
          "100": "#8d9aa9",
          "200": "#8798ad",
        },
        darkslategray: "#2e384d",
        royalblue: "rgba(102, 111, 232, 0.08)",
        indianred: "#e86666",
        gold: "#f1d219",
        crimson: "#d63649",
        limegreen: "#2db744",
        rosybrown: {
          "100": "#a98d8d",
          "200": "#ad8787",
        },
      },
      spacing: {
        "icon-large": "40px",
        "space-400": "16px",
        "space-200": "8px",
        "space-300": "12px",
        "space-600": "24px",
        "space-1600": "64px",
        "padding-sm": "8px",
        "space-100": "4px",
      },
      fontFamily: {
        "body-base": "Inter",
        rubik: "Rubik",
      },
      borderRadius: {
        xl: "20px",
        "3xs": "10px",
        "9980xl": "9999px",
        "12xs": "1px",
        "10xs": "3px",
        "radius-full": "9999px",
        "radius-200": "8px",
        "scale-06": "32px",
      },
    },
    fontSize: {
      "13xl": "32px",
      "7xl": "26px",
      lgi: "19px",
      smi: "13px",
      base: "16px",
      xl: "20px",
      "29xl": "48px",
      "19xl": "38px",
      "10xl": "29px",
      sm: "14px",
      "5xl": "24px",
      mini: "15px",
      xs: "12px",
      "16xl": "35px",
      "2xl": "21px",
      "9xl": "28px",
      inherit: "inherit",
    },
    screens: {
      mq1400: {
        raw: "screen and (max-width: 1400px)",
      },
      mq1350: {
        raw: "screen and (max-width: 1350px)",
      },
      mq1275: {
        raw: "screen and (max-width: 1275px)",
      },
      lg: {
        max: "1200px",
      },
      mq1150: {
        raw: "screen and (max-width: 1150px)",
      },
      mq1125: {
        raw: "screen and (max-width: 1125px)",
      },
      mq1100: {
        raw: "screen and (max-width: 1100px)",
      },
      mq1050: {
        raw: "screen and (max-width: 1050px)",
      },
      mq825: {
        raw: "screen and (max-width: 825px)",
      },
      mq800: {
        raw: "screen and (max-width: 800px)",
      },
      mq750: {
        raw: "screen and (max-width: 750px)",
      },
      mq450: {
        raw: "screen and (max-width: 450px)",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};
