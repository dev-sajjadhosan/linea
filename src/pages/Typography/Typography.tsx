import Header from '@/components/custom/header'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { motion } from 'framer-motion'
import { AlertCircle, PopcornIcon } from 'lucide-react'
import { useState } from 'react'

const typographyLessons = [
  {
    title: 'Introduction to Typography',
    content: `Typography is the art of arranging type to make written language legible, readable, and visually appealing. It's the foundation of design and communication. A solid understanding of typography will make your designs look professional and accessible.`,
  },
  {
    title: 'The Anatomy of Letters',
    content: `Understanding letter anatomy helps you choose the right fonts for your project.
- Baseline: the line letters sit on
- X-height: height of lowercase letters
- Ascender: part of letter above x-height
- Descender: part of letter below baseline
- Serif: small lines added to letters (Serif fonts)
- Counter: enclosed space inside letters like 'o', 'p', 'b'
`,
  },
  {
    title: 'Font Categories',
    content: `1. Serif: Classic, formal fonts like Times New Roman or Playfair Display
2. Sans-Serif: Modern, clean fonts like Helvetica or Poppins
3. Display: Decorative fonts for titles and posters
4. Handwriting: Casual or script fonts
5. Monospace: Fixed-width fonts used in code and technical writing
6. Variable Fonts: Flexible fonts with adjustable weights, widths, and styles
`,
  },
  {
    title: 'Typography Principles',
    content: `1. Hierarchy: Use size, weight, and spacing to guide the eye
2. Contrast: Make important text stand out
3. Alignment: Keep text visually aligned (left, right, center)
4. Consistency: Stick to a type system
5. White Space: Let text breathe for better readability
6. Legibility: Ensure fonts are easy to read at any size
7. Readability: Structure paragraphs for smooth scanning
`,
  },
  {
    title: 'Typography in Practice',
    content: `- Headings: Bold, larger, clear hierarchy
- Body: Smaller, readable, ample line-height
- Buttons: Short, actionable text
- Quotes: Italics or distinctive font to emphasize
- Code: Monospace for clarity`,
  },
  {
    title: 'Best Practices',
    content: `• Limit fonts to 2–3 per project
• Pair fonts carefully (serif + sans-serif)
• Keep line length 50–75 characters
• Use appropriate line-height (1.4–1.6 for body)
• Avoid all caps for long paragraphs
• Ensure high contrast between text and background`,
  },
  {
    title: 'Tools & Resources',
    content: `• Google Fonts - free fonts for web & design
• Adobe Fonts - premium professional fonts
• FontPair - find good font combinations
• Typewolf - font inspiration & usage examples
• Figma & Sketch - typography in design tools`,
  },
]

