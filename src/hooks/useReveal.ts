import { useEffect, useRef, useState } from 'react'

export function useReveal<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShown(true)
        obs.disconnect()
      }
    }, { threshold: 0.18, ...options })

    obs.observe(el)
    return () => obs.disconnect()
  }, [options])

  return { ref, shown }
}
