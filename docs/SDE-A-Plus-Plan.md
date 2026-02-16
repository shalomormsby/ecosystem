# The A+ Plan: Making SDE the Gold Standard for AI-Native Component Libraries

> Updated 2026-02-16. **Workstream 1 is COMPLETE** — false-404 fix, path-based routing migration, title tag fix, server-rendered content.

---

## START HERE: Workstream 1 — The False-404 Fix + Path-Based Routing Migration

**If you're an AI agent picking this up fresh, go straight to [Workstream 1](#workstream-1-fix-the-false-404-problem--migrate-to-path-based-routing-foundation). Everything you need — root cause, file locations, architecture context, and implementation plan — is there. The context transfer section within WS1 gives you zero-context orientation.**

**Execution order:** ✅ ALL COMPLETE
1. ~~**Fix 1 (quick win):** Remove 404 text from RSC payload so LLMs stop seeing false 404s~~ **Done 2026-02-16**
2. ~~**Fix 2 (structural):** Migrate from hash-based routing to path-based routing~~ **Done 2026-02-16**

---

**Context:** In a head-to-head comparison against shadcn/ui, Chakra UI, Mantine, MUI, and Radix Themes, SDE scored **103/130** vs shadcn/ui's **111/130**. Since the initial evaluation, targeted improvements have closed 2 of the original 10-point delta. This plan targets the remaining 8-point gap — and identifies where SDE should extend its existing leads.

---

## Progress Since Initial Plan

Several workstreams from the original plan have been partially or fully executed:

| Item | Status | Impact |
|---|---|---|
| Test coverage (63→156 tests, 10→30 files) | **Done** | Eliminated a major credibility gap |
| CI/CD pipeline (lint + typecheck + test + size:check) | **Done** | Quality enforcement on every PR |
| Bundle size CI checks (size-limit) | **Done** | Budget enforcement prevents regression |
| framer-motion peer dep pinned | **Done** | No longer wildcard `*` — enables version-accurate AI codegen |
| Single-component deps resolved | **Done** | cmdk, embla, vaul, input-otp, react-resizable-panels are now regular deps (not wildcard peers) |
| Subpath exports (10 paths) | **Done** | `/dates`, `/tables`, `/forms`, `/dnd`, `/hooks`, `/tokens`, `/utils`, `/providers`, `/webgl`, `/globals.css` |
| `/docs/api.json` endpoint | **Done** | Structured JSON API for all 92 components |
| AI discovery endpoints | **Done** | `/.well-known/ai-plugin.json` and `/.well-known/mcp-server.json` |
| `.claude/CLAUDE.md` in npm package | **Done** | Auto-primes AI context on install |
| robots.txt AI permissions | **Done** | Explicitly allows ClaudeBot, GPTBot, Google-Extended |
| MCP server updated to v0.7.0 | **Done** | Improved but still 4 tools, still 89 components |
| npm description updated to "92 components" | **Done** | Consistent with llms-full.txt |
| Zustand theme store with localStorage | **Done** | Theme/mode/motion preferences persist |
| Version bump to 1.0.3 | **Done** | Active release cadence |

**Net score impact:** Bundle Performance 3→4 (+1 weighted point). Total: 101→103.

---

## Competitive Gap Analysis (Updated)

The 8-point gap breaks down as follows:

| Criterion | shadcn | SDE | Delta | Status |
|---|---|---|---|---|
| AI Integration (5x) | 5 | 5 | 0 | Tied on rating. shadcn has 7 MCP tools vs 4, JSON registry schema per component, v0 integration. SDE has richer llms-full.txt, api.json, ai-plugin.json, mcp-server.json, .claude/ in npm. **Deepen the lead.** |
| Component Coverage (4x) | 4 | 4 | 0 | Tied. SDE has 92 components vs 56, but shadcn has **27 page-level blocks** (dashboards, login flows, sidebars). SDE has only 2 blocks (Hero, OpenGraphCard). **Add blocks.** |
| Dev Velocity (4x) | 4 | 4 | 0 | Tied. shadcn has `npx shadcn init` + 10 framework guides. SDE has batteries-included install + 10 subpath exports. **Add scaffold CLI + framework guides.** |
| Customizability (3x) | 5 | 4 | **-3** | Structural. shadcn's copy-paste model means you own the source. SDE is an npm package. **Partially closable with eject mechanism.** |
| Accessibility (3x) | 4 | 4 | 0 | Tied. Both built on Radix. SDE has unique motion accessibility (0-10 scale). |
| Community (3x) | 5 | 1 | **-12** | Not closable short-term. 106K stars vs 1. **Accept and compensate elsewhere.** |
| Theming (2x) | 4 | 5 | **+2** | **SDE leads.** 3 distinct visual identities (Studio/Terra/Volt) vs 21 color variations on one layout. Zustand-powered persistence. |
| Animation (1x) | 2 | 5 | **+3** | **SDE leads.** Full motion system with useMotionPreference hook + user-controllable intensity vs CSS transitions only. |
| Bundle (1x) | 5 | 4 | **-1** | **Improved** (was -2). Subpath exports and CI-enforced size limits close the gap. shadcn's copy-only-what-you-use is inherently leaner. |

**Key insight:** Excluding community (-12, not closable), the actual gap is now only **-4 points** from Customizability (-3) and Bundle (-1). SDE leads by **+5 points** on Theming and Animation. The path to winning (excluding community) is: close the -4, protect the +5, and turn AI Integration and Component Coverage into wider leads.

---

## Workstream 1: Fix the False-404 Problem + Migrate to Path-Based Routing (Foundation)

*P0. The single biggest blocker to AI discoverability and SEO.*

> **Updated 2026-02-16** with definitive root cause analysis. The original diagnosis ("routes return 404") was wrong. The real problem is more subtle and more pervasive.

---

### Context Transfer (Zero-Context Orientation)

**Read this section if you're starting fresh.** It contains everything you need to understand the problem and start implementing.

#### What is this project?

Sage Design Engine (SDE) is a React component library with 92 components, 3 themes, and a documentation site at `thesage.dev`. The docs site lives at `apps/web/` in the monorepo and runs on Next.js App Router (port 3001 in dev).

#### What is the problem?

LLM tools (WebFetch, AI crawlers, content analyzers) report that every page on `thesage.dev` is a 404 error page — even though human browsers see working pages and all HTTP status codes are actually 200.

#### What causes it?

**Two problems, in order of priority:**

**Problem A — RSC Payload Leakage (false 404 detection):** Next.js serializes the `not-found.tsx` component into the RSC (React Server Component) flight data of **every page's HTML** under a `"notFound"` key. This is standard Next.js behavior — it pre-bundles the 404 page for instant client-side navigation. But your `not-found.tsx` contains highly distinctive text: a giant "404" heading, "Sorry, my bad.", and "I can't find the page you're looking for." LLM tools parse the full HTML, find these strings, and conclude the page is a 404.

**Problem B — Hash-Based Routing (structural):** The entire docs site uses hash-based routing (`/docs#actions/button`). There are no server-side routes for individual sections or components. Machines can't navigate hash URLs. The catch-all `app/[...slug]/page.tsx` redirects known section names to `/docs#section`, but the target is a single-page app that requires JavaScript to render content.

#### Verified facts from investigation

