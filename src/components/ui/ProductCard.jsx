import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useStore } from '../../context/StoreContext'
import { formatPrice } from '../../lib/format'

export default function ProductCard({ product, variant = 'default', index = 0 }) {
  const { toggleWishlist, isWishlisted, openQuickView } = useStore()
  const saved = isWishlisted(product.id)

  return (
    <article className={`product-card ${variant === 'wide' ? 'product-card--wide' : ''}`}>
      <div className="product-card__media">
        <Link
          to={`/product/${product.id}`}
          className="product-card__media-link"
          aria-label={`View ${product.name}`}
        >
          <img
            className="product-card__img"
            src={product.images[0]}
            alt={`${product.name} in ${product.colourName}`}
            loading={index < 4 ? 'eager' : 'lazy'}
          />
          {product.images[1] && (
            <img
              className="product-card__img product-card__img--alt"
              src={product.images[1]}
              alt=""
              aria-hidden="true"
              loading="lazy"
            />
          )}
          {product.isNew && <span className="product-card__badge">New</span>}
        </Link>

        <button
          type="button"
          className={`product-card__wish ${saved ? 'is-saved' : ''}`}
          onClick={() => toggleWishlist(product.id)}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          aria-pressed={saved}
        >
          <Heart size={16} strokeWidth={1.3} fill={saved ? 'currentColor' : 'none'} />
        </button>

        <button
          type="button"
          className="product-card__quick"
          onClick={() => openQuickView(product.id)}
          data-cursor="view"
          data-cursor-label="Open"
        >
          Quick view
        </button>
      </div>

      <div className="product-card__info">
        <div className="product-card__line">
          <Link to={`/product/${product.id}`} className="product-card__name">
            {product.name}
          </Link>
          <span className="product-card__price">{formatPrice(product.price)}</span>
        </div>
        <p className="product-card__material">{product.material}</p>
        <div className="product-card__colours">
          {product.colours.map((colour) => (
            <span
              key={colour.name}
              className="swatch swatch--sm"
              style={{ backgroundColor: colour.hex }}
              title={colour.name}
            />
          ))}
          <span className="product-card__colour-label">{product.colours.length} colours</span>
        </div>
      </div>
    </article>
  )
}
