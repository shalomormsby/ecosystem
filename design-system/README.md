# Design System

> **The heart of the ecosystem.** This design system is how we make our design philosophy tangible.

Every token, component, and pattern here exists to serve one purpose: helping us build products that make people feel *seen*, *capable*, and *empowered*. If a component doesn't contribute to that goal, it doesn't belong here.

---

## Why This Exists

Most design systems optimize for consistency and efficiency. Those matter here too. But they're not the point.

This design system exists to encode **human-centered principles** into reusable building blocks—so that every app in the ecosystem inherits not just visual consistency, but *philosophical* consistency. When you use these components, you're not just shipping pixels. You're shipping values.

The goal isn't "looks the same everywhere." The goal is "feels lovable everywhere."

---

## The Three Flagship Features

These aren't just components. They're the design philosophy made interactive—proof that our principles can be *experienced*, not just read about.

### 1. Customizer

**Principle embodied:** User Control & Freedom

The Customizer gives users ownership of their experience. Not as an afterthought. As a first-class feature.

```typescript
import { Customizer } from '@ecosystem/design-system/features'

// Full customizer panel
<Customizer />

// Individual controls (for custom layouts)
import { 
  MotionSlider, 
  ThemeToggle, 
  TypographySelector 
} from '@ecosystem/design-system/features/customizer'
```

**What it controls:**
- **Motion** — 0 to 100 scale. 0 = no animation. Respects and syncs with `prefers-reduced-motion`.
- **Theme** — Light, dark, or system. Persists to localStorage.
- **Typography** — Font family and size preferences.

**The deeper point:** Users aren't just *permitted* to adjust these settings. They're *invited* to. The Customizer says: "This is your space. Make it yours."

### 2. X-Ray Mode

**Principle embodied:** Transparent by Design

X-Ray Mode lets anyone peek behind the curtain. Designers can inspect tokens. Developers can see component boundaries. Everyone can understand *how* something was built.

```typescript
import { XRayMode, XRayToggle } from '@ecosystem/design-system/features'

// Wrap your app or a section
<XRayMode>
  <YourContent />
</XRayMode>

// Toggle button (place in your UI)
<XRayToggle />
```

**What it reveals:**
- Design tokens in use (colors, spacing, typography)
- Component boundaries and names
- AI Notes (see below)
- Accessibility annotations

**The deeper point:** Transparency isn't just a value we talk about. It's a feature you can toggle on.

### 3. AI Notes

**Principle embodied:** Transparent by Design + Generous by Design

AI Notes document how AI contributed to building a feature. Not hidden in git history. Right there in the interface, for anyone curious enough to look.

```typescript
import { AINote } from '@ecosystem/design-system/features'

<AINote 
  feature="StockAnalysisCard"
  contribution="Claude helped architect the confidence scoring system and suggested the traffic-light visual pattern for quick scanning."
  human="Shalom defined the scoring weights and made final UX decisions."
/>
```

**What it documents:**
- Which AI tools were involved
- What they contributed
- What the human decided
- Why certain tradeoffs were made

**The deeper point:** We're building *with* AI, not hiding it. Showing the receipts isn't just honest—it's educational. Others can learn from how we collaborate.

---

## Architecture

```
design-system/
├── tokens/           # The foundation — design decisions as code
│   ├── colors.ts
│   ├── spacing.ts
│   ├── typography.ts
│   ├── motion.ts
│   ├── shadows.ts
│   └── index.ts
├── atoms/            # Primitives — no internal dependencies
│   ├── Button/
│   ├── Input/
│   ├── Text/
│   ├── Icon/
│   └── index.ts
├── molecules/        # Compositions — atoms working together
│   ├── Card/
│   ├── FormField/
│   ├── SearchBar/
│   └── index.ts
├── patterns/         # Layouts & interactions — reusable structures
│   ├── PageLayout/
│   ├── Modal/
│   ├── NavigationMenu/
│   └── index.ts
├── features/         # Philosophy embodied — the flagship three
│   ├── Customizer/
│   ├── XRayMode/
│   ├── AINote/
│   └── index.ts
├── hooks/            # Shared React hooks
│   ├── useMotionPreference.ts
│   ├── useTheme.ts
│   └── index.ts
├── utils/            # Internal utilities
└── README.md         # You are here
```

### Why This Structure?

**Atomic design** (atoms → molecules → patterns) isn't just organizational preference. It enforces a discipline: build from primitives up. This prevents the "custom one-off for every situation" entropy that kills design systems.

