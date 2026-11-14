import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import usePersistentState from '../hooks/usePersistentState'
import { getProduct, products } from '../data/products'

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [cart, setCart] = usePersistentState('atelier.cart.v1', [])
  const [wishlist, setWishlist] = usePersistentState('atelier.wishlist.v1', [])
  const [isCartOpen, setCartOpen] = useState(false)
  const [isSearchOpen, setSearchOpen] = useState(false)
  const [quickViewId, setQuickViewId] = useState(null)

  /* Lock scroll while an overlay is open */
  const overlayOpen = isCartOpen || isSearchOpen || Boolean(quickViewId)

  useEffect(() => {
    const root = document.documentElement
    const body = document.body
    if (overlayOpen) {
      root.classList.add('is-locked')
      body.classList.add('is-locked')
    } else {
      root.classList.remove('is-locked')
      body.classList.remove('is-locked')
    }
    return () => {
      root.classList.remove('is-locked')
      body.classList.remove('is-locked')
    }
  }, [overlayOpen])

  useEffect(() => {
    if (!isCartOpen && !isSearchOpen && !quickViewId) return
    const onKey = (event) => {
      if (event.key !== 'Escape') return
      if (quickViewId) setQuickViewId(null)
      setCartOpen(false)
      setSearchOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isCartOpen, isSearchOpen, quickViewId])

  const addToCart = useCallback(
    (product, { size, colour, qty = 1 } = {}) => {
      if (!product) return
      const selectedSize = size || product.sizes[0]
      const selectedColour = colour || product.colours[0].name
      const key = `${product.id}__${selectedSize}__${selectedColour}`

      setCart((items) => {
        const existing = items.find((item) => item.key === key)
        if (existing) {
          return items.map((item) =>
            item.key === key ? { ...item, qty: Math.min(item.qty + qty, 10) } : item,
          )
        }
        return [
          ...items,
          {
            key,
            id: product.id,
            size: selectedSize,
            colour: selectedColour,
            qty: Math.min(qty, 10),
          },
        ]
      })
      setCartOpen(true)
    },
    [setCart],
  )

  const updateQty = useCallback(
    (key, delta) => {
      setCart((items) =>
        items
          .map((item) => {
            if (item.key !== key) return item
            const next = Math.min(item.qty + delta, 10)
            return { ...item, qty: next }
          })
          .filter((item) => item.qty > 0),
      )
    },
    [setCart],
  )

  const removeItem = useCallback(
    (key) => setCart((items) => items.filter((item) => item.key !== key)),
    [setCart],
  )

  const clearCart = useCallback(() => setCart([]), [setCart])

  const cartCount = useMemo(() => cart.reduce((total, item) => total + item.qty, 0), [cart])

  const subtotal = useMemo(
    () =>
      cart.reduce((total, item) => {
        const product = getProduct(item.id)
        return product ? total + product.price * item.qty : total
      }, 0),
    [cart],
  )

  const cartDetailed = useMemo(
    () =>
      cart
        .map((item) => ({ ...item, product: getProduct(item.id) }))
        .filter((item) => Boolean(item.product)),
    [cart],
  )

  const toggleWishlist = useCallback(
    (id) => {
      setWishlist((ids) => (ids.includes(id) ? ids.filter((entry) => entry !== id) : [...ids, id]))
    },
    [setWishlist],
  )

  const isWishlisted = useCallback((id) => wishlist.includes(id), [wishlist])

  const moveToBag = useCallback(
    (id) => {
      const product = getProduct(id)
      if (!product) return
      addToCart(product, { size: product.sizes[0], colour: product.colours[0].name, qty: 1 })
      setWishlist((ids) => ids.filter((entry) => entry !== id))
    },
    [addToCart, setWishlist],
  )

  const wishlistProducts = useMemo(
    () => wishlist.map((id) => getProduct(id)).filter(Boolean),
    [wishlist],
  )

  const openQuickView = useCallback((id) => setQuickViewId(id), [])
  const closeQuickView = useCallback(() => setQuickViewId(null), [])

  const value = useMemo(
    () => ({
      products,
      cart,
      cartDetailed,
      cartCount,
      subtotal,
      addToCart,
      updateQty,
      removeItem,
      clearCart,
      wishlist,
      wishlistProducts,
      toggleWishlist,
      isWishlisted,
      moveToBag,
      isCartOpen,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      isSearchOpen,
      openSearch: () => setSearchOpen(true),
      closeSearch: () => setSearchOpen(false),
      quickViewId,
      openQuickView,
      closeQuickView,
    }),
    [
      cart,
      cartDetailed,
      cartCount,
      subtotal,
      addToCart,
      updateQty,
      removeItem,
      clearCart,
      wishlist,
      wishlistProducts,
      toggleWishlist,
      isWishlisted,
      moveToBag,
      isCartOpen,
      isSearchOpen,
      quickViewId,
      openQuickView,
      closeQuickView,
    ],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) throw new Error('useStore must be used inside a StoreProvider')
  return context
}
