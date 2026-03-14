import { useState, createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import { PageShell } from '../../components/PageShell'
import { HooksSidebar } from '../../components/HooksSidebar'
import { CodeBlock } from '../../components/CodeBlock'
import { InfoBox } from '../../components/InfoBox'
import { DemoBox } from '../../components/DemoBox'

// --- Demo context and components ---
type Theme = 'light' | 'dark'

const DemoThemeContext = createContext<{
  theme: Theme
  toggleTheme: () => void
}>({ theme: 'light', toggleTheme: () => {} })

function DemoThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))
  return (
    <DemoThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </DemoThemeContext.Provider>
  )
}

function DemoHeader() {
  const { theme, toggleTheme } = useContext(DemoThemeContext)
  return (
    <div
      className={`flex items-center justify-between px-4 py-3 rounded-t-lg border-b ${
        theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'
      }`}
    >
      <span className="font-mono text-sm font-semibold">Header</span>
      <button
        onClick={toggleTheme}
        className={`px-3 py-1 rounded text-xs font-mono ${
          theme === 'dark' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-indigo-100 text-indigo-700'
        }`}
      >
        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </button>
    </div>
  )
}

function DemoCard() {
  const { theme } = useContext(DemoThemeContext)
  return (
    <div
      className={`p-4 rounded-lg border ${
        theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-gray-50 border-gray-200 text-gray-700'
      }`}
    >
      <p className="text-sm font-mono">
        Card reads theme from context: <strong>{theme}</strong>
      </p>
      <p className="text-xs mt-1 opacity-60">
        No props were passed — this component reads the theme directly via useContext.
      </p>
    </div>
  )
}

function DemoContent() {
  const { theme } = useContext(DemoThemeContext)
  return (
    <div
      className={`p-4 space-y-3 rounded-b-lg ${
        theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'
      }`}
    >
      <p className="text-sm font-mono">Content area (also reads theme from context)</p>
      <DemoCard />
    </div>
  )
}

