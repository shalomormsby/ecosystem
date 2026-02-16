/**
 * Component Registry - Source of Truth
 *
 * This file serves as the authoritative source for component counts,
 * categories, and organization. Used by:
 * - Documentation (Sage Studio)
 * - MCP Server registry
 * - Marketing materials
 * - Internal tooling
 *
 * ⚠️ IMPORTANT: When adding a new component, follow the complete workflow:
 * See: /.agent/workflows/register-new-component.md
 *
 * The workflow includes:
 * - Creating the component in packages/ui
 * - Registering in Sage Studio (apps/web)
 * - Updating THIS registry file
 * - Updating MCP server registry
 * - Version bumping and npm publishing
 *
 * Last Updated: 2026-02-15
 */

export const BRAND = {
  productName: 'Sage Design Engine',
  productNameShort: 'Sage',
  themeNames: {
    organic: 'Terra',
    technical: 'Volt',
    neutral: 'Studio',
  },
  tagline: "The Solopreneur's Development Stack",
  mission: 'AI-Native components for velocity',
} as const;

export const COMPONENT_REGISTRY = {
  /**
   * Total count of all exported UI components from @thesage/ui
   */
  totalCount: 96,

  /**
   * Core categories following functional organization pattern
   * (what components DO, not abstract hierarchy)
   */
  coreCategories: {
    actions: {
      count: 5,
      description: 'Components that trigger behavior',
      examples: ['Button', 'Link', 'Toggle', 'ToggleGroup', 'Magnetic'],
    },
    forms: {
      count: 19,
      description: 'Components that collect user input',
      examples: ['Input', 'Select', 'Checkbox', 'Switch', 'Textarea', 'ColorPicker', 'SearchBar', 'FileUpload'],
    },
    navigation: {
      count: 10,
      description: 'Components that help users move through content',
      examples: ['Tabs', 'Breadcrumb', 'Pagination', 'NavigationMenu', 'Command'],
    },
    overlays: {
      count: 12,
      description: 'Components that display contextual content',
      examples: ['Dialog', 'Tooltip', 'Popover', 'Drawer', 'Modal', 'Sheet', 'NotificationCenter'],
    },
    feedback: {
      count: 9,
      description: 'Components that communicate system state',
      examples: ['Alert', 'Toast', 'Progress', 'Spinner', 'Skeleton', 'EmptyState', 'Stepper'],
    },
    'data-display': {
      count: 19,
      description: 'Components that present information',
      examples: ['Card', 'Table', 'Badge', 'Avatar', 'Heading', 'Text', 'Code', 'Calendar', 'StatCard', 'Timeline', 'TreeView'],
    },
    layout: {
      count: 17,
      description: 'Components for spatial organization',
      examples: ['Accordion', 'Separator', 'Stack', 'Grid', 'Container', 'ScrollArea'],
    },
  },

  /**
   * Specialty categories for advanced interactions and effects
   */
  specialtyCategories: {
    backgrounds: {
      count: 2,
      description: 'Animated background effects',
      examples: ['WarpBackground', 'FaultyTerminal'],
    },
    cursor: {
      count: 2,
      description: 'Interactive cursor effects',
      examples: ['SplashCursor', 'TargetCursor'],
    },
    blocks: {
      count: 1,
      description: 'Composed page blocks',
      examples: ['Hero', 'OpenGraphCard'],
    },
  },

  /**
   * Supporting APIs (not counted as components)
   */
  supportingAPIs: {
    providers: ['ThemeProvider'],
    hooks: ['useTheme', 'useMotionPreference', 'useForm'],
    utilities: ['animations', 'breadcrumbs', 'colors', 'utils', 'validation', 'syntax-parser'],
    stores: ['themeStore', 'customizerStore'],
  },
} as const;

/**
 * Computed totals
 */
export const COMPONENT_COUNTS = {
  core: Object.values(COMPONENT_REGISTRY.coreCategories).reduce(
    (sum, cat) => sum + cat.count,
    0
  ), // 84
  specialty: Object.values(COMPONENT_REGISTRY.specialtyCategories).reduce(
    (sum, cat) => sum + cat.count,
    0
  ), // 5
  total: COMPONENT_REGISTRY.totalCount, // 89
} as const;

/**
 * Marketing-friendly descriptions
 */
export const MARKETING_COPY = {
  short: '96 production-ready components',
  medium: '96 components across 7 core categories, plus specialty backgrounds and motion effects',
  long: '96 thoughtfully designed components organized by function: actions, forms, navigation, overlays, feedback, data display, and layout—plus specialty components for backgrounds, cursor interactions, and animated effects.',
} as const;

/**
 * Documentation usage examples
 */
export const DOC_EXAMPLES = {
  // For overview sections
  overview: `${COMPONENT_COUNTS.total} components across ${Object.keys(COMPONENT_REGISTRY.coreCategories).length
    } core categories`,

  // For detailed breakdowns
  breakdown: `
- **Actions** (${COMPONENT_REGISTRY.coreCategories.actions.count}): ${COMPONENT_REGISTRY.coreCategories.actions.description}
- **Forms** (${COMPONENT_REGISTRY.coreCategories.forms.count}): ${COMPONENT_REGISTRY.coreCategories.forms.description}
- **Navigation** (${COMPONENT_REGISTRY.coreCategories.navigation.count}): ${COMPONENT_REGISTRY.coreCategories.navigation.description}
- **Overlays** (${COMPONENT_REGISTRY.coreCategories.overlays.count}): ${COMPONENT_REGISTRY.coreCategories.overlays.description}
- **Feedback** (${COMPONENT_REGISTRY.coreCategories.feedback.count}): ${COMPONENT_REGISTRY.coreCategories.feedback.description}
- **Data Display** (${COMPONENT_REGISTRY.coreCategories['data-display'].count}): ${COMPONENT_REGISTRY.coreCategories['data-display'].description}
- **Layout** (${COMPONENT_REGISTRY.coreCategories.layout.count}): ${COMPONENT_REGISTRY.coreCategories.layout.description}
  `.trim(),
} as const;

/**
 * Decision Documentation: Why these numbers?
 *
 * **What counts as a component:**
 * - Any UI element exported from packages/ui/src/index.ts
 * - Follows React component pattern (returns JSX)
 * - Can be imported and used directly
 *
 * **What doesn't count:**
 * - Providers (utility, not UI)
 * - Hooks (utility, not UI)
 * - Utility functions
 * - Type definitions
 *
 * **Category philosophy:**
 * - Functional organization (what it DOES, not what it IS)
 * - Industry standard (matches Material UI, Radix patterns)
 * - No arbitrary tiers - if exported, it's official
 *
 * **Maintenance:**
 * - Update this file when adding/removing components
 * - Run: grep -c "^export \* from './components/" packages/ui/src/index.ts
 * - Verify count matches COMPONENT_REGISTRY.totalCount
 */