| Test | Result |
|------|--------|
| `curl -w "%{http_code}" https://thesage.dev` | **200** (not 404) |
| `curl -w "%{http_code}" https://thesage.dev/docs` | **200** (not 404) |
| `curl -w "%{http_code}" https://thesage.dev/this-does-not-exist` | **200** (should be 404 but isn't) |
| "404" text in root page HTML? | **Yes** — at position 24948 in RSC payload |
| "Sorry, my bad" in root page HTML? | **Yes** — at position 25080 in RSC payload |
| "I can't find the page" in root page HTML? | **Yes** — at position 25463 in RSC payload |
| `NEXT_HTTP_ERROR_FALLBACK` on valid pages? | **No** (correctly absent) |
| `NEXT_HTTP_ERROR_FALLBACK` on invalid pages? | **Yes** (but HTTP status is still 200) |
| No middleware, no bot detection, no user-agent filtering? | **Confirmed** — none found |

#### Key files you need to know

| File | What it does | Why it matters |
|------|-------------|----------------|
| `apps/web/app/not-found.tsx` | Custom 404 page with "404", "Sorry, my bad", Typewriter component | **THE SOURCE** of false-404 text in every page's RSC payload |
| `apps/web/app/docs/page.tsx` | Main docs SPA — `'use client'`, hash-based routing, imports NotFound | Contains ALL documentation content behind client-side rendering |
| `apps/web/app/[...slug]/page.tsx` | Catch-all route — redirects known sections to `/docs#hash`, 404s everything else | Only 5 real server routes exist: `/`, `/docs`, `/landing`, `/universal`, plus this catch-all |
| `apps/web/app/page.tsx` | Root landing page — `'use client'` with SageHero, FeatureBento, etc. | Returns 200 but RSC payload contains not-found text |
| `apps/web/app/layout.tsx` | Root layout with ThemeProvider, metadata, JSON-LD | Server-side metadata is correct |
| `apps/web/app/docs/layout.tsx` | Docs layout with metadata, JSON-LD CollectionPage schema | Has correct metadata for 92 components |
| `apps/web/next.config.mjs` | Next.js config — CSP headers, transpilePackages | No rewrites, no redirects, no bot filtering |
| `apps/web/public/robots.txt` | Bot permissions — allows all crawlers explicitly | Not the problem |

#### Current route structure

```
Real server routes (return HTTP 200):
  /           → app/page.tsx (use client — landing page)
  /docs       → app/docs/page.tsx (use client — entire docs SPA)
  /landing    → app/landing/page.tsx (use client)
  /universal  → app/universal/page.tsx (use client)
  /*          → app/[...slug]/page.tsx (catch-all — redirects or 404s)

Hash-based "routes" (only work in browser with JavaScript):
  /docs#overview
  /docs#actions/button
  /docs#forms/input
  /docs#themes/palettes
  ... (all 20+ sections with sub-items)

Static files (work perfectly for machines):
  /llms.txt, /llms-full.txt, /robots.txt, /sitemap.xml
  /.well-known/ai-plugin.json, /.well-known/mcp-server.json
  /docs/api.json (API route)
```

#### How docs/page.tsx routing works today

The docs page (`apps/web/app/docs/page.tsx`) is a massive `'use client'` component (~667 lines). It:

1. Reads `window.location.hash` on mount via `useEffect`
2. Parses the hash into `[section, itemId]` (e.g., `#actions/button` → section=`actions`, itemId=`button`)
3. Sets `activeSection` state, which controls which `<Section>` component renders
4. Maintains a `validSections` list: `overview`, `architecture`, `adding-components`, `common-patterns`, `contributing`, `mcp-server`, `tokens`, `themes`, `components`, `actions`, `forms`, `navigation`, `overlays`, `feedback`, `data-display`, `layout`, `blocks`, `hooks`, `templates`, `charts`, `motion`, `tools`
5. Renders the appropriate section component (e.g., `<ComponentsSection>` for actions/forms/etc.)
6. Imports `NotFound` from `../not-found` and renders it if the hash is invalid

The section components live in `apps/web/app/components/studio/`:
- `OverviewSection`, `ArchitectureSection`, `AddingComponentsSection`, etc.
- `ComponentsSection` — the main one that renders component docs for actions/forms/navigation/overlays/feedback/data-display/layout categories
- `BlocksSection`, `HooksSection`, `TemplatesSection`, `ChartsSections`, `MotionSections`, `ToolsSection`

#### The navigation sidebar data

The sidebar navigation is defined in `apps/web/app/lib/navigation-tree.tsx`. Each section has children that map to items within that section. The `routeConfig` object in `docs/page.tsx` (lines 58-241) defines breadcrumb labels for all sections and their children.

---

### 1.1 Fix A: Remove 404 Text from RSC Payload (Do This First)

**Status: ✅ COMPLETE (2026-02-16).** Converted `not-found.tsx` to `'use client'` with deferred rendering — 404 text ("404", "Sorry, my bad", "I can't find the page") renders only after hydration via `useState`/`useEffect`, keeping it out of the RSC payload. Verified: `grep "Sorry, my bad"` returns 0 matches in both `/` and `/docs` built HTML.

**The problem in one sentence:** Next.js includes the full text of `not-found.tsx` ("404", "Sorry, my bad.", "I can't find the page you're looking for.") in every page's HTML via the RSC flight data, causing LLM tools to misidentify every page as a 404.

**The fix:** Make `not-found.tsx` render its 404-identifying text only on the client side, so the RSC payload contains a minimal placeholder instead of the full 404 content.

**Implementation guide:**

**File to edit:** `apps/web/app/not-found.tsx`

The current component is a Server Component that renders the full 404 UI:

```tsx
// CURRENT (lines 5-142):
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-black dark">
      {/* Header with nav */}
      <Header ... />
      {/* Background: FaultyTerminal */}
      <div className="absolute inset-0 z-0"><FaultyTerminal tint="#ef4444" /></div>
      {/* Giant "404" heading */}
      <h1 ... style={{ WebkitTextStroke: '4px var(--color-error)' }}>404</h1>
      {/* "Sorry, my bad." subheading */}
      <h2 ...>Sorry, my bad.</h2>
      {/* Typewriter: "I can't find the page..." */}
      <Typewriter text="I can't find the page you're looking for..." ... />
      {/* Action buttons, footer */}
    </div>
  )
}
```

**Convert to a client component that defers the problematic text until after hydration:**

```tsx
'use client';

import { useState, useEffect } from 'react';
import { Button, FaultyTerminal, Typewriter, Footer, Header } from '@thesage/ui';
import Link from 'next/link';
import { Github } from 'lucide-react';

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-black dark">
      <Header
        logo={<span className="text-xl font-bold tracking-tight">Sage Design Engine</span>}
        navAlignment="right"
        navLinks={[
          { label: 'Documentation', href: '/docs' },
          { label: 'Components', href: '/docs#components' },
          { label: 'Themes', href: '/docs#themes' },
        ]}
        actions={
          <Button variant="outline" size="sm" asChild className="gap-2">
            <a href="https://github.com/shalomormsby/ecosystem" target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4" />
              Star on GitHub
            </a>
          </Button>
        }
      />

      {/* Background */}
      <div className="absolute inset-0 z-0">
        {mounted && <FaultyTerminal tint="#ef4444" />}
      </div>

      <div className="flex-1 flex items-center justify-center relative z-10 w-full px-6 pointer-events-none">
        <div className="max-w-xl w-full text-center pointer-events-auto">
          <div className="space-y-8">
            <div className="flex flex-col items-center justify-center select-none pt-[75px] md:pt-[100px]">
              {/* Render error text only after hydration — keeps it out of RSC payload */}
              {mounted ? (
                <>
                  <h1
                    className="text-[12rem] leading-none font-black text-transparent"
                    style={{ WebkitTextStroke: '4px var(--color-error)' }}
                  >
                    404
                  </h1>
                  <h2 className="text-4xl font-bold text-[var(--color-text-primary)] mt-[-20px] mb-8">
                    Sorry, my bad.
                  </h2>
                </>
              ) : (
                /* Minimal placeholder for SSR — no 404 text */
                <div className="h-[200px]" aria-hidden="true" />
              )}
            </div>

            {mounted && (
              <div className="bg-black border border-white/20 p-6 rounded-lg shadow-[0_0_30px_rgba(0,0,0,0.5)] backdrop-blur-sm relative z-20">
                <div className="min-h-[60px] flex items-center justify-center"
                     style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>
                  <Typewriter
                    text="I can't find the page you're looking for. Was it moved? Deleted? Did it ever exist in the first place?   ¯\_(ツ)_/¯"
                    speed={0.03} loop={false} cursor="_"
                    className="text-sm md:text-base text-[var(--color-text-primary)] leading-relaxed font-normal"
                    as="p"
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-8 pb-12">
              <Button variant="default" size="lg" className="w-full sm:w-auto" asChild>
                <Link href="/">Go to Homepage</Link>
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
                <Link href="/docs#getting-started">Browse Components</Link>
              </Button>
            </div>

            <p className="text-sm text-[var(--color-text-muted)] pb-[75px] md:pb-[100px]">
              If this problem persists, please{' '}
              <a href="https://github.com/shalomormsby/ecosystem/issues" target="_blank" rel="noopener noreferrer"
                 className="text-[var(--color-primary)] hover:underline">
                report an issue
              </a>.
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full pointer-events-auto">
        <Footer
          className="bg-black/50 backdrop-blur-sm border-white/10"
          copyright="© 2026 Sage Design Engine. All rights reserved."
          sections={[
            { title: "Docs", links: [
              { label: "Getting Started", href: "/docs#getting-started" },
              { label: "Design Philosophy", href: "https://github.com/shalomormsby/ecosystem/blob/main/DESIGN-PHILOSOPHY.md", external: true },
            ]},
            { title: "Building Blocks", links: [
              { label: "Components", href: "/docs#components" },
              { label: "Blocks", href: "/docs#blocks" },
            ]},
            { title: "Toolkit", links: [
              { label: "MCP Server", href: "/docs#mcp-server" },
              { label: "Hooks", href: "/docs#hooks" },
            ]},
          ]}
        />
      </div>
    </div>
  );
}
```

**Also fix the import in `apps/web/app/docs/page.tsx`** (line 6):

The docs page imports NotFound directly: `import NotFound from '../not-found';`. This import pulls the component into the docs page bundle. After converting `not-found.tsx` to `'use client'` with deferred rendering, the import still works but the SSR output will no longer contain 404 text.

**Verification after implementation:**

```bash
# Build and deploy, then verify the 404 text is gone from valid pages:
curl -s https://thesage.dev | grep -c "Sorry, my bad"  # Should be 0
curl -s https://thesage.dev/docs | grep -c "Sorry, my bad"  # Should be 0
curl -s https://thesage.dev | grep -o '.\{50\}404.\{50\}'  # Should show no matches or only non-error references
```

**Acceptance criteria:**
- [x] `curl https://thesage.dev` HTML does NOT contain "404", "Sorry, my bad", or "can't find the page"
- [x] `curl https://thesage.dev/docs` HTML does NOT contain those strings
- [x] The 404 page still renders correctly in browsers when visiting an invalid URL
- [ ] WebFetch / LLM tools no longer report the pages as 404s *(requires deployment to verify)*
- [x] No visual regression for human users

---

### 1.2 Fix B: Migrate from Hash-Based Routing to Path-Based Routing

**Status: ✅ COMPLETE (2026-02-16).** Full migration from hash-based SPA to path-based routes. Created `route-config.ts` (shared constants), `DocsShell.tsx` (client layout), `SectionRenderer.tsx` (component mapper), `[section]/page.tsx` and `[section]/[item]/page.tsx` (static routes with `generateStaticParams` + `generateMetadata`). Build produces 125 static pages (23 section + 93 item pages). Updated 12+ files to use path-based links. Hash URLs redirect to path URLs for backwards compatibility.

**The problem in one sentence:** The entire documentation site is a single-page app at `/docs` with all navigation handled by `window.location.hash`, meaning there are no server-side routes for individual sections or components — machines can't navigate to specific content.

**The goal:** Convert `/docs#actions/button` to `/docs/actions/button` so that every section and component has a real server-side route with proper HTML, metadata, and HTTP status codes.

#### Current architecture (hash-based)

```
Browser request: /docs#actions/button
  1. Server returns /docs page (single HTML shell)
  2. JavaScript reads window.location.hash → "actions/button"
  3. React state updates: activeSection="actions", activeItemId="button"
  4. ComponentsSection renders the Button documentation

Machine request: /docs#actions/button
  1. Server returns /docs page (# is never sent to server)
  2. Machine sees the default SSR shell for /docs
  3. No JavaScript executes → no content rendered
  4. Machine sees empty/sparse page → reports as broken
```

#### Target architecture (path-based)

```
Browser request: /docs/actions/button
  1. Server matches route: app/docs/[section]/[item]/page.tsx
  2. Server renders Button documentation as HTML
  3. Client hydrates for interactivity (theme switching, etc.)
  4. Subsequent navigation can still be client-side (Next.js Link)

Machine request: /docs/actions/button
  1. Server matches route: app/docs/[section]/[item]/page.tsx
  2. Server renders Button documentation as HTML
  3. Machine sees full content, props table, examples
  4. HTTP 200 with proper <title>, meta tags, JSON-LD
```

#### Route structure to create

```
apps/web/app/docs/
├── page.tsx                              # /docs — overview/landing
├── layout.tsx                            # Shared docs layout (sidebar, search, breadcrumbs)
├── [section]/
│   ├── page.tsx                          # /docs/{section} — section overview
│   └── [item]/
│       └── page.tsx                      # /docs/{section}/{item} — specific item
```

**Sections and their items (derived from the existing `routeConfig` in `docs/page.tsx` lines 58-241):**

| Section | Items | Section Component |
|---------|-------|-------------------|
| `getting-started` | (none — single page) | `GettingStartedSection` |
| `overview` | (none — single page) | `OverviewSection` |
| `architecture` | (none — single page) | `ArchitectureSection` |
| `adding-components` | `methodology`, `modifying`, `troubleshooting` | `AddingComponentsSection` |
| `common-patterns` | (none — single page) | `CommonPatternsSection` |
| `contributing` | (none — single page) | `ContributingSection` |
| `mcp-server` | `installation`, `tools`, `usage`, `troubleshooting` | `McpSection` |
| `tokens` | `colors`, `typography`, `spacing`, `syntax`, `motion` | `TokensSection` |
| `themes` | `palettes`, `customizer` | `ThemesSection` |
| `components` | (dashboard — links to category sections) | `ComponentsDashboard` |
| `actions` | `button`, `toggle`, `toggle-group` | `ComponentsSection` (category=actions) |
| `forms` | `checkbox`, `combobox`, `drag-drop`, `form`, `input`, `input-otp`, `label`, `radio-group`, `select`, `slider`, `switch`, `textarea`, `theme-toggle` | `ComponentsSection` (category=forms) |
| `navigation` | `breadcrumb`, `command`, `menubar`, `navigation-menu`, `pagination`, `tabs` | `ComponentsSection` (category=navigation) |
| `overlays` | `alert-dialog`, `context-menu`, `dialog`, `drawer`, `dropdown-menu`, `hover-card`, `popover`, `sheet`, `tooltip` | `ComponentsSection` (category=overlays) |
| `feedback` | `alert`, `progress`, `skeleton`, `sonner`, `toaster` | `ComponentsSection` (category=feedback) |
| `data-display` | `avatar`, `badge`, `calendar`, `card`, `data-table`, `table` | `ComponentsSection` (category=data-display) |
| `layout` | `accordion`, `aspect-ratio`, `carousel`, `collapsible`, `date-picker`, `resizable`, `scroll-area`, `separator` | `ComponentsSection` (category=layout) |
| `blocks` | `page-layout`, `primary-nav`, `secondary-nav`, `footer`, `customizer`, `collapsible-code-block` | `BlocksSection` |
| `hooks` | (items TBD from HooksSection) | `HooksSection` |
| `templates` | `page-template` | `TemplatesSection` |
| `charts` | `overview`, `area-chart`, `bar-chart`, `line-chart`, `pie-chart` | `ChartsSections` |
| `motion` | `text-effects`, `scroll`, `loading`, `interactive`, `transitions`, `cursor-effects` | `MotionSections` |
| `tools` | `brand-builder`, `open-graph-card`, `charts` | `ToolsSection` |

#### Implementation strategy

**Phase 1: Create the route structure without breaking the existing SPA**

The key insight: you can create new path-based routes that render the SAME section components, while keeping the existing `/docs` SPA working. Then redirect hash URLs to path URLs.

**Step 1: Create `apps/web/app/docs/[section]/page.tsx`**

```tsx
import { notFound } from 'next/navigation';
// Import all section components (same ones used by the SPA)
import { OverviewSection } from '../../components/studio/OverviewSection';
import { ComponentsSection } from '../../components/studio/ComponentsSection';
// ... all other section imports

const VALID_SECTIONS = [
  'getting-started', 'overview', 'architecture', 'adding-components',
  'common-patterns', 'contributing', 'mcp-server', 'tokens', 'themes',
  'components', 'actions', 'forms', 'navigation', 'overlays', 'feedback',
  'data-display', 'layout', 'blocks', 'hooks', 'templates', 'charts',
  'motion', 'tools'
];

const COMPONENT_CATEGORIES = [
  'actions', 'forms', 'navigation', 'overlays', 'feedback', 'data-display', 'layout'
];

export async function generateStaticParams() {
  return VALID_SECTIONS.map(section => ({ section }));
}

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const label = section.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return {
    title: `${label} — Sage Design Engine`,
    description: `${label} documentation for Sage Design Engine.`,
  };
}

export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!VALID_SECTIONS.includes(section)) notFound();

  // Render the appropriate section component
  // These are currently 'use client' components — they'll still hydrate on the client
  // but Next.js will SSR them, producing real HTML
  if (section === 'overview') return <OverviewSection />;
  if (section === 'architecture') return <ArchitectureSection breadcrumbs={[]} />;
  if (COMPONENT_CATEGORIES.includes(section)) {
    return <ComponentsSection activeItemId={section} category={section} breadcrumbs={[]} onItemChange={() => {}} />;
  }
  // ... handle all other sections

  notFound();
}
```

**Step 2: Create `apps/web/app/docs/[section]/[item]/page.tsx`**

```tsx
import { notFound } from 'next/navigation';
import { ComponentsSection } from '../../../components/studio/ComponentsSection';

// Map of section → valid items (derive from routeConfig)
const SECTION_ITEMS: Record<string, string[]> = {
  actions: ['button', 'toggle', 'toggle-group'],
  forms: ['checkbox', 'combobox', 'drag-drop', 'form', 'input', 'input-otp', 'label', 'radio-group', 'select', 'slider', 'switch', 'textarea', 'theme-toggle'],
  // ... all other sections with their items
};

export async function generateStaticParams() {
  const params: { section: string; item: string }[] = [];
  for (const [section, items] of Object.entries(SECTION_ITEMS)) {
    for (const item of items) {
      params.push({ section, item });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ section: string; item: string }> }) {
  const { section, item } = await params;
  const label = item.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const sectionLabel = section.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return {
    title: `${label} — ${sectionLabel} — Sage Design Engine`,
    description: `Documentation for the ${label} component in Sage Design Engine.`,
  };
}

export default async function ItemPage({ params }: { params: Promise<{ section: string; item: string }> }) {
  const { section, item } = await params;
  const validItems = SECTION_ITEMS[section];
  if (!validItems || !validItems.includes(item)) notFound();

  // Render the section component with the specific item active
  return <ComponentsSection activeItemId={item} category={section} breadcrumbs={[]} onItemChange={() => {}} />;
}
```

**Step 3: Create a shared docs layout with sidebar**

The current sidebar (`NavigationSidebar`) lives in `apps/web/app/components/NavigationSidebar.tsx`. Extract or adapt it for the path-based layout. The new `apps/web/app/docs/layout.tsx` should wrap all docs pages with:
- The sidebar navigation (using `<Link>` to path URLs instead of hash URLs)
- The search command palette
- The table of contents
- Breadcrumbs

**Step 4: Redirect old hash URLs to new path URLs**

Update `apps/web/app/docs/page.tsx` to detect hash fragments and redirect:

```tsx
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DocsPage() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      // Redirect #actions/button → /docs/actions/button
      router.replace(`/docs/${hash.replace('/', '/')}`);
    }
  }, [router]);

  // Render the overview/landing content for /docs (no hash)
  return <OverviewSection />;
}
```

**Step 5: Update the catch-all route**

Update `apps/web/app/[...slug]/page.tsx` to redirect to path URLs instead of hash URLs:

```tsx
// Change: redirect(`/docs#${slug.join('/')}`);
// To:     redirect(`/docs/${slug.join('/')}`);
```

**Step 6: Update all internal links**

Search and replace across the codebase:
- `href="/docs#actions"` → `href="/docs/actions"`
- `href="/docs#actions/button"` → `href="/docs/actions/button"`
- All `window.location.hash` usage in navigation components
- Sidebar navigation links
- Search result navigation
- Footer links
- Not-found page links

```bash
# Find all hash-based doc links:
rg 'href="/docs#' apps/web/
rg 'docs#' apps/web/app/
rg 'window\.location\.hash' apps/web/app/
```

**Step 7: Update sitemap.xml**

Replace hash-based URLs with path-based URLs in `apps/web/public/sitemap.xml`. Consider generating it dynamically using Next.js's `sitemap.ts` convention:

```tsx
// apps/web/app/sitemap.ts
export default function sitemap() {
  const sections = ['getting-started', 'overview', ...];
  const items = { actions: ['button', 'toggle', ...], ... };

  const urls = [
    { url: 'https://thesage.dev', lastModified: new Date() },
    { url: 'https://thesage.dev/docs', lastModified: new Date() },
    ...sections.map(s => ({ url: `https://thesage.dev/docs/${s}`, lastModified: new Date() })),
    ...Object.entries(items).flatMap(([section, itemList]) =>
      itemList.map(item => ({ url: `https://thesage.dev/docs/${section}/${item}`, lastModified: new Date() }))
    ),
  ];

  return urls;
}
```

#### Key challenges and considerations

1. **Section components are `'use client'`:** This is fine. Next.js SSRs `'use client'` components — they produce real HTML server-side, then hydrate on the client. The content will be visible to machines.

2. **Section components expect props like `onItemChange`, `breadcrumbs`:** The path-based pages need to provide these. For SSR, `onItemChange` can be a no-op or link-based navigation. Breadcrumbs can be generated from the URL params.

3. **The `ComponentsSection` component controls which component is shown via `activeItemId` prop:** This already works — just pass the `item` param from the URL.

4. **Navigation between items should use `<Link>` not state updates:** After migration, sidebar clicks should navigate to `/docs/actions/button` via Next.js `<Link>`, not set React state. This enables both server-side rendering and client-side transitions.

5. **Search results need to navigate to path URLs:** Update `SearchCommandPalette`'s `onNavigate` to use `router.push('/docs/actions/button')` instead of setting hash state.

6. **Backwards compatibility:** Old hash URLs (`/docs#actions/button`) should redirect to new path URLs (`/docs/actions/button`). The client-side redirect in Step 4 handles this for browsers. For machines that somehow request hash URLs, the hash is never sent to the server anyway — they'll just get the `/docs` page (which after migration will be the overview).

#### Acceptance criteria

- [x] `/docs/actions/button` returns HTTP 200 with server-rendered Button documentation
- [x] `curl https://thesage.dev/docs/actions/button` contains `<h1>` with "Button" *(verified locally via build output)*
- [x] Every section in `VALID_SECTIONS` has a working `/docs/{section}` route — 23 section pages generated
- [x] Every item in `SECTION_ITEMS` has a working `/docs/{section}/{item}` route — 93+ item pages generated
- [x] `<title>` tags are correct: "Button — Actions — Sage Design Engine" *(verified in build HTML)*
- [x] Old hash URLs redirect to new path URLs (client-side via DocsShell + landing page)
- [x] Sidebar navigation uses `router.push()` to path URLs (via DocsShell onNavigate)
- [x] Search results navigate to path URLs (search-index.ts fully updated)
- [x] `sitemap.xml` contains path-based URLs
- [x] `pnpm build --filter web` succeeds (125 static pages)
- [x] No visual regression for human users
- [ ] LLM tools (WebFetch) see real content, not 404 text *(requires deployment to verify)*

---

### 1.3 Fix the title tag

**Status: ✅ COMPLETE (2026-02-16).** Layout now uses `title.template: "%s — Sage Design Engine"` and each page provides its own title via `generateMetadata`. Verified in build HTML:
- `/docs` → "Documentation — Sage Design Engine"
- `/docs/actions/button` → "Button — Actions — Sage Design Engine"
- `/docs/tokens/colors` → "Colors — Design Tokens — Sage Design Engine"

**Acceptance criteria:**
- [x] No page title contains "undefined"
- [x] Homepage title: "Sage Design Engine"
- [x] Docs overview: "Documentation — Sage Design Engine"
- [x] Component pages: "{ComponentName} — {Category} — Sage Design Engine"

### 1.4 Server-render critical content

**Status: ✅ COMPLETE (2026-02-16).** Automatically achieved by the path-based routing migration (Fix B). All 125 docs pages are statically generated with full HTML content via `generateStaticParams`. Machines see real content without JavaScript.

---

## Workstream 2: Dependency Architecture (Protect Bundle 4/5)

### ~~2.1 Pin framer-motion to ^12.0.0~~ — **Done**

### ~~2.2 Single-component deps resolved~~ — **Done**

cmdk, embla-carousel-react, input-otp, react-resizable-panels, and vaul are now regular dependencies (bundled into the package). This eliminated the wildcard peer dep issue that caused AI code generation uncertainty.

**Note:** The original plan proposed moving these to `peerDependencies` with `optional: true`. The chosen approach (keeping them as regular deps) trades a slightly larger install footprint for zero-configuration DX. This is a reasonable tradeoff for a batteries-included library.

### 2.3 Consider further subpath splitting

The current 10 subpath exports are a strong start. Consider whether the core 146KB bundle could be further split:

| Potential Subpath | What It Contains | Estimated Size |
|---|---|---|
| `@thesage/ui/backgrounds` | WarpBackground, FaultyTerminal, OrbBackground | ~5-8KB |
| `@thesage/ui/cursor` | SplashCursor, TargetCursor | ~3-5KB |
| `@thesage/ui/motion` | AnimatedBeam | ~2-3KB |

**Implementation guide:**

These are the heaviest framer-motion-dependent components. Splitting them follows the existing pattern:

**Step 1:** Create new subpath entry files in `packages/ui/src/`:

```typescript
// packages/ui/src/backgrounds.ts
export { WarpBackground } from './components/backgrounds/WarpBackground'
export { FaultyTerminal } from './components/backgrounds/FaultyTerminal'
export { OrbBackground } from './components/backgrounds/OrbBackground'

// packages/ui/src/cursor.ts
export { SplashCursor } from './components/cursor/SplashCursor'
export { TargetCursor } from './components/cursor/TargetCursor'

// packages/ui/src/motion.ts
export { AnimatedBeam } from './components/motion/AnimatedBeam'
```

**Step 2:** Add entries to `packages/ui/tsup.config.ts`:

```typescript
entry: [
  // ... existing entries
  'src/backgrounds.ts',
  'src/cursor.ts',
  'src/motion.ts',
],
```

**Step 3:** Add exports to `packages/ui/package.json`:

```json
"./backgrounds": {
  "types": "./dist/backgrounds.d.ts",
  "import": "./dist/backgrounds.mjs",
  "require": "./dist/backgrounds.js"
},
"./cursor": { /* same pattern */ },
"./motion": { /* same pattern */ }
```

**Step 4:** Remove these components from the main `src/index.ts` barrel export (breaking change — requires major version bump or deprecation period).

**Step 5:** Add size-limit entries in `package.json`:

```json
{ "path": "dist/backgrounds.mjs", "limit": "10 KB" },
{ "path": "dist/cursor.mjs", "limit": "5 KB" },
{ "path": "dist/motion.mjs", "limit": "5 KB" }
```

**Acceptance criteria:**
- [ ] `import { WarpBackground } from '@thesage/ui/backgrounds'` works
- [ ] Main bundle size decreases by the size of the extracted components
- [ ] `pnpm size:check` passes with new limits

### 2.4 Document the dependency philosophy

**Implementation guide:**

Add a `## Bundle Architecture` section to three files:

**File 1: `README.md`** — add after the installation section:

```markdown
## Bundle Architecture

SDE uses subpath exports to keep your bundle lean. Only import what you use:

| Import | Size (min+brotli) | What's Included |
|--------|-------------------|-----------------|
| `@thesage/ui` | 146 KB | All 92 base components |
| `@thesage/ui/dates` | 29 KB | Calendar, DatePicker (requires date-fns) |
| `@thesage/ui/tables` | 8 KB | DataTable (requires @tanstack/react-table) |
| `@thesage/ui/forms` | 9 KB | Form integration (requires react-hook-form + zod) |
| `@thesage/ui/dnd` | 8 KB | DragDrop (requires @dnd-kit) |

Heavy optional dependencies are peer deps — install only what your app needs.
```

**File 2: Append to `llms-full.txt`** at the end of the existing content (before any closing markers).

**File 3: `AGENTS.md`** — add to the "UI & Styling" or "Development" section.

**Acceptance criteria:**
- [ ] README.md contains a bundle size table
- [ ] llms-full.txt contains the same information
- [ ] AGENTS.md references the subpath export strategy

---

## Workstream 3: Close the Customizability Gap (4→5)

*The highest-leverage remaining gap (-3 weighted points).*

### 3.1 Add an `eject` command to the MCP server

**Implementation guide:**

**File to edit:** `packages/mcp/src/index.ts`

Add a new tool definition to the existing `TOOLS` array:

```typescript
{
  name: 'eject_component',
  description: 'Copy a component\'s source code into your local project for full customization. The component is copied from node_modules/@thesage/ui into your components/ui/ directory with import paths rewritten to use local files.',
  inputSchema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'Component name (e.g., "Button", "Card", "Dialog")'
      },
      targetDir: {
        type: 'string',
        description: 'Target directory relative to project root. Defaults to "src/components/ui"'
      }
    },
    required: ['name']
  }
}
```

Add the handler in the `server.setRequestHandler(CallToolRequestSchema, ...)` block:

```typescript
case 'eject_component': {
  const name = args.name as string
  const targetDir = (args.targetDir as string) || 'src/components/ui'
  const component = getComponent(name)
  if (!component) {
    return { content: [{ type: 'text', text: `Component "${name}" not found.` }] }
  }

  // Map component name to source file path within the package
  const categoryMap: Record<string, string> = {
    'actions': 'components/actions',
    'forms': 'components/forms',
    'navigation': 'components/navigation',
    'overlays': 'components/overlays',
    'feedback': 'components/feedback',
    'data-display': 'components/data-display',
    'layout': 'components/layout',
    'backgrounds': 'components/backgrounds',
    'cursor': 'components/cursor',
    'motion': 'components/motion',
    'blocks': 'components/blocks',
  }

  const srcPath = `node_modules/@thesage/ui/src/${categoryMap[component.category]}/${name}.tsx`
  const destPath = `${targetDir}/${name}.tsx`

  // Return instructions for the AI agent to execute
  const instructions = [
    `## Eject: ${name}`,
    ``,
    `**Step 1:** Copy the source file:`,
    `\`\`\`bash`,
    `mkdir -p ${targetDir}`,
    `cp ${srcPath} ${destPath}`,
    `\`\`\``,
    ``,
    `**Step 2:** Rewrite imports in the copied file:`,
    `- Change \`from '../../lib/utils'\` → \`from '@/lib/utils'\``,
    `- Change \`from '../actions/Button'\` → \`from '@thesage/ui'\` (keep using package for non-ejected deps)`,
    `- Change \`from '../../hooks/useMotionPreference'\` → \`from '@thesage/ui/hooks'\``,
    ``,
    `**Step 3:** Update your app imports:`,
    `\`\`\`tsx`,
    `// Before:`,
    `import { ${name} } from '@thesage/ui'`,
    `// After:`,
    `import { ${name} } from '@/${targetDir}/${name}'`,
    `\`\`\``,
    ``,
    `**Step 4:** Ensure \`cn()\` utility exists locally:`,
    `\`\`\`tsx`,
    `// src/lib/utils.ts`,
    `import { clsx, type ClassValue } from 'clsx'`,
    `import { twMerge } from 'tailwind-merge'`,
    `export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) }`,
    `\`\`\``,
    ``,
    `You now own this component. Modify it freely.`,
  ].join('\n')

  return { content: [{ type: 'text', text: instructions }] }
}
```

**Also update** `packages/mcp/src/registry.ts` — add a `sourcePath` field to each component entry so eject knows where to find it:

```typescript
{
  name: 'Button',
  category: 'actions',
  sourcePath: 'components/actions/Button.tsx',  // ADD THIS
  // ... rest of entry
}
```

### 3.2 Add an `eject` CLI command

**Implementation guide:**

Create a new file: `packages/ui/src/cli.ts`

```typescript
#!/usr/bin/env node

