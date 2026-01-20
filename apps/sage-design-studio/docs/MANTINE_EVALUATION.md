# Mantine UI vs Sage Design System: Parity Evaluation & Roadmap

## Executive Summary

Mantine UI is a massive, batteries-included component library with over 120 components and 50+ hooks. Sage Design System (SDS), currently based on shadcn/ui principles, focuses on code ownership, modularity, and high-end aesthetics.

To achieve parity with Mantine effectively, SDS should **not** copy Mantine blindly but rather adopt its **comprehensive utility** while maintaining SDS's **architectural superiority** (headless primitives + Tailwind).

**Key Strategic Findings:**
1.  **Hooks Gap**: SDS completely lacks a standard utility hook library (`@mantine/hooks` is a major competitive advantage).
2.  **Data Viz Gap**: Mantine has a dedicated Charts package. SDS currently has none (but can adopt shadcn charts).
3.  **Complex Inputs**: Mantine excels at complex inputs (ColorPicker, NumberInput, Dropzone) which SDS lacks.
4.  **Form Strategy**: Mantine has its own form library. SDS uses `react-hook-form`. **Recommendation:** Stick with `react-hook-form` (industry standard) but improve the `Form` wrapper.

---

## 1. Feature & Component Comparison

### 📦 Core Architecture

| Feature | Mantine UI | Sage Design System (SDS) | Parity Strategy |
| :--- | :--- | :--- | :--- |
| **Styling** | CSS Modules / css-in-js (PostCSS) | Tailwind CSS + Class Variance Authority | ✅ **SDS is Superior** (Modern Standard) |
| **Theming** | Strict Schema (JSON based) | CSS Variables + Tailwind Config | ✅ **SDS is Superior** (More Flexible) |
| **Philosophy** | Library (npm install) | Copy & Paste (Code Ownership) | ✅ **SDS is Superior** (Solopreneur/AI Friendly) |
| **Icons** | 3rd party (Tabler usually) | Lucide React | 🤝 Parity |

### 🛠 Utilities & Logic

| Category | Mantine UI | SDS Current | Recommendation |
| :--- | :--- | :--- | :--- |
| **Hooks** | **70+ Hooks** (`@mantine/hooks`)<br>*(useHover, useMove, useOs, etc.)* | **3 Hooks**<br>*(useTheme, useMotion, useForm)* | 🚨 **CRITICAL GAP**<br>Build `@sds/hooks` |
| **Forms** | `@mantine/form`<br>*(Custom state management)* | `react-hook-form` + `zod` | ⛔ **Do Not Copy**<br>Stick to RHF standard |
| **Dates** | `@mantine/dates`<br>*(Custom implementation)* | `date-fns` + `react-day-picker` | 🤝 Parity Achieved (via Layout/Calendar) |
| **Notifications** | `@mantine/notifications` | `sonner` | ✅ **SDS is Superior** (Sonner is better) |

### 🧩 Component Comparison

#### Layout & Navigation
| Component | Mantine | SDS | Gap / Action |
| :--- | :--- | :--- | :--- |
| AppShell | ✅ | ❌ | **Build `AppShell`** (Holy grail layout) |
| Stepper | ✅ | ❌ | **Build `Stepper`** |
| Timeline | ✅ | ❌ | **Build `Timeline`** |
| VirtualList | ❌ | ❌ | Low Priority |
| Container | ✅ | ✅ | Parity |
| Grid / Group | ✅ | ✅ (Stack/Grid) | Parity |

#### Inputs & Forms
| Component | Mantine | SDS | Gap / Action |
| :--- | :--- | :--- | :--- |
| ColorPicker | ✅ | ❌ | **Build `ColorPicker`** |
| FileInput / Dropzone | ✅ | ❌ | **Build `Dropzone`** |
| Rating | ✅ | ❌ | **Build `Rating`** |
| PinInput | ✅ | ✅ (InputOTP) | Parity |
| NumberInput | ✅ | ❌ (Basic Input only) | **Build `NumberInput`** (Steppers, formatting) |
| MultiSelect | ✅ | ❌ (Combobox mostly) | Expand `Combobox` (Tag support) |
| Rich Text | ✅ (TipTap) | ❌ | **Build `Editor`** (TipTap wrapper) |

