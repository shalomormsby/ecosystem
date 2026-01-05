# Sage Design System Guidelines

## Core Philosophy: Component-First Architecture

The Sage Design System is built on a fundamental principle: **Tokens are encapsulated in components, not manually applied.**

You should **never** need to write `text-[var(--color-text-primary)]` or manually apply design tokens. If you find yourself doing this, it means a component is missing from the design system.

---

## The Right Way: Use Components with Built-In Tokens

### ❌ Wrong: Manual Token Application

```tsx
// This is a symptom of missing components
<span className="font-bold text-[var(--color-text-primary)]">
  Brand Name
</span>

<a href="/" className="text-[var(--color-text-primary)] hover:opacity-80">
  Logo
</a>
```

### ✅ Right: Component-Based Token Encapsulation

```tsx
// Components automatically handle tokens and theming
import { Brand } from '@ecosystem/design-system';

<Brand href="/">Brand Name</Brand>
```

**Why this matters:**
- ✨ Dark mode works automatically
- ✨ Theme switching works automatically
- ✨ No room for error or inconsistency
- ✨ Less code to write
- ✨ Easier to maintain

---

## Root Cause Analysis: January 2026

After reviewing implementation inconsistencies, we identified the **real** root cause:

### The Fundamental Problem

**We were documenting token usage instead of creating token-encapsulating components.**

This forced developers to:
1. Remember which CSS variables to use
2. Manually apply them everywhere
3. Hope they got it right
4. Debug when dark mode broke

### The Solution

**Create components that encapsulate tokens automatically.**

Now developers:
1. Import the right component
2. Use it
3. It just works™

---

## Component Inventory: Token Encapsulation

### Atoms (Primitives with Built-In Tokens)

#### Brand Component
**Purpose:** Display brand names/logos with automatic theme support

```tsx
import { Brand } from '@ecosystem/design-system';

// Standalone
<Brand>Company Name</Brand>

// As a link
<Brand href="/">Company Name</Brand>

// With Next.js
<Brand>
  <NextLink href="/">Company Name</NextLink>
</Brand>

// Different sizes
<Brand size="sm">Small Brand</Brand>
<Brand size="lg">Large Brand</Brand>
```

**What it handles automatically:**
- ✅ `text-[var(--color-text-primary)]` - theme-aware text color
- ✅ Font weight and sizing
- ✅ Hover states for links
- ✅ Focus states
- ✅ Dark mode support

#### Link Component
**Purpose:** Navigational links with theme-aware styling

```tsx
import { Link } from '@ecosystem/design-system';

// Default variant (background highlight on hover)
<Link href="/about">About</Link>

// Inline variant (underlined)
<Link variant="inline" href="/contact">Contact</Link>
```

**What it handles automatically:**
- ✅ Theme-aware colors
- ✅ Hover effects
- ✅ Focus states
- ✅ Transition animations

#### Button Component
**Purpose:** Interactive buttons with consistent styling

```tsx
import { Button } from '@ecosystem/design-system';

<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="ghost">Subtle Action</Button>
```

**What it handles automatically:**
- ✅ All theme colors
- ✅ Hover and active states
- ✅ Loading states
- ✅ Disabled states
- ✅ Focus rings

### Molecules (Composed Patterns)

#### Breadcrumbs
**Purpose:** Navigation context with consistent styling

```tsx
import { Breadcrumbs } from '@ecosystem/design-system';

<Breadcrumbs
  variant="subtle"
  items={[
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Current Page' },
  ]}
/>
```

**What it handles automatically:**
- ✅ Theme-aware link colors
- ✅ Separator styling
- ✅ Current page styling
- ✅ Hover states

### Organisms (Complex Compositions)

#### Header
**Purpose:** Site navigation with coordinated components

```tsx
import { Header, Brand } from '@ecosystem/design-system';

<Header
  logo={<Brand href="/">Company</Brand>}
  navLinks={[
    { label: 'Products', href: '/products' },
    { label: 'About', href: '/about' },
  ]}
  actions={<Button>Sign In</Button>}
  sticky={true}
  maxWidth="max-w-7xl"
/>
```

**What it handles automatically:**
- ✅ Glass morphism effects
- ✅ Sticky positioning
- ✅ Mobile menu
- ✅ All theme colors
- ✅ Focus management

#### Footer
**Purpose:** Site footer with navigation and social links

