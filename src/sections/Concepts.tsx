import { useState } from 'react'
import { CodeBlock } from '../components/CodeBlock'
import { Quiz } from '../components/Quiz'

const TABS = [
  {
    id: 'components',
    label: 'Components',
    gradient: 'from-accent to-purple',
    content: {
      title: 'Core Components',
      desc: 'React Native uses its own components instead of HTML elements. Same concept, different names.',
      comparison: [
        ['<div>', '<View>', 'Container for layout'],
        ['<p>, <span>', '<Text>', 'Display text (required!)'],
        ['<img>', '<Image>', 'Display images'],
        ['<input>', '<TextInput>', 'User text input'],
        ['<button>', '<TouchableOpacity>', 'Tappable area'],
        ['scrollable div', '<ScrollView>', 'Scrollable container'],
        ['map() in div', '<FlatList>', 'Efficient scrollable list'],
      ],
      code: `import { View, Text, StyleSheet } from 'react-native';

export default function WelcomeCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.body}>
        This is a React Native component.
        All text must be inside a Text component.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 24,
    margin: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 8,
  },
  body: {
    fontSize: 14,
    color: '#94A3B8',
    lineHeight: 22,
  },
});`,
      quiz: {
        question: 'What happens if you put raw text inside a <View> without wrapping it in <Text>?',
        options: [
          { text: 'It renders normally' },
          { text: 'It shows a warning' },
          { text: 'The app crashes', correct: true },
          { text: 'The text is invisible' },
        ],
        explanation: 'In React Native, ALL text must be inside a <Text> component. Raw text in a <View> causes a runtime crash.',
      },
    },
  },
  {
    id: 'styling',
    label: 'Styling',
    gradient: 'from-cyan to-primary',
    content: {
      title: 'Styling with StyleSheet',
      desc: 'No CSS files — styles are JavaScript objects with camelCase properties. Flexbox is the layout engine.',
      comparison: [
        ['background-color: blue;', "backgroundColor: 'blue'", 'camelCase names'],
        ['font-size: 16px;', 'fontSize: 16', 'No units (dp)'],
        ['display: flex;', 'Default is flex!', 'Everything is flexbox'],
        ['flex-direction: row;', "flexDirection: 'column'", 'Default is column'],
        ['class="card"', 'style={styles.card}', 'Style objects'],
        ['margin: 10px 20px;', 'marginVertical: 10', 'Shorthand differs'],
      ],
      code: `import { View, Text, StyleSheet } from 'react-native';

export default function FlexDemo() {
  return (
    <View style={styles.container}>
      {/* Horizontal row */}
      <View style={styles.row}>
        <View style={[styles.box, { backgroundColor: '#818CF8' }]} />
        <View style={[styles.box, { backgroundColor: '#22D3EE' }]} />
        <View style={[styles.box, { backgroundColor: '#F472B6' }]} />
      </View>

      {/* Centered content */}
      <View style={styles.centered}>
        <Text style={styles.label}>Centered!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 20, backgroundColor: '#0F172A' },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  box: { flex: 1, height: 80, borderRadius: 12 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  label: { color: '#22C55E', fontSize: 18, fontWeight: '600' },
});`,
      quiz: {
        question: 'What is the default flexDirection in React Native?',
        options: [
          { text: '"row" (horizontal)' },
          { text: '"column" (vertical)', correct: true },
          { text: '"wrap"' },
          { text: 'There is no default' },
        ],
        explanation: 'Unlike CSS where the default display is "block", React Native defaults to flexDirection: "column" since phones are tall and narrow.',
      },
    },
  },
  {
    id: 'state',
    label: 'State & Props',
    gradient: 'from-pink to-orange',
    content: {
      title: 'State & Props',
      desc: 'Same React patterns you know — useState for local state, props for passing data down.',
      comparison: [
        ['onClick={fn}', 'onPress={fn}', 'Event naming'],
        ['onChange={fn}', 'onChangeText={fn}', 'Input events (gives string)'],
        ['useState()', 'useState()', 'Identical!'],
        ['props.children', 'props.children', 'Identical!'],
        ['useEffect()', 'useEffect()', 'Identical!'],
        ['Context API', 'Context API', 'Identical!'],
      ],
      code: `import { useState } from 'react';
import {
  View, Text, TextInput,
  TouchableOpacity, FlatList, StyleSheet,
} from 'react-native';

export default function TodoApp() {
  const [todos, setTodos] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([input.trim(), ...todos]);
    setInput('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Todos</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="What needs doing?"
          placeholderTextColor="#64748B"
          value={input}
          onChangeText={setInput}
          onSubmitEditing={addTodo}
        />
        <TouchableOpacity style={styles.addBtn} onPress={addTodo}>
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <View style={styles.todo}>
            <Text style={styles.todoText}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60, backgroundColor: '#0F172A' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#F8FAFC', marginBottom: 16 },
  row: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  input: {
    flex: 1, backgroundColor: '#1E293B', borderRadius: 12,
    padding: 14, fontSize: 15, color: '#F8FAFC',
    borderWidth: 1, borderColor: '#334155',
  },
  addBtn: {
    width: 50, borderRadius: 12, backgroundColor: '#22C55E',
    justifyContent: 'center', alignItems: 'center',
  },
  addText: { fontSize: 24, color: '#0F172A', fontWeight: 'bold' },
  todo: { backgroundColor: '#1E293B', borderRadius: 10, padding: 14, marginBottom: 8 },
  todoText: { color: '#F8FAFC', fontSize: 15 },
});`,
      quiz: {
        question: 'In React Native, which event handler do you use for TextInput value changes?',
        options: [
          { text: 'onChange' },
          { text: 'onInput' },
          { text: 'onChangeText', correct: true },
          { text: 'onTextChange' },
        ],
        explanation: 'onChangeText gives you the text string directly, while onChange gives an event object. onChangeText is the idiomatic React Native way.',
      },
    },
  },
  {
    id: 'lists',
    label: 'Lists',
    gradient: 'from-cyan to-primary',
    content: {
      title: 'Lists & FlatList',
      desc: 'On the web you map() over an array inside a scrollable div. In React Native, use FlatList — it only renders items on screen for better performance.',
      comparison: [
        ['array.map()', '<FlatList data={array} />', 'List rendering'],
        ['<div> wrapper', 'Built-in ScrollView', 'Scrolling'],
        ['key={id}', 'keyExtractor={item => id}', 'Unique keys'],
        ['No virtualization', 'Virtualized by default', 'Performance'],
        ['Manual empty state', 'ListEmptyComponent', 'Empty list UI'],
        ['CSS for separators', 'ItemSeparatorComponent', 'Built-in separators'],
        ['Manual pull-to-refresh', 'onRefresh + refreshing', 'Pull to refresh'],
      ],
      code: `import { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

interface Student {
  id: string;
  name: string;
  grade: string;
}

const STUDENTS: Student[] = [
  { id: '1', name: 'Alice', grade: 'A' },
  { id: '2', name: 'Bob', grade: 'B+' },
  { id: '3', name: 'Charlie', grade: 'A-' },
  { id: '4', name: 'Diana', grade: 'A' },
];

export default function GradeList() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate fetching updated grades
    await new Promise(r => setTimeout(r, 1000));
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Class Grades</Text>
      <FlatList
        data={STUDENTS}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.grade}>{item.grade}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => (
          <View style={styles.separator} />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No students yet</Text>
        }
        onRefresh={onRefresh}
        refreshing={refreshing}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60, backgroundColor: '#0F172A' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#F8FAFC', marginBottom: 16 },
  row: {
    flexDirection: 'row', justifyContent: 'space-between',
    backgroundColor: '#1E293B', borderRadius: 12, padding: 16,
  },
  name: { color: '#F8FAFC', fontSize: 16 },
  grade: { color: '#22C55E', fontSize: 16, fontWeight: 'bold' },
  separator: { height: 8 },
  empty: { textAlign: 'center', color: '#64748B', marginTop: 40 },
});`,
      quiz: {
        question: 'Why should you use FlatList instead of map() with ScrollView for long lists?',
        options: [
          { text: 'FlatList has nicer syntax' },
          { text: 'ScrollView doesn\'t support scrolling' },
          { text: 'FlatList only renders visible items, saving memory and improving performance', correct: true },
          { text: 'map() doesn\'t work in React Native' },
        ],
        explanation: 'FlatList virtualizes the list — it only renders items currently visible on screen. With map() inside a ScrollView, ALL items are rendered at once, which causes lag and high memory usage for long lists.',
      },
    },
  },
]

