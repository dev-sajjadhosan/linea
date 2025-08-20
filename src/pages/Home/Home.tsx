import Header from '@/components/custom/header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { CaseSensitive, PlayCircle } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  const [index, setIndex] = useState(0)
  const data = [...Array(12).keys()]
  const len = [...Array(Math.ceil(data.length / 3)).keys()]

  // Variants for smooth stagger animation
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-between h-full">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mt-24"
        >
          <img src="/favicon.png" width={160} alt="logo" />
        </motion.div>

        {/* Headline + Subheadline */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl"
        >
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-6 flex justify-center gap-4"
          >
            <Link to={'/fonts'}>
              <Button variant="secondary">
                Explore Fonts
                <CaseSensitive className="ml-2" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-11/12 mx-auto mt-32"
        >
          <h3 className="text-4xl text-center">How it works</h3>
          <div className="mt-7 md:w-2xl h-[21rem] rounded-2xl border border-zinc-700 mx-auto relative overflow-hidden">
            <video src="./Home.tsx" className="w-full h-full object-cover" />
            <PlayCircle
              size={60}
              strokeWidth={1}
              className="absolute top-1/2 left-1/2 -translate-1/2 duration-150 active:scale-95 cursor-pointer"
            />
          </div>
        </motion.div>

        {/* Popular Fonts */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={container}
          className="w-11/12 mx-auto mt-32"
        >
          <h3 className="text-4xl text-center">Popular Fonts</h3>

          {/* Dots */}
          <div className="flex items-center justify-end gap-1.5 mt-3">
            {len?.map((_, i) => (
              <span
                key={i}
                onClick={() => setIndex(i)}
                className={`w-2.5 h-2.5 rounded-full duration-200 cursor-pointer ${
                  i === index ? 'bg-primary w-5' : 'bg-zinc-800'
                }`}
              />
            ))}
          </div>

          {/* Cards */}
          <motion.div
            variants={container}
            className="flex items-center gap-15 overflow-x-auto py-5 px-3"
          >
            {data?.map((l, i) => (
              <motion.div key={i} variants={item}>
                <Card className="shrink-0 w-xs h-34  cursor-pointer duration-150 hover:scale-105">
                  <CardContent>
                    <Badge variant="outline">Popular</Badge>
                    <h1 className="text-xl mt-1">Inter {l}</h1>
                    <p className="text-sm mt-1">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Placeat, voluptate!
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}
