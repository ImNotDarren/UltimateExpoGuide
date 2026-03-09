import { useState } from 'react'
import { PageShell } from '../../components/PageShell'
import { HooksSidebar } from '../../components/HooksSidebar'
import { CodeBlock } from '../../components/CodeBlock'
import { InfoBox } from '../../components/InfoBox'
import { DemoBox } from '../../components/DemoBox'

export function UseStatePage() {
  const [count, setCount] = useState(0)
  const [text, setText] = useState('')

  return (
    <PageShell
      title="useState"
      subtitle="The most fundamental React hook — it lets your components remember things between renders."
      gradient="from-accent to-purple"
      badge="REACT HOOK"
      breadcrumbs={[{ label: 'Hooks' }, { label: 'useState' }]}
      sidebar={<HooksSidebar />}
    >
      {/* What is state? */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">What is State?</h2>
        <p className="text-text-muted leading-relaxed">
          In vanilla JavaScript, when you want to store a value (like a counter), you use a variable:
        </p>
        <CodeBlock
          code={`let count = 0;

document.getElementById('btn').addEventListener('click', () => {
  count++;
  document.getElementById('display').textContent = count;
});`}
          language="javascript"
          title="Vanilla JS — manual DOM updates"
        />
        <p className="text-text-muted leading-relaxed">
          Notice the problem? You have to <strong className="text-text">manually find the DOM element</strong> and update it every time the value changes.
          React fixes this with <strong className="text-text">state</strong> — a special kind of variable that, when updated,
          automatically re-renders your component with the new value. No manual DOM manipulation needed.
        </p>

        <InfoBox variant="info" title="State vs. regular variables">
          A regular <code className="text-accent">let</code> variable inside a component gets reset every time the component re-renders.
          State, on the other hand, is <strong>preserved</strong> between renders by React. That is the key difference.
        </InfoBox>
      </section>

      {/* Syntax */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">Syntax</h2>
        <CodeBlock
          code={`import { useState } from 'react';

function MyComponent() {
  // Destructure into [currentValue, setterFunction]
  const [value, setValue] = useState(initialValue);

  // value     — the current state value
  // setValue  — a function to update it
  // initialValue — what the state starts as (number, string, array, object, etc.)
}`}
          language="tsx"
          title="useState syntax"
        />
        <p className="text-text-muted leading-relaxed">
          The <code className="text-accent">useState</code> function returns an array with exactly two items.
          We use <strong className="text-text">array destructuring</strong> (the square brackets) to give them names.
          You can name them anything, but the convention is <code className="text-accent">[thing, setThing]</code>.
        </p>
      </section>

      {/* Interactive Demo */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">Interactive Demo</h2>

        <DemoBox title="Counter Demo">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setCount((prev) => prev - 1)}
              className="px-4 py-2 rounded-lg bg-surface border border-border hover:bg-surface-light text-text font-mono transition-colors"
            >
              -
            </button>
            <span className="text-3xl font-bold text-accent font-mono min-w-[3ch] text-center">
              {count}
            </span>
            <button
              onClick={() => setCount((prev) => prev + 1)}
              className="px-4 py-2 rounded-lg bg-surface border border-border hover:bg-surface-light text-text font-mono transition-colors"
            >
              +
            </button>
            <button
              onClick={() => setCount(0)}
              className="px-3 py-2 rounded-lg bg-warning/10 border border-warning/30 text-warning text-sm font-mono transition-colors hover:bg-warning/20"
            >
              Reset
            </button>
          </div>
          <p className="text-sm text-text-muted">
            Every time you click a button, <code className="text-accent">setCount</code> is called, React re-renders the component, and the new value appears — no DOM manipulation needed.
          </p>
        </DemoBox>

        <DemoBox title="Text Input Demo">
          <div className="space-y-3">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type something..."
              className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-text placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/50 font-mono"
            />
            <p className="text-text-muted text-sm">
              You typed: <span className="text-accent font-mono font-semibold">{text || '(nothing yet)'}</span>
            </p>
            <p className="text-text-muted text-sm">
              Character count: <span className="text-primary font-mono font-semibold">{text.length}</span>
            </p>
          </div>
        </DemoBox>

        <h3 className="text-lg font-heading font-semibold text-text mt-8">Source Code for the Demos Above</h3>
        <CodeBlock
          code={`import { useState } from 'react';

function CounterAndInputDemo() {
  // Each useState call creates one independent piece of state.
  // count starts at 0, text starts as an empty string.
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  return (
    <div>
      {/* ── Counter ── */}
      {/* setCount(prev => prev - 1) uses a "functional update":
          instead of passing the new value directly, you pass a function
          that receives the previous value. This is safer when updates
          might be batched together. */}
      <button onClick={() => setCount(prev => prev - 1)}>-</button>
      <span>{count}</span>
      <button onClick={() => setCount(prev => prev + 1)}>+</button>
      <button onClick={() => setCount(0)}>Reset</button>

      {/* ── Text input ── */}
      {/* "Controlled input" pattern:
          1. value={text} — React controls what the input displays
          2. onChange — fires on every keystroke
          3. e.target.value — the current input string
          4. setText(e.target.value) — updates state, React re-renders,
             and the input now shows the new text */}
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
      />
      <p>You typed: {text}</p>
      <p>Character count: {text.length}</p>
    </div>
  );
}`}
          language="tsx"
          title="Demo source code — Counter + Text Input"
        />

        <p className="text-text-muted leading-relaxed">
          <strong className="text-text">Key takeaways from this code:</strong>
        </p>
        <ul className="list-disc list-inside text-text-muted space-y-2 ml-2">
          <li>
            <code className="text-accent">useState(0)</code> creates a state variable that starts at <code className="text-accent">0</code>.
            It returns an array: the current value (<code className="text-accent">count</code>) and a setter function (<code className="text-accent">setCount</code>).
          </li>
          <li>
            <code className="text-accent">setCount(prev =&gt; prev + 1)</code> is a <strong className="text-text">functional update</strong> — the safest way to update state that depends on the previous value.
          </li>
          <li>
            The text input is a <strong className="text-text">controlled input</strong>: React owns the value via <code className="text-accent">value={'{text}'}</code>, and every keystroke triggers <code className="text-accent">setText</code>, causing a re-render with the new text.
          </li>
          <li>
            <code className="text-accent">{'{text.length}'}</code> inside the JSX evaluates to a number — curly braces let you embed any JavaScript expression.
          </li>
        </ul>
      </section>

      {/* React Native equivalent */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">In React Native</h2>
        <p className="text-text-muted leading-relaxed">
          The <code className="text-accent">useState</code> hook works <strong className="text-text">identically</strong> in React Native.
          The only difference is which components you render — <code className="text-accent">View</code>, <code className="text-accent">Text</code>, and <code className="text-accent">TextInput</code> instead of HTML elements.
        </p>
        <CodeBlock
          code={`import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function CounterScreen() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      {/* Counter */}
      <Text style={styles.count}>{count}</Text>
      <View style={styles.row}>
        <Button title="-" onPress={() => setCount(prev => prev - 1)} />
        <Button title="+" onPress={() => setCount(prev => prev + 1)} />
        <Button title="Reset" onPress={() => setCount(0)} />
      </View>

      {/* Text Input */}
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}   // React Native uses onChangeText (gives you the string directly)
        placeholder="Type something..."
      />
      <Text style={styles.label}>You typed: {text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  count: { fontSize: 48, fontWeight: 'bold', textAlign: 'center' },
  row: { flexDirection: 'row', justifyContent: 'center', gap: 12, marginVertical: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, fontSize: 16 },
  label: { marginTop: 8, fontSize: 14, color: '#666' },
});`}
          language="tsx"
          title="React Native — same hook, different components"
        />
      </section>

      {/* Tips */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">Tips and Gotchas</h2>

        <InfoBox variant="warning" title="Never mutate state directly">
          <code className="text-accent">count++</code> or <code className="text-accent">myArray.push(item)</code> will NOT work.
          You must always use the setter function: <code className="text-accent">setCount(count + 1)</code> or <code className="text-accent">setItems([...items, item])</code>.
          React only re-renders when you call the setter.
        </InfoBox>

        <InfoBox variant="tip" title="Use functional updates for derived state">
          When your new state depends on the previous state, pass a function to the setter:
          <code className="text-accent block mt-2">setCount(prev =&gt; prev + 1)</code>
          This avoids bugs where multiple updates in a row use a stale value.
        </InfoBox>

        <InfoBox variant="info" title="State updates are asynchronous">
          If you call <code className="text-accent">setCount(5)</code> and immediately log <code className="text-accent">count</code>,
          you will still see the old value. React batches state updates and applies them on the next render.
        </InfoBox>

        <InfoBox variant="tip" title="You can have multiple state variables">
          There is no limit — call <code className="text-accent">useState</code> as many times as you need.
          Each call creates an independent piece of state.
        </InfoBox>
      </section>

      {/* Summary */}
      <section className="space-y-4">
        <h2 className="text-2xl font-heading font-bold text-text">Quick Reference</h2>
        <CodeBlock
          code={`// Numbers
const [count, setCount] = useState(0);

// Strings
const [name, setName] = useState('');

// Booleans
const [isOpen, setIsOpen] = useState(false);

// Arrays
const [items, setItems] = useState([]);
setItems(prev => [...prev, newItem]);  // add
setItems(prev => prev.filter(i => i.id !== id));  // remove

// Objects
const [user, setUser] = useState({ name: '', age: 0 });
setUser(prev => ({ ...prev, name: 'Alice' }));  // update one field`}
          language="tsx"
          title="Common useState patterns"
        />
      </section>
    </PageShell>
  )
}
