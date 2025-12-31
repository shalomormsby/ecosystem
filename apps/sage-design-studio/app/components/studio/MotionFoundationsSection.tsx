'use client';

import { Card } from '@ecosystem/design-system';

export function MotionFoundationsSection() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-[var(--color-text-primary)]">
          Motion Foundations
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)] max-w-3xl">
          Core principles, duration scales, easing curves, and motion preferences that form the foundation of our motion system.
        </p>
      </div>

      {/* Overview Card */}
      <Card className="p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
          What is Motion?
        </h2>
        <div className="space-y-4 text-[var(--color-text-secondary)]">
          <p>
            Motion brings interfaces to life. Our motion system provides a carefully crafted set of durations,
            easing curves, and components that create smooth, purposeful animations. Use motion to guide attention,
            provide feedback, and create delightful experiences.
          </p>
          <p>
            Every motion in our design system respects accessibility preferences, particularly <code className="px-2 py-1 bg-[var(--color-surface)] rounded text-[var(--color-primary)]">prefers-reduced-motion</code>,
            ensuring all users have a comfortable experience.
          </p>
        </div>
      </Card>

      {/* When to Use Motion */}
      <Card className="p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
          When to Use Motion
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
            <h3 className="font-semibold text-[var(--color-text-primary)] mb-3">✓ Good Uses</h3>
            <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
              <li>• State changes (hover, active, disabled)</li>
              <li>• Page transitions and navigation</li>
              <li>• Drawing attention to important elements</li>
              <li>• Providing feedback for user actions</li>
              <li>• Revealing and hiding content</li>
              <li>• Loading and progress indicators</li>
            </ul>
          </div>
          <div className="p-4 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
            <h3 className="font-semibold text-[var(--color-text-primary)] mb-3">✗ Avoid</h3>
            <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
              <li>• Gratuitous animations without purpose</li>
              <li>• Blocking critical content with motion</li>
              <li>• Overly long durations (keep it fast)</li>
              <li>• Animating layout properties (use transform)</li>
              <li>• Motion that distracts from content</li>
              <li>• Ignoring reduced motion preferences</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Duration Scale - Coming Soon */}
      <Card className="p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Duration Scale
        </h2>
        <div className="p-12 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] text-center">
          <div className="inline-block px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg">
            <span className="text-[var(--color-text-muted)]">Coming Soon</span>
          </div>
          <p className="mt-4 text-sm text-[var(--color-text-secondary)] max-w-md mx-auto">
            Interactive duration scale showing timing values from instant (50ms) to slower (500ms) with live examples and usage guidelines.
          </p>
        </div>
      </Card>

      {/* Easing Curves - Coming Soon */}
      <Card className="p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Easing Curves
        </h2>
        <div className="p-12 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] text-center">
          <div className="inline-block px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg">
            <span className="text-[var(--color-text-muted)]">Coming Soon</span>
          </div>
          <p className="mt-4 text-sm text-[var(--color-text-secondary)] max-w-md mx-auto">
            Visual easing curve editor with presets (default, spring, linear) and interactive demonstrations of each curve's motion feel.
          </p>
        </div>
      </Card>

      {/* Motion Preferences - Coming Soon */}
      <Card className="p-8">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Motion Preferences & Accessibility
        </h2>
        <div className="p-12 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] text-center">
          <div className="inline-block px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg">
            <span className="text-[var(--color-text-muted)]">Coming Soon</span>
          </div>
          <p className="mt-4 text-sm text-[var(--color-text-secondary)] max-w-md mx-auto">
            Documentation on using <code className="px-2 py-1 bg-[var(--color-surface)] rounded text-[var(--color-primary)]">useMotionPreference</code> hook
            and respecting user preferences for reduced motion.
          </p>
        </div>
      </Card>
    </div>
  );
}
