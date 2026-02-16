---
description: Complete workflow for adding a new component to SDE and registering it across all surfaces
last_updated: 2026-02-16
---

# Register New Component Workflow

Follow this checklist when adding a new component to Sage Design Engine. A component is **not fully registered** until it is discoverable across all 6 surfaces:

1. **Library** — exported from `@thesage/ui`, builds, types resolve
2. **Docs site** — routable page at `/docs/[category]/[component]`
3. **Studio** — interactive playground, sidebar nav, search (Cmd+K)
4. **AI surfaces** — llms-full.txt, MCP registry, api.json
5. **SEO/crawlers** — sitemap (auto-generated), metadata
6. **Package metadata** — component count consistent across all references

Skipping any surface creates the exact data inconsistency problems that required Fixes SB-1 through SB-6 (see `docs/plan-to-improve-sde-to-a-plus.md`).

**Prerequisites:**
- Component design finalized
- Props interface defined
- Category determined: `actions`, `forms`, `navigation`, `overlays`, `feedback`, `data-display`, `layout` (or specialty: `backgrounds`, `cursor`, `blocks`)

---

## Phase 1: Create in Library (`packages/ui`)

### 1.1 Create Component File

Location: `packages/ui/src/components/[category]/[ComponentName].tsx`

Rules:
- **Named exports** only (`export function ComponentName...`), never default exports
- Define a typed props interface (`ComponentNameProps`)
- If the component uses motion, wrap in `useMotionPreference()` check
- Use CSS variables for colors (`bg-background`, `text-foreground`), never hardcoded

### 1.2 Export from Category Index

Location: `packages/ui/src/components/[category]/index.ts`

```typescript
export * from './ComponentName';
```

### 1.3 Export from Main Entry Point

Location: `packages/ui/src/index.ts`

```typescript
export * from './components/[category]/ComponentName';
```

### 1.4 Install Dependencies (if needed)

```bash
pnpm add [package-name] --filter @thesage/ui
```

If the dependency is heavy/optional, add it as a `peerDependency` with `peerDependenciesMeta.optional: true` instead.

### 1.5 Build Library

```bash
pnpm build --filter @thesage/ui
```

This generates `.d.ts` type definitions so downstream apps can resolve the new component.

---

## Phase 2: Register in Docs Routing (`apps/web`)

> **Critical context:** The docs site uses path-based routing via Next.js App Router. The source of truth for all routes is `apps/web/app/docs/route-config.ts`. The dynamic sitemap at `apps/web/app/sitemap.ts` auto-generates from this config.

### 2.1 Add to Route Config (SOURCE OF TRUTH)

Location: `apps/web/app/docs/route-config.ts`

Two changes required:

**A) Add to `SECTION_ITEMS`** — Maps section → valid child slugs:
```typescript
// Find the correct category array and add the slug
forms: [
  'checkbox', 'combobox', /* ... existing items ... */,
  'your-component',  // ← ADD HERE (alphabetical within category)
],
```

**B) Add to `routeConfig`** — Maps slug → human-readable label:
```typescript
forms: {
  label: 'Forms',
  children: {
    /* ... existing children ... */
    'your-component': { label: 'Your Component' },  // ← ADD HERE
  },
},
```

**Why this matters:**
- `SECTION_ITEMS` controls route generation (`generateStaticParams`), 404 behavior, and the redirect handler for `/docs/components/[item]`
- `routeConfig` controls breadcrumb labels and metadata titles
- The sitemap (`apps/web/app/sitemap.ts`) auto-generates from `SECTION_ITEMS` — no manual sitemap changes needed
- If you skip this step, the component page will 404

### 2.2 Register in Studio Component Registry

Location: `apps/web/app/components/lib/component-registry.tsx`

Add a `ComponentConfig` entry with: component reference, description, props config, examples, codeExamples, sourceUrl, and accessibilityNotes.

### 2.3 Add to Category Component List

Location: `apps/web/app/components/studio/ComponentsSection/index.tsx`

Add the component name to the appropriate category in the `COMPONENT_CATEGORIES` object.

### 2.4 Add to Sidebar Navigation

Location: `apps/web/app/lib/navigation-tree.tsx`

```typescript
{ id: 'your-component', label: 'Your Component', section: '[category]' }
```

### 2.5 Add to Search Registry

Location: `apps/web/app/lib/search-index.ts`

```typescript
{
  id: 'your-component',
  title: 'Your Component',
  description: 'Short description...',
  type: 'component',
  category: '[Category]',
  path: '/docs/[category]/your-component',  // Path-based, NOT hash link
  keywords: ['keyword1', 'keyword2'],
}
```

> **Note:** Search paths use `/docs/[category]/[component]` format (path-based routing), NOT `#hash` links.

---

## Phase 3: Update AI & Metadata Surfaces

These surfaces are what AI tools, crawlers, and the npm registry see. Missing or stale data here was the root cause of every SB issue Speedboat identified.

