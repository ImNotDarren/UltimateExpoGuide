import { useState } from 'react'
import { PageShell } from '../../components/PageShell'
import { HooksSidebar } from '../../components/HooksSidebar'
import { CodeBlock } from '../../components/CodeBlock'
import { InfoBox } from '../../components/InfoBox'
import { DemoBox } from '../../components/DemoBox'

export function UseStatePage() {
  const [count, setCount] = useState(0)
  const [text, setText] = useState('')
  const [showCounterSource, setShowCounterSource] = useState(false)
  const [showInputSource, setShowInputSource] = useState(false)

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
          code={`let count: number = 0;

document.getElementById('btn')!.addEventListener('click', (): void => {
  count++;
  document.getElementById('display')!.textContent = String(count);
});`}
          language="typescript"
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

function MyComponent(): React.ReactElement {
  // Destructure into [currentValue, setterFunction]
  const [value, setValue] = useState<string>(initialValue);

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

          <button
            onClick={() => setShowCounterSource(!showCounterSource)}
            className="flex items-center gap-2 mt-4 text-text-muted text-sm font-mono transition-colors hover:text-text"
          >
            <span className={`inline-block transition-transform ${showCounterSource ? 'rotate-90' : ''}`}>&#9654;</span>
            {showCounterSource ? 'Hide' : 'View'} Source Code
          </button>
          <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${showCounterSource ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
            <div className="overflow-hidden">
              <div className="mt-3">
                <CodeBlock
                  code={`import { useState } from 'react';

const Counter: React.FC = (): React.ReactElement => {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <button onClick={(): void => setCount((prev: number) => prev - 1)}>-</button>
      <span>{count}</span>
      <button onClick={(): void => setCount((prev: number) => prev + 1)}>+</button>
      <button onClick={(): void => setCount(0)}>Reset</button>
    </div>
  );
};

export default Counter;`}
                  language="tsx"
                  title="Counter source code"
                />
              </div>
            </div>
          </div>
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

          <button
            onClick={() => setShowInputSource(!showInputSource)}
            className="flex items-center gap-2 mt-4 text-text-muted text-sm font-mono transition-colors hover:text-text"
          >
            <span className={`inline-block transition-transform ${showInputSource ? 'rotate-90' : ''}`}>&#9654;</span>
            {showInputSource ? 'Hide' : 'View'} Source Code
          </button>
          <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${showInputSource ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
            <div className="overflow-hidden">
              <div className="mt-3">
                <CodeBlock
                  code={`import { useState } from 'react';

const TextInput: React.FC = (): React.ReactElement => {
  const [text, setText] = useState<string>('');

  return (
    <div>
      <input
        value={text}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setText(e.target.value)}
        placeholder="Type something..."
      />
      <p>You typed: {text}</p>
      <p>Character count: {text.length}</p>
    </div>
  );
};

export default TextInput;`}
                  language="tsx"
                  title="Text Input source code"
                />
              </div>
            </div>
          </div>
        </DemoBox>
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

export default function CounterScreen(): React.ReactElement {
  const [count, setCount] = useState<number>(0);
  const [text, setText] = useState<string>('');

  return (
    <View style={styles.container}>
      {/* Counter */}
      <Text style={styles.count}>{count}</Text>
      <View style={styles.row}>
        <Button title="-" onPress={(): void => setCount((prev: number) => prev - 1)} />
        <Button title="+" onPress={(): void => setCount((prev: number) => prev + 1)} />
        <Button title="Reset" onPress={(): void => setCount(0)} />
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
const [count, setCount] = useState<number>(0);

// Strings
const [name, setName] = useState<string>('');

// Booleans
const [isOpen, setIsOpen] = useState<boolean>(false);

// Arrays
interface Item {
  id: string;
  title: string;
}
const [items, setItems] = useState<Item[]>([]);
setItems((prev: Item[]): Item[] => [...prev, newItem]);  // add
setItems((prev: Item[]): Item[] => prev.filter((i: Item): boolean => i.id !== id));  // remove

// Objects
interface User {
  name: string;
  age: number;
}
const [user, setUser] = useState<User>({ name: '', age: 0 });
setUser((prev: User): User => ({ ...prev, name: 'Alice' }));  // update one field`}
          language="tsx"
          title="Common useState patterns"
        />
      </section>
    </PageShell>
  )
}
