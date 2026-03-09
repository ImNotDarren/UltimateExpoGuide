import { useState, useCallback, memo } from 'react'
import { PageShell } from '../../components/PageShell'
import { HooksSidebar } from '../../components/HooksSidebar'
import { CodeBlock } from '../../components/CodeBlock'
import { InfoBox } from '../../components/InfoBox'
import { DemoBox } from '../../components/DemoBox'

// --- Demo child components ---
let withoutCallbackRenderCount = 0
let withCallbackRenderCount = 0

const ChildWithout = memo(function ChildWithout({ onClick }: { onClick: () => void }) {
  withoutCallbackRenderCount++
  return (
    <div className="p-3 rounded-lg bg-warning/10 border border-warning/30">
      <p className="text-sm font-mono text-warning">
        Without useCallback — rendered <strong>{withoutCallbackRenderCount}</strong> times
      </p>
      <button
        onClick={onClick}
        className="mt-2 px-3 py-1 rounded text-xs font-mono bg-warning/20 text-warning hover:bg-warning/30 transition-colors"
      >
        Click me
      </button>
    </div>
  )
})

const ChildWith = memo(function ChildWith({ onClick }: { onClick: () => void }) {
  withCallbackRenderCount++
  return (
    <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
      <p className="text-sm font-mono text-primary">
        With useCallback — rendered <strong>{withCallbackRenderCount}</strong> times
      </p>
      <button
        onClick={onClick}
        className="mt-2 px-3 py-1 rounded text-xs font-mono bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
      >
        Click me
      </button>
    </div>
  )
})

