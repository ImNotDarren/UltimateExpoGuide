import { useState } from 'react'
import { Copy, Check, Terminal as TerminalIcon } from 'lucide-react'

interface TerminalProps {
  commands: string[]
  title?: string
  output?: string
}

export function Terminal({ commands, title = 'Terminal', output }: TerminalProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(commands.join('\n'))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="my-4 rounded-xl overflow-hidden border border-border/50">
      <div className="flex items-center justify-between px-4 py-2.5 bg-surface-light/60">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-error/70" />
            <div className="w-3 h-3 rounded-full bg-warning/70" />
            <div className="w-3 h-3 rounded-full bg-primary/70" />
          </div>
          <span className="text-xs font-mono text-text-muted ml-2 flex items-center gap-1.5">
            <TerminalIcon size={12} />
            {title}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-md hover:bg-surface-light text-text-muted hover:text-text transition-colors cursor-pointer"
          aria-label="Copy commands"
        >
          {copied ? <Check size={14} className="text-primary" /> : <Copy size={14} />}
        </button>
      </div>
      <div className="bg-code-bg p-4 font-mono text-sm">
        {commands.map((cmd, i) => (
          <div key={i} className="flex gap-2 leading-relaxed">
            <span className="text-primary select-none">$</span>
            <span className="text-text">{cmd}</span>
          </div>
        ))}
        {output && (
          <div className="mt-3 pt-3 border-t border-border/20 text-text-muted text-xs leading-relaxed whitespace-pre-wrap">
            {output}
          </div>
        )}
      </div>
    </div>
  )
}
