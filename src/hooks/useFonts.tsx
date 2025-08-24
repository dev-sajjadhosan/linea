import { useState, useEffect } from 'react'

export interface GoogleFont {
  family: string
  variants: string[]
  subsets: string[]
  version: string
  lastModified: string
  files: Record<string, string>
  category: string
  kind: string
  menu: string
}

export interface GoogleFontsResponse {
  kind: string
  items: GoogleFont[]
}

interface UseFontsOptions {
  sort?: 'alpha' | 'date' | 'popularity' | 'style' | 'trending'
  category?: 'serif' | 'sans-serif' | 'monospace' | 'display' | 'handwriting'
  subset?: string
  capability?: 'WOFF2' | 'VF'
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

        if (options.sort) params.append('sort', options.sort)
        if (options.category) params.append('category', options.category)
        if (options.subset) params.append('subset', options.subset)
        if (options.capability) params.append('capability', options.capability)

        const API = `https://www.googleapis.com/webfonts/v1/webfonts?${params.toString()}`
        const res = await fetch(API)

        if (!res.ok) throw new Error(`Failed to fetch fonts: ${res.statusText}`)

        const data: GoogleFontsResponse = await res.json()
        setFonts(data.items || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchFonts()
  }, [options.sort, options.category, options.subset, options.capability])

  return { fonts, loading, error }
}
