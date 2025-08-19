import Header from '@/components/custom/header'
import TooltipBtn from '@/components/custom/Tooltipbtn'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'

import {
  AlignJustify,
  ChevronDown,
  Grid2x2Plus,
  Key,
  LayoutGrid,
  Loader,
  PackagePlus,
  ShieldAlert,
  SlidersHorizontal,
  Sparkles,
  WandSparkles,
} from 'lucide-react'
import { useState } from 'react'

export default function Fonts() {
  const [loading] = useState(false)
  const [lay, setLay] = useState('default')
  const [isOption, setIsOption] = useState(true)

  const data = [...Array(5).keys()]

  return (
    <>
      <Header />
      <div className="pt-7">
        <Card className="flex-row items-center bg-zinc-800 text-white border-0 md:w-xl px-5 gap-1 py-2.5 mx-auto mt-10">
          {loading ? (
            <Loader size={33} className={loading && 'animate-spin'} />
          ) : (
            <Sparkles />
          )}
          <Input
            type="search"
            className="shadow-none outline-0 border-0 rounded-sm"
            placeholder="Search your Typography"
          />
          <TooltipBtn label="Magic" icon={<WandSparkles />} />
          <TooltipBtn label="filter by" icon={<SlidersHorizontal />} />
          <TooltipBtn label="KeyWords" icon={<Key />} />
        </Card>
        <div
          className={`mt-11 flex flex-col bg-zinc-800 p-4 duration-200  ${
            isOption ? 'h-44 rounded-2xl' : 'rounded-sm'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TooltipBtn
                label="Options"
                icon={<ChevronDown />}
                disable={data.length <= 0}
                variant={isOption ? 'secondary' : 'ghost'}
                action={() => setIsOption(!isOption)}
              />
              <span className="font-inter font-medium">
                {data.length <= 9 ? '0' + data.length : data.length}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <TooltipBtn
                label="Grid"
                icon={<LayoutGrid />}
                disable={data.length <= 0}
                variant={lay === 'grid' ? 'secondary' : 'ghost'}
                action={() => setLay('grid')}
              />
              <TooltipBtn
                label="Default"
                icon={<AlignJustify />}
                disable={data.length <= 0}
                variant={lay !== 'grid' ? 'secondary' : 'ghost'}
                action={() => setLay('default')}
              />
            </div>
          </div>
          {isOption && (
            <div className="flex flex-col items-center gap-5 mt-3 duration-200">
              <div className="flex items-center gap-5 w-full">
                <div className="flex items-center gap-3 md:w-3xl">
                  <h3 className="text shrink-0">text</h3>
                  <Input
                    type="search"
                    className=" border-zinc-600 border-0 border-b rounded-none"
                    placeholder="Write your Text"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-5 w-full">
                <div className="flex items-center gap-3 w-full">
                  <h3 className="text shrink-0">font size</h3>
                  <Slider
                    defaultValue={[33]}
                    max={100}
                    step={1}
                    className="mt-0.5"
                  />
                  <Badge variant="default">00</Badge>
                </div>
                <div className="flex items-center gap-3 w-full">
                  <h3 className="text shrink-0">font weight</h3>
                  <Slider
                    defaultValue={[33]}
                    max={100}
                    step={1}
                    className="mt-0.5"
                  />
                  <Badge variant="default">00</Badge>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="mt-15">
          {data.length <= 0 ? (
            <Card className="bg-zinc-800 border-zinc-700 text-white w-xl mx-auto my-32">
              <CardContent className="text-center">
                <ShieldAlert size={95} strokeWidth={1} className="mx-auto" />
                <h3 className="text-4xl">Opps! Nothing is here</h3>
                <p className="text-sm mt-1.5">
                  look like you have search something that we don't have. So,
                  please wait we will fix it soon Or want to tell about that us.
                </p>
                <Button className="mt-4 mx-auto px-7!" size="sm">
                  Tell us
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div
              className={`grid gap-5 ${
                lay === 'default' ? 'grid-cols-1' : 'grid-cols-2'
              }`}
            >
              {data?.map((l, i) => (
                <Card
                  key={i}
                  className="bg-zinc-800 border-zinc-700 text-white"
                >
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <h1 className="text-2xl">Roboto slab {l}</h1>
                      <Badge>06 style</Badge>
                    </div>
                    <p className="text-lg mt-1.5">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Dolorum ipsum eos deserunt aperiam consectetur nam?
                    </p>
                    <div className="mt-3 flex items-center justify-end gap-1.5">
                      <TooltipBtn label="use it" icon={<PackagePlus />} />
                      <TooltipBtn label="add store" icon={<Grid2x2Plus />} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
        <div className="py-5"></div>
      </div>
    </>
  )
}
