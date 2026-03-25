import { useState } from 'react'
import { PageShell } from '../../components/PageShell'
import { HooksSidebar } from '../../components/HooksSidebar'
import { CodeBlock } from '../../components/CodeBlock'
import { InfoBox } from '../../components/InfoBox'
import { DemoBox } from '../../components/DemoBox'

// --- Interactive Redux-like demo ---
interface Todo {
  id: number
  text: string
  completed: boolean
}

type TodoAction =
  | { type: 'ADD_TODO'; text: string }
  | { type: 'TOGGLE_TODO'; id: number }
  | { type: 'REMOVE_TODO'; id: number }

function todoReducer(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { id: Date.now(), text: action.text, completed: false }]
    case 'TOGGLE_TODO':
      return state.map((t) => (t.id === action.id ? { ...t, completed: !t.completed } : t))
    case 'REMOVE_TODO':
      return state.filter((t) => t.id !== action.id)
    default:
      return state
  }
}

function ReduxDemo() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn Redux concepts', completed: true },
    { id: 2, text: 'Install Redux Toolkit', completed: false },
    { id: 3, text: 'Build something awesome', completed: false },
  ])
  const [input, setInput] = useState('')
  const [log, setLog] = useState<string[]>(['Store initialized with 3 todos'])

  const dispatch = (action: TodoAction) => {
    setTodos((prev) => todoReducer(prev, action))
    setLog((prev) => [`dispatch(${JSON.stringify(action)})`, ...prev].slice(0, 6))
  }

  const handleAdd = () => {
    if (!input.trim()) return
    dispatch({ type: 'ADD_TODO', text: input.trim() })
    setInput('')
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {/* UI Side */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            placeholder="Add a todo..."
            className="flex-1 px-3 py-2 rounded-lg bg-surface border border-border text-text text-sm font-mono placeholder:text-text-muted/40 focus:outline-none focus:border-accent"
          />
          <button
            onClick={handleAdd}
            className="px-4 py-2 rounded-lg bg-accent text-white text-sm font-mono font-semibold hover:bg-accent/80 transition-colors"
          >
            Add
          </button>
        </div>
        <div className="space-y-1.5">
          {todos.map((todo) => (
            <div key={todo.id} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-surface border border-border group">
              <button
                onClick={() => dispatch({ type: 'TOGGLE_TODO', id: todo.id })}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                  todo.completed ? 'bg-primary border-primary' : 'border-text-muted/30 hover:border-primary'
                }`}
              >
                {todo.completed && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
              <span className={`flex-1 text-sm font-mono ${todo.completed ? 'line-through text-text-muted/50' : 'text-text'}`}>
                {todo.text}
              </span>
              <button
                onClick={() => dispatch({ type: 'REMOVE_TODO', id: todo.id })}
                className="text-text-muted/30 hover:text-pink text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity"
              >
                remove
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Action Log Side */}
      <div className="rounded-lg bg-code-bg border border-border p-4">
        <p className="text-xs font-mono text-accent mb-3 uppercase tracking-wider">Action Log (Redux DevTools style)</p>
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
export function ReduxPage() {
  return (
    <PageShell
      title="Redux for Beginners"
      subtitle="A predictable state container for JavaScript apps — learn how to manage complex application state with Redux Toolkit in React Native and Expo."
      gradient="from-purple to-pink"
      badge="STATE MANAGEMENT"
      breadcrumbs={[{ label: 'State Management' }, { label: 'Redux' }]}
      sidebar={<HooksSidebar />}
    >
      {/* What is Redux? */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">What is Redux?</h2>
        <p className="text-text-muted leading-relaxed">
          <strong className="text-text">Redux</strong> is a state management library that gives your entire app a single,
          centralized place to store data. Instead of scattering state across dozens of components,
          Redux keeps everything in one <strong className="text-text">store</strong> — like a database for your UI.
        </p>
        <p className="text-text-muted leading-relaxed">
          Think of it like a bank. You do not reach into the vault and move money around yourself.
          Instead, you fill out a form (an <strong className="text-text">action</strong>) describing what you want to do.
          A teller (the <strong className="text-text">reducer</strong>) processes that form and updates your account
          (the <strong className="text-text">store</strong>) according to strict rules. Every transaction is logged,
          so you can trace exactly how the balance changed over time.
        </p>

        <InfoBox variant="info" title="When do you need Redux?">
          Redux is most useful when your app has <strong>lots of state shared between many components</strong> — things like
          authentication, shopping carts, notifications, or cached server data. For small apps with simple state,
          React's built-in <code className="text-accent">useState</code> and <code className="text-accent">useContext</code> are
          usually enough.
        </InfoBox>
      </section>

      {/* Core Concepts */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">Core Concepts</h2>
        <p className="text-text-muted leading-relaxed">
          Redux has three building blocks. Once you understand these, everything else clicks into place.
        </p>

        {/* Store */}
        <div className="rounded-2xl bg-card border border-border p-6 space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-purple/10 flex items-center justify-center text-purple font-mono font-bold text-sm">1</span>
            <h3 className="text-lg font-heading font-semibold text-text">Store</h3>
          </div>
          <p className="text-text-muted text-sm leading-relaxed">
            The <strong className="text-text">single source of truth</strong> for your app's data. It is a plain JavaScript object
            that holds your entire application state. There is only <em>one</em> store per app.
          </p>
          <CodeBlock
            code={`// What a store's state might look like
{
  user: { name: 'Darren', loggedIn: true },
  todos: [
    { id: 1, text: 'Learn Redux', completed: false },
  ],
  notifications: { unread: 3 },
}`}
            language="tsx"
            title="Store — a snapshot of your entire app state"
          />
        </div>

        {/* Actions */}
        <div className="rounded-2xl bg-card border border-border p-6 space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent font-mono font-bold text-sm">2</span>
            <h3 className="text-lg font-heading font-semibold text-text">Actions</h3>
          </div>
          <p className="text-text-muted text-sm leading-relaxed">
            Plain objects that describe <strong className="text-text">what happened</strong>. Every action must have
            a <code className="text-accent">type</code> property (a string label) and can optionally carry data (<code className="text-accent">payload</code>).
            Actions are the <em>only</em> way to trigger a state change.
          </p>
          <CodeBlock
            code={`// Actions are plain objects with a "type" field
const addTodoAction = {
  type: 'todos/add',
  payload: { text: 'Learn Redux' },
};

const toggleTodoAction = {
  type: 'todos/toggle',
  payload: { id: 1 },
};

const logoutAction = {
  type: 'auth/logout',
  // no payload needed
};`}
            language="tsx"
            title="Actions — describe what happened"
          />
        </div>

        {/* Reducers */}
        <div className="rounded-2xl bg-card border border-border p-6 space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-mono font-bold text-sm">3</span>
            <h3 className="text-lg font-heading font-semibold text-text">Reducers</h3>
          </div>
          <p className="text-text-muted text-sm leading-relaxed">
            Pure functions that take the <strong className="text-text">current state</strong> and an <strong className="text-text">action</strong>,
            then return a <strong className="text-text">new state</strong>. They specify <em>how</em> the state changes in response to each action.
            Reducers must never mutate the existing state — they always return a new object.
          </p>
          <CodeBlock
            code={`// (currentState, action) => newState
function todosReducer(
  state: Todo[] = [],
  action: { type: string; payload?: any }
): Todo[] {
  switch (action.type) {
    case 'todos/add':
      // Return a NEW array with the new todo appended
      return [...state, {
        id: Date.now(),
        text: action.payload.text,
        completed: false,
      }];

    case 'todos/toggle':
      // Return a NEW array with the matching todo toggled
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );

    default:
      // Unknown action? Return state unchanged.
      return state;
  }
}`}
            language="tsx"
            title="Reducer — a pure function that computes new state"
          />
        </div>

        {/* Data flow diagram */}
        <div className="rounded-2xl bg-card border border-border p-6 space-y-4">
          <h3 className="text-lg font-heading font-semibold text-text">The Redux Data Flow</h3>
          <div className="flex flex-col items-center gap-2 text-sm font-mono">
            <div className="px-4 py-2 rounded-lg bg-surface border border-border text-text">
              User clicks a button
            </div>
            <span className="text-accent">&#8595; dispatch(action)</span>
            <div className="px-4 py-2 rounded-lg bg-accent/10 border border-accent/30 text-accent font-semibold">
              Action: &#123; type: 'todos/add', payload: &#123; text: '...' &#125; &#125;
            </div>
            <span className="text-primary">&#8595; sent to reducer</span>
            <div className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary font-semibold">
              Reducer computes new state
            </div>
            <span className="text-purple">&#8595; store updates</span>
            <div className="px-4 py-2 rounded-lg bg-purple/10 border border-purple/30 text-purple font-semibold">
              Store &#8594; Components re-render with new data
            </div>
          </div>
          <p className="text-text-muted text-sm leading-relaxed text-center">
            This <strong className="text-text">one-way data flow</strong> makes state changes predictable and easy to debug.
          </p>
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">Interactive Demo</h2>
        <p className="text-text-muted leading-relaxed">
          This todo list simulates how Redux works. Add, toggle, and remove todos — watch the action log on the right
          to see every dispatched action, just like Redux DevTools would show you.
        </p>
        <DemoBox title="Redux-Style Todo List">
          <ReduxDemo />
          <p className="text-sm text-text-muted mt-4">
            Every interaction dispatches an action object. The reducer processes it and returns a new state.
            The component re-renders with the updated data. This is the Redux pattern in action.
          </p>
        </DemoBox>
      </section>

      {/* Redux Toolkit */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">Redux Toolkit — The Modern Way</h2>
        <p className="text-text-muted leading-relaxed">
          Writing Redux from scratch requires a lot of boilerplate. <strong className="text-text">Redux Toolkit (RTK)</strong> is
          the official, recommended way to write Redux logic. It simplifies store setup, reduces boilerplate,
          and includes useful utilities out of the box.
        </p>

        <InfoBox variant="tip" title="Always use Redux Toolkit">
          The Redux team officially recommends Redux Toolkit for all new Redux code. Do not use the legacy
          <code className="text-accent"> createStore </code> API — it is considered deprecated. Redux Toolkit's
          <code className="text-accent"> configureStore </code> is the modern replacement.
        </InfoBox>
      </section>

      {/* Step by Step Setup */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">Step-by-Step Setup</h2>
        <p className="text-text-muted leading-relaxed">
          Let's set up Redux Toolkit in an Expo project from scratch. Follow each step in order.
        </p>

        {/* Step 1 */}
        <div className="rounded-2xl bg-card border border-border p-6 space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent font-mono font-bold text-sm">1</span>
            <h3 className="text-lg font-heading font-semibold text-text">Install the packages</h3>
          </div>
          <p className="text-text-muted text-sm leading-relaxed">
            You need two packages: <code className="text-accent">@reduxjs/toolkit</code> (the core library with utilities)
            and <code className="text-accent">react-redux</code> (the React bindings that connect Redux to your components).
          </p>
          <CodeBlock
            code={`# Using npx (Expo default)
npx expo install @reduxjs/toolkit react-redux

# Or with npm
npm install @reduxjs/toolkit react-redux

# Or with yarn
yarn add @reduxjs/toolkit react-redux`}
            language="bash"
            title="Terminal — install Redux Toolkit and React Redux"
          />
          <InfoBox variant="info" title="Why two packages?">
            <code className="text-accent">@reduxjs/toolkit</code> handles state logic (store, slices, reducers).
            <code className="text-accent"> react-redux</code> provides hooks like <code className="text-accent">useSelector</code> and
            <code className="text-accent"> useDispatch</code> that let React components talk to the store.
            They are separate because Redux itself is framework-agnostic.
          </InfoBox>
        </div>

        {/* Step 2 */}
        <div className="rounded-2xl bg-card border border-border p-6 space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent font-mono font-bold text-sm">2</span>
            <h3 className="text-lg font-heading font-semibold text-text">Create a Slice</h3>
          </div>
          <p className="text-text-muted text-sm leading-relaxed">
            A <strong className="text-text">slice</strong> is a collection of Redux reducer logic and actions for a single feature.
            It is the building block of your Redux state. Each slice manages one piece of your store.
          </p>
          <CodeBlock
            code={`// store/counterSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Define the shape of this slice's state
interface CounterState {
  value: number;
}

// Set the initial state
const initialState: CounterState = {
  value: 0,
};

// createSlice generates action creators and reducers for you
const counterSlice = createSlice({
  name: 'counter',            // used as a prefix for action types
  initialState,
  reducers: {
    // Each function here becomes an action creator AND a reducer case
    increment(state) {
      // Redux Toolkit uses Immer under the hood,
      // so you CAN "mutate" state directly here — it's safe!
      state.value += 1;
    },
    decrement(state) {
      state.value -= 1;
    },
    incrementByAmount(state, action: PayloadAction<number>) {
      // PayloadAction<number> means action.payload is a number
      state.value += action.payload;
    },
    reset(state) {
      state.value = 0;
    },
  },
});

// Export the auto-generated action creators
export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions;

// Export the reducer (we'll add this to the store)
export default counterSlice.reducer;`}
            language="tsx"
            title="store/counterSlice.ts — your first slice"
          />
          <InfoBox variant="tip" title="Immer makes mutation safe">
            Notice how we write <code className="text-accent">state.value += 1</code> instead of returning a new object.
            Redux Toolkit uses a library called <strong>Immer</strong> internally. You write code that <em>looks</em> like
            mutation, but Immer produces a proper immutable update behind the scenes. This is only safe inside
            <code className="text-accent"> createSlice</code> reducers.
          </InfoBox>
        </div>

        {/* Step 3 */}
        <div className="rounded-2xl bg-card border border-border p-6 space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent font-mono font-bold text-sm">3</span>
            <h3 className="text-lg font-heading font-semibold text-text">Configure the Store</h3>
          </div>
          <p className="text-text-muted text-sm leading-relaxed">
            The store brings all your slices together. <code className="text-accent">configureStore</code> automatically
            sets up the Redux DevTools extension and adds useful development middleware.
          </p>
          <CodeBlock
            code={`// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

export const store = configureStore({
  reducer: {
    // Each key here becomes a top-level key in your state
    counter: counterReducer,
    // Add more slices here as your app grows:
    // todos: todosReducer,
    // auth: authReducer,
  },
});

// TypeScript: infer the types from the store itself
// This way, types always stay in sync with your actual state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;`}
            language="tsx"
            title="store/store.ts — configure the store"
          />
        </div>

        {/* Step 4 */}
        <div className="rounded-2xl bg-card border border-border p-6 space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent font-mono font-bold text-sm">4</span>
            <h3 className="text-lg font-heading font-semibold text-text">Create Typed Hooks</h3>
          </div>
          <p className="text-text-muted text-sm leading-relaxed">
            Create pre-typed versions of the <code className="text-accent">useSelector</code> and <code className="text-accent">useDispatch</code> hooks.
            This gives you full TypeScript autocompletion everywhere you use them, without having to import the types every time.
          </p>
          <CodeBlock
            code={`// store/hooks.ts
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Typed versions of the standard hooks
// Use these throughout your app instead of the plain versions
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();`}
            language="tsx"
            title="store/hooks.ts — typed hooks for your app"
          />
          <InfoBox variant="info" title="Why typed hooks?">
            Without these, you would need to write
            <code className="text-accent"> useSelector((state: RootState) =&gt; state.counter.value)</code> every time.
            With <code className="text-accent">useAppSelector</code>, TypeScript already knows the shape of your state,
            so you get autocompletion and type checking for free.
          </InfoBox>
        </div>

        {/* Step 5 */}
        <div className="rounded-2xl bg-card border border-border p-6 space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent font-mono font-bold text-sm">5</span>
            <h3 className="text-lg font-heading font-semibold text-text">Wrap Your App with the Provider</h3>
          </div>
          <p className="text-text-muted text-sm leading-relaxed">
            The <code className="text-accent">Provider</code> component makes the Redux store available to every component in
            your app. Wrap it around your root component — typically in <code className="text-accent">app/_layout.tsx</code> for Expo Router.
          </p>
          <CodeBlock
            code={`// app/_layout.tsx  (Expo Router)
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../store/store';

export default function RootLayout(): React.ReactElement {
  return (
    // Everything inside Provider can access the Redux store
    <Provider store={store}>
      <Stack />
    </Provider>
  );
}`}
            language="tsx"
            title="app/_layout.tsx — wrap your app with Provider"
          />
          <CodeBlock
            code={`// Alternative: App.tsx (if not using Expo Router)
import { Provider } from 'react-redux';
import { store } from './store/store';
import { HomeScreen } from './screens/HomeScreen';

export default function App(): React.ReactElement {
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );
}`}
            language="tsx"
            title="App.tsx — alternative for non-Expo-Router projects"
          />
        </div>

        {/* Step 6 */}
        <div className="rounded-2xl bg-card border border-border p-6 space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent font-mono font-bold text-sm">6</span>
            <h3 className="text-lg font-heading font-semibold text-text">Use Redux in Your Components</h3>
          </div>
          <p className="text-text-muted text-sm leading-relaxed">
            Now you can read state with <code className="text-accent">useAppSelector</code> and dispatch actions with
            <code className="text-accent"> useAppDispatch</code> from any component in your app.
          </p>
          <CodeBlock
            code={`// screens/CounterScreen.tsx
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { increment, decrement, incrementByAmount, reset } from '../store/counterSlice';

export function CounterScreen(): React.ReactElement {
  // Read state from the store
  const count = useAppSelector((state) => state.counter.value);

  // Get the dispatch function
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.count}>{count}</Text>

      <View style={styles.row}>
        <Button title="- 1" onPress={() => dispatch(decrement())} />
        <Button title="+ 1" onPress={() => dispatch(increment())} />
      </View>

      <Button
        title="+ 5"
        onPress={() => dispatch(incrementByAmount(5))}
      />
      <Button title="Reset" onPress={() => dispatch(reset())} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 },
  count: { fontSize: 64, fontWeight: 'bold' },
  row: { flexDirection: 'row', gap: 16 },
});`}
            language="tsx"
            title="screens/CounterScreen.tsx — read and dispatch from a component"
          />
        </div>
      </section>

      {/* Project structure */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">Recommended Project Structure</h2>
        <p className="text-text-muted leading-relaxed">
          Here is how your project should look after setting up Redux Toolkit. Keep all store-related
          files in a single <code className="text-accent">store/</code> directory.
        </p>
        <CodeBlock
          code={`my-expo-app/
├── app/
│   ├── _layout.tsx          # Provider wraps the app here
│   ├── index.tsx            # Home screen
│   └── settings.tsx         # Settings screen
│
├── store/
│   ├── store.ts             # configureStore — combines all slices
│   ├── hooks.ts             # useAppSelector, useAppDispatch
│   ├── counterSlice.ts      # Counter feature slice
│   ├── todosSlice.ts        # Todos feature slice
│   └── authSlice.ts         # Auth feature slice
│
├── components/
│   ├── Counter.tsx           # Uses useAppSelector + useAppDispatch
│   └── TodoList.tsx          # Uses useAppSelector + useAppDispatch
│
└── package.json`}
          language="bash"
          title="Recommended folder structure"
        />
        <InfoBox variant="tip" title="One slice per feature">
          Each feature in your app gets its own slice file. The slice contains the initial state,
          reducer logic, and exported action creators — everything for that feature in one place.
          This is called the <strong>"ducks" pattern</strong> and it keeps things organized as your app grows.
        </InfoBox>
      </section>

      {/* Real-world example: Todo slice */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">Real-World Example: Todo List</h2>
        <p className="text-text-muted leading-relaxed">
          Let's build a more realistic slice for managing todos. This shows how to handle arrays of objects,
          typed payloads, and multiple actions.
        </p>

        <CodeBlock
          code={`// store/todosSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

interface TodosState {
  items: Todo[];
  filter: 'all' | 'active' | 'completed';
}

const initialState: TodosState = {
  items: [],
  filter: 'all',
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<string>) {
      state.items.push({
        id: crypto.randomUUID(),
        text: action.payload,
        completed: false,
        createdAt: Date.now(),
      });
    },

    toggleTodo(state, action: PayloadAction<string>) {
      const todo = state.items.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;  // Safe with Immer!
      }
    },

    removeTodo(state, action: PayloadAction<string>) {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },

    setFilter(state, action: PayloadAction<'all' | 'active' | 'completed'>) {
      state.filter = action.payload;
    },

    clearCompleted(state) {
      state.items = state.items.filter((t) => !t.completed);
    },
  },
});

export const { addTodo, toggleTodo, removeTodo, setFilter, clearCompleted } = todosSlice.actions;
export default todosSlice.reducer;`}
          language="tsx"
          title="store/todosSlice.ts — a feature-complete slice"
        />

        <CodeBlock
          code={`// components/TodoList.tsx
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { addTodo, toggleTodo, removeTodo, setFilter, clearCompleted } from '../store/todosSlice';

export function TodoList(): React.ReactElement {
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();

  // Read from the store — component re-renders when these change
  const items = useAppSelector((state) => state.todos.items);
  const filter = useAppSelector((state) => state.todos.filter);

  // Derive filtered list (no need to store this in Redux)
  const filteredItems = items.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const handleAdd = (): void => {
    if (!text.trim()) return;
    dispatch(addTodo(text.trim()));
    setText('');
  };

  return (
    <View style={styles.container}>
      {/* Input */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          onSubmitEditing={handleAdd}
          placeholder="What needs to be done?"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Filter tabs */}
      <View style={styles.filterRow}>
        {(['all', 'active', 'completed'] as const).map((f) => (
          <TouchableOpacity
            key={f}
            onPress={() => dispatch(setFilter(f))}
            style={[styles.filterTab, filter === f && styles.filterTabActive]}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Todo list */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoRow}>
            <TouchableOpacity onPress={() => dispatch(toggleTodo(item.id))}>
              <Text style={[styles.todoText, item.completed && styles.completed]}>
                {item.completed ? '✓ ' : '○ '}{item.text}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => dispatch(removeTodo(item.id))}>
              <Text style={styles.removeText}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Clear completed */}
      <TouchableOpacity onPress={() => dispatch(clearCompleted())}>
        <Text style={styles.clearText}>Clear completed</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  inputRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, fontSize: 16 },
  addButton: { backgroundColor: '#6366f1', borderRadius: 8, paddingHorizontal: 20, justifyContent: 'center' },
  addButtonText: { color: '#fff', fontWeight: '600' },
  filterRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  filterTab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#f3f4f6' },
  filterTabActive: { backgroundColor: '#6366f1' },
  filterText: { fontSize: 14, color: '#6b7280' },
  filterTextActive: { color: '#fff', fontWeight: '600' },
  todoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderColor: '#f3f4f6' },
  todoText: { fontSize: 16 },
  completed: { textDecorationLine: 'line-through', color: '#9ca3af' },
  removeText: { color: '#ef4444', fontSize: 18, paddingHorizontal: 8 },
  clearText: { textAlign: 'center', color: '#6366f1', marginTop: 16, fontSize: 14 },
});`}
          language="tsx"
          title="components/TodoList.tsx — connected to Redux"
        />

        <p className="text-text-muted leading-relaxed">
          Don't forget to add the todos reducer to your store:
        </p>
        <CodeBlock
          code={`// store/store.ts — updated
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import todosReducer from './todosSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer,        // Add each new slice here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;`}
          language="tsx"
          title="store/store.ts — register the new slice"
        />
      </section>

      {/* Async operations */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">Async Operations with createAsyncThunk</h2>
        <p className="text-text-muted leading-relaxed">
          Real apps need to fetch data from APIs. Redux Toolkit provides <code className="text-accent">createAsyncThunk</code> for
          handling async logic like API calls. It automatically dispatches pending, fulfilled, and rejected actions.
        </p>

        <CodeBlock
          code={`// store/postsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostsState {
  items: Post[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PostsState = {
  items: [],
  status: 'idle',
  error: null,
};

// createAsyncThunk handles the async lifecycle for you
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',     // action type prefix
  async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
    const data: Post[] = await response.json();
    return data;            // This becomes action.payload on success
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  // extraReducers handles actions from createAsyncThunk
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Something went wrong';
      });
  },
});

export default postsSlice.reducer;`}
          language="tsx"
          title="store/postsSlice.ts — async data fetching"
        />

        <CodeBlock
          code={`// screens/PostsScreen.tsx
import { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { fetchPosts } from '../store/postsSlice';

export function PostsScreen(): React.ReactElement {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.posts);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());  // Dispatch the thunk like a regular action
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <ActivityIndicator size="large" style={styles.center} />;
  }

  if (status === 'failed') {
    return <Text style={styles.error}>Error: {error}</Text>;
  }

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.body}>{item.body}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center' },
  error: { color: 'red', textAlign: 'center', marginTop: 20 },
  card: { padding: 16, borderBottomWidth: 1, borderColor: '#eee' },
  title: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  body: { fontSize: 14, color: '#666' },
});`}
          language="tsx"
          title="screens/PostsScreen.tsx — loading states handled automatically"
        />

        <InfoBox variant="info" title="The three lifecycle actions">
          <code className="text-accent">createAsyncThunk</code> automatically dispatches three actions based on the promise:
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><code className="text-accent">pending</code> — the request started (show a spinner)</li>
            <li><code className="text-accent">fulfilled</code> — the request succeeded (display the data)</li>
            <li><code className="text-accent">rejected</code> — the request failed (show an error)</li>
          </ul>
          You handle each case in <code className="text-accent">extraReducers</code> to update the state accordingly.
        </InfoBox>
      </section>

      {/* Selectors */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">Selectors — Deriving Data from State</h2>
        <p className="text-text-muted leading-relaxed">
          Selectors are functions that extract or compute data from the store. Define them alongside your slice
          so the logic stays close to the state it reads from.
        </p>

        <CodeBlock
          code={`// store/todosSlice.ts — add selectors at the bottom

// Basic selectors
export const selectAllTodos = (state: RootState): Todo[] => state.todos.items;
export const selectTodoFilter = (state: RootState): string => state.todos.filter;

// Derived selector — computes a value from state
export const selectFilteredTodos = (state: RootState): Todo[] => {
  const { items, filter } = state.todos;
  switch (filter) {
    case 'active':
      return items.filter((t) => !t.completed);
    case 'completed':
      return items.filter((t) => t.completed);
    default:
      return items;
  }
};

// Computed values
export const selectTodoStats = (state: RootState) => {
  const items = state.todos.items;
  return {
    total: items.length,
    completed: items.filter((t) => t.completed).length,
    active: items.filter((t) => !t.completed).length,
  };
};`}
          language="tsx"
          title="Selectors — reusable state queries"
        />

        <CodeBlock
          code={`// Use selectors in components
import { selectFilteredTodos, selectTodoStats } from '../store/todosSlice';

function TodoFooter(): React.ReactElement {
  const stats = useAppSelector(selectTodoStats);

  return (
    <Text>
      {stats.active} remaining / {stats.completed} done / {stats.total} total
    </Text>
  );
}`}
          language="tsx"
          title="Using selectors in components"
        />

        <InfoBox variant="tip" title="Why selectors?">
          Selectors centralize data access. If your state shape changes, you only update the selector —
          not every component that reads from the store. They also make it easy to add memoization later
          with <code className="text-accent">createSelector</code> from Reselect for expensive computations.
        </InfoBox>
      </section>

      {/* Redux vs other */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">Redux vs. Other Options</h2>
        <p className="text-text-muted leading-relaxed">
          Redux is not the only state management solution. Here is when to pick each option:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 pr-4 font-heading font-semibold text-text">Solution</th>
                <th className="text-left py-3 pr-4 font-heading font-semibold text-text">Best For</th>
                <th className="text-left py-3 font-heading font-semibold text-text">Trade-offs</th>
              </tr>
            </thead>
            <tbody className="text-text-muted">
              <tr className="border-b border-border/50">
                <td className="py-3 pr-4 font-mono text-purple font-semibold">Redux Toolkit</td>
                <td className="py-3 pr-4">Large apps, complex state logic, team projects</td>
                <td className="py-3">More boilerplate, steeper learning curve</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 pr-4 font-mono text-accent font-semibold">useContext</td>
                <td className="py-3 pr-4">Simple shared state (theme, auth)</td>
                <td className="py-3">Re-renders all consumers, no dev tools</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 pr-4 font-mono text-cyan font-semibold">Zustand</td>
                <td className="py-3 pr-4">Medium apps wanting less boilerplate</td>
                <td className="py-3">Smaller ecosystem, less opinionated</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-pink font-semibold">Jotai / Recoil</td>
                <td className="py-3 pr-4">Atomic state, fine-grained reactivity</td>
                <td className="py-3">Different mental model, less enterprise adoption</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Debugging */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">Debugging with Redux DevTools</h2>
        <p className="text-text-muted leading-relaxed">
          One of Redux's biggest strengths is its developer tooling. Redux Toolkit automatically enables
          the <strong className="text-text">Redux DevTools</strong> browser extension, which lets you:
        </p>
        <ul className="list-disc list-inside text-text-muted space-y-2 ml-2">
          <li>Inspect every action that was dispatched</li>
          <li>See the state before and after each action</li>
          <li><strong className="text-text">Time-travel</strong> — step backward and forward through state changes</li>
          <li>Export and import state snapshots for debugging</li>
        </ul>

        <InfoBox variant="tip" title="React Native debugging">
          For React Native, you can use <code className="text-accent">react-native-debugger</code> or
          the <code className="text-accent">Redux DevTools</code> integration with Flipper.
          Redux Toolkit's <code className="text-accent">configureStore</code> enables DevTools automatically — no extra setup needed.
        </InfoBox>
      </section>

      {/* Tips and Best Practices */}
      <section className="space-y-4">
        <h2 className="text-2xl font-heading font-bold text-text">Tips and Best Practices</h2>

        <InfoBox variant="tip" title="Keep state minimal">
          Only store data in Redux that is truly shared across multiple components or needs to survive navigation.
          Local UI state (form inputs, open/closed toggles) should stay in <code className="text-accent">useState</code>.
        </InfoBox>

        <InfoBox variant="tip" title="Normalize complex data">
          If your state has nested arrays of objects (like users with posts with comments), consider normalizing
          the data into flat lookup tables using <code className="text-accent">createEntityAdapter</code> from Redux Toolkit.
          This prevents deeply nested updates and makes lookups fast.
        </InfoBox>

        <InfoBox variant="warning" title="Don't put everything in Redux">
          Form state, animation values, and UI-only toggles do not belong in Redux.
          A good rule: if only one component uses it, keep it local with <code className="text-accent">useState</code>.
        </InfoBox>

        <InfoBox variant="warning" title="Avoid non-serializable values">
          Redux state should only contain plain serializable data — strings, numbers, arrays, and plain objects.
          Do not store class instances, functions, Promises, or Date objects in the store.
        </InfoBox>

        <InfoBox variant="info" title="Quick reference: the 5 files you need">
          <ol className="list-decimal list-inside space-y-1 mt-1">
            <li><code className="text-accent">store/store.ts</code> — configureStore + type exports</li>
            <li><code className="text-accent">store/hooks.ts</code> — typed useAppSelector + useAppDispatch</li>
            <li><code className="text-accent">store/[feature]Slice.ts</code> — one per feature</li>
            <li><code className="text-accent">app/_layout.tsx</code> — Provider wrapper</li>
            <li><code className="text-accent">components/[Feature].tsx</code> — connected components</li>
          </ol>
        </InfoBox>

        <InfoBox variant="fun" title="Redux has been around since 2015">
          Created by Dan Abramov and Andrew Clark, Redux was inspired by Facebook's Flux architecture
          and the Elm programming language. Redux Toolkit (released 2019) solved most of the boilerplate
          complaints, making Redux much more approachable. Today it remains one of the most widely used
          state management libraries with over 4 million weekly npm downloads.
        </InfoBox>
      </section>
    </PageShell>
  )
}
