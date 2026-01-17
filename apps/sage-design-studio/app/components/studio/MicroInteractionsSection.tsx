'use client';

import { Card } from '@sds/ui';

export function MicroInteractionsSection() {
    return (
        <div className="max-w-5xl mx-auto px-6 py-12">
            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-4 text-[var(--color-text-primary)]">
                    Micro-Interactions
                </h1>
                <p className="text-lg text-[var(--color-text-secondary)]">
                    Small, functional animations that provide feedback and delight.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Like Button Card */}
                <Card className="p-6 cursor-pointer group opacity-60">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xl font-bold text-[var(--color-text-muted)]">Like Button</h2>
                        <span className="text-xs font-mono px-2 py-1 bg-[var(--color-surface)] rounded text-[var(--color-text-secondary)]">Planned</span>
                    </div>
                    <p className="text-[var(--color-text-secondary)] mb-4">Animated heart with particle burst.</p>
                    <div className="aspect-video bg-[var(--color-surface)] rounded-lg mb-4 overflow-hidden relative flex items-center justify-center border border-[var(--color-border)]">
                        <span className="text-[var(--color-text-muted)] text-sm">Coming Soon</span>
                    </div>
                </Card>

                {/* Confetti Card */}
                <Card className="p-6 cursor-pointer group opacity-60">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xl font-bold text-[var(--color-text-muted)]">Confetti</h2>
                        <span className="text-xs font-mono px-2 py-1 bg-[var(--color-surface)] rounded text-[var(--color-text-secondary)]">Planned</span>
                    </div>
                    <p className="text-[var(--color-text-secondary)] mb-4">Celebration effects for success states.</p>
                    <div className="aspect-video bg-[var(--color-surface)] rounded-lg mb-4 overflow-hidden relative flex items-center justify-center border border-[var(--color-border)]">
                        <span className="text-[var(--color-text-muted)] text-sm">Coming Soon</span>
                    </div>
                </Card>

                {/* Download Button Card */}
                <Card className="p-6 cursor-pointer group opacity-60">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xl font-bold text-[var(--color-text-muted)]">Download Button</h2>
                        <span className="text-xs font-mono px-2 py-1 bg-[var(--color-surface)] rounded text-[var(--color-text-secondary)]">Planned</span>
                    </div>
                    <p className="text-[var(--color-text-secondary)] mb-4">Morphing button with progress indicator.</p>
                    <div className="aspect-video bg-[var(--color-surface)] rounded-lg mb-4 overflow-hidden relative flex items-center justify-center border border-[var(--color-border)]">
                        <span className="text-[var(--color-text-muted)] text-sm">Coming Soon</span>
                    </div>
                </Card>

                {/* Toggle Switch Card */}
                <Card className="p-6 cursor-pointer group opacity-60">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xl font-bold text-[var(--color-text-muted)]">Toggle Switch</h2>
                        <span className="text-xs font-mono px-2 py-1 bg-[var(--color-surface)] rounded text-[var(--color-text-secondary)]">Planned</span>
                    </div>
                    <p className="text-[var(--color-text-secondary)] mb-4">Playful toggle state transitions.</p>
                    <div className="aspect-video bg-[var(--color-surface)] rounded-lg mb-4 overflow-hidden relative flex items-center justify-center border border-[var(--color-border)]">
                        <span className="text-[var(--color-text-muted)] text-sm">Coming Soon</span>
                    </div>
                </Card>
            </div>
        </div>
    );
}
