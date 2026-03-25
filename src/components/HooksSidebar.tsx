import { Link, useLocation } from 'react-router-dom'

const JS_BASICS = [
  { path: '/basics/modules', label: 'JS Modules' },
]

const REACT_HOOKS = [
  { path: '/hooks/useState', label: 'useState' },
  { path: '/hooks/useEffect', label: 'useEffect' },
  { path: '/hooks/useLayoutEffect', label: 'useLayoutEffect' },
  { path: '/hooks/useRef', label: 'useRef' },
  { path: '/hooks/useContext', label: 'useContext' },
  { path: '/hooks/useCallback', label: 'useCallback' },
  { path: '/hooks/useMemo', label: 'useMemo' },
]

const EXPO_HOOKS = [
  { path: '/hooks/useRouter', label: 'useRouter' },
  { path: '/hooks/useLocalSearchParams', label: 'useLocalSearchParams' },
  { path: '/hooks/usePathname', label: 'usePathname' },
  { path: '/hooks/useSegments', label: 'useSegments' },
  { path: '/hooks/useFocusEffect', label: 'useFocusEffect' },
]

const NAV_HOOKS = [
  { path: '/hooks/useNavigation', label: 'useNavigation' },
  { path: '/hooks/useHeaderHeight', label: 'useHeaderHeight' },
]

const STATE_MGMT = [
  { path: '/state/redux', label: 'Redux' },
]

export function HooksSidebar() {
  const { pathname } = useLocation()

  return (
    <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-2xl bg-card border border-border p-5 shadow-lg shadow-black/10">
        <h4 className="font-heading font-semibold text-text text-sm mb-4 uppercase tracking-wider">JS Basics</h4>
        <div className="space-y-1">
          {JS_BASICS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-3 py-2 rounded-lg text-sm font-mono transition-colors ${
                pathname === item.path
                  ? 'bg-accent/10 text-accent font-semibold'
                  : 'text-text-muted hover:text-text hover:bg-surface'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <h4 className="font-heading font-semibold text-text text-sm mt-6 mb-4 uppercase tracking-wider">React Hooks</h4>
        <div className="space-y-1">
          {REACT_HOOKS.map((hook) => (
            <Link
              key={hook.path}
              to={hook.path}
              className={`block px-3 py-2 rounded-lg text-sm font-mono transition-colors ${
                pathname === hook.path
                  ? 'bg-accent/10 text-accent font-semibold'
                  : 'text-text-muted hover:text-text hover:bg-surface'
              }`}
            >
              {hook.label}
            </Link>
          ))}
        </div>

        <h4 className="font-heading font-semibold text-text text-sm mt-6 mb-4 uppercase tracking-wider">Expo Router</h4>
        <div className="space-y-1">
          {EXPO_HOOKS.map((hook) => (
            <Link
              key={hook.path}
              to={hook.path}
              className={`block px-3 py-2 rounded-lg text-sm font-mono transition-colors ${
                pathname === hook.path
                  ? 'bg-accent/10 text-accent font-semibold'
                  : 'text-text-muted hover:text-text hover:bg-surface'
              }`}
            >
              {hook.label}
            </Link>
          ))}
        </div>

        <h4 className="font-heading font-semibold text-text text-sm mt-6 mb-4 uppercase tracking-wider">React Navigation</h4>
        <div className="space-y-1">
          {NAV_HOOKS.map((hook) => (
            <Link
              key={hook.path}
              to={hook.path}
              className={`block px-3 py-2 rounded-lg text-sm font-mono transition-colors ${
                pathname === hook.path
                  ? 'bg-accent/10 text-accent font-semibold'
                  : 'text-text-muted hover:text-text hover:bg-surface'
              }`}
            >
              {hook.label}
            </Link>
          ))}
        </div>

        <h4 className="font-heading font-semibold text-text text-sm mt-6 mb-4 uppercase tracking-wider">State Management</h4>
        <div className="space-y-1">
          {STATE_MGMT.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-3 py-2 rounded-lg text-sm font-mono transition-colors ${
                pathname === item.path
                  ? 'bg-accent/10 text-accent font-semibold'
                  : 'text-text-muted hover:text-text hover:bg-surface'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <Link
            to="/navigation"
            className={`block px-3 py-2 rounded-lg text-sm font-heading font-semibold transition-colors ${
              pathname === '/navigation'
                ? 'bg-primary/10 text-primary'
                : 'text-text-muted hover:text-text hover:bg-surface'
            }`}
          >
            Navigation Guide
          </Link>
        </div>
    </div>
  )
}
