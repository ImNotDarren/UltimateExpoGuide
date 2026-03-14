import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { CodeBlock } from '../components/CodeBlock'
import { InfoBox } from '../components/InfoBox'

const TABS = [
  {
    id: 'jsx',
    label: 'JSX',
    gradient: 'from-accent to-purple',
  },
  {
    id: 'components',
    label: 'Components',
    gradient: 'from-cyan to-info',
  },
  {
    id: 'props',
    label: 'Props',
    gradient: 'from-primary to-cyan',
  },
  {
    id: 'state',
    label: 'State',
    gradient: 'from-pink to-orange',
  },
]

const JSX_HTML = `<!-- Regular HTML -->
<div class="card">
  <h2>Hello</h2>
  <img src="photo.jpg" alt="A photo">
  <button onclick="handleClick()">
    Click me
  </button>
</div>`

const JSX_REACT = `// JSX — HTML-like syntax inside JavaScript
function Card(): React.ReactElement {
  return (
    <div className="card">
      <h2>Hello</h2>
      <img src="photo.jpg" alt="A photo" />
      <button onClick={handleClick}>
        Click me
      </button>
    </div>
  );
}`

const COMP_VANILLA = `<!-- index.html -->
<div id="greeting"></div>

<script>
  // Vanilla JS — manual DOM manipulation
  const el = document.getElementById('greeting');
  el.innerHTML = '<h1>Hello, World!</h1>';
  el.innerHTML += '<p>Welcome to the app.</p>';

  // Need another greeting? Copy-paste or
  // write a function that creates DOM nodes:
  function createGreeting(name) {
    const div = document.createElement('div');
    const h1 = document.createElement('h1');
    h1.textContent = 'Hello, ' + name + '!';
    div.appendChild(h1);
    return div;
  }
</script>`

const COMP_REACT = `// React — describe what you want, React handles the DOM
interface GreetingProps {
  name: string;
}

function Greeting({ name }: GreetingProps): React.ReactElement {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Welcome to the app.</p>
    </div>
  );
}

// Reuse it like an HTML tag:
function App(): React.ReactElement {
  return (
    <div>
      <Greeting name="Alice" />
      <Greeting name="Bob" />
      <Greeting name="Charlie" />
    </div>
  );
}`

const PROPS_VANILLA = `<!-- Vanilla: pass data via function arguments -->
<div id="cards"></div>

<script>
  function createCard(title, description, color) {
    const div = document.createElement('div');
    div.className = 'card';
    div.style.borderColor = color;
    div.innerHTML =
      '<h3>' + title + '</h3>' +
      '<p>' + description + '</p>';
    return div;
  }

  const container = document.getElementById('cards');
  container.appendChild(
    createCard('React', 'A UI library', 'blue')
  );
  container.appendChild(
    createCard('Expo', 'Mobile framework', 'green')
  );
</script>`

const PROPS_REACT = `// React: pass data via props (like HTML attributes)
interface CardProps {
  title: string;
  description: string;
  color: string;
}

function Card({ title, description, color }: CardProps): React.ReactElement {
  return (
    <div
      className="card"
      style={{ borderColor: color }}
    >
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

// Use it — props flow one way: parent → child
function App(): React.ReactElement {
  return (
    <div>
      <Card title="React" description="A UI library" color="blue" />
      <Card title="Expo" description="Mobile framework" color="green" />
    </div>
  );
}`

const STATE_VANILLA = `<!-- Vanilla JS: manual state tracking + DOM updates -->
<p id="count-display">Count: 0</p>
<button id="increment-btn">+1</button>

<script>
  let count = 0;

  const display = document.getElementById('count-display');
  const btn = document.getElementById('increment-btn');

  btn.addEventListener('click', () => {
    count++;
    // YOU must update the DOM yourself:
    display.textContent = 'Count: ' + count;
  });

  // Problem: as apps grow, keeping the DOM
  // in sync with your data gets very messy.
</script>`

