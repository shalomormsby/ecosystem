# CI/CD Pipeline

> Complete reference for the ecosystem's continuous integration and deployment pipeline.

Last updated: 2026-02-22

---

## Overview

This is a **consumer** repository — it does not publish packages to npm. The `@thesage/*` packages are published from the [sage-design-engine](https://github.com/shalomormsby/sage-design-engine) repository.

The ecosystem uses one GitHub Actions workflow:

- **CI (`ci.yml`)** — Validates every PR and push to `main` (build + lint)

---

## CI Workflow (`ci.yml`)

**Trigger:** Pull requests to `main` and pushes to `main`

**What it does:**
1. Installs dependencies (`pnpm install --frozen-lockfile`)
2. Builds all apps (`pnpm build` via Turborepo)
3. Lints all apps (`pnpm lint`)

**Required status check:** The `build` job must pass before merging to `main`.

**Concurrency:** Cancels in-progress runs when new commits are pushed to the same branch. This saves Actions minutes.

---

## Vercel Deployments

Vercel is connected directly to the GitHub repo and deploys independently of GitHub Actions.

| App | URL | Build command |
|-----|-----|---------------|
| Portfolio | shalomormsby.com | `pnpm turbo run build --filter=portfolio` |
| Creative Powerup | ecosystem-creative-powerup.vercel.app | Custom build script |

**Preview deployments:** Every PR gets preview URLs from Vercel automatically.

**Production deployments:** Triggered on every push to `main`.

---

## Updating Design System Packages

When a new version of `@thesage/ui` (or `@thesage/tokens`, `@thesage/mcp`) is published from sage-design-engine:

```bash
pnpm update @thesage/ui
pnpm build
```

Publishing is handled in the [sage-design-engine repo](https://github.com/shalomormsby/sage-design-engine) via Changesets + npm Trusted Publishing. See that repo's `docs/CICD-PIPELINE.md` for the full release workflow.

---

## Repository Settings

These settings must be enabled for the pipeline to work:

| Setting | Location | Required value |
|---------|----------|----------------|
| Allow squash merging | Settings > General > Pull Requests | Enabled |
| Required status check: `build` | Settings > Rules > main | Enabled |
| Require PRs before merging | Settings > Rules > main | Enabled |

---

## Troubleshooting

### Vercel doesn't deploy

Vercel deploys are independent of GitHub Actions. Check:
1. Vercel dashboard for build logs
2. That the Vercel GitHub integration is connected
3. That the production branch is set to `main`

### CI is slow

Turborepo caches builds. If cache misses are high:
```bash
# Clear all caches and rebuild
rm -rf .turbo apps/*/.next
pnpm build
```

### Build fails with stale design system

```bash
pnpm update @thesage/ui @thesage/tokens
pnpm build
```
