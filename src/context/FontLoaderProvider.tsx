/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react'

// Define the shape of the context value
interface FontLoaderContextType {
  loadedFonts: Set<string>
  loadFont: (fontFamily: string) => void
}

// Create a context to hold our font loading state and functions
const FontLoaderContext = createContext<FontLoaderContextType | undefined>(undefined)

// Create a provider component that will wrap our application
export const FontLoaderProvider = ({ children }: { children: ReactNode }) => {
  const [loadedFonts, setLoadedFonts] = useState<Set<string>>(new Set())

  // Use useCallback to memoize this function, preventing unnecessary re-renders
  const loadFont = useCallback(
    (fontFamily: string) => {
      // Check if the font is already loaded or being loaded
      if (!fontFamily || loadedFonts.has(fontFamily)) {
        return
      }

      // Add the font to our set to mark it as "being loaded"
      // We use a new Set to trigger a state update
      setLoadedFonts((prev) => new Set(prev).add(fontFamily))

      // Create a new <link> element
      const link = document.createElement('link')
      link.href = `https://fonts.googleapis.com/css?family=${fontFamily.replace(
        / /g,
        '+',
      )}&display=swap`
      link.rel = 'stylesheet'

      // Add a data attribute for easy identification later
      link.dataset.font = fontFamily

      // Append the link to the document's head
      document.head.appendChild(link)

      console.log(`Loading font: ${fontFamily}`) // Optional: for debugging
    },
    [loadedFonts],
  )

  // Provide the loadedFonts set and the loadFont function to consumers
  const value = { loadedFonts, loadFont }

  return (
    <FontLoaderContext.Provider value={value}>
      {children}
    </FontLoaderContext.Provider>
  )
}

// Custom hook to make it easier for components to use the context
export const useFontLoader = () => {
  const context = useContext(FontLoaderContext)
  if (context === undefined) {
    throw new Error('useFontLoader must be used within a FontLoaderProvider')
  }
  return context
}
