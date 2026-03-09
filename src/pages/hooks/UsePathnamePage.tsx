import { PageShell } from '../../components/PageShell'
import { HooksSidebar } from '../../components/HooksSidebar'
import { CodeBlock } from '../../components/CodeBlock'
import { InfoBox } from '../../components/InfoBox'

export function UsePathnamePage() {
  return (
    <PageShell
      title="usePathname"
      subtitle="Returns the current route's pathname — the mobile equivalent of window.location.pathname."
      gradient="from-cyan to-info"
      badge="EXPO ROUTER"
      breadcrumbs={[{ label: 'Hooks' }, { label: 'usePathname' }]}
      sidebar={<HooksSidebar />}
    >
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-text mb-4">What is usePathname?</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            On the web, <code className="text-accent">window.location.pathname</code> gives you the current page's path.
            If you're on <code className="text-accent">example.com/settings/profile</code>, the pathname
            is <code className="text-accent">/settings/profile</code>. It doesn't include query parameters or the
            domain — just the path.
          </p>
          <p className="text-text-muted leading-relaxed mb-4">
            In Expo Router, <code className="text-accent">usePathname()</code> does exactly the same thing. It's a hook
            (a special function starting with <code className="text-accent">use</code>) that returns the current route as
            a string. Your component will automatically update whenever the user navigates to a different screen.
          </p>
          <CodeBlock
            title="Basic usage"
            code={`import { usePathname } from 'expo-router';
import { View, Text } from 'react-native';

export default function DebugScreen() {
  // Returns the current path, e.g., "/settings/profile"
  const pathname = usePathname();

  return (
    <View style={{ padding: 20 }}>
      <Text>You are currently on: {pathname}</Text>
    </View>
  );
}

// Examples of what usePathname returns:
// If on the home screen:        "/"
// If on the settings screen:    "/settings"
// If on a user profile:         "/user/123"
// If on a nested route:         "/settings/notifications"`}
          />
          <p className="text-text-muted leading-relaxed">
            Notice that the value is always a string starting with <code className="text-accent">/</code>. It does not include
            query parameters — for those, use <code className="text-accent">useLocalSearchParams</code> instead.
          </p>
        </section>

        {/* Use case: Conditional rendering */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-text mb-4">Use Case: Conditional Rendering</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            Sometimes you want to show or hide parts of the UI depending on which screen the user is on. This is
            common for layouts that wrap multiple screens — you might want a header on some screens but not others.
          </p>
          <CodeBlock
            title="Conditionally showing a banner"
            code={`import { usePathname } from 'expo-router';
import { Slot } from 'expo-router';
import { View, Text } from 'react-native';

// This is a layout component — it wraps child screens
// Slot renders whatever child screen matches the current URL
export default function AppLayout() {
  const pathname = usePathname();

  // Only show the promotional banner on the home screen
  const showBanner = pathname === '/';

  return (
    <View style={{ flex: 1 }}>
      {showBanner && (
        <View style={{ backgroundColor: '#4CAF50', padding: 12 }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>
            Welcome! Get 20% off your first order.
          </Text>
        </View>
      )}
      {/* Slot renders the current child screen */}
      <Slot />
    </View>
  );
}`}
          />
          <p className="text-text-muted leading-relaxed">
            In the example above, <code className="text-accent">Slot</code> is an Expo Router component that renders the current
            child screen. The layout wraps it and can add UI around it. The <code className="text-accent">{'{showBanner && (...)}'}</code> syntax
            is React's way of saying "only render this if the condition is true" — similar to an <code className="text-accent">if</code> statement.
          </p>
        </section>

        {/* Use case: Active nav highlighting */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-text mb-4">Use Case: Active Navigation Highlighting</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            On the web, you often add an "active" CSS class to a navigation link when its page is currently shown.
            In mobile apps, you do the same thing — highlight the current tab or menu item. <code className="text-accent">usePathname</code> tells
            you which route is active.
          </p>
          <CodeBlock
            title="Custom tab bar with active highlighting"
            code={`import { usePathname, useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Define your tabs — each has a route path and a label
const tabs = [
  { path: '/home', label: 'Home', icon: '🏠' },
  { path: '/search', label: 'Search', icon: '🔍' },
  { path: '/profile', label: 'Profile', icon: '👤' },
];

export function CustomTabBar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <View style={styles.tabBar}>
      {tabs.map((tab) => {
        // Check if this tab matches the current route
        const isActive = pathname === tab.path
          || pathname.startsWith(tab.path + '/');

        return (
          <TouchableOpacity
            key={tab.path}
            onPress={() => router.push(tab.path)}
            style={[
              styles.tab,
              isActive && styles.activeTab,
            ]}
          >
            <Text style={{ fontSize: 20 }}>{tab.icon}</Text>
            <Text style={[
              styles.tabLabel,
              isActive && styles.activeLabel,
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// StyleSheet.create is React Native's CSS equivalent
const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',      // like display: flex
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#ffffff',
    paddingBottom: 20,         // extra space for iPhone home bar
  },
  tab: {
    flex: 1,                   // like flex: 1 in CSS
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeTab: {
    borderTopWidth: 2,
    borderTopColor: '#007AFF',
  },
  tabLabel: {
    fontSize: 11,
    color: '#8e8e93',
    marginTop: 2,
  },
  activeLabel: {
    color: '#007AFF',
    fontWeight: '600',
  },
});`}
          />
          <InfoBox variant="info" title="StyleSheet.create">
            In React Native, you don't use CSS files. Instead, you use <code className="text-accent">StyleSheet.create()</code> to
            define styles as JavaScript objects. The property names are camelCase versions of CSS properties:
            <code className="text-accent"> border-top-width</code> becomes <code className="text-accent">borderTopWidth</code>,
            <code className="text-accent"> background-color</code> becomes <code className="text-accent">backgroundColor</code>, etc.
          </InfoBox>
        </section>

        {/* Use case: Analytics */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-text mb-4">Use Case: Analytics Tracking</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            You can track which screens users visit by watching the pathname change. This is like adding
            Google Analytics page view tracking on a website — every time the URL changes, you log it.
          </p>
          <CodeBlock
            title="Tracking screen views"
            code={`import { usePathname } from 'expo-router';
import { useEffect } from 'react';
import { Slot } from 'expo-router';
import { View } from 'react-native';

export default function RootLayout() {
  const pathname = usePathname();

  // useEffect runs code when the component first appears
  // AND whenever values in the [dependency array] change.
  // Here it runs every time pathname changes.
  useEffect(() => {
    // Log the screen view to your analytics service
    console.log('User navigated to:', pathname);

    // In a real app, you'd send this to an analytics service:
    // analytics.trackScreenView(pathname);
  }, [pathname]); // <-- re-run whenever pathname changes

  return (
    <View style={{ flex: 1 }}>
      <Slot />
    </View>
  );
}`}
          />
          <p className="text-text-muted leading-relaxed">
            The <code className="text-accent">[pathname]</code> at the end of <code className="text-accent">useEffect</code> is called
            the "dependency array." It tells React: "run this effect again whenever <code className="text-accent">pathname</code> changes."
            Without it, the effect would only run once when the component first appears.
          </p>
        </section>

        {/* Complete example */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-text mb-4">Complete Example: Breadcrumb Navigation</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            Here's a practical example: a breadcrumb component that automatically generates navigation breadcrumbs
            from the current pathname, just like you see on many websites.
          </p>
          <CodeBlock
            title="Breadcrumb component using usePathname"
            code={`import { usePathname, useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export function Breadcrumbs() {
  const pathname = usePathname();
  const router = useRouter();

  // Split "/settings/notifications" into ["settings", "notifications"]
  // .filter(Boolean) removes empty strings from the split
  const segments = pathname.split('/').filter(Boolean);

  // Build breadcrumb items with their full paths
  const crumbs = segments.map((segment, index) => {
    // Build the path for this crumb: /settings, /settings/notifications
    const path = '/' + segments.slice(0, index + 1).join('/');

    // Capitalize the segment name for display
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);

    return { label, path };
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push('/')}>
        <Text style={styles.link}>Home</Text>
      </TouchableOpacity>

      {crumbs.map((crumb, index) => (
        <View key={crumb.path} style={styles.crumbItem}>
          <Text style={styles.separator}> &gt; </Text>
          {index === crumbs.length - 1 ? (
            // Last crumb is the current page — not clickable
            <Text style={styles.current}>{crumb.label}</Text>
          ) : (
            // Other crumbs are clickable links
            <TouchableOpacity onPress={() => router.push(crumb.path)}>
              <Text style={styles.link}>{crumb.label}</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f5f5f5',
  },
  crumbItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    color: '#999',
    marginHorizontal: 4,
  },
  link: {
    color: '#007AFF',
    fontSize: 14,
  },
  current: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
  },
});`}
          />
          <InfoBox variant="tip" title="pathname vs segments">
            If you need the path as an array of parts instead of a single string, check out
            the <code className="text-accent">useSegments</code> hook — it does the splitting for you and is
            type-safe.
          </InfoBox>
        </section>
      </div>
    </PageShell>
  )
}