import { existsSync, mkdirSync, copyFileSync, readFileSync, writeFileSync } from 'fs'
import { resolve, join, dirname } from 'path'

const CATEGORY_MAP: Record<string, string> = {
  Button: 'actions', Link: 'actions', Toggle: 'actions', ToggleGroup: 'actions', Magnetic: 'actions',
  Input: 'forms', Textarea: 'forms', Select: 'forms', Combobox: 'forms', Checkbox: 'forms',
  Switch: 'forms', Slider: 'forms', RadioGroup: 'forms', Label: 'forms', Form: 'forms',
  InputOTP: 'forms', SearchBar: 'forms', FilterButton: 'forms', ThemeSwitcher: 'forms',
  ThemeToggle: 'forms', ColorPicker: 'forms', DragDrop: 'forms', TextField: 'forms',
  Tabs: 'navigation', Breadcrumb: 'navigation', Command: 'navigation', Pagination: 'navigation',
  NavigationMenu: 'navigation', Menubar: 'navigation', NavLink: 'navigation',
  SecondaryNav: 'navigation', TertiaryNav: 'navigation', Breadcrumbs: 'navigation',
  Dialog: 'overlays', AlertDialog: 'overlays', Sheet: 'overlays', Drawer: 'overlays',
  DropdownMenu: 'overlays', ContextMenu: 'overlays', Popover: 'overlays',
  HoverCard: 'overlays', Tooltip: 'overlays', Modal: 'overlays', Dropdown: 'overlays',
  Alert: 'feedback', Progress: 'feedback', ProgressBar: 'feedback',
  Skeleton: 'feedback', Spinner: 'feedback',
  Card: 'data-display', Badge: 'data-display', Table: 'data-display', Avatar: 'data-display',
  Heading: 'data-display', Text: 'data-display', Code: 'data-display',
  CollapsibleCodeBlock: 'data-display', DescriptionList: 'data-display', Brand: 'data-display',
  AspectImage: 'data-display', VariableWeightText: 'data-display', Typewriter: 'data-display',
  GitHubIcon: 'data-display',
  Accordion: 'layout', Separator: 'layout', ScrollArea: 'layout', AspectRatio: 'layout',
  Collapsible: 'layout', Carousel: 'layout', Resizable: 'layout', Grid: 'layout',
  Container: 'layout', Stack: 'layout', Sidebar: 'layout', Header: 'layout', Footer: 'layout',
  CustomizerPanel: 'layout', PageLayout: 'layout', PageTemplate: 'layout', DatePicker: 'layout',
  WarpBackground: 'backgrounds', FaultyTerminal: 'backgrounds', OrbBackground: 'backgrounds',
  SplashCursor: 'cursor', TargetCursor: 'cursor',
  AnimatedBeam: 'motion',
  Hero: 'blocks', OpenGraphCard: 'blocks/social',
}

