import { useState } from 'react'
import { Highlight, themes } from 'prism-react-renderer'
import { Copy, Check } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

interface CodeBlockProps {
  code: string
  language?: string
  title?: string
  showLineNumbers?: boolean
}

export function CodeBlock({ code, language = 'tsx', title, showLineNumbers = true }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const theme = useTheme()

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code.trim())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-2xl overflow-hidden border border-border bg-code-bg shadow-lg shadow-black/20 my-4">
      {title && (
        <div className="flex items-center justify-between px-5 py-3 bg-surface border-b border-border">
          <span className="text-xs font-mono text-text-muted font-medium">{title}</span>
          <span className="text-xs text-text-muted/50 uppercase font-mono">{language}</span>
        </div>
      )}
      <div className="relative group">
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-2.5 rounded-lg bg-surface border border-border hover:bg-surface-light text-text-muted hover:text-text transition-all duration-200 opacity-0 group-hover:opacity-100 z-10"
          aria-label="Copy code"
        >
          {copied ? <Check size={14} className="text-primary" /> : <Copy size={14} />}
        </button>
        <Highlight theme={theme === 'light' ? themes.github : themes.nightOwl} code={code.trim()} language={language}>
          {({ style, tokens, getLineProps, getTokenProps }) => (
            <pre
              style={{ ...style, background: 'var(--color-code-bg)' }}
              className="overflow-x-auto p-5 text-sm leading-relaxed"
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {showLineNumbers && (
                    <span className="inline-block w-8 text-right mr-4 text-text-muted/30 select-none text-xs">
                      {i + 1}
                    </span>
                  )}
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  )
}