const STATE_REACT = `import { useState } from 'react';

// React: declare state, React keeps the DOM in sync
function Counter(): React.ReactElement {
  // count = the value, setCount = function to update it
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      {/* React auto-updates this when count changes */}
      <p>Count: {count}</p>
      <button onClick={(): void => setCount(count + 1)}>
        +1
      </button>
    </div>
  );
}

// React re-renders the component when state changes.
// You never touch the DOM directly — just update state.`

const TAB_CONTENT: Record<string, {
  title: string
  desc: string
  leftTitle: string
  rightTitle: string
  leftCode: string
  rightCode: string
  leftLang: string
  rightLang: string
  tip: React.ReactNode
}> = {
  jsx: {
    title: 'JSX — HTML inside JavaScript',
    desc: 'JSX looks like HTML but lives inside your JavaScript files. React uses it to describe what the UI should look like. A few small syntax differences:',
    leftTitle: 'HTML',
    rightTitle: 'JSX (React)',
    leftCode: JSX_HTML,
    rightCode: JSX_REACT,
    leftLang: 'html',
    rightLang: 'tsx',
    tip: (
      <>
        <strong>Key differences:</strong> <code>class</code> becomes <code>className</code>, all tags must close (<code>&lt;img /&gt;</code>), event handlers use camelCase (<code>onClick</code>), and you embed JS expressions with curly braces <code>{'{}'}</code>.
      </>
    ),
  },
  components: {
    title: 'Components — reusable UI pieces',
    desc: 'In vanilla JS, you build UI by manipulating the DOM directly. In React, you write functions that return JSX. Each function is a "component" — a reusable building block.',
    leftTitle: 'Vanilla JS',
    rightTitle: 'React Component',
    leftCode: COMP_VANILLA,
    rightCode: COMP_REACT,
    leftLang: 'html',
    rightLang: 'tsx',
    tip: (
      <>
        A component is just a <strong>function that returns JSX</strong>. Component names must start with an uppercase letter. You use them like custom HTML tags: <code>&lt;Greeting /&gt;</code>.
      </>
    ),
  },
  props: {
    title: 'Props — passing data to components',
    desc: 'Props are how you pass data from a parent component to a child, similar to function arguments or HTML attributes.',
    leftTitle: 'Vanilla JS',
    rightTitle: 'React Props',
    leftCode: PROPS_VANILLA,
    rightCode: PROPS_REACT,
    leftLang: 'html',
    rightLang: 'tsx',
    tip: (
      <>
        Props flow <strong>one direction only</strong>: parent to child. With TypeScript, you define an interface for your props — this gives you autocomplete and catches mistakes at compile time.
      </>
    ),
  },
  state: {
    title: 'State — data that changes over time',
    desc: 'State is the big idea that makes React powerful. Instead of manually updating the DOM when data changes, you update state and React re-renders for you.',
    leftTitle: 'Vanilla JS',
    rightTitle: 'React useState',
    leftCode: STATE_VANILLA,
    rightCode: STATE_REACT,
    leftLang: 'html',
    rightLang: 'tsx',
    tip: (
      <>
        <code>useState</code> returns a pair: the current value and a setter function. When you call the setter, React re-runs your component function with the new value and updates only the parts of the DOM that changed.
      </>
    ),
  },
}

