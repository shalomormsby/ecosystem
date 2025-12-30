# Design System Architecture Guide

> **Critical Reading for LLMs and Developers**
> This document clarifies the separation between the design system package and documentation components to prevent architectural violations.

---

## 🎯 Core Principle

**The design system package exports reusable primitives. The studio app exports documentation.**

Understanding this distinction is critical to maintaining clean architecture.

---

## 📦 Two Separate Concerns

### 1. Design System Package (`design-system/`)

**Purpose**: Reusable component library consumed by all apps

**What Belongs Here**:
- ✅ Reusable UI components (Button, Card, Header)
- ✅ Design token definitions (colors, spacing, typography values)
- ✅ Hooks that apps will use (useTheme, useMotionPreference)
- ✅ Providers (ThemeProvider)
- ✅ Utility functions used by components

**What Does NOT Belong Here**:
- ❌ Documentation components (ColorsTab, TypographyTab, MotionTab)
- ❌ Interactive playgrounds or demo components
- ❌ Component registries or metadata for documentation
- ❌ Studio-specific UI (section navigation, code snippets)

**Public API** (`@ecosystem/design-system`):
```typescript
// ✅ Apps import these:
import { Button, Card, Header } from '@ecosystem/design-system';
import { useTheme } from '@ecosystem/design-system/hooks';
import { studioTokens } from '@ecosystem/design-system/tokens';
```

**Package Structure**:
```
design-system/
├── atoms/          # Primitive components
├── molecules/      # Simple compositions
├── organisms/      # Complex components
├── tokens/         # Token DEFINITIONS ONLY (no React components)
│   ├── base.ts     # ✅ Token values
│   ├── studio.ts   # ✅ Theme definitions
│   └── colors.json # ✅ Color data
├── hooks/          # Reusable hooks
├── providers/      # Context providers
├── features/       # Features like customizer
└── docs/           # Internal documentation (not React components)
```

---

### 2. Studio App (`apps/sage-design-studio/`)

**Purpose**: Interactive documentation and showcase for the design system

**What Belongs Here**:
- ✅ Documentation components (ColorsTab, TypographyTab, MotionTab)
- ✅ Interactive playgrounds (ComponentPlayground)
- ✅ Component registries for documentation
- ✅ Code snippet generators
- ✅ Section navigation UI
- ✅ Demo-specific components

**NOT a Public API**:
- Studio components are NOT exported to other apps
- Studio-specific components stay in the studio app

**App Structure**:
```
apps/sage-design-studio/
├── app/
│   ├── components/
│   │   ├── lib/
│   │   │   └── component-registry.tsx  # ✅ Documentation metadata
│   │   └── studio/
│   │       ├── TokensSection/
│   │       │   ├── index.tsx
│   │       │   ├── ColorsTab.tsx       # ✅ Doc component
│   │       │   ├── TypographyTab.tsx   # ✅ Doc component
│   │       │   ├── SpacingTab.tsx      # ✅ Doc component
│   │       │   └── MotionTab.tsx       # ✅ Doc component
│   │       ├── ComponentsSection/
│   │       ├── MoleculesSection.tsx
│   │       └── OrganismsSection.tsx
│   ├── page.tsx
│   └── globals.css
└── package.json
```

---

## 🚨 Common Mistakes & How to Avoid Them

### ❌ Mistake #1: Putting Documentation Components in `design-system/tokens/`

