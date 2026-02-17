# @thesage/ui — AI Context

> 99 accessible React components | Radix UI + Tailwind CSS | 3 themes | TypeScript strict mode | MIT

## Install

```bash
pnpm add @thesage/ui
```

## Provider Hierarchy (Required)

Wrap your app root in this exact order:

```tsx
import { ThemeProvider, TooltipProvider } from '@thesage/ui/providers'
import { Toaster } from '@thesage/ui'
import '@thesage/ui/globals.css'

export default function RootLayout({ children }) {
  return (
    <ThemeProvider defaultTheme="studio" defaultMode="system">
      <TooltipProvider>
        {children}
        <Toaster />
      </TooltipProvider>
    </ThemeProvider>
  )
}
```

## Import Patterns

```tsx
// Main exports (most common)
import { Button, Card, Input, Dialog, Badge } from '@thesage/ui'

// Subpath exports
import { useMotionPreference, useTheme } from '@thesage/ui/hooks'
import { ThemeProvider, TooltipProvider } from '@thesage/ui/providers'
import { cn } from '@thesage/ui/utils'
import { spacing, typography } from '@thesage/ui/tokens'

// Heavy/optional features (require peer dependencies)
import { Form, FormField, FormItem } from '@thesage/ui/forms'       // react-hook-form + zod
import { Calendar, DatePicker } from '@thesage/ui/dates'             // date-fns + react-day-picker
import { DataTable } from '@thesage/ui/tables'                       // @tanstack/react-table
import { DragDrop } from '@thesage/ui/dnd'                           // @dnd-kit/*
```

## Themes

Three themes, each with light and dark modes:
- **Studio** — Professional, balanced (default)
- **Terra** — Calm, organic, warm earth tones
- **Volt** — Bold, electric, cyberpunk neon

```tsx
import { useTheme } from '@thesage/ui/hooks'
const { theme, setTheme, mode, setMode } = useTheme()
setTheme('volt')
setMode('dark')
```

## Styling Rules

- Use CSS variables: `bg-background`, `text-foreground`, `border-border`
- NEVER hardcode colors: no `bg-white`, `text-black`, `bg-neutral-100`
- All components accept `className` for Tailwind overrides
- Merge classes with `cn()`: `import { cn } from '@thesage/ui/utils'`

## Motion

Every animation MUST respect user preferences:
```tsx
import { useMotionPreference } from '@thesage/ui/hooks'
const { shouldAnimate, scale } = useMotionPreference()
```

## Component Categories

| Category | Count | Import | Examples |
|----------|-------|--------|----------|
| Actions | 5 | `@thesage/ui` | Button, Toggle, ToggleGroup, Link, Magnetic |
| Forms | 18 | `@thesage/ui` | Input, Textarea, Select, Checkbox, Switch, Slider, Combobox, RadioGroup, Label, SearchBar |
| Navigation | 7 | `@thesage/ui` | Tabs, Breadcrumb, Pagination, NavigationMenu, Menubar, Command |
| Overlays | 8 | `@thesage/ui` | Dialog, AlertDialog, Popover, Tooltip, HoverCard, ContextMenu, DropdownMenu, Drawer |
| Feedback | 6 | `@thesage/ui` | Alert, Toaster/toast, Progress, Skeleton, Spinner |
| Data Display | 14 | `@thesage/ui` | Card, Badge, Avatar, Table, Carousel, AspectRatio, Collapsible, CodeBlock |
| Layout | 8 | `@thesage/ui` | Accordion, Separator, ScrollArea, ResizablePanel, Sheet |
| Features | 3 | `@thesage/ui` | CustomizerPanel, ThemeSwitcher |

## High-Frequency Component Quick Reference

### Button
```tsx
<Button variant="default|destructive|outline|secondary|ghost|link" size="sm|default|lg|icon">
  Label
</Button>
```

