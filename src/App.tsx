import { Routes, Route, Navigate } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './sections/Footer'
import { HomePage } from './pages/HomePage'
import { UseStatePage } from './pages/hooks/UseStatePage'
import { UseEffectPage } from './pages/hooks/UseEffectPage'
import { UseLayoutEffectPage } from './pages/hooks/UseLayoutEffectPage'
import { UseRefPage } from './pages/hooks/UseRefPage'
import { UseContextPage } from './pages/hooks/UseContextPage'
import { UseCallbackPage } from './pages/hooks/UseCallbackPage'
import { UseMemoPage } from './pages/hooks/UseMemoPage'
import { UseRouterPage } from './pages/hooks/UseRouterPage'
import { UseLocalSearchParamsPage } from './pages/hooks/UseLocalSearchParamsPage'
import { UsePathnamePage } from './pages/hooks/UsePathnamePage'
import { UseSegmentsPage } from './pages/hooks/UseSegmentsPage'
import { UseFocusEffectPage } from './pages/hooks/UseFocusEffectPage'
import { UseNavigationPage } from './pages/hooks/UseNavigationPage'
import { UseHeaderHeightPage } from './pages/hooks/UseHeaderHeightPage'
import { NavigationGuide } from './pages/NavigationGuide'

function App() {
  return (
    <div className="bg-bg min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* React Hooks */}
        <Route path="/hooks/useState" element={<UseStatePage />} />
        <Route path="/hooks/useEffect" element={<UseEffectPage />} />
        <Route path="/hooks/useLayoutEffect" element={<UseLayoutEffectPage />} />
        <Route path="/hooks/useRef" element={<UseRefPage />} />
        <Route path="/hooks/useContext" element={<UseContextPage />} />
        <Route path="/hooks/useCallback" element={<UseCallbackPage />} />
        <Route path="/hooks/useMemo" element={<UseMemoPage />} />
        {/* Expo Router Hooks */}
        <Route path="/hooks/useRouter" element={<UseRouterPage />} />
        <Route path="/hooks/useLocalSearchParams" element={<UseLocalSearchParamsPage />} />
        <Route path="/hooks/usePathname" element={<UsePathnamePage />} />
        <Route path="/hooks/useSegments" element={<UseSegmentsPage />} />
        <Route path="/hooks/useFocusEffect" element={<UseFocusEffectPage />} />
        {/* React Navigation Hooks */}
        <Route path="/hooks/useNavigation" element={<UseNavigationPage />} />
        <Route path="/hooks/useHeaderHeight" element={<UseHeaderHeightPage />} />
        {/* Navigation Guide */}
        <Route path="/navigation" element={<NavigationGuide />} />
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
