import { PageShell } from '../../components/PageShell'
import { HooksSidebar } from '../../components/HooksSidebar'
import { CodeBlock } from '../../components/CodeBlock'
import { InfoBox } from '../../components/InfoBox'
import { Quiz } from '../../components/Quiz'

export function FirebasePage() {
  return (
    <PageShell
      title="Firebase (JS SDK)"
      subtitle="Use the Firebase JavaScript SDK with Expo Go — no native modules, no config plugins, no ejecting. Covers Auth, Firestore, Realtime Database, Storage, and Cloud Functions."
      gradient="from-orange to-warning"
      badge="BACKEND / BAAS"
      breadcrumbs={[{ label: 'Services' }, { label: 'Firebase' }]}
      sidebar={<HooksSidebar />}
    >
      {/* Why the JS SDK? */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">Why the Firebase JS SDK?</h2>
        <p className="text-text-muted leading-relaxed">
          There are two ways to use Firebase in React Native:
          the <strong className="text-text">React Native Firebase</strong> library (<code className="text-accent">@react-native-firebase/*</code>)
          which uses native SDKs under the hood, and the <strong className="text-text">Firebase JavaScript SDK</strong> (<code className="text-accent">firebase</code>)
          which runs entirely in JavaScript.
        </p>
        <p className="text-text-muted leading-relaxed">
          The native library is more powerful (push notifications, crashlytics, App Check with device attestation), but it
          requires a <strong className="text-text">custom dev client</strong> — meaning you cannot use <strong className="text-text">Expo Go</strong>.
          The JS SDK works out of the box with Expo Go, making it perfect for prototyping, learning, and many production apps.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 pr-4 font-heading font-semibold text-text">Feature</th>
                <th className="text-left py-3 pr-4 font-heading font-semibold text-text">JS SDK (firebase)</th>
                <th className="text-left py-3 font-heading font-semibold text-text">Native (@react-native-firebase)</th>
              </tr>
            </thead>
            <tbody className="text-text-muted">
              <tr className="border-b border-border/50">
                <td className="py-3 pr-4 font-semibold text-text">Works in Expo Go</td>
                <td className="py-3 pr-4 text-primary font-semibold">Yes</td>
                <td className="py-3 text-error font-semibold">No (needs dev client)</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 pr-4 font-semibold text-text">Auth</td>
                <td className="py-3 pr-4">Full (email, Google, Apple, phone, anonymous)</td>
                <td className="py-3">Full + native UI prompts</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 pr-4 font-semibold text-text">Firestore</td>
                <td className="py-3 pr-4">Full (queries, real-time listeners, offline)</td>
                <td className="py-3">Full + better offline persistence</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 pr-4 font-semibold text-text">Realtime Database</td>
                <td className="py-3 pr-4">Full</td>
                <td className="py-3">Full</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 pr-4 font-semibold text-text">Storage</td>
                <td className="py-3 pr-4">Upload blobs (not file paths)</td>
                <td className="py-3">Upload from file paths (putFile)</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 pr-4 font-semibold text-text">Cloud Functions</td>
                <td className="py-3 pr-4">Full (httpsCallable)</td>
                <td className="py-3">Full</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 pr-4 font-semibold text-text">Push Notifications (FCM)</td>
                <td className="py-3 pr-4 text-error">No</td>
                <td className="py-3 text-primary">Yes</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 pr-4 font-semibold text-text">Crashlytics</td>
                <td className="py-3 pr-4 text-error">No</td>
                <td className="py-3 text-primary">Yes</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-semibold text-text">App Check (device attestation)</td>
                <td className="py-3 pr-4 text-warning">reCAPTCHA only</td>
                <td className="py-3 text-primary">PlayIntegrity / AppAttest</td>
              </tr>
            </tbody>
          </table>
        </div>

        <InfoBox variant="tip" title="When to switch to @react-native-firebase">
          If you need push notifications (FCM), crashlytics, or native App Check attestation, you will
          need to switch to <code className="text-accent">@react-native-firebase</code> and build a custom dev client
          with <code className="text-accent">npx expo prebuild</code>. The API surface is nearly identical — most of
          your Firestore/Auth code will transfer over with minimal changes (just swap the import paths).
        </InfoBox>
      </section>

      {/* Installation & Setup */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">Installation & Setup</h2>
        <p className="text-text-muted leading-relaxed">
          The JS SDK is a single <code className="text-accent">firebase</code> npm package. No native linking, no config plugins,
          no <code className="text-accent">google-services.json</code> or <code className="text-accent">GoogleService-Info.plist</code> required.
        </p>

        {/* Step 1 */}
        <div className="rounded-2xl bg-card border border-border p-6 space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-orange/10 flex items-center justify-center text-orange font-mono font-bold text-sm">1</span>
            <h3 className="text-lg font-heading font-semibold text-text">Install the package</h3>
          </div>
          <CodeBlock
            code={`npx expo install firebase @react-native-async-storage/async-storage`}
            language="bash"
            title="Terminal"
          />
          <InfoBox variant="info">
            <code className="text-accent">npx expo install</code> ensures version compatibility with your Expo SDK.
            You only need the one <code className="text-accent">firebase</code> package — Auth, Firestore, Storage, etc. are
            all included as subpath imports. <code className="text-accent">AsyncStorage</code> is needed to persist the auth
            session across app restarts.
          </InfoBox>
        </div>

        {/* Step 2 */}
        <div className="rounded-2xl bg-card border border-border p-6 space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-orange/10 flex items-center justify-center text-orange font-mono font-bold text-sm">2</span>
            <h3 className="text-lg font-heading font-semibold text-text">Create a Firebase project</h3>
          </div>
          <p className="text-text-muted text-sm leading-relaxed">
            Go to the <strong className="text-text">Firebase Console</strong>, create a new project, then add a
            <strong className="text-text"> Web app</strong> (not iOS or Android — the JS SDK uses the web config).
            Copy the config object it gives you.
          </p>
          <InfoBox variant="warning" title="Web app, not mobile">
            Even though you are building a mobile app, the JS SDK uses the <strong>web platform config</strong>.
            Add a "Web" app in the Firebase Console to get your <code className="text-accent">apiKey</code>,
            <code className="text-accent"> authDomain</code>, etc.
          </InfoBox>
        </div>

        {/* Step 3 */}
        <div className="rounded-2xl bg-card border border-border p-6 space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-orange/10 flex items-center justify-center text-orange font-mono font-bold text-sm">3</span>
            <h3 className="text-lg font-heading font-semibold text-text">Initialize Firebase</h3>
          </div>
          <p className="text-text-muted text-sm leading-relaxed">
            Create a config file that initializes the Firebase app and exports the service instances
            you need. This file is the single source of truth — every other file imports from here.
          </p>
          <CodeBlock
            code={`// config/firebase.ts
import { initializeApp, getApps } from 'firebase/app';
// @ts-expect-error - getReactNativePersistence exists in the RN bundle but is missing from web types
import { initializeAuth, getAuth, getReactNativePersistence, Auth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'your-project.firebaseapp.com',
  projectId: 'your-project',
  storageBucket: 'your-project.firebasestorage.app',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID',
  databaseURL: 'https://your-project-default-rtdb.firebaseio.com',
};

// Initialize Firebase (guard against double-init in hot reload)
const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApps()[0];

// Auth with AsyncStorage persistence (keeps user logged in across app restarts)
// The try/catch guards against hot reload calling initializeAuth twice
let auth: Auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch {
  auth = getAuth(app);
}
export { auth };

// Firestore
export const db = getFirestore(app);

// Realtime Database
export const rtdb = getDatabase(app);

// Cloud Storage
export const storage = getStorage(app);

// Cloud Functions
export const functions = getFunctions(app);`}
            language="tsx"
            title="config/firebase.ts — the single source of truth"
          />
          <InfoBox variant="tip" title="Auth persistence matters">
            By default, the JS SDK does not persist auth state on React Native.
            Passing <code className="text-accent">getReactNativePersistence(AsyncStorage)</code> to
            <code className="text-accent"> initializeAuth</code> keeps the user logged in across app restarts — without this,
            they would have to sign in every time they close the app.
          </InfoBox>
          <p className="text-text-muted text-sm leading-relaxed">
            We already installed <code className="text-accent">@react-native-async-storage/async-storage</code> in Step 1.
            If you skipped it, run:
          </p>
          <CodeBlock
            code={`npx expo install @react-native-async-storage/async-storage`}
            language="bash"
            title="Terminal"
          />
        </div>

        {/* Step 4: Firebase CLI */}
        <div className="rounded-2xl bg-card border border-border p-6 space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-orange/10 flex items-center justify-center text-orange font-mono font-bold text-sm">4</span>
            <h3 className="text-lg font-heading font-semibold text-text">Install the Firebase CLI</h3>
          </div>
          <p className="text-text-muted text-sm leading-relaxed">
            The Firebase CLI is a command-line tool for managing your Firebase project. You need it to
            run emulators locally, deploy security rules, deploy Cloud Functions, and initialize your project
            config files.
          </p>
          <CodeBlock
            code={`# Install globally with npm
npm install -g firebase-tools

# Log in to your Firebase account
firebase login

# Initialize Firebase in your project (creates firebase.json, .firebaserc, etc.)
firebase init

# Verify it's working
firebase projects:list`}
            language="bash"
            title="Terminal — install and set up the Firebase CLI"
          />
          <InfoBox variant="info" title="What does firebase init do?">
            Running <code className="text-accent">firebase init</code> walks you through selecting which Firebase services
            to use (Firestore, Storage, Functions, Emulators, etc.) and creates config files like
            <code className="text-accent"> firebase.json</code>, <code className="text-accent">firestore.rules</code>,
            <code className="text-accent"> storage.rules</code>, and <code className="text-accent">.firebaserc</code> (which stores your project ID).
            These files live in your project root.
          </InfoBox>
          <InfoBox variant="tip" title="Alternative: use npx">
            If you prefer not to install globally, you can run any Firebase CLI command with
            <code className="text-accent"> npx firebase-tools</code> instead — e.g. <code className="text-accent">npx firebase-tools emulators:start</code>.
          </InfoBox>
        </div>

        {/* Step 5: Emulators */}
        <div className="rounded-2xl bg-card border border-border p-6 space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-orange/10 flex items-center justify-center text-orange font-mono font-bold text-sm">5</span>
            <h3 className="text-lg font-heading font-semibold text-text">Connect to emulators (optional)</h3>
          </div>
          <p className="text-text-muted text-sm leading-relaxed">
            During development, you can run Firebase emulators locally so you don't touch production data.
            First, set up and install the emulators, then start them and connect your app.
          </p>
          <CodeBlock
            code={`# Select which emulators to install (Auth, Firestore, Database, Storage, Functions)
firebase init emulators

# Start all emulators (downloads binaries on first run, then starts them)
firebase emulators:start`}
            language="bash"
            title="Terminal — set up and start emulators"
          />
          <InfoBox variant="info" title="Emulator UI">
            Once running, open <code className="text-accent">http://localhost:4000</code> in your browser to see the
            Emulator UI — a dashboard where you can browse Firestore data, manage Auth users, view Storage files,
            and inspect function logs. It is extremely useful for debugging.
          </InfoBox>
          <p className="text-text-muted text-sm leading-relaxed">
            Then add these lines to your config file so your app talks to the local emulators
            instead of production:
          </p>
          <CodeBlock
            code={`// config/firebase.ts (add at the bottom)
import { connectAuthEmulator } from 'firebase/auth';
import { connectFirestoreEmulator } from 'firebase/firestore';
import { connectDatabaseEmulator } from 'firebase/database';
import { connectStorageEmulator } from 'firebase/storage';
import { connectFunctionsEmulator } from 'firebase/functions';

if (__DEV__) {
  // Use 127.0.0.1 for simulators, or your Mac's LAN IP for physical devices
  const EMULATOR_HOST = '127.0.0.1';

  connectAuthEmulator(auth, \`http://\${EMULATOR_HOST}:9099\`, { disableWarnings: true });
  connectFirestoreEmulator(db, EMULATOR_HOST, 8080);
  connectDatabaseEmulator(rtdb, EMULATOR_HOST, 9000);
  connectStorageEmulator(storage, EMULATOR_HOST, 9199);
  connectFunctionsEmulator(functions, EMULATOR_HOST, 5001);
}`}
            language="tsx"
            title="Emulator connections — only active in dev mode"
          />
          <InfoBox variant="warning" title="Physical device?">
            If you are testing on a physical phone, replace <code className="text-accent">127.0.0.1</code> with
            your computer's LAN IP address (e.g. <code className="text-accent">192.168.1.100</code>).
            The phone and computer must be on the same Wi-Fi network.
          </InfoBox>
        </div>
      </section>

      {/* Authentication */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">Authentication</h2>
        <p className="text-text-muted leading-relaxed">
          Firebase Auth handles user registration, login, and session management.
          The JS SDK supports email/password, Google, Apple, phone, and anonymous sign-in.
          Here is a complete <code className="text-accent">AuthContext</code> that manages auth state for your whole app.
        </p>

        {/* Auth Context */}
        <CodeBlock
          code={`// contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInAnonymously,
  signOut as firebaseSignOut,
  User,
} from 'firebase/auth';
import { auth } from '@/config/firebase';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<User>;
  signUp: (email: string, password: string) => Promise<User>;
  sendPasswordReset: (email: string) => Promise<void>;
  resendVerification: () => Promise<void>;
  signInAsGuest: () => Promise<User>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // --- Auth methods ---
  const signIn = async (email: string, password: string): Promise<User> => {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return credential.user;
  };

  const signUp = async (email: string, password: string): Promise<User> => {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(credential.user);
    return credential.user;
  };

  const sendPasswordReset = async (email: string): Promise<void> => {
    await sendPasswordResetEmail(auth, email);
  };

  const resendVerification = async (): Promise<void> => {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
    }
  };

  const signInAsGuest = async (): Promise<User> => {
    const credential = await signInAnonymously(auth);
    return credential.user;
  };

  const signOut = async (): Promise<void> => {
    await firebaseSignOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        sendPasswordReset,
        resendVerification,
        signInAsGuest,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}`}
          language="tsx"
          title="contexts/AuthContext.tsx — complete auth context"
        />

        <InfoBox variant="info" title="What onAuthStateChanged does">
          This listener fires whenever the user's sign-in state changes — on login, logout, or when
          the app starts and restores a saved session. It is the foundation of auth state management.
          You set up the listener once and let Firebase handle the rest.
        </InfoBox>

        <p className="text-text-muted leading-relaxed">
          Wrap your app with the provider in your root layout:
        </p>

        <CodeBlock
          code={`// app/_layout.tsx
import { Stack } from 'expo-router';
import { AuthProvider } from '@/contexts/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack />
    </AuthProvider>
  );
}`}
          language="tsx"
          title="app/_layout.tsx — wrap with AuthProvider"
        />

        <p className="text-text-muted leading-relaxed">
          Then use the <code className="text-accent">useAuth</code> hook in any component:
        </p>

        <CodeBlock
          code={`// app/login.tsx
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, signInAsGuest } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signIn(email, password);
      router.replace('/');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      Alert.alert('Login Failed', message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => signInAsGuest()}>
        <Text style={styles.guestText}>Continue as Guest</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, gap: 12 },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 24 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 12, padding: 16, fontSize: 16 },
  button: { backgroundColor: '#f97316', borderRadius: 12, padding: 16, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  guestText: { textAlign: 'center', color: '#f97316', marginTop: 8 },
});`}
          language="tsx"
          title="app/login.tsx — a login screen using useAuth"
        />

        {/* Persisting Login State */}
        <h3 className="text-xl font-heading font-bold text-text pt-4">Persisting Login State</h3>
        <p className="text-text-muted leading-relaxed">
          Two pieces work together to keep users logged in across app restarts:
        </p>

        <div className="space-y-2 text-text-muted leading-relaxed">
          <p>
            <strong className="text-text">1. AsyncStorage persistence</strong> — In <code className="text-accent">config/firebase.ts</code>,
            passing <code className="text-accent">getReactNativePersistence(AsyncStorage)</code> to <code className="text-accent">initializeAuth</code> tells
            Firebase to save the auth token to the device's local storage. Without this, the token only lives in memory
            and is lost when the app closes.
          </p>
          <p>
            <strong className="text-text">2. onAuthStateChanged listener</strong> — In <code className="text-accent">AuthContext</code>,
            the <code className="text-accent">onAuthStateChanged</code> listener fires on app start. Firebase reads the saved token
            from AsyncStorage, validates it, and the listener receives the restored <code className="text-accent">User</code> object
            automatically — no manual token handling needed.
          </p>
        </div>

        <p className="text-text-muted leading-relaxed pt-2">
          Use the <code className="text-accent">loading</code> state from <code className="text-accent">useAuth</code> to
          show a splash screen while Firebase restores the session, then redirect based on whether a user was found:
        </p>

        <CodeBlock
          code={`// app/index.tsx
import { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';

export default function Index() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    // Once Firebase finishes restoring the session, redirect
    if (user) {
      router.replace('/home');
    } else {
      router.replace('/login');
    }
  }, [user, loading]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});`}
          language="tsx"
          title="app/index.tsx — redirect after session restore"
        />

        <InfoBox variant="tip" title="How the flow works">
          App opens → <code className="text-accent">loading</code> is <code className="text-accent">true</code> → spinner
          shows → Firebase reads the token from AsyncStorage → <code className="text-accent">onAuthStateChanged</code> fires
          with the restored user (or <code className="text-accent">null</code>) → <code className="text-accent">loading</code> becomes <code className="text-accent">false</code> →
          redirect to home or login. Returning users never see the login screen.
        </InfoBox>

      </section>

      {/* Firestore */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">Firestore — The Database</h2>
        <p className="text-text-muted leading-relaxed">
          Firestore is a NoSQL document database. Data lives in <strong className="text-text">documents</strong> (like JSON objects)
          organized into <strong className="text-text">collections</strong> (like folders). Instead of sprinkling
          Firestore calls across your screens, the cleanest pattern is to wrap every query in a
          <strong className="text-text"> custom React hook</strong>. Your screens just call the hook and
          get typed, real-time data — no listener management, no boilerplate.
        </p>
        <p className="text-text-muted leading-relaxed">
          We will build a tiny <strong className="text-text">Todo List app</strong> end to end to show
          the pattern in action.
        </p>

        {/* Data model */}
        <h3 className="text-xl font-heading font-bold text-text">The Todo Data Model</h3>
        <p className="text-text-muted leading-relaxed">
          Each user owns a <code className="text-accent">todos</code> subcollection keyed by their
          UID. A todo is a single document with three fields. We use Firestore's native
          <code className="text-accent"> Timestamp</code> type for <code className="text-accent">createdAt</code> so
          ordering and server-side rules work correctly.
        </p>
        <CodeBlock
          code={`// Firestore path: /todos/{uid}/{todoId}
import { Timestamp } from 'firebase/firestore';

export type Todo = {
  id: string;           // Firestore document ID
  text: string;         // What needs doing
  completed: boolean;   // Has the user finished it?
  createdAt: Timestamp; // Firestore Timestamp when the todo was added
};`}
          language="tsx"
          title="The Todo type (defined alongside the useTodos hook)"
        />

        {/* CRUD helpers */}
        <h3 className="text-xl font-heading font-bold text-text">Firestore Helper Functions</h3>
        <p className="text-text-muted leading-relaxed">
          Group every Firestore mutation into a single file so screens never import from
          <code className="text-accent"> firebase/firestore</code> directly. This keeps your data layer
          in one place and makes it trivial to swap to React Native Firebase later — you only edit
          this one file.
        </p>
        <CodeBlock
          code={`// services/todos.ts
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/config/firebase';

const todosRef = collection(db, 'todos');
const todoDoc = (todoId: string) => doc(db, 'todos', todoId);

// Create a new todo (Firestore generates the ID)
export async function addTodo(text: string) {
  await addDoc(todosRef, {
    text,
    completed: false,
    createdAt: serverTimestamp(), // resolves to a Timestamp on the server
  });
}

// Toggle completed state
export async function toggleTodo(todoId: string, completed: boolean) {
  await updateDoc(todoDoc(todoId), { completed });
}

// Edit the text of an existing todo
export async function updateTodoText(todoId: string, text: string) {
  await updateDoc(todoDoc(todoId), { text });
}

// Delete a todo
export async function deleteTodo(todoId: string) {
  await deleteDoc(todoDoc(todoId));
}`}
          language="tsx"
          title="services/todos.ts — every write lives here"
        />

        <InfoBox variant="tip" title="addDoc vs setDoc">
          <code className="text-accent">addDoc</code> generates a random document ID for you — perfect
          for todos and any list-style data. Use <code className="text-accent">setDoc</code> only when
          you need to control the ID (for example, when the document key <em>is</em> the user's UID).
        </InfoBox>

        {/* useTodos hook */}
        <h3 className="text-xl font-heading font-bold text-text">useTodos — A Real-Time Custom Hook</h3>
        <p className="text-text-muted leading-relaxed">
          This is the heart of the pattern. The hook subscribes to the user's
          <code className="text-accent"> todos</code> collection with
          <code className="text-accent"> onSnapshot</code>, keeps the list in
          <code className="text-accent"> useState</code>, and unsubscribes when the screen unmounts.
          Your component just calls <code className="text-accent">useTodos(userId)</code> and gets back
          a live array of todos that updates automatically when anything changes.
        </p>
        <CodeBlock
          code={`// hooks/useTodos.ts
import { db } from "@/config/firebase";
import { collection, onSnapshot, orderBy, query, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";

export type Todo = {
  id: string;         // Firestore document ID
  text: string;       // What needs doing
  completed: boolean; // Has the user finished it?
  createdAt: Timestamp;  // Date.now() when the todo was added
};

export function useTodos(uid: string | null) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!uid) {
      setTodos([]);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);

    const q = query(
      collection(db, 'todos'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list: Todo[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        text: doc.data().text as string,
        completed: doc.data().completed as boolean,
        createdAt: doc.data().createdAt as Timestamp,
      }));

      setTodos(list);
      setLoading(false);
      setError(null);
    }, (err) => {
      setError(err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [uid]);

  return { todos, loading, error };
}`}
          language="tsx"
          title="hooks/useTodos.ts — real-time todo list"
        />

        {/* useTodo hook */}
        <h3 className="text-xl font-heading font-bold text-text">useTodo — A Single Document Hook</h3>
        <p className="text-text-muted leading-relaxed">
          For an edit screen you usually only need one todo. Same pattern, but with
          <code className="text-accent"> doc()</code> instead of a query.
        </p>
        <CodeBlock
          code={`// hooks/useTodo.ts
import { db } from '@/config/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import type { Todo } from './useTodos';

export function useTodo(uid: string | null, todoId: string | null) {
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid || !todoId) {
      setTodo(null);
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      doc(db, 'todos', todoId),
      (snapshot) => {
        if (snapshot.exists()) {
          setTodo({ id: snapshot.id, ...snapshot.data() } as Todo);
        } else {
          setTodo(null);
        }
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [uid, todoId]);

  return { todo, loading };
}`}
          language="tsx"
          title="hooks/useTodo.ts — single document listener"
        />

        {/* Filtered query */}
        <h3 className="text-xl font-heading font-bold text-text">Filtered Queries — useFilteredTodos</h3>
        <p className="text-text-muted leading-relaxed">
          Want to show only the unfinished todos? Add a <code className="text-accent">where()</code> clause
          and expose a filter argument. The hook re-subscribes whenever the filter changes thanks to the
          <code className="text-accent"> useEffect</code> dependency array.
        </p>
        <CodeBlock
          code={`// hooks/useFilteredTodos.ts
import { db } from '@/config/firebase';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import type { Todo } from './useTodos';

type Filter = 'all' | 'active' | 'completed';

export function useFilteredTodos(uid: string | null, filter: Filter) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) {
      setTodos([]);
      setLoading(false);
      return;
    }

    const base = collection(db, 'todos');

    // Build a different query depending on the filter
    const q =
      filter === 'all'
        ? query(base, orderBy('createdAt', 'desc'))
        : query(
            base,
            where('completed', '==', filter === 'completed'),
            orderBy('createdAt', 'desc'),
          );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTodos(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Todo[],
      );
      setLoading(false);
    });

    return () => unsubscribe();
    // Re-subscribe whenever the filter changes
  }, [uid, filter]);

  return { todos, loading };
}`}
          language="tsx"
          title="hooks/useFilteredTodos.ts — filter with where()"
        />

        <InfoBox variant="warning" title="Composite indexes">
          The first time you run a query that combines <code className="text-accent">where()</code> and
          <code className="text-accent"> orderBy()</code> on different fields, Firestore will throw an
          error with a direct link to create the required composite index. Click it, wait a minute,
          and your query will work.
        </InfoBox>

        {/* Using in a screen */}
        <h3 className="text-xl font-heading font-bold text-text">Using the Hook in a Screen</h3>
        <p className="text-text-muted leading-relaxed">
          Once the hooks exist, your screen has zero Firestore code. Just call the hook, render the
          data, and call the helpers from <code className="text-accent">services/todos.ts</code> to
          mutate.
        </p>
        <CodeBlock
          code={`// app/(tabs)/todos.tsx
import { useState } from 'react';
import { View, Text, TextInput, FlatList, Pressable } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { useTodos } from '@/hooks/useTodos';
import { addTodo, toggleTodo, deleteTodo } from '@/services/todos';

export default function TodosScreen() {
  const { user } = useAuth();
  const { todos, loading } = useTodos(user?.uid ?? null);
  const [text, setText] = useState('');

  if (loading) return <Text>Loading…</Text>;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="What needs doing?"
        onSubmitEditing={async () => {
          if (!user || !text.trim()) return;
          await addTodo(text.trim());
          setText('');
        }}
      />

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', padding: 12 }}>
            <Pressable
              onPress={() => toggleTodo(item.id, !item.completed)}
              style={{ flex: 1 }}
            >
              <Text
                style={{
                  textDecorationLine: item.completed ? 'line-through' : 'none',
                }}
              >
                {item.text}
              </Text>
            </Pressable>
            <Pressable onPress={() => deleteTodo(item.id)}>
              <Text>Delete</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}`}
          language="tsx"
          title="app/(tabs)/todos.tsx — the screen has zero firebase imports"
        />

        <InfoBox variant="tip" title="The custom hook pattern">
          Every Firestore query in your app should live inside a hook in
          <code className="text-accent"> hooks/</code>, and every write should live inside a function
          in <code className="text-accent"> services/</code>. Screens never import from
          <code className="text-accent"> firebase/firestore</code> directly. This makes listeners
          impossible to leak, queries trivially testable, and a future migration to React Native
          Firebase a one-file change.
        </InfoBox>

        {/* Security rules for todos */}
        <h3 className="text-xl font-heading font-bold text-text">Security Rules — The Server-Side Layer</h3>
        <p className="text-text-muted leading-relaxed">
          Your custom hooks live on the client, so anyone with the app can technically run any
          Firestore query they want. The <strong className="text-text">only</strong> thing that keeps
          one user from reading another user's todos is your <code className="text-accent">firestore.rules</code>
          file. Rules run server-side and cannot be bypassed by decompiling the app.
        </p>
        <p className="text-text-muted leading-relaxed">
          For our todo app the rule is simple: a user can only read and write documents under their
          own <code className="text-accent">/todos/&#123;uid&#125;</code> path, and every todo must have
          the three required fields with the correct types.
        </p>
        <CodeBlock
          code={`// firestore.rules
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    // Helper: is the request signed in as this uid?
    function isOwner(uid) {
      return request.auth != null && request.auth.uid == uid;
    }

    // Helper: validate the shape of an incoming todo document
    function isValidTodo(data) {
      return data.keys().hasAll(['text', 'completed', 'createdAt'])
          && data.text is string
          && data.text.size() > 0
          && data.text.size() <= 500
          && data.completed is bool
          && data.createdAt is timestamp;
    }

    // /todos/{uid}/{todoId}
    match /todos/{uid}/{todoId} {

      // Read: only the owner can list or get their todos
      allow read: if isOwner(uid);

      // Create: owner only, and the new doc must be a valid todo
      allow create: if isOwner(uid)
                    && isValidTodo(request.resource.data);

      // Update: owner only, must remain a valid todo,
      // and createdAt must not change
      allow update: if isOwner(uid)
                    && isValidTodo(request.resource.data)
                    && request.resource.data.createdAt == resource.data.createdAt;

      // Delete: owner only
      allow delete: if isOwner(uid);
    }

    // Default deny: anything not matched above is forbidden
    match /{document=**} {
      allow read, write: if false;
    }
  }
}`}
          language="javascript"
          title="firestore.rules — lock down the todos collection"
        />

        <InfoBox variant="warning" title="Default deny is mandatory">
          Always end your rules file with a <code className="text-accent">match /&#123;document=**&#125;</code> block
          that denies everything. Without it, any path you forgot to write a rule for is wide open
          if you ever switched away from a deny-by-default starter template.
        </InfoBox>

        <p className="text-text-muted leading-relaxed">
          Deploy the rules with the Firebase CLI. They go live in seconds and apply globally —
          you do <em>not</em> need to ship a new app build.
        </p>
        <CodeBlock
          code={`# One-time: tell the CLI which rules file to use (already set if you ran firebase init)
# firebase.json → "firestore": { "rules": "firestore.rules" }

# Deploy only the Firestore rules (fast, no functions or hosting)
firebase deploy --only firestore:rules

# Test the rules locally against the emulator before deploying
firebase emulators:start --only firestore`}
          language="bash"
          title="Deploy and test your rules"
        />

        <InfoBox variant="tip" title="Test rules in the emulator first">
          The Firestore emulator runs your <code className="text-accent">firestore.rules</code> file
          locally, so you can verify a denied write actually fails before pushing to production. The
          emulator also gives you a UI at <code className="text-accent">localhost:4000</code> to inspect
          documents and watch every read/write request in real time.
        </InfoBox>
      </section>

      {/* Realtime Database */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">Realtime Database — The Other Database</h2>
        <p className="text-text-muted leading-relaxed">
          Firebase has <em>two</em> databases: Firestore (document-based) and the
          <strong className="text-text"> Realtime Database</strong> (the older, JSON-tree-based one).
          RTDB shines when you need very low latency on simple key-value data — chat messages,
          presence indicators, typing status. The API is different but the
          <strong className="text-text"> custom hook pattern is identical</strong>: wrap every read in a hook,
          wrap every write in a service file, and let your screens stay clean.
        </p>
        <p className="text-text-muted leading-relaxed">
          Let's rebuild the same Todo List app on top of RTDB so you can compare the two side by side.
        </p>

        {/* Data model */}
        <h3 className="text-xl font-heading font-bold text-text">The Todo Tree</h3>
        <p className="text-text-muted leading-relaxed">
          RTDB stores everything as one big JSON tree. The same logical structure as the Firestore
          example, just expressed as nested keys:
        </p>
        <CodeBlock
          code={`// Realtime Database tree
{
  "users": {
    "abc123": {
      "todos": {
        "-NfXyZ...": {           // push() generates this key
          "text": "Buy milk",
          "completed": false,
          "createdAt": 1712534400000
        },
        "-NfXyZ...": { ... }
      }
    }
  }
}`}
          language="json"
          title="RTDB layout for the todo app"
        />

        {/* Helper functions */}
        <h3 className="text-xl font-heading font-bold text-text">RTDB Helper Functions</h3>
        <p className="text-text-muted leading-relaxed">
          Same idea as <code className="text-accent">services/todos.ts</code>: every write lives in
          one file, screens never import from <code className="text-accent">firebase/database</code> directly.
        </p>
        <CodeBlock
          code={`// services/todosRtdb.ts
import { ref, push, set, update, remove } from 'firebase/database';
import { rtdb } from '@/config/firebase';

const todosRef = (userId: string) => ref(rtdb, \`users/\${userId}/todos\`);
const todoRef = (userId: string, todoId: string) =>
  ref(rtdb, \`users/\${userId}/todos/\${todoId}\`);

// Create a new todo (push() generates a unique chronological key)
export async function addTodo(userId: string, text: string) {
  const newRef = push(todosRef(userId));
  await set(newRef, {
    text,
    completed: false,
    createdAt: Date.now(),
  });
}

// Toggle completed state
export async function toggleTodo(
  userId: string,
  todoId: string,
  completed: boolean,
) {
  await update(todoRef(userId, todoId), { completed });
}

// Edit the text of an existing todo
export async function updateTodoText(
  userId: string,
  todoId: string,
  text: string,
) {
  await update(todoRef(userId, todoId), { text });
}

// Delete a todo
export async function deleteTodo(userId: string, todoId: string) {
  await remove(todoRef(userId, todoId));
}`}
          language="tsx"
          title="services/todosRtdb.ts — every write lives here"
        />

        <InfoBox variant="tip" title="push() vs set()">
          <code className="text-accent">push()</code> generates a unique, chronologically-ordered key
          (perfect for lists). <code className="text-accent">set()</code> writes to a known path.
          <code className="text-accent"> update()</code> only touches the fields you pass — the rest of
          the node is untouched.
        </InfoBox>

        {/* useTodos hook */}
        <h3 className="text-xl font-heading font-bold text-text">useTodos — RTDB Custom Hook</h3>
        <p className="text-text-muted leading-relaxed">
          The pattern is the same as Firestore: subscribe inside <code className="text-accent">useEffect</code>,
          return the unsubscribe in cleanup. The differences are
          <code className="text-accent"> onValue</code> instead of <code className="text-accent">onSnapshot</code>,
          and you get a JSON object that needs to be turned into an array.
        </p>
        <CodeBlock
          code={`// hooks/useTodosRtdb.ts
import { useEffect, useState } from 'react';
import { ref, query, orderByChild, onValue } from 'firebase/database';
import { rtdb } from '@/config/firebase';
import type { Todo } from '@/types/todo';

export function useTodos(userId: string | null) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) {
      setTodos([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    // Order by createdAt on the server (requires .indexOn in rules)
    const todosQuery = query(
      ref(rtdb, \`users/\${userId}/todos\`),
      orderByChild('createdAt'),
    );

    // onValue returns an unsubscribe function
    const unsubscribe = onValue(
      todosQuery,
      (snapshot) => {
        const raw = snapshot.val() as Record<string, Omit<Todo, 'id'>> | null;
        if (!raw) {
          setTodos([]);
          setLoading(false);
          return;
        }

        // RTDB returns an object — convert it to a sorted array (newest first)
        const list: Todo[] = Object.entries(raw)
          .map(([id, data]) => ({ id, ...data }))
          .sort((a, b) => b.createdAt - a.createdAt);

        setTodos(list);
        setLoading(false);
      },
      (err) => {
        console.error('useTodos (RTDB) error:', err);
        setError(err);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [userId]);

  return { todos, loading, error };
}`}
          language="tsx"
          title="hooks/useTodosRtdb.ts — real-time todo list"
        />

        {/* useTodo hook */}
        <h3 className="text-xl font-heading font-bold text-text">useTodo — Single Node Hook</h3>
        <CodeBlock
          code={`// hooks/useTodoRtdb.ts
import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { rtdb } from '@/config/firebase';
import type { Todo } from '@/types/todo';

export function useTodo(userId: string | null, todoId: string | null) {
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId || !todoId) {
      setTodo(null);
      setLoading(false);
      return;
    }

    const unsubscribe = onValue(
      ref(rtdb, \`users/\${userId}/todos/\${todoId}\`),
      (snapshot) => {
        if (snapshot.exists()) {
          setTodo({ id: todoId, ...snapshot.val() } as Todo);
        } else {
          setTodo(null);
        }
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [userId, todoId]);

  return { todo, loading };
}`}
          language="tsx"
          title="hooks/useTodoRtdb.ts — single node listener"
        />

        {/* Filtered query */}
        <h3 className="text-xl font-heading font-bold text-text">Filtered Queries — useFilteredTodos</h3>
        <p className="text-text-muted leading-relaxed">
          RTDB only lets you order by <em>one</em> field at a time and combine it with
          <code className="text-accent"> equalTo</code>, <code className="text-accent">startAt</code>,
          or <code className="text-accent">endAt</code>. For our active/completed filter that's plenty.
        </p>
        <CodeBlock
          code={`// hooks/useFilteredTodosRtdb.ts
import { useEffect, useState } from 'react';
import {
  ref,
  query,
  orderByChild,
  equalTo,
  onValue,
} from 'firebase/database';
import { rtdb } from '@/config/firebase';
import type { Todo } from '@/types/todo';

type Filter = 'all' | 'active' | 'completed';

export function useFilteredTodos(userId: string | null, filter: Filter) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setTodos([]);
      setLoading(false);
      return;
    }

    const base = ref(rtdb, \`users/\${userId}/todos\`);

    // RTDB only allows orderBy on a single field at a time
    const q =
      filter === 'all'
        ? query(base, orderByChild('createdAt'))
        : query(
            base,
            orderByChild('completed'),
            equalTo(filter === 'completed'),
          );

    const unsubscribe = onValue(q, (snapshot) => {
      const raw = snapshot.val() as Record<string, Omit<Todo, 'id'>> | null;
      const list: Todo[] = raw
        ? Object.entries(raw)
            .map(([id, data]) => ({ id, ...data }))
            .sort((a, b) => b.createdAt - a.createdAt)
        : [];
      setTodos(list);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId, filter]);

  return { todos, loading };
}`}
          language="tsx"
          title="hooks/useFilteredTodosRtdb.ts — filter with orderByChild + equalTo"
        />

        <InfoBox variant="warning" title="RTDB indexes are explicit">
          Unlike Firestore, RTDB will <em>silently</em> read every child if you query an unindexed
          field — fine in development, slow and expensive in production. Always declare
          <code className="text-accent"> .indexOn</code> for any field you sort or filter by in your
          rules file (see below).
        </InfoBox>

        {/* Security rules */}
        <h3 className="text-xl font-heading font-bold text-text">Security Rules — The Server-Side Layer</h3>
        <p className="text-text-muted leading-relaxed">
          RTDB rules live in <code className="text-accent">database.rules.json</code> and are JSON,
          not the <code className="text-accent">cloud.firestore</code> DSL. Rules cascade: a
          <code className="text-accent"> .read</code> or <code className="text-accent">.write</code> at a
          parent path grants access to <em>everything</em> beneath it, so write your rules as deep
          as the data lives.
        </p>
        <CodeBlock
          code={`{
  "rules": {
    "users": {
      "$userId": {
        "todos": {
          // Only the owner can read or write their todo list
          ".read": "auth != null && auth.uid == $userId",
          ".write": "auth != null && auth.uid == $userId",

          // Index the fields we sort or filter by
          ".indexOn": ["createdAt", "completed"],

          "$todoId": {
            // Every todo must have these three fields
            ".validate": "newData.hasChildren(['text', 'completed', 'createdAt'])",

            "text": {
              ".validate": "newData.isString() && newData.val().length > 0 && newData.val().length <= 500"
            },
            "completed": {
              ".validate": "newData.isBoolean()"
            },
            "createdAt": {
              // Number, and never editable after creation
              ".validate": "newData.isNumber() && (!data.exists() || newData.val() == data.val())"
            },

            // Reject any extra fields
            "$other": {
              ".validate": false
            }
          }
        }
      }
    }
  }
}`}
          language="json"
          title="database.rules.json — lock down the todos tree"
        />

        <InfoBox variant="warning" title="Rules cascade — read them once, top to bottom">
          If you put <code className="text-accent">".read": "true"</code> at the top of the tree, every
          path beneath it is public, even ones with stricter rules. There is no way to "revoke" a
          parent's grant from a child. Always start from a deny-by-default base.
        </InfoBox>

        <p className="text-text-muted leading-relaxed">
          Deploy with the Firebase CLI. RTDB rules are in their own file, so deploy them on their
          own target:
        </p>
        <CodeBlock
          code={`# firebase.json points at the rules file:
# "database": { "rules": "database.rules.json" }

# Deploy only the RTDB rules
firebase deploy --only database

# Run the RTDB emulator locally to test rules and queries
firebase emulators:start --only database`}
          language="bash"
          title="Deploy and test RTDB rules"
        />

        <InfoBox variant="info" title="Firestore vs Realtime Database">
          Use <strong>Firestore</strong> for structured data with complex queries, multiple where
          clauses, and large per-document payloads. Use <strong>Realtime Database</strong> for
          high-frequency, simple data: chat messages, presence indicators, typing status, live
          cursors. Many apps use both — they serve different purposes. The custom hook pattern is
          the same either way, so you can swap one for the other without touching your screens.
        </InfoBox>
      </section>

      {/* Cloud Storage */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">Cloud Storage — File Uploads</h2>
        <p className="text-text-muted leading-relaxed">
          Firebase Storage lets you upload and download files (images, videos, documents).
          With the JS SDK, you upload <strong className="text-text">blobs</strong> instead of file paths — this means
          you need to convert the image URI to a blob first.
        </p>

        <CodeBlock
          code={`// utils/uploadImage.ts
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/config/firebase';

/**
 * Upload an image from a local URI to Firebase Storage.
 * Returns the public download URL.
 */
export async function uploadImage(
  uri: string,
  path: string, // e.g. 'images/user123/photo.jpg'
): Promise<string> {
  // Convert the local file URI to a blob
  const response = await fetch(uri);
  const blob = await response.blob();

  // Upload the blob to Storage
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, blob);

  // Get the public download URL
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
}

// --- Usage example ---
// After picking an image with expo-image-picker:
import * as ImagePicker from 'expo-image-picker';

const pickAndUpload = async (userId: string) => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    quality: 0.8,
  });

  if (result.canceled) return null;

  const uri = result.assets[0].uri;
  const fileName = uri.split('/').pop() || 'photo.jpg';
  const downloadURL = await uploadImage(uri, \`images/\${userId}/\${fileName}\`);

  return downloadURL;
};`}
          language="tsx"
          title="utils/uploadImage.ts — upload images from device"
        />

        <InfoBox variant="warning" title="Blob conversion is key">
          The JS SDK cannot use <code className="text-accent">putFile()</code> like the native library.
          You must convert the local URI to a blob with <code className="text-accent">fetch(uri).then(r =&gt; r.blob())</code> first.
          This works fine for images — for very large files, consider using the native library instead.
        </InfoBox>

        <CodeBlock
          code={`// Upload a profile picture with a size limit
export async function uploadProfilePicture(
  uri: string,
  userId: string,
): Promise<string> {
  const response = await fetch(uri);
  const blob = await response.blob();

  // Enforce 5MB limit
  if (blob.size > 5 * 1024 * 1024) {
    throw new Error('Profile picture must be under 5MB');
  }

  const storageRef = ref(storage, \`profile/\${userId}/avatar.jpg\`);
  await uploadBytes(storageRef, blob);
  return getDownloadURL(storageRef);
}`}
          language="tsx"
          title="Profile picture upload with size validation"
        />
      </section>

      {/* Cloud Functions */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">Cloud Functions — Server-Side Logic</h2>
        <p className="text-text-muted leading-relaxed">
          Cloud Functions let you run backend code without managing a server. You call them from your
          app using <code className="text-accent">httpsCallable</code>. The function runs on Google's servers, has access
          to the Admin SDK, and can perform privileged operations (like looking up other users).
        </p>

        <CodeBlock
          code={`// utils/cloudFunctions.ts
import { httpsCallable } from 'firebase/functions';
import { functions } from '@/config/firebase';

// --- Type your function inputs and outputs ---

type PublicProfile = {
  uid: string;
  username: string;
  photoURL: string | null;
};

// Each callable wraps httpsCallable with types
export const claimUsername = async (username: string) => {
  const fn = httpsCallable<{ username: string }, { output: { username: string } }>(
    functions,
    'claimUsername',
  );
  const result = await fn({ username });
  return result.data.output;
};

export const findUserByUsername = async (username: string) => {
  const fn = httpsCallable<{ username: string }, { output: PublicProfile | null }>(
    functions,
    'findUserByUsername',
  );
  const result = await fn({ username });
  return result.data.output;
};

export const sendFriendRequest = async (toUsername: string) => {
  const fn = httpsCallable<{ toUsername: string }, { output: { success: boolean } }>(
    functions,
    'sendFriendRequest',
  );
  const result = await fn({ toUsername });
  return result.data.output;
};

export const respondToFriendRequest = async (requestId: string, accept: boolean) => {
  const fn = httpsCallable<
    { requestId: string; accept: boolean },
    { output: { success: boolean } }
  >(functions, 'respondToFriendRequest');
  const result = await fn({ requestId, accept });
  return result.data.output;
};`}
          language="tsx"
          title="utils/cloudFunctions.ts — typed callable wrappers"
        />

        <InfoBox variant="tip" title="Type your callables">
          <code className="text-accent">httpsCallable</code> accepts two type parameters:
          <code className="text-accent"> httpsCallable&lt;RequestData, ResponseData&gt;</code>.
          This gives you full TypeScript safety on both the request payload and the response.
        </InfoBox>

        <CodeBlock
          code={`// Using cloud functions in a component
import { claimUsername, sendFriendRequest } from '@/utils/cloudFunctions';

const handleClaimUsername = async () => {
  try {
    const result = await claimUsername('darren123');
    console.log('Claimed:', result.username);
  } catch (error) {
    // Cloud Function errors have a 'code' and 'message'
    const firebaseError = error as { code?: string; message?: string };
    if (firebaseError.code === 'functions/already-exists') {
      Alert.alert('Username taken', 'Please try another username.');
    } else {
      Alert.alert('Error', firebaseError.message ?? 'Unknown error');
    }
  }
};`}
          language="tsx"
          title="Calling cloud functions from a component"
        />
      </section>

      {/* Project Structure */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">Recommended Project Structure</h2>
        <CodeBlock
          code={`my-expo-app/
├── app/
│   ├── _layout.tsx             # AuthProvider wraps the app here
│   ├── login.tsx               # Login screen
│   ├── signup.tsx              # Signup screen
│   ├── (tabs)/
│   │   ├── index.tsx           # Home tab
│   │   ├── profile.tsx         # Profile tab
│   │   └── chat.tsx            # Chat tab
│   └── record/[id].tsx         # Dynamic route for a record
│
├── config/
│   └── firebase.ts             # Firebase init + emulator config
│
├── contexts/
│   └── AuthContext.tsx          # Auth state + methods
│
├── hooks/
│   ├── useUser.ts              # Real-time user profile (Firestore)
│   ├── useFriends.ts           # Real-time friends list (Firestore)
│   ├── useUserDietRecords.ts   # Paginated records (Firestore)
│   └── useChat.ts              # Chat messages (Realtime Database)
│
├── utils/
│   ├── uploadImage.ts          # Storage upload helpers
│   └── cloudFunctions.ts       # Typed callable wrappers
│
└── package.json`}
          language="bash"
          title="Recommended folder structure"
        />

        <InfoBox variant="tip" title="Separation of concerns">
          Keep Firebase logic out of your components. The <code className="text-accent">config/</code> file initializes
          Firebase, <code className="text-accent">hooks/</code> handle real-time subscriptions,
          <code className="text-accent"> utils/</code> wrap one-off operations, and <code className="text-accent">contexts/</code> manage
          global state. Components just consume these — they never import from <code className="text-accent">firebase/*</code> directly.
        </InfoBox>
      </section>

      {/* Security Rules */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">Security Rules</h2>
        <p className="text-text-muted leading-relaxed">
          Firebase security rules control who can read and write your data. They run server-side,
          so even if someone decompiles your app, they cannot bypass the rules.
          <strong className="text-text"> Never</strong> leave your database in test mode in production.
        </p>

        <CodeBlock
          code={`// firestore.rules
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    // Users: only the owner can read/write their own document
    match /users/{userId} {
      allow read, write: if request.auth != null
                         && request.auth.uid == userId;

      // Friends subcollection: only the owner can read
      match /friends/{friendId} {
        allow read: if request.auth != null
                    && request.auth.uid == userId;
      }
    }

    // Friend requests: readable by sender or recipient
    match /friendRequests/{requestId} {
      allow read: if request.auth != null
                  && (resource.data.from == request.auth.uid
                      || resource.data.to == request.auth.uid);
    }

    // Usernames: public read (for availability checks)
    match /usernames/{username} {
      allow read: if true;
    }

    // Uploads: only the owner can read/write
    match /uploads/{collection}/{userId}/{recordId} {
      allow read, write: if request.auth != null
                         && request.auth.uid == userId;
    }

    // Default: deny everything else
    match /{document=**} {
      allow read, write: if false;
    }
  }
}`}
          language="javascript"
          title="firestore.rules — lock down your data"
        />

        <CodeBlock
          code={`// storage.rules
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {

    // Profile pictures: owner only, max 5MB, images only
    match /profile/{userId}/{fileName} {
      allow read: if request.auth != null
                  && request.auth.uid == userId;
      allow write: if request.auth != null
                   && request.auth.uid == userId
                   && request.resource.size < 5 * 1024 * 1024
                   && request.resource.contentType.matches('image/.*');
    }

    // Food images: owner only, max 10MB
    match /images/{userId}/{fileName} {
      allow read: if request.auth != null
                  && request.auth.uid == userId;
      allow write: if request.auth != null
                   && request.auth.uid == userId
                   && request.resource.size < 10 * 1024 * 1024
                   && request.resource.contentType.matches('image/.*');
    }
  }
}`}
          language="javascript"
          title="storage.rules — restrict file uploads"
        />

        <InfoBox variant="warning" title="Deploy your rules">
          Rules are deployed with <code className="text-accent">firebase deploy --only firestore:rules,storage</code>.
          Always test them locally with the emulator first.
        </InfoBox>
      </section>

      {/* Common Patterns */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">Common Patterns</h2>

        {/* Pattern 1: Protected routes */}
        <div className="rounded-2xl bg-card border border-border p-6 space-y-3">
          <h3 className="text-lg font-heading font-semibold text-text">Protected Routes</h3>
          <p className="text-text-muted text-sm leading-relaxed">
            Redirect unauthenticated users to the login screen using the auth context:
          </p>
          <CodeBlock
            code={`// app/(tabs)/_layout.tsx
import { Redirect } from 'expo-router';
import { Tabs } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { ActivityIndicator, View } from 'react-native';

export default function TabsLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Not logged in? Send to login screen
  if (!user) {
    return <Redirect href="/login" />;
  }

  return <Tabs />;
}`}
            language="tsx"
            title="Protected tab layout"
          />
        </div>

        {/* Pattern 2: Optimistic updates */}
        <div className="rounded-2xl bg-card border border-border p-6 space-y-3">
          <h3 className="text-lg font-heading font-semibold text-text">Optimistic Updates</h3>
          <p className="text-text-muted text-sm leading-relaxed">
            Update the local state immediately, then sync to Firestore in the background.
            This makes the UI feel instant.
          </p>
          <CodeBlock
            code={`const updateUsername = async (newUsername: string) => {
  // 1. Update local state immediately (optimistic)
  setUser((prev) => prev ? { ...prev, username: newUsername } : prev);

  // 2. Sync to Firestore in the background
  try {
    await setDoc(
      doc(db, 'users', userId),
      { username: newUsername },
      { merge: true },
    );
  } catch (error) {
    // 3. Revert on failure
    console.error('Failed to update username:', error);
    setUser((prev) => prev ? { ...prev, username: oldUsername } : prev);
  }
};`}
            language="tsx"
            title="Optimistic update pattern"
          />
        </div>

        {/* Pattern 3: Cleanup on logout */}
        <div className="rounded-2xl bg-card border border-border p-6 space-y-3">
          <h3 className="text-lg font-heading font-semibold text-text">Cleanup on Logout</h3>
          <p className="text-text-muted text-sm leading-relaxed">
            When the user logs out, all your hooks that depend on <code className="text-accent">userId</code> should
            clean up their listeners and reset state. The <code className="text-accent">if (!userId)</code> guard at the
            top of each hook handles this automatically.
          </p>
          <CodeBlock
            code={`// This pattern handles login, logout, and user switching:
useEffect(() => {
  if (!userId) {
    setData(null);   // Clear stale data
    setLoading(false);
    return;           // No listener attached = no cleanup needed
  }

  setLoading(true);
  const unsubscribe = onSnapshot(/*...*/);
  return () => unsubscribe();
}, [userId]);`}
            language="tsx"
            title="The userId guard pattern"
          />
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-6 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">Knowledge Check</h2>

        <Quiz
          question="Why do you need to pass getReactNativePersistence(AsyncStorage) when initializing Auth?"
          options={[
            { text: 'It makes authentication faster' },
            { text: 'It stores the user session so they stay logged in across app restarts', correct: true },
            { text: 'It is required for Google Sign-In to work' },
            { text: 'It enables offline mode for Firestore' },
          ]}
          explanation="Without persistence, the JS SDK does not save the auth session on React Native. The user would have to log in every time they open the app. AsyncStorage keeps the session token between app launches."
        />

        <Quiz
          question="When uploading an image with the Firebase JS SDK, what must you do before calling uploadBytes?"
          options={[
            { text: 'Compress the image to under 1MB' },
            { text: 'Convert the local file URI to a Blob', correct: true },
            { text: 'Base64-encode the image' },
            { text: 'Save the image to the app\'s cache directory first' },
          ]}
          explanation="The JS SDK's uploadBytes expects a Blob or ArrayBuffer, not a file path. Use fetch(uri).then(r => r.blob()) to convert the local URI from the image picker into a blob."
        />

        <Quiz
          question="What is the correct cleanup pattern for a Firestore onSnapshot listener in a React hook?"
          options={[
            { text: 'Call onSnapshot.cancel() in a cleanup function' },
            { text: 'Set the listener variable to null' },
            { text: 'Return the unsubscribe function from the useEffect cleanup', correct: true },
            { text: 'Call db.terminate() when the component unmounts' },
          ]}
          explanation="onSnapshot returns an unsubscribe function. Return it from the useEffect cleanup (return () => unsubscribe()) so React automatically detaches the listener when the component unmounts or dependencies change."
        />
      </section>

      {/* Tips */}
      <section className="space-y-4">
        <h2 className="text-2xl font-heading font-bold text-text">Tips and Best Practices</h2>

        <InfoBox variant="tip" title="Keep your Firebase config safe">
          The Firebase config (apiKey, etc.) is safe to include in client code — it is not a secret.
          Firebase security comes from <strong>security rules</strong>, not from hiding the config.
          However, you should still use environment variables in production to keep things organized.
        </InfoBox>

        <InfoBox variant="tip" title="Use the emulator suite for development">
          The Firebase Emulator Suite lets you run Auth, Firestore, RTDB, Storage, and Functions locally.
          You can test security rules, seed data, and develop offline — all without touching your production database.
          Run <code className="text-accent">firebase emulators:start</code> to get started.
        </InfoBox>

        <InfoBox variant="warning" title="Don't forget to index compound queries">
          If you use <code className="text-accent">where()</code> combined with <code className="text-accent">orderBy()</code> on different
          fields, Firestore requires a <strong>composite index</strong>. The error message will include a direct link
          to create the index in the Firebase Console — just click it.
        </InfoBox>

        <InfoBox variant="warning" title="Avoid reading entire collections">
          Firestore charges per document read. Always use <code className="text-accent">limit()</code> and
          <code className="text-accent">where()</code> to scope your queries.
          A listener on an unfiltered collection with 10,000 documents means 10,000 reads every time
          anything in that collection changes.
        </InfoBox>

        <InfoBox variant="info" title="Migration path to @react-native-firebase">
          If you outgrow the JS SDK, switching to <code className="text-accent">@react-native-firebase</code> is straightforward.
          The Firestore, Auth, and Functions APIs are nearly identical — you mainly change the import paths:
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><code className="text-accent">firebase/firestore</code> → <code className="text-accent">@react-native-firebase/firestore</code></li>
            <li><code className="text-accent">firebase/auth</code> → <code className="text-accent">@react-native-firebase/auth</code></li>
            <li><code className="text-accent">firebase/functions</code> → <code className="text-accent">@react-native-firebase/functions</code></li>
          </ul>
          The function signatures (<code className="text-accent">doc()</code>, <code className="text-accent">onSnapshot()</code>,
          <code className="text-accent">httpsCallable()</code>, etc.) stay the same.
        </InfoBox>

        <InfoBox variant="fun" title="Firebase started as a chat service">
          Firebase was originally called "Envolve" — a real-time chat API. The founders noticed developers
          were using the real-time sync for things other than chat (game state, collaboration), so they
          pivoted to a general-purpose backend platform. Google acquired Firebase in 2014, and it has grown
          into one of the most popular BaaS platforms with over 3 million active apps.
        </InfoBox>
      </section>
    </PageShell>
  )
}
