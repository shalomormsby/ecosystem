'use client';

import { Heading, Text, Card, Badge } from '@thesage/ui';
import { ArrowRight, Layers, FileJson, LayoutTemplate, Menu, MessageSquare, PanelTop, CreditCard, ChevronDown, Maximize2 } from 'lucide-react';

interface BlocksOverviewProps {
    onNavigate: (itemId: string) => void;
}

const BLOCKS = [
    {
        id: 'page-layout',
        label: 'Page Layout',
        description: 'Composed layout with header, breadcrumbs, navs, and footer.',
        icon: <LayoutTemplate className="w-6 h-6" />
    },
    {
        id: 'primary-nav',
        label: 'Primary Nav',
        description: 'Sticky main navigation with responsive mobile menu.',
        icon: <PanelTop className="w-6 h-6" />
    },
    {
        id: 'secondary-nav',
        label: 'Secondary Nav',
        description: 'Tab-style navigation stacking below primary header.',
        icon: <Menu className="w-6 h-6" />
    },
    {
        id: 'tertiary-nav',
        label: 'Tertiary Nav',
        description: 'Third-level navigation for complex hierarchies.',
        icon: <Menu className="w-6 h-6 opacity-70" />
    },
    {
        id: 'hero-block',
        label: 'Hero Block',
        description: 'High-impact landing page entrance sections.',
        icon: <Maximize2 className="w-6 h-6" />
    },
    {
        id: 'footer',
        label: 'Footer',
        description: 'Multi-column footer with newsletter and links.',
        icon: <PanelTop className="w-6 h-6 rotate-180" />
    },
    {
        id: 'modal',
        label: 'Modal',
        description: 'Accessible dialog windows for focused tasks.',
        icon: <Maximize2 className="w-6 h-6" />
    },
    {
        id: 'toast',
        label: 'Toast',
        description: 'Temporary notifications for system feedback.',
        icon: <MessageSquare className="w-6 h-6" />
    },
    {
        id: 'collapsible-code-block',
        label: 'Code Block',
        description: 'Syntax-highlighted code with expandable sections.',
        icon: <FileJson className="w-6 h-6" />
    },
    {
        id: 'open-graph-card',
        label: 'Open Graph Card',
        description: 'Social preview card generator.',
        icon: <CreditCard className="w-6 h-6" />
    }
];

export function BlocksOverview({ onNavigate }: BlocksOverviewProps) {
    return (
        <div className="space-y-8">
            {/* Category Header */}
            <div className="space-y-4">
                <div className="flex items-start gap-3">
                    <div className="text-[var(--color-primary)]">
                        <Layers className="w-12 h-12" />
                    </div>
                    <div>
                        <Heading level={1} className="mb-2">
                            Blocks
                        </Heading>
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary">
                                {BLOCKS.length} patterns
                            </Badge>
                        </div>
                    </div>
                </div>
                <Text variant="secondary" size="lg" className="max-w-3xl">
                    Pre-composed page sections and layout patterns designed to work together.
                </Text>
            </div>

            {/* Components Grid */}
            <div>
                <Heading level={2} className="mb-4">
                    Available Patterns
                </Heading>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {BLOCKS.map((block) => (
                        <button
                            key={block.id}
                            onClick={() => onNavigate(block.id)}
                            className="text-left group"
                        >
                            <Card className="p-4 h-full transition-all duration-200 hover:border-[var(--color-primary)] hover:shadow-md cursor-pointer">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="text-[var(--color-primary)] bg-[var(--color-primary)]/10 p-2 rounded-md group-hover:bg-[var(--color-primary)]/20 transition-colors">
                                            {block.icon}
                                        </div>
                                        <Heading
                                            level={3}
                                            className="text-base group-hover:text-[var(--color-primary)] transition-colors"
                                        >
                                            {block.label}
                                        </Heading>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] group-hover:translate-x-1 transition-all mt-1" />
                                </div>
                                <Text variant="secondary" size="sm" className="line-clamp-2">
                                    {block.description}
                                </Text>
                            </Card>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
