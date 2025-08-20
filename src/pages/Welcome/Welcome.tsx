import { Typewriter } from 'react-simple-typewriter'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import TooltipBtn from '@/components/custom/Tooltipbtn'
import { Github, Linkedin, UserStar } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Welcome() {
  return (
    <>
      <div className="flex flex-col items-center justify-center relative h-full">
        <h1 className="text-6xl">
          <Typewriter
            words={['Welcome To', `Linea`]}
            typeSpeed={71}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </h1>
        <motion.h3
          initial={{
            y: 20, // small offset for animation
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 1, // seconds
            delay: 2.9, // delay in seconds
          }}
          className="text-lg font-light mt-1 text-center"
        >
          Discover the perfect font for every project—
          <span className="font-semibold"> fast</span>,{' '}
          <span className="font-semibold">simple</span>, and{' '}
          <span className="font-semibold">organized</span>.
        </motion.h3>

        <motion.div
          initial={{
            y: 20, // small offset so it animates in
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 1, // seconds, not ms
            delay: 3.1, // delay in seconds
          }}
          className="flex items-center gap-5 mt-5"
        >
          <Link to={'/fonts'}>
            <Button variant="default">Explore Now</Button>
          </Link>
          <Link to={'/about'}>
            <Button variant="ghost">About Page</Button>
          </Link>
        </motion.div>
        <motion.div
          initial={{
            y: 20, // small offset so it animates in
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 1, // seconds, not ms
            delay: 3.3, // delay in seconds
          }}
          className="flex items-center gap-2 absolute bottom-7 right-15"
        >
          <Link to={'https://github.com/dev-sajjadhosan'}>
            <TooltipBtn label="Github" icon={<Github />} />
          </Link>
          <Link to={'https://www.linkedin.com/in/devsajjadhosan'}>
            <TooltipBtn label="Linkedin" icon={<Linkedin />} />
          </Link>
          <Link to={'https://mohammadsajjadhosan.vercel.app'}>
            <TooltipBtn label="Dev Profile" icon={<UserStar />} />
          </Link>
        </motion.div>
      </div>
    </>
  )
}
