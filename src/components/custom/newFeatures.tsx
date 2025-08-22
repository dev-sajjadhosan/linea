import { ReactNode } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { BellRing, Info } from 'lucide-react'
import TooltipBtn from '@/components/custom/Tooltipbtn'
import GetNotify from '@/components/custom/getNotify'

interface FeaturesDoc {
  title: string
  description: string
  icon: ReactNode
}

export default function NewFeatures({ features }: { features: FeaturesDoc[] }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>
          <TooltipBtn
            label="Coming"
            icon={<BellRing />}
            variant="secondary"
            className="text-destructive"
          />
        </button>
      </DialogTrigger>

      <DialogContent className="p-9 w-5xl! max-h-[80vh] flex flex-col [&>button]:hidden">
        <DialogHeader className="flex-shrink-0 flex-row justify-between items-center">
          <div className="flex flex-col gap-1 text-left">
            <DialogTitle className="flex items-center gap-2 ">
              <Info /> New Coming
            </DialogTitle>
            <DialogDescription>
              Check out what’s new coming in the latest update!
            </DialogDescription>
          </div>
          <GetNotify />
        </DialogHeader>

        <div className="mt-4 grid md:grid-cols-2 gap-5 overflow-y-auto flex-1 pr-2">
          {features.map((feature, index) => (
            <Alert
              variant="info"
              key={index}
              className="flex items-start gap-2"
            >
              {feature.icon}
              <div>
                <AlertTitle>{feature.title}</AlertTitle>
                <AlertDescription>{feature.description}</AlertDescription>
              </div>
            </Alert>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
