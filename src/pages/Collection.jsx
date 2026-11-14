import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus, SlidersHorizontal } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ui/ProductCard'
import Reveal from '../components/ui/Reveal'
import SplitText from '../components/ui/SplitText'
import { allColours, IMAGES, products, sizeOrder } from '../data/products'
import useDocumentTitle from '../hooks/useDocumentTitle'

const copy = {
  men: {
    title: 'Menswear',
    eyebrow: 'Collection 01 — Menswear',
    intro:
      'Suiting with a softer edge. Wool from Huddersfield, leather from Tuscany and shirts cut to be worn open.',
    banner: IMAGES.categories.men,
    alt: 'Man in a beige tailored suit, photographed outdoors',
  },
  women: {
    title: 'Womenswear',
    eyebrow: 'Collection 02 — Womenswear',
    intro:
      'Tailoring, knitwear and evening pieces in a palette of ivory, camel and onyx. Made in small runs, finished by hand.',
    banner: IMAGES.categories.women,
    alt: 'Woman in a camel trench coat on a quiet street',
  },
  all: {
    title: 'Collections',
    eyebrow: 'The archive — Autumn / Winter 2026',
    intro:
      'Every piece in the collection, in one place. Twenty-two styles, four mills, one tailoring house outside Florence.',
    banner: IMAGES.aboutRail,
    alt: 'A rail of garments in muted green and ivory tones',
  },
}

const categoryOptions = [
  { id: 'all', label: 'All pieces' },
  { id: 'women', label: 'Womenswear' },
  { id: 'men', label: 'Menswear' },
  { id: 'outerwear', label: 'Outerwear' },
  { id: 'essentials', label: 'Essentials' },
  { id: 'accessories', label: 'Accessories' },
]

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'new', label: 'New arrivals' },
  { value: 'price-asc', label: 'Price — low to high' },
  { value: 'price-desc', label: 'Price — high to low' },
]

