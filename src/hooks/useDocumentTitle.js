import { useEffect } from 'react'

const BASE = 'ATELIER'

export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — ${BASE}` : `${BASE} — Modern Tailoring & Essentials`
  }, [title])
}