**What Happened (Gemini's Confusion)**:
```
design-system/tokens/MotionTab.tsx  ❌ WRONG LOCATION
```

**Why This is Wrong**:
- `tokens/` directory is for token DEFINITIONS (JavaScript/TypeScript objects)
- `MotionTab.tsx` is a React component that DOCUMENTS those tokens
- This pollutes the design system's public API with documentation code
- Apps that install the design system get documentation bloat

**Correct Location**:
```
apps/sage-design-studio/app/components/studio/TokensSection/MotionTab.tsx  ✅ CORRECT
```

**Rule**: If it's a React component that shows/explains tokens, it belongs in the studio app, NOT in the `tokens/` directory.

---

### ❌ Mistake #2: Exporting Documentation Components from Design System

**Wrong**:
```typescript
// design-system/tokens/index.ts
export * from './MotionTab';  // ❌ NO! This is a doc component
```

**Correct**:
```typescript
// design-system/tokens/index.ts
export * from './base';       // ✅ Token definitions
export * from './studio';     // ✅ Token definitions
export * from './typography'; // ✅ Token definitions
// Do NOT export React documentation components here
```

**Rule**: Only export token definitions (plain objects, types) from `tokens/`, never React components.

---

### ❌ Mistake #3: Importing Studio Components from Design System

**Wrong**:
```typescript
// apps/sage-design-studio/app/components/studio/TokensSection/index.tsx
import { MotionTab } from '@ecosystem/design-system';  // ❌ NO!
```

**Correct**:
```typescript
// apps/sage-design-studio/app/components/studio/TokensSection/index.tsx
import { MotionTab } from './MotionTab';  // ✅ Local import
```

**Rule**: Studio app imports its own documentation components locally, not from the design system package.

---

## 🧭 Decision Tree: Where Does This File Go?

Use this flowchart to determine the correct location:

```
Is it a React component?
├─ NO → Probably belongs in design-system/
│       └─ Is it a token definition? → design-system/tokens/
│       └─ Is it a utility function? → design-system/utils/
│       └─ Is it a type definition? → design-system/types/
│
└─ YES (it's a React component) → Ask:
    ├─ Will other apps in the ecosystem use this component?
    │   ├─ YES → design-system/[atoms|molecules|organisms]/
    │   └─ NO → Ask:
    │       └─ Is this component for DOCUMENTING the design system?
    │           ├─ YES → apps/sage-design-studio/app/components/studio/
    │           └─ NO → It belongs in the specific app that needs it
```

---

## 📋 Examples: Design System vs Studio

### Example 1: Motion System

#### Token Definitions (Design System)
```typescript
// ✅ design-system/tokens/base.ts
export const baseTokens = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  ease: {
    default: 'cubic-bezier(0, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.16, 1, 0.3, 1)',
  },
};
```

#### Motion Primitives (Design System)
```typescript
// ✅ design-system/atoms/Motion/FadeIn.tsx
export const FadeIn = ({ children, duration, ... }) => {
  // Reusable animation component that apps can use
};

// ✅ design-system/atoms/Motion/VariableWeightText.tsx
export const VariableWeightText = ({ minWeight, maxWeight, ... }) => {
  // Reusable variable font animation component
};
```

#### Documentation (Studio App)
```typescript
// ✅ apps/sage-design-studio/app/components/studio/TokensSection/MotionTab.tsx
export function MotionTab() {
  // Shows duration scale, easing curves, interactive playground
  // Demonstrates how to USE the motion tokens
  // NOT for use in other apps - only for documentation
}
```

**Summary**:
- Token values → `design-system/tokens/`
- Reusable motion components → `design-system/atoms/Motion/`
- Interactive documentation → `apps/sage-design-studio/.../MotionTab.tsx`

---

### Example 2: Typography System

#### Token Definitions (Design System)
```typescript
// ✅ design-system/tokens/base.ts
export const baseTokens = {
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    bold: '700',
  },
};
```

#### Typography Utilities (Design System)
```typescript
// ✅ design-system/tokens/typography.ts
export const typography = {
  fonts: {
    sans: 'var(--font-body)',
    serif: 'var(--font-heading)',
  },
  sizes: {
    xs: baseTokens.fontSize.xs,
    sm: baseTokens.fontSize.sm,
  },
};
```

#### Documentation (Studio App)
```typescript
// ✅ apps/sage-design-studio/app/components/studio/TokensSection/TypographyTab.tsx
export function TypographyTab() {
  // Shows type specimens, font scales, live examples
  // Demonstrates how to USE the typography tokens
}
```

---

### Example 3: Colors

#### Color Data (Design System)
```json
// ✅ design-system/tokens/colors.json
{
  "blue": {
    "50": "#eff6ff",
    "100": "#dbeafe",
    "500": "#3b82f6"
  }
}
```

#### Theme Definitions (Design System)
```typescript
// ✅ design-system/tokens/studio.ts
export const studioTokens = {
  colors: {
    primary: colors.blue['500'],
    background: colors.neutral['950'],
  },
};
```

#### Documentation (Studio App)
```typescript
// ✅ apps/sage-design-studio/app/components/studio/TokensSection/ColorsTab.tsx
export function ColorsTab() {
  // Shows color swatches, theme switcher, usage examples
  // Interactive color palette grid
}
```

---

## 🔍 How to Identify the Issue

When reviewing code or making changes, ask:

### Red Flags (Indicates Wrong Location):

1. **React component in `tokens/` directory**
   - `tokens/` should only contain JS/TS objects, not JSX

2. **Documentation component exported from design system**
   - Check `design-system/*/index.ts` files
   - If you see `export { SomeTab }`, that's probably wrong

3. **Studio app importing from `@ecosystem/design-system` for doc components**
   - Doc components should be imported locally within studio app

4. **Build output includes documentation code**
   - Check `design-system/dist/` after build
   - Documentation components shouldn't be in the bundle

---

## ✅ Checklist for LLMs

When adding a new feature or component, verify:

- [ ] Is this a reusable component that apps will import?
  - YES → Add to `design-system/[atoms|molecules|organisms]/`
  - NO → Continue

- [ ] Is this a token definition (plain object/values)?
  - YES → Add to `design-system/tokens/*.ts` (NOT `.tsx`)
  - NO → Continue

- [ ] Is this component for documenting the design system?
  - YES → Add to `apps/sage-design-studio/app/components/studio/`
  - NO → Add to the specific app that needs it

- [ ] Did I export a React component from `design-system/tokens/`?
  - YES → ❌ STOP! Move it to studio app
  - NO → ✅ Continue

- [ ] Is the studio app importing doc components from `@ecosystem/design-system`?
  - YES → ❌ STOP! Use local imports
  - NO → ✅ Continue

---

## 📖 Related Documentation

- [SAGE-DESIGN-STUDIO.md](./SAGE-DESIGN-STUDIO.md) - Overall vision and strategy
- [COMPONENT_WORKFLOW.md](./COMPONENT_WORKFLOW.md) - How to create components
- [Design System README](../README.md) - Component usage guide

---

## 🎓 Teaching Moment: Why This Matters

### Clean Architecture Benefits:

1. **Smaller Bundle Sizes**
   - Apps only get components they need
   - Documentation doesn't bloat production apps

2. **Clear Separation of Concerns**
   - Library code vs. documentation code
   - Easy to understand what's public API

3. **Maintainability**
   - Changes to documentation don't affect core library
   - Can version design system independently of studio

4. **Flexibility**
   - Can open-source design system without exposing documentation code
   - Can deploy studio separately from other apps

### What Happens When You Mix Them:

❌ Apps installing design system get documentation components they don't need
❌ Documentation changes require design system rebuilds
❌ Semantic confusion: is `MotionTab` a design primitive or documentation?
❌ Bloated public API surface
❌ Harder to maintain and reason about

---

**Last Updated**: 2025-12-29
**Status**: Active - Use this guide for all design system work
**Next Review**: When architectural patterns change

---

## Quick Reference

```bash
# Design System = Reusable Components & Tokens
design-system/
├── atoms/           # ✅ Components apps import
├── tokens/          # ✅ Token definitions (NO React components)
└── hooks/           # ✅ Hooks apps use

# Studio App = Documentation & Demos
apps/sage-design-studio/
└── app/components/studio/
    ├── TokensSection/     # ✅ Documentation components
    ├── ComponentsSection/ # ✅ Playgrounds
    └── OrganismsSection/  # ✅ Demo-specific UI
```

**Golden Rule**: If other apps in the ecosystem won't import it, it doesn't belong in the design system package.
