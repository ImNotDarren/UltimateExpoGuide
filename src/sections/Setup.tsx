import { useState } from 'react'
import { Check, Copy, ChevronDown, ChevronUp } from 'lucide-react'

interface StepProps {
  num: number
  title: string
  children: React.ReactNode
  gradient: string
  defaultOpen?: boolean
}

function Step({ num, title, children, gradient, defaultOpen = false }: StepProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className={`rounded-2xl border ${open ? 'border-border-light bg-card' : 'border-border bg-card/80'} overflow-hidden transition-all shadow-lg shadow-black/10`}>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center gap-4 px-6 py-5 hover:bg-card-hover transition-colors text-left`}
      >
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0 shadow-md`}>
          <span className="text-white font-heading font-bold text-sm">{num}</span>
        </div>
        <h3 className="font-heading font-semibold text-lg text-text flex-1">{title}</h3>
        <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center shrink-0">
          {open ? <ChevronUp size={16} className="text-text-muted" /> : <ChevronDown size={16} className="text-text-muted" />}
        </div>
      </button>
      {open && (
        <div className="px-6 pb-6 border-t border-border">
          <div className="mt-5">{children}</div>
        </div>
      )}
    </div>
  )
}

function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center gap-3 bg-code-bg rounded-xl px-5 py-3.5 border border-border group">
      <span className="text-primary font-mono text-sm font-semibold">$</span>
      <code className="font-mono text-sm text-text flex-1 overflow-x-auto">{command}</code>
      <button
        onClick={handleCopy}
        className="shrink-0 p-2 rounded-lg bg-surface hover:bg-surface-light text-text-muted hover:text-text transition-colors opacity-0 group-hover:opacity-100"
        aria-label="Copy"
      >
        {copied ? <Check size={14} className="text-primary" /> : <Copy size={14} />}
      </button>
    </div>
  )
}

export function Setup() {
  return (
    <section id="setup" className="relative py-28 px-6">
      <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-card border border-primary/30 text-primary text-xs font-mono mb-6">
            GETTING STARTED
          </span>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold tracking-tight">
            <span className="bg-gradient-to-r from-primary to-cyan bg-clip-text text-transparent">Setup</span> in under 10 minutes
          </h2>
          <p className="mt-4 text-text-muted max-w-xl mx-auto text-lg">
            Everything you need to start building. Most of you already have step 1 done.
          </p>
        </div>

        <div className="space-y-4">
          <Step num={1} title="Install Node.js" gradient="from-primary to-cyan" defaultOpen>
            <p className="text-text-muted text-sm mb-4 leading-relaxed">
              Node.js lets you run JavaScript outside the browser. If you've done web dev, you probably have it.
            </p>
            <p className="text-xs font-heading font-semibold text-text-muted uppercase tracking-wider mb-3">Check if installed:</p>
            <CopyCommand command="node --version" />
            <p className="text-xs text-text-muted mt-4 mb-4">
              Need v18+. If not installed:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-bg-soft border border-border">
                <p className="text-sm font-semibold text-text mb-3">macOS</p>
                <CopyCommand command="brew install node" />
              </div>
              <div className="p-4 rounded-xl bg-bg-soft border border-border">
                <p className="text-sm font-semibold text-text mb-3">Windows</p>
                <p className="text-sm text-text-muted">
                  Download LTS from <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-light underline">nodejs.org</a>
                </p>
              </div>
            </div>
          </Step>

          <Step num={2} title="Create an Expo Project" gradient="from-accent to-purple">
            <p className="text-text-muted text-sm mb-4 leading-relaxed">
              One command scaffolds a complete mobile app project with TypeScript, navigation, and more.
            </p>
            <div className="space-y-3">
              <CopyCommand command="npx create-expo-app@latest MyFirstApp" />
              <CopyCommand command="cd MyFirstApp" />
            </div>
            <div className="mt-5 p-5 rounded-xl bg-code-bg border border-border">
              <p className="text-xs font-mono text-text-muted leading-relaxed whitespace-pre">
{`MyFirstApp/
├── app/          # Your screens (file-based routing)
│   ├── (tabs)/   # Tab navigation
│   └── _layout   # Root layout
├── assets/       # Images, fonts
├── components/   # Reusable components
├── app.json      # Expo config
└── package.json  # Dependencies`}
              </p>
            </div>
          </Step>

          <Step num={3} title="Get Expo Go on Your Phone" gradient="from-pink to-orange">
            <p className="text-text-muted text-sm mb-4 leading-relaxed">
              Expo Go is a free app that runs your Expo project directly on your phone. No developer accounts needed!
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <a
                href="https://apps.apple.com/app/expo-go/id982107779"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-5 rounded-xl bg-bg-soft border border-border hover:border-accent/40 hover:bg-card-hover transition-all group"
              >
                <p className="font-heading font-semibold text-text group-hover:text-accent transition-colors">iOS — App Store</p>
                <p className="text-sm text-text-muted mt-1">Requires iOS 16+</p>
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=host.exp.exponent"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-5 rounded-xl bg-bg-soft border border-border hover:border-primary/40 hover:bg-card-hover transition-all group"
              >
                <p className="font-heading font-semibold text-text group-hover:text-primary transition-colors">Android — Google Play</p>
                <p className="text-sm text-text-muted mt-1">Requires Android 10+</p>
              </a>
            </div>
          </Step>

          <Step num={4} title="Install VS Code Extensions" gradient="from-info to-accent">
            <p className="text-text-muted text-sm mb-4 leading-relaxed">
              Recommended extensions for a smooth dev experience:
            </p>
            <div className="space-y-2">
              {[
                { name: 'ES7+ React/Redux/React-Native Snippets', id: 'dsznajder.es7-react-js-snippets' },
                { name: 'Prettier - Code Formatter', id: 'esbenp.prettier-vscode' },
                { name: 'Error Lens', id: 'usernamehw.errorlens' },
              ].map((ext) => (
                <div key={ext.id} className="flex items-center justify-between p-4 rounded-lg bg-bg-soft border border-border">
                  <span className="text-sm text-text font-medium">{ext.name}</span>
                  <code className="text-xs text-text-muted font-mono hidden sm:block">{ext.id}</code>
                </div>
              ))}
            </div>
          </Step>

          <Step num={5} title="Run Your App!" gradient="from-cyan to-primary">
            <p className="text-text-muted text-sm mb-4 leading-relaxed">
              Start the dev server and scan the QR code with your phone:
            </p>
            <CopyCommand command="npx expo start" />
            <div className="mt-5 grid sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-bg-soft border border-border">
                <p className="text-sm font-heading font-semibold text-text mb-3">iPhone</p>
                <ol className="text-sm text-text-muted space-y-2 list-decimal list-inside">
                  <li>Open the Camera app</li>
                  <li>Point at the QR code</li>
                  <li>Tap the Expo Go notification</li>
                </ol>
              </div>
              <div className="p-5 rounded-xl bg-bg-soft border border-border">
                <p className="text-sm font-heading font-semibold text-text mb-3">Android</p>
                <ol className="text-sm text-text-muted space-y-2 list-decimal list-inside">
                  <li>Open the Expo Go app</li>
                  <li>Tap "Scan QR code"</li>
                  <li>Point at the QR code</li>
                </ol>
              </div>
            </div>
          </Step>
        </div>
      </div>
    </section>
  )
}
