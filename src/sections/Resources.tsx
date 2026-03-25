import { ExternalLink, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const RESOURCES = [
  {
    title: 'Expo Documentation',
    desc: 'Official docs — API references, guides, and tutorials.',
    url: 'https://docs.expo.dev',
    gradient: 'from-accent to-purple',
    iconColor: 'group-hover:text-accent',
  },
  {
    title: 'React Native Docs',
    desc: 'Core React Native documentation and component reference.',
    url: 'https://reactnative.dev',
    gradient: 'from-cyan to-info',
    iconColor: 'group-hover:text-cyan',
  },
  {
    title: 'Expo Snack',
    desc: 'Browser-based playground — write and run React Native code online.',
    url: 'https://snack.expo.dev',
    gradient: 'from-primary to-cyan',
    iconColor: 'group-hover:text-primary',
  },
  {
    title: 'React Native Directory',
    desc: 'Curated library of community packages for React Native.',
    url: 'https://reactnative.directory',
    gradient: 'from-pink to-orange',
    iconColor: 'group-hover:text-pink',
  },
]

const NEXT_TOPICS = [
  { title: 'Navigation', desc: 'File-based routing with Expo Router', color: 'text-accent', url: 'https://docs.expo.dev/router/introduction/' },
  { title: 'Data Fetching', desc: 'REST APIs and TanStack Query', color: 'text-cyan', url: 'https://tanstack.com/query' },
  { title: 'Native APIs', desc: 'Camera, Location, Haptics, 50+ more', color: 'text-primary', url: 'https://docs.expo.dev/versions/latest/' },
  { title: 'Animations', desc: 'React Native Reanimated for 60fps', color: 'text-pink', url: 'https://docs.swmansion.com/react-native-reanimated/' },
  { title: 'Deployment', desc: 'Build and submit with EAS', color: 'text-orange', url: 'https://docs.expo.dev/build/introduction/' },
]

export function Resources() {
  return (
    <section id="resources" className="relative py-28 px-6">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-accent/5 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-card border border-orange/30 text-orange text-xs font-mono mb-6">
            RESOURCES
          </span>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold tracking-tight">
            Keep <span className="bg-gradient-to-r from-orange to-pink bg-clip-text text-transparent">building</span>
          </h2>
          <p className="mt-4 text-text-muted max-w-xl mx-auto text-lg">
            Essential links and what to explore next.
          </p>
        </div>

        {/* Resource cards */}
        <div className="grid sm:grid-cols-2 gap-4 mb-20">
          {RESOURCES.map((r) => (
            <a
              key={r.title}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl bg-card border border-border p-6 hover:border-border-light transition-all duration-300 glow-card shadow-lg shadow-black/10"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-heading font-semibold text-text text-lg group-hover:text-accent transition-colors mb-2">{r.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{r.desc}</p>
                  <p className="text-xs font-mono text-text-muted/40 mt-3">{r.url}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center shrink-0">
                  <ExternalLink size={16} className={`text-text-muted/50 ${r.iconColor} transition-colors`} />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Redux deep dive card */}
        <Link
          to="/state/redux"
          className="group block rounded-2xl bg-gradient-to-br from-purple/10 to-pink/10 border border-purple/20 hover:border-purple/40 p-8 mb-20 transition-all duration-300 glow-card shadow-lg shadow-black/10"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-purple/10 text-purple text-xs font-mono mb-3">
                DEEP DIVE
              </span>
              <h3 className="font-heading font-bold text-text text-xl mb-2 group-hover:text-purple transition-colors">
                Redux for Beginners
              </h3>
              <p className="text-text-muted leading-relaxed max-w-xl">
                Learn how to manage complex application state with Redux Toolkit. This guide covers core concepts,
                step-by-step setup in Expo, async data fetching, and best practices — everything you need to get started.
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple/10 flex items-center justify-center shrink-0 group-hover:bg-purple/20 transition-colors">
              <ArrowRight size={20} className="text-purple group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </Link>

        {/* What's next */}
        <div className="text-center mb-10">
          <h3 className="text-2xl font-heading font-bold">What to learn next</h3>
          <p className="text-text-muted mt-2">Topics to explore once you're comfortable with the basics.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {NEXT_TOPICS.map((topic) => (
            <a
              key={topic.title}
              href={topic.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 p-5 rounded-xl bg-card border border-border hover:border-border-light hover:bg-card-hover transition-all"
            >
              <span className={`text-sm font-mono font-bold ${topic.color} mt-0.5`}>&gt;</span>
              <div>
                <p className={`font-heading font-semibold ${topic.color}`}>{topic.title}</p>
                <p className="text-sm text-text-muted mt-1">{topic.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
