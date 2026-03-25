import { useState, useCallback, memo } from 'react'
import { PageShell } from '../../components/PageShell'
import { HooksSidebar } from '../../components/HooksSidebar'
import { CodeBlock } from '../../components/CodeBlock'
import { InfoBox } from '../../components/InfoBox'
import { DemoBox } from '../../components/DemoBox'

// --- Demo types and data ---
interface DemoItem {
  id: number
  title: string
}

const ITEMS: DemoItem[] = [
  { id: 0, title: 'Learn Expo Router' },
  { id: 1, title: 'Build a FlatList' },
  { id: 2, title: 'Add useCallback' },
  { id: 3, title: 'Profile performance' },
  { id: 4, title: 'Ship the app' },
]

// Module-level render counters for the demo
let unstableItemRenders = 0
let stableItemRenders = 0

const UnstableRow = memo(function UnstableRow({
  item,
  onPress,
}: {
  item: DemoItem
  onPress: (id: number) => void
}) {
  unstableItemRenders++
  return (
    <div className="flex items-center justify-between px-3 py-2 border-b border-warning/10 last:border-0">
      <span className="text-sm font-mono text-text-muted">{item.title}</span>
      <button
        onClick={() => onPress(item.id)}
        className="px-2 py-0.5 rounded text-xs font-mono bg-warning/10 text-warning hover:bg-warning/20 transition-colors"
      >
        Done
      </button>
    </div>
  )
})

const StableRow = memo(function StableRow({
  item,
  onPress,
}: {
  item: DemoItem
  onPress: (id: number) => void
}) {
  stableItemRenders++
  return (
    <div className="flex items-center justify-between px-3 py-2 border-b border-primary/10 last:border-0">
      <span className="text-sm font-mono text-text-muted">{item.title}</span>
      <button
        onClick={() => onPress(item.id)}
        className="px-2 py-0.5 rounded text-xs font-mono bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
      >
        Done
      </button>
    </div>
  )
})

