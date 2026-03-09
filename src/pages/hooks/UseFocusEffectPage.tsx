import { PageShell } from '../../components/PageShell'
import { HooksSidebar } from '../../components/HooksSidebar'
import { CodeBlock } from '../../components/CodeBlock'
import { InfoBox } from '../../components/InfoBox'

export function UseFocusEffectPage() {
  return (
    <PageShell
      title="useFocusEffect"
      subtitle="Run code every time a screen comes into focus — not just the first time it mounts. Essential for keeping data fresh in mobile apps."
      gradient="from-purple to-accent"
      badge="REACT NAVIGATION"
      breadcrumbs={[{ label: 'Hooks' }, { label: 'useFocusEffect' }]}
      sidebar={<HooksSidebar />}
    >
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-text mb-4">Why useFocusEffect Exists</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            On the web, every time you visit a page, the browser creates it from scratch. Navigate away and come back?
            The page reloads. This means any code that runs when the page loads will run again.
          </p>
          <p className="text-text-muted leading-relaxed mb-4">
            Mobile apps work differently. When you navigate from Screen A to Screen B, Screen A <strong className="text-text">stays
            alive in memory</strong>. It's hidden behind Screen B, but it doesn't get destroyed. When you navigate back
            to Screen A, it's already there — it doesn't reload. This is called a "navigation stack" and it's how mobile
            apps feel fast and smooth.
          </p>
          <p className="text-text-muted leading-relaxed mb-4">
            The problem? If you use <code className="text-accent">useEffect</code> (React's standard hook for running code
            on load), it only runs when the component is first created. Since screens stay mounted, <code className="text-accent">useEffect</code> won't
            run again when the user navigates back. This means stale data, paused animations not resuming, and
            other bugs.
          </p>
          <p className="text-text-muted leading-relaxed mb-4">
            <code className="text-accent">useFocusEffect</code> solves this. It runs your code every time the screen
            becomes visible (gains "focus"), and optionally runs cleanup code when the screen is hidden (loses focus).
          </p>
        </section>

        {/* Comparison */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-text mb-4">useEffect vs useFocusEffect</h2>
          <div className="overflow-x-auto rounded-xl border border-border mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface border-b border-border">
                  <th className="text-left px-4 py-3 font-heading font-semibold text-text">Scenario</th>
                  <th className="text-left px-4 py-3 font-heading font-semibold text-text">useEffect</th>
                  <th className="text-left px-4 py-3 font-heading font-semibold text-text">useFocusEffect</th>
                </tr>
              </thead>
              <tbody className="text-text-muted">
                <tr className="border-b border-border">
                  <td className="px-4 py-3">Screen first created</td>
                  <td className="px-4 py-3 text-primary font-semibold">Runs</td>
                  <td className="px-4 py-3 text-primary font-semibold">Runs</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-3">Navigate away from screen</td>
                  <td className="px-4 py-3 text-text-muted">Nothing (screen stays mounted)</td>
                  <td className="px-4 py-3 text-warning font-semibold">Cleanup runs</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-3">Navigate back to screen</td>
                  <td className="px-4 py-3 text-text-muted">Nothing (already mounted)</td>
                  <td className="px-4 py-3 text-primary font-semibold">Runs again</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Screen destroyed</td>
                  <td className="px-4 py-3 text-warning font-semibold">Cleanup runs</td>
                  <td className="px-4 py-3 text-warning font-semibold">Cleanup runs</td>
                </tr>
              </tbody>
            </table>
          </div>
          <InfoBox variant="info" title="What is 'focus'?">
            A screen is "focused" when it's the one currently visible to the user. In a stack navigator, the top
            screen has focus. In a tab navigator, the selected tab has focus. When you switch tabs or push/pop
            screens, focus changes.
          </InfoBox>
        </section>

        {/* Basic usage */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-text mb-4">Basic Usage</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            <code className="text-accent">useFocusEffect</code> takes a callback function wrapped
            in <code className="text-accent">useCallback</code>. Don't worry about why — we'll explain below. For now,
            just know that this is the required syntax pattern.
          </p>
          <CodeBlock
            title="Basic useFocusEffect pattern"
            code={`import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { View, Text } from 'react-native';

export default function NotificationsScreen() {
  useFocusEffect(
    // useCallback wraps the function — this is required
    useCallback(() => {
      // This code runs every time the screen gains focus
      console.log('Screen is focused! Fetching fresh data...');

      // Return a cleanup function (optional)
      // This runs when the screen loses focus
      return () => {
        console.log('Screen lost focus. Cleaning up...');
      };
    }, []) // Empty array = no dependencies, but still runs on every focus
  );

  return (
    <View style={{ padding: 20 }}>
      <Text>Notifications</Text>
    </View>
  );
}`}
          />
          <InfoBox variant="warning" title="Always use useCallback">
            You <strong>must</strong> wrap the callback in <code className="text-accent">useCallback</code>. Without it,
            the effect would run on every single render (which can happen many times per second), not just when
            focus changes. The <code className="text-accent">useCallback</code> wrapper tells React to reuse the same
            function reference unless its dependencies change.
          </InfoBox>
        </section>

        {/* Fetching fresh data */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-text mb-4">Example: Fetching Fresh Data</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            The most common use case is fetching data every time the user navigates to a screen. Imagine a
            notifications screen — you want to load the latest notifications every time the user taps the
            Notifications tab, not just the first time.
          </p>
          <CodeBlock
            title="Refreshing data on every focus"
            code={`import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

type Notification = {
  id: string;
  message: string;
  time: string;
};

export default function NotificationsScreen() {
  // useState creates variables that React tracks for changes
  // When you call setNotifications(), React updates the UI
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      // This function runs every time this screen gains focus
      let isActive = true; // Guard against setting state after unmount

      async function fetchNotifications() {
        setLoading(true);
        try {
          const response = await fetch(
            'https://api.example.com/notifications'
          );
          const data = await response.json();

          // Only update state if the component is still mounted
          if (isActive) {
            setNotifications(data);
            setLoading(false);
          }
        } catch (error) {
          console.error('Failed to fetch notifications:', error);
          if (isActive) setLoading(false);
        }
      }

      fetchNotifications();

      // Cleanup: mark as inactive when screen loses focus
      return () => {
        isActive = false;
      };
    }, []) // Empty dependency array
  );

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>
        Notifications
      </Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 12, borderBottomWidth: 1 }}>
            <Text style={{ fontWeight: '600' }}>{item.message}</Text>
            <Text style={{ color: '#999', marginTop: 4 }}>
              {item.time}
            </Text>
          </View>
        )}
      />
    </View>
  );
}`}
          />
          <p className="text-text-muted leading-relaxed">
            The <code className="text-accent">isActive</code> variable is a safety measure. If the user navigates away
            before the API call finishes, we don't want to update the screen's state (because it might cause errors).
            The cleanup function sets <code className="text-accent">isActive = false</code> when the screen loses focus.
          </p>
        </section>

        {/* Pause/resume */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-text mb-4">Example: Pausing and Resuming</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            Another common use case is starting something when the screen is visible and stopping it when the user
            navigates away. Think of it like how a video pauses when you switch tabs in a browser.
          </p>
          <CodeBlock
            title="Starting/stopping a timer based on focus"
            code={`import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TimerScreen() {
  const [seconds, setSeconds] = useState(0);
  // useRef stores a value that persists across renders
  // without causing re-renders when it changes
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useFocusEffect(
    useCallback(() => {
      // Screen gained focus → start the timer
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);

      // Screen lost focus → stop the timer
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{seconds}s</Text>
      <Text style={styles.hint}>
        Timer pauses when you leave this screen
        and resumes when you come back.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    fontSize: 64,
    fontWeight: 'bold',
  },
  hint: {
    marginTop: 20,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});`}
          />
          <p className="text-text-muted leading-relaxed">
            <code className="text-accent">setInterval</code> works the same as in browser JavaScript — it runs a function
            every N milliseconds. <code className="text-accent">clearInterval</code> stops it. The cleanup function (the
            returned function) ensures we don't leak timers when the user navigates away.
          </p>
        </section>

        {/* With dependencies */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-text mb-4">Using Dependencies</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            Sometimes your effect depends on a value that might change. You add it to the dependency array
            of <code className="text-accent">useCallback</code> so the effect uses the latest value.
          </p>
          <CodeBlock
            title="Effect that depends on a user ID"
            code={`import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

export default function UserProfileScreen() {
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const [profile, setProfile] = useState(null);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function loadProfile() {
        const response = await fetch(
          \`https://api.example.com/users/\${userId}\`
        );
        const data = await response.json();
        if (isActive) setProfile(data);
      }

      loadProfile();

      return () => { isActive = false; };
    }, [userId]) // <-- Re-create the effect when userId changes
  );

  // ... render the profile
}`}
          />
          <InfoBox variant="tip" title="When to use useEffect vs useFocusEffect">
            Use <code className="text-accent">useEffect</code> for things that should only happen once when the screen
            is first created (like setting up a WebSocket connection). Use <code className="text-accent">useFocusEffect</code> for
            things that should happen every time the user sees the screen (like fetching fresh data or resuming playback).
          </InfoBox>
        </section>
      </div>
    </PageShell>
  )
}
