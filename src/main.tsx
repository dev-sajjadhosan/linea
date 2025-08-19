import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Welcome from './pages/Welcome/Welcome'
import { Toaster } from '@/components/ui/sonner'
import Fonts from '@/pages/Fonts/Fonts'
import Home from '@/pages/Home/Home'
import About from '@/pages/About/About'
import AiSearch from '@/pages/AiSearch/AiSearch'

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
    path: '/ai-search',
    element: <AiSearch />,
  },
  {
    path: '/about',
    element: <About />,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster richColors />
    <div className="flex items-center justify-center h-screen bg-[#313131] overflow-hidden">
      <div className="bg-primary text-primary-foreground rounded-2xl h-11/12 w-11/12">
        <RouterProvider router={routes} />
      </div>
    </div>
  </StrictMode>,
)
