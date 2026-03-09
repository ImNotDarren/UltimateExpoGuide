import { useState, useRef, useEffect } from 'react'
import { PageShell } from '../../components/PageShell'
import { HooksSidebar } from '../../components/HooksSidebar'
import { CodeBlock } from '../../components/CodeBlock'
import { InfoBox } from '../../components/InfoBox'
import { DemoBox } from '../../components/DemoBox'

export function UseRefPage() {
  // Stopwatch state
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Focus input demo
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setElapsed((prev) => prev + 10)
      }, 10)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [running])

  const handleStart = () => setRunning(true)
  const handleStop = () => setRunning(false)
  const handleReset = () => {
    setRunning(false)
    setElapsed(0)
  }

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    const centiseconds = Math.floor((ms % 1000) / 10)
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(centiseconds).padStart(2, '0')}`
  }

  return (
    <PageShell
      title="useRef"
      subtitle="Hold onto values that persist across renders without causing re-renders — and access DOM elements directly."
      gradient="from-pink to-orange"
      badge="REACT HOOK"
      breadcrumbs={[{ label: 'Hooks' }, { label: 'useRef' }]}
      sidebar={<HooksSidebar />}
    >
      {/* What is useRef? */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">What is useRef?</h2>
        <p className="text-text-muted leading-relaxed">
          Think of <code className="text-accent">useRef</code> as a box that holds a value. Unlike <code className="text-accent">useState</code>,
          changing the value inside the box does <strong className="text-text">NOT</strong> trigger a re-render.
        </p>
        <p className="text-text-muted leading-relaxed">
          It has two main uses:
        </p>
        <ul className="list-disc list-inside text-text-muted space-y-2 ml-2">
          <li>
            <strong className="text-text">Accessing DOM elements</strong> — like <code className="text-accent">document.getElementById()</code> in vanilla JS,
            but the React way.
          </li>
          <li>
            <strong className="text-text">Storing mutable values</strong> — interval IDs, previous values, counters — anything you need to persist
            between renders but that should <em>not</em> trigger a re-render when changed.
          </li>
        </ul>

        <InfoBox variant="info" title="useRef vs useState — when to use which">
          If the UI should update when the value changes, use <code className="text-accent">useState</code>.
          If you just need to remember something internally (like a timer ID), use <code className="text-accent">useRef</code>.
        </InfoBox>
      </section>

      {/* Syntax */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">Syntax</h2>
        <CodeBlock
          code={`import { useRef } from 'react';

// Create a ref with an initial value
const myRef = useRef(initialValue);

// Read the value
console.log(myRef.current);  // whatever you stored

// Update the value (does NOT cause a re-render)
myRef.current = newValue;

