# Sage Design Studio

> **The heart of the ecosystem.** Interactive documentation for the `@sds/ui` web component library.

## Overview

Sage Design Studio is the living documentation for the **Sage Design System**—a high-performance, web-native component library built on **Radix UI** and **Tailwind CSS**. It serves as the single source of truth for designers and developers building applications in the ecosystem.

## Features

- **Interactive Component Playground**: Explore `@sds/ui` components with live prop controls.
- **Token Visualization**: See global design tokens (colors, typography) defined in `@sds/tokens`.
- **Theme Switching**: Preview components in Studio, Sage, and Volt themes.
- **Copy-Paste Workflow**: Integration guides for consuming the library in other Next.js apps.
- **Accessibility-First**: All components built on accessible Radix primitives.

## Development

### Running Locally

```bash
# From ecosystem root
pnpm dev

# Or specifically for this app
cd apps/sage-design-studio
pnpm dev
```

The Studio runs on **port 3001** by default.

## Architecture

### The "Sage Stack" (Web Edition)

The Studio is a standard **Next.js 15** application that consumes:
1.  **`@sds/ui`**: The React component library (exports `Button`, `Input`, etc.).
2.  **`@sds/tokens`**: The design token definitions.
3.  **`@sds/config`**: Shared Tailwind configurations.

### Design System Integration

The Studio imports components directly from the local workspace packages, ensuring that documentation always matches the code:

```typescript
import { Button, Input } from '@sds/ui';
// Styles are automatically applied via Tailwind content scanning
```

**Key Benefit**: Changes to `packages/ui` are instantly reflected in the Studio via HMR (Hot Module Replacement).

## Structure

```
app/
├── components/
│   ├── studio/
│   │   ├── StudioHero.tsx              # Landing section
│   │   ├── SectionNav.tsx              # Navigation tabs
│   │   ├── OverviewSection.tsx         # Philosophy & features
│   │   ├── TokensSection/              # Token visualization
│   │   │   ├── ColorsTab.tsx
│   │   │   └── TypographyTab.tsx
│   │   └── ComponentsSection/          # Component playground
│   │       ├── ComponentPlayground.tsx
│   │       └── CodeSnippet.tsx
│   ├── lib/
│   │   ├── component-registry.ts       # Atom metadata
│   │   └── molecule-registry.ts        # Molecule metadata
│   └── JsonLdMetadata.tsx              # JSON-LD injection component
├── lib/
│   └── metadata-generator.ts           # LLM metadata utilities
├── globals.css
├── layout.tsx
└── page.tsx
```

## Adding New Components

To add a new component to the playground:

1. **Register it** in `app/components/lib/component-registry.ts` (Atoms) or `molecule-registry.ts` (Molecules):

```typescript
export const componentRegistry: Record<string, ComponentConfig> = {
  // ... existing components

  YourComponent: {
    component: YourComponent,
    description: 'Description of what this component does',
    props: {
      propName: {
        type: 'select', // or 'boolean' | 'text' | 'array' | 'object' | 'interface' | 'custom'
        options: ['option1', 'option2'],
        default: 'option1',
        description: 'What this prop controls',
        required: false, // Mark true for required props
        typeDefinition: 'string', // TypeScript type string for complex types
      },
    },
    examples: [
      { label: 'Default', props: { propName: 'option1' } },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: '<YourComponent propName="option1" />',
        description: 'Simple example showing default usage',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/design-system/atoms/YourComponent/YourComponent.tsx',
    accessibilityNotes: [
      'Uses semantic HTML elements',
      'Keyboard navigable with Tab/Enter',
      'Screen reader accessible with proper ARIA attributes',
    ],
  },
};
```

2. **It will automatically appear** in the Components section with full documentation, JSON-LD metadata, and accessibility notes!

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Components**: `@ecosystem/design-system`
- **State**: React hooks + design system's Zustand stores
- **Code Highlighting**: Shiki (planned for Phase 2)

## Roadmap

### Phase 1-7 (Documentation Overhaul) ✅ COMPLETE
- ✅ Enhanced registry type system for complex prop types
- ✅ Code examples integration with CollapsibleCodeBlock
- ✅ PageLayout organism for composition patterns
- ✅ Breadcrumb generation utilities and global integration
- ✅ Complete documentation audit (all components)
- ✅ LLM optimization with JSON-LD structured data
- ✅ Accessibility notes for all components
- ✅ GitHub source links for all components

See [PHASE-7-COMPLETION.md](./docs/PHASE-7-COMPLETION.md) for full details.

### Phase 8 (Enhancement)
- Search/filter functionality
- Responsive preview modes
- Component usage analytics
- Version comparison tools

### Phase 9 (Expansion)
- Brand guidelines section
- Product design resources
- Template downloads
- Figma integration

### Phase 10 (Productization)
- Premium templates
- Design kits
- Community contributions
- Licensing options

## Related Documentation

### Design System Documentation

The Sage Design Studio documents and showcases the design system. For comprehensive information about the design system itself:

**For Users (Building with the Design System):**
- [Usage Guide](../../design-system/docs/USAGE_GUIDE.md) - Complete guide to using components, component-first philosophy, patterns, and examples

**For Contributors (Extending the Design System):**
- [Component Workflow](../../design-system/docs/COMPONENT_WORKFLOW.md) - How to create/modify components
- [Architecture Guide](../../design-system/docs/ARCHITECTURE-GUIDE.md) - Where code belongs (design system vs. apps)

**For Troubleshooting:**
- [Unresolved Issues](../../design-system/docs/UNRESOLVED_ISSUES.md) - Current known issues with full context

**Strategic & Philosophy:**
- [Sage Design Studio Strategy](../../design-system/docs/SAGE-DESIGN-STUDIO.md) - Strategic vision for this documentation platform
- [Design System README](../../design-system/README.md) - Design system overview and API reference
- [Design Philosophy](/DESIGN-PHILOSOPHY.md) - Core principles and values

### Studio-Specific Documentation

- [PHASE-7-COMPLETION.md](./docs/PHASE-7-COMPLETION.md) - Documentation overhaul completion details
- [CHANGELOG.md](./CHANGELOG.md) - Version history and changes

---

**Built with ❤️ as part of the ecosystem**