function eject(names: string[], targetDir: string) {
  // Find the package source directory
  const pkgDir = resolve(process.cwd(), 'node_modules/@thesage/ui/src')
  if (!existsSync(pkgDir)) {
    console.error('Error: @thesage/ui not found in node_modules. Run `pnpm add @thesage/ui` first.')
    process.exit(1)
  }

  for (const name of names) {
    const category = CATEGORY_MAP[name]
    if (!category) {
      console.error(`Unknown component: ${name}. Run 'npx @thesage/ui list' to see all components.`)
      continue
    }

    const srcFile = join(pkgDir, 'components', category, `${name}.tsx`)
    if (!existsSync(srcFile)) {
      console.error(`Source not found: ${srcFile}`)
      continue
    }

    const destDir = resolve(process.cwd(), targetDir)
    mkdirSync(destDir, { recursive: true })
    const destFile = join(destDir, `${name}.tsx`)

    // Copy and rewrite imports
    let content = readFileSync(srcFile, 'utf-8')
    content = content.replace(/from\s+['"]\.\.\/\.\.\/lib\/utils['"]/g, "from '@/lib/utils'")
    content = content.replace(/from\s+['"]\.\.\/\.\.\/hooks\/[^'"]+['"]/g, "from '@thesage/ui/hooks'")
    content = content.replace(/from\s+['"]\.\.\/[^'"]+['"]/g, (match) => {
      // Keep inter-component imports pointing at the package
      return match.replace(/from\s+['"]\.\.\//, "from '@thesage/ui/")
    })

    writeFileSync(destFile, content, 'utf-8')
    console.log(`✓ Ejected ${name} → ${destFile}`)
  }
}

// Parse CLI args
const args = process.argv.slice(2)
if (args[0] === 'eject') {
  const components = args.slice(1).filter(a => !a.startsWith('--'))
  const targetDir = args.find(a => a.startsWith('--dir='))?.split('=')[1] || 'src/components/ui'
  if (components.length === 0) {
    console.error('Usage: npx @thesage/ui eject <Component1> [Component2] [--dir=path]')
    process.exit(1)
  }
  eject(components, targetDir)
} else if (args[0] === 'list') {
  const categories = new Map<string, string[]>()
  for (const [name, cat] of Object.entries(CATEGORY_MAP)) {
    if (!categories.has(cat)) categories.set(cat, [])
    categories.get(cat)!.push(name)
  }
  for (const [cat, names] of categories) {
    console.log(`\n${cat}:`)
    console.log(`  ${names.join(', ')}`)
  }
} else {
  console.log('Sage Design Engine CLI')
  console.log('  npx @thesage/ui eject <Component> [--dir=path]  Copy component source locally')
  console.log('  npx @thesage/ui list                            List all components')
}
```

**Add to `packages/ui/package.json`:**

```json
"bin": {
  "sage-ui": "dist/cli.js"
}
```

**Add to `packages/ui/tsup.config.ts` entry array:**

```typescript
'src/cli.ts',
```

**Acceptance criteria:**
- [ ] `npx @thesage/ui eject Button` copies `Button.tsx` into `src/components/ui/Button.tsx`
- [ ] Copied file has rewritten imports (no relative `../../` paths)
- [ ] `npx @thesage/ui list` prints all 92 components by category
- [ ] `npx @thesage/ui eject Button Card Dialog` ejects all three in one command

### 3.3 Expose the cva variant definitions

**Implementation guide:**

Many components already export variants (e.g., `Button.tsx` exports `buttonVariants`). Audit all CVA-using components and ensure each one exports its variants.

**Search for components with CVA that don't export variants:**

```bash
# In packages/ui/src/
rg "const \w+Variants = cva" --type tsx -l   # Find all CVA definitions
rg "export.*Variants" --type tsx -l           # Find which ones export
# Diff the two lists — missing exports are the gap
```

For each missing export, the fix is adding the `export` keyword:

```typescript
// BEFORE:
const cardVariants = cva(...)

// AFTER:
export const cardVariants = cva(...)
```

Then ensure each variants export appears in the category `index.ts` and main `index.ts`:

```typescript
// packages/ui/src/components/data-display/index.ts
export { Card, cardVariants } from './Card'
```

**Acceptance criteria:**
- [ ] Every component using CVA exports its `*Variants` function
- [ ] `import { buttonVariants, cardVariants, badgeVariants } from '@thesage/ui'` works
- [ ] TypeScript autocompletion shows variant options

---

## Workstream 4: Add Page-Level Blocks (Component Coverage 4→5)

shadcn's 27 blocks are a major practical advantage. SDE currently has 2 blocks (Hero, OpenGraphCard). Needs 10+ more to be competitive.

### 4.1 Create 12+ page-level blocks

**Implementation guide:**

**File location pattern:** `packages/ui/src/components/blocks/{BlockName}.tsx`

**Follow the HeroBlock pattern exactly.** Every block must:

1. Use `'use client'` directive (blocks are interactive)
2. Import only from sibling components using relative paths (e.g., `from '../actions/Button'`)
3. Use `useMotionPreference` for any animations
4. Accept a `className` prop for layout overrides
5. Use CSS variables for all colors (never hardcoded hex)
6. Export a typed props interface named `{BlockName}Props`

**Example: `LoginBlock` (P0)**

Create `packages/ui/src/components/blocks/LoginBlock.tsx`:

```tsx
'use client'

import { cn } from '../../lib/utils'
import { Button } from '../actions/Button'
import { Card } from '../data-display/Card'
import { Input } from '../forms/Input'
import { Label } from '../forms/Label'
import { Text } from '../data-display/Text'
import { Heading } from '../data-display/Heading'

export interface LoginBlockProps {
  className?: string
  title?: string
  description?: string
  onSubmit?: (email: string, password: string) => void
  showForgotPassword?: boolean
  showSignupLink?: boolean
  logo?: React.ReactNode
}

export function LoginBlock({
  className,
  title = 'Welcome back',
  description = 'Enter your credentials to continue',
  onSubmit,
  showForgotPassword = true,
  showSignupLink = true,
  logo,
}: LoginBlockProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    onSubmit?.(form.get('email') as string, form.get('password') as string)
  }

  return (
    <div className={cn('flex min-h-screen items-center justify-center p-4', className)}>
      <Card className="w-full max-w-md p-8">
        {logo && <div className="mb-6 flex justify-center">{logo}</div>}
        <div className="mb-6 text-center">
          <Heading as="h1" size="lg">{title}</Heading>
          <Text variant="secondary" className="mt-2">{description}</Text>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="you@example.com" required />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              {showForgotPassword && (
                <a href="#forgot" className="text-sm text-primary hover:underline">Forgot password?</a>
              )}
            </div>
            <Input id="password" name="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">Sign in</Button>
        </form>
        {showSignupLink && (
          <Text variant="secondary" className="mt-6 text-center text-sm">
            Don't have an account? <a href="#signup" className="text-primary hover:underline">Sign up</a>
          </Text>
        )}
      </Card>
    </div>
  )
}
```

**Repeat this pattern for each block in the priority table.** The key blocks to build (P0):

| Block | File | Key composition |
|---|---|---|
| `LoginBlock` | `blocks/LoginBlock.tsx` | Card + Input + Button + Label |
| `SignupBlock` | `blocks/SignupBlock.tsx` | Card + Input + Select + Checkbox + Button |
| `DashboardBlock` | `blocks/DashboardBlock.tsx` | Sidebar + Header + Grid + Card |
| `SettingsBlock` | `blocks/SettingsBlock.tsx` | Tabs + Card + Switch + Select + Input |
| `DataTableBlock` | `blocks/DataTableBlock.tsx` | Card + SearchBar + DataTable + Pagination |
| `FormBlock` | `blocks/FormBlock.tsx` | Card + Input + Textarea + Select + Button |
| `SidebarBlock` | `blocks/SidebarBlock.tsx` | Sidebar compound with Header/Content/Footer |

**After creating each block, do the full registration sequence:**

1. Export from `packages/ui/src/components/blocks/index.ts`
2. Export from `packages/ui/src/index.ts`
3. Add to `packages/ui/src/component-registry.ts`
4. Add to `packages/mcp/src/registry.ts` with full metadata
5. Write a test in `packages/ui/src/components/blocks/{BlockName}.test.tsx`
6. Create a changeset: `pnpm changeset` → "feat: add {BlockName} block"

**Test pattern for blocks:**

```tsx
// packages/ui/src/components/blocks/LoginBlock.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { LoginBlock } from './LoginBlock'

describe('LoginBlock', () => {
  it('renders with default props', () => {
    render(<LoginBlock />)
    expect(screen.getByText('Welcome back')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
  })

  it('calls onSubmit with email and password', async () => {
    const user = userEvent.setup()
    const handleSubmit = vi.fn()
    render(<LoginBlock onSubmit={handleSubmit} />)
    await user.type(screen.getByLabelText('Email'), 'test@example.com')
    await user.type(screen.getByLabelText('Password'), 'password123')
    await user.click(screen.getByRole('button', { name: /sign in/i }))
    expect(handleSubmit).toHaveBeenCalledWith('test@example.com', 'password123')
  })

  it('hides forgot password link when disabled', () => {
    render(<LoginBlock showForgotPassword={false} />)
    expect(screen.queryByText(/forgot password/i)).not.toBeInTheDocument()
  })

  it('accepts custom className', () => {
    const { container } = render(<LoginBlock className="custom-class" />)
    expect(container.firstChild).toHaveClass('custom-class')
  })
})
```

### 4.2 Register blocks in the MCP server

**Implementation guide:**

**File to edit:** `packages/mcp/src/index.ts`

Add two new tools to the `TOOLS` array:

```typescript
{
  name: 'list_blocks',
  description: 'List all page-level block templates. Blocks are pre-composed layouts using multiple SDE components. Use these as starting points for common page patterns (dashboards, login, settings, etc.)',
  inputSchema: {
    type: 'object',
    properties: {
      category: {
        type: 'string',
        enum: ['auth', 'dashboard', 'data', 'settings', 'navigation', 'marketing'],
        description: 'Filter by block category'
      }
    }
  }
},
{
  name: 'get_block',
  description: 'Get a complete, copy-paste-ready page block with full source code. Returns a working React component that composes multiple SDE components.',
  inputSchema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'Block name (e.g., "LoginBlock", "DashboardBlock", "SettingsBlock")'
      }
    },
    required: ['name']
  }
}
```

**File to edit:** `packages/mcp/src/registry.ts`

Add a `BLOCK_REGISTRY` alongside the existing `COMPONENT_REGISTRY`:

```typescript
export const BLOCK_REGISTRY = [
  {
    name: 'LoginBlock',
    category: 'auth',
    description: 'Complete login page with email/password form, forgot password link, and signup redirect',
    components: ['Card', 'Input', 'Button', 'Label', 'Text', 'Heading'],
    props: [
      { name: 'title', type: 'string', default: 'Welcome back' },
      { name: 'onSubmit', type: '(email: string, password: string) => void' },
      { name: 'showForgotPassword', type: 'boolean', default: 'true' },
      { name: 'showSignupLink', type: 'boolean', default: 'true' },
      { name: 'logo', type: 'React.ReactNode' },
    ],
    source: '/* full source code of LoginBlock.tsx */',
  },
  // ... repeat for each block
]
```

### 4.3 Add blocks to llms-full.txt

**Implementation guide:**

**File to edit:** `apps/web/public/llms-full.txt` (or wherever the site generates/serves it)

Add a new section after the existing component categories:

```
## BLOCKS — Pre-composed page templates

Blocks combine multiple SDE components into complete, working page layouts.
Import: `import { LoginBlock } from '@thesage/ui'`

### LoginBlock
Category: auth
Components used: Card, Input, Button, Label, Text, Heading
Props:
  - title (string, default: "Welcome back")
  - description (string)
  - onSubmit ((email: string, password: string) => void)
  - showForgotPassword (boolean, default: true)
  - showSignupLink (boolean, default: true)
  - logo (React.ReactNode)

Example:
```tsx
<LoginBlock
  title="Sign in to Speedboat"
  onSubmit={(email, password) => auth.signIn(email, password)}
  logo={<img src="/logo.svg" alt="Speedboat" />}
/>
```

### DashboardBlock
...
```

**Acceptance criteria:**
- [ ] 12+ blocks exist in `packages/ui/src/components/blocks/`
- [ ] All blocks are exported from `@thesage/ui`
- [ ] All blocks have test files
- [ ] MCP `list_blocks` returns all blocks
- [ ] MCP `get_block` returns full source for each block
- [ ] llms-full.txt includes all blocks with props and examples
- [ ] `pnpm build && pnpm test` passes

---

## Workstream 5: Deepen the AI Integration Lead (Protect 5/5, Widen Gap)

### ~~5.1 Serve `/docs/api.json`~~ — **Done**
### ~~5.2 AI discovery endpoints~~ — **Done**
### ~~5.3 `.claude/CLAUDE.md` in npm package~~ — **Done**

### 5.4 Expand MCP server to match and exceed shadcn's 7 tools

**Implementation guide:**

**File to edit:** `packages/mcp/src/index.ts`

The MCP server uses `@modelcontextprotocol/sdk`. Each tool follows this pattern:

```typescript
// 1. Define in TOOLS array
{ name: 'tool_name', description: '...', inputSchema: { ... } }

// 2. Handle in the CallToolRequest handler
case 'tool_name': {
  // Process args, return { content: [{ type: 'text', text: '...' }] }
}
```

**New tools to add (with full definitions):**

```typescript
// Add to TOOLS array:

{
  name: 'get_app_shell',
  description: 'Returns a complete, ready-to-use app shell with ThemeProvider, TooltipProvider, Toaster, tailwind.config, postcss.config, and globals.css import. Use this when scaffolding a new project with SDE.',
  inputSchema: {
    type: 'object',
    properties: {
      framework: {
        type: 'string',
        enum: ['nextjs', 'vite'],
        description: 'Target framework. Defaults to "vite".'
      },
      theme: {
        type: 'string',
        enum: ['studio', 'terra', 'volt'],
        description: 'Default theme. Defaults to "studio".'
      }
    }
  }
},
{
  name: 'get_examples',
  description: 'Get usage examples for a specific component, including common patterns, compound component usage, and integration with other SDE components.',
  inputSchema: {
    type: 'object',
    properties: {
      name: { type: 'string', description: 'Component name' }
    },
    required: ['name']
  }
},
{
  name: 'get_audit_checklist',
  description: 'Returns a post-generation checklist to verify SDE component usage is correct. Checks: provider wrapping, CSS variable usage (no hardcoded colors), accessibility attributes, motion preference respect, and import correctness.',
  inputSchema: { type: 'object', properties: {} }
},
{
  name: 'get_tokens',
  description: 'Returns all CSS custom property values for a given theme and mode. Use this to understand available colors, spacing, and typography values.',
  inputSchema: {
    type: 'object',
    properties: {
      theme: { type: 'string', enum: ['studio', 'terra', 'volt'] },
      mode: { type: 'string', enum: ['light', 'dark'] }
    }
  }
}
```

**Handler implementations:**

```typescript
case 'get_app_shell': {
  const framework = (args.framework as string) || 'vite'
  const theme = (args.theme as string) || 'studio'

  const viteShell = `// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider, TooltipProvider, Toaster } from '@thesage/ui'
import '@thesage/ui/globals.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="${theme}" defaultMode="system">
      <TooltipProvider delayDuration={300}>
        <App />
        <Toaster position="bottom-right" />
      </TooltipProvider>
    </ThemeProvider>
  </React.StrictMode>
)

// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}', './node_modules/@thesage/ui/dist/**/*.{js,mjs}'],
  darkMode: 'class',
  theme: { extend: {} },
  plugins: [require('tailwindcss-animate')],
}

// postcss.config.js
export default {
  plugins: { tailwindcss: {}, autoprefixer: {} },
}`

  const nextShell = `// app/layout.tsx
import { ThemeProvider, TooltipProvider, Toaster } from '@thesage/ui'
import '@thesage/ui/globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="${theme}" defaultMode="system">
          <TooltipProvider delayDuration={300}>
            {children}
            <Toaster position="bottom-right" />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}`

  const shell = framework === 'nextjs' ? nextShell : viteShell
  return { content: [{ type: 'text', text: shell }] }
}

case 'get_audit_checklist': {
  const checklist = `## SDE Usage Audit Checklist

### Provider Wrapping
- [ ] ThemeProvider wraps the entire app
- [ ] TooltipProvider wraps any area using Tooltip components
- [ ] <Toaster /> is rendered (required for toast notifications)

### Styling
- [ ] No hardcoded colors (no bg-white, text-black, bg-blue-500)
- [ ] All colors use CSS variables (bg-background, text-foreground, bg-primary, etc.)
- [ ] className merging uses cn() utility, not string concatenation
- [ ] Dark mode classes use dark: prefix where needed

### Accessibility
- [ ] All interactive elements are keyboard-navigable
- [ ] Dialogs trap focus and return focus on close
- [ ] Form inputs have associated Label components
- [ ] Animated components use useMotionPreference hook
- [ ] AlertDialog used (not Dialog) for destructive confirmations

### Imports
- [ ] Components imported from '@thesage/ui' (not relative paths to node_modules)
- [ ] Heavy features use subpath imports (@thesage/ui/dates, /tables, /forms, /dnd)
- [ ] No duplicate imports (e.g., importing Button from both @thesage/ui and a local file)`

  return { content: [{ type: 'text', text: checklist }] }
}

case 'get_tokens': {
  const theme = (args.theme as string) || 'studio'
  const mode = (args.mode as string) || 'light'
  // Import from the tokens data in the registry or a separate tokens file
  const tokens = getThemeTokens(theme, mode)  // Implement this using @thesage/tokens data
  return { content: [{ type: 'text', text: JSON.stringify(tokens, null, 2) }] }
}

case 'get_examples': {
  const name = args.name as string
  const component = getComponent(name)
  if (!component) {
    return { content: [{ type: 'text', text: `Component "${name}" not found.` }] }
  }
  // Return the examples array from the registry entry
  const examples = component.examples?.join('\n\n---\n\n') || 'No examples available.'
  return { content: [{ type: 'text', text: `## ${name} Examples\n\n${examples}` }] }
}
```

**Acceptance criteria:**
- [ ] `list_components`, `search_components`, `get_component`, `install_component` (existing)
- [ ] `eject_component` (from WS3)
- [ ] `list_blocks`, `get_block` (from WS4)
- [ ] `get_app_shell`, `get_examples`, `get_audit_checklist`, `get_tokens` (this WS)
- [ ] Total: 11 tools (can add `validate_props` as a 12th stretch goal)
- [ ] Bump version in `packages/mcp/package.json` to `0.8.0`

### 5.5 Sync MCP to all 92 components across 11 categories

**Implementation guide:**

**Step 1:** Identify the 3 missing components. Run a diff between the MCP registry and llms-full.txt:

```bash
# Extract component names from MCP registry
rg '"name":' packages/mcp/src/registry.ts | wc -l  # Should be 92

# Compare against llms-full.txt component list
# The 3 missing are likely in Backgrounds, Cursor, Motion, or Blocks categories
```

**Step 2:** For each missing component, add a full entry to `packages/mcp/src/registry.ts` following the existing pattern:

```typescript
{
  name: 'ComponentName',
  category: 'category-name',
  description: '...',
  keywords: ['...'],
  useCases: ['...'],
  dependencies: ['...'],
  props: [
    { name: 'propName', type: 'string', required: false, description: '...' }
  ],
  examples: ['```tsx\n<ComponentName />\n```'],
}
```

**Step 3:** Verify all 11 categories appear in the `list_components` category enum.

**Acceptance criteria:**
- [ ] `list_components` with no filter returns exactly 92 components
- [ ] `list_components` with each of the 11 category values returns components
- [ ] Every component from llms-full.txt is findable via `search_components`

### 5.6 Enhance llms-full.txt with competitive features

**Implementation guide:**

**File to edit:** The llms-full.txt source file (likely generated from the docs site build or stored in `apps/web/public/llms-full.txt`).

Add these sections at the top (before component listings) and bottom (after component listings):

**At the very top — version header:**

```
# Sage Design Engine — Complete Component Reference
# Version: 1.0.3 | React 18/19 | Next.js 15+ | Tailwind 3.4+ | framer-motion ^12
# Components: 92 | Themes: 3 | Blocks: 14+
# Last verified: 2026-02-15
# Package: pnpm add @thesage/ui
# MCP: npx @thesage/mcp
```

**After the Quick Start section — complete app shell:**

```
## COMPLETE APP SHELL (copy-paste ready)

### Vite + React
// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider, TooltipProvider, Toaster } from '@thesage/ui'
import '@thesage/ui/globals.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="studio" defaultMode="system">
      <TooltipProvider delayDuration={300}>
        <App />
        <Toaster position="bottom-right" />
      </TooltipProvider>
    </ThemeProvider>
  </React.StrictMode>
)

// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}', './node_modules/@thesage/ui/dist/**/*.{js,mjs}'],
  darkMode: 'class',
  theme: { extend: {} },
  plugins: [require('tailwindcss-animate')],
}
```

**After all component listings — error recovery patterns:**

```
## COMMON MISTAKES & FIXES

WRONG: <Button className="bg-blue-500">    → hardcoded color
RIGHT: <Button variant="default">           → use variant prop

WRONG: <Dialog>content</Dialog>              → missing compound structure
RIGHT: <Dialog><DialogTrigger>...</DialogTrigger><DialogContent>...</DialogContent></Dialog>

WRONG: import { Button } from '@thesage/ui/components/actions/Button'
RIGHT: import { Button } from '@thesage/ui'

WRONG: <div className="bg-white dark:bg-gray-900">
RIGHT: <div className="bg-background">      → CSS variable handles mode

WRONG: Using Dialog for destructive confirmations
RIGHT: Use AlertDialog — it prevents accidental dismissal
```

**After error patterns — component selection decision table:**

```
## WHICH COMPONENT SHOULD I USE?

Confirm destructive action     → AlertDialog (not Dialog — prevents accidental dismiss)
Side panel content             → Sheet (not Drawer — Sheet is for desktop, Drawer for mobile)
Searchable dropdown            → Combobox (not Select — Combobox has built-in search)
Boolean toggle                 → Switch (not Checkbox — Switch for instant effect, Checkbox for forms)
Multi-select                   → Checkbox group (not Select — Select is single-value)
File upload                    → DragDrop from @thesage/ui/dnd
Date selection                 → DatePicker from @thesage/ui/dates (wraps Calendar + Popover)
Data grid with sort/filter     → DataTable from @thesage/ui/tables
Form validation                → Form from @thesage/ui/forms (wraps react-hook-form)
```

**After decision table — composition compatibility:**

```
## COMPOSITION COMPATIBILITY

