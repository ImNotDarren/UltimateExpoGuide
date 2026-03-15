import { useState } from 'react'
import { CodeBlock } from '../components/CodeBlock'
import { InfoBox } from '../components/InfoBox'
import { Quiz } from '../components/Quiz'

const TABS = [
  {
    id: 'mounting',
    label: 'Mounting',
    gradient: 'from-accent to-purple',
  },
  {
    id: 'updating',
    label: 'Updating',
    gradient: 'from-cyan to-info',
  },
  {
    id: 'unmounting',
    label: 'Unmounting',
    gradient: 'from-pink to-orange',
  },
  {
    id: 'rn-specific',
    label: 'RN Specific',
    gradient: 'from-primary to-cyan',
  },
]

// ---------------------------------------------------------------------------
// Code examples — heavily commented for beginners
// ---------------------------------------------------------------------------

const MOUNTING_CODE = `import { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

// Think of this component like opening a page —
// when the page loads, it needs to fetch some data.

export default function UserProfile({ userId }: { userId: string }) {
  // Step 1: Create two pieces of state (data the component remembers)
  const [user, setUser] = useState<User | null>(null);   // starts as null
  const [loading, setLoading] = useState(true);           // starts as true

  // Step 2: useEffect with [] = "do this ONCE when the component first appears"
  //
  // Think of it like: "When this page loads for the first time, go fetch
  // the user's data from the server."
  useEffect(() => {
    fetchUser(userId).then((data) => {
      setUser(data);        // Save the user data
      setLoading(false);    // Tell the component we're done loading
    });
  }, []);
  // ^^^ This empty array [] is important!
  // It means: "Only run this once, when the component first appears."
  // Without it, this would run over and over on every re-render.

  // Step 3: Show a spinner while loading, then show the data
  if (loading) return <ActivityIndicator size="large" />;

  return (
    <View>
      <Text style={{ fontSize: 24 }}>{user?.name}</Text>
      <Text>{user?.email}</Text>
    </View>
  );
}`

const UPDATING_CODE = `import { useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';

// Imagine a search box: every time you type a letter,
// the app should search for new results.

export default function SearchResults() {
  const [query, setQuery] = useState('');            // What the user typed
  const [results, setResults] = useState<string[]>([]); // Search results

  // useEffect with [query] = "run this every time 'query' changes"
  //
  // The array [query] tells React: "Watch this variable.
  // Whenever it changes, run the code inside."
  useEffect(() => {
    // Don't search if the search box is empty
    if (!query.trim()) {
      setResults([]);
      return;
    }

    // Wait 300ms after the user stops typing before searching.
    // This prevents sending a request for every single keystroke.
    // (If you type "hello", we don't want to search for "h", "he",
    //  "hel", "hell", "hello" — just "hello".)
    const timer = setTimeout(() => {
      searchAPI(query).then(setResults);
    }, 300);

    // CLEANUP: If the user types another letter before 300ms is up,
    // cancel the old timer and start a new one.
    // React runs this cleanup function BEFORE running the effect again.
    return () => clearTimeout(timer);
  }, [query]);
  // ^^^ [query] means: "re-run this effect whenever query changes"

  return (
    <View>
      <TextInput
        value={query}
        onChangeText={setQuery}   // Updates 'query' on every keystroke
        placeholder="Search..."
      />
      {results.map((r, i) => (
        <Text key={i}>{r}</Text>
      ))}
    </View>
  );
}`

const UNMOUNTING_CODE = `import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

// This component shows a timer that counts up every second.
// When the user navigates away, we need to STOP the timer.
// Otherwise it keeps ticking in the background, wasting memory.

export default function LiveTimer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // Start a timer that adds 1 every second
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    // CLEANUP FUNCTION — this runs when the component is removed.
    //
    // Think of it like leaving a room:
    //   - You turn off the lights (clearInterval)
    //   - You close the door (free up memory)
    //
    // If you forget this, the timer keeps running even after
    // the component is gone — that's called a "memory leak".
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View>
      <Text>Elapsed: {seconds}s</Text>
    </View>
  );
}

// What else needs cleanup? Anything that "keeps going":
//
// setInterval / setTimeout  →  clearInterval / clearTimeout
// WebSocket connections     →  socket.close()
// Event listeners           →  remove the listener
// Subscriptions             →  unsubscribe()
// Network requests          →  abort the request`

