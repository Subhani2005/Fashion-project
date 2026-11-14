import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Preloader from './components/layout/Preloader'
import Cursor from './components/layout/Cursor'
import CartDrawer from './components/layout/CartDrawer'
import SearchOverlay from './components/layout/SearchOverlay'
import PageTransition from './components/layout/PageTransition'
import QuickView from './components/ui/QuickView'
import Home from './pages/Home'
import Collection from './pages/Collection'
import Product from './pages/Product'
import Wishlist from './pages/Wishlist'
import Checkout from './pages/Checkout'
import About from './pages/About'
import NotFound from './pages/NotFound'

function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}

export default function App() {
  const location = useLocation()

  return (
    <>
      <Preloader />
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <Header />
      <ScrollManager />

      <main id="main">
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />
            <Route
              path="/women"
              element={
                <PageTransition>
                  <Collection gender="women" />
                </PageTransition>
              }
            />
            <Route
              path="/men"
              element={
                <PageTransition>
                  <Collection gender="men" />
                </PageTransition>
              }
            />
            <Route
              path="/collections"
              element={
                <PageTransition>
                  <Collection />
                </PageTransition>
              }
            />
            <Route
              path="/product/:id"
              element={
                <PageTransition>
                  <Product />
                </PageTransition>
              }
            />
            <Route
              path="/wishlist"
              element={
                <PageTransition>
                  <Wishlist />
                </PageTransition>
              }
            />
            <Route
              path="/checkout"
              element={
                <PageTransition>
                  <Checkout />
                </PageTransition>
              }
            />
            <Route
              path="/about"
              element={
                <PageTransition>
                  <About />
                </PageTransition>
              }
            />
            <Route
              path="*"
              element={
                <PageTransition>
                  <NotFound />
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
      <CartDrawer />
      <SearchOverlay />
      <QuickView />
    </>
  )
}
