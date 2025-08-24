import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Types
export type TextType = 'def' | 'par' | 'let_num' | 'sym' | 'cus'
export type SortType = 'alpha' | 'date' | 'popularity' | 'style' | 'trending'

interface FontState {
  lay: 'grid' | 'default'
  fontSize: number
  fontWeight: number
  activeCategory: string | null
  search: string
  textType: string
  text: string
  results: string[]
  sort: SortType
  category: string
  subset?: string

  // Actions
  setLay: (val: 'grid' | 'default') => void
  setFontSize: (val: number) => void
  setFontWeight: (val: number) => void
  setActiveCategory: (val: string | null) => void
  setSearch: (val: string) => void
  setTextType: (val: TextType) => void
  setText: (val: string) => void
  setResults: (val: string[]) => void
  setSort: (s: SortType) => void
  setCategory: (c: string) => void
  setSubset: (s: string) => void
}

// Presets for text samples
const presetTexts: Record<TextType, string> = {
  def: 'Dream big, work hard, stay focused, embrace challenges, and turn your vision into reality with passion, persistence, and purpose.',
  par: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  let_num:
    'A_a Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz 1234567890',
  sym: '!@#$%^&*()_+=-<>?/{}[]|',
  cus: '', // user will edit
}

export const useFontStore = create<FontState>()(
  persist(
    (set) => ({
      // Initial state
      lay: 'grid',
      fontSize: 32,
      fontWeight: 400,
      activeCategory: 'all',
      search: '',
      textType: 'def',
      text: presetTexts.def,
      results: [],
      sort: 'popularity',
      category: '',
      subset: '',

      // Actions
      setLay: (val) => set({ lay: val }),
      setFontSize: (val) => set({ fontSize: val }),
      setFontWeight: (val) => set({ fontWeight: val }),
      setActiveCategory: (val) => set({ activeCategory: val }),
      setSearch: (val) => set({ search: val }),
      setTextType: (val) =>
        set((state) => ({
          textType: val,
          text: val === 'cus' ? state.text : presetTexts[val],
        })),
      setText: (val) =>
        set((state) => ({
          text: val,
          textType: state.textType === 'cus' ? 'cus' : 'cus', // force "cus" if user types
        })),
      setResults: (val) => set({ results: val }),
      setSort: (s) => set({ sort: s }),
      setCategory: (c) => set({ category: c }),
      setSubset: (s) => set({ subset: s }),
    }),
    {
      name: 'font-playground', // persisted in localStorage
    },
  ),
)
