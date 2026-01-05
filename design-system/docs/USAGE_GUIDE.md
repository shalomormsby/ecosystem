# Sage Design System - Usage Guide

**The design system is built as a scalable component-based architecture that encapsulates design tokens and follows atomic design principles.** Components automatically handle theming, dark mode, responsive behavior, and accessibility—so you can focus on building features, not managing CSS variables.

---

## Core Philosophy: Component-First Architecture

The Sage Design System operates on one fundamental principle:

**Tokens are encapsulated in components, not manually applied.**

You should **never** write `text-[var(--color-text-primary)]` or manually apply design tokens. If you find yourself doing this, it means a component is missing from the design system.

### Why Component-First?

**❌ The Old Way (Manual Token Application):**
```tsx
<span className="font-bold text-[var(--color-text-primary)]">
  Brand Name
</span>

<a href="/" className="text-[var(--color-text-primary)] hover:opacity-80">
  Logo
</a>

<button className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)] px-4 py-2 rounded">
  Click Me
</button>
```

**Problems:**
- ❌ Dark mode breaks if you forget to update CSS variables
- ❌ Inconsistent styling across the app
- ❌ Every developer must remember the correct token names
- ❌ More code to write and maintain
- ❌ Easy to make mistakes

**✅ The Right Way (Component Encapsulation):**
```tsx
import { Brand, Link, Button } from '@ecosystem/design-system';

<Brand>Brand Name</Brand>

<Link href="/">Logo</Link>

<Button variant="primary">Click Me</Button>
```

**Benefits:**
- ✨ Dark mode works automatically
- ✨ Theme switching works automatically
- ✨ Consistent styling guaranteed
- ✨ Less code to write
- ✨ No room for error
- ✨ Easier to maintain

---

## Quick Start

### 1. Install

```bash
npm install @ecosystem/design-system
```

### 2. Wrap Your App with ThemeProvider

```tsx
import { ThemeProvider } from '@ecosystem/design-system';

function App() {
  return (
    <ThemeProvider defaultTheme="studio" defaultMode="light">
      <YourApp />
    </ThemeProvider>
  );
}
```

### 3. Import and Use Components

```tsx
import { Button, Card, Header, Footer } from '@ecosystem/design-system';

function MyPage() {
  return (
    <>
      <Header logo={<Brand>Company</Brand>} navLinks={[...]} />

      <main>
        <Card>
          <h2>Welcome</h2>
          <p>This is a card.</p>
          <Button variant="primary">Get Started</Button>
        </Card>
      </main>

      <Footer logo={<Brand>Company</Brand>} sections={[...]} />
    </>
  );
}
```

That's it. **No CSS variables. No manual theming. Just components.**

---

## Component Inventory

### Atoms (Primitives with Built-In Tokens)

#### Brand
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
<Brand size="sm">Small</Brand>
<Brand size="md">Medium</Brand>
<Brand size="lg">Large</Brand>
```

**What it handles automatically:**
- ✅ `text-[var(--color-text-primary)]` - theme-aware text color
- ✅ Font weight and sizing
- ✅ Hover states for links
- ✅ Focus states
- ✅ Dark mode support

#### Heading
**Purpose:** Semantic headings (h1-h6) with automatic token-based styling

```tsx
import { Heading } from '@ecosystem/design-system';

<Heading level={1}>Page Title</Heading>
<Heading level={2}>Section Title</Heading>
<Heading level={3}>Subsection Title</Heading>
```

**What it handles automatically:**
- ✅ Semantic HTML (`<h1>`, `<h2>`, etc.)
- ✅ Responsive font sizes
- ✅ Theme-aware colors
- ✅ Proper font weights
- ✅ Consistent hierarchy

#### Text
**Purpose:** Semantic text with variant system for automatic color management

```tsx
import { Text } from '@ecosystem/design-system';

// Primary content text
<Text>Main paragraph content</Text>

// Secondary supporting text
<Text variant="secondary">Helper text or description</Text>

// Muted text (least emphasis)
<Text variant="muted">Footnote or metadata</Text>

// Different sizes
<Text size="lg">Large text</Text>
<Text size="sm">Small text</Text>

