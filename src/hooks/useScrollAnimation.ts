'use client'

import { useEffect, useRef } from 'react'

export function useScrollAnimation() {
  const scrollObserver = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }

    scrollObserver.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          ;(entry.target as HTMLElement).style.animation =
            'fadeIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards'
        }
      })
    }, observerOptions)

    const elements = document.querySelectorAll('.animate-on-scroll')
    elements.forEach((el) => {
      ;(el as HTMLElement).style.opacity = '0'
      scrollObserver.current?.observe(el)
    })

    return () => {
      scrollObserver.current?.disconnect()
    }
  }, [])
}
