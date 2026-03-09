import { PageShell } from '../../components/PageShell'
import { HooksSidebar } from '../../components/HooksSidebar'
import { CodeBlock } from '../../components/CodeBlock'
import { InfoBox } from '../../components/InfoBox'

export function UseLocalSearchParamsPage() {
  return (
    <PageShell
      title="useLocalSearchParams"
      subtitle="Read URL parameters from the current route — like URLSearchParams on the web, but designed for mobile navigation."
      gradient="from-accent to-purple"
      badge="EXPO ROUTER"
      breadcrumbs={[{ label: 'Hooks' }, { label: 'useLocalSearchParams' }]}
      sidebar={<HooksSidebar />}
    >
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-text mb-4">What are Search Params?</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            On the web, URLs can carry data. For example, <code className="text-accent">example.com/product?id=42</code> has
            a search parameter called <code className="text-accent">id</code> with a value of <code className="text-accent">42</code>.
            You can read it in JavaScript with <code className="text-accent">new URLSearchParams(window.location.search).get('id')</code>.
          </p>
          <p className="text-text-muted leading-relaxed mb-4">
            In Expo Router, <code className="text-accent">useLocalSearchParams</code> does the same thing. It reads the
            parameters from the current route's URL so your screen knows what data to display. The word "local" means
            it only re-renders (updates) the current screen when its own params change — not when params change on
            other screens.
          </p>
          <p className="text-text-muted leading-relaxed mb-4">
            A "hook" is a special function that starts with <code className="text-accent">use</code>. You call it inside your
            component (the function that returns your screen's UI), and it gives back data — in this case, an object
            containing all the URL parameters.
          </p>
        </section>

        {/* Dynamic Routes */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-text mb-4">Dynamic Routes in Expo Router</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            Expo Router uses a file-based routing system. The file name determines the URL path. When you put a
            parameter name in square brackets, it becomes a <strong className="text-text">dynamic route</strong> — meaning
            the value can change.
          </p>
          <CodeBlock
            title="File structure for dynamic routes"
            language="bash"
            code={`app/
├── index.tsx          # matches "/"
├── about.tsx          # matches "/about"
├── user/
│   └── [id].tsx       # matches "/user/123", "/user/456", etc.
└── product/
    └── [slug].tsx     # matches "/product/iphone", "/product/macbook", etc.`}
          />
          <p className="text-text-muted leading-relaxed mb-4">
            The file <code className="text-accent">app/user/[id].tsx</code> matches any URL that looks like
            <code className="text-accent"> /user/ANYTHING</code>. The part that says <code className="text-accent">[id]</code> becomes
            a parameter you can read with <code className="text-accent">useLocalSearchParams</code>.
          </p>
        </section>

        {/* Basic Usage */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-text mb-4">Basic Usage</h2>
          <CodeBlock
            title="app/user/[id].tsx — Reading a dynamic param"
            code={`import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

// This component renders when the user visits /user/123
export default function UserScreen() {
  // useLocalSearchParams returns an object with all params
  // If the URL is /user/123, then params = { id: '123' }
  const params = useLocalSearchParams();

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>User Profile</Text>
      {/* Access the 'id' parameter */}
      <Text>User ID: {params.id}</Text>
    </View>
  );
}`}
          />
          <p className="text-text-muted leading-relaxed mb-4">
            The curly braces <code className="text-accent">{'{params.id}'}</code> inside JSX is how you display JavaScript
            values in the UI. It's similar to template literals in JavaScript (<code className="text-accent">{`\`User ID: \${id}\``}</code>)
            but for use inside React's HTML-like syntax.
          </p>
        </section>

        {/* Query params */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-text mb-4">Query String Parameters</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            Just like on the web, you can also pass query string parameters (the <code className="text-accent">?key=value</code> part
            of a URL). These work alongside dynamic route parameters.
          </p>
          <CodeBlock
            title="Reading query string parameters"
            code={`import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

// If navigated to with: router.push('/search?query=shoes&sort=price')
export default function SearchScreen() {
  const params = useLocalSearchParams();
  // params = { query: 'shoes', sort: 'price' }

  return (
    <View style={{ padding: 20 }}>
      <Text>Searching for: {params.query}</Text>
      <Text>Sorted by: {params.sort}</Text>
    </View>
  );
}`}
          />
        </section>

        {/* Type-safe params */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-text mb-4">Type-Safe Params with TypeScript</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            Since you know TypeScript, you can tell <code className="text-accent">useLocalSearchParams</code> exactly what
            parameters to expect. This gives you autocomplete in your editor and catches typos at compile time.
          </p>
          <CodeBlock
            title="Using TypeScript generics for type safety"
            code={`import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

// Define the shape of your params using a TypeScript type
type ProductParams = {
  id: string;
  color?: string;  // optional param (the ? means it might not exist)
};

export default function ProductScreen() {
  // Pass your type in angle brackets — this is called a "generic"
  const { id, color } = useLocalSearchParams<ProductParams>();
  // Now TypeScript knows:
  //   id is string
  //   color is string | undefined

  return (
    <View style={{ padding: 20 }}>
      <Text>Product #{id}</Text>
      {color && <Text>Color: {color}</Text>}
    </View>
  );
}`}
          />
          <InfoBox variant="tip" title="Destructuring">
            The <code className="text-accent">{'const { id, color } = useLocalSearchParams()'}</code> syntax is called
            "destructuring" — it pulls specific properties out of an object into standalone variables. You may already
            know this from JavaScript. It's the same as writing <code className="text-accent">const id = params.id</code>.
          </InfoBox>
        </section>

        {/* Local vs Global */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-text mb-4">Local vs Global Search Params</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            Expo Router also has <code className="text-accent">useGlobalSearchParams</code>. The difference is about
            when your component re-renders (updates its UI):
          </p>
          <div className="overflow-x-auto rounded-xl border border-border mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface border-b border-border">
                  <th className="text-left px-4 py-3 font-heading font-semibold text-text">Hook</th>
                  <th className="text-left px-4 py-3 font-heading font-semibold text-text">Re-renders when...</th>
                  <th className="text-left px-4 py-3 font-heading font-semibold text-text">Use when...</th>
                </tr>
              </thead>
              <tbody className="text-text-muted">
                <tr className="border-b border-border">
                  <td className="px-4 py-3 font-mono text-accent">useLocalSearchParams</td>
                  <td className="px-4 py-3">Only when <em>this screen's</em> params change</td>
                  <td className="px-4 py-3">Reading params for the current screen (most cases)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-accent">useGlobalSearchParams</td>
                  <td className="px-4 py-3">When <em>any</em> route's params change</td>
                  <td className="px-4 py-3">Watching params across multiple screens (rare)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <InfoBox variant="info">
            In almost every case, you want <code className="text-accent">useLocalSearchParams</code>. Using the global version
            unnecessarily can cause performance problems because your screen re-renders even when unrelated params
            change on other screens.
          </InfoBox>
        </section>

        {/* Complete example */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-text mb-4">Complete Example: Product Detail Page</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            Here's a full example: a product list screen that navigates to a product detail screen. The detail screen
            reads the product ID from the URL and fetches the product data.
          </p>
          <CodeBlock
            title="app/products/index.tsx — Product list"
            code={`import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

const products = [
  { id: '1', name: 'Wireless Headphones' },
  { id: '2', name: 'USB-C Cable' },
  { id: '3', name: 'Phone Case' },
];

export default function ProductListScreen() {
  const router = useRouter();

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Products</Text>
      {/* FlatList is like a performant <ul> for long lists */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(\`/products/\${item.id}\`)}
            style={{ padding: 16, borderBottomWidth: 1 }}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}`}
          />
          <CodeBlock
            title="app/products/[id].tsx — Product detail"
            code={`import { useLocalSearchParams } from 'expo-router';
import { View, Text, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';

type ProductParams = {
  id: string;
};

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<ProductParams>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // useEffect runs code when the component first appears
  // Similar to running code after the DOM loads on the web
  useEffect(() => {
    async function fetchProduct() {
      const response = await fetch(
        \`https://api.example.com/products/\${id}\`
      );
      const data = await response.json();
      setProduct(data);
      setLoading(false);
    }
    fetchProduct();
  }, [id]); // [id] means "re-run this if 'id' changes"

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>{product.name}</Text>
      <Text style={{ fontSize: 18, color: 'green' }}>
        \${product.price}
      </Text>
      <Text style={{ marginTop: 12 }}>{product.description}</Text>
    </View>
  );
}`}
          />
          <InfoBox variant="tip" title="Web comparison">
            This entire pattern is just like building a product page on the web where you read
            <code className="text-accent"> /products/42</code> from the URL, fetch data from an API using that ID,
            and display it. The only difference is the syntax — React Native instead of HTML.
          </InfoBox>
        </section>
      </div>
    </PageShell>
  )
}