export function ReactPrimer() {
  const [activeTab, setActiveTab] = useState('jsx')
  const content = TAB_CONTENT[activeTab]

  return (
    <section id="react-primer" className="relative py-28 px-6">
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-card border border-accent/30 text-accent text-xs font-mono mb-6">
            REACT PRIMER
          </span>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold tracking-tight">
            <span className="bg-gradient-to-r from-accent to-cyan bg-clip-text text-transparent">React in 5 minutes</span> for JS/TS developers
          </h2>
          <p className="mt-4 text-text-muted max-w-2xl mx-auto text-lg">
            Expo uses React under the hood. If you know HTML, CSS, and JavaScript/TypeScript, you're 90% there. Here's the other 10%.
          </p>
        </div>

        {/* What is React? */}
        <div className="mb-12 rounded-2xl bg-card border border-border p-8 shadow-lg shadow-black/10">
          <h3 className="text-2xl font-heading font-bold text-text mb-4">What is React?</h3>
          <p className="text-text-muted leading-relaxed mb-4">
            React is a JavaScript library for building user interfaces. Instead of writing HTML files and manipulating the DOM with <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">document.getElementById()</code>, you write <strong className="text-text">components</strong> — JavaScript functions that describe what the UI should look like based on your data.
          </p>
          <p className="text-text-muted leading-relaxed">
            When your data changes, React figures out what part of the page needs updating and does it for you. Four concepts to learn:
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
            {TABS.map((tab) => (
              <div
                key={tab.id}
                className="flex items-center gap-3 p-4 rounded-xl bg-bg-soft border border-border"
              >
                <span className={`w-9 h-9 rounded-lg bg-gradient-to-br ${tab.gradient} flex items-center justify-center text-white font-heading font-bold text-sm shrink-0`}>
                  {TABS.indexOf(tab) + 1}
                </span>
                <span className="font-heading font-semibold text-text text-sm">{tab.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tab pills */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex gap-1.5 p-1.5 rounded-2xl bg-card border border-border">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-6 py-3 rounded-xl text-sm font-heading font-semibold transition-all ${
                  activeTab === t.id
                    ? `bg-gradient-to-r ${t.gradient} text-white shadow-lg`
                    : 'text-text-muted hover:text-text hover:bg-surface'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div>
          <h3 className="text-2xl font-heading font-bold mb-2">{content.title}</h3>
          <p className="text-text-muted mb-8 text-lg leading-relaxed">{content.desc}</p>

          <div className="grid lg:grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-mono text-text-muted uppercase tracking-wider mb-2 px-1">{content.leftTitle}</div>
              <CodeBlock code={content.leftCode} language={content.leftLang} showLineNumbers={false} />
            </div>
            <div>
              <div className="text-xs font-mono text-accent uppercase tracking-wider mb-2 px-1">{content.rightTitle}</div>
              <CodeBlock code={content.rightCode} language={content.rightLang} showLineNumbers={false} />
            </div>
          </div>

          <div className="mt-6">
            <InfoBox variant="tip">{content.tip}</InfoBox>
          </div>
        </div>

        {/* Deep dive links */}
        <div className="mt-20">
          <h3 className="text-2xl font-heading font-bold text-text text-center mb-3">Ready to go deeper?</h3>
          <p className="text-text-muted text-center mb-10 max-w-xl mx-auto">
            Detailed guides with interactive demos for every React hook and Expo navigation concept.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { label: 'useState', desc: 'Manage component data', to: '/hooks/useState', gradient: 'from-accent to-purple' },
              { label: 'useEffect', desc: 'Side effects & lifecycle', to: '/hooks/useEffect', gradient: 'from-cyan to-info' },
              { label: 'useRef', desc: 'Persistent references', to: '/hooks/useRef', gradient: 'from-pink to-orange' },
              { label: 'useContext', desc: 'Share data across components', to: '/hooks/useContext', gradient: 'from-primary to-cyan' },
              { label: 'useCallback & useMemo', desc: 'Performance optimization', to: '/hooks/useCallback', gradient: 'from-info to-accent' },
              { label: 'Navigation Guide', desc: 'Screens, routing & navigation', to: '/navigation', gradient: 'from-primary to-cyan' },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="group flex items-center justify-between gap-3 p-5 rounded-xl bg-card border border-border hover:border-border-light transition-all glow-card"
              >
                <div>
                  <p className={`font-heading font-semibold text-sm bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>{item.label}</p>
                  <p className="text-xs text-text-muted mt-1">{item.desc}</p>
                </div>
                <ArrowRight size={16} className="text-text-muted group-hover:text-accent transition-colors shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
