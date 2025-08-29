import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const defaultState = {
  theme: 'dark',
  homePage: 'show',
  navbar: 'top',
  welcome: 'show',
}

interface SettingStore {
  theme: 'light' | 'dark' | 'system'
  homePage: 'show' | 'hide'
  navbar: 'top' | 'bottom'
  welcome: 'show' | 'hide'

  setTheme: (theme: SettingStore['theme']) => void
  setHomePage: (homePage: SettingStore['homePage']) => void
  setNavbar: (navbar: SettingStore['navbar']) => void
  setReset: () => void
  setWelcome: (welcome: SettingStore['welcome']) => void
}

export const useSettingStore = create<SettingStore>()(
  persist(
    (set) => ({
      theme: 'dark',
      homePage: 'show',
      navbar: 'top',
      welcome: 'show',

      setTheme: (theme) => set({ theme }),
      setHomePage: (homePage) => set({ homePage }),
      setNavbar: (navbar) => set({ navbar }),
      setWelcome: (welcome) => set({ welcome }),

      setReset: () => set(defaultState as SettingStore),
    }),
    {
      name: 'Setting',
    },
  ),
)
