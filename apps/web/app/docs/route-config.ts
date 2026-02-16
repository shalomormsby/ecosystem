import type { RouteConfig } from '@thesage/ui';

export type Section =
  | 'getting-started'
  | 'overview'
  | 'architecture'
  | 'adding-components'
  | 'common-patterns'
  | 'contributing'
  | 'mcp-server'
  | 'tokens'
  | 'themes'
  | 'components'
  | 'actions'
  | 'forms'
  | 'navigation'
  | 'overlays'
  | 'feedback'
  | 'data-display'
  | 'layout'
  | 'blocks'
  | 'hooks'
  | 'templates'
  | 'charts'
  | 'motion'
  | 'tools';

export const VALID_SECTIONS: Section[] = [
  'getting-started', 'overview', 'architecture', 'adding-components',
  'common-patterns', 'contributing', 'mcp-server', 'tokens', 'themes',
  'components', 'actions', 'forms', 'navigation', 'overlays', 'feedback',
  'data-display', 'layout', 'blocks', 'hooks', 'templates', 'charts',
  'motion', 'tools',
];

export const COMPONENT_CATEGORIES: Section[] = [
  'actions', 'forms', 'navigation', 'overlays', 'feedback', 'data-display', 'layout',
];

/** Maps section → valid child items (for sections that have sub-pages) */
export const SECTION_ITEMS: Record<string, string[]> = {
  'adding-components': ['methodology', 'modifying', 'troubleshooting'],
  'mcp-server': ['installation', 'tools', 'usage', 'troubleshooting'],
  tokens: ['colors', 'typography', 'spacing', 'syntax', 'motion'],
  themes: ['palettes', 'customizer'],
  actions: ['button', 'toggle', 'toggle-group'],
  forms: [
    'checkbox', 'combobox', 'drag-drop', 'file-upload', 'form', 'input',
    'input-otp', 'label', 'radio-group', 'select', 'slider', 'switch', 'textarea',
    'theme-toggle',
  ],
  navigation: ['breadcrumb', 'command', 'menubar', 'navigation-menu', 'pagination', 'tabs'],
  overlays: [
    'alert-dialog', 'context-menu', 'dialog', 'drawer', 'dropdown-menu',
    'hover-card', 'notification-center', 'popover', 'sheet', 'tooltip',
  ],
  feedback: ['alert', 'empty-state', 'stepper', 'progress', 'skeleton', 'sonner', 'toaster'],
  'data-display': [
    'avatar', 'badge', 'calendar', 'card', 'data-table',
    'stat-card', 'timeline', 'tree-view', 'table',
  ],
  layout: [
    'accordion', 'aspect-ratio', 'carousel', 'collapsible', 'date-picker',
    'resizable', 'scroll-area', 'separator', 'sidebar',
  ],
  blocks: [
    'page-layout', 'primary-nav', 'secondary-nav', 'footer',
    'customizer', 'collapsible-code-block',
  ],
  templates: ['page-template'],
  charts: ['overview', 'area-chart', 'bar-chart', 'line-chart', 'pie-chart'],
  motion: ['text-effects', 'scroll', 'loading', 'interactive', 'transitions', 'cursor-effects'],
  tools: ['brand-builder', 'open-graph-card', 'charts'],
};

/** Section aliases for backwards-compatibility redirects */
export const SECTION_ALIASES: Record<string, string> = {
  'resources': 'templates',
  'quick-start': 'overview',
};

