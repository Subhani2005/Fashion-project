import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import useDocumentTitle from '../hooks/useDocumentTitle'

export default function NotFound() {
  useDocumentTitle('Page not found')

  return (
    <div className="notfound container">
      <p className="eyebrow eyebrow--row">Error 404</p>
      <p className="notfound__code">404</p>
      <h1 className="h1">This page has been archived.</h1>
      <p className="lede">
        The piece or page you were looking for is no longer here. The current collection is a good
        place to begin again.
      </p>
      <div className="notfound__actions">
        <Link to="/" className="btn btn--sm">
          <span>Return home</span>
        </Link>
        <Link to="/collections" className="link-arrow">
          <ArrowLeft size={13} strokeWidth={1.5} />
          View collections
        </Link>
      </div>
    </div>
  )
}
