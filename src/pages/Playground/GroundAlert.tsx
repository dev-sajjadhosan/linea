import { useEffect, useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { AlertCircle, EyeClosed, EyeOff } from 'lucide-react'

// Define a key for localStorage to save the user's preference
const SHOW_ALERT_KEY = 'playground_alert_show'

export default function GroundAlert() {
  // Use state to manage the alert's visibility
  const [isAlertVisible, setIsAlertVisible] = useState(false)

  // Use a useEffect hook to check localStorage when the component mounts
  useEffect(() => {
    const shouldShowAlert = localStorage.getItem(SHOW_ALERT_KEY)
    if (shouldShowAlert !== 'false') {
      setIsAlertVisible(true)
    }
  }, []) // The empty dependency array ensures this runs only once on mount

  // Handle the 'Hide' button click
  const handleHide = () => {
    setIsAlertVisible(false)
  }

  // Handle the 'Don't show again' button click
  const handleDontShowAgain = () => {
    localStorage.setItem(SHOW_ALERT_KEY, 'false')
    setIsAlertVisible(false)
  }

  // If the alert should not be visible, don't render anything
  if (!isAlertVisible) {
    return null
  }

  return (
    <section className="fixed top-1/2 left-1/2 z-50 w-full max-w-xl -translate-x-1/2 -translate-y-1/2">
      <Alert variant={'info'} className="p-5">
        <AlertTitle className="flex items-center gap-2.5 text-lg">
          <AlertCircle size={25} />
          Playground Alert
        </AlertTitle>
        <AlertDescription>
          <p>
            I'm currently working on a few things. You might encounter some
            issues with:
          </p>
          <ul className="mt-2 list-inside list-disc text-sm">
            <li>Font changes in real-time text.</li>
            <li>Exporting and taking screenshots.</li>
            <li>Editor actions and user-friendliness.</li>
          </ul>
        </AlertDescription>
        <div className="flex items-center gap-2 mt-6">
          <Button size={'sm'} variant={'secondary'} onClick={handleHide}>
            Hide
            <EyeClosed className="ml-1 h-4 w-4" />
          </Button>
          <Button
            variant={'ghost'}
            className="text-destructive"
            size={'sm'}
            onClick={handleDontShowAgain}
          >
            Don't show again
            <EyeOff className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </Alert>
    </section>
  )
}
