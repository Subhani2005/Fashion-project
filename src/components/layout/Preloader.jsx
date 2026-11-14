import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const EASE = [0.76, 0, 0.24, 1]

export default function Preloader() {
  const reduce = useReducedMotion()
  const [done, setDone] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (reduce) {
      setDone(true)
      return
    }

    let frame
    let timeout
    const start = performance.now()

    const tick = (time) => {
      const value = Math.min((time - start) / 1250, 1)
      setProgress(Math.round(value * 100))
      if (value < 1) {
        frame = requestAnimationFrame(tick)
      } else {
        timeout = setTimeout(() => setDone(true), 280)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(timeout)
    }
  }, [reduce])

  useEffect(() => {
    if (done) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [done])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="preloader"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.95, ease: EASE }}
          aria-hidden="true"
        >
          <div className="preloader__inner">
            <div className="preloader__brand">
              {'ATELIER'.split('').map((letter, index) => (
                <span className="preloader__letter" key={`${letter}-${index}`}>
                  <motion.span
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.08 + index * 0.045, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {letter}
                  </motion.span>
                </span>
              ))}
            </div>

            <div className="preloader__meta">
              <span>Maison — Est. 2014</span>
              <span className="preloader__count">{String(progress).padStart(3, '0')}</span>
            </div>

            <div className="preloader__bar">
              <span style={{ transform: `scaleX(${progress / 100})` }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
