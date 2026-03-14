import { useState, useMemo } from 'react'
import { PageShell } from '../../components/PageShell'
import { HooksSidebar } from '../../components/HooksSidebar'
import { CodeBlock } from '../../components/CodeBlock'
import { InfoBox } from '../../components/InfoBox'
import { DemoBox } from '../../components/DemoBox'

// Generate a large list for the demo
const LARGE_LIST = Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  name: `Item ${i + 1} — ${['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape', 'Honeydew', 'Kiwi', 'Lemon'][i % 10]}`,
}))

export function UseMemoPage() {
  const [search, setSearch] = useState('')
  const [useMemoEnabled, setUseMemoEnabled] = useState(true)
  const [, setForceRender] = useState(0)

  // With useMemo — only re-filters when search changes
  const memoizedResults = useMemo(() => {
    const start = performance.now()
    const filtered = LARGE_LIST.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    )
    const end = performance.now()
    return { filtered, time: (end - start).toFixed(2) }
  }, [search])

  // Without useMemo — re-filters on every render
  const unmemoizedResults = (() => {
    const start = performance.now()
    const filtered = LARGE_LIST.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    )
    const end = performance.now()
    return { filtered, time: (end - start).toFixed(2) }
  })()

  const activeResults = useMemoEnabled ? memoizedResults : unmemoizedResults

  return (
    <PageShell
      title="useMemo"
      subtitle="Cache the result of an expensive calculation so it only re-runs when its inputs change — not on every render."
      gradient="from-orange to-pink"
      badge="REACT HOOK"
      breadcrumbs={[{ label: 'Hooks' }, { label: 'useMemo' }]}
      sidebar={<HooksSidebar />}
    >
      {/* What is useMemo? */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">What is useMemo?</h2>
        <p className="text-text-muted leading-relaxed">
          Every time a React component re-renders, <em>all the code</em> inside the function runs again.
          Most of the time this is perfectly fine — JavaScript is fast. But sometimes you have an
          <strong className="text-text"> expensive computation</strong> that should only re-run when specific inputs change:
        </p>
        <CodeBlock
          code={`interface Product {
  id: string;
  name: string;
  price: number;
}

interface ProductListProps {
  products: Product[];
  searchTerm: string;
}

function ProductList({ products, searchTerm }: ProductListProps): React.ReactElement {
  // This runs on EVERY render — even if products and searchTerm haven't changed
  const filtered: Product[] = products.filter((p: Product): boolean =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // If 'products' has 50,000 items and the component re-renders because
  // of an unrelated state change (like a modal opening), this filter
  // runs again unnecessarily.
  return <>{filtered.map((p: Product) => <Product key={p.id} {...p} />)}</>;
}`}
          language="tsx"
          title="The problem — unnecessary re-computation"
        />
        <p className="text-text-muted leading-relaxed">
          <code className="text-accent">useMemo</code> caches (memoizes) the result. React remembers what you computed
          and only re-runs the calculation when one of the listed dependencies changes.
        </p>
      </section>

      {/* Syntax */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">Syntax</h2>
        <CodeBlock
          code={`import { useMemo } from 'react';

const result = useMemo(
  () => {
    // Expensive computation goes here
    return expensiveFunction(input1, input2);
  },
  [input1, input2]  // Only re-compute when these change
);

// 'result' is now a cached value.
// If input1 and input2 haven't changed since last render,
// React returns the cached result without running the function.`}
          language="tsx"
          title="useMemo syntax"
        />
      </section>

      {/* Interactive Demo */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">Interactive Demo</h2>

        <DemoBox title="Filter 10,000 Items — with vs. without useMemo">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search items..."
                className="flex-1 w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-text placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/50 font-mono"
              />
              <button
                onClick={() => setUseMemoEnabled((prev) => !prev)}
                className={`px-4 py-2.5 rounded-lg font-mono text-sm whitespace-nowrap transition-colors ${
                  useMemoEnabled
                    ? 'bg-primary/10 border border-primary/30 text-primary'
                    : 'bg-warning/10 border border-warning/30 text-warning'
                }`}
              >
                {useMemoEnabled ? 'useMemo: ON' : 'useMemo: OFF'}
              </button>
            </div>

            <div className="flex items-center gap-6 text-sm">
              <p className="text-text-muted">
                Results: <span className="text-accent font-mono font-bold">{activeResults.filtered.length.toLocaleString()}</span>
              </p>
              <p className="text-text-muted">
                Filter time: <span className="text-primary font-mono font-bold">{activeResults.time}ms</span>
              </p>
            </div>

            <button
              onClick={() => setForceRender((n) => n + 1)}
              className="px-4 py-2 rounded-lg bg-surface border border-border text-text-muted font-mono text-sm hover:bg-surface-light transition-colors"
            >
              Force Re-render (unrelated state change)
            </button>

            <p className="text-xs text-text-muted">
              With useMemo ON, clicking "Force Re-render" uses the cached result. With it OFF, the filter runs again even though the search text has not changed.
            </p>

            <div className="max-h-48 overflow-y-auto rounded-lg bg-surface border border-border">
              {activeResults.filtered.slice(0, 50).map((item) => (
                <div
                  key={item.id}
                  className="px-4 py-2 border-b border-border/50 text-sm font-mono text-text-muted"
                >
                  {item.name}
                </div>
              ))}
              {activeResults.filtered.length > 50 && (
                <div className="px-4 py-2 text-sm text-text-muted/50 italic">
                  ...and {(activeResults.filtered.length - 50).toLocaleString()} more items
                </div>
              )}
            </div>
          </div>
        </DemoBox>

        <h3 className="text-lg font-heading font-semibold text-text mt-6">Source Code for the Demo Above</h3>
        <CodeBlock
          code={`import { useState, useMemo } from 'react';

interface ListItem {
  id: number;
  name: string;
}

// A large dataset created once (outside the component)
const LARGE_LIST: ListItem[] = Array.from({ length: 10000 }, (_, i: number): ListItem => ({
  id: i,
  name: \`Item \${i + 1} — \${fruits[i % 10]}\`,
}));

function FilterDemo(): React.ReactElement {
  const [search, setSearch] = useState<string>('');

  // useMemo takes two arguments:
  //   1. A function that computes the value (the "factory")
  //   2. A dependency array — re-compute only when these values change
  const filtered: ListItem[] = useMemo((): ListItem[] => {
    // This filter runs through 10,000 items.
    // useMemo ensures it only runs when 'search' actually changes.
    return LARGE_LIST.filter((item: ListItem): boolean =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);  // ← only re-run when search changes

  // If the component re-renders for ANY other reason
  // (parent re-renders, unrelated state changes),
  // useMemo returns the cached result — zero computation.
  return (
    <>
      <input value={search} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setSearch(e.target.value)} />
      {filtered.map((item: ListItem): React.ReactElement => <div key={item.id}>{item.name}</div>)}
    </>
  );
}`}
          language="tsx"
          title="Demo source code — useMemo for expensive filtering"
        />

        <p className="text-text-muted leading-relaxed">
          <strong className="text-text">How it works:</strong> <code className="text-accent">useMemo</code> caches the return value of the function.
          On the next render, React checks if any dependency has changed. If not, it returns the cached value without running the function.
          Think of it like a spreadsheet cell that only recalculates when its inputs change.
        </p>
      </section>

      {/* React Native equivalent */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">In React Native</h2>
        <p className="text-text-muted leading-relaxed">
          <code className="text-accent">useMemo</code> is especially useful in React Native when filtering data for a <code className="text-accent">FlatList</code>.
          Re-computing large lists on every render can cause noticeable jank on mobile devices:
        </p>
        <CodeBlock
          code={`import { useState, useMemo } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';

interface Contact {
  id: string;
  name: string;
}

const ALL_CONTACTS: Contact[] = [
  { id: '1', name: 'Alice Johnson' },
  { id: '2', name: 'Bob Smith' },
  // ... imagine thousands of contacts
];

export default function ContactsScreen(): React.ReactElement {
  const [search, setSearch] = useState<string>('');

  // Only re-filter when search text changes
  const filteredContacts: Contact[] = useMemo((): Contact[] => {
    if (!search.trim()) return ALL_CONTACTS;
    const query: string = search.toLowerCase();
    return ALL_CONTACTS.filter((c: Contact): boolean =>
      c.name.toLowerCase().includes(query)
    );
  }, [search]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        value={search}
        onChangeText={setSearch}
        placeholder="Search contacts..."
      />
      <FlatList
        data={filteredContacts}
        keyExtractor={(item: Contact): string => item.id}
        renderItem={({ item }: { item: Contact }): React.ReactElement => (
          <View style={styles.contact}>
            <Text style={styles.name}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  searchInput: {
    borderWidth: 1, borderColor: '#ddd', borderRadius: 12,
    padding: 12, fontSize: 16, marginBottom: 12,
  },
  contact: { paddingVertical: 12, borderBottomWidth: 1, borderColor: '#eee' },
  name: { fontSize: 16 },
});`}
          language="tsx"
          title="React Native — useMemo with FlatList filtering"
        />
      </section>

      {/* Tips */}
      <section className="space-y-4">
        <h2 className="text-2xl font-heading font-bold text-text">Tips and Gotchas</h2>

        <InfoBox variant="warning" title="useMemo is not free">
          Memoization has a cost: React has to store the previous result in memory and compare dependencies on every render.
          For simple computations (adding numbers, formatting strings), the overhead of <code className="text-accent">useMemo</code> can be
          <em> greater</em> than just running the computation again.
        </InfoBox>

        <InfoBox variant="tip" title="When to use useMemo">
          Use it when you can measure a noticeable performance difference — filtering or sorting large lists,
          complex mathematical calculations, creating derived data structures. If you are not sure, do not use it.
        </InfoBox>

        <InfoBox variant="warning" title="Don't use useMemo for side effects">
          <code className="text-accent">useMemo</code> is for pure computations only. It should not make API calls,
          set state, or modify anything outside itself. Use <code className="text-accent">useEffect</code> for side effects.
        </InfoBox>

        <InfoBox variant="info" title="useMemo vs useCallback">
          <code className="text-accent">useMemo</code> caches a <em>value</em> (the result of calling a function).
          <code className="text-accent"> useCallback</code> caches a <em>function</em> (the function itself).
          In fact, <code className="text-accent">useCallback(fn, deps)</code> is just <code className="text-accent">useMemo(() =&gt; fn, deps)</code>.
        </InfoBox>

        <InfoBox variant="tip" title="React may discard cached values">
          React does not guarantee that cached values will persist forever. In the future, React may choose to
          discard cached values (for example, to free memory for offscreen components). Write your code so that it
          still works without <code className="text-accent">useMemo</code> — it should only be a performance optimization, never a correctness requirement.
        </InfoBox>
      </section>
    </PageShell>
  )
}
