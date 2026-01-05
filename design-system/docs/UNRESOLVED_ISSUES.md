# Unresolved Issues - Sage Design System

**Last Updated:** January 5, 2026
**Status:** Critical bugs preventing production-quality implementation
**Priority:** Immediate attention required

This document provides comprehensive context for resolving outstanding issues in the Sage Design System. It includes root cause analysis, attempted solutions, and diagnostic information to enable any LLM or developer to quickly understand and fix the problems.

---

## Executive Summary

The Sage Design System has three critical issues preventing it from meeting production quality standards:

1. **Mobile Rendering Disaster** - Complete layout failure on mobile devices
2. **SecondaryNav Broken in Live Preview** - Template preview shows broken navigation
3. **Component-Based Architecture Not Meeting Spec** - Design system requires manual token application in many cases

---

## Issue #1: Mobile Rendering Disaster

### Symptoms

- Mobile layout completely broken with overlapping elements
- Content rendering on top of itself
- Non-responsive behavior on mobile devices
- Dark/light mode toggle showing both modes simultaneously on mobile

### Affected Pages

- **Primary**: https://www.shalomormsby.com/cosmograph
- **Secondary**: Likely all pages using PageTemplate

### Root Cause Analysis

#### Hypothesis 1: Container Nesting Conflicts
**What was tried:**
- Fixed double container nesting in PageTemplate (removed duplicate Container wrapper)
- Moved content container management to PageLayout
- **Files modified:**
  - [PageLayout.tsx:171-173](design-system/organisms/PageLayout/PageLayout.tsx#L171-L173)
  - [PageTemplate.tsx:150](design-system/templates/PageTemplate/PageTemplate.tsx#L150)

**Status:** Build succeeds but mobile issues persist

**Evidence:**
```tsx
// PageLayout.tsx - Now properly manages content container
<main className={`flex-1 ${className}`}>
  <div className={`${contentMaxWidth} mx-auto px-4 sm:px-6 lg:px-8 py-12`}>
    {children}
  </div>
</main>

// PageTemplate.tsx - Removed duplicate Container
// BEFORE (WRONG):
<Container variant={variant} className="py-12">
  {children}
</Container>

// AFTER (CORRECT):
{children}
```

#### Hypothesis 2: Responsive Breakpoint Issues
**Problem:** Tailwind responsive classes may not be working correctly on actual mobile devices vs browser dev tools

**Evidence needed:**
- Test on actual mobile device (not just browser responsive mode)
- Check if responsive classes in PageLayout are rendering correctly
- Verify mobile menu in Header component works

**Files to investigate:**
- [PageLayout.tsx](design-system/organisms/PageLayout/PageLayout.tsx) - Responsive spacing classes
- [Header.tsx](design-system/organisms/Header/Header.tsx) - Mobile menu implementation
- [SecondaryNav.tsx](design-system/organisms/SecondaryNav/SecondaryNav.tsx) - Mobile scroll behavior

#### Hypothesis 3: Z-Index Stacking Conflicts
**Problem:** Multiple sticky elements may be stacking incorrectly on mobile

**Current z-index stack:**
- Header: `z-50`
- Breadcrumbs (if sticky): `z-45`
- SecondaryNav: `z-40`
- TertiaryNav: `z-30`

**Possible issue:** Mobile may require different z-index or positioning logic

#### Hypothesis 4: Theme Toggle Malfunction
**Problem:** Dark/light mode showing simultaneously suggests state management issue

**Files to investigate:**
- [ThemeProvider.tsx](design-system/providers/ThemeProvider.tsx)
- [CustomizerPanel.tsx](design-system/features/customizer/CustomizerPanel.tsx)
- Check if CSS variables are being applied correctly on mobile
- Verify theme store persistence on mobile browsers

### Missing Components That Might Help

1. **Responsive utilities** - Helper hooks/components for mobile detection
2. **Mobile-specific layout variants** - Alternative layouts for mobile vs desktop
3. **Debug mode** - Visual debugging tool to show z-index, spacing, breakpoints

### Next Steps for Resolution

1. **Deploy** latest changes (container nesting fix) to see if any mobile issues improve
2. **Test** on actual mobile device with browser dev tools open to see console errors
3. **Add debug logging** to theme switcher to track state changes on mobile
4. **Simplify** PageLayout temporarily - remove all optional elements to isolate issue
5. **Test** each sticky element individually to find which causes overlap

---

## Issue #2: SecondaryNav Broken in Live Preview

### Symptoms

- SecondaryNav doesn't render correctly in PageTemplate Live Preview
- Preview is at https://studio.shalomormsby.com/#templates/page-template
- Sticky behavior may not work within scaled preview container

### Root Cause Analysis

#### The Preview Implementation
**Location:** [TemplatesSection.tsx:214-330](apps/sage-design-studio/app/components/studio/TemplatesSection.tsx#L214-L330)

**Current approach:**
```tsx
<Card className="p-0 overflow-hidden border-2 border-[var(--color-border)]">
  <div className="h-[600px] overflow-auto bg-[var(--color-background)]">
    <div style={{ transform: 'scale(0.75)', transformOrigin: 'top left', width: '133.33%', height: '133.33%' }}>
      <PageTemplate
        header={{...}}
        secondaryNav={{
          items: [...],
          activeId: activeSection,
          onItemChange: setActiveSection,
        }}
        {...}
      >
        {/* content */}
      </PageTemplate>
    </div>
  </div>
</Card>
```

#### Identified Problems

**Problem 1: CSS Transform Breaks Sticky Positioning**
- The `transform: scale(0.75)` on line 216 creates a new stacking context
- Sticky positioning (`position: sticky`) **does not work** inside transformed containers
- This is a CSS specification limitation, not a bug

**Problem 2: Fixed Height Container**
- The `h-[600px]` height on line 215 creates artificial viewport
- Sticky elements stick to this container, not the actual viewport
- May appear broken because sticky behavior is confined

**Problem 3: Nested Overflow**
- `overflow-auto` on line 215 creates scrollable container
- Sticky elements within may not behave as expected

#### Why Secondary Nav Appears Broken

The SecondaryNav component is correctly implemented ([SecondaryNav.tsx:69-110](design-system/organisms/SecondaryNav/SecondaryNav.tsx#L69-L110)):

```tsx
export const SecondaryNav = React.forwardRef<HTMLElement, SecondaryNavProps>(
    ({ items, activeId, onItemChange, maxWidth = 'max-w-7xl', className = '' }, ref) => {
        return (
            <nav
                ref={ref}
                className={`
                    sticky top-16 lg:top-20 z-40
                    bg-[var(--color-surface)]/80 backdrop-blur-xl
                    border-b border-[var(--color-border)]
                    ${className}
                `}
                aria-label="Secondary navigation"
            >
                {/* ... */}
            </nav>
        );
    }
);
```

The component itself is fine. **The preview container breaks sticky positioning.**

### Solutions to Try

#### Option A: Remove Transform, Use Iframe
```tsx
<iframe
  srcDoc={`
    <!DOCTYPE html>
    <html>
      <body>
        <PageTemplate {...props} />
      </body>
    </html>
  `}
  style={{ width: '100%', height: '600px', border: 'none' }}
/>
```

**Pros:** Real viewport, sticky works correctly
**Cons:** More complex, needs full HTML document with styles

#### Option B: Document the Limitation
Add notice to preview:
```tsx
<p className="text-yellow-600 mb-2">
  ⚠️ Note: Sticky navigation behavior is limited in this scaled preview.
  For full sticky functionality, view the component in a real page context.
</p>
```

**Pros:** Honest, simple
**Cons:** Doesn't fix the problem

#### Option C: Screenshot/Video Instead
Replace live preview with high-quality recording showing sticky behavior

**Pros:** Shows correct behavior
**Cons:** Not interactive

#### Recommended: Combination of B + Video
1. Keep the scaled preview for basic structure visualization
2. Add disclaimer about sticky behavior
3. Include short video/GIF showing actual sticky behavior
4. Link to live example page

### Missing Components

1. **PreviewFrame component** - Abstraction for component previews that handles these edge cases
2. **StickyDebugger** - Visual indicator showing when/where sticky positioning activates

---

## Issue #3: Component-Based Architecture Not Meeting Spec

### Symptoms

- Components still require manual token application in many cases
- Navigation components using `text-[var(--color-...)]` instead of design system components
- Inconsistent use of design system primitives across the codebase

### Root Cause: Missing Atomic Components

The design system provides organisms (Header, Footer, SecondaryNav) but lacks the atomic building blocks they should compose from.

#### What's Missing

**1. Heading Component** ✅ CREATED BUT NOT WIDELY ADOPTED
- **Status:** Exists at [Heading.tsx](design-system/atoms/Typography/Heading.tsx)
- **Problem:** Not used in NavigationFallback or other app components
- **Example of manual application:**
  ```tsx
  // NavigationFallback.tsx:184
  <h3 className="text-lg font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors mb-1">
    {node.title}
  </h3>
  ```

**2. Text Component** ✅ CREATED BUT NOT WIDELY ADOPTED
- **Status:** Exists at [Text.tsx](design-system/atoms/Typography/Text.tsx)
- **Problem:** Manual text styling still common
- **Example:** NavigationFallback uses manual CSS variables for text colors

**3. Input Components** ❌ MISSING OR NOT EXPORTED
- **Problem:** NavigationFallback line 141 uses manual input styling
  ```tsx
  <input
    type="search"
    id="search"
    placeholder="Search by title, theme, or keyword..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] focus:border-transparent"
  />
  ```
- **Should be:** `<SearchInput />`  or `<TextInput type="search" />`

**4. Button Components for Filters** ❌ MISSING VARIANT
- **Problem:** NavigationFallback lines 134-156 use manual button styling
  ```tsx
  <button
    onClick={() => setActiveCluster('all')}
    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
      activeCluster === 'all'
        ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)]'
        : 'bg-[var(--color-surface)] text-[var(--color-text-primary)] hover:bg-[var(--color-hover)]'
    }`}
  >
    All
  </button>
  ```
- **Should be:** `<Button variant="filter" active={activeCluster === 'all'}>All</Button>`
- **Missing:** `filter` variant or `Chip` component for this pattern

**5. NavLink Component** ❌ MISSING
- **Problem:** Header and SecondaryNav manually style links
- **Should have:** Atomic `<NavLink>` component that handles active state, styling

### The Spec: True Component-First Architecture

**Current Reality:**
```tsx
// Apps still doing this:
<span className="text-[var(--color-text-primary)]">Text</span>
<button className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)]">Click</button>
<input className="border-[var(--color-border)] bg-[var(--color-background)]..." />
```

**Target State:**
```tsx
// Apps should do this:
<Text>Text</Text>
<Button>Click</Button>
<SearchInput placeholder="Search..." />
```

### Required Component Additions

1. **SearchInput atom**
   - Encapsulates search icon, clear button, proper styling
   - Used by NavigationFallback and anywhere search is needed

2. **FilterButton / Chip atom**
   - Encapsulates pill-shaped toggle button pattern
   - Used for category filters, tags

3. **NavLink atom**
   - Encapsulates navigation link styling with active states
   - Used internally by Header, SecondaryNav, TertiaryNav

4. **SectionHeading molecule**
   - Combines icon + heading + description pattern
   - Reduces boilerplate in list/grid layouts

### Migration Checklist

For NavigationFallback specifically ([NavigationFallback.tsx](apps/portfolio/components/cosmograph/NavigationFallback.tsx)):

- [ ] Replace manual heading styles (line 125, 167, 188) with `<Heading>` component
- [ ] Replace manual text styles (line 116, 128, 170, etc.) with `<Text>` component
- [ ] Replace search input (line 135-141) with `<SearchInput>` component (needs creation)
- [ ] Replace filter buttons (line 134-156) with `<FilterButton>` or `<Chip>` component (needs creation)
- [ ] Remove all `className="text-[var(--color-...)]"` instances

---

## Diagnostic Information

### Environment
- **Node Version:** Check with `node --version`
- **Package Manager:** pnpm
- **Build Tool:** Next.js 16.1.0 (Turbopack)
- **Monorepo:** Turbo

### Recent Changes

**Commit cce2f56:** "Fix alignment issues and build errors in design system"
- Fixed Tailwind CSS parsing error from doc comments
- Added content container to PageLayout
- Removed duplicate Container wrapper from PageTemplate
- Excluded design-system/docs from Tailwind scanning

**Files Modified:**
1. [tailwind.config.ts](apps/portfolio/tailwind.config.ts) - Excluded docs from Tailwind
2. [Text.tsx](design-system/atoms/Typography/Text.tsx) - Fixed problematic comment
3. [PageLayout.tsx](design-system/organisms/PageLayout/PageLayout.tsx) - Added content wrapper
4. [PageTemplate.tsx](design-system/templates/PageTemplate/PageTemplate.tsx) - Removed duplicate Container

### Build Status

**Last Successful Build:**
- Design system: ✅ Builds successfully
- Portfolio app: ✅ Builds successfully
- Deployed: ✅ Changes pushed to remote

**Known Build Issues:**
- None currently

### Testing Checklist

To verify fixes:

**Mobile Testing:**
- [ ] Test https://www.shalomormsby.com/cosmograph on actual iPhone/Android
- [ ] Check responsive breakpoints in Chrome DevTools mobile view
- [ ] Toggle dark/light mode on mobile - verify only one theme shows
- [ ] Check z-index stacking (header, breadcrumbs, secondaryNav)
- [ ] Verify touch scrolling works correctly

**Desktop Testing:**
- [ ] Verify header, title, breadcrumbs, content align (left margins match)
- [ ] Check sticky header behavior on scroll
- [ ] Check SecondaryNav sticky behavior (if present)
- [ ] Test theme switching (Studio, Sage, Volt)

**Preview Testing:**
- [ ] Visit https://studio.shalomormsby.com/#templates/page-template
- [ ] Check if SecondaryNav is visible in preview
- [ ] Test if sticky behavior shows (even if limited)
- [ ] Verify all props are correctly passed

---

## Context for LLMs

### What This System Is

The Sage Design System is a **component-first, token-based design system** for building consistent, accessible UI across the ecosystem. It's built on:

1. **Design Tokens** - Single source of truth for colors, spacing, typography
2. **Atomic Components** - Atoms → Molecules → Organisms → Templates
3. **Theme System** - Studio, Sage, Volt themes with light/dark modes
4. **Swiss Grid Principles** - 8px base unit, structured spacing, minimal aesthetic

### Key Architectural Principles

**❌ Wrong Approach:**
```tsx
<span className="text-[var(--color-text-primary)] font-bold">Logo</span>
```

**✅ Right Approach:**
```tsx
import { Brand } from '@ecosystem/design-system';
<Brand>Logo</Brand>
```

**Why:** Tokens should be encapsulated in components, not manually applied.

### File Structure

```
design-system/
├── atoms/              # Primitives (Button, Brand, Heading, Text)
├── molecules/          # Simple compositions (Breadcrumbs, FormField)
├── organisms/          # Complex compositions (Header, Footer, SecondaryNav)
├── templates/          # Page layouts (PageTemplate)
├── tokens/             # Design token definitions
├── providers/          # ThemeProvider
└── docs/               # Documentation (including this file)

apps/
├── portfolio/          # Main site, hosts /cosmograph
└── sage-design-studio/ # Design system docs at /studio
```

### How to Test Changes

```bash
# Rebuild design system
cd design-system && npm run build

# Rebuild portfolio app (depends on design system)
cd ../apps/portfolio && npm run build

# Or rebuild everything
cd /Users/shalomormsby/Developer/work/ecosystem && npm run build
```

---

## Priority Ranking

1. **🔴 CRITICAL:** Mobile rendering disaster - blocks production use
2. **🟡 HIGH:** Component-first architecture gaps - technical debt, user experience impact
3. **🟢 MEDIUM:** SecondaryNav preview - documentation quality issue, doesn't block usage

---

## Success Criteria

### Mobile Issues Resolved When:
- [ ] Page renders correctly on mobile devices (no overlapping)
- [ ] Dark/light mode toggle shows only one theme at a time
- [ ] All content is readable and accessible
- [ ] Touch interactions work (scrolling, tapping)
- [ ] Responsive breakpoints trigger correctly

### SecondaryNav Preview Fixed When:
- [ ] Sticky behavior is either demonstrated correctly OR clearly documented as limited
- [ ] Preview doesn't mislead users about component capabilities
- [ ] Alternative demonstration (video, link to live example) is provided

### Component Architecture Meets Spec When:
- [ ] Zero instances of `text-[var(--color-...)]` in app code
- [ ] All interactive elements use design system components
- [ ] New components can be built by composing existing atoms/molecules
- [ ] Documentation clearly shows component-first approach

---

## Questions for Resolution

1. **Mobile rendering:** Is this a CSS transform issue? Z-index conflict? Theme state problem?
2. **SecondaryNav preview:** Should we fix the preview or document the limitation?
3. **Missing components:** Which atoms should be created first? SearchInput? FilterButton? NavLink?
4. **Migration strategy:** Should we fix apps/portfolio first, or create missing components first?

---

## Related Documentation

- [README.md](../README.md) - Design system overview and API
- [COMPONENT_WORKFLOW.md](COMPONENT_WORKFLOW.md) - How to create/modify components
- [ARCHITECTURE-GUIDE.md](ARCHITECTURE-GUIDE.md) - Where code belongs
- [COMPONENT_FIRST_ARCHITECTURE.md](COMPONENT_FIRST_ARCHITECTURE.md) - Philosophy and implementation

---

**This document should be updated as issues are resolved. When an issue is fixed, move it to a "Resolved Issues" section with the solution documented.**
