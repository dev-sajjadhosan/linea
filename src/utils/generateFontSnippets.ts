import { GoogleFont } from "@/hooks/useFonts"

export function generateFontSnippets(fonts: GoogleFont[]) {
  return fonts.map((font) => {
    const familyClass = font.family.toLowerCase().replace(/\s+/g, "-")

    // 🔍 detect variable fonts: they have ranges like "100..900" or wdth/ital opsz
    const isVariable =
      font.variants.some((v) => v.includes("..")) || // e.g. 100..900
      font.variants.some((v) => v.includes("wdth")) ||
      font.variants.some((v) => v.includes("ital"))

    let css: string

    if (isVariable) {
      // ✅ Only one "template" class
      css = `.${familyClass}-<uniquifier> {
  font-family: "${font.family}", ${font.category};
  font-optical-sizing: auto;
  font-weight: <weight>;
  font-style: normal;
${
  font.variants.some((v) => v.includes("wdth"))
    ? `  font-variation-settings: "wdth" <width>;`
    : ""
}
}`
    } else {
      // ✅ One class per weight
      css = font.variants
        .map((variant) => {
          const weight = parseInt(variant, 10) || 400
          const name =
            weight === 400 ? "regular" : weight === 700 ? "bold" : weight
          return `.${familyClass}-${name} {
  font-family: "${font.family}", ${font.category};
  font-weight: ${weight};
  font-style: normal;
}`
        })
        .join("\n\n")
    }

    return {
      family: font.family,
      css,
    }
  })
}
