import { PageShell } from '../components/PageShell'
import { HooksSidebar } from '../components/HooksSidebar'
import { CodeBlock } from '../components/CodeBlock'
import { InfoBox } from '../components/InfoBox'

export function NavigationGuide() {
  return (
    <PageShell
      title="Navigation in Expo"
      subtitle="How screens, routing, and navigation work in Expo Router — the mobile equivalent of multi-page websites."
      gradient="from-primary to-cyan"
      badge="NAVIGATION GUIDE"
      breadcrumbs={[{ label: 'Navigation Guide' }]}
      sidebar={<HooksSidebar />}
    >
      {/* ===== 1. Web vs Mobile Navigation ===== */}
      <h2 className="text-2xl font-heading font-bold text-text mt-16 mb-4">
        Web vs Mobile Navigation
      </h2>

      <p className="text-text-muted leading-relaxed mb-4">
        You already know how navigation works on the web. When a user clicks a link, the browser
        loads a new HTML page. The URL in the address bar changes. The browser keeps a history
        stack so the user can click Back and Forward. Every page is just a URL pointing to an
        HTML file (or a server-rendered response). Simple.
      </p>

      <p className="text-text-muted leading-relaxed mb-4">
        Mobile apps work completely differently. There is no URL bar. There is no browser
        managing history for you. Instead, screens are <strong className="text-text">stacked on top of each
        other</strong> — imagine a deck of cards. When you navigate to a new screen, it slides in
        from the right and sits on top of the previous screen. When you swipe back (or tap
        a back button), the top card slides away and reveals the screen underneath.
      </p>

      <p className="text-text-muted leading-relaxed mb-4">
        Mobile apps also have <strong className="text-text">tab bars</strong> at the bottom of the
        screen — think of Instagram or Twitter. Each tab is a separate section of the app
        with its own stack of screens.
      </p>

      <InfoBox variant="tip" title="The bridge between web and mobile">
        Expo Router gives you <strong>file-based routing</strong> — just like Next.js for the web.
        You create files in a folder, and each file becomes a screen. Under the hood, Expo
        Router handles all the native navigation gestures, animations, and screen stacking
        for you. You get the simplicity of web-style routing with the native feel of mobile
        navigation.
      </InfoBox>

      <p className="text-text-muted leading-relaxed mb-4">
        Here is a quick comparison to anchor the concepts:
      </p>

      <CodeBlock
        language="bash"
        title="Web vs Mobile Navigation — mental model"
        showLineNumbers={false}
        code={`Web (what you know)              Mobile (what you're learning)
─────────────────────────────    ─────────────────────────────────
URL bar shows current page       No URL bar — screens are stacked
<a href="/about"> to navigate    <Link href="/about"> or router.push()
Browser Back button              Swipe gesture or header back arrow
Multiple tabs = browser tabs     Bottom tab bar built into the app
Each page = separate HTML file   Each screen = a React component
Routing = file → URL mapping     Routing = file → screen mapping`}
      />

      {/* ===== 2. The app/ Folder ===== */}
      <h2 className="text-2xl font-heading font-bold text-text mt-16 mb-4">
        The app/ Folder
      </h2>

      <p className="text-text-muted leading-relaxed mb-4">
        In a traditional website, you might have an <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">index.html</code>,
        an <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">about.html</code>, and a <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">contact.html</code> file.
        Each file corresponds to a page. Expo Router works the same way — except the files
        live inside an <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">app/</code> folder and they are
        <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">.tsx</code> files instead of <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">.html</code>.
      </p>

      <CodeBlock
        language="bash"
        title="app/ directory structure"
        showLineNumbers={false}
        code={`app/
├── _layout.tsx      ← Root layout (wraps everything)
├── index.tsx         ← Home screen (/)
├── about.tsx         ← About screen (/about)
├── settings.tsx      ← Settings screen (/settings)
└── user/
    ├── _layout.tsx   ← Nested layout for /user routes
    ├── index.tsx     ← User list (/user)
    └── [id].tsx      ← User detail (/user/123)`}
      />

      <p className="text-text-muted leading-relaxed mb-4">
        Notice the pattern? Every <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">.tsx</code> file
        in the <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">app/</code> folder automatically becomes
        a route (a screen the user can navigate to). The file name determines the URL path:
      </p>

      <ul className="list-disc list-inside text-text-muted leading-relaxed mb-4 space-y-1 ml-2">
        <li><code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">app/index.tsx</code> → the home screen at <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">/</code></li>
        <li><code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">app/about.tsx</code> → the about screen at <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">/about</code></li>
        <li><code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">app/user/index.tsx</code> → the user list at <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">/user</code></li>
        <li><code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">app/user/[id].tsx</code> → a dynamic user screen at <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">/user/123</code>, <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">/user/456</code>, etc.</li>
      </ul>

      <InfoBox variant="info" title="index.tsx = index.html">
        Just like <code>index.html</code> is the default page for a folder on the web,{' '}
        <code>index.tsx</code> is the default screen for a folder in Expo Router. When you
        navigate to <code>/user</code>, Expo Router loads <code>app/user/index.tsx</code> —
        exactly like a web server serves <code>user/index.html</code> when you visit <code>/user</code>.
      </InfoBox>

      {/* ===== 3. What's a Screen? ===== */}
      <h2 className="text-2xl font-heading font-bold text-text mt-16 mb-4">
        What's a Screen?
      </h2>

      <p className="text-text-muted leading-relaxed mb-4">
        On the web, a "page" is an HTML document that fills the browser window. In a mobile
        app, a <strong className="text-text">screen</strong> is a React component that fills
        the entire device display. That is it. A screen is just a function that returns some
        UI, and Expo Router renders it full-screen on the device.
      </p>

      <p className="text-text-muted leading-relaxed mb-4">
        Every <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">.tsx</code> file inside
        the <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">app/</code> folder must export
        a <strong className="text-text">default</strong> component. That default export is what
        Expo Router uses as the screen. Here is the simplest possible screen:
      </p>

      <CodeBlock
        language="tsx"
        title="app/index.tsx — a basic screen"
        code={`import { View, Text, StyleSheet } from 'react-native';

// This is a screen — it fills the entire device display.
// Think of it as a full-page HTML file, but written in React Native.
export default function HomeScreen(): React.ReactElement {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Home</Text>
      <Text style={styles.subtitle}>This is the home screen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                   // fill the entire screen
    justifyContent: 'center',  // center vertically
    alignItems: 'center',      // center horizontally
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
});`}
      />

      <InfoBox variant="tip" title="Web comparison">
        Think of each screen file as a standalone HTML page. On the web you would write a
        full <code>&lt;html&gt;&lt;body&gt;...&lt;/body&gt;&lt;/html&gt;</code> document. In
        Expo, you write a React component that returns <code>&lt;View&gt;</code> and{' '}
        <code>&lt;Text&gt;</code> elements. The file name determines the URL, and the default
        export determines what gets shown on screen.
      </InfoBox>

      {/* ===== 4. Layouts with _layout.tsx ===== */}
      <h2 className="text-2xl font-heading font-bold text-text mt-16 mb-4">
        Layouts with _layout.tsx
      </h2>

      <p className="text-text-muted leading-relaxed mb-4">
        On the web, you might have a shared HTML template — a header at the top, a footer at
        the bottom, and the page content in the middle. You reuse this template across every
        page. In Expo Router, <strong className="text-text">layouts</strong> serve the same
        purpose. A <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">_layout.tsx</code> file
        wraps all the screens in its folder (and subfolders) — it is the shell that surrounds
        your content.
      </p>

      <p className="text-text-muted leading-relaxed mb-4">
        The root <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">app/_layout.tsx</code> wraps
        your <em>entire</em> app. Every screen passes through this layout. It is where you
        set up the navigation type — Stack, Tabs, or Drawer.
      </p>

      <h3 className="text-xl font-heading font-semibold text-text mt-10 mb-3">
        Root Layout with Stack Navigator
      </h3>

      <p className="text-text-muted leading-relaxed mb-4">
        A <strong className="text-text">Stack</strong> navigator stacks screens on top of each
        other. This is the most common navigation pattern — the screen slides in from the right
        when you navigate forward, and slides back when you go back.
      </p>

      <CodeBlock
        language="tsx"
        title="app/_layout.tsx — root layout with Stack"
        code={`import { Stack } from 'expo-router';

// The root layout wraps EVERY screen in your app.
// Think of it like the <html><body> wrapper in a web page.
export default function RootLayout(): React.ReactElement {
  return (
    <Stack>
      {/* You can configure individual screens here */}
      <Stack.Screen
        name="index"
        options={{ title: 'Home' }}
      />
      <Stack.Screen
        name="about"
        options={{ title: 'About' }}
      />
      <Stack.Screen
        name="settings"
        options={{ title: 'Settings' }}
      />
    </Stack>
  );
}`}
      />

      <h3 className="text-xl font-heading font-semibold text-text mt-10 mb-3">
        Tab Layout
      </h3>

      <p className="text-text-muted leading-relaxed mb-4">
        A <strong className="text-text">Tabs</strong> navigator puts a tab bar at the bottom of
        the screen. Each tab shows a different screen. Think of the bottom bar in Instagram,
        Twitter, or Spotify — each icon is a tab.
      </p>

      <CodeBlock
        language="tsx"
        title="app/(tabs)/_layout.tsx — tab layout"
        code={`import { Tabs } from 'expo-router';
import { Home, User, Settings } from 'lucide-react-native';

// This layout creates a bottom tab bar.
// Each tab renders a different screen from this folder.
export default function TabLayout(): React.ReactElement {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#6366f1',  // active tab color
        tabBarInactiveTintColor: '#94a3b8', // inactive tab color
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Settings size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}`}
      />

      <h3 className="text-xl font-heading font-semibold text-text mt-10 mb-3">
        The Slot Component
      </h3>

      <p className="text-text-muted leading-relaxed mb-4">
        Inside a layout, the child screen is rendered automatically. But if you want a
        completely custom layout (no Stack or Tabs), you can use the{' '}
        <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">&lt;Slot /&gt;</code> component.
        It renders the current child screen — just like <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">{'{children}'}</code> in
        a web layout template.
      </p>

      <CodeBlock
        language="tsx"
        title="Custom layout using Slot"
        code={`import { Slot } from 'expo-router';
import { View } from 'react-native';

// <Slot /> renders the current child screen.
// This is like {children} in a web layout component.
export default function CustomLayout(): React.ReactElement {
  return (
    <View style={{ flex: 1 }}>
      {/* Your custom header, sidebar, etc. */}
      <Slot />
      {/* Your custom footer, etc. */}
    </View>
  );
}`}
      />

      <h3 className="text-xl font-heading font-semibold text-text mt-10 mb-3">
        Nesting Layouts
      </h3>

      <p className="text-text-muted leading-relaxed mb-4">
        Layouts can nest inside each other. Your root layout might use a Stack. One of the
        Stack screens might be a tab group with its own Tabs layout. And each tab might have
        its own nested Stack for drilling into details. This is how real apps are structured:
      </p>

      <CodeBlock
        language="bash"
        title="Nested layout structure"
        showLineNumbers={false}
        code={`app/
├── _layout.tsx              ← Root Stack layout
├── index.tsx                ← Home screen
├── (tabs)/
│   ├── _layout.tsx          ← Tab layout (nested inside root Stack)
│   ├── feed.tsx             ← Feed tab
│   ├── search.tsx           ← Search tab
│   └── profile/
│       ├── _layout.tsx      ← Stack layout (nested inside Tabs)
│       ├── index.tsx        ← Profile screen
│       └── edit.tsx         ← Edit profile screen
└── modal.tsx                ← Modal screen (in root Stack)`}
      />

      <InfoBox variant="info" title="How nesting works">
        Think of it like nested HTML templates. The root layout is the outer shell. The tab
        layout sits inside it. And a profile stack sits inside one of the tabs. Each layout
        only controls its direct children — just like CSS scoping.
      </InfoBox>

      {/* ===== 5. Stack Navigation ===== */}
      <h2 className="text-2xl font-heading font-bold text-text mt-16 mb-4">
        Stack Navigation
      </h2>

      <p className="text-text-muted leading-relaxed mb-4">
        Stack navigation is the most fundamental navigation pattern on mobile. Picture a
        stack of papers on a desk. When you go to a new screen, a new sheet of paper is
        placed on top (<strong className="text-text">push</strong>). When you go back, the
        top sheet is removed (<strong className="text-text">pop</strong>), revealing the
        screen underneath.
      </p>

      <p className="text-text-muted leading-relaxed mb-4">
        On the web, this is like the browser's history stack — clicking a link pushes a new
        entry, clicking Back pops it. The difference is that on mobile, the transition is
        animated (the new screen slides in from the right) and the user can swipe from the
        left edge to go back.
      </p>

      <h3 className="text-xl font-heading font-semibold text-text mt-10 mb-3">
        Stack Layout with Screen Options
      </h3>

      <CodeBlock
        language="tsx"
        title="app/_layout.tsx — Stack with screen options"
        code={`import { Stack } from 'expo-router';

export default function RootLayout(): React.ReactElement {
  return (
    <Stack
      screenOptions={{
        // These options apply to ALL screens in this Stack
        headerStyle: {
          backgroundColor: '#1e1b4b',       // header background color
        },
        headerTintColor: '#fff',             // back button & title color
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        animation: 'slide_from_right',       // transition animation
      }}
    >
      {/* Override options for specific screens */}
      <Stack.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: true,           // show the header bar
        }}
      />
      <Stack.Screen
        name="about"
        options={{
          title: 'About Us',
          animation: 'fade',           // override: fade instead of slide
        }}
      />
      <Stack.Screen
        name="modal"
        options={{
          presentation: 'modal',       // slide up from bottom like a modal
          headerShown: false,          // hide the header for this screen
        }}
      />
    </Stack>
  );
}`}
      />

      <h3 className="text-xl font-heading font-semibold text-text mt-10 mb-3">
        Stack.Screen Configuration
      </h3>

      <p className="text-text-muted leading-relaxed mb-4">
        You can configure each screen in two places: inside the layout file (as shown above)
        or inside the screen file itself. Configuring inside the screen file is useful when
        the options depend on that screen's data:
      </p>

      <CodeBlock
        language="tsx"
        title="app/user/[id].tsx — configuring screen options from the screen"
        code={`import { Stack, useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

export default function UserDetailScreen(): React.ReactElement {
  // Get the dynamic 'id' from the URL — like req.params.id in Express
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* Set this screen's options from WITHIN the screen */}
      <Stack.Screen
        options={{
          title: \`User #\${id}\`,            // dynamic title based on the route param
          headerRight: () => (             // add a button to the right side of the header
            <Text style={{ color: '#6366f1' }}>Edit</Text>
          ),
        }}
      />
      <Text>Viewing user {id}</Text>
    </View>
  );
}`}
      />

      <h3 className="text-xl font-heading font-semibold text-text mt-10 mb-3">
        Key Screen Options for Stack
      </h3>

      <p className="text-text-muted leading-relaxed mb-4">
        Here is a reference of the most important options you can pass to a Stack screen:
      </p>

      <CodeBlock
        language="tsx"
        title="Stack screenOptions reference"
        code={`// All available screenOptions for Stack navigator
const screenOptions = {
  // Header
  title: 'Screen Title',                // text shown in the header
  headerShown: true,                     // show or hide the header bar (default: true)
  headerTitle: 'Custom Title',           // override the header title text
  headerTitleAlign: 'center',            // 'left' or 'center'
  headerLeft: () => <CustomBackButton />,   // custom left header component
  headerRight: () => <SettingsIcon />,      // custom right header component
  headerStyle: { backgroundColor: '#fff' }, // style the header bar
  headerTintColor: '#000',               // color of back button and title
  headerTitleStyle: { fontWeight: 'bold' }, // style the title text
  headerTransparent: false,              // make header transparent (overlays content)
  headerBackTitle: 'Back',               // text next to the back arrow (iOS)
  headerBackVisible: true,               // show/hide the back arrow

  // Presentation
  presentation: 'card',     // 'card' = normal push, 'modal' = slides up from bottom,
                             // 'transparentModal' = modal with transparent background

  // Animation
  animation: 'slide_from_right',   // 'slide_from_right', 'slide_from_left',
                                    // 'slide_from_bottom', 'fade', 'none'
  animationDuration: 350,           // animation duration in ms

  // Gestures
  gestureEnabled: true,             // allow swipe-to-go-back (default: true)
  gestureDirection: 'horizontal',   // 'horizontal' or 'vertical' (for modals)
  fullScreenGestureEnabled: false,  // swipe from anywhere, not just the edge

  // Status bar
  statusBarStyle: 'dark',           // 'dark' or 'light' — controls status bar text color
  statusBarColor: '#fff',           // Android status bar background color
};`}
      />

      <InfoBox variant="warning" title="presentation: 'modal'">
        When you set <code>presentation: 'modal'</code>, the screen slides up from the
        bottom instead of from the right. On iOS, the previous screen shrinks slightly to
        create a "card stack" effect. Modals do NOT get a back arrow by default — you
        need to add your own close button.
      </InfoBox>

      {/* ===== 6. Tab Navigation ===== */}
      <h2 className="text-2xl font-heading font-bold text-text mt-16 mb-4">
        Tab Navigation
      </h2>

      <p className="text-text-muted leading-relaxed mb-4">
        Tab navigation puts a bar at the bottom of the screen with icons and labels. Each
        tab shows a different section of your app. This is the most recognizable mobile
        pattern — virtually every major app uses it. On the web, the closest equivalent is a
        persistent top navigation bar that switches between different "pages" without a full
        reload.
      </p>

      <h3 className="text-xl font-heading font-semibold text-text mt-10 mb-3">
        Setting Up Tabs with a (tabs) Group
      </h3>

      <p className="text-text-muted leading-relaxed mb-4">
        In Expo Router, you create tabs by making a folder wrapped in parentheses:{' '}
        <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">(tabs)</code>. The parentheses
        tell Expo Router "this is a group — don't include the folder name in the URL."
        Inside this folder, add a <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">_layout.tsx</code> with
        a <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">&lt;Tabs&gt;</code> navigator and
        one file per tab.
      </p>

      <CodeBlock
        language="bash"
        title="Typical tabs folder structure"
        showLineNumbers={false}
        code={`app/
├── _layout.tsx          ← Root layout (Stack)
├── (tabs)/
│   ├── _layout.tsx      ← Tab layout (defines the tab bar)
│   ├── index.tsx        ← First tab: Home (URL: /)
│   ├── explore.tsx      ← Second tab: Explore (URL: /explore)
│   └── profile.tsx      ← Third tab: Profile (URL: /profile)
└── settings.tsx         ← NOT a tab — normal Stack screen (/settings)`}
      />

      <InfoBox variant="info" title="Why (tabs) and not just tabs/?">
        The parentheses in <code>(tabs)</code> create a <strong>route group</strong>. The folder
        name is stripped from the URL. So <code>app/(tabs)/explore.tsx</code> maps to{' '}
        <code>/explore</code>, NOT <code>/tabs/explore</code>. This lets you organize your
        files without polluting your URL structure.
      </InfoBox>

      <h3 className="text-xl font-heading font-semibold text-text mt-10 mb-3">
        Customizing the Tab Bar
      </h3>

      <CodeBlock
        language="tsx"
        title="app/(tabs)/_layout.tsx — full tab bar customization"
        code={`import { Tabs } from 'expo-router';
import { Home, Search, User, Bell } from 'lucide-react-native';

export default function TabLayout(): React.ReactElement {
  return (
    <Tabs
      screenOptions={{
        // Tab bar styling
        tabBarStyle: {
          backgroundColor: '#0f172a',    // dark background
          borderTopColor: '#1e293b',     // subtle top border
          height: 88,                    // taller tab bar
          paddingBottom: 28,             // padding for home indicator (iPhone)
          paddingTop: 8,
        },

        // Tab colors
        tabBarActiveTintColor: '#818cf8',   // active tab: purple
        tabBarInactiveTintColor: '#64748b', // inactive tab: gray

        // Tab label styling
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },

        // Header styling (shared across all tabs)
        headerStyle: { backgroundColor: '#0f172a' },
        headerTintColor: '#f8fafc',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }: { color: string; size: number }): React.ReactElement => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }: { color: string; size: number }): React.ReactElement => <Search size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Alerts',
          tabBarIcon: ({ color, size }: { color: string; size: number }): React.ReactElement => <Bell size={size} color={color} />,
          tabBarBadge: 3,   // shows a red badge with "3" on the tab icon
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }: { color: string; size: number }): React.ReactElement => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}`}
      />

      <p className="text-text-muted leading-relaxed mb-4">
        The <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">tabBarBadge</code> prop
        shows a small red circle with a number on the tab icon — perfect for notification
        counts. You can set it to a number or a string. Set it to{' '}
        <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">undefined</code> to hide it.
      </p>

      {/* ===== 7. Screen Options ===== */}
      <h2 className="text-2xl font-heading font-bold text-text mt-16 mb-4">
        Screen Options — Complete Reference
      </h2>

      <p className="text-text-muted leading-relaxed mb-4">
        Screen options control how a screen looks and behaves. You can set them in three
        places — and they merge together, with more specific ones winning:
      </p>

      <ol className="list-decimal list-inside text-text-muted leading-relaxed mb-4 space-y-2 ml-2">
        <li><strong className="text-text">screenOptions on the navigator</strong> — applies to ALL screens in that navigator</li>
        <li><strong className="text-text">options on Stack.Screen / Tabs.Screen</strong> — applies to one specific screen, set from the layout</li>
        <li><strong className="text-text">options from within the screen</strong> — set dynamically using <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">&lt;Stack.Screen options={'{...}'} /&gt;</code> inside the screen component</li>
      </ol>

      <h3 className="text-xl font-heading font-semibold text-text mt-10 mb-3">
        Header Options
      </h3>

      <CodeBlock
        language="tsx"
        title="Header configuration examples"
        code={`// In a layout file
<Stack.Screen
  name="profile"
  options={{
    // Basic header
    title: 'My Profile',               // header title text
    headerShown: true,                  // show/hide the entire header

    // Custom title component
    headerTitle: (): React.ReactElement => (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={logo} style={{ width: 30, height: 30 }} />
        <Text style={{ marginLeft: 8, fontWeight: 'bold' }}>My App</Text>
      </View>
    ),

    // Left and right buttons
    headerLeft: (): React.ReactElement => (
      <TouchableOpacity onPress={(): void => router.back()}>
        <ArrowLeft size={24} color="#000" />
      </TouchableOpacity>
    ),
    headerRight: (): React.ReactElement => (
      <TouchableOpacity onPress={(): void => alert('Settings!')}>
        <Settings size={24} color="#000" />
      </TouchableOpacity>
    ),

    // Header styling
    headerStyle: {
      backgroundColor: '#6366f1',       // purple header background
    },
    headerTintColor: '#ffffff',          // white text and icons
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 18,
    },
    headerShadowVisible: false,          // remove the bottom shadow/border
    headerTransparent: false,            // transparent header (overlays content)
  }}
/>`}
      />

      <h3 className="text-xl font-heading font-semibold text-text mt-10 mb-3">
        Presentation and Animation Options
      </h3>

      <CodeBlock
        language="tsx"
        title="Presentation and animation options"
        code={`<Stack.Screen
  name="modal-screen"
  options={{
    // Presentation mode
    presentation: 'card',              // default: slides in from right
    // presentation: 'modal',          // slides up from bottom
    // presentation: 'transparentModal', // modal with see-through background
    // presentation: 'containedModal', // modal within the current navigator
    // presentation: 'containedTransparentModal',
    // presentation: 'fullScreenModal', // full-screen modal (iOS)
    // presentation: 'formSheet',       // iOS form sheet style

    // Animation
    animation: 'slide_from_right',     // default
    // animation: 'slide_from_left',
    // animation: 'slide_from_bottom',
    // animation: 'fade',
    // animation: 'fade_from_bottom',   // fade + slide from bottom
    // animation: 'flip',               // iOS card flip
    // animation: 'simple_push',        // simpler push animation
    // animation: 'none',               // instant, no animation

    animationDuration: 350,             // how long the animation takes (ms)

    // Gestures
    gestureEnabled: true,               // can user swipe to go back?
    gestureDirection: 'horizontal',     // swipe direction ('horizontal' or 'vertical')
    fullScreenGestureEnabled: false,    // swipe from anywhere (not just edge)
  }}
/>`}
      />

      <h3 className="text-xl font-heading font-semibold text-text mt-10 mb-3">
        Tab Bar Options
      </h3>

      <CodeBlock
        language="tsx"
        title="Tab bar options for Tabs.Screen"
        code={`<Tabs.Screen
  name="home"
  options={{
    // Tab bar icon — receives color and size from the navigator
    tabBarIcon: ({ color, size, focused }: { color: string; size: number; focused: boolean }): React.ReactElement => (
      <Home
        size={size}
        color={color}
        strokeWidth={focused ? 2.5 : 1.5}  // bolder when selected
      />
    ),

    // Tab bar label
    tabBarLabel: 'Home',                   // text under the icon
    tabBarShowLabel: true,                 // show or hide the label

    // Tab bar badge (notification count)
    tabBarBadge: 5,                        // red badge with "5"
    tabBarBadgeStyle: {
      backgroundColor: '#ef4444',          // badge background color
    },

    // Visibility
    tabBarButton: (props) => <TouchableOpacity {...props} />,  // custom tab button
    href: null,  // setting href to null HIDES this tab from the tab bar
                 // useful for screens you want in the tab navigator
                 // but not visible as a tab
  }}
/>`}
      />

      <h3 className="text-xl font-heading font-semibold text-text mt-10 mb-3">
        Setting Options Dynamically
      </h3>

      <p className="text-text-muted leading-relaxed mb-4">
        Sometimes you need to set screen options based on data that is only available inside
        the screen — for example, showing a user's name as the header title. You can do this
        with <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">navigation.setOptions()</code>:
      </p>

      <CodeBlock
        language="tsx"
        title="Setting options dynamically inside a screen"
        code={`import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useNavigation, useLocalSearchParams } from 'expo-router';

interface User {
  name: string;
}

export default function UserScreen(): React.ReactElement {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);

  useEffect((): void => {
    // Fetch user data...
    fetchUser(id).then((data: User): void => {
      setUser(data);

      // Update the header title AFTER we have the user's name
      navigation.setOptions({
        title: data.name,
        headerRight: (): React.ReactElement => (
          <Text style={{ color: '#6366f1' }}>Follow</Text>
        ),
      });
    });
  }, [id]);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>{user?.name ?? 'Loading...'}</Text>
    </View>
  );
}`}
      />

      <InfoBox variant="tip" title="Static vs Dynamic options">
        Use <strong>static options</strong> (in the layout file) when the values are known
        ahead of time — like a title of "Settings" or hiding the header. Use{' '}
        <strong>dynamic options</strong> (with setOptions) when you need data from the
        screen itself — like a user's name from an API call.
      </InfoBox>

      {/* ===== 8. Dynamic Routes ===== */}
      <h2 className="text-2xl font-heading font-bold text-text mt-16 mb-4">
        Dynamic Routes
      </h2>

      <p className="text-text-muted leading-relaxed mb-4">
        On the web, if you have built an Express server, you know about route parameters:{' '}
        <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">app.get('/user/:id', handler)</code>.
        The <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">:id</code> part matches any value — <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">/user/42</code>, <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">/user/abc</code>,
        etc. — and you read it with <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">req.params.id</code>.
      </p>

      <p className="text-text-muted leading-relaxed mb-4">
        Expo Router does the same thing with <strong className="text-text">square brackets</strong> in
        the file name. A file called <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">[id].tsx</code> matches
        any value in that URL segment.
      </p>

      <h3 className="text-xl font-heading font-semibold text-text mt-10 mb-3">
        Single Dynamic Segment
      </h3>

      <CodeBlock
        language="tsx"
        title="app/user/[id].tsx — dynamic route"
        code={`import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

// This file matches: /user/1, /user/42, /user/abc, etc.
// The [id] in the filename becomes a parameter you can read.
export default function UserDetailScreen(): React.ReactElement {
  // useLocalSearchParams reads the dynamic segment from the URL
  // This is like req.params in Express
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <Text style={styles.detail}>User ID: {id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  detail: { fontSize: 16, color: '#666' },
});`}
      />

      <p className="text-text-muted leading-relaxed mb-4">
        You can have multiple dynamic segments too. A file at{' '}
        <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">app/shop/[category]/[product].tsx</code> would
        match <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">/shop/electronics/iphone</code> and give you
        both <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">category</code> and <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">product</code> as
        parameters.
      </p>

      <h3 className="text-xl font-heading font-semibold text-text mt-10 mb-3">
        Catch-All Routes
      </h3>

      <p className="text-text-muted leading-relaxed mb-4">
        Sometimes you need a route that matches <em>any number</em> of URL segments. For
        example, a documentation page where the URL can be <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">/docs/intro</code>,{' '}
        <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">/docs/guides/setup</code>, or <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">/docs/api/v2/users</code>.
        The <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">[...rest].tsx</code> catch-all syntax handles this:
      </p>

      <CodeBlock
        language="tsx"
        title="app/docs/[...rest].tsx — catch-all route"
        code={`import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

// This file matches ANY path under /docs/:
//   /docs/intro           → rest = ['intro']
//   /docs/guides/setup    → rest = ['guides', 'setup']
//   /docs/api/v2/users    → rest = ['api', 'v2', 'users']
export default function DocsScreen(): React.ReactElement {
  // rest is an ARRAY of all the segments
  const { rest } = useLocalSearchParams<{ rest: string[] }>();

  // Join them to reconstruct the path
  const path: string = Array.isArray(rest) ? rest.join('/') : rest;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
        Docs: {path}
      </Text>
    </View>
  );
}`}
      />

      <InfoBox variant="info" title="Web comparison">
        <code>[id].tsx</code> is like Express's <code>/user/:id</code> — matches one segment.
        <br />
        <code>[...rest].tsx</code> is like Express's <code>/docs/*</code> or Next.js's{' '}
        <code>[...slug].tsx</code> — matches one or more segments. The key difference is that
        the catch-all gives you an <strong>array</strong> of matched segments, not a single string.
      </InfoBox>

      {/* ===== 9. Route Groups ===== */}
      <h2 className="text-2xl font-heading font-bold text-text mt-16 mb-4">
        Route Groups
      </h2>

      <p className="text-text-muted leading-relaxed mb-4">
        Route groups let you organize your files into folders <strong className="text-text">without
        affecting the URL</strong>. You create a group by wrapping the folder name in
        parentheses: <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">(groupName)</code>.
        The folder name is completely invisible in the URL — it is purely for organization
        and for applying different layouts to different sets of screens.
      </p>

      <h3 className="text-xl font-heading font-semibold text-text mt-10 mb-3">
        Authentication Group Example
      </h3>

      <p className="text-text-muted leading-relaxed mb-4">
        A very common pattern is to separate your app into two groups: one for authenticated
        screens (the main app) and one for auth screens (login, signup, forgot password).
        Each group gets its own layout:
      </p>

      <CodeBlock
        language="bash"
        title="Auth group structure"
        showLineNumbers={false}
        code={`app/
├── _layout.tsx            ← Root layout (checks if user is logged in)
├── (auth)/
│   ├── _layout.tsx        ← Auth layout (no header, no tabs, just a plain stack)
│   ├── login.tsx          ← Login screen  (URL: /login — NOT /auth/login)
│   ├── signup.tsx         ← Signup screen (URL: /signup)
│   └── forgot.tsx         ← Forgot password (URL: /forgot)
└── (app)/
    ├── _layout.tsx        ← App layout (tabs, header, etc.)
    ├── index.tsx           ← Home screen (URL: /)
    ├── explore.tsx         ← Explore screen (URL: /explore)
    └── profile.tsx         ← Profile screen (URL: /profile)`}
      />

      <p className="text-text-muted leading-relaxed mb-4">
        Notice: the URLs for screens in the <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">(auth)</code> group
        do NOT include <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">/auth/</code>. The
        login screen is at <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">/login</code>, not{' '}
        <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">/auth/login</code>. The parentheses
        tell Expo Router to ignore the folder name in the URL.
      </p>

      <CodeBlock
        language="tsx"
        title="app/(auth)/_layout.tsx — layout for auth screens"
        code={`import { Stack } from 'expo-router';

// This layout wraps ONLY the auth screens (login, signup, forgot).
// It uses a plain Stack with no header — just clean, simple screens.
export default function AuthLayout(): React.ReactElement {
  return (
    <Stack
      screenOptions={{
        headerShown: false,        // no header on auth screens
        animation: 'fade',         // subtle fade between auth screens
      }}
    />
  );
}`}
      />

      <h3 className="text-xl font-heading font-semibold text-text mt-10 mb-3">
        Common Route Group Use Cases
      </h3>

      <ul className="list-disc list-inside text-text-muted leading-relaxed mb-4 space-y-2 ml-2">
        <li><code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">(tabs)</code> — group screens that share a bottom tab bar</li>
        <li><code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">(auth)</code> — group login/signup screens that share a headerless layout</li>
        <li><code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">(app)</code> — group main app screens that require authentication</li>
        <li><code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">(onboarding)</code> — group first-time user walkthrough screens</li>
        <li><code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">(settings)</code> — group settings-related screens that share a settings header</li>
      </ul>

      <InfoBox variant="tip" title="Groups are for layout control">
        Route groups do two things: they let you organize files into logical folders, and
        they let you apply different <code>_layout.tsx</code> files to different sets of
        screens. They never affect the URL. Think of them as invisible folders that only exist
        for developer convenience and layout scoping.
      </InfoBox>

      {/* ===== 10. Linking and Navigation ===== */}
      <h2 className="text-2xl font-heading font-bold text-text mt-16 mb-4">
        Linking and Navigation
      </h2>

      <p className="text-text-muted leading-relaxed mb-4">
        On the web, you navigate between pages using anchor tags:{' '}
        <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">&lt;a href="/about"&gt;About&lt;/a&gt;</code>.
        In Expo Router, you have two ways to navigate: the{' '}
        <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">&lt;Link&gt;</code> component
        (declarative — like an anchor tag) and the{' '}
        <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">useRouter</code> hook
        (programmatic — like <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">window.location</code> in
        JavaScript).
      </p>

      <h3 className="text-xl font-heading font-semibold text-text mt-10 mb-3">
        The Link Component (Declarative)
      </h3>

      <p className="text-text-muted leading-relaxed mb-4">
        The <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">&lt;Link&gt;</code> component
        is the simplest way to navigate. It works just like an anchor tag on the web — you
        put it in your JSX, give it an <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">href</code>,
        and the user taps it to navigate.
      </p>

      <CodeBlock
        language="tsx"
        title="Navigation with the Link component"
        code={`import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen(): React.ReactElement {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Home</Text>

      {/* Basic link — like <a href="/about"> on the web */}
      <Link href="/about">
        <Text style={{ color: '#6366f1', marginTop: 16 }}>
          Go to About
        </Text>
      </Link>

      {/* Link to a dynamic route */}
      <Link href="/user/42">
        <Text style={{ color: '#6366f1', marginTop: 12 }}>
          View User #42
        </Text>
      </Link>

      {/* Link with replace — replaces the current screen instead of pushing.
          Like window.location.replace() on the web —
          the user can't go "back" to this screen. */}
      <Link href="/onboarding" replace>
        <Text style={{ color: '#6366f1', marginTop: 12 }}>
          Start Onboarding (replace)
        </Text>
      </Link>

      {/* Link that opens as a modal */}
      <Link href="/modal" push>
        <Text style={{ color: '#6366f1', marginTop: 12 }}>
          Open Modal
        </Text>
      </Link>
    </View>
  );
}`}
      />

      <h3 className="text-xl font-heading font-semibold text-text mt-10 mb-3">
        The useRouter Hook (Programmatic)
      </h3>

      <p className="text-text-muted leading-relaxed mb-4">
        Sometimes you need to navigate in response to something other than a tap — for
        example, after a form submission, after a timer, or based on a condition. The{' '}
        <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">useRouter</code> hook gives
        you a <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">router</code> object with
        methods for programmatic navigation. This is like using{' '}
        <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">window.location.href = '...'</code> or{' '}
        <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">history.pushState()</code> in
        vanilla JavaScript.
      </p>

      <CodeBlock
        language="tsx"
        title="Programmatic navigation with useRouter"
        code={`import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen(): React.ReactElement {
  const router = useRouter();

  const handleLogin = async (): Promise<void> => {
    try {
      await loginUser(email, password);

      // Navigate after successful login
      // router.push() — adds to the stack (user can go back)
      router.push('/dashboard');

      // router.replace() — replaces current screen (no going back)
      // Good for login → dashboard transitions
      router.replace('/dashboard');

    } catch (error) {
      Alert.alert('Login failed');
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* ... login form ... */}

      <TouchableOpacity onPress={handleLogin}>
        <Text>Log In</Text>
      </TouchableOpacity>

      {/* Go back to the previous screen */}
      <TouchableOpacity onPress={() => router.back()}>
        <Text>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}`}
      />

      <h3 className="text-xl font-heading font-semibold text-text mt-10 mb-3">
        All Router Methods
      </h3>

      <CodeBlock
        language="tsx"
        title="useRouter() — complete API reference"
        code={`import { useRouter } from 'expo-router';

const router = useRouter();

// Push a new screen onto the stack (user can go back)
// Like clicking a link on the web — history grows
router.push('/about');
router.push('/user/42');
router.push({ pathname: '/user/[id]', params: { id: '42' } });

// Replace the current screen (user CANNOT go back to previous)
// Like window.location.replace() — history entry is swapped
router.replace('/dashboard');

// Go back to the previous screen
// Like window.history.back()
router.back();

// Check if there is a screen to go back to
// Like checking window.history.length
router.canGoBack();

// Navigate to a route, resetting the entire stack
// Like navigating to a completely new website — starts fresh
router.dismissAll();

// Dismiss the current modal or screen
router.dismiss();

// Set params on the current screen without navigating
router.setParams({ sort: 'newest' });`}
      />

      <h3 className="text-xl font-heading font-semibold text-text mt-10 mb-3">
        When to Use Link vs useRouter
      </h3>

      <p className="text-text-muted leading-relaxed mb-4">
        The rule of thumb is simple:
      </p>

      <ul className="list-disc list-inside text-text-muted leading-relaxed mb-4 space-y-2 ml-2">
        <li>
          <strong className="text-text">Use &lt;Link&gt;</strong> when the navigation is
          triggered by a tap on a visible element — a button, a list item, a card. This
          is the most common case. It is declarative, easy to read, and accessible.
        </li>
        <li>
          <strong className="text-text">Use useRouter</strong> when the navigation happens
          as a <em>side effect</em> — after a form submission, after data loads, after a
          timeout, or based on a condition. You need JavaScript logic to decide <em>when</em> and{' '}
          <em>where</em> to navigate.
        </li>
      </ul>

      <InfoBox variant="tip" title="Web analogy">
        <code>&lt;Link href="/about"&gt;</code> is the Expo equivalent of{' '}
        <code>&lt;a href="/about"&gt;</code> in HTML.<br />
        <code>router.push('/about')</code> is the Expo equivalent of{' '}
        <code>window.location.href = '/about'</code> in JavaScript.<br />
        <code>router.replace('/about')</code> is like{' '}
        <code>window.location.replace('/about')</code>.<br />
        <code>router.back()</code> is like <code>window.history.back()</code>.
      </InfoBox>

      <InfoBox variant="fun" title="You already know this">
        If you have built a website with anchor tags and <code>window.location</code>,
        you already understand 90% of Expo Router navigation. The concepts are identical —
        files map to routes, links navigate between them, and there is a history stack. The
        only new part is the native mobile animations and gestures that happen automatically.
      </InfoBox>
    </PageShell>
  )
}
