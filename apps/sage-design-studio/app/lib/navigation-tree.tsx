import { BookOpen, Palette, Component, Webhook, LayoutTemplate } from 'lucide-react';

export interface NavigationItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: NavigationItem[];
  section?: string; // Maps to Section type for navigation
}

export const navigationTree: NavigationItem[] = [
  {
    id: 'getting-started',
    label: 'Getting Started',
    icon: <BookOpen className="w-4 h-4" />,
    children: [
      {
        id: 'overview',
        label: 'Overview',
        section: 'overview',
      },
      {
        id: 'architecture',
        label: 'Architecture',
        section: 'architecture',
      },
      {
        id: 'adding-components',
        label: 'Adding Components',
        children: [
          {
            id: 'methodology',
            label: 'Methodology',
            section: 'adding-components',
          },
          {
            id: 'modifying',
            label: 'Modifying',
            section: 'adding-components',
          },
          {
            id: 'troubleshooting',
            label: 'Troubleshooting',
            section: 'adding-components',
          },
        ],
      },
      {
        id: 'common-patterns',
        label: 'Common Patterns',
        section: 'common-patterns',
      },
      {
        id: 'contributing',
        label: 'Contributing',
        section: 'contributing',
      },
    ],
  },
  {
    id: 'foundations',
    label: 'Design Tokens',
    icon: <Palette className="w-4 h-4" />,
    children: [
      {
        id: 'colors',
        label: 'Colors',
        section: 'tokens',
      },
      {
        id: 'typography',
        label: 'Typography',
        section: 'tokens',
      },
      {
        id: 'spacing',
        label: 'Spacing',
        section: 'tokens',
      },
      {
        id: 'syntax',
        label: 'Syntax',
        section: 'tokens',
      },
      {
        id: 'motion',
        label: 'Motion',
        children: [
          {
            id: 'motion-foundations',
            label: 'Foundations',
            section: 'motion',
          },
          {
            id: 'text-effects',
            label: 'Text Effects',
            section: 'motion',
          },
          {
            id: 'scroll',
            label: 'Scroll',
            section: 'motion',
          },
          {
            id: 'loading',
            label: 'Loading',
            section: 'motion',
          },
          {
            id: 'interactive',
            label: 'Interactive',
            section: 'motion',
          },
          {
            id: 'transitions',
            label: 'Transitions',
            section: 'motion',
          },
          {
            id: 'cursor-effects',
            label: 'Cursor Effects',
            section: 'motion',
          },
        ],
      },
    ],
  },
  {
    id: 'components',
    label: 'Components',
    icon: <Component className="w-4 h-4" />,
    children: [
      {
        id: 'actions',
        label: 'Actions',
        children: [
          { id: 'button', label: 'Button', section: 'atoms' },
          { id: 'toggle', label: 'Toggle', section: 'atoms' },
          { id: 'toggle-group', label: 'Toggle Group', section: 'atoms' },
        ],
      },
      {
        id: 'forms',
        label: 'Forms',
        children: [
          { id: 'checkbox', label: 'Checkbox', section: 'atoms' },
          { id: 'combobox', label: 'Combobox', section: 'atoms' },
          { id: 'form', label: 'Form', section: 'atoms' },
          { id: 'input', label: 'Input', section: 'atoms' },
          { id: 'input-otp', label: 'Input OTP', section: 'atoms' },
          { id: 'label', label: 'Label', section: 'atoms' },
          { id: 'radio-group', label: 'Radio Group', section: 'atoms' },
          { id: 'select', label: 'Select', section: 'atoms' },
          { id: 'slider', label: 'Slider', section: 'atoms' },
          { id: 'switch', label: 'Switch', section: 'atoms' },
          { id: 'textarea', label: 'Textarea', section: 'atoms' },
        ],
      },
      {
        id: 'navigation',
        label: 'Navigation',
        children: [
          { id: 'breadcrumb', label: 'Breadcrumb', section: 'atoms' },
          { id: 'command', label: 'Command', section: 'atoms' },
          { id: 'menubar', label: 'Menubar', section: 'atoms' },
          { id: 'navigation-menu', label: 'Navigation Menu', section: 'atoms' },
          { id: 'pagination', label: 'Pagination', section: 'atoms' },
          { id: 'tabs', label: 'Tabs', section: 'atoms' },
        ],
      },
      {
        id: 'overlays',
        label: 'Overlays',
        children: [
          { id: 'alert-dialog', label: 'Alert Dialog', section: 'atoms' },
          { id: 'context-menu', label: 'Context Menu', section: 'atoms' },
          { id: 'dialog', label: 'Dialog', section: 'atoms' },
          { id: 'drawer', label: 'Drawer', section: 'atoms' },
          { id: 'dropdown-menu', label: 'Dropdown Menu', section: 'atoms' },
          { id: 'hover-card', label: 'Hover Card', section: 'atoms' },
          { id: 'popover', label: 'Popover', section: 'atoms' },
          { id: 'sheet', label: 'Sheet', section: 'atoms' },
          { id: 'tooltip', label: 'Tooltip', section: 'atoms' },
        ],
      },
      {
        id: 'feedback',
        label: 'Feedback',
        children: [
          { id: 'alert', label: 'Alert', section: 'atoms' },
          { id: 'progress', label: 'Progress', section: 'atoms' },
          { id: 'skeleton', label: 'Skeleton', section: 'atoms' },
          { id: 'sonner', label: 'Sonner', section: 'atoms' },
          { id: 'toaster', label: 'Toaster', section: 'atoms' },
        ],
      },
      {
        id: 'data-display',
        label: 'Data Display',
        children: [
          { id: 'avatar', label: 'Avatar', section: 'atoms' },
          { id: 'badge', label: 'Badge', section: 'atoms' },
          { id: 'calendar', label: 'Calendar', section: 'atoms' },
          { id: 'card', label: 'Card', section: 'atoms' },
          { id: 'data-table', label: 'Data Table', section: 'atoms' },
          { id: 'table', label: 'Table', section: 'atoms' },
        ],
      },
      {
        id: 'layout',
        label: 'Layout',
        children: [
          { id: 'accordion', label: 'Accordion', section: 'atoms' },
          { id: 'aspect-ratio', label: 'Aspect Ratio', section: 'atoms' },
          { id: 'carousel', label: 'Carousel', section: 'atoms' },
          { id: 'collapsible', label: 'Collapsible', section: 'atoms' },
          { id: 'date-picker', label: 'Date Picker', section: 'atoms' },
          { id: 'resizable', label: 'Resizable', section: 'atoms' },
          { id: 'scroll-area', label: 'Scroll Area', section: 'atoms' },
          { id: 'separator', label: 'Separator', section: 'atoms' },
        ],
      },
    ],
  },
  {
    id: 'patterns',
    label: 'Patterns',
    icon: <LayoutTemplate className="w-4 h-4" />,
    children: [
      {
        id: 'app-shell',
        label: 'App Shell',
        children: [
          { id: 'page-layout', label: 'Page Layout', section: 'organisms' },
          { id: 'primary-nav', label: 'Primary Nav', section: 'organisms' },
          { id: 'secondary-nav', label: 'Secondary Nav', section: 'organisms' },
          { id: 'footer', label: 'Footer', section: 'organisms' },
        ],
      },
      {
        id: 'customization',
        label: 'Customization',
        children: [
          { id: 'customizer', label: 'Customizer', section: 'organisms' },
          { id: 'theme-toggle', label: 'Theme Toggle', section: 'molecules' },
        ],
      },
      {
        id: 'code',
        label: 'Code',
        children: [
          { id: 'collapsible-code-block', label: 'Code Block', section: 'organisms' },
        ],
      },
    ],
  },
  {
    id: 'templates',
    label: 'Templates',
    icon: <LayoutTemplate className="w-4 h-4" />,
    children: [
      {
        id: 'templates-overview',
        label: 'Overview',
        section: 'templates',
      },
      {
        id: 'page-template',
        label: 'Page Template',
        section: 'templates',
      },
    ],
  },
  {
    id: 'hooks',
    label: 'Hooks',
    icon: <Webhook className="w-4 h-4" />,
    children: [
      {
        id: 'use-form',
        label: 'useForm',
        section: 'hooks',
      },
      {
        id: 'use-theme',
        label: 'useTheme',
        section: 'hooks',
      },
      {
        id: 'use-toast',
        label: 'useToast',
        section: 'hooks',
      },
      {
        id: 'use-motion-preference',
        label: 'useMotionPreference',
        section: 'hooks',
      },
    ],
  },
];
