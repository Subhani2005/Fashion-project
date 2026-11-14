import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Heart, Menu, Search, ShoppingBag, X } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useStore } from '../../context/StoreContext'
import { navLinks, socials } from '../../data/site'

export default function Header() {
  const { cartCount, wishlist, openCart, openSearch } = useStore()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const onHome = location.pathname === '/'
  const transparent = onHome && !scrolled && !menuOpen

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!menuOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [menuOpen])

  return (
    <>
      <div className={`header-wrap ${transparent ? 'is-transparent' : ''} ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="announce">
          <div className="announce__inner">
            <span className="announce__side">Autumn / Winter 2026</span>
            <span className="announce__center">Complimentary shipping on orders over €250</span>
            <span className="announce__side announce__side--right">Client services — Mon–Fri, 9–18 CET</span>
          </div>
        </div>

        <header className="header">
          <div className="header__inner">
            <Link to="/" className="header__logo" aria-label="ATELIER — home">
              ATELIER
            </Link>

            <nav className="header__nav" aria-label="Primary">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => `header__link ${isActive ? 'is-active' : ''}`}
                  end={link.to === '/'}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="header__actions">
              <button type="button" className="header__icon" onClick={openSearch} aria-label="Search">
                <Search size={18} strokeWidth={1.3} />
              </button>
              <Link to="/wishlist" className="header__icon header__icon--wish" aria-label={`Wishlist, ${wishlist.length} items`}>
                <Heart size={18} strokeWidth={1.3} />
                {wishlist.length > 0 && <span className="header__count">{wishlist.length}</span>}
              </Link>
              <button
                type="button"
                className="header__icon header__icon--bag"
                onClick={openCart}
                aria-label={`Shopping bag, ${cartCount} items`}
              >
                <ShoppingBag size={18} strokeWidth={1.3} />
                {cartCount > 0 && <span className="header__count">{cartCount}</span>}
              </button>
              <button
                type="button"
                className="header__icon header__menu-btn"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={20} strokeWidth={1.4} />
              </button>
            </div>
          </div>
        </header>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="mobile-menu__top">
              <span className="mobile-menu__brand">ATELIER</span>
              <button type="button" className="icon-btn icon-btn--light" onClick={() => setMenuOpen(false)} aria-label="Close menu">
                <X size={20} strokeWidth={1.3} />
              </button>
            </div>

            <nav className="mobile-menu__nav" aria-label="Mobile">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.18 + index * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link to={link.to} className="mobile-menu__link">
                    <span className="mobile-menu__index">0{index + 1}</span>
                    {link.label}
                    <ArrowUpRight size={22} strokeWidth={1.1} />
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mobile-menu__foot">
              <div>
                <p className="mobile-menu__label">Client services</p>
                <a href="mailto:studio@atelier.example" className="mobile-menu__contact">
                  studio@atelier.example
                </a>
              </div>
              <div className="mobile-menu__socials">
                {socials.map((social) => (
                  <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
