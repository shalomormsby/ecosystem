# Typography System Execution Plan

**Created:** 2026-01-23
**Status:** Planning Phase
**Complexity:** High (Multi-week feature)
**Related Systems:** Color Palettes, Customizer, Themes, OG Card

---

## Executive Summary

Create a comprehensive typography system for Sage UI that mirrors the success of the color palettes feature. This system will showcase font pairings for each theme, allow users to create custom font themes, and integrate seamlessly with existing features (Customizer, OG Cards).

**Core Philosophy:** Provide curated font pairings with clear guidance (constraints), while enabling creative freedom through custom themes. Typography is as crucial to brand identity as color—treat it with the same systematic rigor.

---

## Table of Contents

1. [Vision & Philosophy](#vision--philosophy)
2. [Current State Analysis](#current-state-analysis)
3. [Feature Requirements](#feature-requirements)
4. [Technical Architecture](#technical-architecture)
5. [Implementation Phases](#implementation-phases)
6. [File Structure](#file-structure)
7. [Component Design](#component-design)
8. [Data Models](#data-models)
9. [Integration Points](#integration-points)
10. [User Workflows](#user-workflows)
11. [Open Questions](#open-questions)
12. [Success Criteria](#success-criteria)

---

## Vision & Philosophy

### Why This Matters

**Typography is the voice of your design.** While color sets the mood, typography determines readability, hierarchy, personality, and professionalism. Most developers struggle with font pairing—this system solves that.

### Design Principles

1. **Curated > Chaos** - Offer expertly-paired fonts, not a font picker with 1000+ Google Fonts
2. **Context-Aware** - Show fonts in realistic use cases (headings, body, code blocks)
3. **Theme-First** - Typography should reinforce theme identity (Volt = bold/modern, Sage = elegant/serif, Studio = professional/sans)
4. **Educational** - Explain *why* pairings work (contrast, readability, mood)
5. **Performance-Conscious** - Only load fonts that are actively being used

### Alignment with Existing Systems

This mirrors the **Color Palettes** success:
- Curated presets (like color palettes)
- Custom creation (save your own)
- Category filtering (Professional, Creative, etc.)
- Live preview in theme context
- One-click application
- Copy config for implementation

---

## Current State Analysis

### What Exists Today

**Fonts Currently Loaded** (`apps/sage-design-studio/lib/fonts.ts`):

| Theme | Heading Font | Body Font | Mono Font |
|-------|-------------|-----------|-----------|
| **Studio** | Outfit | Manrope | Fira Code |
| **Sage** | Lora (serif) | Instrument Sans | Fira Code |
| **Volt** | Space Grotesk | Space Grotesk | Fira Code |

**Documentation Fonts:**
- Nunito (headings)
- Nunito Sans (body)

**Header Component:**
- Instrument Sans (independent of themes)

### Current Font Loading Mechanism

Fonts are loaded via `next/font/google` in `lib/fonts.ts`:

```typescript
export const voltHeading = Space_Grotesk({
    subsets: ['latin'],
    variable: '--font-volt-heading',
    display: 'swap',
    weight: ['300', '400', '600', '700'],
});
```

CSS variables are applied to the root `<html>` element via `allFontVariables`.

**Tokens** reference these CSS variables:

```typescript
// packages/tokens/src/volt.ts
typography: {
    heading: {
        fontFamily: 'var(--font-volt-sans)', // Space Grotesk
        fontWeight: '700',
        letterSpacing: '-0.03em',
    },
}
```

### What's Missing

- ❌ No visual showcase of font pairings (like color palettes page)
- ❌ No ability to create/save custom font themes
- ❌ No font pairing presets beyond the 3 main themes
- ❌ No educational content explaining pairings
- ❌ No integration with OG Card customizer
- ❌ No font theme categories (Professional, Creative, etc.)
- ❌ No interactive preview showing fonts in context

---

## Feature Requirements

### Must-Have (MVP)

1. **Typography Showcase Page**
   - URL: `/docs#themes/typography`
   - Grid layout of font theme cards
   - Live preview of heading + body + mono fonts
   - Category filtering (All, Professional, Creative, etc.)
   - Apply button (like color palettes)

2. **Curated Font Themes**
   - Start with 3 existing themes (Studio, Sage, Volt)
   - Add 6-8 additional presets:
     - Editorial (Playfair Display + Source Sans Pro)
     - Modern (Inter + Inter)
     - Elegant (Cormorant Garamond + Raleway)
     - Tech (JetBrains Mono + Roboto)
     - Friendly (Quicksand + Open Sans)
     - Classic (Georgia + System Sans)

3. **Custom Font Themes**
   - Create new font theme dialog
   - Select heading font (dropdown)
   - Select body font (dropdown)
   - Select mono font (dropdown)
   - Preview live
   - Save with name + description

4. **Integration with Customizer**
   - Font theme state management (Zustand)
   - Persist custom font themes to localStorage
   - Apply font theme to active theme/mode
   - Reset to default fonts

5. **OG Card Integration**
   - Font selector in OG Card customizer
   - Use currently active heading font by default
   - List all available fonts (from font themes)
   - Load font data for Satori rendering

### Should-Have (Phase 2)

- Font weight customization (Light, Regular, Bold, Black)
- Font pairing recommendations ("Great with...")
- Font usage tips ("Best for headlines" vs "Best for body")
- WCAG accessibility ratings (readable at small sizes)
- Variable font support
- Font loading performance metrics

### Nice-to-Have (Future)

- Custom font uploads (self-hosted fonts)
- Font subsetting for performance
- Animated font previews
- A/B testing different font pairings
- Font theme marketplace/sharing

---

## Technical Architecture

### System Components

```
┌─────────────────────────────────────────────────────────────┐
│                  Typography System Architecture              │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────┐      ┌──────────────────┐             │
│  │  Font Loader    │◄─────┤  Font Themes     │             │
│  │  (Next.js)      │      │  (Token Package) │             │
│  └─────────────────┘      └──────────────────┘             │
│         │                           │                        │
│         ▼                           ▼                        │
│  ┌──────────────────────────────────────────┐               │
│  │     CSS Variables (--font-*)             │               │
│  │  (Applied to <html> element)             │               │
│  └──────────────────────────────────────────┘               │
│         │                                                     │
│         ├────────────┬──────────────┬────────────┐          │
│         ▼            ▼              ▼            ▼          │
│  ┌──────────┐ ┌──────────┐  ┌──────────┐ ┌──────────┐     │
│  │Typography│ │Customizer│  │OG Card   │ │  Themes  │     │
│  │Showcase  │ │          │  │          │ │          │     │
│  │Page      │ │ (Zustand)│  │Customizer│ │ (Tokens) │     │
│  └──────────┘ └──────────┘  └──────────┘ └──────────┘     │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### State Management

**Zustand Store** (extend existing `customizer.store.ts`):

```typescript
interface FontTheme {
    id: string;
    name: string;
    description: string;
    category: FontThemeCategory;
    heading: string;        // Font family name (e.g., "Space Grotesk")
    body: string;
    mono: string;
    headingWeight?: string; // e.g., "700"
    bodyWeight?: string;
    letterSpacing?: {
        heading?: string;
        body?: string;
    };
    isCustom?: boolean;
    wcagReadable?: boolean; // Good contrast, readable at small sizes
}

type FontThemeCategory = 'professional' | 'creative' | 'editorial' | 'tech' | 'friendly' | 'minimal' | 'custom';

interface CustomizerState {
    // ... existing state ...

    // Font theme state
    customFontThemes: { [theme: string]: { [mode: string]: FontTheme | null } };
    savedFontThemes: FontTheme[];

    // Actions
    applyFontTheme: (theme: string, mode: string, fontTheme: FontTheme) => void;
    resetCustomFonts: (theme: string, mode: string) => void;
    saveFontTheme: (fontTheme: FontTheme) => void;
    deleteFontTheme: (id: string) => void;
    updateFontTheme: (id: string, updates: Partial<FontTheme>) => void;
}
```

### Font Loading Strategy

**Problem:** Loading all Google Fonts upfront would be slow.

**Solution:** Dynamic font loading based on active themes

1. **Base Fonts** (always loaded):
   - Documentation fonts (Nunito, Nunito Sans)
   - Default theme fonts (Outfit, Manrope, Lora, Instrument Sans, Space Grotesk, Fira Code)

2. **Theme Fonts** (loaded on demand):
   - When user applies a font theme, dynamically load those fonts
   - Use Next.js `next/font/google` for optimization
   - Cache loaded fonts

3. **OG Card Fonts**:
   - Fetch font data as ArrayBuffer for Satori
   - Use Google Fonts CDN URLs
   - Cache font data on edge

**Implementation:**

```typescript
// lib/fonts-dynamic.ts
import { Inter, Roboto, Open_Sans } from 'next/font/google';

export const fontRegistry = {
    'Inter': Inter({ subsets: ['latin'], variable: '--font-inter' }),
    'Roboto': Roboto({ subsets: ['latin'], variable: '--font-roboto', weight: ['400', '700'] }),
    // ... more fonts
};

export function loadFontTheme(fontTheme: FontTheme) {
    const headingFont = fontRegistry[fontTheme.heading];
    const bodyFont = fontRegistry[fontTheme.body];
    const monoFont = fontRegistry[fontTheme.mono];

    // Return CSS variables to apply
    return `${headingFont.variable} ${bodyFont.variable} ${monoFont.variable}`;
}
```

---

## Implementation Phases

### Phase 1: Foundation (Week 1)

**Goal:** Set up data models and font theme token package

- [ ] Create `packages/tokens/src/fontThemes.ts`
- [ ] Define `FontTheme` interface
- [ ] Create 8-10 curated font theme presets
- [ ] Export font themes as const array
- [ ] Add category types
- [ ] Document font pairing rationale (comments)

**Deliverable:** `fontThemes` export ready to use

---

### Phase 2: State Management (Week 1-2)

**Goal:** Extend Zustand customizer store for font themes

- [ ] Add font theme state to `customizer.store.ts`
- [ ] Implement `applyFontTheme` action
- [ ] Implement `saveFontTheme`, `deleteFontTheme`, `updateFontTheme`
- [ ] Add localStorage persistence
- [ ] Write tests for font theme actions

**Deliverable:** Zustand store ready for font theme management

---

### Phase 3: Dynamic Font Loading (Week 2)

**Goal:** Implement on-demand font loading

- [ ] Create `lib/fonts-dynamic.ts`
- [ ] Set up font registry with 15-20 Google Fonts
- [ ] Implement `loadFontTheme()` function
- [ ] Add font loading status tracking
- [ ] Handle loading errors gracefully
- [ ] Add font preconnect hints

**Deliverable:** Dynamic font loading system working

---

### Phase 4: Typography Showcase Page (Week 2-3)

**Goal:** Build `/docs#themes/typography` page (like PalettesTab)

**Components to Create:**

- [ ] `TypographyTab.tsx` - Main container
- [ ] `FontThemeCard.tsx` - Individual font theme card with preview
- [ ] `FontThemePreview.tsx` - Shows heading, body, and mono samples
- [ ] `CreateFontThemeDialog.tsx` - Create custom font theme
- [ ] `EditFontThemeDialog.tsx` - Edit existing custom theme
- [ ] `FontSelector.tsx` - Dropdown for selecting fonts

**Features:**

- [ ] Grid layout (responsive)
- [ ] Category filter (SecondaryNav)
- [ ] "Apply" button (applies to current theme/mode)
- [ ] "Create New" button (opens dialog)
- [ ] Edit/Delete for custom themes
- [ ] Active state indicator (checkmark)
- [ ] Live preview in each card
- [ ] Copy config button

**Deliverable:** Full typography showcase page

---

### Phase 5: OG Card Integration (Week 3)

**Goal:** Add font selector to OG Card customizer

- [ ] Add `fontFamily` state to `OpenGraphCardPage.tsx`
- [ ] Add font selector dropdown (lists all available fonts)
- [ ] Default to current theme's heading font
- [ ] Update `SavedOGDesign` interface to include `fontFamily`
- [ ] Update Edge Config sync to send `fontFamily`
- [ ] Update `opengraph-image.tsx` to load selected font
- [ ] Add more Google Fonts URLs to `FONT_URLS` mapping
- [ ] Test font rendering in OG images

**Deliverable:** OG cards with custom font selection working

---

### Phase 6: Polish & Documentation (Week 4)

**Goal:** Finish the feature with documentation and refinements

- [ ] Add font pairing education (tooltips, descriptions)
- [ ] Performance optimization (font subsetting if needed)
- [ ] Accessibility audit (keyboard navigation, screen readers)
- [ ] Write documentation in Sage Design Studio
- [ ] Update CHANGELOG.md
- [ ] Create demo video/GIF
- [ ] Add to portfolio showcase

**Deliverable:** Production-ready typography system

---

## File Structure

### New Files to Create

```
packages/
└── tokens/
    └── src/
        ├── fontThemes.ts              # Font theme presets (NEW)
        └── index.ts                    # Export fontThemes

apps/sage-design-studio/
├── lib/
│   └── fonts-dynamic.ts                # Dynamic font loading (NEW)
│
├── app/
│   └── components/
│       └── studio/
│           ├── ThemesSection/
│           │   └── TypographyTab.tsx   # Main typography page (NEW)
│           │
│           └── pages/
│               └── themes/
│                   ├── FontThemeCard.tsx           # Font theme card (NEW)
│                   ├── FontThemePreview.tsx        # Preview component (NEW)
│                   ├── CreateFontThemeDialog.tsx   # Create dialog (NEW)
│                   ├── EditFontThemeDialog.tsx     # Edit dialog (NEW)
│                   └── FontSelector.tsx            # Font dropdown (NEW)
│
└── docs/
    └── TYPOGRAPHY_SYSTEM_EXECUTION_PLAN.md  # This file
```

### Files to Modify

```
packages/
└── ui/
    └── src/
        └── store/
            └── customizer.store.ts      # Add font theme state

apps/sage-design-studio/
├── lib/
│   └── fonts.ts                         # Add more fonts to registry
│
├── app/
│   ├── components/
│   │   └── studio/
│   │       ├── ThemesSection.tsx        # Add TypographyTab route
│   │       └── pages/
│   │           └── blocks/
│   │               └── OpenGraphCardPage.tsx  # Add font selector
│   │
│   └── opengraph-image.tsx              # Already updated with font loading
│
└── CHANGELOG.md                          # Document feature
```

---

## Component Design

### `FontThemeCard.tsx`

**Purpose:** Display a single font theme with live preview

**Props:**
```typescript
interface FontThemeCardProps {
    fontTheme: FontTheme;
    isActive: boolean;
    onApply: () => void;
    onEdit?: () => void;    // Only for custom themes
    onDelete?: () => void;  // Only for custom themes
}
```

**Layout:**
```
┌───────────────────────────────────────┐
│  [Category Badge]    [Edit ⋮]         │
│                                        │
│  This is a Heading                     │  ← heading font
│  This is body text with proper        │  ← body font
│  spacing and line height               │
│  const code = "example";               │  ← mono font
│                                        │
│  Heading: Space Grotesk                │
│  Body: Space Grotesk                   │
│  Mono: Fira Code                       │
│                                        │
│  Professional • WCAG Readable          │
│                                        │
│  [ Apply ] [✓ Active]                  │
└───────────────────────────────────────┘
```

**Features:**
- Renders fonts using loaded font families
- Shows checkmark if currently active
- Dropdown menu for edit/delete (custom themes only)
- Badge for category
- Accessibility badge if WCAG-readable
- Hover states

---

### `CreateFontThemeDialog.tsx`

**Purpose:** Create a new custom font theme

**Layout:**
```
┌─────────────────────────────────────────────┐
│  Create Font Theme                      [×] │
├─────────────────────────────────────────────┤
│                                             │
│  Name                                       │
│  ┌─────────────────────────────────────┐  │
│  │ My Custom Fonts                     │  │
│  └─────────────────────────────────────┘  │
│                                             │
│  Description (optional)                     │
│  ┌─────────────────────────────────────┐  │
│  │ Modern sans-serif pairing           │  │
│  └─────────────────────────────────────┘  │
│                                             │
│  Heading Font                               │
│  ┌─────────────────────────────────────┐  │
│  │ Inter                          ▼    │  │
│  └─────────────────────────────────────┘  │
│                                             │
│  Body Font                                  │
│  ┌─────────────────────────────────────┐  │
│  │ Inter                          ▼    │  │
│  └─────────────────────────────────────┘  │
│                                             │
│  Mono Font                                  │
│  ┌─────────────────────────────────────┐  │
│  │ Fira Code                      ▼    │  │
│  └─────────────────────────────────────┘  │
│                                             │
│  ┌─ Live Preview ──────────────────────┐  │
│  │  This is a Heading                   │  │
│  │  This is body text preview           │  │
│  │  const code = true;                  │  │
│  └──────────────────────────────────────┘  │
│                                             │
│         [Cancel]  [Create Font Theme]      │
└─────────────────────────────────────────────┘
```

**Features:**
- Live preview updates as fonts are selected
- Validation (name required)
- Font dropdowns with search
- Auto-categorizes as "custom"

---

### `FontSelector.tsx`

**Purpose:** Reusable font selection dropdown

**Props:**
```typescript
interface FontSelectorProps {
    label: string;
    value: string;
    onChange: (fontFamily: string) => void;
    category?: 'heading' | 'body' | 'mono';  // Filter appropriate fonts
}
```

**Features:**
- Search/filter fonts
- Preview each font in dropdown (font rendered in its own style)
- Categorize fonts (Serif, Sans, Mono, Display)
- Show popular fonts first

---

### `TypographyTab.tsx`

**Purpose:** Main container (similar to `PalettesTab.tsx`)

**Features:**
- SecondaryNav for categories
- Grid of FontThemeCards
- "Create New" button
- Active theme indicator
- Reset to default button
- Responsive grid (1 col mobile, 2 col tablet, 3 col desktop)

---

## Data Models

### `FontTheme` Interface

```typescript
export interface FontTheme {
    id: string;                      // Unique identifier
    name: string;                     // Display name
    description: string;              // Brief description
    category: FontThemeCategory;      // Categorization
    heading: string;                  // Heading font family (e.g., "Space Grotesk")
    body: string;                     // Body font family
    mono: string;                     // Monospace font family
    headingWeight?: string;           // Default weight (e.g., "700")
    bodyWeight?: string;              // Default weight (e.g., "400")
    letterSpacing?: {
        heading?: string;             // e.g., "-0.03em"
        body?: string;                // e.g., "0"
    };
    lineHeight?: {
        heading?: string;             // e.g., "1.2"
        body?: string;                // e.g., "1.6"
    };
    isCustom?: boolean;               // User-created theme
    wcagReadable?: boolean;           // Good for accessibility
    mood?: string[];                  // e.g., ["modern", "clean", "professional"]
    bestFor?: string;                 // e.g., "SaaS products, landing pages"
}

export type FontThemeCategory =
    | 'professional'
    | 'creative'
    | 'editorial'
    | 'tech'
    | 'friendly'
    | 'minimal'
    | 'luxury'
    | 'playful'
    | 'custom';
```

### Curated Font Themes (Examples)

```typescript
export const fontThemes: FontTheme[] = [
    {
        id: 'studio',
        name: 'Studio',
        description: 'Professional and balanced, perfect for modern SaaS products',
        category: 'professional',
        heading: 'Outfit',
        body: 'Manrope',
        mono: 'Fira Code',
        headingWeight: '700',
        bodyWeight: '400',
        letterSpacing: { heading: '-0.02em', body: '0' },
        wcagReadable: true,
        mood: ['professional', 'modern', 'clean'],
        bestFor: 'SaaS products, business sites, dashboards',
    },
    {
        id: 'sage',
        name: 'Sage',
        description: 'Elegant serif heading with clean sans body',
        category: 'editorial',
        heading: 'Lora',
        body: 'Instrument Sans',
        mono: 'Fira Code',
        headingWeight: '600',
        bodyWeight: '400',
        letterSpacing: { heading: '-0.01em', body: '0' },
        wcagReadable: true,
        mood: ['elegant', 'warm', 'organic'],
        bestFor: 'Editorial sites, blogs, portfolios',
    },
    {
        id: 'volt',
        name: 'Volt',
        description: 'Bold and electric, one font for everything',
        category: 'tech',
        heading: 'Space Grotesk',
        body: 'Space Grotesk',
        mono: 'Fira Code',
        headingWeight: '700',
        bodyWeight: '400',
        letterSpacing: { heading: '-0.03em', body: '0' },
        wcagReadable: true,
        mood: ['bold', 'modern', 'tech'],
        bestFor: 'Tech startups, developer tools, portfolios',
    },
    {
        id: 'editorial-classic',
        name: 'Editorial Classic',
        description: 'Timeless serif pairing for long-form content',
        category: 'editorial',
        heading: 'Playfair Display',
        body: 'Source Sans Pro',
        mono: 'Fira Code',
        headingWeight: '700',
        bodyWeight: '400',
        letterSpacing: { heading: '0', body: '0' },
        lineHeight: { heading: '1.2', body: '1.7' },
        wcagReadable: true,
        mood: ['classic', 'elegant', 'readable'],
        bestFor: 'Magazines, blogs, long-form articles',
    },
    {
        id: 'modern-swiss',
        name: 'Modern Swiss',
        description: 'Clean and neutral, maximum readability',
        category: 'professional',
        heading: 'Inter',
        body: 'Inter',
        mono: 'JetBrains Mono',
        headingWeight: '700',
        bodyWeight: '400',
        letterSpacing: { heading: '-0.02em', body: '0' },
        wcagReadable: true,
        mood: ['minimal', 'clean', 'modern'],
        bestFor: 'Documentation, dashboards, data-heavy UIs',
    },
    {
        id: 'friendly-rounded',
        name: 'Friendly & Rounded',
        description: 'Approachable and warm, great for consumer apps',
        category: 'friendly',
        heading: 'Quicksand',
        body: 'Open Sans',
        mono: 'Fira Code',
        headingWeight: '600',
        bodyWeight: '400',
        wcagReadable: true,
        mood: ['friendly', 'approachable', 'warm'],
        bestFor: 'Consumer apps, education, healthcare',
    },
    {
        id: 'tech-mono',
        name: 'Tech Monospace',
        description: 'Monospace everything, for the hackers',
        category: 'tech',
        heading: 'JetBrains Mono',
        body: 'JetBrains Mono',
        mono: 'JetBrains Mono',
        headingWeight: '700',
        bodyWeight: '400',
        wcagReadable: true,
        mood: ['tech', 'hacker', 'minimal'],
        bestFor: 'Developer tools, coding tutorials, terminal UIs',
    },
    {
        id: 'luxury-serif',
        name: 'Luxury Serif',
        description: 'Sophisticated and high-end',
        category: 'luxury',
        heading: 'Cormorant Garamond',
        body: 'Raleway',
        mono: 'Fira Code',
        headingWeight: '600',
        bodyWeight: '300',
        letterSpacing: { heading: '0.02em', body: '0.01em' },
        wcagReadable: false, // Thinner weights
        mood: ['luxury', 'elegant', 'sophisticated'],
        bestFor: 'Fashion, luxury brands, high-end services',
    },
    // Add more themes as needed
];
```

---

## Integration Points

### 1. Customizer Integration

**File:** `packages/ui/src/store/customizer.store.ts`

**New State:**
```typescript
customFontThemes: {},  // { [theme]: { [mode]: FontTheme | null } }
savedFontThemes: [],   // User's custom font themes
```

**New Actions:**
```typescript
applyFontTheme: (theme, mode, fontTheme) => {
    set((state) => ({
        customFontThemes: {
            ...state.customFontThemes,
            [theme]: {
                ...state.customFontThemes[theme],
                [mode]: fontTheme,
            },
        },
    }));

    // Dynamically load fonts
    loadFontTheme(fontTheme);
},

saveFontTheme: (fontTheme) => {
    set((state) => ({
        savedFontThemes: [...state.savedFontThemes, { ...fontTheme, isCustom: true }],
    }));
},
```

**LocalStorage Persistence:**
```typescript
// Save to localStorage on state change
customFontThemes: { ... },
savedFontThemes: [ ... ],

// Load from localStorage on init
const storedFontThemes = localStorage.getItem('sage-custom-font-themes');
const storedSavedFontThemes = localStorage.getItem('sage-saved-font-themes');
```

---

### 2. Theme Tokens Integration

**File:** `packages/tokens/src/studio.ts` (and sage.ts, volt.ts)

**Current Structure:**
```typescript
typography: {
    heading: {
        fontFamily: 'var(--font-studio-heading)',
        fontWeight: '700',
        letterSpacing: '-0.02em',
    },
    body: {
        fontFamily: 'var(--font-studio-body)',
        fontWeight: '400',
        letterSpacing: '0',
    },
    mono: {
        fontFamily: 'var(--font-studio-mono)',
        fontWeight: '400',
        letterSpacing: '0',
    },
}
```

**Enhancement Needed:**

Allow runtime override via Customizer. When a font theme is applied, inject new CSS variables:

```css
/* Default */
--font-studio-heading: var(--font-outfit);
--font-studio-body: var(--font-manrope);

/* After applying "Modern Swiss" font theme */
--font-studio-heading: var(--font-inter);
--font-studio-body: var(--font-inter);
```

**Implementation:**

```typescript
// In Customizer
const appliedFontTheme = useCustomizer(state => state.customFontThemes[theme]?.[mode]);

useEffect(() => {
    if (appliedFontTheme) {
        document.documentElement.style.setProperty('--font-studio-heading', `var(--font-${fontTheme.heading.toLowerCase().replace(' ', '-')})`);
        document.documentElement.style.setProperty('--font-studio-body', `var(--font-${fontTheme.body.toLowerCase().replace(' ', '-')})`);
    }
}, [appliedFontTheme]);
```

---

### 3. OG Card Integration

**File:** `apps/sage-design-studio/app/components/studio/pages/blocks/OpenGraphCardPage.tsx`

**Add Font Selector:**

```typescript
const [fontFamily, setFontFamily] = useState('Space Grotesk');

// Get all available fonts from font themes
const availableFonts = useMemo(() => {
    const fonts = new Set<string>();
    fontThemes.forEach(theme => {
        fonts.add(theme.heading);
        fonts.add(theme.body);
    });
    return Array.from(fonts).sort();
}, []);

// In the UI
<div className="space-y-2">
    <Label htmlFor="font-family">Font</Label>
    <Select value={fontFamily} onValueChange={setFontFamily}>
        <SelectTrigger id="font-family">
            <SelectValue />
        </SelectTrigger>
        <SelectContent>
            {availableFonts.map(font => (
                <SelectItem key={font} value={font}>
                    {font}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
</div>
```

**Update Edge Config Sync:**

```typescript
const configForStorage = {
    // ... existing fields ...
    fontFamily: fontFamily,
};
```

**File:** `apps/sage-design-studio/app/opengraph-image.tsx`

Already updated with font loading! Just need to expand `FONT_URLS` mapping with more fonts.

---

### 4. Navigation Integration

**File:** `apps/sage-design-studio/app/components/studio/ThemesSection.tsx`

Add new route for Typography:

```typescript
const tabs = [
    { id: 'customizer', label: 'Customizer', icon: <Sliders className="w-4 h-4" /> },
    { id: 'palettes', label: 'Color Palettes', icon: <Palette className="w-4 h-4" /> },
    { id: 'typography', label: 'Typography', icon: <Type className="w-4 h-4" /> }, // NEW
];

// In render
{activeTab === 'typography' && <TypographyTab />}
```

---

## User Workflows

### Workflow 1: Apply a Curated Font Theme

```
1. User navigates to /docs#themes/typography
2. Sees grid of curated font theme cards
3. Browses categories (Professional, Creative, etc.)
4. Hovers over "Modern Swiss" card
   → Sees live preview with heading, body, and code samples
5. Clicks "Apply" button
6. Fonts load dynamically
7. CSS variables update
8. Entire site re-renders with new fonts
9. User sees confirmation toast
```

**Technical Flow:**
```
User clicks Apply
    ↓
applyFontTheme(theme, mode, fontTheme)
    ↓
Zustand updates customFontThemes state
    ↓
loadFontTheme(fontTheme) fetches fonts
    ↓
CSS variables injected into <html>
    ↓
Components re-render with new fonts
```

---

### Workflow 2: Create a Custom Font Theme

```
1. User clicks "Create Font Theme" button
2. Dialog opens
3. User enters name: "My Brand Fonts"
4. User selects heading font: "Playfair Display"
5. User selects body font: "Source Sans Pro"
6. User selects mono font: "Fira Code"
7. Live preview updates in real-time
8. User clicks "Create Font Theme"
9. Font theme saved to localStorage
10. Appears in "My Palettes" category
11. User can now apply it
```

**Technical Flow:**
```
User clicks Create
    ↓
saveFontTheme({ name, heading, body, mono, ... })
    ↓
Zustand updates savedFontThemes array
    ↓
localStorage persists data
    ↓
FontThemeCard appears in grid
```

---

### Workflow 3: Use Custom Font in OG Card

```
1. User navigates to /docs#blocks/social
2. Customizes OG card
3. Sees "Font" dropdown
4. Selects "Playfair Display" (from their applied font theme)
5. Preview updates with new font
6. User saves design
7. Clicks "Set Active"
8. Edge Config syncs font selection
9. User deploys site
10. OG image renders with custom font
```

---

## Open Questions

### 1. Font Loading Performance

**Question:** Should we lazy-load fonts or preload all fonts in the registry?

**Options:**
- **A:** Preload all fonts on page load (slower initial load, instant switching)
- **B:** Load fonts on-demand when applied (faster initial load, delay when switching)
- **C:** Hybrid: Preload popular fonts, lazy-load others

**Recommendation:** Start with Option B (lazy-load), optimize later if needed.

---

### 2. Font Subsetting

**Question:** Should we use font subsetting to reduce file sizes?

**Context:** Google Fonts API supports subsetting (e.g., `&text=HelloWorld` loads only those characters)

**Recommendation:** Not for MVP. Next.js `next/font/google` already optimizes fonts. Consider for Phase 2 if performance issues arise.

---

### 3. Self-Hosted Fonts

**Question:** Should we support custom font uploads (self-hosted fonts)?

**Complexity:** High (file uploads, font validation, CORS, licensing)

**Recommendation:** Not for MVP. Add to "Nice-to-Have" list for future.

---

### 4. Variable Fonts

**Question:** Should we support variable fonts (adjust weight/width dynamically)?

**Example:** Inter Variable Font (400-900 weight in one file)

**Recommendation:** Not for MVP. Requires UI for weight sliders. Add to Phase 2.

---

### 5. Font Pairing AI

**Question:** Should we use AI to suggest font pairings?

**Example:** "You selected Playfair Display. We recommend Source Sans Pro for body."

**Recommendation:** Not for MVP. Could be a fun Phase 3 feature.

---

## Success Criteria

### MVP Launch (Phase 6 Complete)

- [ ] Typography showcase page live at `/docs#themes/typography`
- [ ] 8-10 curated font themes available
- [ ] Users can create, edit, delete custom font themes
- [ ] Font themes apply to current theme/mode via Customizer
- [ ] Fonts persist to localStorage
- [ ] OG Card customizer has font selector
- [ ] OG images render with selected fonts
- [ ] Zero accessibility regressions
- [ ] Documentation complete
- [ ] Feature announced in CHANGELOG

### User Adoption Metrics (Post-Launch)

- [ ] 50+ unique users interact with typography page in first month
- [ ] 20+ custom font themes created by users
- [ ] 5+ GitHub stars/mentions citing typography system
- [ ] Zero critical bugs reported

### Quality Metrics

- [ ] Lighthouse Performance score: 90+ (no regression from font loading)
- [ ] Font load time: < 500ms (average)
- [ ] WCAG AA compliance maintained
- [ ] Cross-browser testing passed (Chrome, Firefox, Safari, Edge)

---

## Risk Assessment

### High Risk

**Font Loading Performance**
- **Risk:** Loading too many fonts slows down the site
- **Mitigation:** Lazy-load fonts on-demand, limit registry to 20-25 fonts
- **Fallback:** Use system fonts if loading fails

**Font Licensing**
- **Risk:** Google Fonts licenses could change
- **Mitigation:** All curated fonts use SIL Open Font License (OFL)
- **Fallback:** Document licensing in code comments

### Medium Risk

**Browser Compatibility**
- **Risk:** Fonts render differently across browsers
- **Mitigation:** Use `font-display: swap` and test on all major browsers
- **Fallback:** System font stack as fallback

**State Management Complexity**
- **Risk:** Font theme state could conflict with color palette state
- **Mitigation:** Separate state slices in Zustand
- **Fallback:** Reset to defaults if corruption detected

### Low Risk

**User Confusion**
- **Risk:** Users don't understand font pairing
- **Mitigation:** Add educational tooltips and descriptions
- **Fallback:** Default to curated themes

---

## Future Enhancements (Post-MVP)

1. **Font Pairing AI** - Suggest complementary fonts based on selection
2. **Variable Font Support** - Sliders for weight, width, slant
3. **Font Performance Dashboard** - Show load times and impact
4. **Self-Hosted Font Uploads** - Allow custom font files
5. **Font Theme Marketplace** - Share/export font themes
6. **Advanced Typography Controls** - Line height, kerning, OpenType features
7. **A/B Testing** - Compare font pairings side-by-side
8. **Font Subsetting** - Load only required characters
9. **Theme-Specific Recommendations** - "Best fonts for dark mode"
10. **Integration with Figma/Design Tools** - Export font configs

---

## Conclusion

This typography system will be as powerful and delightful as the color palettes system. By providing curated font pairings with clear guidance, while enabling creative freedom through custom themes, we empower users to create beautiful, cohesive designs.

**Start with Phase 1 immediately.** The foundation (font themes token package) is straightforward and unblocks subsequent phases.

**Timeline:** 3-4 weeks for MVP (Phases 1-6)

**Next Steps:**
1. Review this plan with Shalom
2. Approve curated font theme list (add/remove fonts)
3. Begin Phase 1 implementation
4. Track progress in `SageUI_ToDo.md`

---

**Document Status:** ✅ Ready for Review
**Last Updated:** 2026-01-23
**Author:** Claude Sonnet 4.5 (with Shalom's direction)