### 3.1 MCP Server Registry (REQUIRED)

Location: `packages/mcp/src/registry.ts`

Add complete metadata for AI discoverability:
```typescript
'your-component': {
  name: 'YourComponent',
  category: 'category',
  description: 'What it does and when to use it.',
  keywords: ['keyword1', 'keyword2'],
  useCases: ['Use case 1', 'Use case 2'],
  dependencies: ['dependency-if-any'],
  radixPrimitive: '@radix-ui/react-*',  // if applicable
  props: {
    propName: { type: 'string', description: 'What it does', required: true },
    // ... all public props
  },
  subComponents: ['SubComponent1'],  // if applicable
  example: `<YourComponent prop="value" />`,
}
```

**Why:** This is consumed by `api.json` (auto-generated from registry), MCP tools (`get_component`, `search_components`), and all AI assistants using the MCP server.

### 3.2 llms-full.txt (REQUIRED)

Location: `apps/web/public/llms-full.txt`

Add documentation entry in the correct category section:
```
### YourComponent
Import: `import { YourComponent } from '@thesage/ui'`
Description of what it does.
Props:
  - propName: type (default: value) — Description
  - propName2: type (required) — Description
Built on: @radix-ui/react-* (if applicable)
Dependency: package-name (if applicable)

Example:
\`\`\`tsx
<YourComponent prop="value">Content</YourComponent>
\`\`\`
```

Also update the **category count** in the section header (e.g., `## FORMS (19 components)` → `## FORMS (20 components)`).

### 3.3 Component Registry (counts)

Location: `packages/ui/src/component-registry.ts`

- Increment `totalCount`
- Increment the category's `count`
- Add component name to category's `examples` array

### 3.4 Component Count Surfaces (ALL must stay consistent)

When adding a component, these files ALL reference the total component count. Update every one:

| File | What to update |
|------|---------------|
| `apps/web/public/llms-full.txt` | Header line `# Components: N`, summary line `> N components`, category counts, bundle table |
| `apps/web/public/llms.txt` | Line 3: `> N accessible React components` |
| `apps/web/public/.well-known/ai-plugin.json` | `description_for_human` and `description_for_model` |
| `apps/web/public/.well-known/mcp-server.json` | `description` field |
| `apps/web/app/layout.tsx` | `PRODUCT_DESCRIPTION` constant |
| `apps/web/app/docs/layout.tsx` | `description`, `openGraph.description`, `other['sage:components']`, `collectionJsonLd.numberOfItems`, `collectionJsonLd.description` |
| `packages/ui/package.json` | `description` field |
| `packages/ui/src/component-registry.ts` | `totalCount` and category `count` |
| `packages/ui/.claude/CLAUDE.md` | Summary line and full API reference line |
| `packages/ui/README.md` | Description paragraph |
| `packages/mcp/src/registry.ts` | Comment at top of file |
| `README.md` (root) | Component count line, tree comment, summary |
| `templates/nextjs-app/app/page.tsx` | Card description |

> **Tip:** After updating, run `grep -r "\bOLD_COUNT\b" --include="*.{ts,tsx,json,txt,md}" apps/ packages/ templates/ README.md` to catch any missed references. Exclude `node_modules/`, `CHANGELOG.md`, and historical audit docs.

---

## Phase 4: Verification

### 4.1 Build Library
```bash
pnpm build --filter @thesage/ui
```

### 4.2 Build Application
```bash
pnpm build --filter web
```

Verify the build output includes your new component page in the `[section]/[item]` list.

### 4.3 Test Locally
```bash
pnpm dev --filter web
```
- Navigate to `/docs/[category]/your-component` — page renders
- Navigate to `/docs/components/your-component` — redirects to correct category URL
- Test Cmd+K search — component appears
- Verify sidebar navigation — component listed under correct category
- Check `/sitemap.xml` — your component URL is included
- Check `/docs/api.json` — component appears in JSON response

### 4.4 Count Consistency Check
```bash
# Search for the OLD count — should return 0 matches in served content
grep -rn "\bOLD_COUNT\b" apps/web/public/ apps/web/app/layout.tsx apps/web/app/docs/layout.tsx packages/ui/package.json packages/ui/.claude/CLAUDE.md packages/ui/README.md README.md
```

### 4.5 Update Changelog

Location: `CHANGELOG.md`

```markdown
## YYYY-MM-DDTHH:MM:SSZ

**Added [ComponentName] to [Category]**
- Description of what it does
- Key features or props
- Component count: N-1 → N
```

---

## Phase 5: Publish to npm

### 5.1 Version Bump

Location: `packages/ui/package.json`

- **Patch** (0.0.X): Bug fixes, documentation updates
- **Minor** (0.X.0): New components, new features (backwards compatible)
- **Major** (X.0.0): Breaking changes

New components are **minor** version bumps.

### 5.2 Rebuild and Publish
```bash
pnpm build --filter @thesage/ui
cd packages/ui && npm publish
```

