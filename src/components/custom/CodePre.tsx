import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ClipboardPlus, Copy } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export default function CodePre({ code }: { code: string }) {
  const [isCopy, setIsCopy] = useState(false)
  const handleCopy = (c: string) => {
    setIsCopy(true)
    navigator.clipboard.writeText(c)
    toast.info('Copied', {
      position: 'top-left',
    })
    setTimeout(() => {
      setIsCopy(false)
    }, 1500)
  }
  return (
    <Card className="relative ">
      <Button
        variant={'secondary'}
        className="ml-auto -mt-2 mr-5"
        size={'icon'}
        onClick={() => handleCopy(code)}
      >
        {isCopy ? (
          <>
            <ClipboardPlus />
          </>
        ) : (
          <>
            <Copy />
          </>
        )}
      </Button>
      <pre className="whitespace-pre-wrap break-all text-sm leading-5.5 overflow-x-auto px-5 pointer-none">
        <code>{code}</code>
      </pre>
    </Card>
  )
}
