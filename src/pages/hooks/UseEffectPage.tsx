import { useState, useEffect } from 'react'
import { PageShell } from '../../components/PageShell'
import { HooksSidebar } from '../../components/HooksSidebar'
import { CodeBlock } from '../../components/CodeBlock'
import { InfoBox } from '../../components/InfoBox'
import { DemoBox } from '../../components/DemoBox'

export function UseEffectPage() {
  const [time, setTime] = useState(new Date())
  const [clockRunning, setClockRunning] = useState(true)

  useEffect(() => {
    if (!clockRunning) return

    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    // Cleanup function — runs when the component unmounts or before re-running
    return () => clearInterval(interval)
  }, [clockRunning])

  return (
    <PageShell
      title="useEffect"
      subtitle="Run code in response to changes — fetch data, start timers, subscribe to events, and clean up after yourself."
      gradient="from-cyan to-info"
      badge="REACT HOOK"
      breadcrumbs={[{ label: 'Hooks' }, { label: 'useEffect' }]}
      sidebar={<HooksSidebar />}
    >
      {/* What are side effects? */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">What are Side Effects?</h2>
        <p className="text-text-muted leading-relaxed">
          In React, a component's main job is to <strong className="text-text">return JSX</strong> — to describe what should appear on screen.
          But sometimes you need to do things <em>outside</em> of rendering:
        </p>
        <ul className="list-disc list-inside text-text-muted space-y-1 ml-2">
          <li>Fetch data from an API</li>
          <li>Start a timer or interval</li>
          <li>Listen for keyboard or window events</li>
          <li>Update the document title</li>
          <li>Connect to a WebSocket</li>
        </ul>
        <p className="text-text-muted leading-relaxed">
          These are called <strong className="text-text">side effects</strong> because they happen <em>beside</em> the main rendering.
          In vanilla JavaScript, you might put this code anywhere. In React, you put it inside <code className="text-accent">useEffect</code>.
        </p>

        <InfoBox variant="info" title="Why not just put code outside the return?">
          Code at the top level of your component function runs on <em>every single render</em>.
          <code className="text-accent">useEffect</code> gives you control over <em>when</em> the code runs and how to clean it up.
        </InfoBox>
      </section>

      {/* Syntax */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">Syntax</h2>
        <CodeBlock
          code={`import { useEffect } from 'react';

useEffect(() => {
  // This code runs AFTER the component renders

  // Optional: return a cleanup function
  return () => {
    // This runs when the component unmounts,
    // or before the effect re-runs
  };
}, [dependency1, dependency2]);  // The dependency array`}
          language="tsx"
          title="useEffect anatomy"
        />

        <h3 className="text-lg font-heading font-semibold text-text mt-6">The Dependency Array</h3>
        <p className="text-text-muted leading-relaxed">
          The second argument controls <em>when</em> the effect runs:
        </p>
        <CodeBlock
          code={`// 1. No dependency array — runs after EVERY render
useEffect(() => {
  console.log('I run on every single render');
});

// 2. Empty array — runs ONCE after the first render (mount)
useEffect(() => {
  console.log('I run only on mount');
  return () => console.log('I run on unmount');
}, []);

// 3. With dependencies — runs when any dependency changes
useEffect(() => {
  console.log('userId changed to:', userId);
  fetchUser(userId);
}, [userId]);`}
          language="tsx"
          title="Dependency array patterns"
        />
      </section>

      {/* Interactive Demo */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">Interactive Demo</h2>

        <DemoBox title="Live Clock with Cleanup">
          <div className="text-center space-y-4">
            <p className="text-4xl font-mono font-bold text-accent">
              {time.toLocaleTimeString()}
            </p>
            <p className="text-sm text-text-muted">
              {clockRunning
                ? 'The clock updates every second using setInterval inside useEffect.'
                : 'Clock paused — the interval has been cleared by the cleanup function.'}
            </p>
            <button
              onClick={() => setClockRunning((prev) => !prev)}
              className={`px-5 py-2.5 rounded-lg font-mono text-sm transition-colors ${
                clockRunning
                  ? 'bg-warning/10 border border-warning/30 text-warning hover:bg-warning/20'
                  : 'bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20'
              }`}
            >
              {clockRunning ? 'Pause Clock' : 'Resume Clock'}
            </button>
          </div>
        </DemoBox>

        <p className="text-text-muted leading-relaxed">
          When you pause the clock, <code className="text-accent">clockRunning</code> changes to <code className="text-accent">false</code>.
          Because <code className="text-accent">clockRunning</code> is in the dependency array, the effect re-runs. The cleanup function from the
          previous effect fires first (clearing the old interval), then the new effect runs — but because <code className="text-accent">clockRunning</code> is
          false, it returns early without creating a new interval.
        </p>

        <CodeBlock
          code={`// The code powering the demo above
const [time, setTime] = useState(new Date());
const [clockRunning, setClockRunning] = useState(true);

useEffect(() => {
  if (!clockRunning) return;  // Don't start an interval if paused

  const interval = setInterval(() => {
    setTime(new Date());
  }, 1000);

  // Cleanup: clear the interval when pausing or unmounting
  return () => clearInterval(interval);
}, [clockRunning]);`}
          language="tsx"
          title="Clock effect code"
        />
      </section>

      {/* React Native equivalent */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">In React Native</h2>
        <p className="text-text-muted leading-relaxed">
          The <code className="text-accent">useEffect</code> hook works exactly the same in React Native.
          A very common pattern is fetching data when a screen mounts:
        </p>
        <CodeBlock
          code={`import { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

export default function UsersScreen() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data on mount
    async function loadUsers() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);  // Empty array = only run on mount

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.email}>{item.email}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: 'center' },
  card: { padding: 16, borderBottomWidth: 1, borderColor: '#eee' },
  name: { fontSize: 16, fontWeight: 'bold' },
  email: { fontSize: 14, color: '#666' },
});`}
          language="tsx"
          title="React Native — fetching data on mount"
        />
      </section>

      {/* Tips */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">Tips and Gotchas</h2>

        <InfoBox variant="warning" title="Always clean up subscriptions and timers">
          If you create an interval, add an event listener, or open a WebSocket inside <code className="text-accent">useEffect</code>,
          return a cleanup function that tears it down. Otherwise you will create memory leaks.
        </InfoBox>

        <InfoBox variant="warning" title="Missing dependencies cause stale closures">
          If your effect uses a variable but it is not in the dependency array, the effect will always see the <em>old</em> value.
          The ESLint rule <code className="text-accent">react-hooks/exhaustive-deps</code> will warn you about this.
        </InfoBox>

        <InfoBox variant="tip" title="Don't fetch data with useEffect in production apps">
          For real applications, use a data-fetching library like <strong>TanStack Query</strong> or <strong>SWR</strong>.
          They handle caching, deduplication, loading states, and error handling far better than manual <code className="text-accent">useEffect</code> + <code className="text-accent">fetch</code>.
        </InfoBox>

        <InfoBox variant="tip" title="You can have multiple useEffects">
          Separate unrelated effects into different <code className="text-accent">useEffect</code> calls. This keeps each one focused and makes your code easier to follow.
        </InfoBox>
      </section>

      {/* Summary */}
      <section className="space-y-4">
        <h2 className="text-2xl font-heading font-bold text-text">Quick Reference</h2>
        <CodeBlock
          code={`// Run on mount + unmount
useEffect(() => {
  const sub = eventEmitter.subscribe(handler);
  return () => sub.unsubscribe();
}, []);

// Run when a value changes
useEffect(() => {
  document.title = \`You have \${count} items\`;
}, [count]);

// Async inside useEffect (you can't make the effect itself async)
useEffect(() => {
  async function fetchData() {
    const res = await fetch(url);
    const json = await res.json();
    setData(json);
  }
  fetchData();
}, [url]);`}
          language="tsx"
          title="Common useEffect patterns"
        />
      </section>
    </PageShell>
  )
}
