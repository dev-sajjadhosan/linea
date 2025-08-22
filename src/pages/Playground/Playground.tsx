/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react'
import { Rnd } from 'react-rnd'
import {
  Bold,
  Italic,
  Brush,
  Trash,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Type,
  Hash,
  Layers2,
  Redo2,
  Undo2,
  BrushCleaning,
  MousePointerClick,
  Home,
  ToggleLeft,
  SunMoon,
  LayoutTemplate,
  Share2,
  Import,
  Cloud,
  Database,
  Sparkles,
  Strikethrough,
  Underline,
  PanelsTopLeft,
  Layout,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CaseLower,
  CaseUpper,
  CaseSensitive,
  Smartphone,
  AlertCircle,
  GripHorizontal,
  ChevronsRightLeft,
  EyeClosed,
} from 'lucide-react'

import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import TooltipBtn from '@/components/custom/Tooltipbtn'
import { Textarea } from '@/components/ui/textarea'
import NewFeatures from '@/components/custom/newFeatures'
import { toast } from 'sonner'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

type TextBox = {
  id: string
  text: string
  x: number
  y: number
  width: number | string
  height: number | string
  fontFamily: string
  fontSize: number
  fontWeight: number
  fontStyle: 'normal' | 'italic'
  color: string
  backgroundColor: string
  textAlign: 'left' | 'center' | 'right'
  borderRadius: number
  borderWidth: number | undefined
  borderColor: string
  padding: number
  lineHeight: number
  textDecoration: 'none' | 'underline' | 'line-through'
  textTransform: 'lowercase' | 'uppercase' | 'capitalize'
  zIndex: number
}
const alignments = [
  { label: 'Align Left', value: 'left', icon: <AlignLeft /> },
  { label: 'Align Center', value: 'center', icon: <AlignCenter /> },
  { label: 'Align Right', value: 'right', icon: <AlignRight /> },
]
const features = [
  {
    title: 'All side edit',
    description:
      'Individually adjust padding, border, and border-radius for each side or corner.',
    icon: <PanelsTopLeft />, // lucide-react icon for corner/side editing
  },
  {
    title: 'Responsive side edit',
    description:
      'Control padding, border, and border-radius per side with responsive breakpoints for full flexibility.',
    icon: <Layout />, // lucide-react icon for responsive layouts
  },
  {
    title: 'Select Toggle',
    description: 'Easily switch between selection modes with a simple toggle.',
    icon: <ToggleLeft />,
  },
  {
    title: 'Theme Mode',
    description:
      'Switch seamlessly between light and dark modes for better comfort.',
    icon: <SunMoon />,
  },
  {
    title: 'Word by Word Styling',
    description:
      'Style text like in Figma – customize each word with unique styles.',
    icon: <Type />,
  },
  {
    title: 'Ready-to-use Templates',
    description:
      'Jump-start your projects with pre-built templates: websites, heroes, cards, posters, logos, and more.',
    icon: <LayoutTemplate />,
  },
  {
    title: 'Share',
    description: 'Quickly share your projects with others in one click.',
    icon: <Share2 />,
  },
  {
    title: 'Import / Export',
    description:
      'Bring in assets or export your work with full compatibility and ease.',
    icon: <Import />,
  },
  {
    title: 'Online / Offline Status',
    description:
      'Work offline and sync your projects when you’re back online without losing progress.',
    icon: <Cloud />,
  },
  {
    title: 'Database Connect',
    description:
      'Connect directly to your database for live data binding and dynamic content.',
    icon: <Database />,
  },
  {
    title: 'Something New',
    description:
      'We’re cooking up a surprise feature that will take your workflow to the next level.',
    icon: <Sparkles />,
  },
]
export default function TypographyPlayground() {
  const [isMobile, setIsMobile] = useState(false)
  const [textBoxes, setTextBoxes] = useState<TextBox[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [history, setHistory] = useState<TextBox[][]>([])
  const [redoStack, setRedoStack] = useState<TextBox[][]>([])
  const [googleFonts, setGoogleFonts] = useState<string[]>([])
  const [activeFont] = useState<string>('Roboto, sans-serif') //setActiveFont
  const [openId, setOpenId] = useState<string | null>(null)

  const [isActive, setIsActive] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const toolbarRef = useRef<HTMLDivElement>(null)
  const toolbarRef2 = useRef<HTMLDivElement>(null)

  const selectedBox = textBoxes.find((tb) => tb.id === selectedId)

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true)
    }
  }, [])
  // Fetch Google Fonts
  useEffect(() => {
    fetch(
      'https://www.googleapis.com/webfonts/v1/webfonts?key=YOUR_API_KEY&sort=popularity',
    )
      .then((res) => res.json())
      .then((data) => setGoogleFonts(data.items.map((f: any) => f?.family)))
  }, [])

  const pushHistory = (newBoxes: TextBox[]) => {
    setHistory((prev) => [...prev, textBoxes])
    setRedoStack([])
    setTextBoxes(newBoxes)
  }

  const addTextBox = () => {
    const newId = `text-${textBoxes.length + 1}`
    const newBox: TextBox = {
      id: newId,
      text: 'New Text',
      x: 50,
      y: 50,
      width: 'auto',
      height: 'auto',
      fontFamily: activeFont,
      fontSize: 24,
      fontWeight: 400,
      fontStyle: 'normal',
      color: '#fff',
      backgroundColor: 'transparent',
      textAlign: 'left',
      borderRadius: 0,
      borderWidth: 0,
      borderColor: '#fff',
      padding: 5,
      lineHeight: 1.2,
      textDecoration: 'none',
      zIndex: textBoxes.length,
      textTransform: 'lowercase',
    }
    pushHistory([...textBoxes, newBox])
    setSelectedId(newId)
  }

  const updateBox = (id: string, patch: Partial<TextBox>) => {
    pushHistory(
      textBoxes.map((tb) => (tb.id === id ? { ...tb, ...patch } : tb)),
    )
  }

  const undo = () => {
    if (!history.length) return
    const prev = history[history.length - 1]
    setRedoStack((r) => [textBoxes, ...r])
    setTextBoxes(prev)
    setHistory((h) => h.slice(0, -1))
    setSelectedId(null)
  }

  const redo = () => {
    if (!redoStack.length) return
    const next = redoStack[0]
    setHistory((h) => [...h, textBoxes])
    setTextBoxes(next)
    setRedoStack((r) => r.slice(1))
  }

  const copyBox = () => {
    if (!selectedBox) return
    const newId = `text-${textBoxes.length + 1}`
    const clone = {
      ...selectedBox,
      id: newId,
      x: selectedBox.x + 20,
      y: selectedBox.y + 20,
    }
    pushHistory([...textBoxes, clone])
    setSelectedId(newId)
  }

  const deleteBox = () => {
    if (!selectedBox) return
    pushHistory(textBoxes.filter((tb) => tb.id !== selectedBox.id))
    setSelectedId(null)
  }

  const handleClickOutside = (e: MouseEvent) => {
    if (
      containerRef.current &&
      toolbarRef.current &&
      toolbarRef2.current &&
      !containerRef.current.contains(e.target as Node) &&
      !toolbarRef.current.contains(e.target as Node) &&
      !toolbarRef2.current.contains(e.target as Node)
    ) {
      setSelectedId(null)
      setIsActive(false) // reset the active state too
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleTransparent = () => {
    if (!selectedBox) return
    const newColor = (selectedBox.backgroundColor = 'transparent')
    updateBox(selectedBox.id, { backgroundColor: newColor })
  }

  // handler function
  function moveBox(direction: 'up' | 'down' | 'left' | 'right') {
    if (!selectedBox) return

    let newX = selectedBox.x
    let newY = selectedBox.y

    switch (direction) {
      case 'up':
        newY -= 10 // move up by 10px
        break
      case 'down':
        newY += 10
        break
      case 'left':
        newX -= 10
        break
      case 'right':
        newX += 10
        break
    }

    updateBox(selectedBox.id, { x: newX, y: newY })
  }

  if (isMobile) {
    return (
      <div className="flex items-center justify-center h-screen p-6">
        <Card className="max-w-xl w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-indigo-400 font-light">
              <Smartphone className="" /> Mobile Not Supported
            </CardTitle>
            <CardDescription>
              This editor is optimized for desktop. Please switch to a larger
              screen to unlock the full experience.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="p-5">
              <AlertCircle />
              <AlertTitle>Why?</AlertTitle>
              <AlertDescription>
                Advanced editing tools don’t scale well on small screens. Use a
                tablet or desktop for the best experience.
              </AlertDescription>
            </Alert>
          </CardContent>
          <p className="mt-3 text-sm text-center text-green-300">
            Thank You ! Please use an large screen device
          </p>
          <Link to={'/home'}>
            <Button className="w-44 mx-auto -mt-4" variant={'secondary'}>
              <Home /> Back to Home
            </Button>
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full h-screen flex flex-col relative">
      <div ref={containerRef} className="flex-1 relative border">
        {textBoxes
          .slice()
          .sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0))
          .map((box) => (
            <Rnd
              key={box.id}
              size={{ width: box.width, height: box.height }}
              position={{ x: box.x, y: box.y }}
              onDragStop={(_, d) => updateBox(box.id, { x: d.x, y: d.y })}
              onResizeStop={(_, __, ref, ___, pos) =>
                updateBox(box.id, {
                  width: parseInt(ref.style.width),
                  height: parseInt(ref.style.height),
                  ...pos,
                })
              }
              bounds="parent"
              style={{
                fontFamily: box.fontFamily,
                fontSize: box.fontSize,
                fontWeight: box.fontWeight,
                fontStyle: box.fontStyle,
                color: box.color,
                backgroundColor: box.backgroundColor,
                textAlign: box.textAlign as any,
                display: 'flex',
                alignItems: 'center',
                justifyContent:
                  box.textAlign === 'left'
                    ? 'flex-start'
                    : box.textAlign === 'center'
                    ? 'center'
                    : 'flex-end',
                border: `${box.borderWidth}px solid ${box.borderColor}`,
                outline:
                  selectedId === box.id
                    ? `2px solid #0ea5e9` // selected border
                    : 'none',
                borderRadius:
                  selectedId === box.id
                    ? box.borderRadius || 4 // add a default 4px radius for outline
                    : box.borderRadius,
                padding:
                  selectedId === box.id
                    ? box.padding || 6 // add extra padding when selected
                    : box.padding,
                textDecoration: box.textDecoration,
                cursor: 'pointer',
                textTransform: box.textTransform,
                // overflow: 'hidden', // cut off extra content
                // wordBreak: 'break-word', // break long words
                // whiteSpace: 'pre-wrap', // preserve newlines and wrap text
                width: box.width === 'auto' ? 'fit-content' : box.width,
                height: box.height === 'auto' ? 'fit-content' : box.height,
                minWidth: 50,
              }}
              onClick={() => {
                if (isActive) {
                  setSelectedId(box.id) // select only when active
                }
              }}
            >
              <div className="relative">
                <div
                  style={{
                    width: box.width === 'auto' ? 'fit-content' : box.width,
                    minWidth: 50,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}
                  onDoubleClick={() => setOpenId(box.id)} // <-- double click triggers popover
                  className="cursor-text"
                >
                  {box.text}
                </div>
              </div>
            </Rnd>
          ))}
      </div>

      {selectedBox && (
        <Card ref={toolbarRef2} className="fixed top-2.5 right-2.5 w-sm p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <TooltipBtn
                label="Collapse"
                icon={<ChevronsRightLeft />}
                action={() => toast.warning('This action is dev mode!')}
              />
              <TooltipBtn
                label="Hide"
                icon={<EyeClosed />}
                action={() => toast.warning('This action is dev mode!')}
              />
            </div>
            <TooltipBtn
              label="Drag"
              icon={<GripHorizontal />}
              action={() => toast.warning('This action is dev mode!')}
            />
          </div>
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="text-sm text-gray-400">Actions</h3>
              <div className="flex flex-wrap items-center gap-1.5">
                <TooltipBtn
                  label="New Text"
                  icon={<Type />}
                  action={addTextBox}
                />
                <TooltipBtn
                  label="Select"
                  icon={<MousePointerClick />}
                  variant={isActive ? 'secondary' : 'ghost'}
                  action={() => {
                    if (isActive) setSelectedId(null) // clear when turning off
                    setIsActive(!isActive)
                  }}
                />

                <TooltipBtn label="Copy" icon={<Layers2 />} action={copyBox} />
                <TooltipBtn
                  label="Delete"
                  icon={<Trash />}
                  action={deleteBox}
                />
                <TooltipBtn
                  label="Ai help"
                  icon={<Sparkles />}
                  action={() =>
                    toast.warning('This features is under cooking!')
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-sm text-gray-400">History</h3>
              <div className="flex items-center gap-1.5">
                <TooltipBtn label="Undo" icon={<Undo2 />} action={undo} />
                <TooltipBtn label="Redo" icon={<Redo2 />} action={redo} />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="text-sm text-gray-400">Typography</h3>
              <div className="flex flex-wrap items-center gap-1.5">
                <TooltipBtn
                  label="Bold"
                  icon={<Bold />}
                  action={() =>
                    updateBox(selectedBox.id, {
                      fontWeight: selectedBox.fontWeight === 700 ? 400 : 700,
                    })
                  }
                />
                <TooltipBtn
                  label="Italic"
                  icon={<Italic />}
                  action={() =>
                    updateBox(selectedBox.id, {
                      fontStyle:
                        selectedBox.fontStyle === 'italic'
                          ? 'normal'
                          : 'italic',
                    })
                  }
                />
                <TooltipBtn
                  label="Strike through"
                  icon={<Strikethrough />}
                  action={() =>
                    updateBox(selectedBox.id, {
                      textDecoration:
                        selectedBox.textDecoration === 'line-through'
                          ? 'none'
                          : 'line-through',
                    })
                  }
                />
                <TooltipBtn
                  label="Underline"
                  icon={<Underline />}
                  action={() =>
                    updateBox(selectedBox.id, {
                      textDecoration:
                        selectedBox.textDecoration === 'underline'
                          ? 'none'
                          : 'underline',
                    })
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-sm text-gray-400">Type Case</h3>
              <div className="flex flex-wrap items-center gap-1.5">
                <TooltipBtn
                  label="Small"
                  icon={<CaseLower />}
                  action={() =>
                    updateBox(selectedBox.id, {
                      textTransform:
                        selectedBox.textTransform === 'capitalize' ||
                        selectedBox.textTransform === 'uppercase'
                          ? 'lowercase'
                          : selectedBox.textTransform,
                    })
                  }
                />
                <TooltipBtn
                  label="Big"
                  icon={<CaseUpper />}
                  action={() =>
                    updateBox(selectedBox.id, {
                      textTransform:
                        selectedBox.textTransform === 'lowercase' ||
                        selectedBox.textTransform === 'capitalize'
                          ? 'uppercase'
                          : selectedBox.textTransform,
                    })
                  }
                />
                <TooltipBtn
                  label="Capitalize"
                  icon={<CaseSensitive />}
                  action={() =>
                    updateBox(selectedBox.id, {
                      textTransform:
                        selectedBox.textTransform === 'lowercase' ||
                        selectedBox.textTransform === 'uppercase'
                          ? 'capitalize'
                          : selectedBox.textTransform,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-sm text-gray-400">Color</h3>
            <div className="flex flex-wrap items-center gap-1.5">
              <TooltipBtn
                label="Color"
                icon={
                  <label>
                    <Brush />
                    <input
                      type="color"
                      hidden
                      onChange={(e) =>
                        updateBox(selectedBox.id, { color: e.target.value })
                      }
                      value={selectedBox.color}
                    />
                  </label>
                }
              />
              <TooltipBtn
                label="Background"
                icon={
                  <label>
                    <BrushCleaning />
                    <input
                      type="color"
                      hidden
                      onChange={(e) =>
                        updateBox(selectedBox.id, {
                          backgroundColor: e.target.value,
                        })
                      }
                      value={selectedBox.backgroundColor}
                    />
                  </label>
                }
              />

              <TooltipBtn
                label="Transparent"
                icon={<Hash />}
                action={toggleTransparent}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="text-sm text-gray-400">Text Alignment</h3>
              <div className="flex flex-wrap items-center gap-1.5">
                {alignments.map(({ label, value, icon }) => (
                  <TooltipBtn
                    key={value}
                    label={label}
                    icon={icon}
                    size="sm"
                    variant="ghost"
                    className={
                      selectedBox?.textAlign === value ? 'text-orange-500' : ''
                    }
                    action={() =>
                      updateBox(selectedBox.id, {
                        textAlign: value as any,
                      })
                    }
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-sm text-gray-400">Position</h3>
              <div className="flex flex-wrap items-center gap-1.5">
                <TooltipBtn
                  label="Up"
                  icon={<ChevronUp />}
                  action={() => moveBox('up')}
                />
                <TooltipBtn
                  label="Down"
                  icon={<ChevronDown />}
                  action={() => moveBox('down')}
                />
                <TooltipBtn
                  label="Left"
                  icon={<ChevronLeft />}
                  action={() => moveBox('left')}
                />
                <TooltipBtn
                  label="Right"
                  icon={<ChevronRight />}
                  action={() => moveBox('right')}
                />
              </div>
            </div>
          </div>
          {openId === selectedBox.id && (
            <div className="flex flex-col gap-1">
              <h3 className="text-sm text-gray-400">Write here</h3>
              <Textarea
                value={selectedBox.text}
                autoFocus
                rows={2} // start small
                className="border-0 bg-transparent resize-y overflow-hidden"
                onChange={(e) =>
                  updateBox(selectedBox.id, { text: e.target.value })
                }
              />
            </div>
          )}
        </Card>
      )}
      <Card
        ref={toolbarRef}
        className={`fixed bottom-7 left-0 right-0 p-3 ${
          selectedBox ? 'md:w-6xl' : 'w-sm'
        } mx-auto rounded-xl flex-row items-center justify-between flex-wrap gap-2`}
      >
        <div className="w-full">
          {selectedBox ? (
            <div className="flex flex-wrap gap-3 items-center justify-between w-full">
              <div className="flex flex-col gap-1">
                <label className="text-sm">Font Size</label>
                <Input
                  type="number"
                  value={selectedBox.fontSize}
                  onChange={(e) =>
                    updateBox(selectedBox.id, {
                      fontSize: parseInt(e.target.value, 10),
                    })
                  }
                  className="w-16 text-center"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm">Font Weight</label>
                <Input
                  type="number"
                  value={selectedBox.fontWeight}
                  onChange={(e) =>
                    updateBox(selectedBox.id, {
                      fontWeight: parseInt(e.target.value, 10),
                    })
                  }
                  className="w-16"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm">Border Radius</label>
                <Input
                  type="number"
                  value={selectedBox.borderRadius}
                  onChange={(e) =>
                    updateBox(selectedBox.id, {
                      borderRadius: parseInt(e.target.value, 10),
                    })
                  }
                  className="w-16 text-center"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm">Border Width</label>
                <Input
                  type="number"
                  value={selectedBox.borderWidth}
                  onChange={(e) =>
                    updateBox(selectedBox.id, {
                      borderWidth: parseInt(e.target.value, 10),
                    })
                  }
                  className="w-16 text-center"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm">Padding</label>
                <Input
                  type="number"
                  value={selectedBox.padding}
                  onChange={(e) =>
                    updateBox(selectedBox.id, {
                      padding: parseInt(e.target.value, 10),
                    })
                  }
                  className="w-16 text-center"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm">Font family</label>
                <Select
                  value={selectedBox.fontFamily}
                  onValueChange={(v) =>
                    updateBox(selectedBox.id, { fontFamily: v })
                  }
                >
                  <SelectTrigger className="w-40 border-0">
                    <SelectValue placeholder="Font" />
                  </SelectTrigger>
                  <SelectContent>
                    {googleFonts.map((f) => (
                      <SelectItem key={f} value={f}>
                        {f}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <div className="flex gap-1.5 ">
                <TooltipBtn
                  label="Next Text"
                  icon={<Type />}
                  action={addTextBox}
                />
                <TooltipBtn
                  label="Select"
                  icon={<MousePointerClick />}
                  variant={isActive ? 'secondary' : 'ghost'}
                  action={() => {
                    if (isActive) setSelectedId(null) // clear when turning off
                    setIsActive(!isActive)
                  }}
                />
              </div>
              <div className="flex items-center gap-1.5">
                <NewFeatures features={features} />
                <TooltipBtn label="Home" icon={<Home />} to={'/home'} />
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