// --- Page component ---
export function UseCallbackPage() {
  const [count, setCount] = useState(0)
  const [, setForceRender] = useState(0)

  // Without useCallback — new function reference every render
  const handlePressUnstable = (_id: number) => {
    setCount((c) => c + 1)
  }

  // With useCallback — same function reference between renders
  const handlePressStable = useCallback((_id: number) => {
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
          In React Native, <code className="text-accent">FlatList</code> is the primary way to render scrollable lists efficiently.
          To optimize performance, you wrap each list item in <code className="text-accent">React.memo</code> so it only re-renders when its props change.
          But there is a catch — every time the parent re-renders, inline functions create <strong className="text-text">new references</strong>:
        </p>
        <CodeBlock
          code={`function TodoList(): React.ReactElement {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  // ❌ Creates a NEW function on EVERY render.
  // Even though the code inside is identical, it's a different object in memory.
  // Every memo'd FlatList item sees a "new" onDelete prop → all items re-render.
  const handleDelete = (id: string): void => {
    setTodos((prev: Todo[]): Todo[] => prev.filter((t: Todo): boolean => t.id !== id));
  };

  return (
    <FlatList
      data={todos}
      renderItem={({ item }: { item: Todo }): React.ReactElement => (
        <TodoItem item={item} onDelete={handleDelete} />
      )}
      keyExtractor={(item: Todo): string => item.id}
    />
  );
}`}
          language="tsx"
          title="The problem — unstable callbacks in a FlatList"
        />
        <p className="text-text-muted leading-relaxed">
          <code className="text-accent">useCallback</code> solves this by caching the function and returning the <strong className="text-text">same reference</strong> as long as the dependencies haven't changed.
          This lets <code className="text-accent">React.memo</code> do its job — items whose props haven't changed skip re-rendering entirely.
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

        <DemoBox title="FlatList Item Render Comparison">
          <div className="space-y-4">
            <p className="text-sm text-text-muted">
              Both lists below simulate a <code className="text-accent">FlatList</code> where every item is wrapped in <code className="text-accent">React.memo</code>.
              Click <strong className="text-text">"Force Parent Re-render"</strong> and compare the item render counts.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Without useCallback */}
              <div className="rounded-lg bg-warning/5 border border-warning/20 overflow-hidden">
                <div className="px-3 py-2 bg-warning/10 border-b border-warning/20">
                  <p className="text-xs font-mono text-warning font-semibold">Without useCallback</p>
                  <p className="text-xs font-mono text-warning/70">
                    Item renders: <strong>{unstableItemRenders}</strong>
                  </p>
                </div>
                {ITEMS.map((item) => (
                  <UnstableRow key={item.id} item={item} onPress={handlePressUnstable} />
                ))}
              </div>

              {/* With useCallback */}
              <div className="rounded-lg bg-primary/5 border border-primary/20 overflow-hidden">
                <div className="px-3 py-2 bg-primary/10 border-b border-primary/20">
                  <p className="text-xs font-mono text-primary font-semibold">With useCallback</p>
                  <p className="text-xs font-mono text-primary/70">
                    Item renders: <strong>{stableItemRenders}</strong>
                  </p>
                </div>
                {ITEMS.map((item) => (
                  <StableRow key={item.id} item={item} onPress={handlePressStable} />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setForceRender((n) => n + 1)}
                className="px-5 py-2.5 rounded-lg bg-accent/10 border border-accent/30 text-accent font-mono text-sm hover:bg-accent/20 transition-colors"
              >
                Force Parent Re-render
              </button>
              <span className="text-sm text-text-muted font-mono">
                Items pressed: <span className="text-accent font-bold">{count}</span>
              </span>
            </div>

            <InfoBox variant="info" title="What's happening?">
              When the parent re-renders, <code className="text-accent">handlePressUnstable</code> is a new function reference,
              so all 5 memo'd items in the left list re-render. <code className="text-accent">handlePressStable</code> is the same reference
              (thanks to useCallback), so the right list's items skip re-rendering entirely. In a real FlatList with hundreds of items, this difference is dramatic.
            </InfoBox>
          </div>
        </DemoBox>

        <h3 className="text-lg font-heading font-semibold text-text mt-6">Source Code for the Demo Above</h3>
        <CodeBlock
          code={`import { useState, useCallback, memo } from 'react';

interface DemoItem {
  id: number;
  title: string;
}

// Each row is wrapped in React.memo — it only re-renders when props change.
// But if onPress is a new function reference every render, memo can't help.
const ListRow = memo(function ListRow({ item, onPress }: {
  item: DemoItem;
  onPress: (id: number) => void;
}): React.ReactElement {
  return (
    <button onClick={(): void => onPress(item.id)}>
      {item.title}
    </button>
  );
});

function Parent(): React.ReactElement {
  const [count, setCount] = useState<number>(0);

  // ❌ Without useCallback: new function every render.
  // All memo'd ListRow components see a different onPress → all re-render.
  const handlePressUnstable = (id: number): void => setCount((c: number) => c + 1);

  // ✅ With useCallback: same function reference between renders.
  // memo'd ListRow components see the same onPress → skip re-render.
  const handlePressStable = useCallback((id: number): void => {
    setCount((c: number) => c + 1);
  }, []);

  return (
    <>
      {items.map((item: DemoItem): React.ReactElement => (
        <ListRow key={item.id} item={item} onPress={handlePressStable} />
      ))}
    </>
  );
}`}
          language="tsx"
          title="Demo source — useCallback stabilizes list item callbacks"
        />
      </section>

      {/* The Full FlatList Pattern */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">The Full FlatList Pattern</h2>
        <p className="text-text-muted leading-relaxed">
          Optimizing a <code className="text-accent">FlatList</code> follows a three-step pattern:
          (1) wrap items in <code className="text-accent">React.memo</code>,
          (2) wrap handlers in <code className="text-accent">useCallback</code>, and
          (3) wrap <code className="text-accent">renderItem</code> in <code className="text-accent">useCallback</code>.
        </p>
        <CodeBlock
          code={`import { useState, useCallback, memo } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

interface Todo {
  id: string;
  title: string;
  done: boolean;
}

interface TodoItemProps {
  item: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

// Step 1: Wrap each list item in React.memo.
// This tells React: "only re-render if props actually changed."
const TodoItem = memo(function TodoItem({ item, onToggle, onDelete }: TodoItemProps): React.ReactElement {
  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={(): void => onToggle(item.id)} style={styles.toggle}>
        <Text style={item.done ? styles.done : styles.title}>{item.title}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={(): void => onDelete(item.id)}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
});

export default function TodoList(): React.ReactElement {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  // Step 2: Wrap handlers in useCallback.
  // Without this, every parent render creates new functions →
  // memo(TodoItem) sees "new" props → every item re-renders.
  const handleToggle = useCallback((id: string): void => {
    setTodos((prev: Todo[]): Todo[] =>
      prev.map((t: Todo): Todo => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }, []);

  const handleDelete = useCallback((id: string): void => {
    setTodos((prev: Todo[]): Todo[] => prev.filter((t: Todo): boolean => t.id !== id));
  }, []);

  // Step 3: Wrap renderItem in useCallback — it's a function prop on FlatList.
  const renderItem = useCallback(({ item }: { item: Todo }): React.ReactElement => (
    <TodoItem item={item} onToggle={handleToggle} onDelete={handleDelete} />
  ), [handleToggle, handleDelete]);

  return (
    <FlatList
      data={todos}
      renderItem={renderItem}
      keyExtractor={(item: Todo): string => item.id}
    />
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderColor: '#eee' },
  toggle: { flex: 1 },
  title: { fontSize: 16 },
  done: { fontSize: 16, textDecorationLine: 'line-through', color: '#999' },
  deleteText: { color: 'red', fontSize: 14 },
});`}
          language="tsx"
          title="React Native — the 3-step FlatList optimization"
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