// As different element
<Text as="span">Inline text</Text>
<Text as="label">Form label</Text>
```

**What it handles automatically:**
- ✅ `text-[var(--color-text-primary)]` / `secondary` / `muted`
- ✅ Font sizing
- ✅ Dark mode colors
- ✅ Semantic HTML elements

#### Container
**Purpose:** Centralize max-width management and coordinate with PageTemplate variants

```tsx
import { Container } from '@ecosystem/design-system';

// Standard width (1280px) - default
<Container>Content here</Container>

// Wide width (1440px)
<Container variant="wide">Dashboard content</Container>

// Narrow width (896px) - reading-focused
<Container variant="narrow">Article content</Container>

// Without padding
<Container padding={false}>Full-width content</Container>

// As different element
<Container as="section">Semantic section</Container>
```

**What it handles automatically:**
- ✅ Coordinated max-width with PageTemplate variant
- ✅ Responsive horizontal padding
- ✅ Centered alignment
- ✅ Semantic HTML elements

#### Button
**Purpose:** Interactive buttons with consistent styling

```tsx
import { Button } from '@ecosystem/design-system';

<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="ghost">Subtle Action</Button>

// With sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// Loading state
<Button loading>Processing...</Button>

// Disabled
<Button disabled>Disabled</Button>
```

**What it handles automatically:**
- ✅ All theme colors
- ✅ Hover and active states
- ✅ Loading states
- ✅ Disabled states
- ✅ Focus rings

#### Link
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

#### Card
**Purpose:** Content container with consistent styling

```tsx
import { Card } from '@ecosystem/design-system';

<Card>
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>

// With hover effect
<Card hoverEffect>Interactive card</Card>
```

**What it handles automatically:**
- ✅ Surface background color
- ✅ Border styling
- ✅ Padding
- ✅ Hover effects (optional)

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
    { label: 'Current Page' }, // No href = current page
  ]}
/>
```

**What it handles automatically:**
- ✅ Theme-aware link colors
- ✅ Separator styling
- ✅ Current page styling
- ✅ Hover states
- ✅ ARIA labels

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
- ✅ Z-index stacking (z-50)

#### SecondaryNav
**Purpose:** Section/tab navigation that sticks below the header

```tsx
import { SecondaryNav } from '@ecosystem/design-system';

const [activeSection, setActiveSection] = useState('overview');
const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'features', label: 'Features' },
  { id: 'docs', label: 'Documentation' },
];

<SecondaryNav
  items={sections}
  activeId={activeSection}
  onItemChange={setActiveSection}
  maxWidth="max-w-7xl"
/>
```

**What it handles automatically:**
- ✅ Sticky positioning below header (z-40)
- ✅ Active state styling
- ✅ Horizontal scroll on mobile
- ✅ Glass morphism
- ✅ Keyboard navigation

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

#### PageLayout
**Purpose:** Flexible layout organism for composing pages

```tsx
import { PageLayout, Header, Breadcrumbs, Footer } from '@ecosystem/design-system';

<PageLayout
  header={<Header logo={logo} navLinks={links} />}
  breadcrumbs={<Breadcrumbs items={breadcrumbItems} />}
  breadcrumbsPosition="below-title"  // or "top"
  title={<Heading level={1}>Page Title</Heading>}
  subtitle={<Text size="lg" variant="secondary">Subtitle</Text>}
  secondaryNav={<SecondaryNav items={sections} activeId={active} onItemChange={setActive} />}
  footer={<Footer {...footerProps} />}
  swissGridSpacing
  contentMaxWidth="max-w-7xl"
>
  <YourContent />
</PageLayout>
```

**What it handles automatically:**
- ✅ Coordinated max-widths across all sections
- ✅ Swiss Grid spacing
- ✅ Z-index stacking for sticky elements
- ✅ Responsive behavior
- ✅ Proper spacing calculations

### Templates (Complete Page Patterns)

#### PageTemplate
**Purpose:** Full page composition with coordinated layout

```tsx
import { PageTemplate, Brand, Footer } from '@ecosystem/design-system';

<PageTemplate
  header={{
    logo: <Brand href="/">Company</Brand>,
    navLinks: [...],
    actions: <Button>Sign In</Button>,
    sticky: true,
  }}
  title="Page Title"
  subtitle="Page description"
  breadcrumbs={[
    { label: 'Home', href: '/' },
    { label: 'Current Page' },
  ]}
  secondaryNav={{
    items: [...],
    activeId: 'overview',
    onItemChange: (id) => setActive(id),
  }}
  variant="standard"  // or "wide" or "narrow"
  footer={
    <Footer
      logo={<Brand>Company</Brand>}
      sections={[...]}
      copyright="© 2026 Company"
    />
  }
>
  <YourContent />
</PageTemplate>
```

