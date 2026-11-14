import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

export default function Newsletter({ variant = 'light' }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')

  const submit = (event) => {
    event.preventDefault()
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())
    if (!valid) {
      setStatus('error')
      return
    }
    setStatus('done')
    setEmail('')
  }

  return (
    <form className={`newsletter newsletter--${variant}`} onSubmit={submit} noValidate>
      <label className="sr-only" htmlFor="newsletter-email">
        Email address
      </label>
      <div className={`newsletter__field ${status === 'error' ? 'has-error' : ''}`}>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          placeholder="Your email address"
          onChange={(event) => {
            setEmail(event.target.value)
            if (status !== 'idle') setStatus('idle')
          }}
          aria-describedby="newsletter-status"
        />
        <button type="submit" className="newsletter__submit" aria-label="Subscribe">
          <span>Subscribe</span>
          <ArrowRight size={15} strokeWidth={1.4} />
        </button>
      </div>
      <p id="newsletter-status" className="newsletter__status" role="status">
        {status === 'error' && 'Please enter a valid email address.'}
        {status === 'done' && 'Thank you — welcome to the atelier.'}
        {status === 'idle' && 'By subscribing you agree to our privacy policy. Unsubscribe at any time.'}
      </p>
    </form>
  )
}
