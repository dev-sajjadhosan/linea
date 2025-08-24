import Header from '@/components/custom/header'
import TooltipBtn from '@/components/custom/Tooltipbtn'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import useFonts from '@/hooks/useFonts'
import { motion, AnimatePresence } from 'framer-motion'
import { useVirtualizer } from '@tanstack/react-virtual'

import {
  AlignJustify,
  ChevronDown,
  Grid2x2Plus,
  Key,
  LayoutGrid,
  ListFilter,
  Loader,
  PackagePlus,
  RotateCcw,
  ShieldAlert,
  Shuffle,
  // SlidersHorizontal,
  Sparkles,
  WandSparkles,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useAISuggestFonts } from '@/hooks/useAISuggestFonts'
import { SortType, TextType, useFontStore } from '@/store/FontStore'
import {
  autoCategorizeFonts,
  quickSearchCategories,
} from '@/pages/Fonts/supply'

export default function Fonts() {
  const {
    lay,
    fontSize,
    fontWeight,
    text,
    activeCategory,
    search,
    sort,
    // category,
    subset,
    setLay,
    setFontSize,
    setFontWeight,
    setText,
    setActiveCategory,
    setSearch,
    setSort,
    // setCategory,
    setSubset,
  } = useFontStore()

  const textType = useFontStore((s) => s.textType)
  const setTextType = useFontStore((s) => s.setTextType)
  const { fonts, loading } = useFonts({
    sort: sort,
    // category: 'serif',
    subset: subset,
  })
  const { results, ai_loading, suggestFonts } = useAISuggestFonts(fonts)
  const categorizedFonts = autoCategorizeFonts(fonts)

  const [sLoading, setSLoading] = useState(false)
  const [isFilterMore, setIsFilterMore] = useState(true)
  const [isOption, setIsOption] = useState(false)
  const [isMagicSearch, setIsMagicSearch] = useState(false)

  const loadedFonts = useRef<Set<string>>(new Set())
  const parentRef = useRef<HTMLDivElement>(null)
  const rowHeights = useRef<number[]>([])

  useEffect(() => {
    if (!search) {
      setSLoading(false)
      return
    }

    setSLoading(true)
    const timer = setTimeout(() => {
      // simulate search done
      setSLoading(false)
    }, 500) // adjust debounce time

    return () => clearTimeout(timer)
  }, [search])

  const filteredFonts = isMagicSearch
    ? results.filter((f) =>
        !activeCategory || activeCategory === 'all'
          ? true
          : categorizedFonts[activeCategory]?.includes(f.family),
      )
    : results.length > 0
    ? results.filter((f) =>
        !activeCategory || activeCategory === 'all'
          ? true
          : categorizedFonts[activeCategory]?.includes(f.family),
      )
    : fonts.filter((f) => {
        let matchCategory = true
        if (activeCategory && activeCategory !== 'all') {
          const categoryFonts = categorizedFonts[activeCategory] || []
          matchCategory = categoryFonts.includes(f.family)
        }
        const matchSearch =
          !search || f.family.toLowerCase().includes(search.toLowerCase())
        return matchCategory && matchSearch
      })

  const virtualizer = useVirtualizer({
    count: filteredFonts.length,
    getScrollElement: () => parentRef.current, // <-- use getScrollElement
    estimateSize: (index: number) => rowHeights.current[index] || 200,
    overscan: 5,
  })

  const loadFont = (family: string, url: string) => {
    if (!loadedFonts.current.has(family)) {
      const style = document.createElement('style')
      style.innerHTML = `
        @font-face {
          font-family: '${family}';
          src: url('${url}') format('truetype');
          font-weight: normal;
          font-style: normal;
        }
      `
      document.head.appendChild(style)
      loadedFonts.current.add(family)
    }
  }

  return (
    <>
      <Header />
      <div className="pt-7">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="flex-row items-center md:w-xl px-5 gap-0 py-2.5 mx-auto mt-10 rounded-lg">
            {sLoading || ai_loading ? (
              <Loader size={26} className="animate-spin" />
            ) : (
              <TooltipBtn
                label={isMagicSearch ? 'Magic Off' : 'Magic On'}
                variant={isMagicSearch ? 'secondary' : 'ghost'}
                icon={<Sparkles />}
                action={() => setIsMagicSearch(!isMagicSearch)}
              />
            )}
            <Input
              type="search"
              className="bg-transparent! outline-0 border-0 placeholder:text-zinc-400"
              placeholder="Describe your project (AI will suggest fonts)"
              onChange={(e) => {
                setSearch(e.target.value)
                if (results.length > 0) results.splice(0, results.length)
              }}
            />
            <TooltipBtn
              label="Magic"
              icon={<WandSparkles />}
              disable={ai_loading}
              action={() => suggestFonts(search)}
            />
            {/* <TooltipBtn label="Filter" icon={<SlidersHorizontal />} /> */}
            <TooltipBtn label="Keywords" icon={<Key />} />
          </Card>
        </motion.div>

        {/* Options Panel */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card
            className={`mt-14 flex flex-col p-3 ${
              isOption ? 'rounded-2xl' : 'rounded-md'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  disabled={fonts.length <= 0}
                  variant={isOption ? 'secondary' : 'ghost'}
                  onClick={() => setIsOption(!isOption)}
                  size="sm"
                >
                  Advanced
                  <motion.div
                    animate={{ rotate: isOption ? -45 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown />
                  </motion.div>
                </Button>

                <div className="font-inter font-medium flex items-center gap-1">
                  <Badge variant={'secondary'}>
                    Total{' '}
                    {fonts.length <= 9 ? '0' + fonts.length : fonts.length}
                  </Badge>
                  <Shuffle size={15} />
                  <Badge variant={'outline'}>
                    {filteredFonts.length <= 9
                      ? '0' + filteredFonts.length
                      : filteredFonts.length}{' '}
                    Find
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <TooltipBtn
                  label="Grid"
                  icon={<LayoutGrid />}
                  disable={fonts.length <= 0}
                  variant={lay === 'grid' ? 'secondary' : 'ghost'}
                  action={() => setLay('grid')}
                />
                <TooltipBtn
                  label="List"
                  icon={<AlignJustify />}
                  disable={fonts.length <= 0}
                  variant={lay !== 'grid' ? 'secondary' : 'ghost'}
                  action={() => setLay('default')}
                />
              </div>
            </div>

            <AnimatePresence>
              {isOption && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col gap-6 mt-4">
                    {/* Text Input */}
                    <div className="flex items-center gap-3 md:w-3xl">
                      <Select
                        value={textType}
                        onValueChange={(val) =>
                          // handleTextTypeChange(val)
                          setTextType(val as TextType)
                        }
                      >
                        <SelectTrigger className="w-[170px] border-0">
                          <SelectValue placeholder="Text Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="def">Default</SelectItem>
                          <SelectItem value="par">Paragraph</SelectItem>
                          <SelectItem value="let_num">
                            Letter & Number
                          </SelectItem>
                          <SelectItem value="sym">Symbols</SelectItem>
                          <SelectItem value="cus">Custom</SelectItem>
                        </SelectContent>
                      </Select>

                      <Input
                        type="text"
                        value={text}
                        onChange={(e) =>
                          textType === ('cus' as typeof textType) &&
                          setText(e.target.value)
                        }
                        className="border-0 border-b border-zinc-600 bg-transparent! rounded-none placeholder:text-zinc-500"
                        placeholder="Write your Text"
                        disabled={textType !== ('cus' as typeof textType)}
                        // disables input for predefined types
                      />
                    </div>

                    {/* Sliders */}
                    <div className="grid md:grid-cols-2 gap-6 w-full">
                      <div className="flex items-center gap-3 w-full">
                        <h3 className="text-sm font-medium shrink-0">
                          Font size
                        </h3>
                        <Slider
                          value={[fontSize]}
                          min={14}
                          max={75}
                          step={1}
                          onValueChange={(val) => setFontSize(val[0])}
                        />
                        <Badge>{fontSize}px</Badge>
                        <TooltipBtn
                          label="reset"
                          icon={<RotateCcw />}
                          action={() => setFontSize(32)}
                        />
                      </div>

                      <div className="flex items-center gap-3 w-full">
                        <h3 className="text-sm font-medium shrink-0">
                          Font weight
                        </h3>
                        <Slider
                          value={[fontWeight]}
                          min={100}
                          max={900}
                          step={100}
                          onValueChange={(val) => setFontWeight(val[0])}
                        />
                        <Badge>{fontWeight}</Badge>
                        <TooltipBtn
                          label="reset"
                          icon={<RotateCcw />}
                          action={() => setFontWeight(400)}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>

        <div className={`mt-6 ${isMagicSearch ? 'hidden' : ''}`}>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-center">
                Filter by Category{' '}
              </h3>
              <Button
                onClick={() => setIsFilterMore(!isFilterMore)}
                variant={isFilterMore ? 'ghost' : 'secondary'}
                size={'sm'}
                className="relative"
              >
                <ListFilter />
                <Badge
                  className="absolute -top-3 -right-3 text-xs"
                  variant={'secondary'}
                >
                  {Object.keys(quickSearchCategories).length}
                </Badge>
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.keys(quickSearchCategories)
                .slice(0, isFilterMore ? 30 : -1)
                .map((cat, i) => {
                  // Check if this category is currently active and has no data
                  const isEmptyAfterClick =
                    activeCategory === cat && filteredFonts.length === 0
                  return (
                    <Badge
                      key={i}
                      onClick={() =>
                        setActiveCategory(activeCategory === cat ? 'all' : cat)
                      }
                      variant={
                        isEmptyAfterClick
                          ? 'secondary'
                          : activeCategory === cat
                          ? 'default'
                          : 'outline'
                      }
                      className={`cursor-pointer transition-colors px-3 py-1 ${
                        isEmptyAfterClick ? 'text-red-500 border-red-500' : ''
                      }`}
                    >
                      {cat}
                    </Badge>
                  )
                })}
              {isFilterMore && (
                <Badge
                  onClick={() => setIsFilterMore(!isFilterMore)}
                  variant={'secondary'}
                  className="cursor-pointer"
                >
                  More...
                </Badge>
              )}
            </div>
          </Card>
        </div>
        <div className="mt-7">
          <Card className="flex-row justify-between p-5">
            <Select value={sort} onValueChange={(v: SortType) => setSort(v)}>
              <SelectTrigger className="w-[170px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alpha">A → Z</SelectItem>
                <SelectItem value="date">Newest</SelectItem>
                <SelectItem value="popularity">Most Popular</SelectItem>
                <SelectItem value="style">Most Styles</SelectItem>
                <SelectItem value="trending">Trending</SelectItem>
              </SelectContent>
            </Select>

            <Select value={subset} onValueChange={(v) => setSubset(v)}>
              <SelectTrigger className="w-[170px]">
                <SelectValue placeholder="Language Support" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latin">Latin</SelectItem>
                <SelectItem value="latin-ext">Latin Extended</SelectItem>
                <SelectItem value="cyrillic">Cyrillic</SelectItem>
                <SelectItem value="greek">Greek</SelectItem>
                <SelectItem value="devanagari">Devanagari</SelectItem>
                <SelectItem value="vietnamese">Vietnamese</SelectItem>
              </SelectContent>
            </Select>
          </Card>
        </div>
        {/* Font List */}
        <div className="mt-16">
          <AnimatePresence mode="wait">
            {loading ? (
              <Loader
                size={66}
                className="animate-spin mx-auto mt-32"
                strokeWidth={1}
              />
            ) : (
              <>
                {filteredFonts.length <= 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Card className="w-xl mx-auto my-32">
                      <CardContent className="text-center py-10">
                        <ShieldAlert
                          size={95}
                          strokeWidth={1}
                          className="mx-auto mb-4"
                        />
                        {isMagicSearch ? (
                          <>
                            <h3 className="text-3xl font-semibold">
                              Oops! Nothing found
                            </h3>
                            <p className="text-sm mt-2 text-zinc-400">
                              Looks like you have searched for something that we
                              don't have. Try a different keyword.
                            </p>
                            <Button
                              className="mt-5 mx-auto px-6"
                              variant={'secondary'}
                              disabled
                            >
                              Add a Font
                            </Button>
                          </>
                        ) : (
                          <>
                            <h3 className="text-3xl font-semibold">
                              Oops! Nothing found
                            </h3>
                            <p className="text-sm mt-2 text-zinc-400">
                              Looks like we don’t have what you searched for.
                              Try a different keyword or request it below.
                            </p>
                            <Button
                              className="mt-5 mx-auto px-6"
                              variant={'secondary'}
                            >
                              Request a Font
                            </Button>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ) : (
                  <motion.div
                    key="list"
                    initial="hidden"
                    animate="show"
                    variants={{
                      hidden: { opacity: 0 },
                      show: {
                        opacity: 1,
                        transition: { staggerChildren: 0.07 },
                      },
                    }}
                  >
                    {loading ? (
                      <p>Loading fonts...</p>
                    ) : (
                      <div
                        ref={parentRef}
                        className="mt-8 h-[80vh] overflow-auto"
                      >
                        <div
                          style={{
                            height: virtualizer.getTotalSize(),
                            position: 'relative',
                          }}
                        >
                          {virtualizer.getVirtualItems().map((virtualRow) => {
                            const font = filteredFonts[virtualRow.index]
                            if (!font) return null
                            const fontUrl =
                              font?.files['400'] ||
                              font?.files[font?.variants[0]]
                            if (fontUrl) loadFont(font.family, fontUrl)

                            return (
                              <div
                                key={font.family}
                                style={{
                                  position: 'absolute',
                                  top: virtualRow.start,
                                  width: '100%',
                                }}
                                ref={(el) => {
                                  if (el) {
                                    const height =
                                      el.getBoundingClientRect().height
                                    if (
                                      rowHeights.current[virtualRow.index] !==
                                      height
                                    ) {
                                      rowHeights.current[virtualRow.index] =
                                        height
                                      virtualizer.measure()
                                    }
                                  }
                                }}
                              >
                                <Card className="hover:border-zinc-700 transition-colors my-5">
                                  <CardContent className="pt-5">
                                    <div className="flex items-center justify-between mb-2">
                                      <h1 className="text-xl font-gor">
                                        {font.family}
                                      </h1>
                                      <Badge
                                        variant={'outline'}
                                        className="capitalize"
                                      >
                                        {sort}
                                      </Badge>
                                    </div>

                                    <p
                                      className="mt-3 text-wrap whitespace-pre-wrap overflow-hidden"
                                      style={{
                                        fontFamily: `"${font.family}", ${font.category}`,
                                        fontSize,
                                        fontWeight,
                                      }}
                                    >
                                      {text}
                                    </p>

                                    <div className="mt-7 flex items-center justify-between">
                                      <div className="flex items-center gap-2 mt-4"></div>

                                      <div className="mt-4 flex items-center justify-end gap-2">
                                        <Button size="sm" variant="default">
                                          <PackagePlus className="mr-1 h-4 w-4" />{' '}
                                          Use it
                                        </Button>
                                        <Button size="sm" variant="ghost">
                                          <Grid2x2Plus className="mr-1 h-4 w-4" />{' '}
                                          Add to Store
                                        </Button>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </>
            )}
          </AnimatePresence>
        </div>

        <div className="py-10" />
      </div>
    </>
  )
}
