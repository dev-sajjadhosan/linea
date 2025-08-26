import TooltipBtn from '@/components/custom/Tooltipbtn'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useSettingStore } from '@/store/settingStore'
import { Monitor, Moon, Settings2, Sun, Undo2 } from 'lucide-react'
import { toast } from 'sonner'

export default function Setting() {
  const {
    theme,
    setTheme,
    homePage,
    setHomePage,
    setNavbar,
    setReset,
    navbar,
  } = useSettingStore()
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <TooltipBtn label="Setting" icon={<Settings2 />} />
        </DialogTrigger>
        <DialogContent className="p-9 [&>button]:hidden">
          <DialogHeader>
            <DialogTitle className="flex  justify-between">
              <h3 className="text-lg font-light">Setting</h3>
              <Button size={'sm'} onClick={setReset}>
                Reset <Undo2 />
              </Button>
            </DialogTitle>
            <DialogDescription>
              <div className="flex flex-wrap items-center justify-between gap-5 mt-3 text-left">
                <div className="flex flex-col gap-2">
                  <span className="text-lg font-light">Theme</span>
                  <div className="flex  gap-2.5">
                    <Button
                      size={'sm'}
                      variant={theme === 'light' ? 'default' : 'ghost'}
                      onClick={() => {
                        setTheme('light')
                        toast.warning('Please Read it', {
                          description:
                            'We are currently working on light theme. We will release it soon. So, Please use the Dark theme.',
                          duration: 5000,
                        })
                      }}
                    >
                      Light <Sun />
                    </Button>
                    <Button
                      size={'sm'}
                      variant={theme === 'dark' ? 'default' : 'ghost'}
                      onClick={() => setTheme('dark')}
                    >
                      Dark <Moon />
                    </Button>
                    <Button
                      size={'sm'}
                      variant={theme === 'system' ? 'default' : 'ghost'}
                      onClick={() => setTheme('system')}
                    >
                      System <Monitor />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-lg font-light">Navbar Position</span>
                  <div className="flex  gap-2.5">
                    <Button
                      size={'sm'}
                      variant={navbar === 'top' ? 'default' : 'ghost'}
                      onClick={() => setNavbar('top')}
                    >
                      Top
                    </Button>
                    <Button
                      size={'sm'}
                      variant={navbar === 'bottom' ? 'default' : 'ghost'}
                      onClick={() => setNavbar('bottom')}
                    >
                      Bottom
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-lg font-light">Home Page</span>
                  <div className="flex  gap-2.5">
                    <Button
                      size={'sm'}
                      variant={homePage === 'show' ? 'default' : 'ghost'}
                      onClick={() => setHomePage('show')}
                    >
                      Show
                    </Button>
                    <Button
                      size={'sm'}
                      variant={homePage === 'hide' ? 'default' : 'ghost'}
                      onClick={() => setHomePage('hide')}
                    >
                      Hide
                    </Button>
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}
