'use client';

import { useState, useEffect } from 'react';
import { Card } from '@sds/ui';

/**
 * simple preview component for motion cards
 */
function MotionPreview({
  type,
  duration = "300ms",
  easing = "cubic-bezier(0.4, 0, 0.2, 1)"
}: {
  type: 'duration' | 'easing';
  duration?: string;
  easing?: string;
}) {
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-replay animation for preview
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(prev => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center bg-[var(--color-background)]">
      <div className="relative w-full max-w-[200px] h-12 bg-[var(--color-surface)] rounded-full overflow-hidden border border-[var(--color-border)]">
        <div
          className="absolute top-1 bottom-1 w-10 bg-[var(--color-primary)] rounded-full"
          style={{
            left: isAnimating ? 'calc(100% - 44px)' : '4px',
            transition: `left ${duration} ${easing}`
          }}
        />
      </div>
    </div>
  );
}

export function PrimitivesSection() {
  const navigateTo = (path: string) => {
    window.location.hash = path;
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-[var(--color-text-primary)]">
          Motion Primitives
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)] ">
          Core principles, duration scales, easing curves, and motion preferences that form the foundation of our motion system.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Duration Card */}
        <Card
          className="p-6 cursor-pointer group"
          hoverEffect={true}
          onClick={() => navigateTo('#motion/duration')}
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold group-hover:text-[var(--color-primary)] transition-colors">Duration</h2>
            <span className="text-xs font-mono px-2 py-1 bg-[var(--color-surface)] rounded text-[var(--color-text-secondary)]">Tokens</span>
          </div>
          <p className="text-[var(--color-text-secondary)] mb-4">Standardized time values for consistent rhythm.</p>
          <div className="aspect-video bg-[var(--color-background)] rounded-lg mb-4 overflow-hidden relative flex items-center justify-center border border-[var(--color-border)]">
            <MotionPreview type="duration" duration="500ms" />
          </div>
        </Card>

        {/* Easing Card */}
        <Card
          className="p-6 cursor-pointer group"
          hoverEffect={true}
          onClick={() => navigateTo('#motion/easing')}
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold group-hover:text-[var(--color-primary)] transition-colors">Easing</h2>
            <span className="text-xs font-mono px-2 py-1 bg-[var(--color-surface)] rounded text-[var(--color-text-secondary)]">Tokens</span>
          </div>
          <p className="text-[var(--color-text-secondary)] mb-4">Animation curves for natural, lifelike movement.</p>
          <div className="aspect-video bg-[var(--color-background)] rounded-lg mb-4 overflow-hidden relative flex items-center justify-center border border-[var(--color-border)]">
            <MotionPreview type="easing" easing="cubic-bezier(0.34, 1.56, 0.64, 1)" />
          </div>
        </Card>

        {/* Spring Physics Card (Planned) */}
        <Card className="p-6 cursor-pointer group opacity-60">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-[var(--color-text-muted)]">Spring Physics</h2>
            <span className="text-xs font-mono px-2 py-1 bg-[var(--color-surface)] rounded text-[var(--color-text-secondary)]">Planned</span>
          </div>
          <p className="text-[var(--color-text-secondary)] mb-4">Physics-based motion simulation.</p>
          <div className="aspect-video bg-[var(--color-surface)] rounded-lg mb-4 overflow-hidden relative flex items-center justify-center border border-[var(--color-border)]">
            <span className="text-[var(--color-text-muted)] text-sm">Coming Soon</span>
          </div>
        </Card>

        {/* Layout Animation Card (Planned) */}
        <Card className="p-6 cursor-pointer group opacity-60">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-[var(--color-text-muted)]">Layout Projection</h2>
            <span className="text-xs font-mono px-2 py-1 bg-[var(--color-surface)] rounded text-[var(--color-text-secondary)]">Planned</span>
          </div>
          <p className="text-[var(--color-text-secondary)] mb-4">Smooth layout transitions between states.</p>
          <div className="aspect-video bg-[var(--color-surface)] rounded-lg mb-4 overflow-hidden relative flex items-center justify-center border border-[var(--color-border)]">
            <span className="text-[var(--color-text-muted)] text-sm">Coming Soon</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
