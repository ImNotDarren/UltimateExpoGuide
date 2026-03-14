import { PageShell } from '../../components/PageShell'
import { HooksSidebar } from '../../components/HooksSidebar'
import { CodeBlock } from '../../components/CodeBlock'
import { InfoBox } from '../../components/InfoBox'

export function UseRouterPage() {
  return (
    <PageShell
      title="useRouter"
      subtitle="Expo Router's hook for programmatic navigation — think of it as window.location but designed for mobile apps."
      gradient="from-primary to-cyan"
      badge="EXPO ROUTER"
      breadcrumbs={[{ label: 'Hooks' }, { label: 'useRouter' }]}
      sidebar={<HooksSidebar />}
    >
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-text mb-4">What is useRouter?</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            On the web, when you want to send a user to a different page using JavaScript, you use things like
            <code className="text-accent"> window.location.href = '/dashboard'</code> or
            <code className="text-accent"> window.history.back()</code>. In Expo Router, the equivalent is the
            <code className="text-accent"> useRouter</code> hook. It gives you an object (called <code className="text-accent">router</code>)
            with methods to navigate between screens in your mobile app.
          </p>
          <p className="text-text-muted leading-relaxed mb-4">
            A "hook" in React is simply a special function that starts with <code className="text-accent">use</code>.
            You call it at the top of your component (the function that returns your screen's UI), and it gives you
            back some data or functionality. In this case, <code className="text-accent">useRouter()</code> gives you
            navigation methods.
          </p>
          <CodeBlock
            title="Basic usage"
            code={`import { useRouter } from 'expo-router';

// A component is just a function that returns UI (JSX)
export default function HomeScreen(): React.ReactElement {
  // Call the hook at the top of your component
  const router = useRouter();

  // router now has methods like .push(), .replace(), .back()
  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        title="Go to Settings"
        onPress={() => router.push('/settings')}
      />
    </View>
  );
}`}
          />
          <p className="text-text-muted leading-relaxed">
            In the example above, <code className="text-accent">{'onPress={() => router.push(\'/settings\')}'}</code> is
            like adding a click event listener in JavaScript. When the user taps the button, the app navigates to the
            Settings screen. The JSX tags like <code className="text-accent">{'<View>'}</code> and <code className="text-accent">{'<Text>'}</code> are
            React Native's equivalents of <code className="text-accent">{'<div>'}</code> and <code className="text-accent">{'<span>'}</code> in HTML.
          </p>
        </section>

        {/* router.push */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-text mb-4">router.push()</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            <code className="text-accent">router.push()</code> navigates to a new screen and adds it to the navigation
            stack. Think of the "stack" like your browser's history — each new page is added on top, and
            the back button takes you to the previous one.
          </p>
          <p className="text-text-muted leading-relaxed mb-4">
            <strong className="text-text">Web equivalent:</strong> <code className="text-accent">window.location.href = '/new-page'</code> — it takes you to a new page, and the browser's
            back button still works.
          </p>
          <CodeBlock
            title="Pushing to a new screen"
            code={`// Navigate to a simple route
router.push('/profile');

// Navigate with a URL parameter (like /user?name=Darren)
router.push('/user?name=Darren');

// Navigate to a dynamic route (like /product/42)
router.push('/product/42');

// You can also pass an object for more control
router.push({
  pathname: '/product/[id]',
  params: { id: '42' },
});`}
          />
        </section>

        {/* router.replace */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-text mb-4">router.replace()</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            <code className="text-accent">router.replace()</code> navigates to a new screen but <strong className="text-text">replaces</strong> the
            current screen in the stack instead of adding a new one on top. The user cannot press the back button
            to return to the screen that was replaced.
          </p>
          <p className="text-text-muted leading-relaxed mb-4">
            <strong className="text-text">Web equivalent:</strong> <code className="text-accent">window.location.replace('/new-page')</code> — it
            replaces the current entry in the browser history, so clicking back skips over it.
          </p>
          <CodeBlock
            title="Replacing the current screen"
            code={`// After login, replace the login screen with home
// so the user can't press "back" to go to login again
router.replace('/home');

// Replace with params
router.replace({
  pathname: '/dashboard',
  params: { tab: 'overview' },
});`}
          />
          <InfoBox variant="tip" title="When to use replace">
            Use <code className="text-accent">replace()</code> after login/signup flows, splash screens, or onboarding.
            You don't want the user to press "back" and end up on those screens again.
          </InfoBox>
        </section>

        {/* router.back */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-text mb-4">router.back()</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            <code className="text-accent">router.back()</code> goes to the previous screen — exactly like pressing the
            back button.
          </p>
          <p className="text-text-muted leading-relaxed mb-4">
            <strong className="text-text">Web equivalent:</strong> <code className="text-accent">window.history.back()</code>
          </p>
          <CodeBlock
            title="Going back"
            code={`// Go back to the previous screen
router.back();`}
          />
        </section>

        {/* router.canGoBack */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-text mb-4">router.canGoBack()</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            Returns <code className="text-accent">true</code> if there is a previous screen in the navigation stack.
            This is useful for conditionally showing a back button — if the user is on the very first screen,
            there's nothing to go back to.
          </p>
          <CodeBlock
            title="Checking if back navigation is possible"
            code={`import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';

export default function DetailScreen(): React.ReactElement {
  const router = useRouter();

  return (
    <View>
      {/* Only show the back button if there's somewhere to go back to */}
      {router.canGoBack() && (
        <TouchableOpacity onPress={() => router.back()}>
          <Text>← Go Back</Text>
        </TouchableOpacity>
      )}
      <Text>Detail Screen</Text>
    </View>
  );
}`}
          />
          <p className="text-text-muted leading-relaxed">
            The <code className="text-accent">{'{router.canGoBack() && (...)}'}</code> syntax is how React does conditional rendering.
            It means "if <code className="text-accent">canGoBack()</code> is true, then render the back button." It's like an <code className="text-accent">if</code> statement but
            inside JSX.
          </p>
        </section>

        {/* router.dismiss */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-text mb-4">router.dismiss()</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            <code className="text-accent">router.dismiss()</code> dismisses the current modal screen. In mobile apps,
            a "modal" is a screen that slides up from the bottom and overlays the previous screen (like a popup dialog
            on the web). Dismiss slides it back down.
          </p>
          <CodeBlock
            title="Dismissing a modal"
            code={`// Dismiss the current modal screen
router.dismiss();

// Dismiss multiple modals at once (go back 2 modal levels)
router.dismiss(2);

// Dismiss all modals and go back to the underlying screen
router.dismissAll();`}
          />
        </section>

        {/* Complete example */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-text mb-4">Complete Example: Login Flow</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            Here's a real-world example: a login flow where the user starts on a login screen, enters their credentials,
            and gets navigated to the home screen. We use <code className="text-accent">replace</code> so the back button
            doesn't take them back to the login screen.
          </p>
          <CodeBlock
            title="app/login.tsx — Login screen"
            code={`import { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TextInput, Button, Alert } from 'react-native';

export default function LoginScreen(): React.ReactElement {
  const router = useRouter();
  // useState creates a variable that React tracks for changes
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async (): Promise<void> => {
    try {
      // Call your API to verify credentials
      const response = await fetch('https://api.example.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // SUCCESS: replace login screen with home
        // Using replace() means the back button won't
        // return to the login screen
        router.replace('/home');
      } else {
        Alert.alert('Error', 'Invalid credentials');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
      />
      <Button title="Log In" onPress={handleLogin} />

      {/* push() here is fine — user might want to go back */}
      <Button
        title="Don't have an account? Sign Up"
        onPress={() => router.push('/signup')}
      />
    </View>
  );
}`}
          />
          <InfoBox variant="info" title="push vs replace — the key difference">
            <strong>push('/signup')</strong> — adds signup on top of login. User can go back to login.
            <br />
            <strong>replace('/home')</strong> — removes login from the stack and puts home in its place. User cannot go back to login.
          </InfoBox>
        </section>

        {/* Summary table */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-text mb-4">Quick Reference</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface border-b border-border">
                  <th className="text-left px-4 py-3 font-heading font-semibold text-text">Method</th>
                  <th className="text-left px-4 py-3 font-heading font-semibold text-text">Web Equivalent</th>
                  <th className="text-left px-4 py-3 font-heading font-semibold text-text">Description</th>
                </tr>
              </thead>
              <tbody className="text-text-muted">
                <tr className="border-b border-border">
                  <td className="px-4 py-3 font-mono text-accent">router.push()</td>
                  <td className="px-4 py-3 font-mono">window.location.href</td>
                  <td className="px-4 py-3">Navigate to a new screen (adds to history)</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-3 font-mono text-accent">router.replace()</td>
                  <td className="px-4 py-3 font-mono">location.replace()</td>
                  <td className="px-4 py-3">Navigate and replace current screen in history</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-3 font-mono text-accent">router.back()</td>
                  <td className="px-4 py-3 font-mono">history.back()</td>
                  <td className="px-4 py-3">Go to the previous screen</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-3 font-mono text-accent">router.canGoBack()</td>
                  <td className="px-4 py-3 font-mono">history.length &gt; 1</td>
                  <td className="px-4 py-3">Check if back navigation is possible</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-accent">router.dismiss()</td>
                  <td className="px-4 py-3 font-mono">closing a modal/popup</td>
                  <td className="px-4 py-3">Dismiss a modal screen</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </PageShell>
  )
}
