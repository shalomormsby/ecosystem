'use client';

import { Card } from '@sds/ui';
import { motion } from 'framer-motion';
import { useState } from 'react';

const DURATIONS = [
    { name: 'Fast', value: 150, description: 'Micro-interactions, hover states', token: 'fast' },
    { name: 'Normal', value: 300, description: 'Standard UI movements, modal opens', token: 'normal' },
    { name: 'Slow', value: 500, description: 'Large layout shifts, page transitions', token: 'slow' },
    { name: 'Slower', value: 800, description: 'Background effects, emotional moments', token: 'slower' },
];

export function DurationPage() {
    const [key, setKey] = useState(0);

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-4 text-[var(--color-text-primary)]">
                    Duration
                </h1>
                <p className="text-lg text-[var(--color-text-secondary)]">
                    Timing tokens establish a consistent rhythm for the interface. Use faster durations for frequent interactions and slower ones for significant changes.
                </p>
            </div>

            <div className="space-y-8">
                <div className="flex justify-end">
                    <button
                        onClick={() => setKey(k => k + 1)}
                        className="px-4 py-2 text-sm font-medium bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md hover:bg-[var(--color-surface-hover)] transition-colors"
                    >
                        Replay Animations
                    </button>
                </div>

                <div className="grid gap-6">
                    {DURATIONS.map((duration) => (
                        <Card key={duration.name} className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center gap-6">
                                <div className="w-32 flex-shrink-0">
                                    <h3 className="font-semibold text-[var(--color-text-primary)]">{duration.name}</h3>
                                    <code className="text-xs text-[var(--color-text-muted)] block mt-1">{duration.value}ms</code>
                                </div>

                                <div className="flex-grow relative h-12 bg-[var(--color-surface)] rounded overflow-hidden">
                                    <div className="absolute inset-y-0 left-0 w-full flex items-center px-2">
                                        <motion.div
                                            key={key}
                                            initial={{ x: 0 }}
                                            animate={{ x: 'calc(100% - 32px)' }} // Container width - box width
                                            transition={{
                                                duration: duration.value / 1000,
                                                ease: "easeInOut",
                                                repeat: Infinity,
                                                repeatType: "reverse",
                                                repeatDelay: 1
                                            }}
                                            className="w-8 h-8 bg-[var(--color-primary)] rounded shadow-sm"
                                        />
                                    </div>
                                </div>

                                <div className="w-48 text-sm text-[var(--color-text-secondary)] flex-shrink-0">
                                    {duration.description}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
