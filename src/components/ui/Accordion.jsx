import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="accordion">
      {items.map((item, index) => {
        const open = openIndex === index
        return (
          <div className={`accordion__item ${open ? 'is-open' : ''}`} key={item.title}>
            <button
              type="button"
              className="accordion__trigger"
              onClick={() => setOpenIndex(open ? -1 : index)}
              aria-expanded={open}
            >
              <span>{item.title}</span>
              <Plus size={15} strokeWidth={1.2} className="accordion__icon" />
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  className="accordion__panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p>{item.content}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
