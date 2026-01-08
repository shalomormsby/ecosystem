# SDS Master Plan: The Solopreneur Stack (Web First)

> [!IMPORTANT]
> **Vision:** A high-velocity stack enables the efficient building of premium, beautiful web applications.
> **Philosophy:** "Premium Efficiency." We prioritize shipping speed and visual excellence on the Web over theoretical cross-platform purity.

---

## 1. Architecture: The "Sage Stack" (Web Edition)

We have pivoted from a complex "Universal" (React Native Web) approach to a high-performance **Web-Native Stack**. This maximizes velocity, simplifies tooling, and allows us to use top-tier web libraries without compromise.

### The Stack
| Layer | Technology | Why? |
| :--- | :--- | :--- |
| **Logic** | **Radix UI** (Headless) | Accessible, unstyled primitives. The gold standard for modern web apps. |
| **Styling** | **Tailwind CSS** | Utility-first, co-located styles. Fast and maintainable. |
| **Animation** | **Framer Motion** | Cinematic, physics-based animations that are hard to replicate in RN. |
| **Framework** | **Next.js 15+** | The industry standard for React Web. Server Components, SEO, Image Opt. |
| **Monorepo** | **Turborepo** | Fast builds. Manages the workspace relationships. |

### Mobile Strategy (On Ice)
*   **Status:** Paused / Archived.
*   **Reasoning:** The complexity of integrating `nativewind` + `react-native-web` into a Next.js environment (Babel vs SWC conflicts) outweighed the value for a v1.
*   **Future Path:** We can create a separate `@sds/ui-native` package for mobile later, sharing only the **Tokens**.

---

## 2. Repo Structure

We maintain a clean Monorepo separation between Apps and Packages.

```
ecosystem/
├── apps/
|   ├── sage-design-studio/  # The Documentation & Dev Environment (Next.js)
|   └── mobile/              # (Archived) Expo App
├── packages/
│   ├── tokens/              # (@sds/tokens) The "Brain". Pure JSON/TS definitions.
│   ├── ui/                  # (@sds/ui) Web Components (Radix + HTML + Tailwind).
│   ├── config/              # Shared configurations (Tailwind, ESLint).
│   └── core/                # (@sds/core) Shared React Hooks/Logic (Platform Agnostic).
```

---

## 3. Strategic Guardrails

To ensure shipping velocity, we adhere to these rules:

1.  **Web Supremacy:** If a library (like Framer Motion) offers a superior experience on the web but doesn't exist on Native, we use it. We do not dumb down the web for mobile parity.
2.  **Zero Config Overhead:** Component libraries must be standard React/DOM. No Babel loaders or transpilation hacks should be required to use `@sds/ui` in a standard Next.js app.
3.  **Copy-Paste Friendly:** The architecture should support a "shadcn-like" workflow where components can be copied into other projects if package dependencies become too heavy.

---

## 4. Phased Implementation Plan

### Phase 1: The Clean Pivot (Completed)
**Goal:** Establish a working Web-Only component workflow.
- [x] Pause Mobile development.
- [x] Strip `react-native-web` dependencies from `@sds/ui`.
- [x] Implement `Button`, `Input`, `Label` using HTML/Radix/Tailwind.
- [x] Verify styling in `sage-design-studio` (Next.js).
- **Exit Criteria:** A fully styled Universal Test Page running on localhost. ✅

### Phase 2: Core Atoms (The "Hands")
**Strategy: "Package, Don't Rebuild"**
We are **migrating** your existing high-quality components from the Studio codebase into the `@sds/ui` library. We are not discarding previous work.
*   **Workflow:**
    1.  **Extract:** Take a component (e.g., "Glass Card") from `design-system/`.
    2.  **Refactor:** Remove app-specific dependencies. Use `@sds/tokens` variables.
    3.  **Export:** Make it available via `import { Card } from '@sds/ui'`.
    4.  **Replace:** Delete the local version in Studio and use the library import.

**Components to Port:**
- [ ] **Data Entry:** `Textarea`, `Checkbox`, `Switch`, `Select`.
- [ ] **Feedback:** `Badge`, `Skeleton`, `Toast`.
- [ ] **Layout:** `Card`, `Separator`, `ScrollArea`.

### Design Tokens Strategy
Your existing tokens (Colors, Typography) are already safely housed in `packages/tokens` and `design-system/providers/ThemeProvider.tsx`.
*   **Current State:** The `ThemeProvider` injects JS token values as CSS variables (`--color-primary`) at runtime.
*   **Integration:** `@sds/ui` components use Tailwind classes (`bg-primary`) which automatically map to these variables.
*   **Action Item:** Move `ThemeProvider` from `design-system` into a package (e.g., `@sds/core` or `@sds/ui`) so other apps can easily inherit the full theming engine.

**Exit Criteria for Phase 2:**
1.  The Studio renders a "Playground" showing all these atoms in various states.
2.  The `ThemeProvider` is package-ized and reusable.

### Phase 3: The "Premium" Feel (Motion & Overlay)
**Goal:** Introduce the elements that make an app feel "expensive."
- [ ] **Framer Motion Integration:** Define standard transitions in `@sds/tokens`.
- [ ] **Complex Interactivity:** `Dialog` (Modal), `Sheet` (Slide-over), `DropdownMenu`, `Tooltip`.
- [ ] **Micro-interactions:** Add layout animations to Lists and Cards.
- **Exit Criteria:** A "Motion" section in the Studio demonstrating physics-based interactions.

### Phase 4: Consumption Workflow
**Goal:** Use the system to build a real app.
- [ ] Create a new app (e.g., `apps/portfolio` or `apps/dashboard`).
- [ ] Install `@sds/ui` and `@sds/tokens`.
- [ ] Build a functioning page using *only* library components.
- **Exit Criteria:** A second app in the monorepo consuming the design system without config errors.

---

## 5. Troubleshooting & Context
*   **Tailwind Config:** Uses `path.join(__dirname, ...)` to reliably detect styles in `packages/ui`.
*   **Fonts:** Uses `next/font` (SWC) without conflict, as we removed the Babel-dependent NativeWind.
*   **Mobile Code:** Located in `apps/mobile/`. See `apps/mobile/README.md` for un-pausing instructions.
