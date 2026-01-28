'use client';

import { Palette, Droplet, Type, Ruler, Zap, Code, ShieldCheck } from 'lucide-react';
import { SectionOverview, type SectionOverviewItem } from './SectionOverview';

interface DesignTokensOverviewProps {
  onNavigate: (itemId: string) => void;
}

const DESIGN_TOKENS: SectionOverviewItem[] = [
  {
    id: 'brand',
    label: 'Brand',
    description: 'System-wide constants for product identity and theme naming.',
    icon: <ShieldCheck className="w-6 h-6" />,
  },
  {
    id: 'colors',
    label: 'Colors',
    description: 'Color palette system with semantic naming and theme support.',
    icon: <Droplet className="w-6 h-6" />,
  },
  {
    id: 'typography',
    label: 'Typography',
    description: 'Font families, sizes, weights, and line heights for consistent text styling.',
    icon: <Type className="w-6 h-6" />,
  },
  {
    id: 'spacing',
    label: 'Spacing',
    description: 'Swiss Grid-inspired spacing scale for layout consistency.',
    icon: <Ruler className="w-6 h-6" />,
  },
  {
    id: 'interactions',
    label: 'Interactions',
    description: 'Animation durations, easing curves, and motion preferences.',
    icon: <Zap className="w-6 h-6" />,
  },
  {
    id: 'syntax',
    label: 'Syntax',
    description: 'Code syntax highlighting colors for all three themes.',
    icon: <Code className="w-6 h-6" />,
  },
];

export function DesignTokensOverview({ onNavigate }: DesignTokensOverviewProps) {
  return (
    <SectionOverview
      title="Design Tokens"
      icon={<Palette className="w-12 h-12" />}
      description="Visual design atoms that define the foundation of the design system. All tokens support multi-theme switching and respect user preferences."
      badges={[
        { label: `${DESIGN_TOKENS.length} token categories`, variant: 'secondary' },
        { label: '3 themes', variant: 'outline' },
      ]}
      itemsHeading="Token Categories"
      items={DESIGN_TOKENS}
      onNavigate={onNavigate}
    />
  );
}