**Features at the top level** signals that these aren't just components—they're the *point*. The Customizer, X-Ray Mode, and AI Notes are why this design system is different.

**Tokens as the foundation** means design decisions live in code, not in someone's head or a Figma file that drifts out of sync. Change a token, change everywhere.

---

## Tokens

Tokens are the single source of truth for visual properties. Every component references tokens—never hardcoded values.

### Colors

```typescript
import { colors } from '@ecosystem/design-system/tokens'

// Semantic colors (use these)
colors.semantic.background      // Page background
colors.semantic.surface         // Card/container background
colors.semantic.text.primary    // Main text
colors.semantic.text.secondary  // Supporting text
colors.semantic.text.muted      // De-emphasized text
colors.semantic.border          // Default borders
colors.semantic.focus           // Focus rings

// Interactive states
colors.interactive.primary      // Primary actions
colors.interactive.hover        // Hover state
colors.interactive.active       // Active/pressed state
colors.interactive.disabled     // Disabled state

// Feedback
colors.feedback.success
colors.feedback.warning
colors.feedback.error
colors.feedback.info
```

**Rule:** Use semantic tokens, not raw color values. `colors.semantic.text.primary`—not `#1a1a1a`. This is how themes work.

### Spacing

```typescript
import { spacing } from '@ecosystem/design-system/tokens'

spacing.xs    // 4px  — Tight internal padding
spacing.sm    // 8px  — Default gap
spacing.md    // 16px — Section padding
spacing.lg    // 24px — Card padding
spacing.xl    // 32px — Section margins
spacing.2xl   // 48px — Page sections
spacing.3xl   // 64px — Major divisions
```

**Rule:** Use the scale. If you need something between `md` and `lg`, you probably don't—reconsider the layout.

### Typography

```typescript
import { typography } from '@ecosystem/design-system/tokens'

// Font families
typography.fonts.sans      // UI text
typography.fonts.serif     // Long-form reading (when appropriate)
typography.fonts.mono      // Code

// Size scale
typography.sizes.xs        // 12px — Fine print
typography.sizes.sm        // 14px — Secondary text
typography.sizes.base      // 16px — Body text
typography.sizes.lg        // 18px — Lead paragraphs
typography.sizes.xl        // 20px — Section headers
typography.sizes.2xl       // 24px — Page headers
typography.sizes.3xl       // 30px — Hero text

// Weights
typography.weights.normal  // 400
typography.weights.medium  // 500
typography.weights.semibold // 600
typography.weights.bold    // 700

// Line heights
typography.leading.tight   // 1.25 — Headings
typography.leading.normal  // 1.5  — Body
typography.leading.relaxed // 1.75 — Spacious reading
```

### Motion

```typescript
import { motion } from '@ecosystem/design-system/tokens'

// Durations
motion.duration.instant    // 0ms    — No animation
motion.duration.fast       // 150ms  — Micro-interactions
motion.duration.normal     // 300ms  — Standard transitions
motion.duration.slow       // 500ms  — Emphasis animations

// Easings
motion.easing.default      // ease-out — Most transitions
motion.easing.spring       // Custom spring — Playful interactions
motion.easing.linear       // linear — Progress indicators

// The motion scale (0-100)
// Components should scale their animation intensity based on this
motion.scale               // Current user preference (0-100)
```

**Critical rule:** All animation must respect `motion.scale`. When it's 0, there should be zero animation—instant state changes only. This is non-negotiable accessibility.

---

## Using Components

### Installation

From any app in the monorepo:

```typescript
// Atoms
import { Button, Input, Text, Icon } from '@ecosystem/design-system/atoms'

// Molecules
import { Card, FormField, SearchBar } from '@ecosystem/design-system/molecules'

// Patterns
import { PageLayout, Modal, NavigationMenu } from '@ecosystem/design-system/patterns'

// Features
import { Customizer, XRayMode, AINote } from '@ecosystem/design-system/features'

// Tokens (for custom styling)
import { colors, spacing, typography, motion } from '@ecosystem/design-system/tokens'

// Hooks
import { useMotionPreference, useTheme } from '@ecosystem/design-system/hooks'
```

### Component Patterns

Every component follows these conventions:

```typescript
// Props are typed and documented
interface ButtonProps {
  /** The visual style variant */
  variant?: 'primary' | 'secondary' | 'ghost'
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg'
  /** Whether the button is disabled */
  disabled?: boolean
  /** Click handler */
  onClick?: () => void
  /** Button contents */
  children: React.ReactNode
}

// Usage
<Button variant="primary" size="md" onClick={handleClick}>
  Save changes
</Button>
```