const RN_SPECIFIC_CODE = `import { useEffect } from 'react';
import { AppState, type AppStateStatus } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// On a WEBSITE: when you click a link, the old page disappears completely.
// On a PHONE APP: when you tap to a new screen, the old screen is STILL THERE
// underneath — it's just hidden. This changes how lifecycle works!

export default function ChatScreen() {
  const navigation = useNavigation();

  // --- MOBILE-ONLY EVENT #1: App goes to background ---
  //
  // When the user presses the home button or switches apps,
  // your app doesn't close — it goes to "background".
  // When they come back, it's "active" again.
  // Websites don't have this concept!
  useEffect(() => {
    const sub = AppState.addEventListener(
      'change',
      (state: AppStateStatus) => {
        if (state === 'active') {
          // User came back to the app — refresh data!
          refreshMessages();
        }
        if (state === 'background') {
          // User left the app — save their work!
          saveDraft();
        }
      }
    );
    // Clean up when this component is removed
    return () => sub.remove();
  }, []);

  // --- MOBILE-ONLY EVENT #2: Screen focus/blur ---
  //
  // In a stack navigator, when you push Screen B on top of Screen A:
  //   - Screen A is NOT removed (it stays in memory)
  //   - Screen A receives a "blur" event (it's now hidden)
  //   - Screen B receives a "focus" event (it's now visible)
  //
  // This is DIFFERENT from the web where navigating away
  // would unmount (destroy) the old page.
  useEffect(() => {
    const unsubFocus = navigation.addListener('focus', () => {
      // This screen is now visible — start real-time updates
      startPolling();
    });
    const unsubBlur = navigation.addListener('blur', () => {
      // This screen is now hidden — stop updates to save battery
      stopPolling();
    });
    return () => {
      unsubFocus();
      unsubBlur();
    };
  }, [navigation]);

  // ...
}`

// ---------------------------------------------------------------------------
// Tab content — beginner-friendly descriptions
// ---------------------------------------------------------------------------

interface TabContent {
  title: string
  desc: string
  code: string
  diagram: string[][]
  tip: React.ReactNode
  quiz: {
    question: string
    options: { text: string; correct?: boolean }[]
    explanation: string
  }
}

