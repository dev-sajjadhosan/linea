import { GoogleFont } from "@/hooks/useFonts"

// takes the selected fonts and builds a Google Fonts import URL
export function useGenerateGoogleFontsUrl(fonts: GoogleFont[]): string {
  if (!fonts.length) return ""

  const families = fonts.map((font) => {
    // Base family name (e.g. Inter → Inter)
    const family = font.family.replace(/ /g, "+") // Google expects + instead of spaces

    // Optional: include variants (weights/styles)
    // Example: wght@400;700
    const variants = font.variants.length
      ? `:wght@${font.variants.join(";")}`
      : ""

    return `family=${family}${variants}`
  })

  return `https://fonts.googleapis.com/css2?${families.join("&")}&display=swap`
}
