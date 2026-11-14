import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

/** Fade + rise on scroll, used for almost every block of content. */
export default function Reveal({
  children,
  className = '',
  delay = 0,
  y = 26,
  duration = 0.95,
  as = 'div',
  once = true,
  ...rest
}) {
  const reduce = useReducedMotion()
  const Tag = motion[as] || motion.div

  return (
    <Tag
      className={className}
      {...rest}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-10% 0px -6% 0px' }}
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </Tag>
  )
}

/** Image revealed with a vertical mask, plus an inner scale settle. */
export function ImageReveal({
  src,
  alt,
  className = '',
  imgClassName = '',
  priority = false,
  children,
}) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={`img-reveal ${className}`}
      initial={{ clipPath: reduce ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)' }}
      whileInView={{ clipPath: 'inset(0 0 0 0)' }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 1.2, ease: EASE }}
    >
      <motion.img
        src={src}
        alt={alt}
        className={imgClassName}
        loading={priority ? 'eager' : 'lazy'}
        initial={{ scale: reduce ? 1 : 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: EASE }}
      />
      {children}
    </motion.div>
  )
}

/** Slow vertical drift tied to scroll position. */
export function ParallaxImage({ src, alt, className = '', strength = 38, loading = 'lazy' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength])

  return (
    <div ref={ref} className={`parallax ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading={loading}
        style={{ y: reduce ? 0 : y }}
        transition={{ duration: 0.4 }}
      />
    </div>
  )
}
