import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, Check, Heart, Minus, Plus } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import Accordion from '../components/ui/Accordion'
import ProductCard from '../components/ui/ProductCard'
import Reveal from '../components/ui/Reveal'
import { getProduct, products } from '../data/products'
import { useStore } from '../context/StoreContext'
import { formatPrice } from '../lib/format'
import useDocumentTitle from '../hooks/useDocumentTitle'
import NotFound from './NotFound'

function ZoomImage({ src, alt, index }) {
  const ref = useRef(null)
  const [zoomed, setZoomed] = useState(false)
  const [origin, setOrigin] = useState('50% 50%')

  const handleMove = (event) => {
    const rect = ref.current.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    setOrigin(`${x}% ${y}%`)
  }

  return (
    <figure
      ref={ref}
      className={`pdp-figure ${zoomed ? 'is-zoomed' : ''}`}
      onMouseEnter={() => setZoomed(true)}
      onMouseLeave={() => setZoomed(false)}
      onMouseMove={handleMove}
      data-cursor="zoom"
      data-cursor-label="Zoom"
    >
      <img src={src} alt={alt} style={{ transformOrigin: origin }} loading={index === 0 ? 'eager' : 'lazy'} />
      <span className="pdp-figure__index">0{index + 1}</span>
    </figure>
  )
}

export default function Product() {
  const { id } = useParams()
  const product = getProduct(id)
  const { addToCart, toggleWishlist, isWishlisted } = useStore()

  const [size, setSize] = useState(null)
  const [colour, setColour] = useState(product ? product.colours[0].name : '')
  const [qty, setQty] = useState(1)
  const [error, setError] = useState(false)
  const [added, setAdded] = useState(false)

  useDocumentTitle(product?.name)

  useEffect(() => {
    if (!product) return
    setSize(null)
    setColour(product.colours[0].name)
    setQty(1)
    setError(false)
    setAdded(false)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [product?.id])

  if (!product) return <NotFound />

  const saved = isWishlisted(product.id)

  const related = products
    .filter((entry) => entry.id !== product.id)
    .sort((a, b) => {
      const score = (entry) =>
        (entry.category === product.category ? 2 : 0) + (entry.gender === product.gender ? 1 : 0)
      return score(b) - score(a)
    })
    .slice(0, 3)

  const add = () => {
    if (!size) {
      setError(true)
      return
    }
    addToCart(product, { size, colour, qty })
    setAdded(true)
    setError(false)
    window.setTimeout(() => setAdded(false), 2400)
  }

  const categoryLink =
    product.gender === 'women' ? '/women' : product.gender === 'men' ? '/men' : '/collections'

  return (
    <div className="pdp container">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to={categoryLink}>{product.gender === 'men' ? 'Menswear' : 'Womenswear'}</Link>
        <span>/</span>
        <span aria-current="page">{product.name}</span>
      </nav>

      <div className="pdp__grid">
        <div className="pdp__gallery">
          {product.images.map((src, index) => (
            <ZoomImage
              key={`${src}-${index}`}
              src={src}
              alt={`${product.name} — view ${index + 1}`}
              index={index}
            />
          ))}
          <p className="pdp__gallery-note">Hover an image to inspect the fabric and finish.</p>
        </div>

        <div className="pdp__panel">
          <div className="pdp__sticky">
            <p className="eyebrow">{product.material}</p>
            <h1 className="pdp__name h2">{product.name}</h1>
            <p className="pdp__price">{formatPrice(product.price)}</p>
            <p className="pdp__desc">{product.description}</p>

            <div className="pdp__block">
              <div className="pdp__block-head">
                <span>Colour</span>
                <span className="pdp__block-value">{colour}</span>
              </div>
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
                    title={entry.name}
                  />
                ))}
              </div>
            </div>

            <div className="pdp__block">
              <div className="pdp__block-head">
                <span>Size</span>
                <Link to="/about#sizing" className="pdp__size-guide">
                  Size guide
                </Link>
              </div>
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
                    aria-pressed={size === entry}
                  >
                    {entry}
                  </button>
                ))}
              </div>
              <AnimatePresence>
                {error && (
                  <motion.p
                    className="pdp__error"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                  >
                    Please select a size to continue.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="pdp__buy">
              <div className="qty qty--large">
                <button
                  type="button"
                  onClick={() => setQty((value) => Math.max(1, value - 1))}
                  aria-label="Decrease quantity"
                >
                  <Minus size={13} />
                </button>
                <span aria-live="polite">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((value) => Math.min(10, value + 1))}
                  aria-label="Increase quantity"
                >
                  <Plus size={13} />
                </button>
              </div>

              <button type="button" className={`btn pdp__add ${added ? 'is-added' : ''}`} onClick={add}>
                <span>
                  {added ? <Check size={15} strokeWidth={2} /> : null}
                  {added ? 'Added to bag' : 'Add to bag'}
                </span>
              </button>

              <button
                type="button"
                className={`pdp__wish ${saved ? 'is-saved' : ''}`}
                onClick={() => toggleWishlist(product.id)}
                aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
                aria-pressed={saved}
              >
                <Heart size={18} strokeWidth={1.3} fill={saved ? 'currentColor' : 'none'} />
              </button>
            </div>

            <p className="pdp__ship">
              Complimentary shipping over €250 · Free returns within 30 days · Repairs by our
              atelier
            </p>

            <Accordion
              items={[
                { title: 'Fabric & details', content: product.fabric },
                {
                  title: 'Sizing & fit',
                  content: `Cut to a relaxed, true-to-size fit. The model is 178cm and wears a size S. For tailored pieces we recommend your usual size; for outerwear, size up if you intend to layer.`,
                },
                {
                  title: 'Shipping & returns',
                  content:
                    'Dispatched within one business day from Antwerp. Complimentary express shipping on orders over €250, €12 below. Returns are free within 30 days, unworn and with tags attached.',
                },
                { title: 'Care', content: product.care },
              ]}
            />

            <div className="pdp__meta">
              <span>Style {product.id.toUpperCase()}</span>
              <span>Made in Italy</span>
            </div>
          </div>
        </div>
      </div>

      <section className="pdp__related">
        <div className="pdp__related-head">
          <h2 className="h2">
            Worn <span className="italic">with.</span>
          </h2>
          <Link to={categoryLink} className="link-arrow">
            <ArrowLeft size={13} strokeWidth={1.5} />
            Back to {product.gender === 'men' ? 'menswear' : 'womenswear'}
          </Link>
        </div>
        <div className="product-grid product-grid--three">
          {related.map((entry, index) => (
            <Reveal key={entry.id} delay={index * 0.07} y={26}>
              <ProductCard product={entry} index={index} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}
