import Header from '@/components/custom/header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { CaseSensitive } from 'lucide-react'
import { useState } from 'react'

export default function Home() {
  const [index, setIndex] = useState(0)
  const data = [...Array(12).keys()]
  const len = [...Array(Math.ceil(data.length / 3)).keys()]

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-evenly min-h-full">
        <div></div>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl"
        >
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-2xl md:text-5xl font-light "
          >
            Find the{' '}
            <span className="text-orange-400 font-inter font-semibold">
              Perfect
            </span>{' '}
            <span className="font-bold">Font</span>.{' '}
            <span className="font-bold">Fast.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-1 text-md "
          >
            Linea is a free, open-source platform that organizes fonts by
            category and helps you discover exactly what you need —
            effortlessly.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-6 flex justify-center gap-4"
          >
            <Button className="" variant="secondary">
              Explore Fonts
              <CaseSensitive className="mt-1" />
            </Button>
            {/* <Button className="" variant="secondary">
              Ai Filter
            </Button> */}
          </motion.div>
        </motion.div>
        <div className="w-11/12 mx-auto">
          <div className="flex items-center justify-end gap-1.5">
            {len?.map((_, i) => (
              <span
                key={i}
                onClick={() => setIndex(i)}
                className={`w-2.5 h-2.5 rounded-full duration-200 cursor-pointer ${
                  i === index ? 'bg-secondary w-5' : 'bg-zinc-800'
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-15 overflow-x-auto py-5 px-3">
            {data?.map((l, i) => (
              <Card
                key={i}
                className="shrink-0 w-xs h-34 bg-zinc-800 border-0 text-zinc-100 cursor-pointer duration-150 hover:scale-105"
              >
                <CardContent>
                  <Badge className="text-xs font-light">Popular</Badge>
                  <h1 className="text-xl">Inter {l}</h1>
                  <p className="text-sm mt-1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Placeat, voluptate!
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
