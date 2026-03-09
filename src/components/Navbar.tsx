import { useState, useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { Menu, X, Smartphone, Sun, Moon, BookOpen } from 'lucide-react'

const SECTION_ITEMS = [
  { label: 'Home', section: 'hero' },
  { label: 'Why Expo?', section: 'why-expo' },
  { label: 'React Primer', section: 'react-primer' },
  { label: 'Setup', section: 'setup' },
  { label: 'Concepts', section: 'concepts' },
  { label: 'Build', section: 'build' },
  { label: 'Resources', section: 'resources' },
]

function getInitialTheme(): 'dark' | 'light' {
  if (typeof window === 'undefined') return 'dark'
  const stored = localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [theme, setTheme] = useState<'dark' | 'light'>(getInitialTheme)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light')
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  const scrollToSection = (section: string) => {
    setMobileOpen(false)
    if (isHome) {
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/', { state: { scrollTo: section } })
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bg-soft/90 backdrop-blur-xl border-b border-border shadow-lg shadow-black/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={() => scrollToSection('hero')} className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-cyan flex items-center justify-center shadow-md shadow-accent/20 group-hover:shadow-lg group-hover:shadow-accent/30 transition-shadow">
            <Smartphone size={16} className="text-white" />
          </div>
          <span className="font-heading font-bold text-sm tracking-tight">
            <span className="text-text">Ultimate</span>
            <span className="text-accent ml-1">Expo</span>
            <span className="text-text ml-1">Guide</span>
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {SECTION_ITEMS.map((item) => (
            <button
              key={item.section}
              onClick={() => scrollToSection(item.section)}
              className="px-3 py-2 rounded-lg text-sm text-text-muted hover:text-text hover:bg-card transition-colors"
            >
              {item.label}
            </button>
          ))}
          <Link
            to="/hooks/useState"
            className="px-3 py-2 rounded-lg text-sm text-text-muted hover:text-text hover:bg-card transition-colors flex items-center gap-1.5"
          >
            <BookOpen size={14} />
            Deep Dives
          </Link>
          <button
            onClick={toggleTheme}
            className="ml-2 p-2.5 rounded-lg bg-card border border-border text-text-muted hover:text-text transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-lg bg-card border border-border text-text-muted hover:text-text transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2.5 rounded-lg bg-card border border-border text-text-muted hover:text-text transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-card border-b border-border px-4 pb-4 pt-2 mx-4 mb-2 rounded-xl shadow-xl shadow-black/30">
          {SECTION_ITEMS.map((item) => (
            <button
              key={item.section}
              onClick={() => scrollToSection(item.section)}
              className="block w-full text-left px-4 py-3 rounded-lg text-sm text-text-muted hover:text-text hover:bg-surface transition-colors"
            >
              {item.label}
            </button>
          ))}
          <Link
            to="/hooks/useState"
            onClick={() => setMobileOpen(false)}
            className="block px-4 py-3 rounded-lg text-sm text-text-muted hover:text-text hover:bg-surface transition-colors"
          >
            Deep Dives
          </Link>
        </div>
      )}
    </nav>
  )
}