### 5.3 Verify
```bash
npm view @thesage/ui
```

### 5.4 Git Commit and Push
```bash
git add . && git commit -m "feat([category]): add [ComponentName] component" && git push
```

---

## Quick Reference Checklist

Copy this checklist into your task tracking when adding a new component:

```
## New Component: [Name] → [Category]

### Phase 1: Library
- [ ] Create `packages/ui/src/components/[category]/[Name].tsx`
- [ ] Export from `packages/ui/src/components/[category]/index.ts`
- [ ] Export from `packages/ui/src/index.ts`
- [ ] Install dependencies (if needed)
- [ ] `pnpm build --filter @thesage/ui` — passes

### Phase 2: Docs Routing
- [ ] Add to `SECTION_ITEMS` in `apps/web/app/docs/route-config.ts`
- [ ] Add to `routeConfig` children in `apps/web/app/docs/route-config.ts`
- [ ] Add `ComponentConfig` to `apps/web/app/components/lib/component-registry.tsx`
- [ ] Add to `COMPONENT_CATEGORIES` in `apps/web/app/components/studio/ComponentsSection/index.tsx`
- [ ] Add to sidebar nav in `apps/web/app/lib/navigation-tree.tsx`
- [ ] Add to search index in `apps/web/app/lib/search-index.ts`

### Phase 3: AI & Metadata
- [ ] Add to MCP registry in `packages/mcp/src/registry.ts` (full props, example, keywords)
- [ ] Add to `apps/web/public/llms-full.txt` (import, props, example) + update category count
- [ ] Update component count in ALL 13 surfaces (see table in Phase 3.4)
- [ ] Update `packages/ui/src/component-registry.ts` (totalCount, category count, examples)

### Phase 4: Verify
- [ ] `pnpm build --filter @thesage/ui` — passes
- [ ] `pnpm build --filter web` — passes, new page in build output
- [ ] Component page loads at `/docs/[category]/[name]`
- [ ] `/docs/components/[name]` redirects correctly
- [ ] Cmd+K search finds component
- [ ] No stale count references (grep check)
- [ ] CHANGELOG.md updated

### Phase 5: Publish
- [ ] Version bump (minor for new component)
- [ ] `npm publish` from `packages/ui/`
- [ ] Git commit and push
```

---

## Why Every Surface Matters

The SB-1 through SB-6 audit (Feb 2026) revealed that missing or inconsistent data across surfaces directly impacts SDE's competitive score:

| Surface | What breaks if skipped |
|---------|----------------------|
| Route config (`SECTION_ITEMS`) | Component page 404s. Sitemap missing URL. Redirect handler can't find it. |
| llms-full.txt | AI assistants can't generate correct code for the component |
| MCP registry | `get_component` and `search_components` return nothing |
| Component count surfaces | Speedboat-style audits flag data inconsistencies, reducing credibility |
| Search index | Users can't find the component via Cmd+K |
| Sidebar navigation | Component not visible in docs navigation |

**The lesson:** SDE's value proposition is AI-native discoverability. Every component must be findable by humans (docs, search, navigation), by AI (llms-full.txt, MCP, api.json), and by crawlers (sitemap, metadata). If any surface is missed, the component effectively doesn't exist for that audience.

---

## Troubleshooting

**"Cannot find module @thesage/ui"**
→ Run: `pnpm build --filter @thesage/ui`

**Component page 404s**
→ Check `SECTION_ITEMS` in `route-config.ts` — is the slug listed under the correct category?
→ Check `routeConfig` — is there a `children` entry with the correct label?

**Component not in search**
→ Verify entry in `apps/web/app/lib/search-index.ts`
→ Ensure `path` uses `/docs/[category]/[slug]` format (NOT hash links)

**Component not in sitemap**
→ Sitemap is auto-generated from `SECTION_ITEMS`. If it's in route-config, it's in the sitemap. If not, add it to route-config.

**Component not in api.json**
→ Check `packages/mcp/src/registry.ts` — api.json is auto-generated from this registry.

**TypeScript errors in Studio**
→ Rebuild library: `pnpm build --filter @thesage/ui`

**npm publish fails**
→ Ensure logged in: `npm whoami`
→ Verify publish access to `@thesage` org
→ Check version is unique: `npm view @thesage/ui versions`

---

**Related Documentation:**
- [CLAUDE.md](../../.claude/CLAUDE.md) — Project context and conventions
- [AGENTS.md](../../AGENTS.md) — File organization rules and coding standards
- [DESIGN-PHILOSOPHY.md](../../DESIGN-PHILOSOPHY.md) — Principles for component design
- [plan-to-improve-sde-to-a-plus.md](../../docs/plan-to-improve-sde-to-a-plus.md) — SB audit findings and fixes
- Component Registry: `packages/ui/src/component-registry.ts`
- Route Config: `apps/web/app/docs/route-config.ts`
- MCP Registry: `packages/mcp/src/registry.ts`
