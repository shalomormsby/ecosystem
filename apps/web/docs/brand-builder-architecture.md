# Brand Builder Architecture

## Overview
Brand Builder is the first Template in Sage UI's 4-layer hierarchy, demonstrating how Tokens, Components, and Blocks compose into complete page layouts.

## 4-Layer Hierarchy in Action

### Layer 1: Tokens (Design System Primitives)
- **Color Palettes** (`@thesage/tokens/colorPalettes`) - 12 curated themes
- **Typography Fonts** (`fonts-dynamic`) - 24+ Google Fonts + System fonts
- **Spacing** - Consistent grid spacing throughout

### Layer 2: Components (Individual UI Elements)
Brand Builder uses these components from `@thesage/ui`:

#### Form Components
- **Input** - Text inputs for brand name, logo text, color hex values
- **Label** - Form labels
- **Select** - Dropdowns for font selection, weight, transform
- **SelectTrigger**, **SelectContent**, **SelectItem**, **SelectValue** - Select subcomponents
- **Button** - Action buttons (Save, Download, Copy, Load, Delete)

#### Layout Components
- **Card** - Section containers for controls and preview panels

#### Icons (lucide-react)
- **Save**, **Download**, **Copy**, **Check** - Action icons
- **Trash2**, **RefreshCw** - Management icons

### Layer 3: Blocks (Composed Patterns)
Brand Builder demonstrates these composed patterns that could be extracted as reusable blocks:

#### Potential Blocks to Extract

1. **LogotypeComposer**
   - Logo text input
   - Size slider (24-96px)
   - Weight selector (Light → Black)
   - Letter spacing slider (-5 to 20px)
   - Text transform selector (none, uppercase, lowercase, capitalize)
   - Live gradient preview with dynamic styles

2. **ColorPaletteSelector**
   - Grid of quick preset buttons (3 columns)
   - Primary color picker (color input + hex input)
   - Secondary color picker (color input + hex input)
   - Visual swatches

3. **TypographyPairSelector**
   - Heading font dropdown (all system fonts)
   - Body font dropdown (all system fonts)
   - Typography preview panel

4. **SavedDesignsList**
   - Design cards with name, preview text, and actions
   - Load button (RefreshCw icon)
   - Delete button (Trash2 icon)
   - Scrollable container (max-h-[300px])

5. **ExportActions**
   - Save to Edge Config (with sync status)
   - Download SVG logo
   - Copy CSS Variables
   - Copy JSON Config
   - Feedback states (copied/saved indicators)

### Layer 4: Templates (Complete Page Layouts)
**Brand Builder Template** combines all layers:
- 3-column grid layout (1:2 ratio, lg breakpoint)
- Sticky preview panel (`sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto`)
- Controls panel with logical sections:
  1. Brand Information
  2. Logotype Settings
  3. Color Palette
  4. Typography
  5. Actions
  6. Saved Brands
- Preview panel with live updates:
  1. Logo Preview (gradient text with dynamic styles)
  2. Typography Examples
  3. Color Palette swatches

## Integration Points

### Data Flow
1. **Fonts** → `getAllFontNames()` from `lib/fonts-dynamic.ts`
2. **Colors** → `colorPalettes` slice from `@thesage/tokens`
3. **Storage** → localStorage + Vercel Edge Config sync
4. **State** → React useState hooks with controlled components

### Export Formats
- **SVG** - Downloadable logo with embedded gradient
- **CSS Variables** - `:root` CSS custom properties
- **JSON** - Structured config for programmatic use

## Layout Pattern
Follows the Open Graph Card layout pattern:
- **Controls**: Narrow left column (lg:col-span-1)
- **Preview**: Wide right column (lg:col-span-2)
- **Sticky behavior**: Preview stays visible during scroll
- **Independent scrolling**: Preview column scrolls separately

## Sticky Preview Implementation
```tsx
<div className="lg:col-span-2 space-y-4 sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto">
  {/* Preview content */}
</div>
```

## Components Used Summary

| Component | Source | Purpose |
|-----------|--------|---------|
| Card | @thesage/ui | Section containers |
| Button | @thesage/ui | Actions (6 types) |
| Input | @thesage/ui | Text fields (4 fields) |
| Label | @thesage/ui | Form labels |
| Select | @thesage/ui | Dropdowns (4 selects) |
| Icons | lucide-react | Visual feedback |

## Blocks Identified for Future Extraction

1. **LogotypeComposer** - Standalone logotype creation block
2. **ColorPaletteSelector** - Reusable color palette picker
3. **TypographyPairSelector** - Font pairing selector
4. **SavedDesignsList** - Generic saved designs list pattern
5. **ExportActions** - Multi-format export action panel

## Navigation Structure
```
Templates (Layer 4 - LayoutTemplate icon)
├── Overview
├── Brand Builder ← First template
└── Page Template
```

## File Locations
- **Template**: `/apps/web/app/components/studio/BrandBuilder/BrandBuilder.tsx`
- **Section**: `/apps/web/app/components/studio/TemplatesSection.tsx`
- **Navigation**: `/apps/web/app/lib/navigation-tree.tsx`
- **Routing**: `/apps/web/app/docs/page.tsx`

## Success Metrics
✅ First template in 4-layer hierarchy
✅ Demonstrates Token → Component → Block → Template flow
✅ Uses 5+ components from @thesage/ui
✅ Identifies 5 potential blocks for extraction
✅ Sticky preview with independent scrolling
✅ Multi-format export (SVG, CSS, JSON)
✅ Edge Config sync for saved designs
✅ Fully responsive layout
