import { useMemo } from "react"

export interface GoogleFont {
  family: string
  variants: string[]
}

/**
 * ACTUAL React Hook: Memoizes Google Fonts URL generation
 * Only recalculates when font array reference changes
 */
export function useGoogleFontsUrl(
  fonts: GoogleFont[],
  compact: boolean = true
): string {
  return useMemo(() => {
    if (compact) {
      return generateCompactUrl(fonts)
    }
    return generateGoogleFontsUrl(fonts)
  }, [fonts, compact])
}

// ============================================================================
// CORE UTILITY FUNCTIONS (same as before)
// ============================================================================

export function generateGoogleFontsUrl(fonts: GoogleFont[]): string {
  if (!fonts.length) return ""

  const families = fonts.map((font) => {
    const family = font.family.replace(/ /g, "+")
    
    if (!font.variants.length) {
      return `family=${family}`
    }

    const parsed = parseVariants(font.variants)
    
    if (parsed.hasItalic && parsed.hasRegular) {
      return `family=${family}:ital,wght@${buildAxisCombinations(parsed)}`
    } else if (parsed.hasItalic) {
      return `family=${family}:ital,wght@${buildItalicOnly(parsed)}`
    } else {
      return `family=${family}:wght@${parsed.weights.join(";")}`
    }
  })

  return `https://fonts.googleapis.com/css2?${families.join("&")}&display=swap`
}

export function generateCompactUrl(fonts: GoogleFont[]): string {
  if (!fonts.length) return ""

  const families = fonts.map((font) => {
    const family = font.family.replace(/ /g, "+")
    
    if (!font.variants.length) return `family=${family}`

    const parsed = parseVariants(font.variants)
    
    const canUseRange = (weights: string[]) => {
      if (weights.length < 3) return false
      const nums = weights.map(Number)
      for (let i = 1; i < nums.length; i++) {
        if (nums[i] - nums[i-1] !== 100) return false
      }
      return true
    }

    if (parsed.hasItalic && parsed.hasRegular) {
      const regRange = canUseRange(parsed.weights)
        ? `${parsed.weights[0]}..${parsed.weights[parsed.weights.length - 1]}`
        : parsed.weights.join(";")
      
      const italRange = canUseRange(parsed.italicWeights)
        ? `${parsed.italicWeights[0]}..${parsed.italicWeights[parsed.italicWeights.length - 1]}`
        : parsed.italicWeights.join(";")
      
      return `family=${family}:ital,wght@0,${regRange};1,${italRange}`
    } else if (parsed.hasItalic) {
      const italRange = canUseRange(parsed.italicWeights)
        ? `${parsed.italicWeights[0]}..${parsed.italicWeights[parsed.italicWeights.length - 1]}`
        : parsed.italicWeights.join(";")
      return `family=${family}:ital,wght@1,${italRange}`
    } else {
      const regRange = canUseRange(parsed.weights)
        ? `${parsed.weights[0]}..${parsed.weights[parsed.weights.length - 1]}`
        : parsed.weights.join(";")
      return `family=${family}:wght@${regRange}`
    }
  })

  return `https://fonts.googleapis.com/css2?${families.join("&")}&display=swap`
}

// ============================================================================
// INTERNAL HELPERS
// ============================================================================

interface ParsedVariants {
  weights: string[]
  italicWeights: string[]
  hasRegular: boolean
  hasItalic: boolean
}

function parseVariants(variants: string[]): ParsedVariants {
  const weights: string[] = []
  const italicWeights: string[] = []
  
  variants.forEach((v) => {
    const normalized = v === "regular" ? "400" : v === "italic" ? "400italic" : v
    
    if (normalized.includes("italic")) {
      const weight = normalized.replace("italic", "") || "400"
      italicWeights.push(weight)
    } else {
      weights.push(normalized)
    }
  })

  return {
    weights: [...new Set(weights)].sort(numericSort),
    italicWeights: [...new Set(italicWeights)].sort(numericSort),
    hasRegular: weights.length > 0,
    hasItalic: italicWeights.length > 0,
  }
}

function buildAxisCombinations(parsed: ParsedVariants): string {
  const combinations: string[] = []
  parsed.weights.forEach((w) => combinations.push(`0,${w}`))
  parsed.italicWeights.forEach((w) => combinations.push(`1,${w}`))
  return combinations.join(";")
}

function buildItalicOnly(parsed: ParsedVariants): string {
  return parsed.italicWeights.map((w) => `1,${w}`).join(";")
}

function numericSort(a: string, b: string): number {
  return parseInt(a) - parseInt(b)
}

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

/*
// In your React component:

import { useGoogleFontsUrl } from "./hooks/useFonts"

function FontSelector() {
  const [selectedFonts, setSelectedFonts] = useState<GoogleFont[]>([
    { family: "Roboto Mono", variants: ["100", "400", "700", "400italic"] }
  ])

  // Hook auto-memoizes - only recalculates when selectedFonts changes
  const fontUrl = useGoogleFontsUrl(selectedFonts, true)

  return (
    <div>
      <link href={fontUrl} rel="stylesheet" />
      <p style={{ fontFamily: "Roboto Mono" }}>Test text</p>
    </div>
  )
}

// Or use the utility functions directly in non-component code:
const url = generateCompactUrl(myFonts)
*/