**What it handles automatically:**
- ✅ Coordinated max-widths across ALL sections (header, title, breadcrumbs, content, footer)
- ✅ Swiss Grid spacing
- ✅ Sticky header positioning
- ✅ Breadcrumbs placement (below title or sticky top)
- ✅ All theme colors
- ✅ Responsive behavior

**Variants:**
- `standard`: 1280px max-width (default) - for most pages
- `wide`: 1440px max-width - for dashboards and data-heavy pages
- `narrow`: 896px max-width - for reading-focused pages (blogs, articles)

---

## Building Pages: The Component-First Way

### Step 1: Never Write CSS Variables

If you're writing `text-[var(--color-...)]`, **stop**. You're doing it wrong.

Ask yourself: "Which component should I be using?"

### Step 2: Use the Component Hierarchy

```
PageTemplate (provides structure)
  ├─ Header (uses Brand, Button, Link)
  ├─ Breadcrumbs (self-contained)
  ├─ SecondaryNav (optional, for section navigation)
  ├─ Content (your custom components, wrapped in Container)
  └─ Footer (uses Brand, Link)
```

### Step 3: Example - Complete Page

```tsx
import {
  PageTemplate,
  Brand,
  Footer,
  Button,
  Heading,
  Text,
  Card,
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
      {/* Your page content - automatically wrapped in proper container */}
      <div className="space-y-8">
        <section>
          <Heading level={2}>Getting Started</Heading>
          <Text>Welcome to our platform...</Text>
        </section>

        <Card>
          <Heading level={3}>Feature One</Heading>
          <Text variant="secondary">Description of the feature</Text>
          <Button>Learn More</Button>
        </Card>
      </div>
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
- 🎯 Perfect alignment guaranteed

---

## Common Patterns

### Pattern 1: Blog Post Layout

```tsx
<PageTemplate
  variant="narrow"  // Reading-focused 896px width
  header={...}
  title={post.title}
  subtitle={post.excerpt}
  breadcrumbs={[
    { label: 'Blog', href: '/blog' },
    { label: post.category, href: `/blog/${post.category}` },
    { label: post.title },
  ]}
>
  <article className="prose prose-lg">
    {/* Your markdown content */}
  </article>
</PageTemplate>
```

### Pattern 2: Dashboard Layout

```tsx
<PageTemplate
  variant="wide"  // Dashboard-focused 1440px width
  header={...}
  title="Analytics Dashboard"
  secondaryNav={{
    items: [
      { id: 'overview', label: 'Overview' },
      { id: 'revenue', label: 'Revenue' },
      { id: 'users', label: 'Users' },
    ],
    activeId: activeTab,
    onItemChange: setActiveTab,
  }}
>
  <div className="grid grid-cols-3 gap-6">
    <Card>Metric 1</Card>
    <Card>Metric 2</Card>
    <Card>Metric 3</Card>
  </div>
</PageTemplate>
```

### Pattern 3: Documentation Page

```tsx
<PageTemplate
  variant="standard"
  header={...}
  title="API Documentation"
  breadcrumbs={[
    { label: 'Docs', href: '/docs' },
    { label: 'API Reference', href: '/docs/api' },
    { label: 'Authentication' },
  ]}
  secondaryNav={{
    items: [
      { id: 'overview', label: 'Overview' },
      { id: 'endpoints', label: 'Endpoints' },
      { id: 'examples', label: 'Examples' },
    ],
    activeId: activeSection,
    onItemChange: setActiveSection,
  }}
>
  {activeSection === 'overview' && <OverviewContent />}
  {activeSection === 'endpoints' && <EndpointsContent />}
  {activeSection === 'examples' && <ExamplesContent />}
