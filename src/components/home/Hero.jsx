import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { IMAGES } from '../../data/products'
import SplitText from '../ui/SplitText'

export default function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 70])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section className="hero" ref={ref}>
      <motion.div
        className="hero__media"
        initial={{ scale: reduce ? 1 : 1.14 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        <motion.img
          src={IMAGES.hero}
          alt="Model in a camel wool trench coat beneath a stone archway"
          style={{ y: reduce ? 0 : imageY }}
        />
      </motion.div>
      <div className="hero__scrim" aria-hidden="true" />

      <motion.div className="hero__content" style={{ y: reduce ? 0 : contentY, opacity: reduce ? 1 : contentOpacity }}>
        <div className="hero__inner">
          <motion.div
            className="hero__meta"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="hero__season">New Season</span>
            <span className="hero__meta-text">Autumn / Winter 2026 — Volume I</span>
          </motion.div>

          <h1 className="hero__title">
            <SplitText text="STYLE IS A" delay={0.62} stagger={0.075} duration={1.15} />
            <span className="hero__title-line">
              <SplitText text="WAY OF LIFE." delay={0.86} stagger={0.075} duration={1.15} />
            </span>
          </h1>

          <div className="hero__foot">
            <motion.div
              className="hero__cta"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link to="/collections" className="btn btn--light">
                <span>
                  Shop the collection
                  <ArrowRight size={15} strokeWidth={1.5} />
                </span>
              </Link>
              <Link to="/about" className="hero__secondary">
                The campaign
              </Link>
            </motion.div>

            <motion.div
              className="hero__note"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <p>
                A study in restraint. Italian wool, sandwashed silk and hand-finished leather — cut
                for the way you actually live.
              </p>
              <span className="hero__scroll">
                <ArrowDown size={13} strokeWidth={1.4} />
                Scroll to explore
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="hero__edge" aria-hidden="true">
        <span>Antwerp — 51.2194° N</span>
      </div>
    </section>
  )
}
