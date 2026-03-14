import { PageShell } from '../../components/PageShell'
import { HooksSidebar } from '../../components/HooksSidebar'
import { CodeBlock } from '../../components/CodeBlock'
import { InfoBox } from '../../components/InfoBox'

export function ModulesPage() {
  return (
    <PageShell
      title="JavaScript Modules"
      subtitle="How modern JavaScript splits code into reusable files — and why every React import depends on it."
      gradient="from-warning to-accent"
      badge="JS FUNDAMENTALS"
      breadcrumbs={[{ label: 'Basics' }, { label: 'Modules' }]}
      sidebar={<HooksSidebar />}
    >
      {/* Why modules? */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">Why Modules?</h2>
        <p className="text-text-muted leading-relaxed">
          In the early days of JavaScript, all code lived in one file (or a few files loaded with <code className="text-accent">&lt;script&gt;</code> tags).
          Every variable was global, and if two files used the same name — things broke silently.
        </p>
        <CodeBlock
          code={`<!-- The old way — everything is global -->
<script src="utils.js"></script>
<script src="app.js"></script>

<!-- If both files declare "function validate()" — the second one
     silently overwrites the first. No errors, just bugs. -->`}
          language="html"
          title="The problem with script tags"
        />
        <p className="text-text-muted leading-relaxed">
          <strong className="text-text">Modules</strong> solve this by giving each file its own scope.
          Nothing leaks out unless you explicitly <code className="text-accent">export</code> it,
          and nothing comes in unless you explicitly <code className="text-accent">import</code> it.
        </p>
      </section>

      {/* Named exports */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">Named Exports</h2>
        <p className="text-text-muted leading-relaxed">
          A <strong className="text-text">named export</strong> lets you share specific values from a file.
          You can have as many as you want.
        </p>
        <CodeBlock
          code={`// math.ts — exporting two functions by name
export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}`}
          language="typescript"
          title="math.ts — named exports"
        />
        <CodeBlock
          code={`// app.ts — importing only what you need
import { add, subtract } from './math';

console.log(add(2, 3));      // 5
console.log(subtract(10, 4)); // 6`}
          language="typescript"
          title="app.ts — named imports"
        />
        <InfoBox variant="info" title="The curly braces matter">
          With named imports, the curly braces <code className="text-accent">{'{ }'}</code> are required, and the names must
          match exactly what was exported. <code className="text-accent">{'import { add }'}</code> works
          because <code className="text-accent">math.ts</code> exported something called <code className="text-accent">add</code>.
        </InfoBox>
      </section>

      {/* Default exports */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">Default Exports</h2>
        <p className="text-text-muted leading-relaxed">
          A <strong className="text-text">default export</strong> is the "main thing" a file provides.
          Each file can only have <strong className="text-text">one</strong> default export.
        </p>
        <CodeBlock
          code={`// Button.tsx — one main thing to export
interface ButtonProps {
  label: string;
}

export default function Button({ label }: ButtonProps): React.ReactElement {
  return <button>{label}</button>;
}`}
          language="tsx"
          title="Button.tsx — default export"
        />
        <CodeBlock
          code={`// App.tsx — importing a default export
import Button from './Button';
//     ^ no curly braces — and you can name it anything

import MyButton from './Button';  // this works too!`}
          language="typescript"
          title="App.tsx — default import"
        />
        <InfoBox variant="tip" title="Named vs. default — when to use which?">
          Use <strong>default exports</strong> when a file has one primary thing (a component, a class).
          Use <strong>named exports</strong> when a file provides multiple utilities.
          In React, most component files use default exports, while utility/helper files use named exports.
        </InfoBox>
      </section>

      {/* Mixing both */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">Mixing Both</h2>
        <p className="text-text-muted leading-relaxed">
          A file can have one default export and multiple named exports at the same time.
        </p>
        <CodeBlock
          code={`// Avatar.tsx
export const SIZES: Record<string, number> = { sm: 32, md: 48, lg: 64 };

interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Avatar({ name, size = 'md' }: AvatarProps): React.ReactElement {
  return <img alt={name} width={SIZES[size]} />;
}`}
          language="tsx"
          title="Avatar.tsx — default + named exports"
        />
        <CodeBlock
          code={`// Using both in one import statement
import Avatar, { SIZES } from './Avatar';
//     ^default  ^named`}
          language="typescript"
          title="Importing both at once"
        />
      </section>

      {/* Importing from packages */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">Importing from Packages</h2>
        <p className="text-text-muted leading-relaxed">
          So far we have imported from our own files using relative paths like <code className="text-accent">'./math'</code>.
          But you can also import from <strong className="text-text">packages</strong> — libraries installed
          via <code className="text-accent">npm</code>. When you do, you just use the package name, no path needed.
        </p>
        <CodeBlock
          code={`// Importing from installed packages (no ./ prefix)
import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Link } from 'expo-router';

// Importing from your own files (relative path)
import Button from './components/Button';
import { formatDate } from './utils/dates';`}
          language="typescript"
          title="Packages vs. your own files"
        />
        <InfoBox variant="info" title="How to tell them apart">
          If the import path starts with <code className="text-accent">./</code> or <code className="text-accent">../</code> — it is a local file.
          If it is just a name like <code className="text-accent">'react'</code> — it is an installed package from <code className="text-accent">node_modules</code>.
        </InfoBox>
      </section>

      {/* How React uses modules */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">How React Uses Modules</h2>
        <p className="text-text-muted leading-relaxed">
          Now you can read any React file and understand the top lines. Here is a typical React component:
        </p>
        <CodeBlock
          code={`// 1. Import hooks from the 'react' package (named imports)
import { useState } from 'react';

// 2. Import a component from a local file (default import)
import Button from './Button';

// 3. Define your component
function Counter(): React.ReactElement {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <p>Count: {count}</p>
      <Button label="Add" onClick={(): void => setCount(count + 1)} />
    </div>
  );
}

// 4. Export it so other files can use it
export default Counter;`}
          language="tsx"
          title="A typical React component file"
        />
        <p className="text-text-muted leading-relaxed">
          Every React file follows this pattern: <strong className="text-text">import</strong> what you need at the top,
          define your component, and <strong className="text-text">export</strong> it at the bottom.
          That is the entire module system in action.
        </p>
      </section>

      {/* Quick reference */}
      <section className="space-y-4">
        <h2 className="text-2xl font-heading font-bold text-text">Quick Reference</h2>
        <CodeBlock
          code={`// ── Named export / import ──
export function greet(name: string): string { ... }  // exporting
import { greet } from './utils';                     // importing (braces required)

// ── Default export / import ──
export default function App(): React.ReactElement { ... }     // exporting
import App from './App';                  // importing (no braces, any name)

// ── Both at once ──
import App, { THEME } from './App';       // default + named

// ── Package vs. local ──
import { useState } from 'react';        // package (no ./)
import Header from './components/Header'; // local file (./ or ../)`}
          language="typescript"
          title="Cheat sheet"
        />
      </section>
    </PageShell>
  )
}
