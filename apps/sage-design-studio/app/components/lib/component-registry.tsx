import { Button, Card, Code, Link, Badge, Avatar, Spinner, ProgressBar } from '@ecosystem/design-system';

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
        label: 'With Hover',
        props: { hoverEffect: true },
        children: 'Card content with hover effect',
      },
      {
        label: 'Without Hover',
        props: { hoverEffect: false },
        children: 'Card content without hover',
      },
    ],
  },

  Code: {
    component: Code,
    description: 'A semantic code wrapper with enhanced visual styling and automatic syntax highlighting. Features distinct treatments for inline (pale amber background) vs block code (cool gray background with copy-on-hover). Accessible contrast ratios (WCAG AA 4.5:1).',
    props: {
      syntax: {
        type: 'select',
        options: ['plain', 'comment', 'keyword', 'function', 'string', 'number', 'boolean', 'operator', 'property', 'className', 'tag', 'attribute', 'variable', 'punctuation'] as const,
        default: 'plain',
        description: 'Syntax highlighting type for the code',
      },
      inline: {
        type: 'boolean',
        default: true,
        description: 'Render as inline code (true) or block code (false)',
      },
      showCopy: {
        type: 'boolean',
        default: true,
        description: 'Show copy button for block code (appears on hover)',
      },
    },
    examples: [
      { label: 'Plain Text', props: { syntax: 'plain', inline: true }, children: 'example' },
      { label: 'Keyword', props: { syntax: 'keyword', inline: true }, children: 'const' },
      { label: 'Function', props: { syntax: 'function', inline: true }, children: 'useState()' },
      { label: 'String', props: { syntax: 'string', inline: true }, children: '"Hello World"' },
      { label: 'Number', props: { syntax: 'number', inline: true }, children: '42' },
      { label: 'Boolean', props: { syntax: 'boolean', inline: true }, children: 'true' },
      { label: 'Property', props: { syntax: 'property', inline: true }, children: 'backgroundColor' },
      { label: 'Class Name', props: { syntax: 'className', inline: true }, children: 'MyComponent' },
      { label: 'Comment', props: { syntax: 'comment', inline: true }, children: '// This is a comment' },
      { label: 'Block Code', props: { syntax: 'plain', inline: false }, children: 'const greeting = "Hello World";\nconsole.log(greeting);' },
      { label: 'Block with Copy', props: { syntax: 'keyword', inline: false, showCopy: true }, children: 'import { useState } from "react";' },
      { label: 'Block No Copy', props: { syntax: 'string', inline: false, showCopy: false }, children: '"No copy button on this block"' },
    ],
  },

  Link: {
    component: Link,
    description: 'Theme-aware link component with multiple style variants. Supports standalone and inline text link styles with accessible focus states.',
    props: {
      variant: {
        type: 'select',
        options: ['default', 'inline'] as const,
        default: 'default',
        description: 'Visual style variant: default for standalone links with background hover, inline for underlined text links',
      },
      hoverEffect: {
        type: 'boolean',
        default: true,
        description: 'Enable hover effect (only applies to default variant)',
      },
    },
    examples: [
      {
        label: 'Default',
        props: { variant: 'default', href: '#' },
        children: 'Default Link',
      },
      {
        label: 'Default No Hover',
        props: { variant: 'default', hoverEffect: false, href: '#' },
        children: 'No Hover Effect',
      },
      {
        label: 'Inline',
        props: { variant: 'inline', href: '#' },
        children: 'Inline Link',
      },
      {
        label: 'Inline in Text',
        props: { variant: 'inline', href: '#' },
        children: (
          <span className="text-[var(--color-text-secondary)]">
            This is some text with an <Link variant="inline" href="#">inline link</Link> embedded in it.
          </span>
        ),
      },
    ],
  },

  Badge: {
    component: Badge,
    description: 'A small label for displaying status, counts, or categorization with semantic color variants.',
    props: {
      variant: {
        type: 'select',
        options: ['default', 'primary', 'success', 'warning', 'error', 'info'] as const,
        default: 'default',
        description: 'Visual variant of the badge',
      },
      size: {
        type: 'select',
        options: ['sm', 'md', 'lg'] as const,
        default: 'md',
        description: 'Size of the badge',
      },
      dot: {
        type: 'boolean',
        default: false,
        description: 'Show animated dot indicator',
      },
    },
    examples: [
      { label: 'Default', props: { variant: 'default', size: 'md' }, children: 'Default' },
      { label: 'Primary', props: { variant: 'primary', size: 'md' }, children: 'Primary' },
      { label: 'Success', props: { variant: 'success', size: 'md' }, children: 'Active' },
      { label: 'Warning', props: { variant: 'warning', size: 'md' }, children: 'Pending' },
      { label: 'Error', props: { variant: 'error', size: 'md' }, children: 'Failed' },
      { label: 'With Dot', props: { variant: 'success', size: 'md', dot: true }, children: 'Live' },
      { label: 'Small Count', props: { variant: 'primary', size: 'sm' }, children: '99+' },
    ],
  },

  Avatar: {
    component: Avatar,
    description: 'A visual representation of a user or entity with image support, fallback initials, and status indicators.',
    props: {
      size: {
        type: 'select',
        options: ['xs', 'sm', 'md', 'lg', 'xl'] as const,
        default: 'md',
        description: 'Size of the avatar',
      },
      shape: {
        type: 'select',
        options: ['circle', 'square'] as const,
        default: 'circle',
        description: 'Shape of the avatar',
      },
      status: {
        type: 'select',
        options: ['online', 'offline', 'away', 'busy'] as const,
        default: 'online',
        description: 'Status indicator (optional)',
      },
    },
    examples: [
      { label: 'With Initials', props: { fallback: 'JD', size: 'md', shape: 'circle' }, children: null },
      { label: 'Online Status', props: { fallback: 'AB', size: 'md', status: 'online' }, children: null },
      { label: 'Busy Status', props: { fallback: 'CD', size: 'md', status: 'busy' }, children: null },
      { label: 'Square Shape', props: { fallback: 'EF', size: 'md', shape: 'square' }, children: null },
      { label: 'Large', props: { fallback: 'GH', size: 'lg', shape: 'circle' }, children: null },
      { label: 'Small', props: { fallback: 'IJ', size: 'sm', shape: 'circle' }, children: null },
    ],
  },

  Spinner: {
    component: Spinner,
    description: 'A loading indicator with smooth animation that respects motion preferences.',
    props: {
      size: {
        type: 'select',
        options: ['xs', 'sm', 'md', 'lg', 'xl'] as const,
        default: 'md',
        description: 'Size of the spinner',
      },
      variant: {
        type: 'select',
        options: ['primary', 'secondary', 'inherit'] as const,
        default: 'primary',
        description: 'Color variant',
      },
    },
    examples: [
      { label: 'Default', props: { size: 'md', variant: 'primary' }, children: null },
      { label: 'Secondary', props: { size: 'md', variant: 'secondary' }, children: null },
      { label: 'Small', props: { size: 'sm', variant: 'primary' }, children: null },
      { label: 'Large', props: { size: 'lg', variant: 'primary' }, children: null },
    ],
  },

  ProgressBar: {
    component: ProgressBar,
    description: 'A visual indicator of progress or completion with determinate and indeterminate modes.',
    props: {
      variant: {
        type: 'select',
        options: ['primary', 'success', 'warning', 'error', 'info'] as const,
        default: 'primary',
        description: 'Color variant',
      },
      size: {
        type: 'select',
        options: ['sm', 'md', 'lg'] as const,
        default: 'md',
        description: 'Size of the progress bar',
      },
      showLabel: {
        type: 'boolean',
        default: false,
        description: 'Show percentage label',
      },
    },
    examples: [
      { label: '25% Progress', props: { value: 25, variant: 'primary', size: 'md' }, children: null },
      { label: '50% with Label', props: { value: 50, variant: 'primary', size: 'md', showLabel: true }, children: null },
      { label: '75% Success', props: { value: 75, variant: 'success', size: 'md' }, children: null },
      { label: '100% Complete', props: { value: 100, variant: 'success', size: 'md', showLabel: true }, children: null },
      { label: 'Warning', props: { value: 40, variant: 'warning', size: 'md' }, children: null },
    ],
  },
};
