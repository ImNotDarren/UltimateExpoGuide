import { Smartphone, Rocket, Code, Globe, Cpu, Palette, Shield, Zap } from 'lucide-react'

const FEATURES = [
  {
    icon: Zap,
    title: 'Zero Config',
    desc: 'No Xcode, no Android Studio. One command to start.',
    gradient: 'from-yellow-500 to-orange',
    iconColor: 'text-yellow-400',
  },
  {
    icon: Smartphone,
    title: 'Expo Go',
    desc: 'Free app to test on real devices. Just scan a QR code.',
    gradient: 'from-primary to-cyan',
    iconColor: 'text-primary',
  },
  {
    icon: Code,
    title: 'Your JS Skills',
    desc: 'Same React concepts — components, state, props, hooks.',
    gradient: 'from-accent to-purple',
    iconColor: 'text-accent',
  },
  {
    icon: Globe,
    title: 'iOS + Android',
    desc: 'One codebase, two platforms. Write once, run everywhere.',
    gradient: 'from-cyan to-info',
    iconColor: 'text-cyan',
  },
  {
    icon: Rocket,
    title: 'Hot Reloading',
    desc: 'Save your file, see changes instantly on your phone.',
    gradient: 'from-pink to-error',
    iconColor: 'text-pink',
  },
  {
    icon: Palette,
    title: '50+ APIs',
    desc: 'Camera, location, haptics, notifications — all built in.',
    gradient: 'from-purple to-accent',
    iconColor: 'text-purple',
  },
  {
    icon: Cpu,
    title: 'TypeScript First',
    desc: 'Full TypeScript support out of the box. Type-safe apps.',
    gradient: 'from-info to-accent',
    iconColor: 'text-info',
  },
  {
    icon: Shield,
    title: 'OTA Updates',
    desc: 'Push updates to users without app store review.',
    gradient: 'from-primary to-primary-dark',
    iconColor: 'text-primary',
  },
]

export function WhyExpo() {
  return (
    <section id="why-expo" className="relative py-28 px-6">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-accent/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Section header */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-card border border-accent/30 text-accent text-xs font-mono mb-6">
            WHY EXPO?
          </span>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold tracking-tight">
            The <span className="bg-gradient-to-r from-accent to-cyan bg-clip-text text-transparent">fastest way</span> to build mobile apps
          </h2>
          <p className="mt-4 text-text-muted max-w-xl mx-auto text-lg">
            Expo wraps React Native with tools that eliminate complexity. You already know JS — that's all you need.
          </p>
        </div>

        {/* Comparison table */}
        <div className="mb-20 rounded-2xl overflow-hidden border border-border bg-card shadow-xl shadow-black/20">
          {/* Header */}
          <div className="grid grid-cols-3 md:grid-cols-5 bg-surface text-xs font-heading font-semibold text-text-muted uppercase tracking-wider">
            <div className="p-4">Approach</div>
            <div className="p-4 hidden md:block">Codebases</div>
            <div className="p-4">What to Learn</div>
            <div className="p-4 hidden md:block">Cost</div>
            <div className="p-4">Speed</div>
          </div>
          {/* Native row */}
          <div className="grid grid-cols-3 md:grid-cols-5 text-sm border-t border-border">
            <div className="p-4 text-text-muted font-medium">Native (Swift + Kotlin)</div>
            <div className="p-4 text-text-muted hidden md:block">2</div>
            <div className="p-4 text-text-muted text-xs">Swift, Kotlin, Xcode, Android Studio</div>
            <div className="p-4 text-text-muted hidden md:block">$99/yr Apple Dev</div>
            <div className="p-4 text-text-muted">Slower</div>
          </div>
          {/* Expo row (highlighted) */}
          <div className="grid grid-cols-3 md:grid-cols-5 text-sm border-t border-primary/20 bg-primary/5">
            <div className="p-4 text-primary font-semibold">React Native + Expo</div>
            <div className="p-4 text-primary font-semibold hidden md:block">1</div>
            <div className="p-4 text-primary text-xs font-medium">JS/TS (you already know!)</div>
            <div className="p-4 text-primary font-semibold hidden md:block">Free with Expo Go</div>
            <div className="p-4 text-primary font-semibold">Much faster</div>
          </div>
        </div>

        {/* Feature cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl bg-card border border-border p-6 hover:border-border-light transition-all duration-300 glow-card"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-105 transition-transform`}>
                <f.icon size={22} className="text-white" />
              </div>
              <h3 className="font-heading font-semibold text-text text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
