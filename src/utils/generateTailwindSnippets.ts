import { GoogleFont } from "@/hooks/useFonts"

export interface FontSnippet {
  css: string // combined CSS with @theme and @layer utilities
  tailwind: string // Tailwind config extension for fontFamily
}

/**
 * Generates Tailwind v4+ compatible font tokens, Tailwind config,
 * and utility classes (e.g. .font-roboto-mono).
 */
export function generateTailwindSnippets(fonts: GoogleFont[]): FontSnippet {
  // 1️⃣ Generate @theme custom properties
  const themeVars = fonts
    .map((font) => {
      const varName = `--font-family-${font.family.toLowerCase().replace(/\s+/g, "-")}`
      return `  ${varName}: "${font.family}", ${font.category};`
    })
    .join("\n")

  // 2️⃣ Generate @layer utilities classes
  const utilityClasses = fonts
    .map((font) => {
      const className = `font-${font.family.toLowerCase().replace(/\s+/g, "-")}`
      const varName = `--font-family-${font.family.toLowerCase().replace(/\s+/g, "-")}`
      return `  .${className} { font-family: var(${varName}); }`
    })
    .join("\n")

  // Combined modern CSS for Tailwind v4
  const css = `@theme {
${themeVars}
}

@layer utilities {
${utilityClasses}
}`

  // 3️⃣ Tailwind config entries (optional, for full theme integration)
  const entries = fonts
    .map((f) => {
      const key = f.family.toLowerCase().replace(/\s+/g, "-")
      const varName = `--font-family-${key}`
      return `        "${key}": [\`var(${varName})\`]`
    })
    .join(",\n")

  const tailwind = `// tailwind.config.js (v4+)
export default {
  theme: {
    extend: {
      fontFamily: {
${entries}
      },
    },
  },
}`

  return { css, tailwind }
}
