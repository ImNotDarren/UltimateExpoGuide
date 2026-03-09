import { Info, AlertTriangle, Lightbulb, Rocket } from 'lucide-react'
import type { ReactNode } from 'react'

type InfoBoxVariant = 'info' | 'warning' | 'tip' | 'fun'

interface InfoBoxProps {
  variant?: InfoBoxVariant
  title?: string
  children: ReactNode
}

const variants: Record<InfoBoxVariant, { icon: typeof Info; borderColor: string; bgColor: string; iconColor: string; defaultTitle: string }> = {
  info: {
    icon: Info,
    borderColor: 'border-info/40',
    bgColor: 'bg-info/5',
    iconColor: 'text-info',
    defaultTitle: 'Info',
  },
  warning: {
    icon: AlertTriangle,
    borderColor: 'border-warning/40',
    bgColor: 'bg-warning/5',
    iconColor: 'text-warning',
    defaultTitle: 'Heads up!',
  },
  tip: {
    icon: Lightbulb,
    borderColor: 'border-primary/40',
    bgColor: 'bg-primary/5',
    iconColor: 'text-primary',
    defaultTitle: 'Pro tip',
  },
  fun: {
    icon: Rocket,
    borderColor: 'border-pink/40',
    bgColor: 'bg-pink/5',
    iconColor: 'text-pink',
    defaultTitle: 'Fun fact',
  },
}

export function InfoBox({ variant = 'info', title, children }: InfoBoxProps) {
  const config = variants[variant]
  const Icon = config.icon

  return (
    <div className={`my-4 rounded-xl border ${config.borderColor} ${config.bgColor} p-4`}>
      <div className="flex items-start gap-3">
        <Icon size={18} className={`${config.iconColor} shrink-0 mt-0.5`} />
        <div>
          <p className={`text-sm font-semibold ${config.iconColor} mb-1`}>
            {title || config.defaultTitle}
          </p>
          <div className="text-sm text-text-muted leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  )
}
