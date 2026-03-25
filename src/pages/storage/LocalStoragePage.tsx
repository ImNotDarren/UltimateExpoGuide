import { useState } from 'react'
import { PageShell } from '../../components/PageShell'
import { HooksSidebar } from '../../components/HooksSidebar'
import { CodeBlock } from '../../components/CodeBlock'
import { InfoBox } from '../../components/InfoBox'
import { DemoBox } from '../../components/DemoBox'

// --- Interactive AsyncStorage demo ---
function AsyncStorageDemo() {
  const [store, setStore] = useState<Record<string, string>>({
    '@app:theme': 'dark',
    '@app:onboarded': 'true',
  })
  const [key, setKey] = useState('')
  const [value, setValue] = useState('')
  const [readResult, setReadResult] = useState<string | null>(null)
  const [log, setLog] = useState<string[]>(['Store initialized with 2 items'])

  const addLog = (entry: string) => {
    setLog((prev) => [entry, ...prev].slice(0, 8))
  }

  const handleSet = () => {
    if (!key.trim()) return
    const k = key.trim()
    const v = value.trim()
    setStore((prev) => ({ ...prev, [k]: v }))
    addLog(`setItem("${k}", "${v}")`)
    setKey('')
    setValue('')
  }

  const handleGet = () => {
    if (!key.trim()) return
    const k = key.trim()
    const result = store[k] ?? null
    setReadResult(result)
    addLog(`getItem("${k}") → ${result === null ? 'null' : `"${result}"`}`)
  }

  const handleRemove = (k: string) => {
    setStore((prev) => {
      const next = { ...prev }
      delete next[k]
      return next
    })
    addLog(`removeItem("${k}")`)
    if (readResult !== null) setReadResult(null)
  }

  const handleClear = () => {
    setStore({})
    setReadResult(null)
    addLog('clear() — all items removed')
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {/* Controls */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <input
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="key"
            className="flex-1 px-3 py-2 rounded-lg bg-surface border border-border text-text text-sm font-mono placeholder:text-text-muted/40 focus:outline-none focus:border-accent"
          />
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="value"
            className="flex-1 px-3 py-2 rounded-lg bg-surface border border-border text-text text-sm font-mono placeholder:text-text-muted/40 focus:outline-none focus:border-accent"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSet}
            className="px-4 py-2 rounded-lg bg-accent text-white text-sm font-mono font-semibold hover:bg-accent/80 transition-colors"
          >
            setItem
          </button>
          <button
            onClick={handleGet}
            className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-mono font-semibold hover:bg-primary/80 transition-colors"
          >
            getItem
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2 rounded-lg bg-pink/80 text-white text-sm font-mono font-semibold hover:bg-pink/60 transition-colors"
          >
            clear
          </button>
        </div>

        {readResult !== null && (
          <div className="px-3 py-2 rounded-lg bg-primary/10 border border-primary/30 text-sm font-mono text-primary">
            Result: &quot;{readResult}&quot;
          </div>
        )}

        {/* Current store contents */}
        <div className="space-y-1.5 mt-2">
          <p className="text-xs font-mono text-text-muted uppercase tracking-wider">Stored Items</p>
          {Object.keys(store).length === 0 ? (
            <p className="text-sm font-mono text-text-muted/50 italic">Storage is empty</p>
          ) : (
            Object.entries(store).map(([k, v]) => (
              <div key={k} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-surface border border-border group">
                <span className="text-sm font-mono text-accent">{k}</span>
                <span className="text-text-muted/40 text-sm">=</span>
                <span className="flex-1 text-sm font-mono text-text">{v}</span>
                <button
                  onClick={() => handleRemove(k)}
                  className="text-text-muted/30 hover:text-pink text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Log */}
      <div className="rounded-lg bg-code-bg border border-border p-4">
        <p className="text-xs font-mono text-accent mb-3 uppercase tracking-wider">Operation Log</p>
        <div className="space-y-1.5">
          {log.map((entry, i) => (
            <div key={i} className={`text-xs font-mono ${i === 0 ? 'text-primary' : 'text-text-muted/50'}`}>
              {i === 0 && <span className="text-accent mr-1">&gt;</span>}
              {entry}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// --- Page component ---
export function LocalStoragePage() {
  return (
    <PageShell
      title="AsyncStorage"
      subtitle="The React Native equivalent of localStorage — persist simple key-value data on the device so it survives app restarts."
      gradient="from-accent to-primary"
      badge="DATA & STORAGE"
      breadcrumbs={[{ label: 'Data & Storage' }, { label: 'AsyncStorage' }]}
      sidebar={<HooksSidebar />}
    >
      {/* What is localStorage? */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">What is localStorage?</h2>
        <p className="text-text-muted leading-relaxed">
          If you have done any web development, you have probably used <code className="text-accent">localStorage</code> — a simple
          browser API that stores key-value pairs persistently. Data stays even after closing the tab or refreshing the page.
        </p>
        <CodeBlock
          code={`// Web localStorage — simple key-value storage
localStorage.setItem('theme', 'dark');
localStorage.setItem('username', 'Darren');

const theme = localStorage.getItem('theme');     // 'dark'
const missing = localStorage.getItem('foo');      // null

localStorage.removeItem('username');
localStorage.clear();  // wipe everything`}
          language="typescript"
          title="Web localStorage API — synchronous and simple"
        />
        <p className="text-text-muted leading-relaxed">
          It is <strong className="text-text">synchronous</strong>, works only with <strong className="text-text">strings</strong>,
          and lives in the browser. Simple, but limited.
        </p>

        <InfoBox variant="warning" title="React Native has no localStorage">
          React Native does not run in a browser, so there is no <code className="text-accent">window.localStorage</code>.
          Instead, the React Native community uses <strong>AsyncStorage</strong> — a library that provides the same
          concept (persistent key-value storage) but designed for mobile.
        </InfoBox>
      </section>

      {/* AsyncStorage — the RN equivalent */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">AsyncStorage — The React Native Way</h2>
        <p className="text-text-muted leading-relaxed">
          <strong className="text-text">AsyncStorage</strong> is a simple, unencrypted, asynchronous, persistent key-value storage
          system for React Native. It is the direct equivalent of <code className="text-accent">localStorage</code> from the web,
          with one key difference: <strong className="text-text">every operation is async</strong>.
        </p>
        <p className="text-text-muted leading-relaxed">
          On iOS it is backed by native code (serialized dictionaries), and on Android it uses either RocksDB or SQLite.
          You do not need to worry about the implementation details — just think of it as a persistent dictionary.
        </p>

        {/* Comparison table */}
        <div className="rounded-2xl bg-card border border-border p-6 space-y-4">
          <h3 className="text-lg font-heading font-semibold text-text">localStorage vs AsyncStorage</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-mono">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4 text-text-muted font-semibold">Feature</th>
                  <th className="text-left py-2 pr-4 text-accent font-semibold">Web localStorage</th>
                  <th className="text-left py-2 text-primary font-semibold">RN AsyncStorage</th>
                </tr>
              </thead>
              <tbody className="text-text-muted">
                <tr className="border-b border-border/50">
                  <td className="py-2 pr-4 text-text">Platform</td>
                  <td className="py-2 pr-4">Browser</td>
                  <td className="py-2">iOS / Android</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 pr-4 text-text">Sync / Async</td>
                  <td className="py-2 pr-4">Synchronous</td>
                  <td className="py-2">Asynchronous (Promise-based)</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 pr-4 text-text">Value type</td>
                  <td className="py-2 pr-4">Strings only</td>
                  <td className="py-2">Strings only</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 pr-4 text-text">Encrypted</td>
                  <td className="py-2 pr-4">No</td>
                  <td className="py-2">No</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-text">Size limit</td>
                  <td className="py-2 pr-4">~5-10 MB</td>
                  <td className="py-2">~6 MB (Android default)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Installation */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">Installation</h2>
        <p className="text-text-muted leading-relaxed">
          AsyncStorage used to ship with React Native itself, but it was extracted into a community package.
          Install it with one command:
        </p>
        <CodeBlock
          code={`# Using npx (Expo default)
npx expo install @react-native-async-storage/async-storage

# Or with npm
npm install @react-native-async-storage/async-storage

# Or with yarn
yarn add @react-native-async-storage/async-storage`}
          language="bash"
          title="Terminal — install AsyncStorage"
        />
        <InfoBox variant="tip" title="Expo manages native modules for you">
          In a managed Expo project, you do not need to run <code className="text-accent">pod install</code> or link anything.
          The Expo CLI handles native dependencies automatically when you use <code className="text-accent">npx expo install</code>.
        </InfoBox>
      </section>

      {/* Basic API */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">Basic API</h2>
        <p className="text-text-muted leading-relaxed">
          The API mirrors <code className="text-accent">localStorage</code> almost exactly — but every method
          returns a <strong className="text-text">Promise</strong>, so you need <code className="text-accent">await</code>.
        </p>

        <CodeBlock
          code={`import AsyncStorage from '@react-native-async-storage/async-storage';

// Store a value
await AsyncStorage.setItem('@theme', 'dark');

// Read a value (returns string | null)
const theme = await AsyncStorage.getItem('@theme');  // 'dark'

// Remove a single key
await AsyncStorage.removeItem('@theme');

// Clear everything
await AsyncStorage.clear();`}
          language="typescript"
          title="AsyncStorage basics — just like localStorage, but async"
        />

        <InfoBox variant="info" title="Key naming convention">
          By convention, AsyncStorage keys are prefixed with <code className="text-accent">@</code> (e.g.
          <code className="text-accent"> @app:theme</code>, <code className="text-accent">@user:token</code>).
          This is not required, but it helps avoid collisions with other libraries that might use AsyncStorage.
        </InfoBox>
      </section>

      {/* Storing objects */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">Storing Objects & Arrays</h2>
        <p className="text-text-muted leading-relaxed">
          Just like <code className="text-accent">localStorage</code>, AsyncStorage only stores strings.
          To save objects or arrays, serialize them with <code className="text-accent">JSON.stringify</code> and parse
          them back with <code className="text-accent">JSON.parse</code>.
        </p>
        <CodeBlock
          code={`// Saving an object
const userSettings = {
  theme: 'dark',
  fontSize: 16,
  notifications: true,
};

await AsyncStorage.setItem(
  '@settings',
  JSON.stringify(userSettings)
);

// Reading it back
const raw = await AsyncStorage.getItem('@settings');
const settings = raw != null ? JSON.parse(raw) : null;
// settings = { theme: 'dark', fontSize: 16, notifications: true }`}
          language="typescript"
          title="Storing and reading objects"
        />

        <InfoBox variant="tip" title="Helper functions save repetition">
          You will write the <code className="text-accent">JSON.stringify / JSON.parse</code> pattern many times.
          Consider creating small helper functions to keep your code DRY:
        </InfoBox>

        <CodeBlock
          code={`// utils/storage.ts — reusable helpers
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function storeObject<T>(key: string, value: T): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function getObject<T>(key: string): Promise<T | null> {
  const raw = await AsyncStorage.getItem(key);
  return raw != null ? (JSON.parse(raw) as T) : null;
}

// Usage
await storeObject('@user:prefs', { theme: 'dark', lang: 'en' });
const prefs = await getObject<{ theme: string; lang: string }>('@user:prefs');`}
          language="typescript"
          title="Typed helper functions"
        />
      </section>

      {/* Common patterns */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">Common Patterns</h2>

        {/* Pattern 1: Load on mount */}
        <div className="rounded-2xl bg-card border border-border p-6 space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent font-mono font-bold text-sm">1</span>
            <h3 className="text-lg font-heading font-semibold text-text">Load saved data on mount</h3>
          </div>
          <p className="text-text-muted text-sm leading-relaxed">
            The most common pattern: read stored data when a component mounts, and show a loading state while waiting.
          </p>
          <CodeBlock
            code={`import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function SettingsScreen() {
  const [theme, setTheme] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('@theme').then((value) => {
      if (value) setTheme(value);
      setLoading(false);
    });
  }, []);

  const toggleTheme = async () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    await AsyncStorage.setItem('@theme', next);
  };

  if (loading) return <ActivityIndicator />;

  return (
    <View>
      <Text>Current theme: {theme ?? 'system default'}</Text>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
}`}
            language="tsx"
            title="Read from storage on component mount"
          />
        </div>

        {/* Pattern 2: Onboarding flag */}
        <div className="rounded-2xl bg-card border border-border p-6 space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-mono font-bold text-sm">2</span>
            <h3 className="text-lg font-heading font-semibold text-text">Onboarding / first-launch flag</h3>
          </div>
          <p className="text-text-muted text-sm leading-relaxed">
            Check whether the user has completed onboarding and skip it on subsequent launches.
          </p>
          <CodeBlock
            code={`// In your root layout or navigator
const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

useEffect(() => {
  AsyncStorage.getItem('@onboarded').then((value) => {
    setIsFirstLaunch(value === null);
  });
}, []);

const completeOnboarding = async () => {
  await AsyncStorage.setItem('@onboarded', 'true');
  setIsFirstLaunch(false);
};

// Then conditionally render:
// isFirstLaunch === null  → splash / loading
// isFirstLaunch === true  → <OnboardingScreen onComplete={completeOnboarding} />
// isFirstLaunch === false → <HomeScreen />`}
            language="tsx"
            title="First-launch onboarding flag"
          />
        </div>

        {/* Pattern 3: Multi operations */}
        <div className="rounded-2xl bg-card border border-border p-6 space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-purple/10 flex items-center justify-center text-purple font-mono font-bold text-sm">3</span>
            <h3 className="text-lg font-heading font-semibold text-text">Batch operations with multiGet / multiSet</h3>
          </div>
          <p className="text-text-muted text-sm leading-relaxed">
            Reading or writing multiple keys at once is more efficient than calling <code className="text-accent">getItem</code> in a loop.
          </p>
          <CodeBlock
            code={`// Write multiple keys at once
await AsyncStorage.multiSet([
  ['@user:name', 'Darren'],
  ['@user:email', 'darren@example.com'],
  ['@user:role', 'admin'],
]);

// Read multiple keys at once
const values = await AsyncStorage.multiGet([
  '@user:name',
  '@user:email',
  '@user:role',
]);
// values = [
//   ['@user:name',  'Darren'],
//   ['@user:email', 'darren@example.com'],
//   ['@user:role',  'admin'],
// ]

// Remove multiple keys at once
await AsyncStorage.multiRemove(['@user:name', '@user:email']);`}
            language="typescript"
            title="Batch read/write for efficiency"
          />
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">Interactive Demo</h2>
        <p className="text-text-muted leading-relaxed">
          Try it out! This simulates AsyncStorage in the browser. Set keys, read them back, and watch the operation log —
          just like working with the real API on a device.
        </p>
        <DemoBox title="AsyncStorage Simulator">
          <AsyncStorageDemo />
          <p className="text-sm text-text-muted mt-4">
            Every operation mirrors the real AsyncStorage API. In a real React Native app, these calls
            would persist to disk and survive app restarts.
          </p>
        </DemoBox>
      </section>

      {/* When NOT to use AsyncStorage */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">When Not to Use AsyncStorage</h2>
        <p className="text-text-muted leading-relaxed">
          AsyncStorage is great for simple data, but it is not the right tool for everything.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-card border border-border p-5 space-y-2">
            <p className="text-sm font-heading font-semibold text-primary">Good for</p>
            <ul className="text-sm text-text-muted space-y-1.5">
              <li className="flex items-start gap-2"><span className="text-primary mt-0.5">&#10003;</span> User preferences (theme, language)</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-0.5">&#10003;</span> Onboarding / first-launch flags</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-0.5">&#10003;</span> Auth tokens (non-sensitive apps)</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-0.5">&#10003;</span> Small cached data</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-0.5">&#10003;</span> Simple app state that needs to survive restarts</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-card border border-border p-5 space-y-2">
            <p className="text-sm font-heading font-semibold text-pink">Not ideal for</p>
            <ul className="text-sm text-text-muted space-y-1.5">
              <li className="flex items-start gap-2"><span className="text-pink mt-0.5">&#10007;</span> Sensitive data (use SecureStore instead)</li>
              <li className="flex items-start gap-2"><span className="text-pink mt-0.5">&#10007;</span> Large datasets (use SQLite / WatermelonDB)</li>
              <li className="flex items-start gap-2"><span className="text-pink mt-0.5">&#10007;</span> Complex queries (no filtering / indexing)</li>
              <li className="flex items-start gap-2"><span className="text-pink mt-0.5">&#10007;</span> Binary data (images, files)</li>
              <li className="flex items-start gap-2"><span className="text-pink mt-0.5">&#10007;</span> Real-time sync across devices</li>
            </ul>
          </div>
        </div>

        <InfoBox variant="warning" title="Never store passwords or secrets in AsyncStorage">
          AsyncStorage is <strong>not encrypted</strong>. On a rooted/jailbroken device, anyone can read the stored data.
          For sensitive information like auth tokens or passwords, use
          <code className="text-accent"> expo-secure-store</code> which stores data in the device keychain (iOS) or Keystore (Android).
        </InfoBox>
      </section>

      {/* Quick Reference */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">Quick Reference</h2>
        <CodeBlock
          code={`import AsyncStorage from '@react-native-async-storage/async-storage';

// ---- Single operations ----
await AsyncStorage.setItem(key, value)        // Store a string
await AsyncStorage.getItem(key)               // Read (string | null)
await AsyncStorage.removeItem(key)            // Delete one key
await AsyncStorage.mergeItem(key, value)      // Shallow merge (JSON objects)

// ---- Batch operations ----
await AsyncStorage.multiSet([[k1, v1], [k2, v2]])   // Store multiple
await AsyncStorage.multiGet([k1, k2])                // Read multiple
await AsyncStorage.multiRemove([k1, k2])             // Delete multiple
await AsyncStorage.multiMerge([[k1, v1], ...])       // Merge multiple

// ---- Utility ----
await AsyncStorage.getAllKeys()               // Get all stored keys
await AsyncStorage.clear()                    // Wipe everything`}
          language="typescript"
          title="AsyncStorage — complete API cheat sheet"
        />
      </section>
    </PageShell>
  )
}