```tsx
import { Footer, Brand } from '@ecosystem/design-system';

<Footer
  logo={<Brand>Company</Brand>}
  sections={[
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '/features' },
        { label: 'Pricing', href: '/pricing' },
      ],
    },
  ]}
  socialLinks={{
    github: 'https://github.com/...',
    linkedin: 'https://linkedin.com/...',
  }}
  copyright="© 2026 Company"
/>
```

**What it handles automatically:**
- ✅ Swiss Grid layout
- ✅ All theme colors
- ✅ Responsive columns
- ✅ Link hover states
- ✅ Icon rendering

### Templates (Complete Page Patterns)

#### PageTemplate
**Purpose:** Full page composition with coordinated layout

```tsx
import { PageTemplate, Brand, Footer } from '@ecosystem/design-system';

<PageTemplate
  header={{
    logo: <Brand href="/">Company</Brand>,
    navLinks: [...],
    sticky: true,
  }}
  title="Page Title"
  subtitle="Page description"
  breadcrumbs={[...]}
  variant="standard"  // or "wide" or "narrow"
  footer={
    <Footer
      logo={<Brand>Company</Brand>}
      sections={[...]}
    />
  }
>
  <YourContent />
</PageTemplate>
```

**What it handles automatically:**
- ✅ Coordinated max-widths across all sections
- ✅ Swiss Grid spacing
- ✅ Sticky header positioning
- ✅ All theme colors
- ✅ Responsive behavior

---

## Building Pages: The Component-First Way

### Step 1: Never Write CSS Variables

If you're writing `text-[var(--color-...)]`, **stop**. You're doing it wrong.

Ask yourself: "Which component should I be using?"

### Step 2: Use the Component Hierarchy

```
PageTemplate (provides structure)
  ├─ Header (uses Brand, Button)
  ├─ Breadcrumbs (self-contained)
  ├─ Content (your custom components)
  └─ Footer (uses Brand, Link)
```

### Step 3: Example - Complete Page

```tsx
import {
  PageTemplate,
  Brand,
  Footer,
  Button,
} from '@ecosystem/design-system';
import NextLink from 'next/link';

export default function MyPage() {
  return (
    <PageTemplate
      header={{
        logo: (
          <Brand>
            <NextLink href="/">Company</NextLink>
          </Brand>
        ),
        navLinks: [
          { label: 'Products', href: '/products' },
          { label: 'About', href: '/about' },
        ],
        actions: <Button variant="primary">Sign In</Button>,
        sticky: true,
      }}
      title="Welcome"
      subtitle="Build something amazing"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Welcome' },
      ]}
      variant="standard"
      footer={
        <Footer
          logo={<Brand>Company</Brand>}
          sections={[
            {
              title: 'Product',
              links: [
                { label: 'Features', href: '/features' },
              ],
            },
          ]}
          copyright="© 2026 Company"
        />
      }
    >
      {/* Your page content */}
      <div>Content here</div>
    </PageTemplate>
  );
}
```

**Notice:**
- 🎯 No manual CSS variables
- 🎯 No manual color classes
- 🎯 All components from the design system
- 🎯 Dark mode works automatically
- 🎯 Theme switching works automatically

---

## When to Create New Components

### Signs You Need a New Component

1. **You're repeating the same CSS variable pattern**
   ```tsx
   // If you're doing this multiple times:
   <span className="text-[var(--color-text-secondary)]">...</span>

   // Create a component:
   <SecondaryText>...</SecondaryText>
   ```

2. **You're manually styling common patterns**
   ```tsx
   // If you're repeatedly doing this:
   <div className="p-6 bg-[var(--color-surface)] border border-[var(--color-border)]">

   // Use or create a component:
   <Card>...</Card>
   ```

3. **Dark mode doesn't work automatically**
   - If you have to add conditional classes for themes
   - This means the styling should be in a component

### How to Create Token-Encapsulating Components

1. **Identify the pattern** - What are you styling repeatedly?
2. **Create the component** - Encapsulate the tokens
3. **Export it** - Add to atoms/molecules/organisms
4. **Document it** - Add usage examples
5. **Use it everywhere** - Replace manual styling

---

## Architecture Principles

### 1. Tokens → Components → Usage

