# SDS Master Plan: Cross-Platform Expansion

> [!IMPORTANT]
> **Vision:** A "Creative Solopreneur" stack enabling the efficient building of premium web and native apps.
> **Philosophy:** "Universal Brain, Specific Hands." We share tokens and logic 100%, but respect platform differences where quality dictates.

---

## 1. Architecture: The "Sage Stack"

We are shifting from a single package to a **Solito-powered Monorepo**. This structure optimizes for code sharing without sacrificing native performance.

### The Stack
| Layer | Technology | Why? |
| :--- | :--- | :--- |
| **Logic** | `rn-primitives` (Mobile) / Radix (Web) | Accessible, headless, "shadcn-style" copy-paste workflow. |
| **Styling** | **NativeWind v4** | Universal Tailwind tokens. Zero runtime overhead. |
| **Routing** | **Solito** + Expo Router | Logic-sharing for screens. Use Next.js for Web, Expo for iOS/Android. |
| **Monorepo** | **Turborepo** | Fast builds. Manages the workspace relationships. |

### Universal vs. Platform-Specific
To avoid the "Uncanny Valley" of cross-platform apps, we strictly define what is shared and what is not.

| Aspect | Universal? | Strategy |
| :--- | :--- | :--- |
| **Tokens** | ✅ **YES** | Single source of truth (Colors, Spacing, Typography). |
| **Business Logic** | ✅ **YES** | Hooks, Stores (Zustand), API Clients, Zod Schemas. |
| **Component Props** | ✅ **YES** | `<Button>` handles `onPress` and `onClick` identically via abstraction. |
| **Layout Primitives** | ⚠️ **MOSTLY** | Flexbox is universal. Platform-specific safe areas are handled by Solito. |
| **Navigation** | ❌ **NO** | Web uses URLs/History. Native uses Stacks/Modals. Solito bridges this, but the *feel* remains native. |
| **Gestures** | ❌ **NO** | Native relies on Swipes/Haptics. Web relies on Hover/Click. |

---

## 2. Repo Structure (Target State)

We will adopt a clear package naming convention (`@sds/*`) to prepare for the future.

```
ecosystem/
├── apps/
│   ├── web/                 # (Existing) Portfolio/Studio (Next.js)
│   └── mobile/              # (New) iOS/Android App (Expo)
├── packages/
│   ├── tokens/              # (@sds/tokens) The "Brain". JSON/TS definitions.
│   ├── ui/                  # (@sds/ui) Universal Components (Button, Card).
│   ├── core/                # (@sds/core) Logic, Hooks, Stores.
│   └── config/              # Shared configurations (Tailwind, ESLint).
```

### The Solito Distinction
*   **`@sds/ui`**: Contains *Components* (Atoms/Molecules).
*   **`packages/app` (Solito)**: Contains *Features* (Screens/Flows).
    *   *Usage Guideline:* Use Solito Shared Screens for simple flows (Marketing, Auth, Settings). Build platform-specific screens for complex, gesture-heavy interactions (Canvas editors, Hardware access).

---

## 3. Strategic Guardrails (What We Are NOT Doing)

To ensure shipping velocity, we explicitly de-scope the following:
*   **NO `Zag.js` (Yet):** We stick to `rn-primitives`/Radix. State machines are powerful but overkill for v1.
*   **NO "Write Once, Run Everywhere" Dogma:** If a screen feels janky on mobile, we fork it. We prefer duplication over mediocrity.
*   **NO Auto-generated Components (Yet):** We do not automate component creation until the patterns are proven manually in Phase 4.

---

## 4. Phased Implementation Plan

### Phase 1: The Foundation (Tokens)
**Goal:** Establish `@sds/tokens` as the single source of truth without breaking the current Studio.
- [x] Create `packages/tokens` and move generic token logic there.
- [x] Create `packages/config` with a shared Tailwind config.
- [x] Update `design-system` (Web) to import from `packages/tokens`.
- **Exit Criteria:** The existing Sage Design Studio builds successfully, but consumes tokens from the new package. ✅
- **Rollback Plan:** Revert `package.json` imports in `design-system` to local files if the build fails.

### Phase 2: The Universal Atom
**Goal:** Prove the "Universal Component" concept with ONE component.
- [x] Initialize `packages/ui` with `nativewind` and `rn-primitives`.
- [x] Implement `Button.tsx` in `@sds/ui` using the shared tokens.
- **Exit Criteria:** `@sds/ui/Button` renders correctly on a **Web** test page within the Studio. ✅

### Phase 3: The Mobile Entry
**Goal:** Boot up the iOS environment.
- [x] Initialize `apps/mobile` (Expo).
- [x] Configure to consume `@sds/ui` and `@sds/tokens`.
- **Exit Criteria:** `apps/mobile` runs in an iOS Simulator and displays the Universal Button. (Configured ✅ - Ready for local simulator launch)

### Phase 4: Workflow Validation (Solito)
**Goal:** Prove screen sharing across platforms.
- [ ] Create a `demo-screen` in `packages/app/features`.
- [ ] Mount it in both `apps/web` and `apps/mobile`.
- **Exit Criteria:** Editing text in `demo-screen` hot-reloads on **both** Web and Simulator simultaneously.

### Phase 5: The Tiered Migration
**Goal:** Systematically migrate components to `@sds/ui` based on value.
*   **Tier 1 (Core):** Button, Input, Card, Text, Box. (High Usage)
*   **Tier 2 (structure):** Container, Stack, Grid.
*   **Tier 3 (Niche):** Specific marketing components. (Migrate on demand).

**The MCP "Autopilot" Role (V1):**
*   During this phase, we introduce a simple MCP tool: `review_component_for_migration`.
*   *Input:* Path to legacy component.
*   *Output:* A draft Universal version using `rn-primitives` + a checklist of props to verify.
*   *Constraint:* The user MUST manually review and commit. No auto-commits.

---

## 5. Next Steps

1.  **Approval:** Confirm this plan aligns with your vision.
2.  **Execution:** Begin Phase 1 (Create `packages/tokens`).
