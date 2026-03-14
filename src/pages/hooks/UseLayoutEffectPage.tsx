import { useState, useRef, useLayoutEffect } from 'react'
import { PageShell } from '../../components/PageShell'
import { HooksSidebar } from '../../components/HooksSidebar'
import { CodeBlock } from '../../components/CodeBlock'
import { InfoBox } from '../../components/InfoBox'
import { DemoBox } from '../../components/DemoBox'

export function UseLayoutEffectPage() {
  const [showTooltip, setShowTooltip] = useState(false)
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 })
  const buttonRef = useRef<HTMLButtonElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (showTooltip && buttonRef.current && tooltipRef.current) {
      const btnRect = buttonRef.current.getBoundingClientRect()
      const tipRect = tooltipRef.current.getBoundingClientRect()
      setTooltipPos({
        top: btnRect.top - tipRect.height - 8,
        left: btnRect.left + btnRect.width / 2 - tipRect.width / 2,
      })
    }
  }, [showTooltip])

  return (
    <PageShell
      title="useLayoutEffect"
      subtitle="Like useEffect, but fires synchronously after DOM mutations and before the browser paints. Use it to measure and adjust layout without flicker."
      gradient="from-purple to-pink"
      badge="REACT HOOK"
      breadcrumbs={[{ label: 'Hooks' }, { label: 'useLayoutEffect' }]}
      sidebar={<HooksSidebar />}
    >
      {/* What is useLayoutEffect? */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">What is useLayoutEffect?</h2>
        <p className="text-text-muted leading-relaxed">
          You already know <code className="text-accent">useEffect</code> — it runs your code <em>after</em> the component renders and the browser has painted pixels to the screen.
          <code className="text-accent"> useLayoutEffect</code> is almost identical, but it fires at a different time:
        </p>
        <ol className="list-decimal list-inside text-text-muted space-y-2 ml-2">
          <li>React renders your component and updates the <strong className="text-text">DOM</strong> (the invisible data structure).</li>
          <li><strong className="text-accent">useLayoutEffect runs here</strong> — the DOM is updated but the browser has NOT painted yet.</li>
          <li>The browser paints pixels to the screen.</li>
          <li><code className="text-accent">useEffect</code> would run here — after the paint.</li>
        </ol>

        <InfoBox variant="info" title="Why does the timing matter?">
          If you need to measure a DOM element (its size or position) and then immediately adjust something based on that measurement,
          <code className="text-accent">useLayoutEffect</code> lets you do it <em>before</em> the user sees anything. With <code className="text-accent">useEffect</code>,
          the user might see a brief flicker as elements jump from their initial position to the corrected one.
        </InfoBox>
      </section>

      {/* Syntax */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">Syntax</h2>
        <CodeBlock
          code={`import { useLayoutEffect } from 'react';

// The API is identical to useEffect
useLayoutEffect(() => {
  // Measure DOM, adjust layout, etc.
  const rect = elementRef.current.getBoundingClientRect();
  setPosition({ top: rect.top, left: rect.left });

  return () => {
    // Optional cleanup (same as useEffect)
  };
}, [dependencies]);`}
          language="tsx"
          title="useLayoutEffect syntax"
        />
        <p className="text-text-muted leading-relaxed">
          The syntax is <strong className="text-text">exactly the same</strong> as <code className="text-accent">useEffect</code>.
          The only difference is <em>when</em> it fires.
        </p>
      </section>

      {/* Interactive Demo */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">Interactive Demo</h2>

        <DemoBox title="Tooltip Positioning with useLayoutEffect">
          <div className="flex flex-col items-center gap-4 min-h-[120px] relative">
            <p className="text-sm text-text-muted text-center">
              Click the button to show a tooltip that positions itself above the button using <code className="text-accent">useLayoutEffect</code>.
            </p>
            <button
              ref={buttonRef}
              onClick={() => setShowTooltip((prev) => !prev)}
              className="px-5 py-2.5 rounded-lg bg-primary/10 border border-primary/30 text-primary font-mono text-sm hover:bg-primary/20 transition-colors"
            >
              {showTooltip ? 'Hide Tooltip' : 'Show Tooltip'}
            </button>
            {showTooltip && (
              <div
                ref={tooltipRef}
                style={{
                  position: 'fixed',
                  top: tooltipPos.top,
                  left: tooltipPos.left,
                  zIndex: 50,
                }}
                className="px-4 py-2 rounded-lg bg-accent text-bg text-sm font-mono shadow-xl whitespace-nowrap"
              >
                I was positioned before the browser painted!
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-accent" />
              </div>
            )}
          </div>
        </DemoBox>

        <p className="text-text-muted leading-relaxed">
          When you click the button, <code className="text-accent">showTooltip</code> becomes <code className="text-accent">true</code>.
          React renders the tooltip to the DOM, then <code className="text-accent">useLayoutEffect</code> fires — measuring the button position
          and setting the tooltip coordinates — all before the user sees anything. No flicker.
        </p>

        <CodeBlock
          code={`interface TooltipPosition {
  top: number;
  left: number;
}

const [showTooltip, setShowTooltip] = useState<boolean>(false);
const [tooltipPos, setTooltipPos] = useState<TooltipPosition>({ top: 0, left: 0 });
const buttonRef = useRef<HTMLButtonElement>(null);
const tooltipRef = useRef<HTMLDivElement>(null);

useLayoutEffect(() => {
  if (showTooltip && buttonRef.current && tooltipRef.current) {
    const btnRect = buttonRef.current.getBoundingClientRect();
    const tipRect = tooltipRef.current.getBoundingClientRect();
    setTooltipPos({
      top: btnRect.top - tipRect.height - 8,
      left: btnRect.left + btnRect.width / 2 - tipRect.width / 2,
    });
  }
}, [showTooltip]);`}
          language="tsx"
          title="Demo code"
        />
      </section>

      {/* Comparison */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">useEffect vs useLayoutEffect</h2>
        <CodeBlock
          code={`// useEffect — runs AFTER the browser paints
// Good for: API calls, logging, subscriptions
useEffect(() => {
  fetchData();
}, []);

// useLayoutEffect — runs BEFORE the browser paints
// Good for: measuring DOM, preventing visual flicker
useLayoutEffect(() => {
  const { height } = ref.current.getBoundingClientRect();
  setContainerHeight(height);
}, []);`}
          language="tsx"
          title="When to use which"
        />
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-text-muted border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-text font-heading">Feature</th>
                <th className="text-left py-3 px-4 text-text font-heading">useEffect</th>
                <th className="text-left py-3 px-4 text-text font-heading">useLayoutEffect</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4 font-mono text-accent">Timing</td>
                <td className="py-3 px-4">After paint</td>
                <td className="py-3 px-4">Before paint</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4 font-mono text-accent">Blocks rendering?</td>
                <td className="py-3 px-4">No</td>
                <td className="py-3 px-4">Yes (synchronous)</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4 font-mono text-accent">Use case</td>
                <td className="py-3 px-4">Data fetching, subscriptions</td>
                <td className="py-3 px-4">DOM measurements, layout adjustments</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-accent">Default choice?</td>
                <td className="py-3 px-4 text-primary font-semibold">Yes</td>
                <td className="py-3 px-4">Only when needed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* React Native equivalent */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-heading font-bold text-text">In React Native</h2>
        <p className="text-text-muted leading-relaxed">
          React Native does not have a browser DOM, but <code className="text-accent">useLayoutEffect</code> still works.
          It fires synchronously after the native layout has been calculated, so you can use it
          to measure components via <code className="text-accent">onLayout</code> or ref-based measurement before the next frame.
        </p>
        <CodeBlock
          code={`import { useState, useRef, useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MeasuredBox(): React.ReactElement {
  const viewRef = useRef<View>(null);
  const [height, setHeight] = useState<number>(0);

  useLayoutEffect(() => {
    // Measure after layout but before paint
    viewRef.current?.measure((x, y, width, h) => {
      setHeight(h);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View ref={viewRef} style={styles.box}>
        <Text>This box's height is: {height}px</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  box: { padding: 20, backgroundColor: '#f0f0f0', borderRadius: 12 },
});`}
          language="tsx"
          title="React Native — useLayoutEffect for measurement"
        />
      </section>

      {/* Tips */}
      <section className="space-y-4">
        <h2 className="text-2xl font-heading font-bold text-text">Tips and Gotchas</h2>

        <InfoBox variant="warning" title="Use sparingly">
          Because <code className="text-accent">useLayoutEffect</code> blocks the browser from painting, putting slow code inside it
          will make your app feel sluggish. Always prefer <code className="text-accent">useEffect</code> unless you specifically need to prevent flicker.
        </InfoBox>

        <InfoBox variant="tip" title="Rule of thumb">
          Start with <code className="text-accent">useEffect</code>. If you see a visual flicker (elements jumping around on screen),
          switch to <code className="text-accent">useLayoutEffect</code> for that specific effect.
        </InfoBox>

        <InfoBox variant="info" title="Server-side rendering warning">
          <code className="text-accent">useLayoutEffect</code> fires a warning during server-side rendering (SSR) because there is no DOM on the server.
          If you are using Next.js or similar, you may need to guard it or use <code className="text-accent">useEffect</code> instead.
        </InfoBox>
      </section>
    </PageShell>
  )
}
