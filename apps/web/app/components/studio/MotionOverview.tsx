'use client';

import { Heading, Text, Card, Badge } from '@thesage/ui';
import { ArrowRight, Zap, Type, Sparkles, MousePointer2, Image, Activity, Terminal, Magnet } from 'lucide-react';

interface MotionOverviewProps {
    onNavigate: (itemId: string) => void;
}

const MOTION_MODULES = [
    {
        id: 'primitives',
        label: 'Primitives',
        description: 'Core animation building blocks for duration and easing.',
        icon: <Activity className="w-6 h-6" />
    },
    {
        id: 'text-effects',
        label: 'Text Effects',
        description: 'Typing, revealing, and variable font weight animations.',
        icon: <Type className="w-6 h-6" />
    },
    {
        id: 'backgrounds',
        label: 'Backgrounds',
        description: 'Immersive, interactive background layers.',
        icon: <Image className="w-6 h-6" />
    },
    {
        id: 'cursors',
        label: 'Cursors',
        description: 'Custom cursor interactions and trails.',
        icon: <MousePointer2 className="w-6 h-6" />
    },
    {
        id: 'micro-interactions',
        label: 'Micro-Interactions',
        description: 'Subtle feedback animations for UI elements.',
        icon: <Sparkles className="w-6 h-6" />
    }
];

const FEATURED_EXAMPLES = [
    {
        id: 'warp-speed',
        label: 'Warp Speed',
        description: 'Star-trek style warp drive effect.',
        icon: <Zap className="w-6 h-6" />
    },
    {
        id: 'faulty-terminal',
        label: 'Faulty Terminal',
        description: 'Retro CRT monitor styling and glitch effects.',
        icon: <Terminal className="w-6 h-6" />
    },
    {
        id: 'magnetic',
        label: 'Magnetic',
        description: 'Elements that gravitate towards the cursor.',
        icon: <Magnet className="w-6 h-6" />
    }
];

export function MotionOverview({ onNavigate }: MotionOverviewProps) {
    return (
        <div className="space-y-8">
            {/* Category Header */}
            <div className="space-y-4">
                <div className="flex items-start gap-3">
                    <div className="text-[var(--color-primary)]">
                        <Zap className="w-12 h-12" />
                    </div>
                    <div>
                        <Heading level={1} className="mb-2">
                            Motion System
                        </Heading>
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary">
                                0-10 Scale
                            </Badge>
                            <Badge variant="outline">
                                prefers-reduced-motion
                            </Badge>
                        </div>
                    </div>
                </div>
                <Text variant="secondary" size="lg" className="max-w-3xl">
                    A constraint-based motion system that respects user preferences while enabling rich, interactive experiences.
                </Text>
            </div>

            {/* Modules Grid */}
            <div>
                <Heading level={2} className="mb-4">
                    Core Modules
                </Heading>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {MOTION_MODULES.map((module) => (
                        <button
                            key={module.id}
                            onClick={() => onNavigate(module.id)}
                            className="text-left group"
                        >
                            <Card className="p-4 h-full transition-all duration-200 hover:border-[var(--color-primary)] hover:shadow-md cursor-pointer">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="text-[var(--color-primary)] bg-[var(--color-primary)]/10 p-2 rounded-md group-hover:bg-[var(--color-primary)]/20 transition-colors">
                                            {module.icon}
                                        </div>
                                        <Heading
                                            level={3}
                                            className="text-base group-hover:text-[var(--color-primary)] transition-colors"
                                        >
                                            {module.label}
                                        </Heading>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] group-hover:translate-x-1 transition-all mt-1" />
                                </div>
                                <Text variant="secondary" size="sm" className="line-clamp-2">
                                    {module.description}
                                </Text>
                            </Card>
                        </button>
                    ))}
                </div>
            </div>

            {/* Featured Examples */}
            <div className="pt-4 border-t border-[var(--color-border)]">
                <Heading level={2} className="mb-4">
                    Featured Examples
                </Heading>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {FEATURED_EXAMPLES.map((example) => (
                        <button
                            key={example.id}
                            onClick={() => onNavigate(example.id)}
                            className="text-left group"
                        >
                            <Card className="p-4 h-full transition-all duration-200 hover:border-[var(--color-primary)] hover:shadow-md cursor-pointer bg-[var(--color-surface)]">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-primary)] transition-colors">
                                            {example.icon}
                                        </div>
                                        <Heading
                                            level={3}
                                            className="text-base group-hover:text-[var(--color-primary)] transition-colors"
                                        >
                                            {example.label}
                                        </Heading>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] group-hover:translate-x-1 transition-all mt-1" />
                                </div>
                                <Text variant="secondary" size="sm" className="line-clamp-2">
                                    {example.description}
                                </Text>
                            </Card>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
