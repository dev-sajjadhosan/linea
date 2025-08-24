import Header from '@/components/custom/header'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Github, Mail, Network, Rocket, Rss } from 'lucide-react'

export default function About() {
  return (
    <>
      <Header />
      <div className="pt-12 pb-16 px-6 max-w-4xl mx-auto">
        {/* Logo + Title */}
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <motion.img
            src="/favicon.png"
            width={80}
            alt="linea"
            className="drop-shadow-sm"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 200 }}
          />
          <motion.h1
            className="text-4xl md:text-5xl font-gor tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Linea
          </motion.h1>
          <motion.p
            className="text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            The modern way to explore and organize fonts.
          </motion.p>
        </motion.div>

        {/* About Section */}
        <motion.section
          className="mt-12"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold mb-3">About Linea</h2>
          <p className="text-gray-300 leading-relaxed text-sm md:text-base">
            Linea is an open-source project designed to help designers and
            developers discover, organize, and use fonts more effectively. The
            goal is simple: create a modern and minimal hub where typography
            feels accessible and fun, without unnecessary complexity.
          </p>
        </motion.section>

        {/* Font Data Source Card */}
        <motion.section
          className="mt-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card >
            <CardContent>
              <h2 className="text-xl font-semibold mb-2">Font Data Source</h2>
              <p className="text-gray-300 text-sm">
                All fonts displayed in Linea are sourced from{' '}
                <a
                  href="https://fonts.google.com/"
                  target="_blank"
                  className="underline text-blue-400"
                  rel="noopener noreferrer"
                >
                  Google Fonts
                </a>{' '}
                via their official API. This ensures a reliable and up-to-date
                collection of high-quality fonts for your projects.
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Mission & Why */}
        <motion.section
          className="mt-10"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold mb-3">Why I Built This</h2>
          <p className="text-gray-300 leading-relaxed text-sm md:text-base">
            Typography is at the heart of design, yet exploring and managing
            fonts often feels overwhelming. Linea was born to make this process
            smooth, creative, and open-source—because design tools should be
            accessible to everyone.
          </p>
        </motion.section>

        {/* Contribution */}
        <motion.section
          className="mt-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold mb-3">
            Can Others Contribute?
          </h2>
          <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-4">
            Absolutely! Linea is open-source, and contributions are always
            welcome. Whether it’s improving the UI, adding fonts, or building
            new features— your input helps the project grow.
          </p>
          <Button
            variant="secondary"
            onClick={() =>
              window.open('https://github.com/dev-sajjadhosan/linea', '_blank')
            }
          >
            Contribute Now
            <Network />
          </Button>
        </motion.section>

        {/* Feedback & Collaboration */}
        <motion.section
          className="grid md:grid-cols-2 gap-8 mt-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold mb-2">
              Want to share feedback?
            </h2>
            <p className="text-gray-300 text-sm mb-3">
              Your thoughts and ideas matter. Help shape Linea into something
              better.
            </p>
            <Button
              variant="secondary"
              onClick={() =>
                window.open(
                  'https://github.com/dev-sajjadhosan/linea/discussions',
                  '_blank',
                )
              }
            >
              Give Feedback
              <Rss />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold mb-2">
              Interested in collaborating?
            </h2>
            <p className="text-gray-300 text-sm mb-3">
              Let’s build cool projects together! Check out my work and connect
              with me.
            </p>
            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                onClick={() =>
                  window.open(
                    'https://mohammadsajjadhosan.vercel.app',
                    '_blank',
                  )
                }
              >
                Portfolio
                <Rocket />
              </Button>

              <Button
                className="border"
                variant="ghost"
                onClick={() =>
                  window.open('https://github.com/dev-sajjadhosan', '_blank')
                }
              >
                GitHub
                <Github />
              </Button>

              <Button
                className="border"
                variant="ghost"
                onClick={() =>
                  (window.location.href = 'mailto:yourmail@gmail.com')
                }
              >
                G-mail
                <Mail />
              </Button>
            </div>
          </motion.div>
        </motion.section>

        {/* Community Section */}
        <motion.section
          className="mt-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Our Community
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {['Designers', 'Developers', 'Contributors'].map((role, i) => (
              <motion.div
                key={role}
                className="p-5 rounded-xl shadow-sm hover:shadow-md transition"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="font-normal text-lg">{role}</h3>
                <p className="text-sm text-gray-300 mt-1">
                  {role === 'Designers'
                    ? 'Share font inspiration and creative ideas.'
                    : role === 'Developers'
                    ? 'Help improve the platform with code contributions.'
                    : 'Support the project with feedback, docs, and ideas.'}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="mt-16 text-center py-6 border-t border-zinc-700 text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Linea. All rights reserved.
        </footer>
      </div>
    </>
  )
}
