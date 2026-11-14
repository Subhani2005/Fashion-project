import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useStore } from '../../context/StoreContext'
import { getProduct } from '../../data/products'
import { formatPrice } from '../../lib/format'

function QuickViewContent({ product }) {
  const { addToCart, toggleWishlist, isWishlisted, closeQuickView } = useStore()
  const [size, setSize] = useState(product.sizes[0])
  const [colour, setColour] = useState(product.colours[0].name)
  const [error, setError] = useState(false)
  const saved = isWishlisted(product.id)

  const add = () => {
    if (!size) {
      setError(true)
      return
    }
    addToCart(product, { size, colour, qty: 1 })
    closeQuickView()
  }

  return (
    <div className="quickview__body">
      <div className="quickview__media">
        <img src={product.images[0]} alt={`${product.name} in ${product.colourName}`} />
      </div>
      <div className="quickview__content">
        <p className="eyebrow">{product.material}</p>
        <h2 className="h3 quickview__title">{product.name}</h2>
        <p className="quickview__price">{formatPrice(product.price)}</p>
        <p className="quickview__desc">{product.description}</p>

        <div className="quickview__group">
          <span className="quickview__label">
            Colour <em>{colour}</em>
          </span>
          <div className="swatches">
            {product.colours.map((entry) => (
              <button
                key={entry.name}
                type="button"
                className={`swatch ${colour === entry.name ? 'is-active' : ''}`}
                style={{ backgroundColor: entry.hex }}
                onClick={() => setColour(entry.name)}
                aria-label={entry.name}
                aria-pressed={colour === entry.name}
              />
            ))}
          </div>
        </div>

        <div className="quickview__group">
          <span className="quickview__label">
            Size <em>{size}</em>
          </span>
          <div className={`size-row ${error ? 'has-error' : ''}`}>
            {product.sizes.map((entry) => (
              <button
                key={entry}
                type="button"
                className={`size-btn ${size === entry ? 'is-active' : ''}`}
                onClick={() => {
                  setSize(entry)
                  setError(false)
                }}
              >
                {entry}
              </button>
            ))}
          </div>
        </div>

        <div className="quickview__actions">
          <button type="button" className="btn btn--block btn--sm" onClick={add}>
            <span>Add to bag</span>
          </button>
          <button
            type="button"
            className={`quickview__save ${saved ? 'is-saved' : ''}`}
            onClick={() => toggleWishlist(product.id)}
            aria-pressed={saved}
          >
            {saved ? 'Saved' : 'Save'}
          </button>
        </div>

        <Link to={`/product/${product.id}`} className="link-arrow quickview__link" onClick={closeQuickView}>
          Full details
        </Link>
      </div>
    </div>
  )
}

export default function QuickView() {
  const { quickViewId, closeQuickView } = useStore()
  const product = getProduct(quickViewId)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <AnimatePresence>
      {quickViewId && product && (
        <motion.div
          className="quickview"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${product.name} quick view`}
        >
          <button
            type="button"
            className="quickview__scrim"
            onClick={closeQuickView}
            aria-label="Close quick view"
          />
          <motion.div
            className="quickview__panel"
            initial={{ y: mounted ? 40 : 0, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <button type="button" className="quickview__close" onClick={closeQuickView} aria-label="Close">
              <X size={18} strokeWidth={1.2} />
            </button>
            <QuickViewContent product={product} key={product.id} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
