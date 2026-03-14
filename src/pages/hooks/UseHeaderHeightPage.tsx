import { PageShell } from '../../components/PageShell'
import { HooksSidebar } from '../../components/HooksSidebar'
import { CodeBlock } from '../../components/CodeBlock'
import { InfoBox } from '../../components/InfoBox'

export function UseHeaderHeightPage() {
  return (
    <PageShell
      title="useHeaderHeight"
      subtitle="Returns the height of the navigation header in pixels — essential for positioning content correctly on different devices."
      gradient="from-orange to-pink"
      badge="REACT NAVIGATION"
      breadcrumbs={[{ label: 'Hooks' }, { label: 'useHeaderHeight' }]}
      sidebar={<HooksSidebar />}
    >
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-text mb-4">Why You Need This Hook</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            On the web, if you have a fixed navigation bar at the top of the page, you know its height (because
            you set it in CSS) and you add <code className="text-accent">padding-top</code> or <code className="text-accent">margin-top</code> to
            your content so it doesn't hide behind the navbar. Simple enough — you control the height.
          </p>
          <p className="text-text-muted leading-relaxed mb-4">
            On mobile, it's more complicated. The header height varies depending on:
          </p>
          <ul className="list-disc list-inside text-text-muted space-y-2 mb-4">
            <li><strong className="text-text">Device type</strong> — iPhones with the Dynamic Island have a taller status bar than older iPhones</li>
            <li><strong className="text-text">Platform</strong> — iOS and Android have different default header heights</li>
            <li><strong className="text-text">Orientation</strong> — landscape mode often has a shorter header</li>
            <li><strong className="text-text">Custom header content</strong> — a large title header (common on iOS) is taller than a standard one</li>
          </ul>
          <p className="text-text-muted leading-relaxed mb-4">
            <code className="text-accent">useHeaderHeight()</code> gives you the exact header height in pixels, so you
            can position your content correctly on any device.
          </p>
        </section>

        {/* Basic usage */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-text mb-4">Basic Usage</h2>
          <CodeBlock
            title="Getting the header height"
            code={`import { useHeaderHeight } from '@react-navigation/elements';
import { View, Text } from 'react-native';

export default function MyScreen(): React.ReactElement {
  // Returns a number, e.g., 96 (pixels)
  const headerHeight: number = useHeaderHeight();

  return (
    <View style={{ flex: 1 }}>
      <Text>Header is {headerHeight}px tall</Text>
    </View>
  );
}

// Typical values:
// iPhone (standard):    ~96px
// iPhone (large title): ~140px
// Android:              ~56-64px`}
          />
          <p className="text-text-muted leading-relaxed">
            Note the import path: <code className="text-accent">@react-navigation/elements</code>, not
            <code className="text-accent"> @react-navigation/native</code>. This is a separate package that provides
            UI-related utilities.
          </p>
        </section>

        {/* Positioning content */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-text mb-4">Example: Positioning Content Below the Header</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            When you set <code className="text-accent">headerTransparent: true</code> in your screen options (making the
            header see-through), your content will render behind the header. You need <code className="text-accent">useHeaderHeight</code> to
            add the right amount of padding so nothing is hidden.
          </p>
          <CodeBlock
            title="Adding padding for a transparent header"
            code={`import { useHeaderHeight } from '@react-navigation/elements';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

// This screen has headerTransparent: true set in its options
export default function TransparentHeaderScreen(): React.ReactElement {
  const headerHeight: number = useHeaderHeight();

  return (
    <ScrollView
      style={styles.container}
      // Add padding so content starts below the header
      contentContainerStyle={{ paddingTop: headerHeight }}
    >
      <Text style={styles.title}>
        This content starts right below the header,
        no matter what device you're on!
      </Text>

      {/* Lots of content here... */}
      {Array.from({ length: 20 }).map((_: unknown, i: number): React.ReactElement => (
        <View key={i} style={styles.card}>
          <Text>Item {i + 1}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
});`}
          />
          <p className="text-text-muted leading-relaxed">
            <code className="text-accent">contentContainerStyle</code> is a prop specific to <code className="text-accent">ScrollView</code> and
            <code className="text-accent"> FlatList</code>. It styles the inner container that holds the scrollable content.
            This is where you add padding, not on the <code className="text-accent">ScrollView</code> itself — otherwise
            the scroll indicator would also be padded.
          </p>
          <InfoBox variant="tip" title="Web comparison">
            This is equivalent to having a fixed navbar on the web and adding
            <code className="text-accent"> padding-top: 64px</code> to your content container. The difference is that
            on mobile, you can't hard-code the value — <code className="text-accent">useHeaderHeight()</code> gives you
            the exact value for the current device.
          </InfoBox>
        </section>

        {/* KeyboardAvoidingView */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-text mb-4">Example: KeyboardAvoidingView</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            When the on-screen keyboard opens on a mobile device, it covers the bottom portion of the screen. React
            Native provides a <code className="text-accent">KeyboardAvoidingView</code> component that automatically
            adjusts your layout to keep input fields visible. However, it needs to know the header height to
            calculate the correct offset.
          </p>
          <CodeBlock
            title="KeyboardAvoidingView with header height"
            code={`import { useHeaderHeight } from '@react-navigation/elements';
import {
  KeyboardAvoidingView,
  Platform,
  View,
  TextInput,
  Text,
  Button,
  StyleSheet,
} from 'react-native';

export default function ChatInputScreen(): React.ReactElement {
  const headerHeight: number = useHeaderHeight();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      // 'padding' behavior works best on iOS
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      // Offset accounts for the header height
      keyboardVerticalOffset={headerHeight}
    >
      {/* Chat messages would go here */}
      <View style={styles.messages}>
        <Text style={styles.message}>Hello!</Text>
        <Text style={styles.message}>How are you?</Text>
        <Text style={styles.message}>This input stays above the keyboard.</Text>
      </View>

      {/* Input bar at the bottom */}
      <View style={styles.inputBar}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
        />
        <Button title="Send" onPress={() => {}} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messages: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-end',
  },
  message: {
    padding: 12,
    backgroundColor: '#e1f5fe',
    borderRadius: 12,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 16,
  },
});`}
          />
          <p className="text-text-muted leading-relaxed">
            <code className="text-accent">Platform.OS</code> returns <code className="text-accent">'ios'</code> or
            <code className="text-accent"> 'android'</code>, letting you customize behavior per platform. This is a
            common pattern because iOS and Android handle the keyboard differently. On the web, you'd check
            <code className="text-accent"> navigator.userAgent</code> — this is the React Native equivalent.
          </p>
        </section>

        {/* useSafeAreaInsets */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-text mb-4">Related: useSafeAreaInsets</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            While <code className="text-accent">useHeaderHeight</code> gives you the header height, another hook called
            <code className="text-accent"> useSafeAreaInsets</code> (from <code className="text-accent">react-native-safe-area-context</code>)
            tells you how much space is taken up by the device's notch, Dynamic Island, home indicator bar, and
            other system UI elements.
          </p>
          <CodeBlock
            title="Using useSafeAreaInsets for full-screen layouts"
            code={`import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, Text, StyleSheet } from 'react-native';

export default function FullScreenPage(): React.ReactElement {
  // insets tells you the safe area on each side
  const insets = useSafeAreaInsets();

  // insets = {
  //   top: 59,     // notch / Dynamic Island area
  //   bottom: 34,  // home indicator bar
  //   left: 0,
  //   right: 0,
  // }

  return (
    <View style={[
      styles.container,
      {
        // Add padding so content doesn't overlap system UI
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      },
    ]}>
      <Text style={styles.text}>
        This content respects the safe area on all sides!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    padding: 20,
  },
});`}
          />
          <InfoBox variant="tip" title="Combining both hooks">
            For full-screen layouts without a navigation header, use <code className="text-accent">useSafeAreaInsets</code> to
            handle the notch and home indicator. For screens with a navigation header, use
            <code className="text-accent"> useHeaderHeight</code> instead — it already accounts for the safe area at the
            top. You can combine both when you need safe area padding at the bottom and header offset at the top.
          </InfoBox>
        </section>

        {/* When to use which */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-text mb-4">Quick Reference: When to Use What</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface border-b border-border">
                  <th className="text-left px-4 py-3 font-heading font-semibold text-text">Situation</th>
                  <th className="text-left px-4 py-3 font-heading font-semibold text-text">Use This</th>
                </tr>
              </thead>
              <tbody className="text-text-muted">
                <tr className="border-b border-border">
                  <td className="px-4 py-3">Content behind a transparent header</td>
                  <td className="px-4 py-3 font-mono text-accent">useHeaderHeight()</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-3">Keyboard pushing content up</td>
                  <td className="px-4 py-3 font-mono text-accent">useHeaderHeight() + KeyboardAvoidingView</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-3">Full-screen layout (no header)</td>
                  <td className="px-4 py-3 font-mono text-accent">useSafeAreaInsets()</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-3">Bottom content (above home bar)</td>
                  <td className="px-4 py-3 font-mono text-accent">useSafeAreaInsets().bottom</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Both header + bottom safe area</td>
                  <td className="px-4 py-3 font-mono text-accent">Both hooks together</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Full screen example */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-text mb-4">Complete Example: Chat Screen with Both Hooks</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            Here's a complete chat screen that uses both <code className="text-accent">useHeaderHeight</code> and
            <code className="text-accent"> useSafeAreaInsets</code> to handle a transparent header at the top and the
            home indicator bar at the bottom.
          </p>
          <CodeBlock
            title="Full chat screen layout"
            code={`import { useHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  View, Text, TextInput, TouchableOpacity,
  FlatList, KeyboardAvoidingView, Platform, StyleSheet,
} from 'react-native';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'them';
}

export default function ChatScreen(): React.ReactElement {
  const headerHeight: number = useHeaderHeight();
  const insets = useSafeAreaInsets();

  const messages: Message[] = [
    { id: '1', text: 'Hey there!', sender: 'them' },
    { id: '2', text: 'Hi! How are you?', sender: 'me' },
    { id: '3', text: 'Great, thanks!', sender: 'them' },
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={headerHeight}
    >
      {/* Messages list */}
      <FlatList
        data={messages}
        keyExtractor={(item: Message): string => item.id}
        contentContainerStyle={{ paddingTop: headerHeight }}
        renderItem={({ item }: { item: Message }): React.ReactElement => (
          <View style={[
            styles.messageBubble,
            item.sender === 'me'
              ? styles.myMessage
              : styles.theirMessage,
          ]}>
            <Text style={
              item.sender === 'me'
                ? styles.myText
                : styles.theirText
            }>
              {item.text}
            </Text>
          </View>
        )}
      />

      {/* Input area — padded above the home indicator */}
      <View style={[
        styles.inputContainer,
        { paddingBottom: Math.max(insets.bottom, 8) },
      ]}>
        <TextInput
          style={styles.textInput}
          placeholder="Message..."
        />
        <TouchableOpacity style={styles.sendButton}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  messageBubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 4,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e5e5ea',
  },
  myText: { color: '#fff' },
  theirText: { color: '#000' },
  inputContainer: {
    flexDirection: 'row',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sendText: { color: '#fff', fontWeight: '600' },
});`}
          />
          <InfoBox variant="info" title="Math.max for safe padding">
            The <code className="text-accent">{'Math.max(insets.bottom, 8)'}</code> pattern ensures there's always at least
            8px of padding at the bottom, even on devices without a home indicator bar. On iPhones with the home
            bar, <code className="text-accent">insets.bottom</code> is typically 34px, so it uses that larger value.
          </InfoBox>
        </section>
      </div>
    </PageShell>
  )
}
