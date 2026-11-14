import { useEffect, useState } from 'react'

/**
 * State that survives reloads through localStorage.
 * Falls back to the initial value if storage is unavailable or corrupt.
 */
export default function usePersistentState(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* storage can be full or blocked — the UI keeps working in memory */
    }
  }, [key, value])

  return [value, setValue]
}
