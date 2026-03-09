import { useTheme } from '../hooks/useTheme'

interface ExpoSnackProps {
  id: string
  title?: string
  platform?: 'web' | 'ios' | 'android' | 'mydevice'
  preview?: boolean
  height?: number
}

export function ExpoSnack({
  id,
  title = 'Expo Snack',
  platform = 'web',
  preview = true,
  height = 500,
}: ExpoSnackProps) {
  const theme = useTheme()
  const params = new URLSearchParams({
    platform,
    theme,
    preview: preview ? 'true' : 'false',
  })

  return (
    <div className="my-6 rounded-2xl overflow-hidden border border-border bg-card shadow-lg shadow-black/10">
      <div className="px-5 py-3 bg-surface border-b border-border">
        <span className="text-xs font-mono text-text-muted font-medium">{title} — Try it live!</span>
      </div>
      <iframe
        src={`https://snack.expo.dev/embedded/${id}?${params.toString()}`}
        style={{ width: '100%', height: `${height}px`, border: 0 }}
        title={title}
        allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; microphone"
        loading="lazy"
      />
    </div>
  )
}
