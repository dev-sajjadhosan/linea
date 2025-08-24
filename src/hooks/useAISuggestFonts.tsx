import { useState } from 'react'
import { GoogleGenAI } from '@google/genai'
import { toast } from 'sonner'

type Font = {
  files: any;
  variants: any; family: string; category: string 
}

export function useAISuggestFonts(fonts: Font[]) {
  const [results, setResults] = useState<Font[]>([])
  const [ai_loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const suggestFonts = async (query: string) => {
    if (!query) return

    setLoading(true)
    setError(null)

    try {
      const ai = new GoogleGenAI({
        apiKey: import.meta.env.VITE_FONT_API,
      })

      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash-001',
        contents: `You are a professional typography expert. Based on the project description below, suggest exactly 5 font families for a complete website: one for Logo, one for Main Heading, one for Subheading, one for Paragraph / Body text, and one for Other / Accent. 

Provide ONLY the font family names, separated by commas, with no extra words, explanations, or numbering.

Project description: "${query}"`,
        config: {
          temperature: 0.7,
          maxOutputTokens: 256,
          topP: 0.8,
          topK: 40,
          presencePenalty: 0.6,
          frequencyPenalty: 0.6,
        },
      })

      const text = response.text ?? ''
      const suggestedFonts = text
        .split(',')
        .map((f) => f.trim().toLowerCase())
        .filter(Boolean)

      console.log('AI Suggested Fonts:', suggestedFonts)

      const filtered = fonts.filter((f) =>
        suggestedFonts.some((name) => f.family.toLowerCase().includes(name)),
      )

      setResults(filtered)
      toast.info(`Your Magic Search. Suggested ${filtered.length} fonts!`, {
        position: 'top-right',
      })
    } catch (err) {
      console.error(err)
      toast.error('Failed to fetch font suggestions', {
        description: err instanceof Error ? err.message : 'Unknown error',
        position: 'top-left',
      })
      setError('Failed to fetch font suggestions')
    } finally {
      setLoading(false)
    }
  }

  return { results, ai_loading, error, suggestFonts }
}
