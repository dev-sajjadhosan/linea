import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Welcome from './pages/Welcome/Welcome'
import { Toaster } from '@/components/ui/sonner'
import Fonts from '@/pages/Fonts/Fonts'
import Home from '@/pages/Home/Home'
import About from '@/pages/About/About'
import { ThemeProvider } from '@/context/theme-provider'
import Typography from '@/pages/Typography/Typography'
import Playground from '@/pages/Playground/Playground'
import { FontLoaderProvider } from '@/context/FontLoaderProvider'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Welcome />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/fonts',
    element: <Fonts />,
  },
  {
    path: '/typography',
    element: <Typography />,
  },
  {
    path: '/playground',
    element: <Playground />,
  },
  {
    path: '/about',
    element: <About />,
  },
])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FontLoaderProvider>
      <ThemeProvider defaultTheme="dark">
        <Toaster richColors position='top-left' />
        <div className="flex items-center justify-center h-screen">
          <div className="w-11/12 h-full">
            <RouterProvider router={routes} />
          </div>
        </div>
      </ThemeProvider>
    </FontLoaderProvider>
  </StrictMode>,
)
