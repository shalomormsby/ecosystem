# @thesage/ui

## 1.1.1 - 2026-02-16

### Patch Changes

- 6b73813: Updated package descriptions and metadata to reflect the library now contains 99 components.

## 1.1.0 - 2026-02-16

### Minor Changes

- fa247e6: Phase 16 New Components & Major Refactor:
  - @thesage/ui: Added 7 new components: `StatCard`, `EmptyState`, `Timeline`, `Stepper`, `FileUpload`, `TreeView`, `NotificationCenter`.
  - @thesage/ui: Exported CVA variants for `card`, `sheet`, `label`, and `alert` to enable standalone usage.
  - @thesage/ui: Added `react-dropzone` dependency.
  - @thesage/mcp: Updated component registry to include all 96 components.

## 1.0.3 - 2026-02-16

### Patch Changes

- 13fdfec: @thesage/mcp: Props, subComponents, and example fields added to all 92 components in the registry.
  @thesage/ui: Added .claude/CLAUDE.md to published package files for AI tool discovery.
- 13fdfec: Update configuring and ensure CI/CD pipeline consistency.

## 1.0.2 - 2026-02-15

### Patch Changes

- 351cd8e: @thesage/mcp: Props, subComponents, and example fields added to all 92 components in the registry.
  @thesage/ui: Added .claude/CLAUDE.md to published package files for AI tool discovery.

## 1.0.1 - 2026-02-15

### Patch Changes

- 87975ab: @thesage/mcp: Props, subComponents, and example fields added to all 92 components in the registry.
  @thesage/ui: Added .claude/CLAUDE.md to published package files for AI tool discovery.

## 0.1.0 - 2026-02-06

### Minor Changes

- 39a3bcd: # Sage Design Engine v1.0.0-rc.1: Enterprise Readiness

  ## 🚀 React 19 Migration

  - **Unified Architecture:** All 11 packages and applications now run on React 19.2.1.
  - **Modern Patterns:** 146 instances of `forwardRef` migrated to React 19's `ref` as a prop.
  - **Dependencies:** All 26 Radix UI primitives updated to latest versions.

  ## ⚡️ Performance & Optimization

  - **WebGL Vendoring:** Replaced 80KB `ogl` dependency with a 1.1KB custom WebGL implementation (93% reduction).
  - **Subpath Exports:** Created granular entry points for `@thesage/ui/forms`, `/dates`, `/tables`, `/dnd`, and `/webgl`.
  - **Bundle Size:** Core bundle optimized to 146KB (brotli) with strict CI enforcement.

  ## 🛡️ Enterprise Grade

  - **Test Suite:** Added Vitest + Testing Library with 63 tests across critical components.
  - **Security:** 0 vulnerabilities in `@thesage/ui`.
  - **Accessibility:** Critical fixes applied to Breadcrumbs, Customizer, and Code blocks.

  ## 💅 Brand & Documentation

  - **Rebrand:** "Sage UI" is now **Sage Design Engine**.
  - **Theme:** Default theme renamed to **Terra**.
  - **Documentation:** Complete audit of `thesage.dev` with new CLI guides, troubleshooting, and integration docs.

### Patch Changes

- 90cfd09: Update branding references:
  - Rename "Sage" theme to "Terra" in component registry
  - Update MCP documentation to use "Sage Design Engine" product name

## 0.0.14 - 2026-01-31

### Patch Changes

- 9595ced: Fixing dark mode text color issue in nested components by ensuring `--color-text-primary` is explicitly defined in `globals.css`.

## 0.0.13 - 2026-01-30

### Patch Changes

- c41914a: Update branding references:
  - Rename "Sage" theme to "Terra" in component registry
  - Update MCP documentation to use "Sage Design Engine" product name

## 0.0.12 - 2026-01-28

### Patch Changes

- 90e78f4: docs: Enhanced README details and aesthetics.
- 90e78f4: fix: add primary variant alias to Button
  feat: export globals.css for easier theme setup
  docs: update README with correct installation and usage examples

## 0.0.11 - 2026-01-28

### Patch Changes

- 802b59e: docs: Added README.md to @thesage/ui for better npm presentation.

## 0.0.10 - 2026-01-28

### Patch Changes

- 76a383b: Syncing npm registry with latest changes from GitHub (auto-generated catch-up).
