import { CodeBlock } from '../components/CodeBlock'
import { ExpoSnack } from '../components/ExpoSnack'
import { ExternalLink } from 'lucide-react'

export function Build() {
  return (
    <section id="build" className="relative py-28 px-6">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-pink/5 blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-card border border-pink/30 text-pink text-xs font-mono mb-6">
            HANDS-ON PROJECT
          </span>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold tracking-tight">
            Build a <span className="bg-gradient-to-r from-pink to-orange bg-clip-text text-transparent">Todo App</span>
          </h2>
          <p className="mt-4 text-text-muted max-w-xl mx-auto text-lg">
            Putting it all together — components, styling, state, input handling, and lists.
          </p>
        </div>

        {/* Concepts used badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {[
            { label: 'useState', color: 'from-accent to-purple' },
            { label: 'TextInput', color: 'from-cyan to-info' },
            { label: 'FlatList', color: 'from-primary to-cyan' },
            { label: 'TouchableOpacity', color: 'from-pink to-orange' },
            { label: 'StyleSheet', color: 'from-info to-accent' },
            { label: 'TypeScript', color: 'from-purple to-pink' },
          ].map((c) => (
            <span
              key={c.label}
              className={`px-4 py-2 rounded-full bg-gradient-to-r ${c.color} text-white text-xs font-mono font-semibold shadow-md`}
            >
              {c.label}
            </span>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Code */}
          <div className="lg:col-span-3">
            <CodeBlock
              language="tsx"
              title="TodoApp.tsx — Complete Code"
              code={`import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  FlatList, StyleSheet,
} from 'react-native';

interface Todo {
  id: string;
  text: string;
  done: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([{
      id: Date.now().toString(),
      text: input.trim(),
      done: false,
    }, ...todos]);
    setInput('');
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Todos</Text>
      <Text style={styles.count}>
        {todos.filter(t => !t.done).length} remaining
      </Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Add a todo..."
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
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoRow}>
            <TouchableOpacity
              onPress={() => toggleTodo(item.id)}
              style={styles.todoContent}
            >
              <View style={[
                styles.check,
                item.done && styles.checkDone,
              ]}>
                {item.done && (
                  <Text style={styles.checkMark}>✓</Text>
                )}
              </View>
              <Text style={[
                styles.todoText,
                item.done && styles.todoDone,
              ]}>
                {item.text}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTodo(item.id)}>
              <Text style={styles.deleteText}>×</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No todos yet — add one above!
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60, backgroundColor: '#0F172A' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#F8FAFC' },
  count: { fontSize: 13, color: '#94A3B8', marginBottom: 20 },
  inputRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  input: {
    flex: 1, backgroundColor: '#1E293B', borderRadius: 12, padding: 14,
    fontSize: 15, color: '#F8FAFC', borderWidth: 1, borderColor: '#334155',
  },
  addBtn: {
    width: 50, borderRadius: 12, backgroundColor: '#22C55E',
    justifyContent: 'center', alignItems: 'center',
  },
  addText: { fontSize: 24, color: '#0F172A', fontWeight: 'bold' },
  todoRow: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E293B',
    borderRadius: 12, padding: 14, marginBottom: 8,
  },
  todoContent: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 },
  check: {
    width: 22, height: 22, borderRadius: 11, borderWidth: 2,
    borderColor: '#475569', justifyContent: 'center', alignItems: 'center',
  },
  checkDone: { backgroundColor: '#22C55E', borderColor: '#22C55E' },
  checkMark: { color: '#0F172A', fontSize: 12, fontWeight: 'bold' },
  todoText: { flex: 1, color: '#F8FAFC', fontSize: 15 },
  todoDone: { textDecorationLine: 'line-through', color: '#64748B' },
  deleteText: { fontSize: 20, color: '#EF4444', padding: 4 },
  empty: { textAlign: 'center', color: '#64748B', marginTop: 40, fontSize: 15 },
});`}
            />
          </div>

          {/* Sidebar explanation */}
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-2xl bg-card border border-border p-6 shadow-lg shadow-black/10">
              <h4 className="font-heading font-semibold text-accent text-lg mb-4">What this uses</h4>
              <ul className="space-y-4 text-sm text-text-muted">
                <li className="flex gap-3">
                  <span className="text-accent font-mono font-bold shrink-0">01</span>
                  <span><strong className="text-text">useState</strong> — tracks the todo list and input field text</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan font-mono font-bold shrink-0">02</span>
                  <span><strong className="text-text">TextInput</strong> — captures user input with onChangeText</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-mono font-bold shrink-0">03</span>
                  <span><strong className="text-text">FlatList</strong> — renders the todo list efficiently</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink font-mono font-bold shrink-0">04</span>
                  <span><strong className="text-text">TouchableOpacity</strong> — handles taps for toggle/delete</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-purple font-mono font-bold shrink-0">05</span>
                  <span><strong className="text-text">TypeScript</strong> — Todo interface for type safety</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-card border border-border p-6 shadow-lg shadow-black/10">
              <h4 className="font-heading font-semibold text-pink text-lg mb-4">Try extending it!</h4>
              <ul className="space-y-3 text-sm text-text-muted">
                {[
                  'Add categories or tags',
                  'Persist with AsyncStorage',
                  'Add due dates',
                  'Swipe to delete (react-native-gesture-handler)',
                  'Add animations (react-native-reanimated)',
                ].map((idea) => (
                  <li key={idea} className="flex items-start gap-3">
                    <span className="text-pink font-bold mt-0.5">+</span>
                    <span>{idea}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/15 to-cyan/10 border border-primary/30 shadow-lg shadow-primary/5">
              <h4 className="font-heading font-semibold text-primary mb-2">Try it live!</h4>
              <p className="text-sm text-text-muted">
                The Expo Snack below lets you edit and run this code directly in your browser.
              </p>
            </div>
          </div>
        </div>

        {/* Try it live */}
        <div className="mt-12">
          <div className="text-center mb-6">
            <h4 className="font-heading font-bold text-text text-xl mb-3">Try it on Expo Snack</h4>
            <p className="text-text-muted max-w-lg mx-auto">
              Edit and run this code directly in your browser — no setup needed.
            </p>
          </div>
          <ExpoSnack id="@snack/todo-app-example" title="Todo App" platform="web" height={550} />
          <div className="mt-4 text-center">
            <a
              href="https://snack.expo.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors"
            >
              Open in full Expo Snack
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
