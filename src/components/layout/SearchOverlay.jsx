import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Search, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useStore } from '../../context/StoreContext'
import { products } from '../../data/products'
import { formatPrice } from '../../lib/format'

const suggestions = ['Wool coat', 'Cashmere', 'Tailoring', 'Leather', 'Silk']

export default function SearchOverlay() {
  const { isSearchOpen, closeSearch } = useStore()
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (!isSearchOpen) {
      setQuery('')
      return
    }
    const timer = setTimeout(() => inputRef.current?.focus(), 260)
    return () => clearTimeout(timer)
  }, [isSearchOpen])

  const results = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return []
    return products
      .filter((product) =>
        [product.name, product.material, product.category, product.colourName, product.description]
          .join(' ')
          .toLowerCase()
          .includes(term),
      )
      .slice(0, 6)
  }, [query])

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          className="search"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.32 }}
          role="dialog"
          aria-modal="true"
          aria-label="Search"
        >
          <div className="search__inner">
            <div className="search__top">
              <span className="eyebrow">Search the atelier</span>
              <button type="button" className="icon-btn" onClick={closeSearch} aria-label="Close search">
                <X size={20} strokeWidth={1.2} />
              </button>
            </div>

            <form className="search__form" onSubmit={(event) => event.preventDefault()}>
              <Search size={22} strokeWidth={1.1} />
              <label className="sr-only" htmlFor="site-search">
                Search products
              </label>
              <input
                id="site-search"
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="What are you looking for?"
                autoComplete="off"
              />
              <button type="button" className="search__submit" onClick={closeSearch} aria-label="Close search">
                <ArrowRight size={22} strokeWidth={1.1} />
              </button>
            </form>

            {query.trim() === '' ? (
              <div className="search__suggest">
                <p className="search__label">Suggested</p>
                <div className="search__chips">
                  {suggestions.map((item) => (
                    <button key={item} type="button" onClick={() => setQuery(item)}>
                      {item}
                    </button>
                  ))}
                </div>

                <div className="search__shortcuts">
                  <Link to="/collections" onClick={closeSearch}>
                    <span>Collections</span>
                    <ArrowRight size={16} strokeWidth={1.2} />
                  </Link>
                  <Link to="/women" onClick={closeSearch}>
                    <span>Womenswear</span>
                    <ArrowRight size={16} strokeWidth={1.2} />
                  </Link>
                  <Link to="/men" onClick={closeSearch}>
                    <span>Menswear</span>
                    <ArrowRight size={16} strokeWidth={1.2} />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="search__results">
                <p className="search__label">
                  {results.length} {results.length === 1 ? 'piece' : 'pieces'} matching “{query}”
                </p>
                {results.length === 0 ? (
                  <p className="search__empty">
                    Nothing found. Try “coat”, “cashmere” or “leather”.
                  </p>
                ) : (
                  <ul className="search__grid">
                    {results.map((product) => (
                      <li key={product.id}>
                        <Link to={`/product/${product.id}`} onClick={closeSearch} className="search-result">
                          <img src={product.images[0]} alt="" aria-hidden="true" />
                          <div>
                            <p className="search-result__name">{product.name}</p>
                            <p className="search-result__meta">
                              {product.material} · {formatPrice(product.price)}
                            </p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
