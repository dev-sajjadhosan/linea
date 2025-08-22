import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { BellRing } from 'lucide-react'
// import noti from '../../assets/noti_loading.gif'
import { Card } from '@/components/ui/card'

export default function GetNotify() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email')
      return
    }
    // here you’d call your API to save the email
    setSubmitted(true)
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="default">
          Get notify <BellRing className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="p-6 [&>button]:hidden">
        {!submitted ? (
          <>
            <DialogHeader>
              <DialogTitle>Notify Address</DialogTitle>
              <DialogDescription>
                Enter your email to get notified when new updates drop.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button className="w-full" onClick={handleSubmit}>
                Notify Me
              </Button>
            </div>
          </>
        ) : (
          <Card className="items-center gap-1 text-center p-11 border-0">
            <img src="/public/favicon.png" width={110} alt="linea" />
            <h3 className="text-lg font-semibold text-green-600 mt-5">
              🎉 You’re on the list!
            </h3>
            <p className="text-sm text-gray-400">
              We’ll send updates to <span className="font-medium text-primary">{email}</span>
              .
            </p>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  )
}
