import { useState } from 'react'
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react'

interface QuizOption {
  text: string
  correct?: boolean
}

interface QuizProps {
  question: string
  options: QuizOption[]
  explanation?: string
}

export function Quiz({ question, options, explanation }: QuizProps) {
  const [selected, setSelected] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)

  const isCorrect = selected !== null && options[selected]?.correct

  const handleSelect = (index: number) => {
    if (showResult) return
    setSelected(index)
    setShowResult(true)
  }

  const reset = () => {
    setSelected(null)
    setShowResult(false)
  }

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-lg shadow-black/10">
      <div className="px-6 py-5 border-b border-border bg-surface">
        <p className="font-heading font-semibold text-text">{question}</p>
      </div>
      <div className="p-5 space-y-3">
        {options.map((option, i) => {
          let borderColor = 'border-border hover:border-border-light'
          let bgColor = 'bg-bg-soft hover:bg-card-hover'

          if (showResult && i === selected) {
            borderColor = isCorrect ? 'border-primary' : 'border-error'
            bgColor = isCorrect ? 'bg-primary/10' : 'bg-error/10'
          } else if (showResult && option.correct) {
            borderColor = 'border-primary/50'
            bgColor = 'bg-primary/5'
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={showResult}
              className={`w-full text-left px-5 py-4 rounded-xl border ${borderColor} ${bgColor} transition-all duration-200 disabled:cursor-default flex items-center gap-4`}
            >
              <span className="shrink-0 w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center text-xs font-mono text-text-muted font-semibold">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="text-sm text-text flex-1">{option.text}</span>
              {showResult && i === selected && (
                isCorrect
                  ? <CheckCircle size={20} className="ml-auto text-primary shrink-0" />
                  : <XCircle size={20} className="ml-auto text-error shrink-0" />
              )}
              {showResult && !isCorrect && option.correct && (
                <CheckCircle size={20} className="ml-auto text-primary shrink-0" />
              )}
            </button>
          )
        })}
      </div>
      {showResult && (
        <div className={`px-6 py-5 border-t border-border ${isCorrect ? 'bg-primary/8' : 'bg-error/8'}`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className={`text-sm font-heading font-bold ${isCorrect ? 'text-primary' : 'text-error'}`}>
                {isCorrect ? 'Correct!' : 'Not quite!'}
              </p>
              {explanation && <p className="text-sm text-text-muted mt-2 leading-relaxed">{explanation}</p>}
            </div>
            <button
              onClick={reset}
              className="shrink-0 p-2.5 rounded-lg bg-surface border border-border hover:bg-surface-light text-text-muted hover:text-text transition-colors"
              aria-label="Try again"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