// Attach to a DOM element
const inputRef = useRef<HTMLInputElement>(null);
// later in JSX: <input ref={inputRef} />
// then: inputRef.current?.focus();`}
          language="tsx"
          title="useRef syntax"
        />
        <p className="text-text-muted leading-relaxed">
          The ref object has a single property: <code className="text-accent">.current</code>.
          You read and write to <code className="text-accent">.current</code> directly. React never touches it — it is your own mutable box.
        </p>
      </section>

      {/* Interactive Demos */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">Interactive Demos</h2>

        <DemoBox title="Stopwatch — useRef for interval ID">
          <div className="text-center space-y-4">
            <p className="text-5xl font-mono font-bold text-accent tracking-wider">
              {formatTime(elapsed)}
            </p>
            <div className="flex justify-center gap-3">
              {!running ? (
                <button
                  onClick={handleStart}
                  className="px-5 py-2.5 rounded-lg bg-primary/10 border border-primary/30 text-primary font-mono text-sm hover:bg-primary/20 transition-colors"
                >
                  Start
                </button>
              ) : (
                <button
                  onClick={handleStop}
                  className="px-5 py-2.5 rounded-lg bg-warning/10 border border-warning/30 text-warning font-mono text-sm hover:bg-warning/20 transition-colors"
                >
                  Stop
                </button>
              )}
              <button
                onClick={handleReset}
                className="px-5 py-2.5 rounded-lg bg-surface border border-border text-text-muted font-mono text-sm hover:bg-surface-light transition-colors"
              >
                Reset
              </button>
            </div>
            <p className="text-sm text-text-muted">
              The interval ID is stored in a <code className="text-accent">useRef</code> — we need to access it in the cleanup function
              and the stop handler, but changing it should not trigger a re-render.
            </p>
          </div>
        </DemoBox>

        <DemoBox title="Focus Input — useRef for DOM access">
          <div className="space-y-3">
            <input
              ref={inputRef}
              type="text"
              placeholder="Click the button to focus me..."
              className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-text placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/50 font-mono"
            />
            <button
              onClick={() => inputRef.current?.focus()}
              className="px-5 py-2.5 rounded-lg bg-accent/10 border border-accent/30 text-accent font-mono text-sm hover:bg-accent/20 transition-colors"
            >
              Focus the Input
            </button>
            <p className="text-sm text-text-muted">
              In vanilla JS you would write <code className="text-accent">document.getElementById('myInput').focus()</code>.
              In React, you attach a ref to the element and call <code className="text-accent">inputRef.current.focus()</code>.
            </p>
          </div>
        </DemoBox>

        <h3 className="text-lg font-heading font-semibold text-text mt-6">Source Code for the Demos Above</h3>
        <CodeBlock
          code={`// ── Stopwatch: useRef to store the interval ID ──
const [elapsed, setElapsed] = useState(0);   // triggers re-render (displayed)
const [running, setRunning] = useState(false);
const intervalRef = useRef<number | null>(null);  // does NOT trigger re-render

useEffect(() => {
  if (running) {
    // Store the interval ID in the ref so we can clear it later.
    // If we used useState for this, every setInterval would cause
    // an unnecessary re-render.
    intervalRef.current = setInterval(() => {
      setElapsed(prev => prev + 10);
    }, 10);
  }
  // Cleanup: clear the interval when stopping or unmounting
  return () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };
}, [running]);

// ── Focus input: useRef to access a DOM element ──
const inputRef = useRef<HTMLInputElement>(null);

// Attach in JSX:    <input ref={inputRef} />
// Use it later:     inputRef.current?.focus();
//
// This is React's alternative to document.getElementById().
// The ref gives you a direct reference to the DOM node.`}
          language="tsx"
          title="Demo source code — Stopwatch + Focus Input"
        />

        <p className="text-text-muted leading-relaxed">
          <strong className="text-text">Key takeaways:</strong>
        </p>
        <ul className="list-disc list-inside text-text-muted space-y-2 ml-2">
          <li>
            <code className="text-accent">useRef</code> returns an object with a <code className="text-accent">.current</code> property. You can read and write <code className="text-accent">.current</code> without triggering a re-render.
          </li>
          <li>
            <strong className="text-text">Storing the interval ID</strong> in a ref means the component doesn't re-render when the ID is saved — only when <code className="text-accent">elapsed</code> (a state variable) changes.
          </li>
          <li>
            <strong className="text-text">DOM access</strong> via refs replaces <code className="text-accent">document.getElementById()</code>. Attach a ref to any element with the <code className="text-accent">ref</code> attribute.
          </li>
        </ul>
      </section>

      {/* React Native equivalent */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">In React Native</h2>
        <p className="text-text-muted leading-relaxed">
          Refs work the same way in React Native. You can store mutable values and reference native components:
        </p>
        <CodeBlock
          code={`import { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function StopwatchScreen() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setElapsed(prev => prev + 10);
      }, 10);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const formatTime = (ms: number) => {
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    const cs = Math.floor((ms % 1000) / 10);
    return \`\${String(mins).padStart(2, '0')}:\${String(secs).padStart(2, '0')}.\${String(cs).padStart(2, '0')}\`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{formatTime(elapsed)}</Text>
      <Button title={running ? 'Stop' : 'Start'} onPress={() => setRunning(r => !r)} />
      <Button title="Reset" onPress={() => { setRunning(false); setElapsed(0); }} />

      {/* Focus demo — same ref pattern */}
      <TextInput ref={inputRef} style={styles.input} placeholder="Tap button to focus" />
      <Button title="Focus Input" onPress={() => inputRef.current?.focus()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', gap: 12 },
  timer: { fontSize: 48, fontWeight: 'bold', textAlign: 'center', fontVariant: ['tabular-nums'] },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, fontSize: 16 },
});`}
          language="tsx"
          title="React Native — useRef works the same way"
        />
      </section>

      {/* Tips */}
      <section className="space-y-4">
        <h2 className="text-2xl font-heading font-bold text-text">Tips and Gotchas</h2>

        <InfoBox variant="warning" title="Don't use refs for things that should trigger re-renders">
          If you need the UI to update when a value changes, use <code className="text-accent">useState</code>.
          Changing <code className="text-accent">ref.current</code> is invisible to React — the component will NOT re-render.
        </InfoBox>

        <InfoBox variant="tip" title="Refs are great for 'instance variables'">
          In class-based programming, instance variables persist for the object's lifetime without triggering updates.
          <code className="text-accent"> useRef</code> gives function components the same ability: timer IDs, previous prop values,
          WebSocket connections, animation frame IDs, etc.
        </InfoBox>

        <InfoBox variant="info" title="ref.current starts as your initial value">
          <code className="text-accent">useRef(null)</code> means <code className="text-accent">ref.current</code> is <code className="text-accent">null</code> until
          React attaches a DOM element to it (or you assign something yourself). Always check for <code className="text-accent">null</code> before using it.
        </InfoBox>
      </section>
    </PageShell>
  )
}
