import { GoogleFont } from '@/hooks/useFonts'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface MyStore {
  myFonts: GoogleFont[]
  useFonts: GoogleFont[]

  loading: boolean

  addFont: (font: GoogleFont) => void
  removeFont: (id: string | number) => void
  removeAll: () => void
  hasFont: (id: string | number) => boolean

  useAddFont: (font: GoogleFont) => void
  useRemoveFont: (id: string | number) => void
  useRemoveAll: () => void
  useHasFont: (id: string | number) => boolean

  setLoading: (val: boolean) => void
}

export const useMyStore = create<MyStore>()(
  persist(
    (set, get) => ({
      myFonts: [], // ✅ empty array, TS already enforces it as GoogleFont[]
      useFonts: [], // ✅ empty array, TS already enforces it as GoogleFont[]

      loading: false,

      addFont: (font) =>
        set((state) => ({
          myFonts: [...state.myFonts, font],
        })),

      removeFont: (id) =>
        set((state) => {
          if (typeof id === 'number') {
            return {
              myFonts: state.myFonts.filter((_, idx) => idx !== id),
            }
          } else {
            return {
              myFonts: state.myFonts.filter((f) => f.family !== id), // ✅ compare by font property (e.g. family)
            }
          }
        }),

      removeAll: () => set({ myFonts: [] }),

      hasFont: (id) => {
        return get().myFonts.some((f) => f.family === id) // ✅ check by property
      },

      useAddFont: (font) =>
        set((state) => ({
          useFonts: [...state.useFonts, font],
        })),

      useRemoveFont: (id) =>
        set((state) => {
          if (typeof id === 'number') {
            return {
              useFonts: state.useFonts.filter((_, idx) => idx !== id),
            }
          } else {
            return {
              useFonts: state.useFonts.filter((f) => f.family !== id), // ✅ compare by font property (e.g. family)
            }
          }
        }),

      useRemoveAll: () => set({ useFonts: [] }),

      useHasFont: (id) => {
        return get().useFonts.some((f) => f.family === id) // ✅ check by property
      },

      setLoading: (val) => set({ loading: val }),
    }),
    {
      name: 'myStore',
    },
  ),
)