✅ SAFE combinations:
  Dialog + Form           — common: form inside dialog
  Sheet + Tabs            — common: tabbed side panel
  Card + Accordion        — common: expandable card sections
  Sidebar + NavigationMenu — common: app navigation
  Popover + Command       — common: searchable dropdown (this is how Combobox works)

❌ AVOID these combinations:
  Drawer + Sheet          — don't nest overlays
  Dialog + Dialog         — don't nest dialogs
  Tooltip + inside Dialog — tooltip disappears when dialog opens
  DropdownMenu + inside Sheet — z-index conflicts possible

⚠️ USE WITH CARE:
  Toast + Dialog          — toast may appear behind dialog; ensure Toaster is at root level
  HoverCard + mobile      — HoverCard doesn't work on touch devices; use Popover instead
```

### 5.7 Create a JSON registry schema

**Implementation guide:**

Create `apps/web/public/schema/registry.json`:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Sage Design Engine Component Registry",
  "description": "Schema for the SDE component registry. Third parties can use this schema to create compatible registries.",
  "type": "object",
  "required": ["version", "package", "components"],
  "properties": {
    "version": { "type": "string" },
    "package": { "type": "string" },
    "themes": { "type": "array", "items": { "type": "string" } },
    "components": {
      "type": "array",
      "items": { "$ref": "#/$defs/component" }
    }
  },
  "$defs": {
    "component": {
      "type": "object",
      "required": ["name", "category", "description"],
      "properties": {
        "name": { "type": "string" },
        "category": { "type": "string", "enum": ["actions", "forms", "navigation", "overlays", "feedback", "data-display", "layout", "backgrounds", "cursor", "motion", "blocks"] },
        "description": { "type": "string" },
        "keywords": { "type": "array", "items": { "type": "string" } },
        "dependencies": { "type": "array", "items": { "type": "string" } },
        "props": { "type": "array", "items": { "$ref": "#/$defs/prop" } },
        "examples": { "type": "array", "items": { "type": "string" } }
      }
    },
    "prop": {
      "type": "object",
      "required": ["name", "type"],
      "properties": {
        "name": { "type": "string" },
        "type": { "type": "string" },
        "required": { "type": "boolean" },
        "default": { "type": "string" },
        "description": { "type": "string" },
        "options": { "type": "array", "items": { "type": "string" } }
      }
    }
  }
}
```

