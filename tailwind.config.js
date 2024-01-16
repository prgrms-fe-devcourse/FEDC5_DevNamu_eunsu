/** @type {import('tailwindcss').Config} */

const pxToRem = (px, base = 16) => `${px / base}rem`;

const range = (start, end) => {
  return Array.from({ length: end - start + 1 }, (_, index) => index + start);
};

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      spacing: {
        ...range(1, 1400).reduce((accumulate, px) => {
          accumulate[`${px}pxr`] = pxToRem(px);
          return accumulate;
        }, {}),
      },
      colors: {
        "layer-1": "hsl(var(--layer1))",
        "layer-2": "hsl(var(--layer2))",
        "layer-3": "hsl(var(--layer3))",
        "layer-4": "hsl(var(--layer4))",
        "layer-5": "hsl(var(--layer5))",
        "layer-6": "hsl(var(--layer6))",
        "layer-7": "hsl(var(--layer7))",
        "content-1": "hsl(var(--content1))",
        "content-2": "hsl(var(--content2))",
        "content-3": "hsl(var(--content3))",
        "content-4": "hsl(var(--content4))",
        "content-5": "hsl(var(--content5))",
        "content-6": "hsl(var(--content6))",
        "content-7": "hsl(var(--content7))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--layer1))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
