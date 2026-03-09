import { useEffect, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft, ChevronRight } from 'lucide-react'

interface PageShellProps {
  title: string
  subtitle?: string
  gradient: string
  badge: string
  breadcrumbs?: { label: string; to?: string }[]
  sidebar?: ReactNode
  children: ReactNode
}

export function PageShell({ title, subtitle, gradient, badge, breadcrumbs, sidebar, children }: PageShellProps) {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-text-muted mb-8">
          <Link to="/" className="hover:text-accent transition-colors flex items-center gap-1.5">
            <ArrowLeft size={14} />
            Home
          </Link>
          {breadcrumbs?.map((crumb) => (
            <span key={crumb.label} className="flex items-center gap-2">
              <ChevronRight size={12} className="text-text-muted/40" />
              {crumb.to ? (
                <Link to={crumb.to} className="hover:text-accent transition-colors">{crumb.label}</Link>
              ) : (
                <span className="text-text">{crumb.label}</span>
              )}
            </span>
          ))}
        </div>

        {/* Header */}
        <div className="mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-card border border-border text-accent text-xs font-mono mb-5">
            {badge}
          </span>
          <h1 className={`text-4xl sm:text-5xl font-heading font-bold tracking-tight bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-4`}>
            {title}
          </h1>
          {subtitle && (
            <p className="text-text-muted text-lg max-w-3xl leading-relaxed">{subtitle}</p>
          )}
        </div>

        {/* Content */}
        {sidebar ? (
          <div className="grid lg:grid-cols-4 gap-10">
            <div className="lg:col-span-3 min-w-0">{children}</div>
            <aside className="hidden lg:block">{sidebar}</aside>
          </div>
        ) : (
          <div className="max-w-4xl">{children}</div>
        )}
      </div>
    </div>
  )
}
