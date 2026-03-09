import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Hero } from '../sections/Hero'
import { WhyExpo } from '../sections/WhyExpo'
import { ReactPrimer } from '../sections/ReactPrimer'
import { HowItWorks } from '../sections/HowItWorks'
import { Setup } from '../sections/Setup'
import { Concepts } from '../sections/Concepts'
import { Build } from '../sections/Build'
import { Resources } from '../sections/Resources'

export function HomePage() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const scrollTo = (location.state as { scrollTo?: string })?.scrollTo
    if (scrollTo) {
      setTimeout(() => {
        document.getElementById(scrollTo)?.scrollIntoView({ behavior: 'smooth' })
      }, 50)
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location.state, location.pathname, navigate])

  return (
    <>
      <Hero />
      <WhyExpo />
      <ReactPrimer />
      <HowItWorks />
      <Setup />
      <Concepts />
      <Build />
      <Resources />
    </>
  )
}
