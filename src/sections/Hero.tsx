import { ArrowDown, Sparkles, Zap, Layers } from 'lucide-react'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px] animate-float" />
        <div className="absolute top-1/3 -right-32 w-[400px] h-[400px] rounded-full bg-cyan/10 blur-[100px] animate-float-delayed" />
        <div className="absolute -bottom-20 left-1/3 w-[600px] h-[300px] rounded-full bg-pink/8 blur-[120px] animate-pulse-glow" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-60" />

      {/* Floating tech decorations */}
      <div className="absolute top-32 left-[10%] animate-float hidden lg:block">
        <div className="w-14 h-14 rounded-2xl bg-card border border-accent/20 flex items-center justify-center shadow-lg shadow-accent/10">
          <Sparkles size={22} className="text-accent" />
        </div>
      </div>
      <div className="absolute top-48 right-[12%] animate-float-delayed hidden lg:block">
        <div className="w-12 h-12 rounded-xl bg-card border border-cyan/20 flex items-center justify-center shadow-lg shadow-cyan/10">
          <Zap size={18} className="text-cyan" />
        </div>
      </div>
      <div className="absolute bottom-40 left-[15%] animate-float hidden lg:block">
        <div className="w-10 h-10 rounded-lg bg-card border border-pink/20 flex items-center justify-center shadow-lg shadow-pink/10">
          <Layers size={16} className="text-pink" />
        </div>
      </div>

      {/* Floating code snippets */}
      <div className="absolute top-36 right-[25%] animate-float-delayed hidden xl:block">
        <div className="px-4 py-2.5 rounded-lg bg-card border border-border font-mono text-xs text-text-muted shadow-lg">
          <span className="text-pink">import</span> {"{"} View {"}"} <span className="text-pink">from</span> <span className="text-primary">'react-native'</span>
        </div>
      </div>
      <div className="absolute bottom-48 right-[18%] animate-float hidden xl:block">
        <div className="px-4 py-2.5 rounded-lg bg-card border border-border font-mono text-xs text-text-muted shadow-lg">
          <span className="text-accent">npx</span> expo start
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="animate-slide-up">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-card border border-accent/30 text-accent text-xs font-mono shadow-lg shadow-accent/5">
            <Sparkles size={12} />
            CS 130R — Emory University
          </div>
        </div>

        <h1 className="animate-slide-up-d1 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tight leading-[0.95] mt-8">
          <span className="text-text">Build Mobile</span>
          <br />
          <span className="bg-gradient-to-r from-accent via-cyan to-primary bg-clip-text text-transparent">
            Apps with Expo
          </span>
        </h1>

        <p className="animate-slide-up-d2 mt-6 text-lg sm:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
          Your hands-on guide to React Native & Expo — from zero mobile dev experience to building
          real apps on your phone. No Apple Developer account needed.
        </p>

        <div className="animate-slide-up-d3 mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => scrollTo('why-expo')}
            className="inline-flex items-center px-8 py-3.5 rounded-xl bg-gradient-to-r from-accent to-cyan text-white font-heading font-semibold text-sm shadow-xl shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-0.5 transition-all"
          >
            Get Started
          </button>
          <button
            onClick={() => scrollTo('setup')}
            className="inline-flex items-center px-8 py-3.5 rounded-xl bg-card border border-border hover:border-accent/50 text-text-muted hover:text-text font-heading font-semibold text-sm transition-all"
          >
            Jump to Setup
          </button>
        </div>

        <div className="animate-slide-up-d4 mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-text-muted font-mono">
          {['React Native', 'Expo', 'TypeScript', 'Expo Go'].map((tag) => (
            <span key={tag} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              {tag}
            </span>
          ))}
        </div>

        <div className="animate-slide-up-d5 mt-16">
          <p className="text-sm text-text-muted mb-1">by Darren Liu</p>
          <p className="text-xs text-text-muted/60">Nell Hodgson Woodruff School of Nursing, Emory University</p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <button onClick={() => scrollTo('why-expo')} className="text-text-muted/50 hover:text-accent transition-colors">
          <ArrowDown size={20} />
        </button>
      </div>
    </section>
  )
}
