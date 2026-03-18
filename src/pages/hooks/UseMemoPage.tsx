import { useState, useMemo } from 'react'
import { PageShell } from '../../components/PageShell'
import { HooksSidebar } from '../../components/HooksSidebar'
import { CodeBlock } from '../../components/CodeBlock'
import { InfoBox } from '../../components/InfoBox'
import { DemoBox } from '../../components/DemoBox'

// Generate a large list for the demo (simulating FlatList data source)
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
          In React Native, a <code className="text-accent">FlatList</code> often displays data that has been filtered, sorted, or transformed.
          Without <code className="text-accent">useMemo</code>, these computations run on <strong className="text-text">every single render</strong> — even
          when the source data and filter criteria haven't changed. On mobile devices with thousands of items, this causes noticeable jank:
        </p>
        <CodeBlock
          code={`interface Contact {
  id: string;
  name: string;
  phone: string;
}

function ContactList({ contacts }: { contacts: Contact[] }): React.ReactElement {
  const [search, setSearch] = useState<string>('');

  // ❌ This filter runs on EVERY render — even if search and contacts haven't changed.
  // When a parent re-renders, a modal opens, or any unrelated state updates,
  // this loops through potentially thousands of contacts for no reason.
  const filtered: Contact[] = contacts.filter((c: Contact): boolean =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  // Worse: 'filtered' is a new array reference every time, so FlatList
  // has to diff every item even if the contents are identical.
  return (
    <View>
      <TextInput value={search} onChangeText={setSearch} placeholder="Search..." />
      <FlatList
        data={filtered}
        renderItem={({ item }: { item: Contact }): React.ReactElement => (
          <ContactRow contact={item} />
        )}
        keyExtractor={(item: Contact): string => item.id}
      />
    </View>
  );
}`}
          language="tsx"
          title="The problem — filtering on every render"
        />
        <p className="text-text-muted leading-relaxed">
          <code className="text-accent">useMemo</code> caches the result of the computation. React remembers what you computed
          and only re-runs the calculation when a dependency changes — saving the FlatList from receiving a new <code className="text-accent">data</code> array on every render.
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

        <DemoBox title="FlatList Data Filtering — with vs. without useMemo">
          <div className="space-y-4">
            <p className="text-sm text-text-muted">
              Simulates filtering 10,000 items before passing them to a <code className="text-accent">FlatList</code>.
              Toggle useMemo on and off, then hit <strong className="text-text">"Force Re-render"</strong> to see the difference.
            </p>

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
              With useMemo ON, clicking "Force Re-render" returns the cached result instantly — the filter does not run again.
              With it OFF, the filter re-processes all 10,000 items even though the search text hasn't changed.
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

            <InfoBox variant="info" title="Why this matters for FlatList">
              When you pass a new array reference to <code className="text-accent">FlatList</code>'s <code className="text-accent">data</code> prop,
              it triggers a diff of every item — even if the contents are identical. <code className="text-accent">useMemo</code> ensures
              the same array reference is reused when nothing has changed, so FlatList skips the diff entirely.
            </InfoBox>
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
  name: \`Item \${i + 1}\`,
}));

function FilterDemo(): React.ReactElement {
  const [search, setSearch] = useState<string>('');

  // useMemo caches the filtered array.
  // It only re-runs the filter when 'search' actually changes.
  // On unrelated re-renders (parent update, modal open, etc.),
  // React returns the cached array — zero computation, same reference.
  const filtered: ListItem[] = useMemo((): ListItem[] => {
    return LARGE_LIST.filter((item: ListItem): boolean =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <>
      <input value={search} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setSearch(e.target.value)} />
      {filtered.map((item: ListItem): React.ReactElement => <div key={item.id}>{item.name}</div>)}
    </>
  );
}`}
          language="tsx"
          title="Demo source — useMemo for caching filtered data"
        />
      </section>

      {/* The Full FlatList Pattern */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">The Full FlatList Pattern</h2>
        <p className="text-text-muted leading-relaxed">
          Use <code className="text-accent">useMemo</code> to cache filtered or sorted data before handing it to
          <code className="text-accent"> FlatList</code>. Combine with <code className="text-accent">useCallback</code> on <code className="text-accent">renderItem</code> for the complete optimization.
        </p>
        <CodeBlock
          code={`import { useState, useMemo, useCallback } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';

interface Contact {
  id: string;
  name: string;
  phone: string;
}

const ALL_CONTACTS: Contact[] = [
  { id: '1', name: 'Alice Johnson', phone: '555-0101' },
  { id: '2', name: 'Bob Smith', phone: '555-0102' },
  // ... imagine thousands of contacts from an API
];

export default function ContactsScreen(): React.ReactElement {
  const [search, setSearch] = useState<string>('');
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  // useMemo caches the filtered + sorted result.
  // It only re-computes when search or sortAsc changes.
  // On unrelated re-renders (modal open, keyboard event), it returns the cached array
  // — same reference, so FlatList skips its diff entirely.
  const filteredContacts: Contact[] = useMemo((): Contact[] => {
    const query: string = search.toLowerCase();
    const filtered: Contact[] = !query
      ? ALL_CONTACTS
      : ALL_CONTACTS.filter((c: Contact): boolean =>
          c.name.toLowerCase().includes(query)
        );

    return [...filtered].sort((a: Contact, b: Contact): number =>
      sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
  }, [search, sortAsc]);

  // useCallback keeps renderItem stable so FlatList doesn't re-render all items.
  const renderItem = useCallback(({ item }: { item: Contact }): React.ReactElement => (
    <View style={styles.contact}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.phone}>{item.phone}</Text>
    </View>
  ), []);

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
        renderItem={renderItem}
        keyExtractor={(item: Contact): string => item.id}
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
  name: { fontSize: 16, fontWeight: '600' },
  phone: { fontSize: 14, color: '#666', marginTop: 2 },
});`}
          language="tsx"
          title="React Native — useMemo + useCallback with FlatList"
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
          Use it when you can measure a noticeable performance difference — filtering or sorting large lists for a FlatList,
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
