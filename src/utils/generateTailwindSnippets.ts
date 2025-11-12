import { GoogleFont } from "@/hooks/useFonts"

export interface FontSnippet {
  css: string // combined CSS for all fonts
  tailwind: string // combined Tailwind config for all fonts
}

/**
 * Generates Tailwind v4-compatible font tokens using @theme.
 * Each font gets a CSS variable under @theme and a fontFamily config entry.
 */
export function generateTailwindSnippets(fonts: GoogleFont[]): FontSnippet {
  // 1️⃣ Generate @theme font variables
  const cssVars = fonts
    .map((font) => {
      const varName = `--font-family-${font.family.toLowerCase().replace(/\s+/g, '-')}`
      return `  ${varName}: "${font.family}", ${font.category};`
    })
    .join("\n")

  // 2️⃣ Modern Tailwind @theme syntax
  const css = `@theme {
${cssVars}
}`

  // 3️⃣ Tailwind fontFamily extension using these variables
  const entries = fonts
    .map((f) => {
      const key = f.family.toLowerCase().replace(/\s+/g, '-')
      const varName = `--font-family-${key}`
      return `        "${key}": [\`var(${varName})\`]`
    })
    .join(",\n")

  // 4️⃣ Final Tailwind config snippet
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