export default function Collection({ gender = null }) {
  const config = gender === 'men' ? copy.men : gender === 'women' ? copy.women : copy.all
  useDocumentTitle(config.title)

  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('category') || 'all'
  const [sizes, setSizes] = useState([])
  const [colours, setColours] = useState([])
  const [sort, setSort] = useState('featured')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const setCategory = (value) => {
    const next = new URLSearchParams(searchParams)
    if (value === 'all') next.delete('category')
    else next.set('category', value)
    setSearchParams(next, { replace: true })
  }

  const toggleSize = (size) =>
    setSizes((current) =>
      current.includes(size) ? current.filter((entry) => entry !== size) : [...current, size],
    )

  const toggleColour = (name) =>
    setColours((current) =>
      current.includes(name) ? current.filter((entry) => entry !== name) : [...current, name],
    )

  const clearAll = () => {
    setSizes([])
    setColours([])
    setSort('featured')
    setCategory('all')
  }

  const base = useMemo(
    () =>
      products.filter((product) => {
        if (gender && product.gender !== gender && product.gender !== 'unisex') return false
        return true
      }),
    [gender],
  )

  const filtered = useMemo(() => {
    const list = base.filter((product) => {
      const matchCategory = category === 'all' || product.category === category
      const matchSize = sizes.length === 0 || product.sizes.some((size) => sizes.includes(size))
      const matchColour =
        colours.length === 0 || product.colours.some((colour) => colours.includes(colour.name))
      return matchCategory && matchSize && matchColour
    })

    const sorted = [...list]
    if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price)
    else if (sort === 'new') {
      sorted.sort((a, b) => Number(b.isNew) - Number(a.isNew))
    } else {
      sorted.sort((a, b) => Number(b.featured) - Number(a.featured))
    }
    return sorted
  }, [base, category, sizes, colours, sort])

  const activeCount = sizes.length + colours.length + (category !== 'all' ? 1 : 0)
  const showWide = sort === 'featured' && activeCount === 0 && filtered.length > 2

  return (
    <div className="collection">
      <header className="collection__header container">
        <div className="collection__intro">
          <Reveal as="p" className="eyebrow eyebrow--row" y={10}>
            {config.eyebrow}
          </Reveal>
          <h1 className="collection__title h1">
            <SplitText text={config.title} />
          </h1>
        </div>
        <Reveal className="collection__aside" delay={0.1}>
          <p className="lede">{config.intro}</p>
          <p className="collection__count">
            {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
          </p>
        </Reveal>
      </header>

      <Reveal className="collection__banner" y={24}>
        <img src={config.banner} alt={config.alt} />
      </Reveal>

      <div className="collection__body container">
        <div className="filter-bar">
          <button
            type="button"
            className={`filter-toggle ${filtersOpen ? 'is-open' : ''}`}
            onClick={() => setFiltersOpen((open) => !open)}
            aria-expanded={filtersOpen}
          >
            <SlidersHorizontal size={15} strokeWidth={1.4} />
            Filter
            {activeCount > 0 && <span className="filter-toggle__count">{activeCount}</span>}
            <Plus size={14} strokeWidth={1.4} className="filter-toggle__plus" />
          </button>

          <div className="filter-bar__chips">
            {category !== 'all' && (
              <button type="button" className="chip" onClick={() => setCategory('all')}>
                {categoryOptions.find((option) => option.id === category)?.label}
                <span aria-hidden="true">×</span>
                <span className="sr-only">Remove filter</span>
              </button>
            )}
            {sizes.map((size) => (
              <button type="button" className="chip" key={size} onClick={() => toggleSize(size)}>
                Size {size}
                <span aria-hidden="true">×</span>
                <span className="sr-only">Remove filter</span>
              </button>
            ))}
            {colours.map((name) => (
              <button type="button" className="chip" key={name} onClick={() => toggleColour(name)}>
                {name}
                <span aria-hidden="true">×</span>
                <span className="sr-only">Remove filter</span>
              </button>
            ))}
            {activeCount > 0 && (
              <button type="button" className="filter-bar__clear" onClick={clearAll}>
                Clear all
              </button>
            )}
          </div>

          <div className="filter-sort">
            <label htmlFor="sort">Sort by</label>
            <select id="sort" value={sort} onChange={(event) => setSort(event.target.value)}>
              {sortOptions.map((option) => (
                <option value={option.value} key={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {filtersOpen && (
            <motion.div
              className="filter-panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="filter-panel__inner">
                <fieldset className="filter-group">
                  <legend>Category</legend>
                  <div className="filter-group__row">
                    {categoryOptions.map((option) => (
                      <button
                        type="button"
                        key={option.id}
                        className={`filter-option ${category === option.id ? 'is-active' : ''}`}
                        onClick={() => setCategory(option.id)}
                        aria-pressed={category === option.id}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="filter-group">
                  <legend>Size</legend>
                  <div className="filter-group__row">
                    {sizeOrder.map((size) => (
                      <button
                        type="button"
                        key={size}
                        className={`filter-option filter-option--size ${sizes.includes(size) ? 'is-active' : ''}`}
                        onClick={() => toggleSize(size)}
                        aria-pressed={sizes.includes(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="filter-group">
                  <legend>Colour</legend>
                  <div className="filter-group__row">
                    {allColours.map((colour) => (
                      <button
                        type="button"
                        key={colour.name}
                        className={`filter-colour ${colours.includes(colour.name) ? 'is-active' : ''}`}
                        onClick={() => toggleColour(colour.name)}
                        aria-pressed={colours.includes(colour.name)}
                      >
                        <span className="swatch" style={{ backgroundColor: colour.hex }} />
                        {colour.name}
                      </button>
                    ))}
                  </div>
                </fieldset>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {filtered.length === 0 ? (
          <div className="collection__empty">
            <p className="h3">No pieces match these filters.</p>
            <p>Try removing a size or colour, or browse the full collection.</p>
            <button type="button" className="btn btn--outline btn--sm" onClick={clearAll}>
              <span>Clear filters</span>
            </button>
          </div>
        ) : (
          <div className={`product-grid ${showWide ? 'product-grid--wide-first' : ''}`}>
            {filtered.map((product, index) => (
              <Reveal
                key={product.id}
                delay={(index % 4) * 0.05}
                y={26}
                className={showWide && index === 0 ? 'grid-span-2' : ''}
              >
                <ProductCard
                  product={product}
                  index={index}
                  variant={showWide && index === 0 ? 'wide' : 'default'}
                />
              </Reveal>
            ))}
          </div>
        )}

        <div className="collection__note">
          <p>
            All prices include VAT. Complimentary shipping over €250 and free returns within 30
            days. Sizing advice is available by appointment.
          </p>
        </div>
      </div>
    </div>
  )
}
