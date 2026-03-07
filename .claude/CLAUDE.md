# Claude Context for Shalom's Creative Ecosystem

> **Context file for AI assistants (primarily Claude) working on this ecosystem. Read this first, then [DESIGN-PHILOSOPHY.md](../DESIGN-PHILOSOPHY.md) and [AGENTS.md](../AGENTS.md).**

Last updated: 2026-03-07

---

## Quick Orientation

You're working on **Shalom's Creative Ecosystem** — a monorepo of product applications that consume the [Sage Design Engine](https://thesage.dev/) from npm. This repo is where the products live; the design system is developed in a [separate repository](https://github.com/shalomormsby/sage-design-engine).

**The North Star:** Lovable by Design — Create products that empower people and bring joy.

**Your Role:** Partner in creative work. You execute within the vision Shalom defines. Ask questions, propose options, challenge assumptions, but never make unilateral architectural decisions.

---

## Repository Structure

```
ecosystem/
├── apps/
│   ├── portfolio/           # Production portfolio (shalomormsby.com)
│   ├── creative-powerup/    # Community platform (in development)
│   ├── sage-stocks/         # AI-powered investment intelligence
│   └── sageos/              # Personal operating system (future)
├── packages/
│   └── sage-ai/             # @thesage/ai — Sovereign AI layer (WIP)
├── DESIGN-PHILOSOPHY.md     # The North Star
├── AGENTS.md                # Technical guide for AI agents
└── CHANGELOG.md             # Work history
```

### Two Repos, One Philosophy

| Repo | Purpose | What's in it |
|------|---------|-------------|
| **This repo** (ecosystem) | Consumer applications + Sage AI | Apps that use `@thesage/ui` from npm |
| **[sage-design-engine](https://github.com/shalomormsby/sage-design-engine)** | Design system source | `@thesage/ui`, `@thesage/tokens`, `@thesage/mcp`, Sage Studio docs site |

**Rule:** Don't create `packages/ui/`, `packages/tokens/`, or `packages/mcp/` here. Those are developed and published from sage-design-engine.

---

## Essential Files

1. **[DESIGN-PHILOSOPHY.md](../DESIGN-PHILOSOPHY.md)** — The North Star. Four principles: Emotionally Resonant, User Control & Freedom, Transparent by Design, Generous by Design.
2. **[AGENTS.md](../AGENTS.md)** — Technical guide: file organization, build commands, conventions.
3. **[packages/sage-ai/INCEPTION.md](../packages/sage-ai/INCEPTION.md)** — Sage AI founding blueprint. Read before working on `@thesage/ai`.
4. **[CHANGELOG.md](../CHANGELOG.md)** — Work history.

---

## Sage AI (Work in Progress)

The shared intelligence layer. Lives at `packages/sage-ai/`.

- **License:** RAIL (not MIT)
- **Status:** Phase 1a (hardware) + Phase 1b (package foundation)
- **Read [INCEPTION.md](../packages/sage-ai/INCEPTION.md)** before any work

```typescript
// API shape (finalizing in Phase 1b)
import { createSageClient } from '@thesage/ai'
const sage = createSageClient({ model: 'apertus-8b', tier: 'sovereign' })
const response = await sage.complete(prompt, opts)
```

---

## Import Patterns

```typescript
// Design system (from npm)
import { Button, Card, useTheme } from '@thesage/ui'
import { useMotionPreference } from '@thesage/ui/hooks'
import { ThemeProvider } from '@thesage/ui/providers'
import { cn } from '@thesage/ui/utils'
import '@thesage/ui/globals.css'

// Never use (legacy)
// import { Button } from '@thesage/ui/atoms'
// import { Card } from '@ecosystem/design-system'
```

---

## Key Patterns

### Motion Must Respect Preferences

```typescript
import { useMotionPreference } from '@thesage/ui/hooks'

function AnimatedComponent() {
  const { shouldAnimate, scale } = useMotionPreference()
  return (
    <motion.div
      animate={{ opacity: 1, y: shouldAnimate ? 20 : 0 }}
      transition={{ duration: shouldAnimate ? 0.3 : 0 }}
    />
  )
}
```

### CSS Variables Over Hardcoded Colors

```typescript
// ✅ Theme-aware
className="bg-background text-foreground border-border"

// ❌ Hardcoded
className="bg-white text-black border-gray-200"
```

### Use Design System Components First

Always search for existing `@thesage/ui` components before writing custom JSX or CSS.

---

## Build & Development

```bash
# Development
pnpm dev --filter portfolio           # Start portfolio
pnpm dev --filter creative-powerup    # Start creative powerup

# Build
pnpm build                            # Build everything
pnpm build --filter portfolio         # Build specific app

# Update design system
pnpm update @thesage/ui

# Clear caches
rm -rf .turbo apps/*/.next && pnpm build
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| React | React 19.2.1 |
| Styling | Tailwind CSS via @thesage/ui CSS variables |
| Animation | Framer Motion 12 |
| State | Zustand 5 |
| Design System | `@thesage/ui` (npm, 100 components) |
| Monorepo | Turborepo + pnpm |
| Deployment | Vercel |

---

## Accessibility (Non-Negotiable)

- Motion intensity 0 must work perfectly
- Keyboard navigable, screen reader compatible
- WCAG AA color contrast (4.5:1)
- No information conveyed by color alone

---

## Git Conventions

```
type(scope): description
```

**Types:** feat, fix, docs, style, refactor, test, chore
**Scopes:** portfolio, creative-powerup, sage-stocks, sage-ai

---

## What NOT to Do

- Make architectural decisions without Shalom
- Create design system packages here (use sage-design-engine)
- Skip accessibility requirements
- Hardcode colors
- Animate without checking motion preferences
- Over-engineer

---

## Quick Links

**Live Sites:**
- Portfolio: https://www.shalomormsby.com/
- Sage Studio: https://thesage.dev/
- Creative Powerup: https://ecosystem-creative-powerup.vercel.app/

**Development:**
- Portfolio: http://localhost:3000

---

**Current focus:** Sage AI Phase 1 — see [INCEPTION.md](../packages/sage-ai/INCEPTION.md).
