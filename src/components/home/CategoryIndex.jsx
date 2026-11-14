import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { categories } from '../../data/products'
import Reveal from '../ui/Reveal'

export default function CategoryIndex() {
  const [active, setActive] = useState(0)
  const current = categories[active]

  return (
    <section className="section categories">
      <div className="container">
        <div className="categories__head">
          <Reveal as="p" className="eyebrow eyebrow--row" y={10}>
            (03) — Shop by category
          </Reveal>
          <h2 className="h2 categories__title">
            Five ways <span className="italic">in.</span>
          </h2>
        </div>

        <div className="categories__inner">
          <ul className="categories__list">
            {categories.map((category, index) => (
              <li key={category.id}>
                <Link
                  to={category.to}
                  className={`category-row ${active === index ? 'is-active' : ''}`}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                >
                  <img className="category-row__thumb" src={category.image} alt="" aria-hidden="true" loading="lazy" />
                  <span className="category-row__index">0{index + 1}</span>
                  <span className="category-row__label">{category.label}</span>
                  <span className="category-row__note">{category.note}</span>
                  <ArrowUpRight size={19} strokeWidth={1.2} className="category-row__icon" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="categories__preview" data-cursor="view" data-cursor-label="Shop">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.img
                key={current.id}
                src={current.image}
                alt={current.label}
                loading="lazy"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>
            <div className="categories__preview-meta">
              <span>{current.short}</span>
              <span>0{active + 1} / 05</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
