import { FileCode, Wifi, Smartphone, RefreshCw } from 'lucide-react'

const STEPS = [
  {
    icon: FileCode,
    num: '01',
    title: 'Write Code',
    desc: 'Write React Native components using TypeScript in VS Code — the same React you already know, just with mobile components.',
    gradient: 'from-accent to-purple',
    code: `export default function App() {\n  return (\n    <View style={styles.container}>\n      <Text>Hello World!</Text>\n    </View>\n  );\n}`,
  },
  {
    icon: Wifi,
    num: '02',
    title: 'Start Dev Server',
    desc: 'Run npx expo start. Expo spins up a development server and generates a QR code for your phone.',
    gradient: 'from-cyan to-info',
    code: `$ npx expo start\n\n  Metro waiting on\n  exp://192.168.1.5:8081\n\n  Scan the QR code above\n  with Expo Go`,
  },
  {
    icon: Smartphone,
    num: '03',
    title: 'Scan & Run',
    desc: 'Open Expo Go on your phone, scan the QR code, and your app appears instantly. No build step needed.',
    gradient: 'from-primary to-cyan',
    code: `  ▄▄▄▄▄▄▄▄▄▄▄▄▄\n  █ ▄▄▄ █▀▄▀▄█ █\n  █ █▄█ ██▄ ▀█ █\n  █▄▄▄▄▄█ ▄▄▀█ █\n  ▀▀▀▀▀▀▀▀▀▀▀▀▀\n\n  📱 Open on device`,
  },
  {
    icon: RefreshCw,
    num: '04',
    title: 'Hot Reload',
    desc: 'Edit your code and save — changes appear on your phone in milliseconds. No restarts, no waiting.',
    gradient: 'from-pink to-orange',
    code: `  Fast Refresh ⚡\n\n  File saved:\n  App.tsx\n\n  Updated in 42ms`,
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-28 px-6">
      <div className="absolute top-1/2 -translate-y-1/2 -right-40 w-[500px] h-[500px] rounded-full bg-cyan/5 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-card border border-cyan/30 text-cyan text-xs font-mono mb-6">
            HOW IT WORKS
          </span>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold tracking-tight">
            From <span className="bg-gradient-to-r from-cyan to-primary bg-clip-text text-transparent">code to phone</span> in seconds
          </h2>
          <p className="mt-4 text-text-muted max-w-xl mx-auto text-lg">
            Expo Go eliminates the traditional build step. Write code, scan QR, see your app.
          </p>
        </div>

        <div className="space-y-12">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}
            >
              {/* Text side */}
              <div className="flex-1 max-w-lg">
                <div className="flex items-center gap-4 mb-5">
                  <span className={`text-4xl font-heading font-bold bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}>
                    {step.num}
                  </span>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg`}>
                    <step.icon size={22} className="text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-heading font-bold text-text mb-3">{step.title}</h3>
                <p className="text-text-muted leading-relaxed text-lg">{step.desc}</p>
              </div>

              {/* Code/visual side */}
              <div className="flex-1 max-w-md w-full rounded-2xl bg-code-bg border border-border p-6 shadow-2xl shadow-black/30">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-3 h-3 rounded-full bg-error/70" />
                  <div className="w-3 h-3 rounded-full bg-warning/70" />
                  <div className="w-3 h-3 rounded-full bg-primary/70" />
                  <span className="ml-2 text-xs text-text-muted/40 font-mono">terminal</span>
                </div>
                <pre className="font-mono text-sm text-text-muted leading-relaxed whitespace-pre-wrap break-words">
                  {step.code}
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