// Route configuration for breadcrumb labels
export const routeConfig: RouteConfig = {
  'getting-started': {
    label: 'Getting Started',
    children: {
      architecture: { label: 'Architecture' },
      'adding-components': { label: 'Adding Components' },
      'common-patterns': { label: 'Common Patterns' },
      contributing: { label: 'Contributing' },
    },
  },
  overview: { label: 'Overview' },
  architecture: { label: 'Architecture' },
  'adding-components': {
    label: 'Adding Components',
    children: {
      methodology: { label: 'Methodology' },
      modifying: { label: 'Modifying Components' },
      troubleshooting: { label: 'Troubleshooting' },
    },
  },
  'common-patterns': { label: 'Common Patterns' },
  contributing: { label: 'Contributing' },
  'mcp-server': {
    label: 'MCP Server',
    children: {
      installation: { label: 'Installation' },
      tools: { label: 'Available Tools' },
      usage: { label: 'Usage Guide' },
      troubleshooting: { label: 'Troubleshooting' },
    },
  },
  tokens: {
    label: 'Design Tokens',
    children: {
      colors: { label: 'Colors' },
      typography: { label: 'Typography' },
      spacing: { label: 'Spacing' },
      syntax: { label: 'Syntax' },
      motion: { label: 'Motion' },
    },
  },
  themes: {
    label: 'Themes',
    children: {
      palettes: { label: 'Palettes' },
      customizer: { label: 'Customizer' },
    },
  },
  components: { label: 'Components' },
  actions: {
    label: 'Actions',
    children: {
      button: { label: 'Button' },
      toggle: { label: 'Toggle' },
      'toggle-group': { label: 'Toggle Group' },
    },
  },
  forms: {
    label: 'Forms',
    children: {
      checkbox: { label: 'Checkbox' },
      combobox: { label: 'Combobox' },
      'drag-drop': { label: 'Drag & Drop' },
      'file-upload': { label: 'File Upload' },
      form: { label: 'Form' },
      input: { label: 'Input' },
      'input-otp': { label: 'Input OTP' },
      label: { label: 'Label' },
      'radio-group': { label: 'Radio Group' },
      select: { label: 'Select' },
      slider: { label: 'Slider' },
      switch: { label: 'Switch' },
      textarea: { label: 'Textarea' },
      'theme-toggle': { label: 'Theme Toggle' },
    },
  },
  navigation: {
    label: 'Navigation',
    children: {
      breadcrumb: { label: 'Breadcrumb' },
      command: { label: 'Command' },
      menubar: { label: 'Menubar' },
      'navigation-menu': { label: 'Navigation Menu' },
      pagination: { label: 'Pagination' },
      tabs: { label: 'Tabs' },
    },
  },
  overlays: {
    label: 'Overlays',
    children: {
      'alert-dialog': { label: 'Alert Dialog' },
      'context-menu': { label: 'Context Menu' },
      dialog: { label: 'Dialog' },
      drawer: { label: 'Drawer' },
      'dropdown-menu': { label: 'Dropdown Menu' },
      'hover-card': { label: 'Hover Card' },
      'notification-center': { label: 'Notification Center' },
      popover: { label: 'Popover' },
      sheet: { label: 'Sheet' },
      tooltip: { label: 'Tooltip' },
    },
  },
  feedback: {
    label: 'Feedback',
    children: {
      alert: { label: 'Alert' },
      'empty-state': { label: 'Empty State' },
      stepper: { label: 'Stepper' },
      progress: { label: 'Progress' },
      skeleton: { label: 'Skeleton' },
      sonner: { label: 'Sonner' },
      toaster: { label: 'Toaster' },
    },
  },
  'data-display': {
    label: 'Data Display',
    children: {
      avatar: { label: 'Avatar' },
      badge: { label: 'Badge' },
      calendar: { label: 'Calendar' },
      card: { label: 'Card' },
      'data-table': { label: 'Data Table' },
      'stat-card': { label: 'Stat Card' },
      timeline: { label: 'Timeline' },
      'tree-view': { label: 'Tree View' },
      table: { label: 'Table' },
    },
  },
  layout: {
    label: 'Layout',
    children: {
      accordion: { label: 'Accordion' },
      'aspect-ratio': { label: 'Aspect Ratio' },
      carousel: { label: 'Carousel' },
      collapsible: { label: 'Collapsible' },
      'date-picker': { label: 'Date Picker' },
      resizable: { label: 'Resizable' },
      'scroll-area': { label: 'Scroll Area' },
      separator: { label: 'Separator' },
      sidebar: { label: 'Sidebar' },
    },
  },
  blocks: {
    label: 'Blocks',
    children: {
      'page-layout': { label: 'Page Layout' },
      'primary-nav': { label: 'Primary Nav' },
      'secondary-nav': { label: 'Secondary Nav' },
      footer: { label: 'Footer' },
      customizer: { label: 'Customizer' },
      'collapsible-code-block': { label: 'Code Block' },
    },
  },
  hooks: { label: 'Hooks' },
  templates: {
    label: 'Templates',
    children: {
      'page-template': { label: 'Page Template' },
    },
  },
  charts: {
    label: 'Charts',
    children: {
      overview: { label: 'Overview' },
      'area-chart': { label: 'Area Chart' },
      'bar-chart': { label: 'Bar Chart' },
      'line-chart': { label: 'Line Chart' },
      'pie-chart': { label: 'Pie Chart' },
    },
  },
  motion: {
    label: 'Motion System',
    children: {
      'text-effects': { label: 'Text Effects' },
      scroll: { label: 'Scroll Animations' },
      loading: { label: 'Loading States' },
      interactive: { label: 'Interactive Effects' },
      transitions: { label: 'Transitions' },
      'cursor-effects': { label: 'Cursor Effects' },
    },
  },
  tools: {
    label: 'Tools',
    children: {
      'brand-builder': { label: 'Brand Builder' },
      'open-graph-card': { label: 'Open Graph Card' },
      charts: { label: 'Charts' },
    },
  },
};

/** Convert a section slug to a human-readable label */
export function sectionLabel(slug: string): string {
  const config = routeConfig[slug];
  if (config) return config.label;
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

/** Convert an item slug to a human-readable label within a section */
export function itemLabel(section: string, item: string): string {
  const config = routeConfig[section];
  if (config?.children?.[item]) return config.children[item].label;
  return item.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}
