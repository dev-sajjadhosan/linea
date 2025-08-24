import TooltipBtn from '@/components/custom/Tooltipbtn'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
//   DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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
  return (
    <div className="md:hidden mr-1.5">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <TooltipBtn label="NavList" icon={<Anchor />} variant="outline" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-xs p-5">
          <DropdownMenuLabel>Navlist</DropdownMenuLabel>
          {/* <DropdownMenuSeparator /> */}
          {paths.map((l, i) => (
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