**Acceptance criteria:**
- [ ] `https://thesage.dev/schema/registry.json` returns valid JSON Schema
- [ ] The existing `api.json` validates against this schema

---

## Workstream 6: Content Consistency Sweep

### 6.1 Unify the component count everywhere

**Implementation guide:**

| File | Search | Replace |
|---|---|---|
| `README.md` (root) | `48+` or `48+ accessible` | `92 accessible` |
| `packages/mcp/src/registry.ts` | Audit component count | Add 3 missing components to reach 92 |
| `AGENTS.md` | Any stale component count | Update to `92` |
| `apps/web/public/.well-known/mcp-server.json` | Check `components` field | Ensure says `92` |

```bash
# Find all instances of "48" near "component" in the repo
rg "48.*component|component.*48" --type md --type ts --type json
```

**Acceptance criteria:**
- [ ] `rg "48.*component" .` returns zero results
- [ ] MCP `list_components` with no filter returns exactly 92 entries
- [ ] README, AGENTS.md, package.json description, llms.txt, llms-full.txt, api.json, ai-plugin.json, mcp-server.json all say "92"

### 6.2 Reconcile AGENTS.md with current state

**Implementation guide:**

**File:** `AGENTS.md` (root of monorepo)

Update these sections:
- Component count: 92 (not 48+)
- Categories: list all 11
- Subpath exports: list all 10 paths
- Version: 1.0.3
- Test count: 156 tests across 30 files
- CI pipeline: lint + typecheck + test + size:check
- MCP version: 0.7.0 with 4 tools (update when tools expand)

**Acceptance criteria:**
- [ ] AGENTS.md mentions "92 components"
- [ ] AGENTS.md lists all 11 categories
- [ ] AGENTS.md documents all 10 subpath exports

---

## Workstream 7: Developer Experience (Closes Dev Velocity gap risks)

### 7.1 Create starter templates

**Implementation guide:**

A `templates/nextjs-app/` already exists in the monorepo. Create the Vite equivalent.

**Create** `templates/vite-react/`:

```
templates/vite-react/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
├── src/
│   ├── main.tsx           # Provider hierarchy
│   ├── App.tsx            # Sample app with theme switcher
│   ├── lib/
│   │   └── utils.ts       # cn() utility
│   └── vite-env.d.ts
└── .claude/
    └── CLAUDE.md           # AI context for this project
```

**`templates/vite-react/package.json`:**

```json
{
  "name": "sage-app",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@thesage/ui": "^1.0.3",
    "react": "^19.2.1",
    "react-dom": "^19.2.1"
  },
  "devDependencies": {
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@vitejs/plugin-react": "^4.0.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.4.0",
    "tailwindcss-animate": "^1.0.0",
    "typescript": "^5.0.0",
    "vite": "^6.0.0"
  }
}
```

**`templates/vite-react/src/main.tsx`:**

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider, TooltipProvider, Toaster } from '@thesage/ui'
import '@thesage/ui/globals.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="studio" defaultMode="system">
      <TooltipProvider delayDuration={300}>
        <App />
        <Toaster position="bottom-right" />
      </TooltipProvider>
    </ThemeProvider>
  </React.StrictMode>
)
```

**`templates/vite-react/src/App.tsx`:**

```tsx
import { Card, Heading, Text, Button, ThemeToggle, ThemeSwitcher } from '@thesage/ui'

export default function App() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="flex items-center justify-between">
          <Heading as="h1" size="xl">My Sage App</Heading>
          <div className="flex gap-2">
            <ThemeSwitcher />
            <ThemeToggle />
          </div>
        </div>
        <Card className="p-6">
          <Text>Welcome to your new app. Start building!</Text>
          <Button className="mt-4">Get Started</Button>
        </Card>
      </div>
    </div>
  )
}
```

**Acceptance criteria:**
- [ ] `cd templates/vite-react && pnpm install && pnpm dev` starts a working app
- [ ] Theme switching works (Studio/Terra/Volt)
- [ ] Dark mode toggle works
- [ ] No TypeScript errors

### 7.2 Add `npx create-sage-app` CLI

**Implementation guide:**

Create a new package: `packages/create-sage-app/`

```
packages/create-sage-app/
├── package.json
├── tsup.config.ts
└── src/
    └── index.ts
```

**`packages/create-sage-app/package.json`:**

```json
{
  "name": "create-sage-app",
  "version": "0.1.0",
  "bin": { "create-sage-app": "dist/index.js" },
  "files": ["dist"],
  "scripts": { "build": "tsup" },
  "dependencies": { "degit": "^2.8.0" },
  "devDependencies": { "tsup": "^8.0.0", "typescript": "^5.0.0" }
}
```

**`packages/create-sage-app/src/index.ts`:**

```typescript
#!/usr/bin/env node

import { execSync } from 'child_process'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

const args = process.argv.slice(2)
const projectName = args[0]
const templateFlag = args.find(a => a.startsWith('--template='))
const themeFlag = args.find(a => a.startsWith('--theme='))

const template = templateFlag?.split('=')[1] || 'vite-react'
const theme = themeFlag?.split('=')[1] || 'studio'

if (!projectName) {
  console.log('Usage: npx create-sage-app <project-name> [--template=vite-react|nextjs-app] [--theme=studio|terra|volt]')
  process.exit(1)
}

const validTemplates = ['vite-react', 'nextjs-app']
if (!validTemplates.includes(template)) {
  console.error(`Invalid template: ${template}. Choose: ${validTemplates.join(', ')}`)
  process.exit(1)
}

console.log(`Creating ${projectName} with template "${template}" and theme "${theme}"...`)

// Clone the template using degit
execSync(`npx degit shalomormsby/ecosystem/templates/${template} ${projectName}`, { stdio: 'inherit' })

// Replace theme placeholder in main.tsx
const mainFile = resolve(projectName, 'src/main.tsx')
if (existsSync(mainFile)) {
  let content = readFileSync(mainFile, 'utf-8')
  content = content.replace(/defaultTheme="studio"/, `defaultTheme="${theme}"`)
  writeFileSync(mainFile, content)
}

// Replace project name in package.json
const pkgFile = resolve(projectName, 'package.json')
if (existsSync(pkgFile)) {
  let content = readFileSync(pkgFile, 'utf-8')
  content = content.replace(/"name": "sage-app"/, `"name": "${projectName}"`)
  writeFileSync(pkgFile, content)
}

console.log(`\n✓ Created ${projectName}`)
console.log(`\nNext steps:`)
console.log(`  cd ${projectName}`)
console.log(`  pnpm install`)
console.log(`  pnpm dev`)
```

**Acceptance criteria:**
- [ ] `npx create-sage-app my-app` creates a working Vite + React project
- [ ] `npx create-sage-app my-app --template=nextjs-app --theme=terra` uses Next.js template with Terra theme
- [ ] Created project runs without errors after `pnpm install && pnpm dev`

### 7.3 Add framework-specific guides

**Implementation guide:**

Add to `llms-full.txt` after the app shell section:

```
## FRAMEWORK GUIDES

### Vite + React (Recommended for Speedboat)
1. npx create-sage-app my-app --template=vite-react
2. cd my-app && pnpm install
3. pnpm dev
That's it. Provider hierarchy, Tailwind config, and globals.css are pre-configured.

### Next.js App Router
1. npx create-sage-app my-app --template=nextjs-app
2. cd my-app && pnpm install
3. pnpm dev
ThemeProvider is in app/layout.tsx. Components work in both Server and Client components
(interactive components need 'use client' directive).

### Manual Setup (any React project)
1. pnpm add @thesage/ui
2. Add to tailwind.config.js content array:
   './node_modules/@thesage/ui/dist/**/*.{js,mjs}'
3. Import globals: import '@thesage/ui/globals.css'
4. Wrap app in providers:
   <ThemeProvider><TooltipProvider>{children}<Toaster /></TooltipProvider></ThemeProvider>
