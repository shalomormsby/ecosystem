# Sage Design Engine - Publishing Strategy

**Status**: Proposed
**Date**: 2026-01-28
**Author**: Antigravity

## 🛑 Problem Statement

There is a disconnect between the code pushed to GitHub (continuous) and the artifacts published to npm (stale, 2 days old). This "drift" causes:
1. **Developer Friction**: "It works on my machine" but not for consumers using the npm package.
2. **Broken Feedback Loops**: Consumers can't test fixes immediately.
3. **Manual Overhead**: Publishing is a scary, manual process that gets delayed.

## 🎯 Objective

**Operationalize the publication pipeline** to ensure:
- **Zero Friction**: Publishing happens automatically or with a single click.
- **Accuracy**: Automated changelogs and version bumps.
- **Safety**: Tests and builds must pass before publishing.
- **Sync**: GitHub main branch and npm registry stay in sync (or at worst, one "Release PR" away).

## 🛠 Recommended Technology Stack

Since this is a **TurboRepo** monorepo using **pnpm**, the industry-standard solution is **Changesets**.

| Tool | Purpose | Why? |
| :--- | :--- | :--- |
| **@changesets/cli** | Versioning & Changelogs | Designed for monorepos, handles inter-dependencies key to `@thesage` ecosystem. |
| **GitHub Actions** | CI/CD | Native integration, free for open source/public repos. |
| **Turbo** | Build Optimization | Ensures we only publish what successfully builds. |

## 🔄 The Workflow

1. **Development**:
   - You write code in a feature branch.
   - You run `npx changeset` to declare your intent (e.g., "patch bump for @thesage/ui: fixed hover state").
   - This creates a markdown file in `.changeset/`.

2. **Pull Request**:
   - The changeset file is committed with your code.
   - CI runs (Lint, Build, Test).

3. **Merge to Main**:
   - A GitHub Action automatically detects the new changeset.
   - It opens (or updates) a **"Version Packages" PR**.
   - This PR consumes the changesets, bumps versions in `package.json`, and updates `CHANGELOG.md` files.

4. **Release**:
   - You review the "Version Packages" PR.
   - You hit **Merge**.
   - GitHub Action detects the merge, builds the packages, and **publishes to npm**.
   - It also pushes git tags (e.g., `@thesage/ui@1.0.1`) back to the repo.

## 🚀 Implementation Plan

### Phase 1: Setup (Immediate)
1. Install Changesets: `pnpm add -D -w @changesets/cli`
2. Initialize: `npx changeset init`
3. Configure `config.json` (set access to public, ignore non-publishable packages).
4. Add Local Scripts:
   ```json
   "scripts": {
     "changeset": "changeset",
     "version-packages": "changeset version",
     "release": "turbo run build && changeset publish"
   }
   ```

### Phase 2: Automation (CI)
 Create `.github/workflows/release.yml` to handle the flow described above.

### Phase 3: Catch Up (Right Now)
Since the registry is 2 days behind:
1. We will install the tooling.
2. We will generate a "catch up" changeset summarizing recent changes.
3. We will run the publish command locally *once* to sync everything.

## ✅ Action Items

- [ ] Approve this strategy.
- [ ] Run Phase 1 (Install & Config).
- [ ] Run Phase 3 (Immediate Manual Sync).
- [ ] Implement Phase 2 (CI Automation) for future peace of mind.
