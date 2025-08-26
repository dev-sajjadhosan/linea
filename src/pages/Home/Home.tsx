import Header from '@/components/custom/header'
import Loader from '@/components/custom/Loader'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import useFonts from '@/hooks/useFonts'
import { motion } from 'framer-motion'
import { PlayCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Home() {
  const { fonts, loading } = useFonts({
    sort: 'popularity',
  })

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
              <Button>Browse All Fonts</Button>
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
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={container}
          className="w-11/12 mx-auto mt-32 flex flex-col gap-8"
        >
          {/* Heading */}
          <div className="text-center">
            <h2 className="text-4xl font-bold">Showcase Your Fonts</h2>
            <p className="text-lg text-zinc-500 mt-2">
              Explore, select, and embed the perfect typography for your
              project.
            </p>
          </div>

          {/* Font Cards Grid */}
          <div className="">
            {loading ? (
              <Loader />
            ) : (
              <motion.div
                variants={container}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              >
                {fonts?.slice(0, 8)?.map((font, i) => (
                  <motion.div key={i} variants={item}>
                    <Card className="cursor-pointer duration-150 hover:scale-105">
                      <CardContent className="flex flex-col gap-2">
                        <Badge variant="outline">{font.category}</Badge>
                        <h3 className="text-xl font-semibold">{font.family}</h3>
                        <p className="text-sm text-zinc-500">
                          {font.category} • {font.variants.length} weights
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </motion.section>
      </div>
    </>
  )
}