// --- Page component ---
export function UseCallbackPage() {
  const [count, setCount] = useState(0)
  const [, setForceRender] = useState(0)

  // Without useCallback — new function reference every render
  const handleClickWithout = () => {
    setCount((c) => c + 1)
  }

  // With useCallback — same function reference between renders
  const handleClickWith = useCallback(() => {
    setCount((c) => c + 1)
  }, [])

  return (
    <PageShell
      title="useCallback"
      subtitle="Memoize a function so it keeps the same reference between renders — preventing unnecessary re-renders of child components."
      gradient="from-info to-accent"
      badge="REACT HOOK"
      breadcrumbs={[{ label: 'Hooks' }, { label: 'useCallback' }]}
      sidebar={<HooksSidebar />}
    >
      {/* What is useCallback? */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">What is useCallback?</h2>
        <p className="text-text-muted leading-relaxed">
          In JavaScript, every time you write a function expression, you create a <strong className="text-text">brand new function object</strong> — even if the code inside is identical.
          In a React component, this means every render creates new functions:
        </p>
        <CodeBlock
          code={`function Parent() {
  // This creates a NEW function on EVERY render
  const handleClick = () => {
    console.log('clicked');
  };

  // ChildComponent receives a different function reference each time
  return <ChildComponent onClick={handleClick} />;
}`}
          language="tsx"
          title="The problem — new function every render"
        />
        <p className="text-text-muted leading-relaxed">
          Most of the time this is fine. But if the child component is wrapped in <code className="text-accent">React.memo</code> (which skips re-rendering when props have not changed),
          it will still re-render because the function prop is technically a <em>different</em> function each time.
        </p>
        <p className="text-text-muted leading-relaxed">
          <code className="text-accent">useCallback</code> solves this by caching the function and returning the same reference as long as the dependencies have not changed.
        </p>
      </section>

      {/* Syntax */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">Syntax</h2>
        <CodeBlock
          code={`import { useCallback } from 'react';

const memoizedFn = useCallback(
  () => {
    // your function body
    doSomething(a, b);
  },
  [a, b]  // dependencies — the function is re-created only when these change
);`}
          language="tsx"
          title="useCallback syntax"
        />
        <p className="text-text-muted leading-relaxed">
          <code className="text-accent">useCallback(fn, deps)</code> returns the <em>same</em> function reference
          between renders, as long as nothing in the <code className="text-accent">deps</code> array has changed.
          If a dependency changes, React creates a new function (as you would expect).
        </p>
      </section>

      {/* Interactive Demo */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">Interactive Demo</h2>

        <DemoBox title="Render Count Comparison">
          <div className="space-y-4">
            <p className="text-sm text-text-muted">
              Both child components below are wrapped in <code className="text-accent">React.memo</code>.
              Click "Force Parent Re-render" and watch the render counts.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <ChildWithout onClick={handleClickWithout} />
              <ChildWith onClick={handleClickWith} />
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setForceRender((n) => n + 1)}
                className="px-5 py-2.5 rounded-lg bg-accent/10 border border-accent/30 text-accent font-mono text-sm hover:bg-accent/20 transition-colors"
              >
                Force Parent Re-render
              </button>
              <span className="text-sm text-text-muted font-mono">
                Count: <span className="text-accent font-bold">{count}</span>
              </span>
            </div>

            <InfoBox variant="info" title="What's happening?">
              When the parent re-renders, <code className="text-accent">handleClickWithout</code> is a new function reference,
              so the memo'd child re-renders. <code className="text-accent">handleClickWith</code> is the same reference (thanks to useCallback),
              so the memo'd child skips the re-render.
            </InfoBox>
          </div>
        </DemoBox>

        <h3 className="text-lg font-heading font-semibold text-text mt-6">Source Code for the Demo Above</h3>
        <CodeBlock
          code={`import { useState, useCallback, memo } from 'react';

// memo() wraps a component so it only re-renders when its PROPS change.
// But "change" for objects/functions means a new reference — not a new value.

const ChildWithout = memo(function ChildWithout({ onClick }) {
  renderCount++;  // increments on every parent render
  return <button onClick={onClick}>Click me</button>;
});

const ChildWith = memo(function ChildWith({ onClick }) {
  renderCount++;  // only increments when onClick reference changes
  return <button onClick={onClick}>Click me</button>;
});

function Parent() {
  const [count, setCount] = useState(0);

  // ❌ Without useCallback: this creates a NEW function object every render.
  // memo(ChildWithout) sees a different onClick reference each time → re-renders.
  const handleWithout = () => setCount(c => c + 1);

  // ✅ With useCallback: this returns the SAME function reference between renders.
  // memo(ChildWith) sees the same onClick reference → skips re-render.
  // The [] means "never recreate this function" (no dependencies).
  const handleWith = useCallback(() => setCount(c => c + 1), []);

  return (
    <>
      <ChildWithout onClick={handleWithout} />
      <ChildWith onClick={handleWith} />
    </>
  );
}`}
          language="tsx"
          title="Demo source code — useCallback with memo"
        />

        <p className="text-text-muted leading-relaxed">
          <strong className="text-text">Why this matters:</strong> In JavaScript, <code className="text-accent">() =&gt; {'{}'}</code> creates a new function object every time it runs.
          Two functions with the same code are still different objects: <code className="text-accent">(() =&gt; {'{}'}) !== (() =&gt; {'{}'})</code>.
          <code className="text-accent"> useCallback</code> solves this by returning the <em>same</em> function object between renders, so <code className="text-accent">memo()</code> can properly skip re-renders.
        </p>
      </section>

      {/* React Native equivalent */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">In React Native</h2>
        <p className="text-text-muted leading-relaxed">
          <code className="text-accent">useCallback</code> works identically in React Native. It is especially important when passing
          callbacks to <code className="text-accent">FlatList</code>'s <code className="text-accent">renderItem</code> — an unstable reference can cause the entire list to re-render:
        </p>
        <CodeBlock
          code={`import { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

type Item = { id: string; title: string };

export default function TodoList() {
  const [items, setItems] = useState<Item[]>([
    { id: '1', title: 'Learn useCallback' },
    { id: '2', title: 'Build an app' },
  ]);

  // Memoize so FlatList doesn't re-render all items unnecessarily
  const handlePress = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const renderItem = useCallback(({ item }: { item: Item }) => (
    <TouchableOpacity style={styles.item} onPress={() => handlePress(item.id)}>
      <Text style={styles.text}>{item.title}</Text>
    </TouchableOpacity>
  ), [handlePress]);

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
}

const styles = StyleSheet.create({
  item: { padding: 16, borderBottomWidth: 1, borderColor: '#eee' },
  text: { fontSize: 16 },
});`}
          language="tsx"
          title="React Native — useCallback with FlatList"
        />
      </section>

      {/* Tips */}
      <section className="space-y-4">
        <h2 className="text-2xl font-heading font-bold text-text">Tips and Gotchas</h2>

        <InfoBox variant="warning" title="Premature optimization">
          Do NOT wrap every function in <code className="text-accent">useCallback</code>. It only helps when:
          (1) the child component is wrapped in <code className="text-accent">React.memo</code>, or
          (2) the function is a dependency of another hook like <code className="text-accent">useEffect</code>.
          Otherwise, it adds complexity with no benefit.
        </InfoBox>

        <InfoBox variant="tip" title="useCallback is syntactic sugar">
          <code className="text-accent">useCallback(fn, deps)</code> is equivalent to
          <code className="text-accent"> useMemo(() =&gt; fn, deps)</code>.
          They are the same thing — <code className="text-accent">useCallback</code> just reads better for functions.
        </InfoBox>

        <InfoBox variant="info" title="Don't forget the dependency array">
          If your function uses values from the component scope, include them in the dependency array.
          Otherwise the function will close over stale values. The ESLint plugin will warn you about this.
        </InfoBox>

        <InfoBox variant="tip" title="When in doubt, don't memoize">
          React is fast. Most components render in under a millisecond. Only reach for <code className="text-accent">useCallback</code>
          (and <code className="text-accent">React.memo</code>) when you have measured a performance problem — not before.
        </InfoBox>
      </section>
    </PageShell>
  )
}
