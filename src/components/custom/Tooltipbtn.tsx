import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ReactNode } from 'react'

type TooltipBtnProps = {
  label?: string
  icon?: ReactNode // better than string, supports icons like <Plus />
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'right' | 'bottom' | 'left'
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
  size?: 'sm' | 'lg' | 'icon'
  action?: () => void
  disable?: boolean | undefined
}

export default function TooltipBtn({
  label = 'Nothing',
  icon,
  align = 'center',
  side = 'top',
  variant = 'ghost',
  size = 'icon',
  action,
  disable,
}: TooltipBtnProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={variant}
          size={size}
          onClick={action}
          disabled={disable}
        >
          {icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent align={align} side={side}>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  )
}