### Card
```tsx
<Card>
  <CardHeader><CardTitle>Title</CardTitle><CardDescription>Desc</CardDescription></CardHeader>
  <CardContent>Body</CardContent>
  <CardFooter>Actions</CardFooter>
</Card>
```

### Dialog
```tsx
<Dialog>
  <DialogTrigger asChild><Button>Open</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader><DialogTitle>Title</DialogTitle><DialogDescription>Desc</DialogDescription></DialogHeader>
    Body
    <DialogFooter><Button>Confirm</Button></DialogFooter>
  </DialogContent>
</Dialog>
```

### Input
```tsx
<Input type="email" placeholder="Enter email" disabled={false} />
```

### Select
```tsx
<Select value={val} onValueChange={setVal}>
  <SelectTrigger><SelectValue placeholder="Pick one" /></SelectTrigger>
  <SelectContent>
    <SelectItem value="a">Option A</SelectItem>
    <SelectItem value="b">Option B</SelectItem>
  </SelectContent>
</Select>
```

### Tabs
```tsx
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

### Badge
```tsx
<Badge variant="default|secondary|destructive|outline">Label</Badge>
```

### Alert
```tsx
<Alert variant="default|destructive">
  <AlertTitle>Heading</AlertTitle>
  <AlertDescription>Message</AlertDescription>
</Alert>
```

### Form (react-hook-form integration)
```tsx
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@thesage/ui/forms'

<Form {...form}>
  <FormField control={form.control} name="email" render={({ field }) => (
    <FormItem>
      <FormLabel>Email</FormLabel>
      <FormControl><Input {...field} /></FormControl>
      <FormMessage />
    </FormItem>
  )} />
</Form>
```

## Bundle Size (minified + brotli)

| Entrypoint | Size | Peer Deps Required |
|------------|------|--------------------|
| `@thesage/ui` (core) | 146 KB | None |
| `@thesage/ui/dates` | 29 KB | date-fns, react-day-picker |
| `@thesage/ui/tokens` | 11 KB | None |
| `@thesage/ui/utils` | 10 KB | None |
| `@thesage/ui/forms` | 9 KB | react-hook-form, zod |
| `@thesage/ui/tables` | 8 KB | @tanstack/react-table |
| `@thesage/ui/dnd` | 8 KB | @dnd-kit/* |
| `@thesage/ui/providers` | 8 KB | None |
| `@thesage/ui/hooks` | 6 KB | None |
| `@thesage/ui/webgl` | 1 KB | framer-motion |

`sideEffects: false` enables tree-shaking. Heavy features isolated behind subpath exports.

## Third-Party Pairings

For gaps SDE doesn't cover, these libraries integrate well:

| Need | Library | Install |
|------|---------|---------|
| Rich Text Editor | Tiptap | `@tiptap/react @tiptap/starter-kit` |
| File Upload | react-dropzone | `react-dropzone` |
| Charts | Recharts | `recharts` |
| Color Picker | react-colorful | `react-colorful` |
| Markdown | react-markdown | `react-markdown remark-gfm` |
| Virtualized Lists | @tanstack/react-virtual | `@tanstack/react-virtual` |
| State Machines | XState | `xstate @xstate/react` |

**Already integrated as optional peer deps:** @tanstack/react-table (`/tables`), react-hook-form + zod (`/forms`), date-fns + react-day-picker (`/dates`), @dnd-kit (`/dnd`), framer-motion, lucide-react.

**Integration pattern:** Wrap in SDE Card/Dialog, use `cn()` for class merging, pull colors from CSS variables (`var(--color-primary)`) to stay theme-aware.

## Full API Reference

For complete props, variants, and examples for all 99 components:
- Web: https://thesage.dev/llms-full.txt
- MCP Server: `npx @thesage/mcp` (tools: list_components, search_components, get_component)

## Resources

- Docs: https://thesage.dev/docs
- GitHub: https://github.com/shalomormsby/sage-design-engine
- NPM: https://www.npmjs.com/package/@thesage/ui
