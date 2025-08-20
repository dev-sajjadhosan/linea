import Header from '@/components/custom/header'
import TooltipBtn from '@/components/custom/Tooltipbtn'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { motion, AnimatePresence } from 'framer-motion'

import {
  AlignJustify,
  ChevronDown,
  Grid2x2Plus,
  Key,
  LayoutGrid,
  Loader,
  PackagePlus,
  RotateCcw,
  ShieldAlert,
  Shuffle,
  SlidersHorizontal,
  Sparkles,
  WandSparkles,
} from 'lucide-react'
import { useState } from 'react'

export default function Fonts() {
  const [loading] = useState(false)
  const [lay, setLay] = useState<'default' | 'grid'>('default')
  const [isOption, setIsOption] = useState(true)
  const [text, setText] = useState(
    'abcdefghijklmnopqrstuvwxyz || ABCDEFGHIJKLMNOPQRSTUVWXYZ || 012345678910 ',
  )
  const [fontSize, setFontSize] = useState(32)
  const [fontWeight, setFontWeight] = useState(400)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [textType, setTextType] = useState<
    'def' | 'par' | 'let_num' | 'sym' | 'cus'
  >('def')

  // Add this helper function to set the text based on selection
  const handleTextTypeChange = (type: typeof textType) => {
    setTextType(type)
    switch (type) {
      case 'def':
        setText(
          'Dream big, work hard, stay focused, embrace challenges, and turn your vision into reality with passion, persistence, and purpose.',
        )
        break
      case 'par':
        setText(
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis dolore nam illum ducimus eaque tenetur nisi? Rerum unde quod dolorum, recusandae placeat molestiae nobis aspernatur voluptate, iste vel accusantium? Aliquid nulla excepturi recusandae distinctio omnis, eligendi dolorem ipsa, cupiditate dolore animi ',
        )
        break
      case 'let_num':
        setText(
          'abcdefghijklmnopqrstuvwxyz || ABCDEFGHIJKLMNOPQRSTUVWXYZ || 012345678910',
        )
        break
      case 'sym':
        setText('!@#$%^&*()_+-={}[]|\\:;<>,.?/~`')
        break
      case 'cus':
        setText('Write your custom code here ') // user types manually
        break
    }
  }

  const categories = [
    'all',
    'Logo',
    'Gaming',
    'Landing Page',
    'Hero Section',
    'Blog',
    'Portfolio',
    'Corporate',
    'Business',
    'Creative',
    'Display',
    'Handwriting',
    'Monospace',
    'Serif',
    'Sans-serif',
    'Modern',
    'Classic',
    'Minimal',
    'Tech',
    'Education',
    'Kids',
    'Branding',
    'Web',
    'UI',
    'Print',
    'Magazine',
    'Social Media',
    'Poster',
    'Creative Projects',
  ]

  // fake data with category assigned
  const data = [
    {
      id: 1,
      name: 'Roboto Slab',
      category: 'Logo',
      styles: 6,
      type: 'Serif',
      designer: 'Christian Robertson',
      releaseYear: 2011,
      license: 'Apache 2.0',
      popularity: 95,
      sampleText: 'The quick brown fox jumps over the lazy dog.',
      fileSize: '120KB',
      languages: ['Latin', 'Cyrillic', 'Greek'],
      tags: ['Professional', 'Corporate', 'Modern'],
      recommendedUse: ['Logos', 'Headings', 'Branding'],
      story: `Roboto Slab was designed to complement the original Roboto typeface family. Its geometric shapes and friendly curves make it suitable for professional branding, print, and web interfaces.`,
      origin: 'USA',
      systems: ['Google Fonts'],
      notableProjects: ['Android Material Design', 'Corporate Branding'],
      supportedCountries: ['Global'],
      similarFonts: ['Merriweather', 'Lora'],
      contribution:
        'Open source font widely used in tech and corporate projects.',
      description:
        'A modern serif font blending mechanical and friendly curves.',
      fontFamily: "'Roboto Slab', serif",
    },
    {
      id: 2,
      name: 'Montserrat',
      category: 'Gaming',
      styles: 8,
      type: 'Sans-serif',
      designer: 'Julieta Ulanovsky',
      releaseYear: 2010,
      license: 'SIL Open Font License',
      popularity: 88,
      sampleText: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789',
      fileSize: '130KB',
      languages: ['Latin', 'Vietnamese'],
      tags: ['Modern', 'Tech', 'Gaming'],
      recommendedUse: ['Web', 'Gaming', 'UI'],
      story: `Inspired by the old posters and signs in Buenos Aires. Revives urban typography for modern digital use.`,
      origin: 'Argentina',
      systems: ['Google Fonts', 'FontShare'],
      notableProjects: ['Game interfaces', 'Web dashboards', 'Branding'],
      supportedCountries: ['Global'],
      similarFonts: ['Raleway', 'Open Sans'],
      contribution: 'Widely adopted in tech, gaming, and digital platforms.',
      description: 'A geometric sans-serif font ideal for digital projects.',
      fontFamily: "'Montserrat', sans-serif",
    },
    {
      id: 3,
      name: 'Open Sans',
      category: 'Landing Page',
      styles: 10,
      type: 'Sans-serif',
      designer: 'Steve Matteson',
      releaseYear: 2011,
      license: 'Apache 2.0',
      popularity: 92,
      sampleText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      fileSize: '140KB',
      languages: ['Latin', 'Cyrillic', 'Greek', 'Vietnamese'],
      tags: ['Readable', 'Professional', 'UI'],
      recommendedUse: ['Landing Pages', 'Paragraphs', 'UI'],
      story: `Optimized for legibility across print, web, and mobile interfaces. Neutral yet friendly.`,
      origin: 'USA',
      systems: ['Google Fonts'],
      notableProjects: ['Websites', 'Apps', 'Corporate UI'],
      supportedCountries: ['Global'],
      similarFonts: ['Roboto', 'Lato'],
      contribution: 'One of the most widely used web fonts worldwide.',
      description: 'Optimized for readability for web, mobile, and print.',
      fontFamily: "'Open Sans', sans-serif",
    },
    {
      id: 4,
      name: 'Lora',
      category: 'Hero Section',
      styles: 5,
      type: 'Serif',
      designer: 'Cyreal',
      releaseYear: 2011,
      license: 'SIL Open Font License',
      popularity: 80,
      sampleText: 'The quick brown fox jumps over the lazy dog.',
      fileSize: '110KB',
      languages: ['Latin', 'Cyrillic'],
      tags: ['Elegant', 'Readable', 'Classic'],
      recommendedUse: ['Hero Sections', 'Paragraphs', 'Blog Posts'],
      story: `Well-balanced contemporary serif with roots in calligraphy.`,
      origin: 'Russia',
      systems: ['Google Fonts'],
      notableProjects: ['Editorial Design', 'Website Headers'],
      supportedCountries: ['Global'],
      similarFonts: ['Merriweather', 'Roboto Slab'],
      contribution: 'Popular for creative and editorial projects.',
      description: 'Blends classic elegance with modern readability.',
      fontFamily: "'Lora', serif",
    },
    {
      id: 5,
      name: 'Poppins',
      category: 'Blog',
      styles: 7,
      type: 'Sans-serif',
      designer: 'Indian Type Foundry',
      releaseYear: 2014,
      license: 'SIL Open Font License',
      popularity: 85,
      sampleText: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789',
      fileSize: '125KB',
      languages: ['Latin', 'Devanagari'],
      tags: ['Modern', 'Geometric', 'Clean'],
      recommendedUse: ['Blogs', 'Websites', 'UI'],
      story: `Geometric sans-serif typeface with support for Latin and Devanagari scripts.`,
      origin: 'India',
      systems: ['Google Fonts', 'FontShare'],
      notableProjects: ['Blogs', 'Web Apps', 'Mobile UI'],
      supportedCountries: ['Global'],
      similarFonts: ['Raleway', 'Montserrat'],
      contribution: 'Favored for tech and modern web interfaces.',
      description: 'Clean geometric sans-serif font for modern interfaces.',
      fontFamily: "'Poppins', sans-serif",
    },
    {
      id: 6,
      name: 'Raleway',
      category: 'Portfolio',
      styles: 9,
      type: 'Sans-serif',
      designer: 'Multiple Designers',
      releaseYear: 2010,
      license: 'SIL Open Font License',
      popularity: 78,
      sampleText: 'The quick brown fox jumps over the lazy dog.',
      fileSize: '115KB',
      languages: ['Latin'],
      tags: ['Elegant', 'Modern', 'Headings'],
      recommendedUse: ['Portfolio', 'Headings', 'Branding'],
      story: `Elegant sans-serif originally designed as a single thin weight, now a full family.`,
      origin: 'USA',
      systems: ['Google Fonts'],
      notableProjects: ['Portfolio Sites', 'Branding Projects'],
      supportedCountries: ['Global'],
      similarFonts: ['Montserrat', 'Poppins'],
      contribution: 'Frequently used for creative portfolios and websites.',
      description: 'Elegant sans-serif font ideal for headings and branding.',
      fontFamily: "'Raleway', sans-serif",
    },
  ]

  // filtered data based on selected category
  const filteredData =
    activeCategory !== 'all'
      ? data.filter((d) => d.category === activeCategory)
      : data

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
            {loading ? (
              <Loader size={26} className="animate-spin" />
            ) : (
              <Popover>
                <PopoverTrigger>
                  <TooltipBtn label="Model" icon={<Sparkles />} />
                </PopoverTrigger>
                <PopoverContent>
                  Place content for the popover here.
                </PopoverContent>
              </Popover>
            )}
            <Input
              type="search"
              className="bg-transparent! outline-0 border-0 placeholder:text-zinc-400"
              placeholder="Search your Typography"
            />
            <TooltipBtn label="Magic" icon={<WandSparkles />} />
            <TooltipBtn label="Filter" icon={<SlidersHorizontal />} />
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
                  disabled={data.length <= 0}
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
                    Total {data.length <= 9 ? '0' + data.length : data.length}
                  </Badge>
                  <Shuffle size={15} />
                  <Badge variant={'outline'}>
                    {filteredData.length <= 9
                      ? '0' + filteredData.length
                      : filteredData.length}{' '}
                    fonts
                  </Badge>
                </div>
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
                  label="List"
                  icon={<AlignJustify />}
                  disable={data.length <= 0}
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
                          handleTextTypeChange(val as typeof textType)
                        }
                      >
                        <SelectTrigger className="w-[170px] border-0">
                          <SelectValue placeholder="Text Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="def">Default</SelectItem>
                          <SelectItem value="par">Paragraph</SelectItem>
                          <SelectItem value="let_num">Letter_Num</SelectItem>
                          <SelectItem value="sym">Symbols</SelectItem>
                          <SelectItem value="cus">Custom</SelectItem>
                        </SelectContent>
                      </Select>

                      <Input
                        type="text"
                        value={text}
                        onChange={(e) =>
                          textType === 'cus' && setText(e.target.value)
                        }
                        className="border-0 border-b border-zinc-600 bg-transparent! rounded-none placeholder:text-zinc-500"
                        placeholder="Write your Text"
                        disabled={textType !== 'cus'} // disables input for predefined types
                      />
                    </div>

                    {/* Sliders */}
                    <div className="grid grid-cols-2 gap-6 w-full">
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

        <div className="mt-6">
          <Card className="p-4">
            <h3 className="text-lg font-semibold text-center">
              Filter by Category
            </h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat, i) => {
  // Check if this category is currently active and has no data
  const isEmptyAfterClick =
    activeCategory === cat && filteredData.length === 0;

  return (
    <Badge
      key={i}
      onClick={() =>
        setActiveCategory(activeCategory === cat ? null : cat)
      }
      variant={ isEmptyAfterClick ? 'secondary' : activeCategory === cat ? 'default' : 'outline'}
      className={`cursor-pointer transition-colors px-3 py-1 ${
        isEmptyAfterClick ? 'text-red-500 border-red-500' : ''
      }`}
    >
      {cat}
    </Badge>
  );
})}

            </div>
          </Card>
        </div>

        {/* Font List */}
        <div className="mt-16">
          <AnimatePresence mode="wait">
            {filteredData.length <= 0 ? (
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
                    <h3 className="text-3xl font-semibold">
                      Oops! Nothing found
                    </h3>
                    <p className="text-sm mt-2 text-zinc-400">
                      Looks like we don’t have what you searched for. Try a
                      different keyword or request it below.
                    </p>
                    <Button className="mt-5 mx-auto px-6" variant={'secondary'}>
                      Request a Font
                    </Button>
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
                  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
                }}
                className={`grid gap-7 ${
                  lay === 'default' ? 'grid-cols-1' : 'grid-cols-2'
                }`}
              >
                {filteredData.map((l) => (
                  <motion.div
                    key={l.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="hover:border-zinc-700 transition-colors">
                      <CardContent className="pt-5">
                        <div className="flex items-center justify-between mb-2">
                          <h1 className="text-2xl font-medium">{l.name}</h1>
                          <Badge variant="secondary">{l.styles} styles</Badge>
                        </div>

                        <p
                          className="mt-3 text-wrap whitespace-pre-wrap overflow-hidden"
                          style={{
                            fontSize: fontSize,
                            fontWeight: fontWeight,
                            fontFamily: l?.fontFamily,
                          }}
                        >
                          {/* {l.sampleText} */}
                          {text}
                        </p>

                        <div className="mt-7 flex items-center justify-between">
                          <div className="flex items-center gap-2 mt-4">
                            <Badge className="text-xs" variant="outline">
                              {l.type}
                            </Badge>
                            {l.systems.map((s, idx) => (
                              <Badge
                                key={idx}
                                className="text-xs"
                                variant="outline"
                              >
                                {s}
                              </Badge>
                            ))}
                          </div>

                          <div className="mt-4 flex items-center justify-end gap-2">
                            <Button size="sm" variant="default">
                              <PackagePlus className="mr-1 h-4 w-4" /> Use it
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Grid2x2Plus className="mr-1 h-4 w-4" /> Add to
                              Store
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="py-10" />
      </div>
    </>
  )
}
