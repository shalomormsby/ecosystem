# SDE Optimization Plan for Speedboat App Building

> **Goal:** Make the Sage Design Engine precisely aligned with Speedboat's needs so Claude can efficiently build Speedboat sandbox apps using `@thesage/ui`.

**Created:** 2026-02-15
**Last Updated:** 2026-02-15
**Status:** Phase 8 Complete

---

## Context

An audit from Claude at Moloco identified deficiencies in the SDE's machine-readability. Several findings were based on incomplete information (MCP server exists, Combobox exists, npm is published), but the core insight is valid: **Claude can't efficiently consume SDE component APIs without reading source code every time**.

### What Already Exists (Strong Foundation)
- MCP server (`@thesage/mcp`) with 4 tools and 92 components — **but lacks prop signatures**
- Component registry with descriptions, keywords, use cases (`packages/mcp/src/registry.ts`)
- Full props definitions in Studio's component-registry (`apps/web/app/components/lib/component-registry.tsx`)
- JSON-LD metadata generator (`apps/web/app/lib/metadata-generator.ts`)
- Search index with 200+ entries (`apps/web/app/lib/search-index.ts`)

### What's Missing (The Gaps)
1. No `llms.txt` / `llms-full.txt` — LLMs can't fetch component reference
2. MCP server has no prop data — `get_component` returns descriptions but not props/variants/defaults
3. No `robots.txt` or `sitemap.xml` — invisible to crawlers
4. No starter template for new projects
5. No server-side API endpoint for component data
6. AGENTS.md lacks component quick-reference with props
7. Docs return 404 HTTP status (content is client-rendered only)

---

## Implementation Plan

### Phase 1: llms-full.txt — Complete Component Reference (P0, High Impact)

- [x] Create `apps/web/public/llms.txt` — concise summary with links
- [x] Create `apps/web/public/llms-full.txt` — comprehensive plain-text component reference containing:
  - Install instructions + provider hierarchy
  - Every component: name, category, import, props (type, default, description), variants, usage example
  - Design tokens summary
  - Common composition patterns

**Data sources:** `packages/mcp/src/registry.ts` + `apps/web/app/components/lib/component-registry.tsx`

---

### Phase 2: Enrich MCP Server with Props Data (P0, High Impact)

- [x] Add `props`, `subComponents`, `example` fields to `ComponentMetadata` interface in `packages/mcp/src/registry.ts`
- [x] Populate props data for ~25 high-frequency components (prop name, type, default, description)
- [x] Add `example` field with JSX code example for enriched components
- [x] Update `formatComponentDetails()` in `packages/mcp/src/index.ts` to render props table, sub-components, and examples
- [x] Version bump `packages/mcp/package.json` to 0.4.0
- [x] Build and verify MCP server (requires `pnpm build --filter @thesage/mcp`)
- [ ] Publish to npm (requires `npm publish` from packages/mcp/)

---

### Phase 3: robots.txt + sitemap.xml (P1, Low Effort)

- [x] Create `apps/web/public/robots.txt` — allow all crawlers, reference sitemap and llms.txt
- [x] Create `apps/web/public/sitemap.xml` — list all doc section URLs

---

### Phase 4: Fix HTTP Status for /docs (P1, Medium Effort)

- [x] Investigate why `/docs` returns 404 HTTP status
  - **Finding:** The `/docs` route has a valid `page.tsx` and should return 200. The Moloco audit's 404 claim was likely a WebFetch tool misinterpretation.
- [x] Add `apps/web/app/docs/layout.tsx` with proper metadata (title, description, OG tags, sage:llms-full meta)
- [ ] Verify with `curl -I https://thesage.dev/docs` after deployment

---

### Phase 5: General-Purpose Starter Template (P1, Medium Effort)

- [x] Create `templates/nextjs-app/` directory
- [x] `package.json` with correct dependencies (@thesage/ui, next, react, tailwindcss)
- [x] `layout.tsx` with correct provider hierarchy (ThemeProvider > TooltipProvider > Toaster)
- [x] `tailwind.config.ts` with SDE CSS variables
- [x] `globals.css` importing SDE styles
- [x] `postcss.config.js`
- [x] Example `page.tsx` using SDE components (Button, Card, Input, Badge, etc.)

---

### Phase 6: AGENTS.md Component Quick-Reference (P2, Medium Effort)

- [x] Add "Component Quick Reference" section to `AGENTS.md` with:
  - 30 high-frequency components with category, key props, import path
  - Provider hierarchy diagram
  - Common composition recipes (settings page, data table, form page, dashboard, confirmation flow)
- [x] Reference to llms-full.txt and MCP server for full details
- [x] Reference to starter template

---

## Verification Checklist

- [ ] `curl https://thesage.dev/llms.txt` returns valid content (requires deployment)
- [ ] `curl https://thesage.dev/llms-full.txt` returns complete component reference (requires deployment)
- [ ] `npx @thesage/mcp` → `get_component("Button")` includes props (requires build + publish)
- [ ] `curl https://thesage.dev/robots.txt` returns valid robots file (requires deployment)
- [ ] `curl -I https://thesage.dev/docs` returns HTTP 200 (requires deployment)
- [ ] Template project builds and runs successfully
- [ ] `pnpm build` passes for all packages

---

### Phase 7: Quick DX & Documentation Wins (Low Effort, High Impact)

- [x] **Ship `.claude/` in npm package:** Include AI context file in `node_modules/@thesage/ui` for auto-discovery by Claude and other AI tools
- [x] **Third-party pairing docs:** Document recommended libraries for gaps (e.g., Tiptap for rich text, react-dropzone for file upload)
- [x] **Bundle size documentation:** Document per-component bundle impact, verify tree-shaking

---

### Phase 8: MCP Props Completeness (Medium Effort, High Impact)

- [x] Add props data to the ~67 components not yet enriched in Phase 2
- [x] Rebuild MCP server with full props coverage (66KB → 94KB)
- [ ] Publish to npm (requires `npm publish` from packages/mcp/)

---

### Phase 9: Test Coverage Expansion (Medium Effort, High Impact)

- [ ] Expand unit test coverage — currently 63 tests across 10 files for 92 components; most components have zero tests
- [ ] Target: at minimum, render + basic interaction tests for every exported component

---

### Phase 10: Missing Components (High Effort, High Impact)

- [ ] Stepper/Wizard
- [ ] File Upload/Dropzone
- [ ] Data Grid (editable)
- [ ] Stat/Metric Card
- [ ] Empty State
- [ ] Timeline
- [ ] Tree View
- [ ] Command Palette (full)
- [ ] Notification Center
- [ ] Color Picker
- [ ] Rich Text Editor

---

### Phase 11: Advanced Testing Infrastructure (Medium Effort, Medium Impact)

- [ ] Visual regression tests — snapshot tests for theme switching
- [ ] E2E tests — end-to-end testing suite

---

### Phase 12: Storybook / Interactive Explorer (Medium Effort, Low Impact)

- [ ] Studio already serves this role for humans; evaluate adding Storybook as parallel tool for external contributors