export default function TypographyLab() {
  const [sampleText, setSampleText] = useState(
    'The quick brown fox jumps over the lazy dog',
  )
  const [fontSize, setFontSize] = useState(24)
  const [fontWeight, setFontWeight] = useState(400)
  const [lineHeight, setLineHeight] = useState(1.5)
  const [letterSpacing, setLetterSpacing] = useState(0)
  const [color, setColor] = useState('#ffffff')

  const headers = [
    { tag: 'h1', size: 48 },
    { tag: 'h2', size: 40 },
    { tag: 'h3', size: 32 },
    { tag: 'h4', size: 28 },
    { tag: 'h5', size: 24 },
    { tag: 'h6', size: 20 },
  ]

  // const weights = [
  //   { value: 100, label: 'Thin' },
  //   { value: 300, label: 'Light' },
  //   { value: 400, label: 'Regular' },
  //   { value: 500, label: 'Medium' },
  //   { value: 600, label: 'Semi-Bold' },
  //   { value: 700, label: 'Bold' },
  //   { value: 800, label: 'Extra-Bold' },
  //   { value: 900, label: 'Black' },
  // ]

  return (
    <>
      <Header />
      <div className="p-6 max-w-5xl mx-auto space-y-12">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-2"
        >
          <h1 className="text-5xl font-bold">Typography Lab</h1>
          <p className="text-gray-300 text-lg">
            Learn everything about typography: headers, sizes, colors, spacing,
            weight, and more.
          </p>
        </motion.div>
        {/* Lessons */}
        {typographyLessons.map((lesson, idx) => (
          <motion.section
            key={idx}
            className="bg-zinc-900 p-6 rounded-xl shadow-md border border-zinc-700"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-semibold mb-3">{lesson.title}</h2>
            <p className="text-gray-300 whitespace-pre-line leading-relaxed">
              {lesson.content}
            </p>
          </motion.section>
        ))}

        {/* Headers Section */}
        <section>
          <h2 className="text-3xl font-semibold mb-4">
            Header Examples (H1-H6)
          </h2>
          <div className="space-y-4">
            {headers.map((h) => {
              const Tag = h.tag as React.ElementType
              return (
                <Card key={h.tag} className="p-5">
                  <CardContent>
                    <Tag style={{ fontSize: h.size }}>{`This is ${h.tag}`}</Tag>
                    <Badge variant="outline" className="mt-2">
                      Size: {h.size}px
                    </Badge>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Body Text Playground */}
        <section>
          <h2 className="text-3xl font-semibold mb-4">Body Text Playground</h2>
          <Card className="p-4 space-y-4">
            <CardContent className="space-y-4">
              <Input
                type="text"
                value={sampleText}
                onChange={(e) => setSampleText(e.target.value)}
                placeholder="Type your sample text"
              />

              <div className="space-y-3">
                <div>
                  <span className="mr-2 font-medium">
                    Font Size: {fontSize}px
                  </span>
                  <Slider
                    value={[fontSize]}
                    min={12}
                    max={72}
                    step={1}
                    onValueChange={(val) => setFontSize(val[0])}
                  />
                </div>

                <div>
                  <span className="mr-2 font-medium">
                    Font Weight: {fontWeight}
                  </span>
                  <Slider
                    value={[fontWeight]}
                    min={100}
                    max={900}
                    step={100}
                    onValueChange={(val) => setFontWeight(val[0])}
                  />
                </div>

                <div>
                  <span className="mr-2 font-medium">
                    Line Height: {lineHeight}
                  </span>
                  <Slider
                    value={[lineHeight]}
                    min={1}
                    max={2}
                    step={0.1}
                    onValueChange={(val) => setLineHeight(val[0])}
                  />
                </div>

                <div>
                  <span className="mr-2 font-medium">
                    Letter Spacing: {letterSpacing}px
                  </span>
                  <Slider
                    value={[letterSpacing]}
                    min={-5}
                    max={20}
                    step={0.5}
                    onValueChange={(val) => setLetterSpacing(val[0])}
                  />
                </div>

                <div>
                  <span className="mr-2 font-medium">Color:</span>
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-16 h-8 p-0 border-0"
                  />
                </div>
              </div>

              <div
                className="mt-6 p-4 border rounded-md"
                style={{
                  fontSize,
                  fontWeight,
                  lineHeight,
                  letterSpacing,
                  color,
                }}
              >
                {sampleText}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Typography Principles */}
        <section>
          <h2 className="text-3xl font-semibold mb-4">Typography Principles</h2>
          <Card>
            <CardContent className="p-4 space-y-2">
              <Alert>
                <PopcornIcon />
                <AlertTitle className="font-light">
                  <strong>Font Weight:</strong> Determines boldness. Normal is
                  400, Bold is 700.
                </AlertTitle>
              </Alert>
              <Alert>
                <PopcornIcon />
                <AlertTitle className="font-light">
                  <strong>Font Size:</strong> Controls hierarchy. Larger = more
                  important.
                </AlertTitle>
              </Alert>
              <Alert>
                <PopcornIcon />
                <AlertTitle className="font-light">
                  <strong>Line Height:</strong> Vertical spacing between lines,
                  improves readability.
                </AlertTitle>
              </Alert>
              <Alert>
                <PopcornIcon />
                <AlertTitle className="font-light">
                  <strong>Letter Spacing:</strong> Space between letters.
                  Positive = spread out, negative = tighter.
                </AlertTitle>
              </Alert>
              <Alert>
                <PopcornIcon />
                <AlertTitle className="font-light">
                  <strong>Color:</strong> Helps contrast, hierarchy,
                  accessibility. Always ensure readability.
                </AlertTitle>
              </Alert>
              <Alert>
                <PopcornIcon />
                <AlertTitle className="font-light">
                  <strong>Gaps & Space:</strong> Padding, margins, spacing
                  between elements improves clarity and flow.
                </AlertTitle>
              </Alert>
            </CardContent>
          </Card>
        </section>

        <Alert variant={'destructive'} className='flex justify-center'>
          <AlertCircle />
          <AlertTitle className="font-light tracking-wide">
            <strong>Page:</strong> This Typography Lab is a work in progress.
            More lessons and features coming soon!
          </AlertTitle>
        </Alert>
        {/* Footer */}
        <footer className="mt-16 py-6 text-center text-gray-400">
          &copy; {new Date().getFullYear()} Linea Typography Lab. All rights
          reserved.
        </footer>
      </div>
    </>
  )
}