// --- Page component ---
export function UseContextPage() {
  return (
    <PageShell
      title="useContext"
      subtitle="Share data across your entire component tree without passing props through every level — the solution to 'prop drilling'."
      gradient="from-primary to-cyan"
      badge="REACT HOOK"
      breadcrumbs={[{ label: 'Hooks' }, { label: 'useContext' }]}
      sidebar={<HooksSidebar />}
    >
      {/* The Problem */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">The Problem: Prop Drilling</h2>
        <p className="text-text-muted leading-relaxed">
          Imagine you have a theme setting (light/dark mode) that many components need.
          Without Context, you have to pass it as a prop through every intermediate component — even ones that do not use it:
        </p>
        <CodeBlock
          code={`// Without Context — "prop drilling"
type Theme = 'light' | 'dark';

interface ThemeProps {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

function App(): React.ReactElement {
  const [theme, setTheme] = useState<Theme>('light');
  return <Layout theme={theme} setTheme={setTheme} />;  // pass down
}

function Layout({ theme, setTheme }: ThemeProps): React.ReactElement {
  return <Sidebar theme={theme} setTheme={setTheme} />;  // pass through (doesn't use it!)
}

function Sidebar({ theme, setTheme }: ThemeProps): React.ReactElement {
  return <ThemeToggle theme={theme} setTheme={setTheme} />;  // pass through again
}

function ThemeToggle({ theme, setTheme }: ThemeProps): React.ReactElement {
  // Finally uses it!
  return <button onClick={(): void => setTheme(theme === 'light' ? 'dark' : 'light')}>Toggle</button>;
}`}
          language="tsx"
          title="The problem — props passed through layers that don't need them"
        />
        <p className="text-text-muted leading-relaxed">
          This gets painful fast. <strong className="text-text">Context</strong> lets any component in the tree access shared data directly,
          no matter how deeply nested it is.
        </p>
      </section>

      {/* The 3-step pattern */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">The 3-Step Pattern</h2>

        <h3 className="text-lg font-heading font-semibold text-text">Step 1: Create the Context</h3>
        <CodeBlock
          code={`import { createContext } from 'react';

// Create a context with a default value
type Theme = 'light' | 'dark';
const ThemeContext = createContext<Theme>('light');`}
          language="tsx"
          title="Step 1 — createContext"
        />

        <h3 className="text-lg font-heading font-semibold text-text mt-6">Step 2: Provide it at the top of the tree</h3>
        <CodeBlock
          code={`function App(): React.ReactElement {
  const [theme, setTheme] = useState<Theme>('light');

  return (
    // Wrap your component tree with the Provider
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Header />
      <Content />
      <Footer />
    </ThemeContext.Provider>
  );
}`}
          language="tsx"
          title="Step 2 — Provider wraps the tree"
        />

        <h3 className="text-lg font-heading font-semibold text-text mt-6">Step 3: Consume it with useContext</h3>
        <CodeBlock
          code={`import { useContext } from 'react';

function ThemeToggle(): React.ReactElement {
  // Read the value directly — no props needed!
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button onClick={(): void => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current theme: {theme}
    </button>
  );
}`}
          language="tsx"
          title="Step 3 — useContext reads the value"
        />
      </section>

      {/* Interactive Demo */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">Interactive Demo</h2>

        <DemoBox title="Theme Toggle with Context">
          <DemoThemeProvider>
            <div className="rounded-lg overflow-hidden border border-border">
              <DemoHeader />
              <DemoContent />
            </div>
          </DemoThemeProvider>
          <p className="text-sm text-text-muted mt-4">
            The toggle button in the Header updates the theme. The Content and Card components read the theme from context — no props are passed between them.
            Toggle the theme above to see every component react to the change.
          </p>
        </DemoBox>

        <h3 className="text-lg font-heading font-semibold text-text mt-8">Source Code for the Demo Above</h3>
        <CodeBlock
          code={`import { useState, createContext, useContext } from 'react';
import type { ReactNode } from 'react';

// ── Step 1: Create the context ──
// The generic type describes the shape of the value.
// The argument to createContext is a default (used if no Provider is found).
type Theme = 'light' | 'dark';

const DemoThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({ theme: 'light', toggleTheme: () => {} });

// ── Step 2: Create a Provider component ──
// This wraps part of your component tree and supplies the value.
function DemoThemeProvider({ children }: { children: ReactNode }): React.ReactElement {
  const [theme, setTheme] = useState<Theme>('light');
  const toggleTheme = (): void => setTheme((t: Theme) => (t === 'light' ? 'dark' : 'light'));

  // Every component inside this Provider can read { theme, toggleTheme }
  return (
    <DemoThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </DemoThemeContext.Provider>
  );
}

// ── Step 3: Consume with useContext ──
// These components can be deeply nested — no props needed.
function Header(): React.ReactElement {
  const { theme, toggleTheme } = useContext(DemoThemeContext);
  return (
    <div style={{ background: theme === 'dark' ? '#1f2937' : '#fff' }}>
      <span>Header</span>
      <button onClick={toggleTheme}>
        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </button>
    </div>
  );
}

function Card(): React.ReactElement {
  // This component reads theme directly — no prop was passed to it.
  const { theme } = useContext(DemoThemeContext);
  return <div>Card theme: {theme}</div>;
}

// ── Usage ──
function App(): React.ReactElement {
  return (
    <DemoThemeProvider>
      <Header />   {/* reads theme + toggleTheme */}
      <Card />     {/* reads theme */}
    </DemoThemeProvider>
  );
}`}
          language="tsx"
          title="Demo source code — Context theme toggle"
        />

        <p className="text-text-muted leading-relaxed">
          <strong className="text-text">Key takeaways:</strong>
        </p>
        <ul className="list-disc list-inside text-text-muted space-y-2 ml-2">
          <li>
            <code className="text-accent">createContext</code> creates the "channel" that data flows through. The type parameter ensures consumers get the right shape.
          </li>
          <li>
            The <strong className="text-text">Provider</strong> component wraps a section of the tree and supplies the <code className="text-accent">value</code>.
            Any component inside the Provider can read that value.
          </li>
          <li>
            <code className="text-accent">useContext(DemoThemeContext)</code> returns whatever value the nearest Provider above it supplies.
            When the Provider's value changes, every consumer automatically re-renders.
          </li>
          <li>
            <strong className="text-text">Header</strong> and <strong className="text-text">Card</strong> both read the theme without receiving any props — that is the power of Context.
          </li>
        </ul>
      </section>

      {/* React Native equivalent */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">In React Native</h2>
        <p className="text-text-muted leading-relaxed">
          Context works exactly the same in React Native. Here is a common pattern for app-wide theming:
        </p>
        <CodeBlock
          code={`import { createContext, useContext, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import type { ReactNode } from 'react';

// 1. Create
type Theme = 'light' | 'dark';
const ThemeContext = createContext<{
  theme: Theme;
  toggle: () => void;
}>({ theme: 'light', toggle: () => {} });

// 2. Provider
export function ThemeProvider({ children }: { children: ReactNode }): React.ReactElement {
  const [theme, setTheme] = useState<Theme>('light');
  const toggle = (): void => setTheme((t: Theme) => t === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Consume — use in any screen or component
export function SettingsScreen(): React.ReactElement {
  const { theme, toggle } = useContext(ThemeContext);

  return (
    <View style={[styles.container, theme === 'dark' && styles.dark]}>
      <Text style={theme === 'dark' ? styles.lightText : styles.darkText}>
        Current theme: {theme}
      </Text>
      <Button title="Toggle Theme" onPress={toggle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  dark: { backgroundColor: '#1a1a2e' },
  lightText: { color: '#fff', fontSize: 18, marginBottom: 16 },
  darkText: { color: '#000', fontSize: 18, marginBottom: 16 },
});`}
          language="tsx"
          title="React Native — Context for theming"
        />
      </section>

      {/* Tips */}
      <section className="space-y-4">
        <h2 className="text-2xl font-heading font-bold text-text">Tips and Gotchas</h2>

        <InfoBox variant="tip" title="Great use cases for Context">
          Theme (light/dark mode), authentication (current user), locale/language, and feature flags.
          These are values that many components need and rarely change.
        </InfoBox>

        <InfoBox variant="warning" title="Don't put everything in Context">
          Context is not a replacement for props. If only one or two components need a value,
          just pass it as a prop. Context adds complexity and makes components less reusable.
        </InfoBox>

        <InfoBox variant="warning" title="Context re-renders all consumers">
          When the Provider's value changes, <em>every</em> component that calls <code className="text-accent">useContext</code> for that context will re-render.
          For frequently changing values (like mouse position), this can be a performance issue. Consider splitting into multiple contexts.
        </InfoBox>

        <InfoBox variant="tip" title="Custom hook pattern">
          Wrap <code className="text-accent">useContext</code> in a custom hook for cleaner code:
          <code className="text-accent block mt-2">
            {`export function useTheme(): ThemeContextType { return useContext(ThemeContext); }`}
          </code>
          Now consumers just call <code className="text-accent">useTheme()</code> instead of importing both the context and the hook.
        </InfoBox>
      </section>
    </PageShell>
  )
}
