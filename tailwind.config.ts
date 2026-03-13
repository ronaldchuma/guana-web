import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ── Neutrals (sage-green undertone) ── */
        cream: {
          DEFAULT: "#f2f6ed",
          light: "#f7f9f4",
          dark: "#e8ede2",
        },
        deep: {
          DEFAULT: "#002600",
          800: "#0a3a0a",
          700: "#1a4d1a",
          600: "#2d602d",
        },

        /* ── Brand Primary: Forest Green ── */
        teal: {
          DEFAULT: "#002600",
          50: "#f0f7eb",
          100: "#d5eac4",
          200: "#a8d48e",
          300: "#6fb84f",
          400: "#3d8a20",
          500: "#1a6600",
          600: "#004d00",
          700: "#003a00",
          800: "#002600",
          900: "#001400",
        },

        /* ── Brand Secondary: Forest Mid ── */
        ocean: {
          DEFAULT: "#1a6600",
          light: "#3d8a20",
          dark: "#004d00",
        },

        /* ── Accent: Jungle Green ── */
        jungle: {
          DEFAULT: "#2D8B4E",
          light: "#3BA863",
          dark: "#1F6D39",
        },

        /* ── Accent: Red ── */
        sunset: {
          DEFAULT: "#ff3126",
          light: "#ff5a4d",
          dark: "#d42a1f",
        },

        /* ── Accent: Orange ── */
        coral: {
          DEFAULT: "#fc6b3e",
          light: "#fd8a65",
        },

        /* ── Accent: Sand ── */
        sand: "#D4B896",

        /* ── Brand Primary Action ── */
        "brand-blue": {
          DEFAULT: "#002600",
          hover: "#003a00",
        },

        /* ── Brand Gold (accent) ── */
        "brand-gold": "#ffc942",

        /* ── Lime (CTA text / bright accent) ── */
        lime: {
          DEFAULT: "#c1ff5e",
          light: "#d4ff8a",
          dark: "#a8e63a",
        },
      },

      fontFamily: {
        heading: ["var(--font-ease-display)", "system-ui", "sans-serif"],
        display: ["var(--font-nhgdp)", "system-ui", "sans-serif"],
        sans: ["var(--font-nhgdp)", "system-ui", "sans-serif"],
      },

      /* ── Fluid typography — maps CSS vars into Tailwind ── */
      fontSize: {
        /* Fluid scale (use these for new work) */
        "fluid-display": ["var(--text-display)", { lineHeight: "var(--leading-display)", letterSpacing: "var(--tracking-display)" }],
        "fluid-h1":      ["var(--text-h1)",      { lineHeight: "var(--leading-h1)",      letterSpacing: "var(--tracking-h1)" }],
        "fluid-h2":      ["var(--text-h2)",      { lineHeight: "var(--leading-h2)",      letterSpacing: "var(--tracking-h2)" }],
        "fluid-h3":      ["var(--text-h3)",      { lineHeight: "var(--leading-h3)",      letterSpacing: "var(--tracking-h3)" }],
        "fluid-h4":      ["var(--text-h4)",      { lineHeight: "var(--leading-h4)",      letterSpacing: "var(--tracking-h4)" }],
        "fluid-h5":      ["var(--text-h5)",      { lineHeight: "var(--leading-h5)",      letterSpacing: "var(--tracking-h5)" }],
        "fluid-h6":      ["var(--text-h6)",      { lineHeight: "var(--leading-h6)",      letterSpacing: "var(--tracking-h6)" }],
        "fluid-main":    ["var(--text-main)",    { lineHeight: "var(--leading-main)",    letterSpacing: "var(--tracking-main)" }],
        "fluid-large":   ["var(--text-large)",   { lineHeight: "var(--leading-large)",   letterSpacing: "var(--tracking-large)" }],
        "fluid-small":   ["var(--text-small)",   { lineHeight: "var(--leading-small)",   letterSpacing: "var(--tracking-small)" }],

        /* Legacy static scale (kept for backward compat until migration) */
        "display-2xl": [
          "5rem",
          { lineHeight: "0.92", letterSpacing: "-0.03em" },
        ],
        "display-xl": [
          "4rem",
          { lineHeight: "0.95", letterSpacing: "-0.025em" },
        ],
        "display-lg": [
          "3rem",
          { lineHeight: "0.95", letterSpacing: "-0.02em" },
        ],
        "display-md": [
          "2.25rem",
          { lineHeight: "1.1", letterSpacing: "-0.015em" },
        ],
        "display-sm": [
          "1.5rem",
          { lineHeight: "1.2", letterSpacing: "-0.01em" },
        ],
      },

      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.02em",
        overline: "0.15em",
      },

      /* ── Fluid spacing — maps CSS vars into Tailwind gap/p/m ── */
      spacing: {
        /* Fluid scale (prefer these) */
        "fluid-1": "var(--space-1)",
        "fluid-2": "var(--space-2)",
        "fluid-3": "var(--space-3)",
        "fluid-4": "var(--space-4)",
        "fluid-5": "var(--space-5)",
        "fluid-6": "var(--space-6)",
        "fluid-7": "var(--space-7)",
        "fluid-8": "var(--space-8)",

        /* Section spacing */
        section:    "var(--section-space)",
        "section-sm": "var(--section-space-sm)",
        "section-lg": "var(--section-space-lg)",
        "page-top": "var(--page-top)",

        /* Site layout */
        "site-margin": "var(--site-margin)",
        "site-gutter": "var(--site-gutter)",

        /* Legacy static (kept for backward compat) */
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
        34: "8.5rem",
      },

      borderRadius: {
        "4xl": "2rem",
      },

      maxWidth: {
        "8xl": "88rem",
        /* Container stops from CSS vars */
        "container-full":   "var(--container-full)",
        "container-main":   "var(--container-main)",
        "container-bar":    "var(--container-bar)",
        "container-narrow": "var(--container-narrow)",
        "container-small":  "var(--container-small)",
      },

      boxShadow: {
        card: "var(--shadow-card)",
        "card-hover": "var(--shadow-card-hover)",
        elevated: "var(--shadow-elevated)",
        glow: "0 0 40px rgba(0,38,0,0.15)",
      },

      backgroundImage: {
        "gradient-flow":
          "linear-gradient(135deg, #002600 0%, #1a6600 30%, #2D8B4E 60%, #c1ff5e 100%)",
        "gradient-ocean":
          "linear-gradient(135deg, #002600 0%, #1a6600 100%)",
        "gradient-sunset":
          "linear-gradient(135deg, #ff3126 0%, #fc6b3e 100%)",
        "gradient-jungle":
          "linear-gradient(135deg, #2D8B4E 0%, #002600 100%)",
        "gradient-warm":
          "linear-gradient(135deg, #2D8B4E 0%, #ff3126 50%, #fc6b3e 100%)",
        "gradient-cream":
          "linear-gradient(180deg, #f2f6ed 0%, #f7f9f4 100%)",
      },

      transitionTimingFunction: {
        "out-expo": "var(--ease-out)",
        "in-out-expo": "var(--ease-in-out)",
      },

      transitionDuration: {
        fast: "var(--duration-fast)",
        normal: "var(--duration-normal)",
        slow: "var(--duration-slow)",
      },

      animation: {
        "fade-up": "fadeUp 0.7s ease-out both",
        "fade-in": "fadeIn 0.6s ease-out both",
        marquee: "marquee 50s linear infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin 12s linear infinite",
        "pulse-gentle": "pulseGentle 3s ease-in-out infinite",
      },

      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(28px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        pulseGentle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
