import { Button, Card } from '@ecosystem/design-system';

export interface PropConfig {
  type: 'select' | 'boolean' | 'text';
  options?: readonly string[];
  default: any;
  description?: string;
}

export interface ComponentConfig {
  component: React.ComponentType<any>;
  description: string;
  props: Record<string, PropConfig>;
  examples: Array<{
    label: string;
    props: Record<string, any>;
    children?: React.ReactNode;
  }>;
}

export const componentRegistry: Record<string, ComponentConfig> = {
  Button: {
    component: Button,
    description: 'Interactive button component with multiple variants and sizes. Supports keyboard navigation and respects motion preferences.',
    props: {
      variant: {
        type: 'select',
        options: ['primary', 'secondary', 'ghost'] as const,
        default: 'primary',
        description: 'Visual style variant',
      },
      size: {
        type: 'select',
        options: ['sm', 'md', 'lg'] as const,
        default: 'md',
        description: 'Size variant',
      },
    },
    examples: [
      { label: 'Primary', props: { variant: 'primary', size: 'md' }, children: 'Click me' },
      { label: 'Secondary', props: { variant: 'secondary', size: 'md' }, children: 'Secondary' },
      { label: 'Ghost', props: { variant: 'ghost', size: 'md' }, children: 'Ghost' },
      { label: 'Large Primary', props: { variant: 'primary', size: 'lg' }, children: 'Large Button' },
      { label: 'Small Secondary', props: { variant: 'secondary', size: 'sm' }, children: 'Small' },
    ],
  },

  Card: {
    component: Card,
    description: 'Container component with glass-morphism styling and optional hover effects. Uses theme-aware borders and shadows.',
    props: {
      hoverEffect: {
        type: 'boolean',
        default: true,
        description: 'Enable hover lift and shadow effect',
      },
    },
    examples: [
      {
        label: 'Default',
        props: { hoverEffect: true },
        children: (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">Card Title</h3>
            <p className="text-sm">This is a card with hover effects enabled.</p>
          </div>
        ),
      },
      {
        label: 'No Hover',
        props: { hoverEffect: false },
        children: (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">Static Card</h3>
            <p className="text-sm">This card has hover effects disabled.</p>
          </div>
        ),
      },
    ],
  },
};