### Composition Over Configuration

Components are designed to compose, not to handle every case via props:

```typescript
// ✅ Good: Compose components
<Card>
  <Card.Header>
    <Text variant="heading">Title</Text>
  </Card.Header>
  <Card.Body>
    <Text>Content goes here</Text>
  </Card.Body>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>

// ❌ Avoid: Mega-props
<Card 
  title="Title" 
  content="Content" 
  footerAction={{ label: "Action", onClick: fn }}
/>
```

Why? Composition is more flexible, more readable, and fails more gracefully.

---

## Accessibility

This isn't a section you skip. It's the whole point.

### Motion

```typescript
import { useMotionPreference } from '@ecosystem/design-system/hooks'

function AnimatedComponent() {
  const { scale, shouldAnimate } = useMotionPreference()
  
  return (
    <motion.div
      initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: shouldAnimate ? 0.3 * (scale / 100) : 0 
      }}
    >
      {/* content */}
    </motion.div>
  )
}
```

### Focus Management

Every interactive element must have a visible focus state:

```typescript
// Built into all interactive atoms
<Button>Click me</Button>  // Focus ring included

// For custom interactive elements, use the focus token
import { colors } from '@ecosystem/design-system/tokens'

const customStyles = {
  '&:focus-visible': {
    outline: `2px solid ${colors.semantic.focus}`,
    outlineOffset: '2px'
  }
}
```

### Color Contrast

All text/background combinations in the token system meet WCAG AA (4.5:1 minimum). Don't override colors without checking contrast.

### Screen Readers

- Use semantic HTML (`button`, `nav`, `main`, `article`)
- Add `aria-label` when visual context isn't available to screen readers
- Test with VoiceOver (Mac) or NVDA (Windows)

### Checklist

Before shipping any component:

- [ ] Works with motion preference = 0
- [ ] Keyboard navigable with visible focus
- [ ] Screen reader announces purpose correctly
- [ ] Color contrast meets AA minimum
- [ ] No information conveyed by color alone
- [ ] Touch targets are at least 44x44px

---

## Extending the System

### Adding a New Token

1. Add to the appropriate file in `tokens/`
2. Export from `tokens/index.ts`
3. Document the use case
4. Update any affected components

### Adding a New Component

1. Determine the right level (atom, molecule, pattern, feature)
2. Create directory with component file, types, and tests
3. Export from the level's `index.ts`
4. Use only tokens for styling—no hardcoded values
5. Include accessibility from the start
6. Add AI Note if built with AI collaboration

### Proposing Changes

For anything that affects multiple components or changes tokens:

1. Open an issue describing the change and rationale
2. Show before/after examples
3. Explain impact on existing usage
4. Get alignment before implementing

---

## Relationship to Apps

The design system is consumed by all apps in the ecosystem:

| App | How It Uses the Design System |
|-----|------------------------------|
| **Portfolio** | Full integration. The Customizer and X-Ray Mode are hero features. |
| **Sage Stocks** | Components + custom financial visualizations built on tokens. |
| **Creative Powerup** | Components + community-specific patterns. |
| **SageOS** | (Future) Will extend with productivity-specific components. |

Apps can extend but should rarely override. If you find yourself overriding frequently, the design system might need to evolve.

---

## Philosophy in Practice

When building or modifying this design system, remember:

**Lovable by Design** isn't achieved by adding more features. It's achieved by making every existing feature feel like it was crafted with care. Smooth transitions. Thoughtful defaults. Generous touch targets. Text that's easy to read.

**Transparent by Design** means the system itself should be understandable. If someone can't figure out how to use a component by reading its types and looking at one example, we've failed.

**User Control & Freedom** means components should have sensible defaults but allow customization. Don't force decisions on users that they should make themselves.

**Generous by Design** means this code should teach. Comments explain *why*. Types are explicit. Examples are plentiful. Someone learning React should be able to learn from this codebase.

---

## Related Documentation

- `/DESIGN-PHILOSOPHY.md` — The North Star (read this first)
- `/AGENTS.md` — Technical setup and agent guidelines
- `/docs/mcp-setup.md` — MCP server configuration for AI coding assistants

---

**Remember:** This design system isn't a constraint. It's a foundation. Use it to build things that make people feel seen, capable, and ultimately empowered.

The components are the easy part. The hard part is remembering why they exist.
