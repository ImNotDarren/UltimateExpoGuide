import { PageShell } from '../../components/PageShell'
import { HooksSidebar } from '../../components/HooksSidebar'
import { CodeBlock } from '../../components/CodeBlock'
import { InfoBox } from '../../components/InfoBox'

export function UseSegmentsPage() {
  return (
    <PageShell
      title="useSegments"
      subtitle="Returns the current URL path as an array of segments — like pathname.split('/') but built into Expo Router."
      gradient="from-pink to-orange"
      badge="EXPO ROUTER"
      breadcrumbs={[{ label: 'Hooks' }, { label: 'useSegments' }]}
      sidebar={<HooksSidebar />}
    >
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-text mb-4">What is useSegments?</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            On the web, if the URL is <code className="text-accent">example.com/user/123/settings</code>, the pathname
            is <code className="text-accent">/user/123/settings</code>. If you wanted each part separately, you'd
            do <code className="text-accent">pathname.split('/').filter(Boolean)</code> to get
            <code className="text-accent"> ['user', '123', 'settings']</code>.
          </p>
          <p className="text-text-muted leading-relaxed mb-4">
            The <code className="text-accent">useSegments</code> hook does exactly this — it gives you the current
            route as an array of strings, where each element is one "segment" of the path. It's a convenience hook
            that saves you from doing the split yourself, and it updates automatically whenever the user navigates.
          </p>
          <CodeBlock
            title="Basic usage"
            code={`import { useSegments } from 'expo-router';
import { View, Text } from 'react-native';

export default function DebugScreen() {
  // Returns an array of path segments
  const segments = useSegments();

  // If the current route is /user/123/settings:
  // segments = ['user', '123', 'settings']

  // If the current route is /:
  // segments = []

  return (
    <View style={{ padding: 20 }}>
      <Text>Current segments:</Text>
      {segments.map((segment, index) => (
        <Text key={index}>
          [{index}]: {segment}
        </Text>
      ))}
    </View>
  );
}`}
          />
          <p className="text-text-muted leading-relaxed">
            The <code className="text-accent">.map()</code> method works just like it does in regular JavaScript — it
            loops over each item in the array and returns JSX for each one. React uses this pattern instead of
            traditional <code className="text-accent">for</code> loops to render lists of items.
          </p>
        </section>

        {/* Route groups */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-text mb-4">Understanding Route Groups</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            In Expo Router, you can group routes using parentheses in folder names. For example,
            <code className="text-accent"> (auth)</code> and <code className="text-accent">(tabs)</code> are "route groups."
            They organize your files but <strong className="text-text">do not appear in the URL</strong>.
          </p>
          <CodeBlock
            title="File structure with route groups"
            language="bash"
            code={`app/
├── (auth)/            # Route group for login-related screens
│   ├── login.tsx      # URL: /login
│   └── signup.tsx     # URL: /signup
├── (tabs)/            # Route group for main app screens
│   ├── home.tsx       # URL: /home
│   ├── search.tsx     # URL: /search
│   └── profile.tsx    # URL: /profile
└── _layout.tsx        # Root layout`}
          />
          <p className="text-text-muted leading-relaxed mb-4">
            Here's the important part: even though route groups don't appear in the URL, <code className="text-accent">useSegments</code>
            <strong className="text-text"> does include them</strong> in the array. This is what makes the auth guard
            pattern possible — you can check which group the user is in.
          </p>
          <CodeBlock
            title="Segments include route groups"
            code={`// If the user is on the login screen (file: app/(auth)/login.tsx)
// URL shows:     /login
// useSegments(): ['(auth)', 'login']

// If the user is on the home screen (file: app/(tabs)/home.tsx)
// URL shows:     /home
// useSegments(): ['(tabs)', 'home']`}
          />
        </section>

        {/* Auth guard pattern */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-text mb-4">Key Use Case: Auth Guard Pattern</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            The most important use case for <code className="text-accent">useSegments</code> is building an
            <strong className="text-text"> authentication guard</strong>. This is code that checks if the user is logged
            in, and if not, redirects them to the login screen. On the web, you might check for a cookie or token
            before loading certain pages — this is the mobile equivalent.
          </p>
          <InfoBox variant="info" title="This is the official pattern">
            The auth guard pattern shown below is the <strong>recommended approach</strong> from Expo's documentation
            for protecting routes. You'll use this in almost every app that has user authentication.
          </InfoBox>
          <CodeBlock
            title="app/_layout.tsx — Root layout with auth guard"
            code={`import { useSegments, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Slot } from 'expo-router';
import { View } from 'react-native';

// Imagine this comes from your auth system
// (we'll use a simple variable for this example)
import { useAuth } from '../hooks/useAuth';

export default function RootLayout() {
  const segments = useSegments();
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    // Check if the user is currently in the (auth) group
    // segments[0] will be '(auth)' if they're on login/signup
    const inAuthGroup = segments[0] === '(auth)';

    if (!isLoggedIn && !inAuthGroup) {
      // User is NOT logged in and NOT on a login/signup screen
      // → Redirect them to login
      router.replace('/login');
    } else if (isLoggedIn && inAuthGroup) {
      // User IS logged in but still on login/signup screen
      // → Redirect them to the main app
      router.replace('/home');
    }
    // If neither condition is true, the user is where
    // they should be — do nothing.
  }, [isLoggedIn, segments]);

  return (
    <View style={{ flex: 1 }}>
      <Slot />
    </View>
  );
}`}
          />
          <p className="text-text-muted leading-relaxed mb-4">
            Let's break down what happens step by step:
          </p>
          <ol className="list-decimal list-inside text-text-muted space-y-2 mb-4">
            <li>The app starts and this layout renders</li>
            <li><code className="text-accent">useSegments()</code> tells us which route group the user is in</li>
            <li><code className="text-accent">useAuth()</code> tells us if they're logged in</li>
            <li>The <code className="text-accent">useEffect</code> runs whenever either of those values change</li>
            <li>If the user isn't logged in and tries to access a protected route, they get redirected to login</li>
            <li>If the user is logged in and lands on the login page, they get redirected to home</li>
          </ol>
          <InfoBox variant="warning" title="Don't forget the dependency array">
            The <code className="text-accent">[isLoggedIn, segments]</code> at the end of <code className="text-accent">useEffect</code> is
            crucial. It tells React to re-run the guard logic whenever the login state or the current route changes.
            Without it, the guard would only check once when the app first loads.
          </InfoBox>
        </section>

        {/* The useAuth hook */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-text mb-4">The useAuth Hook (Supporting Code)</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            The auth guard example above uses a <code className="text-accent">useAuth</code> hook. Here's what a simple
            version of that looks like. In a real app, this would connect to your authentication system (like Firebase
            Auth, Supabase, or your own API).
          </p>
          <CodeBlock
            title="hooks/useAuth.ts — Simple auth hook"
            code={`import { useState, useEffect, createContext, useContext } from 'react';
import type { ReactNode } from 'react';

// A "context" lets you share data across all components
// without passing it through every level manually
type AuthContextType = {
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

// This component wraps your entire app and provides auth state
export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (token: string) => {
    // Save the token (in a real app, use SecureStore)
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// The hook that any component can call to get auth state
export function useAuth() {
  return useContext(AuthContext);
}`}
          />
          <InfoBox variant="tip" title="Don't worry about Context yet">
            The <code className="text-accent">createContext</code> / <code className="text-accent">useContext</code> pattern above is
            an intermediate React concept. For now, just know that it lets any screen in your app access
            <code className="text-accent"> isLoggedIn</code>, <code className="text-accent">login()</code>, and
            <code className="text-accent"> logout()</code> without passing them as props through every component.
          </InfoBox>
        </section>

        {/* Type-safe segments */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-text mb-4">Type-Safe Segments</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            You can use TypeScript to tell <code className="text-accent">useSegments</code> exactly what segments to
            expect. This catches typos and gives you autocomplete in your editor.
          </p>
          <CodeBlock
            title="Typed segments"
            code={`import { useSegments } from 'expo-router';

// Define the possible first segment as a TypeScript type
type FirstSegment = '(auth)' | '(tabs)' | '(settings)';

export default function SomeLayout() {
  // The generic tells TypeScript what the first element can be
  const segments = useSegments<[FirstSegment, ...string[]]>();

  // Now TypeScript knows segments[0] is one of the three values
  if (segments[0] === '(auth)') {
    // handle auth routes
  }

  // TypeScript would error if you wrote:
  // if (segments[0] === '(oops)')  ← typo caught!
}`}
          />
        </section>
      </div>
    </PageShell>
  )
}
