/**
 * Tokens de diseno del sitio — Estudio Rivas Gonzalez Methol.
 * Fuente unica de verdad: las 4 paginas HTML se compilan con este config
 * (npm run build) y el resultado se sirve como dist/app.css.
 *
 * Al cambiar un token acá, se propaga a todo el sitio.
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  "content": [
    "./index.html",
    "./contacto.html",
    "./equipo.html",
    "./privacidad.html"
  ],
  "safelist": [
    {
      "pattern": /^(bg|text)-(cta|cta-hover|surface|surface-container(-low|-high|-highest|-lowest)?|on-surface|on-surface-variant|primary|primary-container|on-primary-container|inverse-surface|inverse-on-surface|outline|outline-variant)$/,
      "variants": ["hover", "focus", "group-hover"]
    },
    "text-[#1b1c1a]",
    "bg-[#1b1c1a]"
  ],
  "darkMode": "class",
  "theme": {
    "extend": {
      "borderRadius": {
        "DEFAULT": "0.125rem",
        "full": "9999px",
        "lg": "0.25rem",
        "xl": "0.5rem"
      },
      "colors": {
        "background": "#fbf9f5",
        "cta": "#9B933B",
        "cta-hover": "#847D32",
        "error": "#ba1a1a",
        "error-container": "#ffdad6",
        "hero-surface": "#e7e3db",
        "inverse-on-surface": "#f2f0ed",
        "inverse-primary": "#e0c29f",
        "inverse-surface": "#30312e",
        "on-background": "#1b1c1a",
        "on-error": "#ffffff",
        "on-error-container": "#93000a",
        "on-primary": "#ffffff",
        "on-primary-container": "#fffbff",
        "on-primary-fixed": "#281803",
        "on-primary-fixed-variant": "#584329",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#60656d",
        "on-secondary-fixed": "#171c23",
        "on-secondary-fixed-variant": "#42474f",
        "on-surface": "#1b1c1a",
        "on-surface-variant": "#4e453c",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#fffbff",
        "on-tertiary-fixed": "#271905",
        "on-tertiary-fixed-variant": "#56442c",
        "outline": "#7f756b",
        "outline-variant": "#d1c4b9",
        "primary": "#6f583c",
        "primary-container": "#897052",
        "primary-fixed": "#fdddb9",
        "primary-fixed-dim": "#e0c29f",
        "secondary": "#5a5f67",
        "secondary-container": "#dee2ec",
        "secondary-fixed": "#dee2ec",
        "secondary-fixed-dim": "#c2c7d0",
        "surface": "#fbf9f5",
        "surface-bright": "#fbf9f5",
        "surface-container": "#efeeea",
        "surface-container-high": "#eae8e4",
        "surface-container-highest": "#e4e2de",
        "surface-container-low": "#f5f3ef",
        "surface-container-lowest": "#ffffff",
        "surface-dim": "#dbdad6",
        "surface-tint": "#715a3e",
        "surface-variant": "#e4e2de",
        "tertiary": "#6d593f",
        "tertiary-container": "#877156",
        "tertiary-fixed": "#fadebe",
        "tertiary-fixed-dim": "#ddc2a3"
      },
      "fontFamily": {
        "body-lg": [
          "Plus Jakarta Sans"
        ],
        "body-md": [
          "Plus Jakarta Sans"
        ],
        "body-sm": [
          "Plus Jakarta Sans"
        ],
        "display-lg": [
          "Playfair Display"
        ],
        "display-lg-mobile": [
          "Playfair Display"
        ],
        "headline-lg": [
          "Playfair Display"
        ],
        "headline-lg-mobile": [
          "Playfair Display"
        ],
        "headline-md": [
          "Playfair Display"
        ],
        "headline-sm": [
          "Playfair Display"
        ],
        "label-lg": [
          "Plus Jakarta Sans"
        ],
        "label-md": [
          "Plus Jakarta Sans"
        ],
        "title-lg": [
          "Plus Jakarta Sans"
        ],
        "title-md": [
          "Plus Jakarta Sans"
        ]
      },
      "fontSize": {
        "body-lg": [
          "18px",
          {
            "fontWeight": "400",
            "lineHeight": "28px"
          }
        ],
        "body-md": [
          "15px",
          {
            "fontWeight": "400",
            "lineHeight": "24px"
          }
        ],
        "body-sm": [
          "13px",
          {
            "fontWeight": "400",
            "lineHeight": "20px"
          }
        ],
        "display-lg": [
          "56px",
          {
            "fontWeight": "600",
            "letterSpacing": "-0.02em",
            "lineHeight": "64px"
          }
        ],
        "display-lg-mobile": [
          "36px",
          {
            "fontWeight": "600",
            "letterSpacing": "-0.01em",
            "lineHeight": "44px"
          }
        ],
        "headline-lg": [
          "40px",
          {
            "fontWeight": "500",
            "letterSpacing": "-0.01em",
            "lineHeight": "48px"
          }
        ],
        "headline-lg-mobile": [
          "28px",
          {
            "fontWeight": "500",
            "letterSpacing": "0",
            "lineHeight": "36px"
          }
        ],
        "headline-md": [
          "32px",
          {
            "fontWeight": "500",
            "lineHeight": "40px"
          }
        ],
        "headline-sm": [
          "24px",
          {
            "fontWeight": "600",
            "lineHeight": "32px"
          }
        ],
        "label-lg": [
          "13px",
          {
            "fontWeight": "600",
            "letterSpacing": "0.08em",
            "lineHeight": "18px"
          }
        ],
        "label-md": [
          "11px",
          {
            "fontWeight": "600",
            "letterSpacing": "0.1em",
            "lineHeight": "16px"
          }
        ],
        "title-lg": [
          "20px",
          {
            "fontWeight": "600",
            "letterSpacing": "-0.01em",
            "lineHeight": "28px"
          }
        ],
        "title-md": [
          "16px",
          {
            "fontWeight": "600",
            "lineHeight": "24px"
          }
        ]
      },
      "spacing": {
        "gutter": "1.5rem",
        "gutter-mobile": "1rem",
        "margin": "3rem",
        "margin-mobile": "1.25rem",
        "space-lg": "1.5rem",
        "space-md": "1rem",
        "space-sm": "0.5rem",
        "space-xl": "2.5rem",
        "space-xs": "0.25rem"
      }
    }
  }
};