export function Concepts() {
  const [activeTab, setActiveTab] = useState('components')
  const tab = TABS.find((t) => t.id === activeTab)!

  return (
    <section id="concepts" className="relative py-28 px-6">
      <div className="absolute top-1/2 -translate-y-1/2 -left-40 w-[500px] h-[500px] rounded-full bg-purple/5 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-card border border-purple/30 text-purple text-xs font-mono mb-6">
            CORE CONCEPTS
          </span>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold tracking-tight">
            React you know, <span className="bg-gradient-to-r from-accent to-pink bg-clip-text text-transparent">components you'll learn</span>
          </h2>
          <p className="mt-4 text-text-muted max-w-xl mx-auto text-lg">
            Interactive examples with side-by-side web vs native comparisons.
          </p>
        </div>

        {/* Tab pills */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex gap-1.5 p-1.5 rounded-2xl bg-card border border-border" role="tablist">
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={activeTab === t.id}
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
        <div key={activeTab} className="animate-fade-in" role="tabpanel">
          <h3 className="text-2xl font-heading font-bold mb-2">{tab.content.title}</h3>
          <p className="text-text-muted mb-8 text-lg">{tab.content.desc}</p>

          <div className="grid lg:grid-cols-[2fr_3fr] gap-6">
            {/* Left: comparison table + quiz */}
            <div>
              <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-lg shadow-black/10 mb-6">
                <div className="grid grid-cols-3 text-xs font-heading font-semibold text-text-muted uppercase tracking-wider bg-surface">
                  <div className="px-4 py-3">Web (React)</div>
                  <div className="px-4 py-3 text-accent">React Native</div>
                  <div className="px-4 py-3">Note</div>
                </div>
                {tab.content.comparison.map(([web, rn, note], i) => (
                  <div key={i} className="grid grid-cols-3 text-sm border-t border-border">
                    <div className="px-4 py-3 font-mono text-xs text-text-muted">{web}</div>
                    <div className="px-4 py-3 font-mono text-xs text-accent font-medium">{rn}</div>
                    <div className="px-4 py-3 text-xs text-text-muted">{note}</div>
                  </div>
                ))}
              </div>

              <Quiz key={activeTab} {...tab.content.quiz} />
            </div>

            {/* Right: code */}
            <div>
              <CodeBlock code={tab.content.code} language="tsx" title={`${tab.content.title} Example`} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
