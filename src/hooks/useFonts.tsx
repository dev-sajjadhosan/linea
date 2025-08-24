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

export default function useFonts() {
  const [fonts, setFonts] = useState<GoogleFont[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFonts = async () => {
      setLoading(true)
      setError(null)

      try {
        const API = `https://www.googleapis.com/webfonts/v1/webfonts?key=${import.meta.env.VITE_FONT_API}&sort=popularity`
        const res = await fetch(API)
        if (!res.ok) throw new Error(`Failed to fetch fonts: ${res.statusText}`)
        const data: GoogleFontsResponse = await res.json()
        setFonts(data.items)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchFonts()
  }, [])

  return { fonts, loading, error }
}
