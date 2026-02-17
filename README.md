# Shalom's Creative Ecosystem

> **How might we make products lovable by design?**

The purpose of this open source monorepo isn't just to answer this question; it's to provide a functional human-centered design philosophy that helps you build the answer for yourself.

**Status:** Active Development
**License:** MIT
**Philosophy:** [Read DESIGN-PHILOSOPHY.md](DESIGN-PHILOSOPHY.md) — The North Star

---

## What This Is

This ecosystem expresses one unified vision through multiple products:

- **[Portfolio](https://www.shalomormsby.com/)** — My design philosophy in action. Built entirely with Sage Design Engine components.
- **[Creative Powerup](https://ecosystem-creative-powerup.vercel.app/)** — Community platform and experiment gallery for purpose-driven innovators *(in development)*
- **[Sage Stocks](https://stocks.shalomormsby.com/)** — AI-powered investment intelligence that respects user agency
- **SageOS** — Personal operating system for creative work *(concept)*

**The unifying element:** All apps consume the [Sage Design Engine](https://thesage.dev/) (`@thesage/*` packages) from NPM, which embodies human-centered principles into every component, token, and interaction.

---

## Architecture

This repo is a **consumer** of the Sage Design Engine. The design system packages (`@thesage/ui`, `@thesage/tokens`, etc.) are installed from NPM, not developed here.

```
ecosystem/
├── apps/
│   ├── portfolio/             # Production portfolio site
│   ├── creative-powerup/      # Experiment gallery (in development)
│   ├── sage-stocks/           # AI investment intelligence
│   ├── sageos/                # Future
│   └── mobile/                # React Native / Expo app
```

### Design System

The Sage Design Engine is maintained in a [separate repository](https://github.com/shalomormsby/sage-design-engine) and consumed via NPM:

```bash
pnpm add @thesage/ui
```

Available packages:

| Package | Version |
|---------|---------|
| `@thesage/ui` | ^1.1.1 |
| `@thesage/tokens` | ^0.0.3 |
| `@thesage/config` | ^0.0.3 |

Interactive documentation: [thesage.dev](https://thesage.dev/)

---

## Quick Start

```bash
# Clone and install
git clone https://github.com/shalomormsby/ecosystem.git
cd ecosystem
pnpm install

# Start portfolio
pnpm dev --filter portfolio
# Open http://localhost:3000
```

---

## Core Philosophy

This ecosystem is built on four principles:

1. **Emotionally Resonant** — Touch hearts, not just solve problems. Design should delight.
2. **User Control & Freedom** — Users customize their experience. Motion intensity, themes, everything.
3. **Transparent by Design** — Show the receipts. Users see how things work, including AI collaboration.
4. **Generous by Design** — Open source, teachable, accessible. Code that teaches as it works.

[Read the full philosophy →](DESIGN-PHILOSOPHY.md)

---

## Development

### Prerequisites

- Node.js 20+
- pnpm 8.15.0+

### Commands

```bash
# Development
pnpm dev                    # Start all apps
pnpm dev --filter portfolio # Start specific app

# Building
pnpm build                  # Build everything
pnpm build --filter <app>   # Build specific app

# Quality
pnpm lint                   # Lint all
```

### Updating Design System

When a new version of `@thesage/ui` is published:

```bash
pnpm update @thesage/ui
pnpm build
```

### Local Development with Design System

When testing SDE changes against consumer apps before publishing:

```bash
# In the sage-design-engine repo
cd packages/ui && pnpm link --global

# In this repo
cd apps/portfolio && pnpm link --global @thesage/ui

# Don't forget to unlink when done
pnpm unlink @thesage/ui && pnpm install
```

Alternatively, use [yalc](https://github.com/wclr/yalc) for a more robust local linking workflow.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS 3 |
| Animation | Framer Motion 12 |
| State | Zustand 5 + localStorage |
| Design System | Sage Design Engine (`@thesage/*`) |
| Monorepo | Turborepo + pnpm workspaces |
| Deployment | Vercel |

---

## License

MIT © Shalom Ormsby

---

**Remember:** The best documentation is working code that makes people feel seen, capable, and empowered.
