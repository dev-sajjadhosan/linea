import TooltipBtn from '@/components/custom/Tooltipbtn'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Box } from 'lucide-react'

export default function Apply() {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <TooltipBtn label="Apply" icon={<Box />} />
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
