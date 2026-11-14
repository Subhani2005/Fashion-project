import { motion, useReducedMotion } from 'framer-motion'

/**
 * Editorial word-by-word reveal. Words are masked by the parent
 * so they rise from beneath the baseline rather than fading in.
 */
export default function SplitText({
  text,
  as: Tag = 'span',
  className = '',
  delay = 0,
  stagger = 0.055,
  duration = 1,
  once = true,
  ...rest
}) {
  const reduce = useReducedMotion()
  const words = text.split(' ')

  return (
    <Tag className={className} aria-label={text} {...rest}>
      {words.map((word, index) => (
        <span className="split" key={`${word}-${index}`} aria-hidden="true">
          <motion.span
            initial={{ y: reduce ? 0 : '112%', opacity: reduce ? 0 : 1 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once, margin: '-8% 0px' }}
            transition={{
              duration,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + index * stagger,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
