'use client';

import { Card } from '@sds/ui';
import { motion, Easing } from 'framer-motion';
import { useState } from 'react';

type EasingItem = {
    name: string;
    value: string;
    bezier: Easing;
    description: string;
};

const EASINGS: EasingItem[] = [
    { name: 'Linear', value: 'linear', bezier: 'linear', description: 'Constant speed. Mechanical.' },
    { name: 'Ease In', value: 'cubic-bezier(0.4, 0, 1, 1)', bezier: [0.4, 0, 1, 1], description: 'Starts slow, ends fast. Exiting elements.' },
    { name: 'Ease Out', value: 'cubic-bezier(0, 0, 0.2, 1)', bezier: [0, 0, 0.2, 1], description: 'Starts fast, ends slow. Entering elements.' },
    { name: 'Ease In Out', value: 'cubic-bezier(0.4, 0, 0.2, 1)', bezier: [0.4, 0, 0.2, 1], description: 'Slow start and end. General transitions.' },
    { name: 'Spring', value: 'cubic-bezier(0.16, 1, 0.3, 1)', bezier: [0.16, 1, 0.3, 1], description: 'Bouncy, playful interactions.' },
];

export function EasingPage() {
    const [key, setKey] = useState(0);

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-4 text-[var(--color-text-primary)]">
                    Easing
                </h1>
                <p className="text-lg text-[var(--color-text-secondary)]">
                    Easing curves define how elements accelerate and decelerate. They give life and physical weight to digital interactions.
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
                    {EASINGS.map((easing) => (
                        <Card key={easing.name} className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center gap-6">
                                <div className="w-32 flex-shrink-0">
                                    <h3 className="font-semibold text-[var(--color-text-primary)]">{easing.name}</h3>
                                    <code className="text-xs text-[var(--color-text-muted)] block mt-1 break-all">
                                        {Array.isArray(easing.bezier)
                                            ? `[${easing.bezier.join(', ')}]`
                                            : (typeof easing.bezier === 'string' ? easing.bezier : 'Custom Easing')}
                                    </code>
                                </div>

                                <div className="flex-grow relative h-12 bg-[var(--color-surface)] rounded overflow-hidden">
                                    {/* Reference Linear line */}
                                    <div className="absolute inset-x-0 top-1/2 h-px bg-[var(--color-border)] opacity-30" />

                                    <div className="absolute inset-y-0 left-0 w-full flex items-center px-2">
                                        <motion.div
                                            key={key}
                                            initial={{ x: 0 }}
                                            animate={{ x: 'calc(100% - 32px)' }}
                                            transition={{
                                                duration: 1.5,
                                                ease: easing.bezier,
                                                repeat: Infinity,
                                                repeatDelay: 1
                                            }}
                                            className="w-8 h-8 bg-[var(--color-primary)] rounded shadow-sm z-10"
                                        />

                                        {/* Shadow Linear for comparison */}
                                        {easing.name !== 'Linear' && (
                                            <motion.div
                                                key={`linear-${key}`}
                                                initial={{ x: 0 }}
                                                animate={{ x: 'calc(100% - 32px)' }}
                                                transition={{
                                                    duration: 1.5,
                                                    ease: "linear",
                                                    repeat: Infinity,
                                                    repeatDelay: 1
                                                }}
                                                className="absolute w-8 h-8 boundary border-2 border-[var(--color-border)] rounded opacity-20"
                                            />
                                        )}
                                    </div>
                                </div>

                                <div className="w-48 text-sm text-[var(--color-text-secondary)] flex-shrink-0">
                                    {easing.description}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
