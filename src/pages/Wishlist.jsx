import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ui/ProductCard'
import Reveal from '../components/ui/Reveal'
import SplitText from '../components/ui/SplitText'
import { useStore } from '../context/StoreContext'
import useDocumentTitle from '../hooks/useDocumentTitle'

export default function Wishlist() {
  useDocumentTitle('Wishlist')
  const { wishlistProducts, moveToBag, toggleWishlist } = useStore()

  return (
    <div className="wishlist container">
      <header className="wishlist__header">
        <div>
          <Reveal as="p" className="eyebrow eyebrow--row" y={8}>
            Private selection
          </Reveal>
          <h1 className="h1 wishlist__title">
            <SplitText text="Wishlist" />
          </h1>
        </div>
        <Reveal className="wishlist__aside" delay={0.1}>
          <p className="lede">
            Pieces you are considering. Saved on this device, kept between visits.
          </p>
          <p className="collection__count">
            {wishlistProducts.length} {wishlistProducts.length === 1 ? 'piece' : 'pieces'} saved
          </p>
        </Reveal>
      </header>

      {wishlistProducts.length === 0 ? (
        <div className="wishlist__empty">
          <p className="h3">Nothing saved yet.</p>
          <p>
            Use the heart on any piece to keep it here while you decide. Your selection stays on
            this device.
          </p>
          <Link to="/collections" className="btn btn--sm">
            <span>
              Browse the collection
              <ArrowRight size={14} strokeWidth={1.5} />
            </span>
          </Link>
        </div>
      ) : (
        <div className="wishlist__grid">
          {wishlistProducts.map((product, index) => (
            <Reveal key={product.id} delay={index * 0.05} y={24}>
              <div className="wishlist__item">
                <ProductCard product={product} index={index} />
                <div className="wishlist__actions">
                  <button
                    type="button"
                    className="btn btn--outline btn--sm wishlist__move"
                    onClick={() => moveToBag(product.id)}
                  >
                    <span>Move to bag</span>
                  </button>
                  <button
                    type="button"
                    className="wishlist__remove"
                    onClick={() => toggleWishlist(product.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  )
}
