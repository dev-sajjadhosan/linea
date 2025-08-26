import TooltipBtn from '@/components/custom/Tooltipbtn'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { useFontStore } from '@/store/FontStore'
import { useMyStore } from '@/store/myStore'
import {
  ArrowBigDownDash,
  Check,
  Store,
  TextSearch,
  Trash2,
} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function MyStore() {
  const { myFonts, removeFont, removeAll } = useMyStore()
  const text = useFontStore((s) => s.text)
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <TooltipBtn label="My Store" icon={<Store />} />
        </DialogTrigger>
        <DialogContent className="p-9 [&>button]:hidden md:w-5xl!">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <h3 className="text-xl">My Store</h3>
              <div className="flex items-center gap-1.5">
                <Badge variant={'secondary'}>{myFonts.length} Fonts</Badge>
                <TooltipBtn
                  label="Trash All"
                  icon={<Trash2 />}
                  action={removeAll}
                  disable={myFonts.length > 0 ? false : true}
                />
                {/* <TooltipBtn label='Trash All' icon={<Trash2 />} /> */}
                <TooltipBtn
                  label="Export"
                  icon={<ArrowBigDownDash />}
                  variant="secondary"
                  disable={myFonts.length >= 2 ? false : true}
                />
              </div>
            </DialogTitle>
            <DialogDescription>
              {myFonts.length <= 0 ? (
                <Card className="mx-auto md:w-2xl p-17 mt-13 bg-transparent">
                  <CardContent className="flex flex-col items-center justify-center">
                    <Store
                      size={55}
                      strokeWidth={1}
                      className="text-destructive"
                    />
                    {/* <h3 className="text-xl font-gor tracking-wide">Empty Store</h3> */}
                    <h3 className="text-2xl font-gor tracking-wide">Yo! </h3>
                    <p className="text-lg text-center mb-2.5">
                      look like you don't have any fonts in your store yet.
                    </p>
                    <Link to={'/fonts'}>
                      <Button variant={'outline'}>
                        <TextSearch />
                        Find Some
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-2 gap-3 mt-13 overflow-y-scroll h-[60vh] py-5">
                  {myFonts.map((font) => (
                    <Card
                      key={font.family}
                      className="flex-row items-center justify-between p-5 h-fit"
                    >
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl">{font.family}</h3>
                          <Badge variant={'secondary'}>{font.category}</Badge>
                        </div>
                        <p className="text-sm">{text}</p>
                      </div>
                      <Separator orientation="vertical" className="h-24! w-1! rounded-full" />
                      <div className="flex flex-col gap-2.5">
                        <TooltipBtn
                          label="Use it"
                          icon={<Check />}
                          // action={() => setAsDefault(font.family)}
                          variant="secondary"
                        />
                        <TooltipBtn
                          label="Remove"
                          icon={<Trash2 />}
                          action={() => removeFont(font.family)}
                        />
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}
