import TooltipBtn from '@/components/custom/Tooltipbtn'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  //   DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useSettingStore } from '@/store/settingStore'
import { Anchor } from 'lucide-react'
import { Link } from 'react-router-dom'

interface MenuProps {
  label: string
  path: string
  icon: string
}

export default function DropMenu({
  paths,
  IsPath,
}: {
  paths: MenuProps[]
  IsPath: (path: string) => boolean
}) {
  const { homePage } = useSettingStore()
  const filterPaths =
    homePage === 'show' ? paths : paths.filter((item) => item.label !== 'home')

  return (
    <div className="md:hidden mr-1.5">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <TooltipBtn label="NavList" icon={<Anchor />} variant="outline" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-xs p-5">
          <DropdownMenuLabel>Navlist</DropdownMenuLabel>
          {/* <DropdownMenuSeparator /> */}
          {filterPaths.map((l, i) => (
            <Link key={i} to={l?.path}>
              <DropdownMenuItem
                className={`${
                  IsPath(l?.path) ? 'text-primary' : 'text-zinc-400'
                } font-medium text-sm capitalize`}
              >
                {' '}
                {l?.label}
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
