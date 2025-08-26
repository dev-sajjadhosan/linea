/* eslint-disable react-hooks/rules-of-hooks */
import CodePre from '@/components/custom/CodePre'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGenerateGoogleFontsUrl } from '@/hooks/useGenerateGoogleFontsUrl'
import { useFontStore } from '@/store/FontStore'
import { useMyStore } from '@/store/myStore'
import { generateFontSnippets } from '@/utils/generateFontSnippets'
import { generateTailwindSnippets } from '@/utils/generateTailwindSnippets'
import {
  ArrowDownToLine,
  Box,
  Braces,
  Link2Off,
  RemoveFormatting,
  Share2,
  Trash2,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function Apply() {
  const { useFonts, useRemoveAll, useRemoveFont } = useMyStore()
  const { css, tailwind } = generateTailwindSnippets(useFonts)
  const text = useFontStore((s) => s.text)
  const url = useGenerateGoogleFontsUrl(useFonts)
  const snippets = generateFontSnippets(useFonts)

  const [isCode, setIsCode] = useState(false)

  useEffect(() => {
    if (!useFonts.length) {
      setIsCode(false)
    }
  }, [useFonts])

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button size={'sm'}>
            <Box /> Apply
          </Button>
        </DialogTrigger>
        <DialogContent className="p-9 [&>button]:hidden !w-5xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <h3 className="text-xl">Embed Typography on your Project</h3>
              <div className="flex items-center gap-2.5">
                <Badge variant={'secondary'}>{useFonts.length} Fonts</Badge>
                <Button
                  onClick={() => setIsCode(!isCode)}
                  variant={isCode ? 'secondary' : 'default'}
                  disabled={!useFonts.length}
                  size={'sm'}
                >
                  <Braces className={`${isCode && 'animate-bounce'}`} />
                  Embed Code
                </Button>
              </div>
            </DialogTitle>
            <DialogDescription>
              <div className="flex items-center justify-end gap-2.5 mt-3">
                <Button size={'sm'} variant={'ghost'} disabled={!url}>
                  <ArrowDownToLine />
                  Download All
                </Button>
                <Button
                  size={'sm'}
                  variant={'ghost'}
                  onClick={() => {
                    useRemoveAll()
                    toast.success('Yo! Removed All.')
                  }}
                  disabled={!useFonts.length}
                >
                  <Trash2 />
                  Remove All
                </Button>
                <Button
                  size={'sm'}
                  variant={'ghost'}
                  disabled={!useFonts.length}
                >
                  <Share2 />
                  Share
                </Button>
              </div>
              <>
                {isCode ? (
                  <div className="flex flex-col text-left gap-2.5 overflow-y-scroll h-[60vh] py-5">
                    <h3 className="text-2xl">Embed code</h3>
                    <h3 className="text-lg">
                      Embed code in the top of your css
                    </h3>
                    <div>
                      <CodePre code={`@import url('${url}');`} />
                      <Tabs defaultValue="default" className="w-full mt-5">
                        <TabsList>
                          <TabsTrigger value="default">Default</TabsTrigger>
                          <TabsTrigger value="tailwind">Tailwind</TabsTrigger>
                        </TabsList>
                        <TabsContent value="default">
                          <div className="flex flex-col gap-6 mt-2.5">
                            {snippets.map((snippet) => (
                              <div
                                key={snippet.family}
                                className="flex flex-col gap-2"
                              >
                                <h3 className="text-xl font-semibold">
                                  {snippet.family}
                                </h3>
                                <CodePre code={snippet.css} />
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                        <TabsContent value="tailwind">
                          <div className="flex flex-col gap-6 mt-2.5">
                            {/* Regular CSS */}
                            <h3 className="text-lg font-semibold">
                              Regular CSS
                            </h3>
                            <CodePre code={css} />
                            <h3 className="text-lg font-semibold mt-2">
                              Tailwind CSS
                            </h3>
                            <CodePre code={tailwind} />
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </div>
                ) : (
                  <div>
                    {useFonts.length <= 0 ? (
                      <div className="my-9">
                        <Card className="md:w-xl mx-auto p-19 bg-transparent">
                          <CardContent className="flex flex-col items-center justify-center">
                            <RemoveFormatting
                              size={55}
                              strokeWidth={1}
                              className="text-destructive"
                            />
                            <h3 className="text-xl font-semibold">
                              No Fonts Yet
                            </h3>
                            <p className="text-muted-foreground">
                              Start adding your favorite fonts to see them here.
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    ) : (
                      <div className="mt-9 grid grid-cols-1 gap-3 overflow-y-scroll h-[50vh] p-5">
                        {useFonts.map((font) => (
                          <Card className="h-fit">
                            <CardContent>
                              <div className="flex items-center justify-between">
                                <h3 className="text-2xl">{font?.family}</h3>
                                <Badge variant={'secondary'}>Dev_Mode</Badge>
                              </div>
                              <p className="text-xl text-zinc-400">{text}</p>
                              <div className="flex items-center justify-end gap-2.5 mt-2">
                                <TooltipBtn
                                  label="Trash"
                                  icon={<Link2Off />}
                                  action={() => {
                                    useRemoveFont(font?.family)
                                    toast.success('Yo! Removed Select Font.')
                                  }}
                                />
                                <TooltipBtn
                                  label="Download"
                                  icon={<ArrowDownToLine />}
                                  action={() => {
                                    toast.warning(
                                      'Yo! Downloaded features not available.',
                                    )
                                  }}
                                />
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}
