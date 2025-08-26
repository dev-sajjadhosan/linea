import { GoogleFont } from '@/hooks/useFonts'

export interface FontSnippet {
  css: string // combined CSS for all fonts
  tailwind: string // combined Tailwind config for all fonts
}

export function generateTailwindSnippets(fonts: GoogleFont[]): FontSnippet {
  // 1️⃣ Combined CSS snippet
  const css = fonts
    .map((font) => {
      const familyClass = font.family.toLowerCase().replace(/\s+/g, '-')
      return `.${familyClass} {
  font-family: "${font.family}", ${font.category};
}`
    })
    .join('\n\n')

  // 2️⃣ Combined Tailwind snippet
  const entries = fonts
    .map(
      (f) =>
        `    "${f.family.toLowerCase().replace(/\s+/g, '-')}": ["${f.family}", "${f.category}"]`
    )
    .join(',\n')

  const tailwind = `// tailwind.config.js
module.exports = {
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
