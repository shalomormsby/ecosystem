'use client';

import { Sparkles, Palette, Type, Sliders, Settings } from 'lucide-react';
import { SectionOverview, type SectionOverviewItem } from './SectionOverview';

interface ThemesOverviewProps {
  onNavigate: (itemId: string) => void;
}

const THEMES_ITEMS: SectionOverviewItem[] = [
  {
    id: 'palettes',
    label: 'Color Palettes',
    description: 'Explore Studio, Terra, and Volt color palettes with light and dark modes.',
    icon: <Palette className="w-6 h-6" />,
  },
  {
    id: 'typography',
    label: 'Typography',
    description: 'Font families, weights, and typographic scales across all themes.',
    icon: <Type className="w-6 h-6" />,
  },
  {
    id: 'typography-playground',
    label: 'Typography Playground',
    description: 'Interactive tool to experiment with typography settings in real-time.',
    icon: <Sliders className="w-6 h-6" />,
  },
  {
    id: 'customizer',
    label: 'Customizer',
    description: 'Philosophy-embodying feature for user control over theme and motion preferences.',
    icon: <Settings className="w-6 h-6" />,
  },
];

export function ThemesOverview({ onNavigate }: ThemesOverviewProps) {
  return (
    <SectionOverview
      title="Themes"
      icon={<Sparkles className="w-12 h-12" />}
      description="Three distinct visual themes with unique personalities. Switch between light and dark modes, and customize your experience through the Customizer."
      badges={[
        { label: '3 themes', variant: 'secondary' },
        { label: 'Light + Dark', variant: 'outline' },
      ]}
      itemsHeading="Theme Features"
      items={THEMES_ITEMS}
      onNavigate={onNavigate}
    />
  );
}
