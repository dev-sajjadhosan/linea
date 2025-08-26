import Apply from '@/components/custom/apply'
import DropMenu from '@/components/custom/dropMenu'
import MyStore from '@/components/custom/myStore'
import Setting from '@/components/custom/setting'
import { useSettingStore } from '@/store/settingStore'
import { Link, useLocation } from 'react-router-dom'
const paths = [
  {
    label: 'home',
    path: '/home',
    icon: '',
  },
  {
    label: 'fonts',
    path: '/fonts',
    icon: '',
  },

  {
    label: 'typography',
    path: '/typography',
    icon: '',
  },
  {
    label: 'Playground',
    path: '/playground',
    icon: '',
  },
  {
    label: 'about',
    path: '/about',
    icon: '',
  },
]

export default function Header() {
  const { navbar, homePage } = useSettingStore()
  const IsPath = (path: string) => useLocation().pathname === path.toLowerCase()
  const filterPaths =
    homePage === 'show' ? paths : paths.filter((item) => item.label !== 'home')

  return (
    <>
      <header
        className={` flex items-center justify-between lg:w-5xl px-5 py-2  rounded-md mx-auto mt-2 light:bg-primary dark:bg-primary-foreground dark:text-primary light:text-primary-foreground backdrop-blur-3xl border ${
          navbar === 'top'
            ? 'sticky top-5'
            : 'fixed bottom-3 left-0 right-0 z-50'
        }`}
      >
        <div className="flex items-center gap-1">
          <img src="/public/favicon.png" width={25} alt="" />
          <h1 className="text-lg font-gor">Linea</h1>
        </div>
        <nav>
          <ul className=" hidden md:flex items-center gap-5 font-inter capitalize">
            {filterPaths?.map((l, i) => (
              <li
                key={i}
                className={`${
                  IsPath(l?.path) ? 'text-primary' : 'text-zinc-400'
                } font-medium text-sm`}
              >
                <Link to={l?.path}>{l?.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <DropMenu paths={paths} IsPath={IsPath} />
          <Setting />
          <MyStore />
          <Apply />
        </div>
      </header>
    </>
  )
}
