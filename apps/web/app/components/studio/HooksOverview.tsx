'use client';

import { Heading, Text, Card, Badge } from '@thesage/ui';
import { ArrowRight, Webhook, FormInput, Palette, Bell, Zap, Clipboard } from 'lucide-react';

interface HooksOverviewProps {
    onNavigate: (itemId: string) => void;
}

const HOOKS = [
    {
        id: 'use-form',
        label: 'useForm',
        description: 'Form state management and validation.',
        icon: <FormInput className="w-6 h-6" />
    },
    {
        id: 'use-theme',
        label: 'useTheme',
        description: 'Switch between light and dark modes.',
        icon: <Palette className="w-6 h-6" />
    },
    {
        id: 'use-toast',
        label: 'useToast',
        description: 'Display temporary notifications.',
        icon: <Bell className="w-6 h-6" />
    },
    {
        id: 'use-motion-preference',
        label: 'useMotionPreference',
        description: 'Detect prefers-reduced-motion settings.',
        icon: <Zap className="w-6 h-6" />
    },
    {
        id: 'use-clipboard',
        label: 'useClipboard',
        description: 'Copy text to system clipboard.',
        icon: <Clipboard className="w-6 h-6" />
    }
];

export function HooksOverview({ onNavigate }: HooksOverviewProps) {
    return (
        <div className="space-y-8">
            {/* Category Header */}
            <div className="space-y-4">
                <div className="flex items-start gap-3">
                    <div className="text-[var(--color-primary)]">
                        <Webhook className="w-12 h-12" />
                    </div>
                    <div>
                        <Heading level={1} className="mb-2">
                            Hooks & Utilities
                        </Heading>
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary">
                                {HOOKS.length} utilities
                            </Badge>
                            <Badge variant="outline">
                                TypeScript
                            </Badge>
                        </div>
                    </div>
                </div>
                <Text variant="secondary" size="lg" className="max-w-3xl">
                    A collection of type-safe React hooks for common behaviors and state management.
                </Text>
            </div>

            {/* Components Grid */}
            <div>
                <Heading level={2} className="mb-4">
                    Available Hooks
                </Heading>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {HOOKS.map((hook) => (
                        <button
                            key={hook.id}
                            onClick={() => onNavigate(hook.id)}
                            className="text-left group"
                        >
                            <Card className="p-4 h-full transition-all duration-200 hover:border-[var(--color-primary)] hover:shadow-md cursor-pointer">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="text-[var(--color-primary)] bg-[var(--color-primary)]/10 p-2 rounded-md group-hover:bg-[var(--color-primary)]/20 transition-colors">
                                            {hook.icon}
                                        </div>
                                        <Heading
                                            level={3}
                                            className="text-base group-hover:text-[var(--color-primary)] transition-colors"
                                        >
                                            {hook.label}
                                        </Heading>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] group-hover:translate-x-1 transition-all mt-1" />
                                </div>
                                <Text variant="secondary" size="sm" className="line-clamp-2">
                                    {hook.description}
                                </Text>
                            </Card>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