```

Also create these as standalone markdown files in the docs site for human consumption.

### 7.4 Consider Tailwind v4 support

**Implementation guide:**

For now, add a note to README and llms-full.txt:

```
## Tailwind CSS Compatibility
SDE is built and tested with Tailwind CSS v3.4+.
Tailwind v4 support is planned. Track progress: [link to issue]
```

Create a GitHub issue titled "feat: Tailwind CSS v4 support" to track this publicly.

**Acceptance criteria:**
- [ ] README mentions Tailwind v3.4+ compatibility
- [ ] GitHub issue exists for Tailwind v4 tracking

---

## Workstream 8: Testing & Reliability

### ~~8.1 Increase test coverage~~ — **Substantially done**

156 tests / 30 files. **Remaining:** verify every category has at least one test file.

```bash
# Check which categories have tests
for cat in actions forms navigation overlays feedback data-display layout backgrounds cursor motion blocks; do
  count=$(ls packages/ui/src/components/$cat/*.test.tsx 2>/dev/null | wc -l)
  echo "$cat: $count test files"
done
```

Any category with 0 test files needs at least one test covering its primary component.

### 8.2 Add visual regression tests

**Implementation guide:**

**Option A: Playwright (self-hosted, free)**

Create `packages/ui/playwright.config.ts`:

```typescript
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './src/test/visual',
  use: { baseURL: 'http://localhost:3001' },  // Docs site with component previews
  projects: [
    { name: 'studio-light', use: { colorScheme: 'light' } },
    { name: 'studio-dark', use: { colorScheme: 'dark' } },
    // Add terra and volt when visual test pages support theme switching
  ],
})
```

Create `packages/ui/src/test/visual/button.spec.ts`:

```typescript
import { test, expect } from '@playwright/test'

test('Button renders all variants', async ({ page }) => {
  await page.goto('/docs/components/button')  // Requires WS1 to be done first
  await expect(page.locator('[data-testid="button-default"]')).toHaveScreenshot('button-default.png')
  await expect(page.locator('[data-testid="button-destructive"]')).toHaveScreenshot('button-destructive.png')
})
```

**Blocker:** This depends on WS1 (fix the docs site) since visual tests need rendered component pages. Alternatively, create a dedicated Storybook or test-only preview app.

**Option B: Chromatic (cloud-hosted, requires account)**

Add to `.github/workflows/release.yml`:

```yaml
- name: Visual regression
  run: npx chromatic --project-token=${{ secrets.CHROMATIC_TOKEN }}
```

**Acceptance criteria:**
- [ ] Visual tests exist for at least 10 high-traffic components
- [ ] Tests run across at least 2 theme/mode combinations
- [ ] CI fails on unexpected visual changes

### ~~8.3 Add bundle size CI checks~~ — **Done**

---

## Workstream 9: Strategic Differentiators (The A+ Extras)

### 9.1 Prompt library

**Implementation guide:**

Create `prompts/` directory at the monorepo root:

**`prompts/build-dashboard.md`:**

```markdown
# Build a Dashboard with Sage Design Engine

## Prerequisites
- @thesage/ui installed
- ThemeProvider + TooltipProvider + Toaster at app root
- @thesage/ui/globals.css imported

## Prompt for AI

Build a dashboard page with:
- A collapsible Sidebar on the left using SDE's Sidebar component (SidebarHeader, SidebarContent, SidebarFooter, SidebarItem)
- A Header at the top with the app name and a ThemeToggle
- A main content area using Grid (cols={3}) with Card components showing:
  - A "Revenue" card with a Heading and Text for the value
  - An "Active Users" card with a Badge and Progress bar
  - A "Conversion Rate" card with a Badge
- Below the cards, a DataTable (from @thesage/ui/tables) showing recent transactions

Use CSS variables for all colors (bg-background, text-foreground, etc.).
Use useMotionPreference for any animations.
Import components from '@thesage/ui'.
Import DataTable from '@thesage/ui/tables'.
```

**`prompts/build-settings-page.md`:**

```markdown
# Build a Settings Page with Sage Design Engine

## Prompt for AI

Build a settings page with:
- Tabs component with 3 tabs: "General", "Appearance", "Notifications"
- General tab: Card containing a form with Input (name), Input (email), Textarea (bio), Button (save)
- Appearance tab: Card containing ThemeSwitcher, ThemeToggle, and a Slider for motion intensity
- Notifications tab: Card containing Switch toggles for email, push, and SMS notifications

Use the Form component from @thesage/ui/forms with zod validation for the General tab.
All Switch components should have Label components.
Show a toast (from Sonner/Toaster) on successful save.
```

Create similar files for: `build-auth-flow.md`, `build-landing-page.md`, `build-data-table.md`.

**Acceptance criteria:**
- [ ] 5+ prompt files exist in `prompts/`
- [ ] Each prompt produces working code when given to Claude with the MCP server active
- [ ] README links to the prompts directory

### 9.2 Component compatibility matrix in llms-full.txt

Already specified in WS5.6. The implementation is the same — add the compatibility section to llms-full.txt.

### 9.3 Position `@thesage/mcp` as the reference implementation

**Implementation guide:**

Create `docs/building-a-design-system-mcp.md` in the monorepo:

```markdown
# Building Your Own Design System MCP Server

This guide explains how @thesage/mcp is built, so you can create an MCP server
for your own design system.

## Architecture

An MCP server for a design system needs:
1. A component registry (JSON data with names, props, examples)
2. Tool definitions (list, search, get, install)
3. A stdio transport (for Claude Code, Cursor, etc.)

## Step 1: Create the registry
[show structure of registry.ts]

## Step 2: Define tools
[show tool definitions from index.ts]

## Step 3: Handle requests
[show request handler pattern]

## Step 4: Package and publish
[show package.json with bin field]
```

### 9.4 OpenGraph preview for llms-full.txt

**Implementation guide:**

The llms-full.txt file is served as plain text, so it can't have OG tags. Instead, create a redirect page:

In `apps/web/app/llms-full/page.tsx`:

```tsx
export const metadata = {
  title: 'Sage Design Engine — Complete AI Reference',
  description: '92 components | 3 themes | Full props, types, and recipes for AI-assisted development',
  openGraph: {
    title: 'Sage Design Engine — Complete AI Reference',
    description: '92 components | 3 themes | Full props, types, and recipes',
    url: 'https://thesage.dev/llms-full.txt',
  }
}

export default function LLMsFullPage() {
  // Redirect to the actual text file, but this page provides OG tags for link previews
  redirect('/llms-full.txt')
}
```

### 9.5 Custom HTTP headers

**Implementation guide:**

In `apps/web/next.config.ts` (or `.js`/`.mjs`):

```typescript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Sage-Version', value: '1.0.3' },
          { key: 'X-Sage-Components', value: '92' },
          { key: 'X-Sage-LLM-Ref', value: 'https://thesage.dev/llms-full.txt' },
        ],
      },
    ]
  },
}
```

**Acceptance criteria:**
- [ ] `curl -I https://thesage.dev` shows X-Sage-* headers

---

## Execution Priority (Updated 2026-02-16)

Phases are re-ordered based on what's already done and remaining impact.

| Phase | Workstreams | Impact | Effort | Status |
|---|---|---|---|---|
| **Phase 1a** | RSC payload fix (WS1.1) | Immediately stops LLM false-404 detection | **Low** | **Not started — do first** |
| **Phase 1b** | Path-based routing migration (WS1.2) | Structural fix: real URLs, SSR content, SEO, machine readability | **High** | **Not started — do second** |
| **Phase 2** | Content consistency (WS6) | Quick wins — fix "48+" in README, sync MCP to 92 | Low | **Partially done** |
| **Phase 3** | Eject mechanism (WS3) | Closes Customizability gap 4→5 (**+3 weighted pts**) | Medium | Not started |
| **Phase 4** | Page blocks (WS4) | Closes Component Coverage gap 4→5 (**+4 weighted pts**) | Medium | 2/14 blocks exist |
| **Phase 5** | MCP expansion (WS5.4-5.5) | Widens AI Integration lead (12 tools vs 7) | Medium | 4/12 tools exist |
| **Phase 6** | llms-full.txt enhancements (WS5.6) | Deepens AI documentation advantage | Low | Partially done |
| **Phase 7** | DX polish (WS7) | CLI scaffold, framework guides, templates | Medium | Template exists, CLI doesn't |
| **Phase 8** | Visual regression tests (WS8.2) | Prevents visual regressions across 6 theme configs | Medium | Not started |
| **Phase 9** | Differentiators (WS9) | Prompt library, compatibility matrix, reference MCP guide | Medium | Not started |

**Phase priority rationale:** Phase 1a is a surgical fix that immediately unblocks LLM tools from misreading every page as a 404. Phase 1b is the structural solution — path-based routing gives every section and component a real URL with server-rendered content, proper metadata, and correct HTTP status codes. Everything else depends on the site being machine-readable. Phases 3-4 are the highest-leverage score improvements (+7 weighted points combined).

---

## Projected Scoring After Plan Execution

| Criterion (Weight) | shadcn | SDE (Current) | SDE (After Plan) | Delta vs shadcn |
|---|---|---|---|---|
| AI Integration (5x) | 5 | 5 | **5** | Tied on score, **ahead on depth** (12 tools vs 7, richer llms-full.txt, validated prompts, .claude/ in package, ai-plugin.json, mcp-server.json) |
| Component Coverage (4x) | 4 | 4 | **5** | **+4** (92 components + 14+ blocks vs 56 + 27) |
| Dev Velocity (4x) | 4 | 4 | **4** | Tied (scaffold CLI + framework guides match shadcn's) |
| Customizability (3x) | 5 | 4 | **5** | Tied (eject mechanism + exported variants bridge the gap) |
| Accessibility (3x) | 4 | 4 | **4** | Tied (SDE's motion accessibility is a qualitative differentiator) |
| Community (3x) | 5 | 1 | **1** | **-12** (unchanged — long-term growth required) |
| Theming (2x) | 4 | 5 | **5** | **+2** (SDE retains lead: 3 distinct identities + Zustand persistence) |
| Animation (1x) | 2 | 5 | **5** | **+3** (SDE retains lead: useMotionPreference + 0-10 scale) |
| Bundle (1x) | 5 | 4 | **4** | **-1** (improved from -2, further subpath splitting possible) |
| | | | | |
| **Weighted Total** | **111** | **103** | **117** | **+6 over shadcn** |

The only dimension where shadcn retains a decisive lead is **Community & Stability** (5 vs 1, -12 weighted points). In every other dimension, SDE either matches or exceeds shadcn after executing this plan.

The path from 103→117 runs through:
- **Component Coverage** 4→5: +4 weighted points (blocks)
- **Customizability** 4→5: +3 weighted points (eject mechanism)
- **Bundle** stays at 4: no change (already improved from 3)
- **Leads protected**: Theming (+2) and Animation (+3) maintained

---

## The Community Question

Community can't be manufactured, but it can be earned. The most effective path:

1. **Ship the MCP server as the reference implementation.** Other library authors studying how to build design system MCP servers will discover SDE. The `.well-known/mcp-server.json` endpoint is already a signal of leadership.
2. **Be the most AI-native library.** As AI-assisted development grows, developers will seek tools purpose-built for this workflow. SDE's llms-full.txt, api.json, MCP server, ai-plugin.json, and .claude/ integration make it discoverable by AI agents recommending libraries.
3. **Speedboat as proof.** If Moloco's team ships production apps with SDE, that's real-world validation. Document the case studies.
4. **Open-source contribution model.** Make it easy for others to contribute blocks, themes, and prompts. The `prompts/` directory is especially contribution-friendly.
5. **Fix the website for machines.** A working, polished documentation site is table stakes for community trust. Right now, the false-404 problem (LLMs misreading every page as a 404 due to RSC payload leakage) and hash-based routing (no real URLs for machines to crawl) are the single biggest barriers to AI-driven discovery and SEO.

Community growth is a trailing indicator of quality. Build the best AI-native component library, and the community follows.

---

## Scoreboard Summary

| Milestone | Score | Gap vs shadcn | Status |
|---|---|---|---|
| Initial evaluation | 101/130 | -10 | Baseline |
| After dependency + testing improvements | **103/130** | **-8** | **Current** |
| After eject mechanism (WS3) | 106/130 | -5 | Planned |
| After page blocks (WS4) | 110/130 | -1 | Planned |
| After all workstreams | **117/130** | **+6** | Target |

---

*This plan should be re-evaluated after each optimization pass. Track progress in the [CHANGELOG.md](https://github.com/shalomormsby/ecosystem/blob/main/CHANGELOG.md).*

---

## Appendix: Root Cause Investigation Log (2026-02-16)

Preserved for posterity. The original WS1 diagnosis ("routes return 404") was wrong. Here's what actually happened:

**Original claim:** "The root (thesage.dev), docs (thesage.dev/docs), and every component page return 404."

**Human observation (Shalom):** "I, as a human, do not find this to be true. I see live webpages."

**Investigation findings:**
1. Every page returns HTTP 200. Even completely invalid paths like `/this-does-not-exist` return 200.
2. The 404 perception comes from Next.js embedding the full `not-found.tsx` component tree into every page's RSC flight data. The strings "404", "Sorry, my bad.", and "I can't find the page you're looking for." appear in the raw HTML of every page at positions ~25000-25500.
3. LLM tools (WebFetch, AI crawlers) parse the full HTML, find these 404-related strings, and conclude the page is an error page — a false positive.
4. There is NO middleware, NO bot detection, NO user-agent filtering, NO Vercel WAF blocking. The robots.txt explicitly allows all bots.
5. The structural issue is hash-based routing: the entire docs site is a single `'use client'` SPA at `/docs` with all navigation via `window.location.hash`. Machines can't navigate hash URLs.

**Tools used:** `curl` for HTTP status codes, `grep` for content analysis, codebase search for middleware/bot detection, WebFetch for LLM-perspective testing.
