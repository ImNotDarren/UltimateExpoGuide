import { PageShell } from '../../components/PageShell'
import { HooksSidebar } from '../../components/HooksSidebar'
import { CodeBlock } from '../../components/CodeBlock'
import { InfoBox } from '../../components/InfoBox'

export function UseNavigationPage() {
  return (
    <PageShell
      title="useNavigation"
      subtitle="The lower-level navigation hook from React Navigation — for advanced screen options, event listeners, and fine-grained control."
      gradient="from-info to-accent"
      badge="REACT NAVIGATION"
      breadcrumbs={[{ label: 'Hooks' }, { label: 'useNavigation' }]}
      sidebar={<HooksSidebar />}
    >
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-text mb-4">What is useNavigation?</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            Expo Router is built on top of a library called <strong className="text-text">React Navigation</strong>.
            While <code className="text-accent">useRouter</code> (from Expo Router) handles most navigation needs,
            <code className="text-accent"> useNavigation</code> (from React Navigation) gives you access to lower-level
            features that <code className="text-accent">useRouter</code> doesn't expose.
          </p>
          <p className="text-text-muted leading-relaxed mb-4">
            Think of it like this: <code className="text-accent">useRouter</code> is the simple remote control for your TV.
            <code className="text-accent"> useNavigation</code> is the settings menu — more options, more control, but you
            only need it for specific tasks.
          </p>
          <p className="text-text-muted leading-relaxed mb-4">
            The main things you'll use <code className="text-accent">useNavigation</code> for:
          </p>
          <ul className="list-disc list-inside text-text-muted space-y-2 mb-4">
            <li>Dynamically changing the screen's header title or buttons</li>
            <li>Listening to navigation events (focus, blur, beforeRemove)</li>
            <li>Preventing the user from leaving a screen (unsaved changes)</li>
            <li>Getting the current navigation state</li>
          </ul>
        </section>

        {/* Basic usage */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-text mb-4">Basic Usage</h2>
          <CodeBlock
            title="Getting the navigation object"
            code={`import { useNavigation } from '@react-navigation/native';
import { View, Text, Button } from 'react-native';

export default function SettingsScreen(): React.ReactElement {
  // Get the navigation object
  const navigation = useNavigation();

  return (
    <View style={{ padding: 20 }}>
      <Text>Settings</Text>

      {/* Basic navigation (useRouter is simpler for this) */}
      <Button
        title="Go Back"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}`}
          />
          <InfoBox variant="info" title="useRouter vs useNavigation for simple navigation">
            For basic navigation (push, replace, back), stick with <code className="text-accent">useRouter</code> from
            Expo Router — it's simpler and type-safe. Use <code className="text-accent">useNavigation</code> only when you
            need features that <code className="text-accent">useRouter</code> doesn't provide, like the ones shown below.
          </InfoBox>
        </section>

        {/* setOptions */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-text mb-4">Dynamically Setting Screen Options</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            On the web, you can change the page title with <code className="text-accent">document.title = 'New Title'</code>.
            In a mobile app, each screen has a header bar at the top. <code className="text-accent">navigation.setOptions()</code> lets
            you change that header dynamically — the title, the buttons, the style, and more.
          </p>
          <CodeBlock
            title="Changing the header title dynamically"
            code={`import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

export default function ChatScreen(): React.ReactElement {
  const navigation = useNavigation();
  const { contactName } = useLocalSearchParams<{
    contactName: string;
  }>();

  // useEffect runs code after the component renders
  useEffect(() => {
    // Set the header title to the contact's name
    navigation.setOptions({
      title: contactName || 'Chat',
    });
  }, [navigation, contactName]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text>Chatting with {contactName}</Text>
    </View>
  );
}`}
          />
          <p className="text-text-muted leading-relaxed mb-4">
            You can also add custom buttons to the header. This is common for actions like "Save," "Edit," or a
            settings gear icon in the top-right corner.
          </p>
          <CodeBlock
            title="Adding a header button"
            code={`import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

export default function ProfileScreen(): React.ReactElement {
  const navigation = useNavigation();

  useEffect((): void => {
    navigation.setOptions({
      title: 'My Profile',
      // headerRight renders a component on the right side of the header
      headerRight: (): React.ReactElement => (
        <TouchableOpacity
          onPress={() => Alert.alert('Settings', 'Open settings!')}
          style={{ marginRight: 16 }}
        >
          <Text style={{ color: '#007AFF', fontSize: 16 }}>Edit</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24 }}>Profile Screen</Text>
      <Text>Your profile information here...</Text>
    </View>
  );
}`}
          />
        </section>

        {/* Event listeners */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-text mb-4">Listening to Navigation Events</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            On the web, you can listen for events like <code className="text-accent">window.addEventListener('beforeunload', ...)</code> to
            run code when the user is about to leave the page. React Navigation has similar events for screens:
          </p>
          <ul className="list-disc list-inside text-text-muted space-y-2 mb-4">
            <li><code className="text-accent">focus</code> — screen is now visible</li>
            <li><code className="text-accent">blur</code> — screen is no longer visible</li>
            <li><code className="text-accent">beforeRemove</code> — screen is about to be removed from the stack</li>
          </ul>
          <CodeBlock
            title="Listening to focus and blur events"
            code={`import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { View, Text } from 'react-native';

export default function VideoScreen(): React.ReactElement {
  const navigation = useNavigation();

  useEffect((): (() => void) => {
    // addListener returns an unsubscribe function
    const unsubFocus = navigation.addListener('focus', (): void => {
      console.log('Screen focused — resume video playback');
      // videoPlayer.play();
    });

    const unsubBlur = navigation.addListener('blur', (): void => {
      console.log('Screen blurred — pause video playback');
      // videoPlayer.pause();
    });

    // Cleanup: remove listeners when component unmounts
    return (): void => {
      unsubFocus();
      unsubBlur();
    };
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <Text>Video Player Screen</Text>
    </View>
  );
}`}
          />
          <p className="text-text-muted leading-relaxed">
            The <code className="text-accent">addListener</code> pattern should be familiar from web JavaScript —
            it's like <code className="text-accent">element.addEventListener()</code>. The cleanup function (the returned
            function in <code className="text-accent">useEffect</code>) removes the listeners to prevent memory leaks,
            similar to <code className="text-accent">removeEventListener</code>.
          </p>
        </section>

        {/* Preventing navigation */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-text mb-4">Complete Example: Preventing Unsaved Changes</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            One of the most practical uses of <code className="text-accent">useNavigation</code> is preventing the user from
            accidentally leaving a screen with unsaved changes. On the web, you'd use the
            <code className="text-accent"> beforeunload</code> event. In React Navigation, you use the
            <code className="text-accent"> beforeRemove</code> event.
          </p>
          <CodeBlock
            title="Preventing navigation with unsaved changes"
            code={`import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  View, Text, TextInput, Button, Alert, StyleSheet,
} from 'react-native';

export default function EditNoteScreen(): React.ReactElement {
  const navigation = useNavigation();
  const [noteText, setNoteText] = useState<string>('');
  const [savedText, setSavedText] = useState<string>('');

  // Check if there are unsaved changes
  const hasUnsavedChanges: boolean = noteText !== savedText;

  useEffect(() => {
    // Listen for the 'beforeRemove' event
    // This fires when the user tries to leave the screen
    const unsubscribe = navigation.addListener(
      'beforeRemove',
      (e) => {
        // If no unsaved changes, let the navigation happen
        if (!hasUnsavedChanges) return;

        // Prevent the default behavior (leaving the screen)
        e.preventDefault();

        // Show a confirmation dialog
        Alert.alert(
          'Discard changes?',
          'You have unsaved changes. Are you sure you want to leave?',
          [
            {
              text: "Don't leave",
              style: 'cancel',
              // Do nothing — the user stays on the screen
            },
            {
              text: 'Discard',
              style: 'destructive',
              // Dispatch the original navigation action
              // to actually leave the screen
              onPress: () => navigation.dispatch(e.data.action),
            },
          ]
        );
      }
    );

    // Cleanup: remove the listener
    return unsubscribe;
  }, [navigation, hasUnsavedChanges]);

  const handleSave = (): void => {
    // In a real app, save to your API here
    setSavedText(noteText);
    Alert.alert('Saved!', 'Your note has been saved.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Note</Text>

      <TextInput
        style={styles.input}
        multiline
        placeholder="Write your note..."
        value={noteText}
        onChangeText={setNoteText}
      />

      {hasUnsavedChanges && (
        <Text style={styles.unsavedWarning}>
          You have unsaved changes
        </Text>
      )}

      <Button title="Save Note" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 200,
    textAlignVertical: 'top',  // Android: start text at top
    marginBottom: 12,
  },
  unsavedWarning: {
    color: '#FF6B00',
    marginBottom: 12,
    fontStyle: 'italic',
  },
});`}
          />
          <p className="text-text-muted leading-relaxed mb-4">
            Let's break down the flow:
          </p>
          <ol className="list-decimal list-inside text-text-muted space-y-2 mb-4">
            <li>User types in the text input — <code className="text-accent">noteText</code> updates but <code className="text-accent">savedText</code> stays the same</li>
            <li><code className="text-accent">hasUnsavedChanges</code> becomes <code className="text-accent">true</code></li>
            <li>User tries to go back (swipe, back button, etc.)</li>
            <li>The <code className="text-accent">beforeRemove</code> event fires</li>
            <li>We call <code className="text-accent">e.preventDefault()</code> to block the navigation</li>
            <li>We show an Alert asking the user to confirm</li>
            <li>If they choose "Discard," we manually dispatch the original navigation action</li>
          </ol>
          <InfoBox variant="tip" title="Web comparison">
            This is exactly like the web's <code className="text-accent">window.onbeforeunload</code> pattern where
            you show "Are you sure you want to leave? Changes you made may not be saved." — but with a nicer
            native Alert dialog instead of the browser's generic one.
          </InfoBox>
        </section>

        {/* getState */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-text mb-4">Getting Navigation State</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            You can inspect the current navigation state — useful for debugging or conditional logic.
          </p>
          <CodeBlock
            title="Reading navigation state"
            code={`import { useNavigation } from '@react-navigation/native';

export default function DebugScreen(): React.ReactElement {
  const navigation = useNavigation();
  const state = navigation.getState();

  // state contains:
  // {
  //   index: 2,              // which screen is active
  //   routes: [               // all screens in the stack
  //     { name: 'home', ... },
  //     { name: 'products', ... },
  //     { name: 'product-detail', params: { id: '42' } },
  //   ],
  // }

  console.log('Current route:', state.routes[state.index].name);
  console.log('Stack depth:', state.routes.length);
}`}
          />
          <InfoBox variant="warning" title="Avoid overusing getState">
            For most cases, use <code className="text-accent">usePathname</code> or <code className="text-accent">useSegments</code> to
            read the current route. <code className="text-accent">getState()</code> gives you the raw navigation state,
            which is an implementation detail of React Navigation and can be more complex than needed.
          </InfoBox>
        </section>
      </div>
    </PageShell>
  )
}