```
Design Tokens (tokens/)
    ↓
Encapsulated in Components (atoms/, molecules/, organisms/)
    ↓
Composed into Templates (templates/)
    ↓
Used in Apps (apps/)
```

**Never skip the middle layer.** Tokens should always be accessed through components.

### 2. Swiss Grid Through Components

Components enforce Swiss Grid principles:
- `Brand` uses semantic sizing (sm, md, lg)
- `PageTemplate` enforces 8px-based spacing
- `Header` enforces sticky positioning
- `Footer` enforces grid layouts

You don't manage spacing manually - components do it.

### 3. Theme Support Through Components

Components handle theme switching:
- `Brand` automatically uses `--color-text-primary`
- `Button` automatically adapts colors per variant
- `Card` automatically uses surface colors

You don't write theme logic - components handle it.

---

## Common Mistakes (and How to Fix Them)

### ❌ Mistake 1: Manual Token Application

```tsx
// Wrong
<span className="text-[var(--color-text-primary)] font-bold">
  Logo
</span>
```

**Fix:**
```tsx
// Right
import { Brand } from '@ecosystem/design-system';
<Brand>Logo</Brand>
```

### ❌ Mistake 2: Mixing Design System and Custom Styles

```tsx
// Wrong - mixing design system with custom colors
<Button variant="primary" className="text-blue-500">
  Click Me
</Button>
```

**Fix:**
```tsx
// Right - use design system variants
<Button variant="primary">Click Me</Button>

// Or create a new variant if needed
<Button variant="accent">Click Me</Button>
```

### ❌ Mistake 3: Reinventing Components

```tsx
// Wrong - creating custom footer
<footer className="border-t py-8">
  <div className="flex justify-between">...</div>
</footer>
```

**Fix:**
```tsx
// Right - use Footer organism
import { Footer } from '@ecosystem/design-system';
<Footer sections={[...]} />
```

### ❌ Mistake 4: Not Using PageTemplate

```tsx
// Wrong - manually composing page structure
export default function Page() {
  return (
    <>
      <Header />
      <div className="pt-20">
        <h1>Title</h1>
        <main>Content</main>
      </div>
      <Footer />
    </>
  );
}
```

**Fix:**
```tsx
// Right - use PageTemplate for coordination
export default function Page() {
  return (
    <PageTemplate
      header={{...}}
      title="Title"
      footer={<Footer />}
    >
      <Content />
    </PageTemplate>
  );
}
```

---

## Quick Reference

### Starting a New Page? Use This Checklist:

- [ ] Import `PageTemplate`, `Brand`, `Footer`
- [ ] Use `Brand` component for logo (not manual styling)
- [ ] Pass complete `header` config to PageTemplate
- [ ] Include `title`, `subtitle`, `breadcrumbs`
- [ ] Choose appropriate `variant` (standard/wide/narrow)
- [ ] Add `Footer` with proper component usage
- [ ] **Never write CSS variable classes manually**
- [ ] Test in both light and dark mode

### Need to Style Something? Ask:

1. **Is there a component for this?** → Use it
2. **Is this a common pattern?** → Create a component
3. **Is this truly unique?** → Then (and only then) use custom styling

### When in Doubt:

**Look at existing pages.** If they use a component, you should too.

**Check the design system exports.** We probably have a component for your use case.

**Don't reinvent.** The design system exists to make building consistent UIs trivial.

---

## The Promise of Component-First Design

When you follow this approach:

### You Get Automatically:
- ✨ Dark mode support
- ✨ Theme switching
- ✨ Consistent spacing (Swiss Grid)
- ✨ Proper typography
- ✨ Accessible focus states
- ✨ Responsive behavior
- ✨ Hover and active states
- ✨ Loading states
- ✨ Error states

### You Never Write:
- ❌ `text-[var(--color-...)]`
- ❌ `bg-[var(--color-...)]`
- ❌ `border-[var(--color-...)]`
- ❌ Conditional theme classes
- ❌ Manual dark mode logic
- ❌ Custom spacing calculations
- ❌ Repetitive styling patterns

### You Simply:
- ✅ Import the component
- ✅ Pass props
- ✅ It works

---

## This Is What "Design System" Means

A design system isn't just a collection of tokens and documentation.

**It's a set of components that make the right thing the easy thing.**

When you have to manually apply tokens, the design system has failed.

When you just use components and everything works, the design system has succeeded.

The Sage Design System now succeeds. Use it.
