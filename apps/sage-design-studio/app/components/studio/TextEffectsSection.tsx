'use client';

import { Card } from '@ecosystem/design-system';

export function TextEffectsSection() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-[var(--color-text-primary)]">
          Text Effects
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)] max-w-3xl">
          Dynamic text animations that bring typography to life. From subtle weight transitions to eye-catching gradient effects.
        </p>
      </div>

      {/* Overview Card */}
      <Card className="p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Overview
        </h2>
        <div className="space-y-4 text-[var(--color-text-secondary)]">
          <p>
            Text effects add visual interest and guide user attention through dynamic typography. Our text effect components
            provide smooth, performant animations that enhance readability and create engaging user experiences.
          </p>
          <p>
            All text effects respect accessibility preferences and degrade gracefully when reduced motion is enabled.
          </p>
        </div>
      </Card>

      {/* Variable Weight Text - Coming Soon */}
      <Card className="p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Variable Weight Text
        </h2>
        <div className="p-12 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] text-center">
          <div className="inline-block px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg">
            <span className="text-[var(--color-text-muted)]">Coming Soon</span>
          </div>
          <p className="mt-4 text-sm text-[var(--color-text-secondary)] max-w-md mx-auto">
            Smooth font-weight transitions using variable fonts. Perfect for creating breathing text effects or emphasizing content on hover.
          </p>
        </div>
      </Card>

      {/* Typewriter Effect - Coming Soon */}
      <Card className="p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Typewriter Effect
        </h2>
        <div className="p-12 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] text-center">
          <div className="inline-block px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg">
            <span className="text-[var(--color-text-muted)]">Coming Soon</span>
          </div>
          <p className="mt-4 text-sm text-[var(--color-text-secondary)] max-w-md mx-auto">
            Classic typewriter animation that reveals text character by character. Configurable speed, cursor style, and loop behavior.
          </p>
        </div>
      </Card>

      {/* Scroll Highlight - Coming Soon */}
      <Card className="p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Scroll Highlight
        </h2>
        <div className="p-12 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] text-center">
          <div className="inline-block px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg">
            <span className="text-[var(--color-text-muted)]">Coming Soon</span>
          </div>
          <p className="mt-4 text-sm text-[var(--color-text-secondary)] max-w-md mx-auto">
            Progressive text highlighting as user scrolls. Great for long-form content and storytelling experiences.
          </p>
        </div>
      </Card>

      {/* Letter Stagger - Coming Soon */}
      <Card className="p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Letter Stagger
        </h2>
        <div className="p-12 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] text-center">
          <div className="inline-block px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg">
            <span className="text-[var(--color-text-muted)]">Coming Soon</span>
          </div>
          <p className="mt-4 text-sm text-[var(--color-text-secondary)] max-w-md mx-auto">
            Staggered animations where each letter animates with a slight delay. Perfect for headings and attention-grabbing text.
          </p>
        </div>
      </Card>

      {/* Gradient Text - Coming Soon */}
      <Card className="p-8">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Gradient Text
        </h2>
        <div className="p-12 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] text-center">
          <div className="inline-block px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg">
            <span className="text-[var(--color-text-muted)]">Coming Soon</span>
          </div>
          <p className="mt-4 text-sm text-[var(--color-text-secondary)] max-w-md mx-auto">
            Animated gradient overlays on text with customizable colors, directions, and animation speed. Theme-aware with automatic color adaptation.
          </p>
        </div>
      </Card>
    </div>
  );
}
