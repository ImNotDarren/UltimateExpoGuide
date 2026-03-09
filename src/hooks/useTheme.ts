import { useSyncExternalStore } from 'react'

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })
  return () => observer.disconnect()
}

function getSnapshot() {
  return document.documentElement.classList.contains('light') ? 'light' as const : 'dark' as const
}

export function useTheme() {
  return useSyncExternalStore(subscribe, getSnapshot, () => 'dark' as const)
}
