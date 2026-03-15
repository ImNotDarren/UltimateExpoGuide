import { useEffect, useState, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowUp } from 'lucide-react'
import { Hero } from '../sections/Hero'
import { WhyExpo } from '../sections/WhyExpo'
import { ReactPrimer } from '../sections/ReactPrimer'
import { HowItWorks } from '../sections/HowItWorks'
import { Setup } from '../sections/Setup'
import { Concepts } from '../sections/Concepts'
import { Lifecycle } from '../sections/Lifecycle'
import { Build } from '../sections/Build'
import { Resources } from '../sections/Resources'

export function HomePage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const scrollTo = (location.state as { scrollTo?: string })?.scrollTo
    if (scrollTo) {
      navigate(location.pathname, { replace: true, state: {} })
      const tryScroll = (attempts: number) => {
        const el = document.getElementById(scrollTo)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        } else if (attempts < 10) {
          requestAnimationFrame(() => tryScroll(attempts + 1))
        }
      }
      requestAnimationFrame(() => tryScroll(0))
    }
  }, [location.state, location.pathname, navigate])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <>
      <Hero />
      <WhyExpo />
      <ReactPrimer />
      <HowItWorks />
      <Setup />
      <Concepts />
      <Lifecycle />
      <Build />
      <Resources />

      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-40 p-3 rounded-full bg-card border border-border shadow-lg shadow-black/20 text-text-muted hover:text-accent hover:border-accent/40 transition-all duration-300 ${
          showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <ArrowUp size={20} />
      </button>
    </>
  )
}
