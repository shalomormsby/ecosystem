'use client';

import { Wrench, CreditCard, BarChart3, Sparkles } from 'lucide-react';
import { SectionOverview, type SectionOverviewItem } from './SectionOverview';

interface ToolsOverviewProps {
  onNavigate: (itemId: string) => void;
}

const TOOLS_ITEMS: SectionOverviewItem[] = [
  {
    id: 'brand-builder',
    label: 'Brand Builder',
    description: 'Interactive brand identity creation tool. Design logos, colors, and export as SVG or CSS.',
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    id: 'open-graph-card',
    label: 'Open Graph Card',
    description: 'Generate social media preview cards with customizable styles.',
    icon: <CreditCard className="w-6 h-6" />,
  },
  {
    id: 'charts',
    label: 'Charts',
    description: 'Data visualization components including area, bar, line, and pie charts.',
    icon: <BarChart3 className="w-6 h-6" />,
  },
];

export function ToolsOverview({ onNavigate }: ToolsOverviewProps) {
  return (
    <SectionOverview
      title="Tools"
      icon={<Wrench className="w-12 h-12" />}
      description="Interactive utilities and specialized components for building, designing, and visualizing. These tools combine multiple design system components into powerful features."
      badges={[
        { label: `${TOOLS_ITEMS.length} tools`, variant: 'secondary' },
      ]}
      itemsHeading="Available Tools"
      items={TOOLS_ITEMS}
      onNavigate={onNavigate}
    />
  );
}
