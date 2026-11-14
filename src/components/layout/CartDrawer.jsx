import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, ShoppingBag, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useStore } from '../../context/StoreContext'
import { formatPrice, SHIPPING_THRESHOLD } from '../../lib/format'

export default function CartDrawer() {
  const { isCartOpen, closeCart, cartDetailed, cartCount, subtotal, updateQty, removeItem } =
    useStore()

  const remaining = Math.max(0, SHIPPING_THRESHOLD - subtotal)
  const progress = Math.min(100, (subtotal / SHIPPING_THRESHOLD) * 100)

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            className="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={closeCart}
          />
          <motion.aside
            className="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping bag"
          >
            <div className="drawer__head">
              <h2 className="drawer__title">
                Shopping bag <span>({cartCount})</span>
              </h2>
              <button type="button" className="icon-btn" onClick={closeCart} aria-label="Close shopping bag">
                <X size={18} strokeWidth={1.2} />
              </button>
            </div>

            {cartDetailed.length === 0 ? (
              <div className="drawer__empty">
                <ShoppingBag size={30} strokeWidth={1} />
                <p className="h3">Your bag is empty</p>
                <p className="drawer__empty-copy">
                  Pieces you add will be held here. Begin with the new season.
                </p>
                <Link to="/women" className="btn btn--sm" onClick={closeCart}>
                  <span>Shop womenswear</span>
                </Link>
              </div>
            ) : (
              <>
                <div className="drawer__shipping">
                  <p>
                    {remaining > 0
                      ? `${formatPrice(remaining)} away from complimentary shipping`
                      : 'Complimentary shipping unlocked'}
                  </p>
                  <div className="drawer__bar">
                    <span style={{ width: `${progress}%` }} />
                  </div>
                </div>

                <div className="drawer__items">
                  {cartDetailed.map((item) => (
                    <motion.article
                      className="drawer-item"
                      key={item.key}
                      layout
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35 }}
                    >
                      <Link to={`/product/${item.product.id}`} onClick={closeCart} className="drawer-item__media">
                        <img src={item.product.images[0]} alt={item.product.name} />
                      </Link>

                      <div className="drawer-item__body">
                        <div className="drawer-item__head">
                          <div>
                            <Link
                              to={`/product/${item.product.id}`}
                              className="drawer-item__name"
                              onClick={closeCart}
                            >
                              {item.product.name}
                            </Link>
                            <p className="drawer-item__variant">
                              {item.colour} / {item.size}
                            </p>
                          </div>
                          <button
                            type="button"
                            className="drawer-item__remove"
                            onClick={() => removeItem(item.key)}
                            aria-label={`Remove ${item.product.name}`}
                          >
                            <X size={14} strokeWidth={1.2} />
                          </button>
                        </div>

                        <div className="drawer-item__foot">
                          <div className="qty">
                            <button
                              type="button"
                              onClick={() => updateQty(item.key, -1)}
                              aria-label={`Decrease quantity of ${item.product.name}`}
                            >
                              <Minus size={12} />
                            </button>
                            <span aria-live="polite">{item.qty}</span>
                            <button
                              type="button"
                              onClick={() => updateQty(item.key, 1)}
                              aria-label={`Increase quantity of ${item.product.name}`}
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <p className="drawer-item__price">
                            {formatPrice(item.product.price * item.qty)}
                          </p>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>

                <div className="drawer__foot">
                  <div className="drawer__subtotal">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <p className="drawer__note">Taxes and duties calculated at checkout.</p>
                  <Link to="/checkout" className="btn btn--block" onClick={closeCart}>
                    <span>Checkout</span>
                  </Link>
                  <button type="button" className="drawer__continue" onClick={closeCart}>
                    Continue shopping
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