const TAB_CONTENT: Record<string, TabContent> = {
  mounting: {
    title: 'Mounting — when a component first appears',
    desc: 'Think of mounting like opening a new page. When React shows a component for the first time, it goes through three steps: it runs your function, puts the result on screen, and then runs any setup code you wrote inside useEffect. This is where you do things that should only happen once — like loading data from a server.',
    code: MOUNTING_CODE,
    diagram: [
      ['1', 'Your function runs', 'React calls your component function. State variables get their initial values (like useState(0) starts at 0). Your JSX is returned.'],
      ['2', 'UI appears on screen', 'React takes the JSX you returned and creates real native views (on mobile) or real DOM elements (on web). The user can now see your component.'],
      ['3', 'useEffect runs (with [])', 'After painting the screen, React runs the code inside useEffect(() => {...}, []). This is the right place to fetch data, connect to services, or start timers.'],
    ],
    tip: (
      <>
        <strong>Good news for beginners:</strong> Mounting works <em>exactly the same</em> in React (web) and React Native (mobile). The only behind-the-scenes difference is what React creates — HTML elements on the web, or native iOS/Android views on mobile. <strong>Your code doesn't change at all.</strong>
      </>
    ),
    quiz: {
      question: 'When does useEffect with an empty array [] run?',
      options: [
        { text: 'Before the component appears on screen' },
        { text: 'Every time the component re-renders' },
        { text: 'Once, right after the component first appears on screen', correct: true },
        { text: 'Only when the user interacts with it' },
      ],
      explanation: 'The empty array [] tells React: "run this effect only once, after the component first appears." It\'s the perfect place for one-time setup like fetching data from an API.',
    },
  },
  updating: {
    title: 'Updating — when data changes',
    desc: 'Updating happens when something in your component changes — maybe the user typed in a search box, or a parent component passed new data. React re-runs your function, compares the new result with what\'s already on screen, and only updates the parts that actually changed. If you have a useEffect watching specific variables, it runs again too.',
    code: UPDATING_CODE,
    diagram: [
      ['1', 'Something changes', 'The user did something (typed, tapped) or the parent passed new data. This triggers a re-render.'],
      ['2', 'Your function runs again', 'React calls your component function again with the new values. You get fresh JSX back.'],
      ['3', 'React finds the differences', 'React compares the old screen with the new JSX. It only updates what actually changed — this is what makes React fast.'],
      ['4', 'Old effect gets cleaned up', 'If you have a useEffect watching the changed data, React first runs the cleanup from the previous run (like cancelling an old timer).'],
      ['5', 'New effect runs', 'Then React runs your effect again with the updated values (like starting a new timer with the new search query).'],
    ],
    tip: (
      <>
        <strong>Why does React re-run my whole function?</strong> Don't worry — it sounds expensive but it's actually very fast. React doesn't rebuild the entire screen. It just compares the new result with the old one and makes the minimum number of changes. This "compare and update" process works identically on web and React Native.
      </>
    ),
    quiz: {
      question: 'What happens to the old useEffect cleanup when the watched data changes?',
      options: [
        { text: 'It runs when the component is removed, not during updates' },
        { text: 'React runs the old cleanup first, then runs the new effect', correct: true },
        { text: 'The old effect keeps running alongside the new one' },
        { text: 'React ignores the cleanup during updates' },
      ],
      explanation: 'When a watched value changes, React first cleans up the previous effect (e.g., cancels the old timer), then runs the new effect (e.g., starts a new timer). This prevents things from piling up — like having multiple timers running at once.',
    },
  },
  unmounting: {
    title: 'Unmounting — when a component disappears',
    desc: 'Unmounting happens when a component is removed from the screen — maybe the user navigated away, or a parent stopped showing it. This is your chance to clean up anything that would keep running in the background. Think of it like leaving a room: you turn off the lights and close the door behind you.',
    code: UNMOUNTING_CODE,
    diagram: [
      ['1', 'Component is removed', 'Something caused this component to disappear — the user navigated away, or the parent decided not to show it anymore.'],
      ['2', 'All cleanup functions run', 'Every useEffect that returned a cleanup function now runs that cleanup. Timers stop. Connections close. Listeners are removed.'],
      ['3', 'Memory is freed', 'React throws away the component. Its state, its effects — all gone. The memory it was using is released.'],
    ],
    tip: (
      <>
        <strong>Why cleanup matters more on mobile:</strong> On a website, if you navigate to a new page, the entire old page is destroyed — even if you forgot to clean up a timer. But in a React Native app with navigation, <strong>old screens often stay alive in memory</strong> (hidden behind the new screen). If you forget to clean up, that timer keeps ticking invisibly, wasting battery and memory.
      </>
    ),
    quiz: {
      question: 'What happens if you start a setInterval but never clean it up?',
      options: [
        { text: 'React automatically stops it for you' },
        { text: 'It stops when the screen is no longer visible' },
        { text: 'It keeps running in the background, wasting memory and battery', correct: true },
        { text: 'The app crashes immediately' },
      ],
      explanation: 'JavaScript doesn\'t know that your component is gone — the interval just keeps firing. On mobile this is especially bad because old screens often stay in memory. Always return a cleanup function: return () => clearInterval(interval)',
    },
  },
  'rn-specific': {
    title: 'React Native only — mobile lifecycle events',
    desc: 'This is where React Native really differs from the web. Mobile apps have events that websites simply don\'t have: the app can go to the background when you press the home button, screens can be hidden without being destroyed, and the operating system can silently kill your app to free memory. Let\'s learn the tools React Native gives you to handle all of this.',
    code: RN_SPECIFIC_CODE,
    diagram: [
      ['AppState', 'App is "active"', 'The app is on screen and the user is using it. This is the normal state — like having a browser tab in focus.'],
      ['AppState', 'App is "background"', 'The user pressed the home button or switched to another app. Your app is still alive, but hidden. (Websites don\'t have this!)'],
      ['AppState', 'App is "inactive"', 'A brief in-between state on iOS — like when pulling down the notification center. You rarely need to handle this.'],
      ['Screen', '"focus" event', 'This screen just became visible to the user. Maybe they navigated here, or came back from another screen. Good time to refresh data.'],
      ['Screen', '"blur" event', 'This screen is no longer visible — another screen was pushed on top of it. But the screen is NOT destroyed! It\'s still in memory.'],
      ['Screen', '"beforeRemove" event', 'This screen is about to be permanently removed from the navigation stack (like pressing the back button). After this, it truly unmounts.'],
    ],
    tip: (
      <>
        <strong>This is the single biggest difference between web and mobile.</strong> On a website, clicking a link usually destroys the old page completely. In React Native with a navigation stack, tapping to a new screen just <em>hides</em> the old one underneath. The old screen's <code>useEffect</code> cleanup <strong>won't run</strong> because the component hasn't been removed. Instead, you listen for <code>focus</code> and <code>blur</code> events to know when your screen is shown or hidden.
      </>
    ),
    quiz: {
      question: 'In React Native with stack navigation, what happens to Screen A when the user navigates to Screen B?',
      options: [
        { text: 'Screen A is destroyed and its cleanup code runs' },
        { text: 'Screen A stays in memory but receives a "blur" event', correct: true },
        { text: 'Screen A is saved to disk and recreated when you go back' },
        { text: 'Screen A automatically pauses all its code' },
      ],
      explanation: 'Screen A stays alive in memory, just hidden behind Screen B. It receives a "blur" event so you know it\'s hidden. When the user goes back, Screen A receives a "focus" event. This is completely different from the web where the old page would be destroyed.',
    },
  },
}

