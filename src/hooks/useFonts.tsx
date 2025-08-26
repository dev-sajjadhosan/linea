import { useState, useEffect } from "react"

export interface GoogleFont {
  family: string
  variants: string[]
  subsets: string[]
  version: string
  lastModified: string
  files: Record<string, string>
  category: string
  kind: string
  menu?: string // sometimes not included
}

export interface GoogleFontsResponse {
  kind: string
  items: GoogleFont[]
}

interface UseFontsOptions {
  sort?: "alpha" | "date" | "popularity" | "style" | "trending"
  category?: "serif" | "sans-serif" | "monospace" | "display" | "handwriting"
  subset?: string
}

export default function useFonts(options: UseFontsOptions = {}) {
  const [fonts, setFonts] = useState<GoogleFont[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFonts = async () => {
      setLoading(true)
      setError(null)

      try {
        const params = new URLSearchParams({
          key: import.meta.env.VITE_FONT_API,
        })

        if (options.sort) params.append("sort", options.sort)

        const API = `https://www.googleapis.com/webfonts/v1/webfonts?${params.toString()}`
        const res = await fetch(API)

        if (!res.ok) throw new Error(`Failed to fetch fonts: ${res.statusText}`)

        const data: GoogleFontsResponse = await res.json()
        let items = data.items || []

        // client-side filtering
        if (options.category) {
          items = items.filter((f) => f.category === options.category)
        }
        if (options.subset) {
          items = items.filter((f) => f.subsets.includes(options.subset!))
        }

        setFonts(items)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error")
      } finally {
        setLoading(false)
      }
    }

    fetchFonts()
  }, [options.sort, options.category, options.subset])

  return { fonts, totalCount: fonts.length, loading, error }
}
