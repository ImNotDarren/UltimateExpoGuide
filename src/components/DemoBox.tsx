import type { ReactNode } from 'react'
import { Play } from 'lucide-react'

interface DemoBoxProps {
  title?: string
  children: ReactNode
}

export function DemoBox({ title = 'Live Demo', children }: DemoBoxProps) {
  return (
    <div className="my-6 rounded-2xl overflow-hidden border border-primary/30 bg-card shadow-lg shadow-black/10">
      <div className="flex items-center gap-2 px-5 py-3 bg-primary/10 border-b border-primary/20">
        <Play size={14} className="text-primary" />
        <span className="text-xs font-mono text-primary font-semibold">{title}</span>
      </div>
      <div className="p-6">{children}</div>
    </div>
  )
}