</PageTemplate>
```

---

## When to Create New Components

### Signs You Need a New Component

1. **You're repeating the same CSS variable pattern**
   ```tsx
   // If you're doing this multiple times:
   <span className="text-[var(--color-text-secondary)]">...</span>

   // Create a component:
   <SecondaryText>...</SecondaryText>
   // Or use: <Text variant="secondary">...</Text>
   ```

2. **You're manually styling common patterns**
   ```tsx
   // If you're repeatedly doing this:
   <div className="p-6 bg-[var(--color-surface)] border border-[var(--color-border)]">

   // Use the Card component:
   <Card>...</Card>
   ```

3. **Dark mode doesn't work automatically**
   - If you have to add conditional classes for themes
   - This means the styling should be in a component

### How to Create Token-Encapsulating Components

See [COMPONENT_WORKFLOW.md](./COMPONENT_WORKFLOW.md) for detailed instructions.

**Quick steps:**
1. Identify the pattern you're repeating
2. Create the component in `atoms/`, `molecules/`, or `organisms/`
3. Encapsulate all tokens and styling inside the component
4. Export it from the design system
5. Replace all manual instances with the component

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

// If you need a different style, request a new variant
```

### ❌ Mistake 3: Not Using PageTemplate

```tsx
// Wrong - manually composing page structure
export default function Page() {
  return (
    <>
      <Header />
      <div className="pt-20">  {/* Manual sticky offset */}
        <h1 className="text-4xl">Title</h1>
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

### ❌ Mistake 4: Creating Duplicate Containers

```tsx
// Wrong - PageTemplate already provides Container
<PageTemplate {...props}>
  <Container variant="standard">
    <YourContent />
  </Container>
</PageTemplate>
```

**Fix:**
```tsx
// Right - PageLayout (used by PageTemplate) manages the container
<PageTemplate variant="standard" {...props}>
  <YourContent />
</PageTemplate>
```

### ❌ Mistake 5: Using Non-Standard Color Classes

```tsx
// Wrong - using non-design-system classes
<div className="text-foreground bg-background">
  Content
</div>
```

**Fix:**
```tsx
// Right - use design system components
<Card>
  <Text>Content</Text>
</Card>

// Or use CSS variables if truly necessary:
<div className="text-[var(--color-text-primary)] bg-[var(--color-background)]">
  Content
</div>

// But ask yourself: should this be a component?
```

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
- `PageLayout` coordinates max-widths

You don't manage spacing manually - components do it.

### 3. Theme Support Through Components

Components handle theme switching:
- `Brand` automatically uses `--color-text-primary`
- `Button` automatically adapts colors per variant
- `Card` automatically uses surface colors
- All components respond to ThemeProvider changes

You don't write theme logic - components handle it.

### 4. Max-Width Coordination

**Critical:** All page elements must use the same max-width for perfect alignment.

PageTemplate handles this automatically:

```tsx
<PageTemplate variant="wide">  {/* variant = 1440px */}
  {/*
    Header uses max-w-[1440px] ✓
    PageLayout title uses max-w-[1440px] ✓
    PageLayout content uses max-w-[1440px] ✓
    SecondaryNav uses max-w-[1440px] ✓
    Footer uses max-w-[1440px] ✓
  */}
</PageTemplate>
```

**Never** manually set max-widths - let PageTemplate coordinate them.

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
- [ ] Test on mobile

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
- ✨ Theme switching (Studio, Sage, Volt)
- ✨ Consistent spacing (Swiss Grid)
- ✨ Proper typography
- ✨ Accessible focus states
- ✨ Responsive behavior
- ✨ Hover and active states
- ✨ Loading states
- ✨ Error states
- ✨ Perfect alignment

### You Never Write:
- ❌ `text-[var(--color-...)]`
- ❌ `bg-[var(--color-...)]`
- ❌ `border-[var(--color-...)]`
- ❌ Conditional theme classes
- ❌ Manual dark mode logic
- ❌ Custom spacing calculations
- ❌ Repetitive styling patterns
- ❌ Max-width coordination

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

**The Sage Design System succeeds. Use it.**

---

## Related Documentation

- [README.md](../README.md) - Design system overview and API reference
- [ARCHITECTURE-GUIDE.md](./ARCHITECTURE-GUIDE.md) - Where code belongs (design system vs apps)
- [COMPONENT_WORKFLOW.md](./COMPONENT_WORKFLOW.md) - How to create/modify components
- [UNRESOLVED_ISSUES.md](./UNRESOLVED_ISSUES.md) - Current known issues and solutions
