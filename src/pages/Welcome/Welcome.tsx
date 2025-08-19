import { Typewriter } from 'react-simple-typewriter'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import TooltipBtn from '@/components/custom/Tooltipbtn'
import { Github, Linkedin, UserStar } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Welcome() {
  return (
    <>
      <div className="flex flex-col items-center justify-center relative">
        <h1 className="text-6xl">
          <Typewriter
            words={['Welcome To', 'Linea']}
            typeSpeed={71}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </h1>
        <motion.h3
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
            delay: 2.7, // delay in seconds
          }}
          className="text-lg font-light"
        >
          Get your Font's a <span className="font-semibold">Easy</span> ||{' '}
          <span className="font-semibold">Fast</span> &&{' '}
          <span className="font-semibold">Categories</span> Way
        </motion.h3>
        <div className="flex items-center gap-5 mt-5">
          <Link to={'/fonts'}>
            <Button variant="secondary" size="sm" className="px-5!">
              Explore Now
            </Button>
          </Link>
          <Link to={'/about'}>
            <Button variant="ghost" size="sm">
              About Page
            </Button>
          </Link>
        </div>
        <div className="flex items-center gap-1.5 absolute bottom-7 right-15">
          <Link to={'https://github.com/dev-sajjadhosan'}>
            <TooltipBtn label="Github" icon={<Github />} />
          </Link>
          <Link to={'https://www.linkedin.com/in/devsajjadhosan'}>
            <TooltipBtn label="Linkedin" icon={<Linkedin />} />
          </Link>
          <Link to={'https://mohammadsajjadhosan.vercel.app'}>
            <TooltipBtn label="Dev Profile" icon={<UserStar />} />
          </Link>
        </div>
      </div>
    </>
  )
}