// ---------------------------------------------------------------------------
// Comparison table — plain language
// ---------------------------------------------------------------------------

const LIFECYCLE_COMPARISON = [
  ['Screen first loads', 'useEffect(() => {}, [])', 'useEffect(() => {}, [])', 'Same'],
  ['Data changes', 'useEffect(() => {}, [data])', 'useEffect(() => {}, [data])', 'Same'],
  ['Screen removed', 'Cleanup runs', 'Cleanup runs', 'Same'],
  ['Navigate away', 'Old page is destroyed', 'Old screen stays alive!', 'Big difference!'],
  ['App goes to background', 'Not a thing', 'AppState event fires', 'Mobile only'],
  ['Screen hidden by another', 'Not a thing', '"blur" event fires', 'Mobile only'],
  ['OS kills the app', 'Not a thing', 'No warning — save data early!', 'Mobile only'],
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function Lifecycle() {
  const [activeTab, setActiveTab] = useState('mounting')
  const content = TAB_CONTENT[activeTab]

  return (
    <section id="lifecycle" className="relative py-28 px-6">
      <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] rounded-full bg-info/5 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-card border border-info/30 text-info text-xs font-mono mb-6">
            COMPONENT LIFECYCLE
          </span>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold tracking-tight">
            <span className="bg-gradient-to-r from-info to-accent bg-clip-text text-transparent">Lifecycle</span> on web vs mobile
          </h2>
          <p className="mt-4 text-text-muted max-w-2xl mx-auto text-lg">
            Every component has a life story: it's born (mounting), it changes (updating),
            and eventually it goes away (unmounting). React handles all three
            using one tool: <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">useEffect</code>.
          </p>
        </div>

        {/* "What is a lifecycle?" explainer */}
        <div className="mb-12 rounded-2xl bg-card border border-border p-8 shadow-lg shadow-black/10">
          <h3 className="text-2xl font-heading font-bold text-text mb-4">
            What is a "component lifecycle"?
          </h3>
          <p className="text-text-muted leading-relaxed mb-4">
            Imagine a pop-up shop at a mall. It has three stages of life:
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {[
              {
                emoji: '🏗️',
                stage: 'Opens (Mounting)',
                desc: 'The shop sets up displays, stocks shelves, and turns on the lights. This happens once.',
                gradient: 'from-accent to-purple',
              },
              {
                emoji: '🔄',
                stage: 'Restocks (Updating)',
                desc: 'Throughout the day, inventory changes — new items arrive, sold items are removed. The shop adapts.',
                gradient: 'from-cyan to-info',
              },
              {
                emoji: '📦',
                stage: 'Closes (Unmounting)',
                desc: 'At the end, the shop packs up, turns off the lights, and leaves the space clean.',
                gradient: 'from-pink to-orange',
              },
            ].map((item) => (
              <div key={item.stage} className="p-5 rounded-xl bg-bg-soft border border-border">
                <div className="text-2xl mb-2">{item.emoji}</div>
                <p className={`font-heading font-semibold text-sm bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent mb-1`}>
                  {item.stage}
                </p>
                <p className="text-xs text-text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-text-muted leading-relaxed">
            React components work the same way. When a component first appears on screen, it <strong className="text-text">mounts</strong>.
            When its data changes, it <strong className="text-text">updates</strong>.
            When it's removed from the screen, it <strong className="text-text">unmounts</strong>.
            You control what happens at each stage using <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm">useEffect</code> — a React hook
            that lets you say "run this code when the component appears / changes / disappears."
          </p>
        </div>

        {/* What useEffect looks like */}
        <div className="mb-12">
          <CodeBlock
            code={`// The three forms of useEffect:

// 1. "Do this ONCE when the component first appears"
useEffect(() => {
  loadData();
}, []);        // ← empty array = only on mount

// 2. "Do this whenever [something] changes"
useEffect(() => {
  search(query);
}, [query]);   // ← re-runs when 'query' changes

// 3. "Clean up when the component disappears"
useEffect(() => {
  const timer = setInterval(tick, 1000);
  return () => clearInterval(timer);  // ← cleanup function
}, []);`}
            language="tsx"
            title="useEffect — the lifecycle hook"
          />
        </div>

        {/* Comparison table */}
        <div className="mb-12 rounded-2xl border border-border bg-card overflow-hidden shadow-lg shadow-black/10">
          <div className="px-6 py-4 bg-surface border-b border-border">
            <h3 className="text-lg font-heading font-bold text-text">React (Web) vs React Native (Mobile)</h3>
            <p className="text-sm text-text-muted mt-1">
              The hooks are identical — but mobile platforms introduce extra events that websites don't have
            </p>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              <div className="grid grid-cols-4 text-xs font-heading font-semibold text-text-muted uppercase tracking-wider bg-surface/50">
                <div className="px-5 py-3">What happens</div>
                <div className="px-5 py-3">On the Web</div>
                <div className="px-5 py-3 text-accent">On Mobile (RN)</div>
                <div className="px-5 py-3">Verdict</div>
              </div>
              {LIFECYCLE_COMPARISON.map(([event, web, rn, note], i) => (
                <div key={i} className={`grid grid-cols-4 text-sm border-t border-border ${note === 'Big difference!' || note === 'Mobile only' ? 'bg-accent/5' : ''}`}>
                  <div className="px-5 py-3 font-medium text-text">{event}</div>
                  <div className="px-5 py-3 font-mono text-xs text-text-muted">{web}</div>
                  <div className="px-5 py-3 font-mono text-xs text-accent font-medium">{rn}</div>
                  <div className={`px-5 py-3 text-xs ${note === 'Big difference!' ? 'text-warning font-semibold' : note === 'Mobile only' ? 'text-pink font-semibold' : 'text-text-muted'}`}>
                    {note}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <InfoBox variant="warning" title="The #1 surprise for web developers">
          On a website, clicking a link usually <strong>destroys</strong> the old page completely. In a React Native app, tapping to a new screen just <strong>slides it on top</strong> — the old screen is still there underneath, fully alive. This means your cleanup code <em>doesn't run</em> when the user navigates away. You'll need to listen for special <code>focus</code> and <code>blur</code> events instead. We'll show you exactly how in the "RN Specific" tab below.
        </InfoBox>

        {/* Tab pills */}
        <div className="flex justify-center my-12">
          <div className="inline-flex gap-1.5 p-1.5 rounded-2xl bg-card border border-border flex-wrap justify-center" role="tablist">
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={activeTab === t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-5 py-3 rounded-xl text-sm font-heading font-semibold transition-all ${
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
        <div key={activeTab} className="animate-fade-in" role="tabpanel">
          <h3 className="text-2xl font-heading font-bold mb-2">{content.title}</h3>
          <p className="text-text-muted mb-8 text-lg leading-relaxed">{content.desc}</p>

          <div className="grid lg:grid-cols-[2fr_3fr] gap-6">
            {/* Left: step-by-step diagram + quiz */}
            <div>
              <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-lg shadow-black/10 mb-6">
                <div className="px-5 py-3 bg-surface border-b border-border">
                  <span className="text-xs font-heading font-semibold text-text-muted uppercase tracking-wider">
                    {activeTab === 'rn-specific' ? 'Mobile Events Explained' : 'What happens step by step'}
                  </span>
                </div>
                {content.diagram.map(([step, label, detail], i) => (
                  <div key={i} className="flex items-start gap-4 px-5 py-4 border-t border-border first:border-t-0">
                    <span className={`w-8 h-8 rounded-lg bg-gradient-to-br ${TABS.find(t => t.id === activeTab)!.gradient} flex items-center justify-center text-white font-heading font-bold text-xs shrink-0 mt-0.5`}>
                      {step}
                    </span>
                    <div>
                      <p className="font-heading font-semibold text-text text-sm">{label}</p>
                      <p className="text-xs text-text-muted mt-1 leading-relaxed">{detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Quiz key={activeTab} {...content.quiz} />
            </div>

            {/* Right: code example + tip */}
            <div>
              <CodeBlock code={content.code} language="tsx" title={`${content.title.split(' — ')[0]} Example`} />
              <div className="mt-4">
                <InfoBox variant="tip">{content.tip}</InfoBox>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