#### Feedback & Overlays
| Component | Mantine | SDS | Gap / Action |
| :--- | :--- | :--- | :--- |
| Loader | ✅ | ✅ (Progress/Skeleton) | Add generic `Spinner` |
| Spotlight | ✅ (Cmd+K) | ✅ (Command) | Parity |
| Modal Manager | ✅ | ❌ (Declarative only) | Consider Imperative Modal Hook |

#### Data Display & Charts
| Component | Mantine | SDS | Gap / Action |
| :--- | :--- | :--- | :--- |
| Area/Bar/Line Chart | ✅ | ❌ | 🚨 **High Priority Gap**<br>Integrate `recharts` |
| Image | ✅ | ✅ (Next/Image) | Parity |
| Kbd (Keyboard) | ✅ | ✅ (in Command) | Extract `Kbd` primitive |
| Indicator | ✅ | ❌ | **Build `Indicator`** (Notification dot) |

---

## 2. The "Mantine Parity" Playbook

To achieve feature parity with Mantine, SDS needs to move beyond "basic UI" and into "application ecosystem" territory.

### Phase 1: The "Utility Belt" (@sds/hooks)
**Goal:** Match `@mantine/hooks` utility for utility.
This is low-effor/high-impact. We can port popular open-source hooks or write our own implementation of the top 20 most used hooks.

**Must-Have Hooks:**
- `use-click-outside` (Already internal, export it)
- `use-clipboard`
- `use-viewport-size`
- `use-window-scroll`
- `use-media-query`
- `use-local-storage`
- `use-hover`
- `use-idle`

### Phase 2: Data Visualization (Charts)
**Goal:** Match `@mantine/charts`.
Do **not** write from scratch. Adopt `recharts` and wrap them in SDS design tokens/Tailwind classes (similar to shadcn/charts).

**New Category:** `components/charts/`
- `AreaChart`
- `BarChart`
- `LineChart`
- `PieChart`
- `RadarChart`

### Phase 3: Complex Inputs
**Goal:** Fill the gaps in form data collection.

1.  **ColorPicker**: Essential for creative apps (like the Customizer itself).
2.  **NumberInput**: A robust numerical input with increment/decrement steppers and clamp logic.
3.  **Dropzone**: A wrapper around `react-dropzone` with SDS styling.
4.  **RichTextEditor**: A styled wrapper around `TipTap`.

### Phase 4: Time & Progress
**Goal:** Better visualization of process.

1.  **Timeline**: Vertical list of events with connecting lines.
2.  **Stepper**: Progress through multiple form steps.

### Phase 5: App Shell & Layout
**Goal:** One-drop layouts.

1.  **AppShell**: A component that accepts `header`, `navbar`, `aside`, `footer` and handles the responsive grid logic automatically.

---

## 3. Comparison Summary Table

| Metric | Mantine UI | Sage Design System | Project Delta |
| :--- | :--- | :--- | :--- |
| **Component Count** | ~120 | ~50 | **-70** |
| **Hook Count** | ~50 | 3 | **-47** |
| **Bundle Size** | Heavy (Tree-shakeable) | 0kb (Copy Code) | **SDS Wins** |
| **Dependencies** | High (@mantine/core, etc) | Low (Radix + Tailwind) | **SDS Wins** |
| **Customizability** | Styles API (Complex) | Tailwind (Standard) | **SDS Wins** |

## 4. Recommended Next Steps (Immediate)

1.  **Create `@sds/hooks`**: Initialize this new sub-path and add 5 core hooks.
2.  **Add `Chart` Primitives**: Import `recharts` and create the base Chart configuration.
3.  **Build `NumberInput`**: This is the most requested "missing" input from standard HTML.
