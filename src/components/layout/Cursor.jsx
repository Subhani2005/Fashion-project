import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [active, setActive] = useState(false)
  const [label, setLabel] = useState('')
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const smoothX = useSpring(x, { stiffness: 520, damping: 42, mass: 0.35 })
  const smoothY = useSpring(y, { stiffness: 520, damping: 42, mass: 0.35 })

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!finePointer || reduced) return undefined

    setEnabled(true)
    document.documentElement.classList.add('has-custom-cursor')

    const onMove = (event) => {
      x.set(event.clientX)
      y.set(event.clientY)
    }

    const onOver = (event) => {
      const target = event.target.closest('[data-cursor]')
      if (target) {
        setActive(true)
        setLabel(target.getAttribute('data-cursor-label') || '')
      } else {
        setActive(false)
        setLabel('')
      }
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <motion.div className="cursor" style={{ x: smoothX, y: smoothY }} aria-hidden="true">
      <motion.span
        className="cursor__ring"
        animate={{ scale: active ? 1 : 0.14, opacity: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.span
        className="cursor__label"
        animate={{ opacity: active && label ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      >
        {label}
      </motion.span>
    </motion.div>
  )
}
