import { useState } from 'react'
import { ArrowLeft, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import Reveal from '../components/ui/Reveal'
import { useStore } from '../context/StoreContext'
import { formatPrice } from '../lib/format'
import useDocumentTitle from '../hooks/useDocumentTitle'

const emptyForm = {
  email: '',
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  postcode: '',
  country: 'Belgium',
  card: '',
  expiry: '',
  cvc: '',
}

export default function Checkout() {
  useDocumentTitle('Checkout')
  const { cartDetailed, subtotal, cartCount, clearCart, updateQty, removeItem } = useStore()
  const [form, setForm] = useState(emptyForm)
  const [placed, setPlaced] = useState(null)

  const update = (field) => (event) => setForm({ ...form, [field]: event.target.value })

  const shipping = subtotal > 0 && subtotal < 250 ? 12 : 0
  const total = subtotal + shipping

  const submit = (event) => {
    event.preventDefault()
    const reference = `ATL-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
    setPlaced({ reference, total, items: cartCount })
    clearCart()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (placed) {
    return (
      <div className="checkout checkout--done container">
        <div className="checkout__done">
          <span className="checkout__done-icon">
            <Check size={26} strokeWidth={1.2} />
          </span>
          <p className="eyebrow">Order confirmed</p>
          <h1 className="h1">Thank you, {placed.reference}.</h1>
          <p className="lede">
            A confirmation has been sent to your email. Your {placed.items}{' '}
            {placed.items === 1 ? 'piece' : 'pieces'} will be dispatched from Antwerp within one
            business day.
          </p>
          <p className="checkout__total-line">Total paid — {formatPrice(placed.total)}</p>
          <Link to="/collections" className="btn btn--sm">
            <span>Continue shopping</span>
          </Link>
          <p className="checkout__demo">
            This is a demonstration checkout. No payment was processed and no order was created.
          </p>
        </div>
      </div>
    )
  }

  if (cartDetailed.length === 0) {
    return (
      <div className="checkout checkout--empty container">
        <p className="eyebrow">Checkout</p>
        <h1 className="h1">Your bag is empty.</h1>
        <p className="lede">
          Add a piece to continue. Everything you save stays in your bag between visits.
        </p>
        <Link to="/collections" className="btn btn--sm">
          <span>Browse the collection</span>
        </Link>
      </div>
    )
  }

  return (
    <div className="checkout container">
      <header className="checkout__header">
        <Link to="/collections" className="link-arrow checkout__back">
          <ArrowLeft size={13} strokeWidth={1.5} />
          Continue shopping
        </Link>
        <h1 className="checkout__title h2">Checkout</h1>
        <p className="meta">Step 1 of 2 — Delivery & payment</p>
      </header>

      <div className="checkout__grid">
        <form className="checkout__form" onSubmit={submit}>
          <Reveal className="checkout__section" y={20}>
            <h2 className="checkout__section-title">Contact</h2>
            <label className="field">
              <span>Email address</span>
              <input
                type="email"
                required
                value={form.email}
                onChange={update('email')}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </label>
          </Reveal>

          <Reveal className="checkout__section" y={20}>
            <h2 className="checkout__section-title">Delivery address</h2>
            <div className="checkout__row">
              <label className="field">
                <span>First name</span>
                <input required value={form.firstName} onChange={update('firstName')} autoComplete="given-name" />
              </label>
              <label className="field">
                <span>Last name</span>
                <input required value={form.lastName} onChange={update('lastName')} autoComplete="family-name" />
              </label>
            </div>
            <label className="field">
              <span>Address</span>
              <input required value={form.address} onChange={update('address')} autoComplete="street-address" />
            </label>
            <div className="checkout__row">
              <label className="field">
                <span>City</span>
                <input required value={form.city} onChange={update('city')} autoComplete="address-level2" />
              </label>
              <label className="field">
                <span>Postal code</span>
                <input required value={form.postcode} onChange={update('postcode')} autoComplete="postal-code" />
              </label>
            </div>
            <label className="field">
              <span>Country</span>
              <select value={form.country} onChange={update('country')}>
                {['Belgium', 'Netherlands', 'France', 'Germany', 'United Kingdom', 'Italy', 'Spain'].map(
                  (country) => (
                    <option key={country}>{country}</option>
                  ),
                )}
              </select>
            </label>
          </Reveal>

          <Reveal className="checkout__section" y={20}>
            <h2 className="checkout__section-title">Payment</h2>
            <label className="field">
              <span>Card number</span>
              <input
                required
                inputMode="numeric"
                value={form.card}
                onChange={update('card')}
                placeholder="4242 4242 4242 4242"
                autoComplete="cc-number"
              />
            </label>
            <div className="checkout__row">
              <label className="field">
                <span>Expiry</span>
                <input
                  required
                  value={form.expiry}
                  onChange={update('expiry')}
                  placeholder="MM / YY"
                  autoComplete="cc-exp"
                />
              </label>
              <label className="field">
                <span>Security code</span>
                <input
                  required
                  value={form.cvc}
                  onChange={update('cvc')}
                  placeholder="CVC"
                  autoComplete="cc-csc"
                />
              </label>
            </div>
            <p className="checkout__notice">
              Demonstration checkout — no payment details are sent anywhere or stored. Use any
              values to preview the flow.
            </p>
          </Reveal>

          <button type="submit" className="btn btn--block checkout__submit">
            <span>Place order — {formatPrice(total)}</span>
          </button>
        </form>

        <aside className="checkout__summary">
          <h2 className="checkout__section-title">
            Your order <span>({cartCount})</span>
          </h2>

          <ul className="checkout__items">
            {cartDetailed.map((item) => (
              <li className="checkout__item" key={item.key}>
                <img src={item.product.images[0]} alt={item.product.name} />
                <div className="checkout__item-body">
                  <div className="checkout__item-head">
                    <p>{item.product.name}</p>
                    <button
                      type="button"
                      onClick={() => removeItem(item.key)}
                      aria-label={`Remove ${item.product.name}`}
                    >
                      ×
                    </button>
                  </div>
                  <p className="checkout__item-meta">
                    {item.colour} / {item.size}
                  </p>
                  <div className="checkout__item-foot">
                    <div className="qty">
                      <button
                        type="button"
                        onClick={() => updateQty(item.key, -1)}
                        aria-label={`Decrease quantity of ${item.product.name}`}
                      >
                        −
                      </button>
                      <span>{item.qty}</span>
                      <button
                        type="button"
                        onClick={() => updateQty(item.key, 1)}
                        aria-label={`Increase quantity of ${item.product.name}`}
                      >
                        +
                      </button>
                    </div>
                    <span>{formatPrice(item.product.price * item.qty)}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="checkout__totals">
            <div>
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div>
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Complimentary' : formatPrice(shipping)}</span>
            </div>
            <div className="checkout__grand">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          <p className="checkout__summary-note">
            Prices include VAT. Duties calculated for non-EU destinations. Returns accepted within
            30 days.
          </p>
        </aside>
      </div>
    </div>
  )
}
