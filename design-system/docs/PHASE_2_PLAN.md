# Phase 2: Atomic Architecture Implementation

**Objective:** Transition from raw utility classes to a true "Lego block" architecture by creating missing atomic components and refactoring existing code.

## 1. Create Missing Atoms

### SearchInput
- **File:** `design-system/atoms/Input/SearchInput.tsx` (Create `Input` dir)
- **Props:** `placeholder`, `value`, `onChange`, `onClear`, `className`
- **Features:** 
  - Text input with search icon prefix
  - Optional "X" clear button
  - Focus rings matching design system (`ring-[var(--color-focus)]`)
  - Styled using token variables

### FilterButton (or Chip)
- **File:** `design-system/atoms/Button/FilterButton.tsx`
- **Props:** `active` (boolean), `children`, `onClick`, `count` (optional badge)
- **Features:**
  - Pill shape
  - "Active" state (solid primary color)
  - "Inactive" state (surface color, hover effect)
  - Smooth transitions

### NavLink
- **File:** `design-system/atoms/Navigation/NavLink.tsx`
- **Props:** `href`, `active`, `children`, `className`, `icon`?
- **Features:**
  - Standardized hover/active text colors
  - Optional active indicator (underline or background)
  - Semantic `<a>` or `Link` wrapper (needs to be framework agnostic or accept `as` prop)

## 2. Refactor Components

### NavigationFallback Refactor
- **Target:** `apps/portfolio/components/cosmograph/NavigationFallback.tsx`
- **Action:**
  - Replace `<input type="search" ...>` with `<SearchInput />`
  - Replace `<button ...>` filters with `<FilterButton />`
  - Replace `<h3>` and `<span>` with `<Heading>` and `<Text>`
- **Goal:** Zero `text-[#...]` or `bg-[var(--color...)]` classes in the file.

### Header/Nav Refactor
- **Target:** `design-system/organisms/Header/Header.tsx`, `SecondaryNav.tsx`
- **Action:** 
  - Replace manual link rendering with `<NavLink />`
  - Ensure consistent hover/active states across all navs.

## 3. Icon Modernization (Bonus)
- **Action:** Replace existing SVG icons with `lucide-react` counterparts in:
  - Header (menu, chevron)
  - Search inputs
  - Studio sidebar
  - Callouts

## Execution Order
1. Create `SearchInput`
2. Create `FilterButton`
3. Create `NavLink`
4. Refactor `NavigationFallback`
5. Refactor `Header`
