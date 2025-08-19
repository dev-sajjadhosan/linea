import TooltipBtn from '@/components/custom/Tooltipbtn'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Settings2 } from 'lucide-react'

export default function Setting() {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <TooltipBtn label="Setting" icon={<Settings2 />} />
        </DialogTrigger>
        <DialogContent className="bg-primary text-primary-foreground border-0 [&>button]:hidden">
          <DialogHeader>
            <DialogTitle>Hey there,</DialogTitle>
            <DialogDescription>
              This action cannot be done. We are currently on dev mode . So,
              Please some time! We will came back soon.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}
