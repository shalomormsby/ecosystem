import { Code, Link, Spinner, ProgressBar, Switch } from '@ecosystem/design-system';
import { Label, Alert, AlertDescription, AlertTitle, Avatar, AvatarImage, AvatarFallback, Button, Card, Badge, Checkbox, Combobox, Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut, DataTable, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Popover, PopoverAnchor, PopoverContent, PopoverTrigger, RadioGroup, RadioGroupItem, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Separator, ScrollArea, Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, Skeleton, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Tabs, TabsContent, TabsList, TabsTrigger, Textarea, Toaster, ToastProvider, useToast } from '@sds/ui';

export interface PropConfig {
  type: 'select' | 'boolean' | 'text' | 'array' | 'object' | 'interface' | 'custom';
  options?: readonly string[];
  default: any;
  description?: string;
  // For displaying complex TypeScript types
  typeDefinition?: string; // e.g., "BreadcrumbItem[]", "{ id: string; label: string }[]"
  required?: boolean; // Mark required props with visual indicator
}

export interface ComponentConfig {
  component: React.ComponentType<any>;
  description: string;
  props: Record<string, PropConfig>;
  examples: Array<{
    label: string;
    props: Record<string, any>;
    children?: React.ReactNode;
  }>;
  // Code examples with CollapsibleCodeBlock
  codeExamples?: Array<{
    title: string;
    code: string;
    description?: string;
  }>;
  // GitHub source link for LLM navigation
  sourceUrl?: string;
  // Accessibility notes for documenting a11y features
  accessibilityNotes?: string[];
}

export const componentRegistry: Record<string, ComponentConfig> = {
  Alert: {
    component: Alert,
    description: 'Displays a callout for user attention. Supports default and destructive variants with optional icon, title, and description.',
    props: {
      variant: {
        type: 'select',
        options: ['default', 'destructive'] as const,
        default: 'default',
        description: 'Visual style variant - default for informational alerts, destructive for errors or warnings',
      },
    },
    examples: [
      {
        label: 'Default',
        props: { variant: 'default' },
        children: (
          <>
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              You can add components to your app using the cli.
            </AlertDescription>
          </>
        ),
      },
      {
        label: 'Destructive',
        props: { variant: 'destructive' },
        children: (
          <>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Your session has expired. Please log in again.
            </AlertDescription>
          </>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { Alert, AlertDescription, AlertTitle } from '@sds/ui';

<Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components to your app using the cli.
  </AlertDescription>
</Alert>`,
        description: 'Simple informational alert with title and description',
      },
      {
        title: 'Destructive Variant',
        code: `import { Alert, AlertDescription, AlertTitle } from '@sds/ui';

<Alert variant="destructive">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Your session has expired. Please log in again.
  </AlertDescription>
</Alert>`,
        description: 'Error alert using destructive variant',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/Alert.tsx',
    accessibilityNotes: [
      'Uses role="alert" for screen reader announcements',
      'WCAG 2.1 AA compliant color contrast',
      'Keyboard accessible',
      'Supports both title and description for complete context',
    ],
  },

  Avatar: {
    component: Avatar,
    description: 'An image element with a fallback for representing the user. Migrated to @sds/ui.',
    props: {
      className: {
        type: 'text',
        default: '',
        description: 'Additional CSS classes',
      },
    },
    examples: [
      {
        label: 'Default',
        props: {},
        children: (
          <>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </>
        ),
      },
      {
        label: 'Fallback',
        props: {},
        children: (
          <>
            <AvatarImage src="/broken-image.jpg" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { Avatar, AvatarFallback, AvatarImage } from "@sds/ui"

<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`,
        description: 'Avatar with image and fallback',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/Avatar.tsx',
  },

  Button: {
    component: Button,
    description: 'Interactive button component with multiple variants, sizes, and states. Built with Radix UI primitives for accessibility.',
    props: {
      variant: {
        type: 'select',
        options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const,
        default: 'default',
        description: 'Visual style variant - default for primary actions, destructive for dangerous actions, outline for secondary emphasis, secondary for alternative actions, ghost for subtle actions, link for text-style links',
      },
      size: {
        type: 'select',
        options: ['sm', 'default', 'lg', 'icon'] as const,
        default: 'default',
        description: 'Size variant - sm (h-8) for compact spaces, default (h-9) for standard use, lg (h-10) for prominent actions, icon (h-9 w-9) for icon-only buttons',
      },
      disabled: {
        type: 'boolean',
        default: false,
        description: 'Disable button interaction and show disabled state',
      },
    },
    examples: [
      { label: 'Default', props: { variant: 'default', size: 'default' }, children: 'Default' },
      { label: 'Destructive', props: { variant: 'destructive', size: 'default' }, children: 'Destructive' },
      { label: 'Outline', props: { variant: 'outline', size: 'default' }, children: 'Outline' },
      { label: 'Secondary', props: { variant: 'secondary', size: 'default' }, children: 'Secondary' },
      { label: 'Ghost', props: { variant: 'ghost', size: 'default' }, children: 'Ghost' },
      { label: 'Link', props: { variant: 'link', size: 'default' }, children: 'Link' },
      { label: 'Small', props: { variant: 'default', size: 'sm' }, children: 'Small' },
      { label: 'Large', props: { variant: 'default', size: 'lg' }, children: 'Large' },
      { label: 'Disabled', props: { variant: 'default', size: 'default', disabled: true }, children: 'Disabled' },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { Button } from '@sds/ui';

<Button variant="default" onClick={() => console.log('Clicked!')}>
  Click Me
</Button>`,
        description: 'Simple button with click handler',
      },
      {
        title: 'All Variants',
        code: `import { Button } from '@sds/ui';

<div className="flex gap-3">
  <Button variant="default">Default</Button>
  <Button variant="destructive">Destructive</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="link">Link</Button>
</div>`,
        description: 'Showcase of all button variants',
      },
      {
        title: 'Sizes',
        code: `import { Button } from '@sds/ui';

<div className="flex items-center gap-3">
  <Button size="sm">Small</Button>
  <Button size="default">Default</Button>
  <Button size="lg">Large</Button>
</div>`,
        description: 'All available button sizes',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/Button.tsx',
    accessibilityNotes: [
      'Uses semantic <button> element for proper keyboard and screen reader support',
      'focus-visible outline ensures visible focus ring only for keyboard navigation',
      'Loading spinner has aria-hidden="true" to prevent screen reader announcement',
      'disabled state properly conveyed to assistive technologies',
      'Extends native HTMLButtonElement, inheriting all standard ARIA attributes',
      'Supports focus management with React.forwardRef',
    ],
  },

  Card: {
    component: Card,
    description: 'Container component with standard and glass-morphism styling. Migrated to @sds/ui.',
    props: {
      variant: {
        type: 'select',
        options: ['default', 'glass', 'outline'] as const,
        default: 'default',
        description: 'Visual style variant',
      },
      hoverEffect: {
        type: 'boolean',
        default: true,
        description: 'Enable hover lift and shadow effect for interactive cards',
      },
    },
    examples: [
      {
        label: 'Default',
        props: { variant: 'default', hoverEffect: true },
        children: 'Standard Card',
      },
      {
        label: 'Glass',
        props: { variant: 'glass', hoverEffect: true },
        children: 'Glass Effect Card',
      },
      {
        label: 'Outline',
        props: { variant: 'outline', hoverEffect: false },
        children: 'Outline Card',
      },
      {
        label: 'With Content',
        props: { variant: 'default', hoverEffect: true },
        children: (
          <div className="p-4">
            <h3 className="font-bold mb-2">Card Title</h3>
            <p className="text-sm text-gray-500">Card description goes here.</p>
          </div>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { Card } from '@sds/ui';

<Card>
  <p>Your content goes here</p>
</Card>`,
        description: 'Simple card container with default hover effects',
      },
      {
        title: 'Glass Variant',
        code: `<Card variant="glass" className="p-6">
  <h3 className="text-lg font-semibold mb-2">Glass Card</h3>
  <p className="text-muted-foreground">
    This card uses backdrop-blur and semi-transparent background.
  </p>
</Card>`,
        description: 'Using the glass variant for premium visuals',
      },
      {
        title: 'Interactive Card Grid',
        code: `<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {features.map((feature) => (
    <Card
      key={feature.id}
      hoverEffect={true}
      className="p-6 cursor-pointer"
      onClick={() => handleFeatureClick(feature.id)}
    >
      <h3 className="font-semibold mb-2">{feature.title}</h3>
      <p className="text-sm text-muted-foreground">
        {feature.description}
      </p>
    </Card>
  ))}
</div>`,
        description: 'Grid of interactive cards with click handlers',
      },
      {
        title: 'Structured Content',
        code: `import { Card, CardHeader, CardTitle, CardContent } from '@sds/ui';

<Card>
  <CardHeader>
    <CardTitle>Notifications</CardTitle>
  </CardHeader>
  <CardContent>
    You have 3 unread messages.
  </CardContent>
</Card>`,
        description: 'Using subcomponents for structured layout',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/design-system/atoms/Card/Card.tsx',
  },

  Dialog: {
    component: Dialog,
    description: 'A modal dialog that interrupts the user with important content and expects a response. Replaces the legacy Modal component with Radix UI primitives for enhanced accessibility.',
    props: {
      open: {
        type: 'boolean',
        default: false,
        description: 'Controls the open state of the dialog',
      },
    },
    examples: [
      {
        label: 'Basic Dialog',
        props: {},
        children: (
          <>
            <DialogTrigger asChild>
              <Button variant="outline">Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button variant="destructive">Delete Account</Button>
              </DialogFooter>
            </DialogContent>
          </>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@sds/ui';

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>
        Dialog description goes here.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>`,
        description: 'Simple dialog with trigger button',
      },
      {
        title: 'Confirmation Dialog',
        code: `import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Button } from '@sds/ui';

<Dialog>
  <DialogTrigger asChild>
    <Button variant="destructive">Delete Account</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your
        account and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button variant="destructive">Delete Account</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
        description: 'Confirmation dialog with footer actions',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/Dialog.tsx',
    accessibilityNotes: [
      'Built on Radix UI Dialog primitive with full ARIA support',
      'Focus automatically trapped within dialog when open',
      'Escape key closes the dialog',
      'Click outside closes the dialog',
      'Prevents scrolling of background content when open',
      'Properly announces to screen readers with role="dialog"',
    ],
  },

  Code: {
    component: Code,
    description: 'A semantic code wrapper with enhanced visual styling and automatic syntax highlighting. Features distinct treatments for inline (pale amber background) vs block code (cool gray background with copy-on-hover). Accessible contrast ratios (WCAG AA 4.5:1).',
    props: {
      inline: {
        type: 'boolean',
        default: false,
        description: 'Render as inline code (true) or block code (false)',
      },
      showCopy: {
        type: 'boolean',
        default: true,
        description: 'Show copy button for block code (appears on hover)',
      },
    },
    examples: [
      { label: 'Plain Text', props: { syntax: 'plain', inline: true }, children: 'example' },
      { label: 'Keyword', props: { syntax: 'keyword', inline: true }, children: 'const' },
      { label: 'Function', props: { syntax: 'function', inline: true }, children: 'useState()' },
      { label: 'String', props: { syntax: 'string', inline: true }, children: '"Hello World"' },
      { label: 'Number', props: { syntax: 'number', inline: true }, children: '42' },
      { label: 'Boolean', props: { syntax: 'boolean', inline: true }, children: 'true' },
      { label: 'Property', props: { syntax: 'property', inline: true }, children: 'backgroundColor' },
      { label: 'Class Name', props: { syntax: 'className', inline: true }, children: 'MyComponent' },
      { label: 'Comment', props: { syntax: 'comment', inline: true }, children: '// This is a comment' },
      { label: 'Block Code', props: { syntax: 'plain', inline: false }, children: 'const greeting = "Hello World";\nconsole.log(greeting);' },
      { label: 'Block with Copy', props: { syntax: 'keyword', inline: false, showCopy: true }, children: 'import { useState } from "react";' },
      { label: 'Block No Copy', props: { syntax: 'string', inline: false, showCopy: false }, children: '"No copy button on this block"' },
    ],
    codeExamples: [
      {
        title: 'Inline Code',
        code: `import { Code } from '@ecosystem/design-system';

<p>
  Use the <Code syntax="keyword">useState</Code> hook to manage component state.
</p>`,
        description: 'Inline code for variables, functions, or keywords within text',
      },
      {
        title: 'Syntax Highlighting',
        code: `<p>
  The <Code syntax="function">map()</Code> method creates a new array with results
  of calling <Code syntax="keyword">function</Code> for every element.
</p>`,
        description: 'Different syntax highlighting for different code types',
      },
      {
        title: 'Block Code',
        code: `<Code inline={false} showCopy={true}>
  {(\`const greeting = "Hello World";
console.log(greeting);\`)}
</Code>`,
        description: 'Block code with copy button for multi-line snippets',
      },
      {
        title: 'Code in Documentation',
        code: `<div className="space-y-2">
  <p>Import the component:</p>
  <Code inline={false} syntax="keyword">
    import {{ Button }} from '@ecosystem/design-system';
  </Code>

  <p>Then use it with <Code syntax="property">variant</Code> prop.</p>
</div>`,
        description: 'Combining inline and block code in documentation',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/design-system/atoms/Code/Code.tsx',
  },

  Link: {
    component: Link,
    description: 'Theme-aware link component with multiple style variants. Supports standalone and inline text link styles with accessible focus states.',
    props: {
      variant: {
        type: 'select',
        options: ['default', 'inline'] as const,
        default: 'default',
        description: 'Visual style variant: default for standalone links with background hover, inline for underlined text links',
      },
      hoverEffect: {
        type: 'boolean',
        default: true,
        description: 'Enable hover effect (only applies to default variant)',
      },
    },
    examples: [
      {
        label: 'Default',
        props: { variant: 'default', href: '#' },
        children: 'Default Link',
      },
      {
        label: 'Default No Hover',
        props: { variant: 'default', hoverEffect: false, href: '#' },
        children: 'No Hover Effect',
      },
      {
        label: 'Inline',
        props: { variant: 'inline', href: '#' },
        children: 'Inline Link',
      },
      {
        label: 'Inline in Text',
        props: { variant: 'inline', href: '#' },
        children: (
          <span className="text-[var(--color-text-secondary)]">
            This is some text with an <Link variant="inline" href="#">inline link</Link> embedded in it.
          </span>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { Link } from '@ecosystem/design-system';

<Link href="/about">Learn More</Link>`,
        description: 'Simple link with default styling',
      },
      {
        title: 'Inline Text Links',
        code: `<p className="text-[var(--color-text-secondary)]">
  Check out our{' '}
  <Link variant="inline" href="/docs">
    documentation
  </Link>{' '}
  to learn more about the features.
</p>`,
        description: 'Links embedded within text paragraphs',
      },
      {
        title: 'External Links',
        code: `<Link
  href="https://github.com/your-repo"
  target="_blank"
  rel="noopener noreferrer"
>
  View on GitHub
</Link>`,
        description: 'Opening links in a new tab with security attributes',
      },
      {
        title: 'Navigation Menu',
        code: `<nav className="flex gap-4">
  {['Home', 'About', 'Services', 'Contact'].map((item) => (
    <Link
      key={item}
      href={\`/\${item.toLowerCase()}\`}
      variant="default"
    >
      {item}
    </Link>
  ))}
</nav>`,
        description: 'Using links in navigation menus',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/design-system/atoms/Link/Link.tsx',
  },

  Badge: {
    component: Badge,
    description: 'A small label for displaying status, counts, or categorization. Migrated to @sds/ui.',
    props: {
      variant: {
        type: 'select',
        options: ['default', 'secondary', 'destructive', 'outline', 'success', 'warning', 'error', 'info'] as const,
        default: 'default',
        description: 'Visual variant of the badge',
      },
      size: {
        type: 'select',
        options: ['sm', 'md', 'lg'] as const,
        default: 'md',
        description: 'Size of the badge',
      },
      dot: {
        type: 'boolean',
        default: false,
        description: 'Show animated dot indicator',
      },
    },
    examples: [
      { label: 'Default', props: { variant: 'default', size: 'md' }, children: 'Default' },
      { label: 'Secondary', props: { variant: 'secondary', size: 'md' }, children: 'Secondary' },
      { label: 'Destructive', props: { variant: 'destructive', size: 'md' }, children: 'Destructive' },
      { label: 'Outline', props: { variant: 'outline', size: 'md' }, children: 'Outline' },
      { label: 'Success', props: { variant: 'success', size: 'md', dot: true }, children: 'On track' },
      { label: 'Warning', props: { variant: 'warning', size: 'md', dot: true }, children: 'At risk' },
      { label: 'Error', props: { variant: 'error', size: 'md', dot: true }, children: 'Blocked' },
      { label: 'Info', props: { variant: 'info', size: 'md', dot: true }, children: 'In progress' },
    ],
    codeExamples: [
      {
        title: 'Status Badges',
        code: `import { Badge } from '@sds/ui';

<div className="flex gap-2">
  <Badge variant="success">Active</Badge>
  <Badge variant="warning">Pending</Badge>
  <Badge variant="error">Failed</Badge>
  <Badge variant="info">Info</Badge>
</div>`,
        description: 'Different status indicators using semantic color variants',
      },
      {
        title: 'Notification Counts',
        code: `<div className="flex items-center gap-2">
  <span>Inbox</span>
  <Badge variant="default" size="sm">99+</Badge>
</div>

<div className="flex items-center gap-2">
  <span>Notifications</span>
  <Badge variant="destructive" size="sm">3</Badge>
</div>`,
        description: 'Badge for displaying notification or message counts',
      },
      {
        title: 'Live Indicator',
        code: `<Badge variant="success" dot={true}>
  Live Stream
</Badge>`,
        description: 'Animated dot indicator for live or active states',
      },
      {
        title: 'Category Tags',
        code: `<div className="flex flex-wrap gap-2">
  {['React', 'TypeScript', 'TailwindCSS'].map((tag) => (
    <Badge key={tag} variant="secondary">
      {tag}
    </Badge>
  ))}
</div>`,
        description: 'Using badges as category or technology tags',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/Badge.tsx',
  },



  Spinner: {
    component: Spinner,
    description: 'A loading indicator with smooth animation that respects motion preferences.',
    props: {
      size: {
        type: 'select',
        options: ['xs', 'sm', 'md', 'lg', 'xl'] as const,
        default: 'md',
        description: 'Size of the spinner',
      },
      variant: {
        type: 'select',
        options: ['primary', 'secondary', 'inherit'] as const,
        default: 'primary',
        description: 'Color variant',
      },
    },
    examples: [
      { label: 'Default', props: { size: 'md', variant: 'primary' }, children: null },
      { label: 'Secondary', props: { size: 'md', variant: 'secondary' }, children: null },
      { label: 'Small', props: { size: 'sm', variant: 'primary' }, children: null },
      { label: 'Large', props: { size: 'lg', variant: 'primary' }, children: null },
    ],
    codeExamples: [
      {
        title: 'Basic Loading State',
        code: `import { Spinner } from '@ecosystem/design-system';

<div className="flex justify-center p-8">
  <Spinner />
</div>`,
        description: 'Simple centered loading spinner',
      },
      {
        title: 'Inline with Text',
        code: `<button disabled className="flex items-center gap-2">
  <Spinner size="sm" variant="inherit" />
  Loading...
</button>`,
        description: 'Small spinner inline with button text',
      },
      {
        title: 'Different Sizes',
        code: `<div className="flex items-center gap-4">
  <Spinner size="xs" />
  <Spinner size="sm" />
  <Spinner size="md" />
  <Spinner size="lg" />
  <Spinner size="xl" />
</div>`,
        description: 'Spinner in all available sizes',
      },
      {
        title: 'Loading Overlay',
        code: `<div className="relative min-h-[200px]">
  {isLoading && (
    <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-background)]/80 backdrop-blur-sm">
      <Spinner size="lg" />
    </div>
  )}
  <YourContent />
</div>`,
        description: 'Spinner as loading overlay for content area',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/design-system/atoms/Spinner/Spinner.tsx',
  },

  ProgressBar: {
    component: ProgressBar,
    description: 'A visual indicator of progress or completion with determinate and indeterminate modes.',
    props: {
      variant: {
        type: 'select',
        options: ['primary', 'success', 'warning', 'error', 'info'] as const,
        default: 'primary',
        description: 'Color variant',
      },
      size: {
        type: 'select',
        options: ['sm', 'md', 'lg'] as const,
        default: 'md',
        description: 'Size of the progress bar',
      },
      showLabel: {
        type: 'boolean',
        default: false,
        description: 'Show percentage label',
      },
    },
    examples: [
      { label: '25% Progress', props: { value: 25, variant: 'primary', size: 'md' }, children: null },
      { label: '50% with Label', props: { value: 50, variant: 'primary', size: 'md', showLabel: true }, children: null },
      { label: '75% Success', props: { value: 75, variant: 'success', size: 'md' }, children: null },
      { label: '100% Complete', props: { value: 100, variant: 'success', size: 'md', showLabel: true }, children: null },
      { label: 'Warning', props: { value: 40, variant: 'warning', size: 'md' }, children: null },
    ],
    codeExamples: [
      {
        title: 'Upload Progress',
        code: `import { ProgressBar } from '@ecosystem/design-system';

const [uploadProgress, setUploadProgress] = useState(0);

<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span>Uploading file.pdf</span>
    <span>{uploadProgress}%</span>
  </div>
  <ProgressBar value={uploadProgress} variant="default" showLabel={false} />
</div>`,
        description: 'Progress bar for file upload with custom label',
      },
      {
        title: 'Task Completion',
        code: `<div className="space-y-4">
  <div>
    <p className="text-sm mb-1">Profile Complete</p>
    <ProgressBar value={75} variant="success" showLabel={true} />
  </div>

  <div>
    <p className="text-sm mb-1">Storage Used</p>
    <ProgressBar value={85} variant="warning" showLabel={true} />
  </div>
</div>`,
        description: 'Multiple progress indicators with labels',
      },
      {
        title: 'Status Variants',
        code: `<div className="space-y-3">
  <ProgressBar value={100} variant="success" showLabel />
  <ProgressBar value={75} variant="info" showLabel />
  <ProgressBar value={50} variant="warning" showLabel />
  <ProgressBar value={25} variant="error" showLabel />
</div>`,
        description: 'Progress bars with semantic color variants',
      },
      {
        title: 'Dynamic Progress',
        code: `const [progress, setProgress] = useState(0);

useEffect(() => {
  const timer = setInterval(() => {
    setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
  }, 500);
  return () => clearInterval(timer);
}, []);

<ProgressBar value={progress} variant="default" showLabel />`,
        description: 'Animated progress bar that updates over time',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/design-system/atoms/ProgressBar/ProgressBar.tsx',
  },

  Switch: {
    component: Switch,
    description: 'A toggle switch control for binary state changes with smooth animations and theme-aware colors. Features accessible keyboard support and three size variants.',
    props: {
      checked: { type: 'boolean', default: false, description: 'Whether the switch is checked' },
      size: {
        type: 'select',
        options: ['sm', 'md', 'lg'] as const,
        default: 'md',
        description: 'Size variant - sm (w-8), md (w-11), lg (w-14)',
      },
      disabled: { type: 'boolean', default: false, description: 'When true, prevents interaction and shows disabled state' },
      label: { type: 'text', default: 'Label', description: 'Optional label displayed next to the switch' },
    },
    examples: [
      { label: 'Small', props: { size: 'sm', checked: false }, children: null },
      { label: 'Medium', props: { size: 'md', checked: true }, children: null },
      { label: 'Large', props: { size: 'lg', checked: true }, children: null },
      { label: 'Disabled', props: { disabled: true, checked: false }, children: null },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { Switch } from '@ecosystem/design-system';

const [enabled, setEnabled] = useState(false);

<Switch
  checked={enabled}
  onCheckedChange={setEnabled}
/>`,
        description: 'Controlled switch component'
      },
      {
        title: 'With Label',
        code: `import { Switch } from '@ecosystem/design-system';

const [darkMode, setDarkMode] = useState(false);

<label className="flex items-center gap-2 cursor-pointer">
  <Switch checked={darkMode} onCheckedChange={setDarkMode} />
  <span>Dark Mode</span>
</label>`,
        description: 'Switch with an associated label'
      },
      {
        title: 'Different Sizes',
        code: `import { Switch } from '@ecosystem/design-system';

<div className="flex items-center gap-4">
  <Switch size="sm" checked={true} onCheckedChange={() => {}} />
  <Switch size="md" checked={true} onCheckedChange={() => {}} />
  <Switch size="lg" checked={true} onCheckedChange={() => {}} />
</div>`,
        description: 'Switch in all available sizes'
      }
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/design-system/atoms/Switch/Switch.tsx',
  },

  Checkbox: {
    component: Checkbox,
    description: 'A control that allows the user to toggle between checked and not checked. Built on Radix UI.',
    props: {
      disabled: { type: 'boolean', default: false, description: 'When true, prevents interaction' },
    },
    examples: [
      { label: 'Default', props: {}, children: null },
      { label: 'Disabled', props: { disabled: true }, children: null },
    ],
    codeExamples: [
      {
        title: 'Terms and Conditions',
        code: `import { Checkbox, Label } from '@sds/ui';

<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>`,
        description: 'Checkbox with a label'
      }
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/Checkbox.tsx',
  },

  Select: {
    component: Select,
    description: 'Displays a list of options for the user to pick from—triggered by a button.',
    props: {},
    examples: [
      {
        label: 'Theme Params',
        props: {},
        children: (
          <>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </>
        )
      }
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@sds/ui';

<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Theme" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Light</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
    <SelectItem value="system">System</SelectItem>
  </SelectContent>
</Select>`,
        description: 'Basic select dropdown'
      }
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/Select.tsx',
  },

  Separator: {
    component: Separator,
    description: 'Visually or semantically separates content.',
    props: {
      orientation: {
        type: 'select',
        options: ['horizontal', 'vertical'] as const,
        default: 'horizontal',
        description: 'Orientation of the separator'
      }
    },
    examples: [
      {
        label: 'Horizontal',
        props: { orientation: 'horizontal' },
        children: (
          <div className="w-full">
            <div className="space-y-1">
              <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
              <p className="text-sm text-muted-foreground">
                An open-source UI component library.
              </p>
            </div>
            <Separator className="my-4" />
            <div className="flex h-5 items-center space-x-4 text-sm">
              <div>Blog</div>
              <Separator orientation="vertical" />
              <div>Docs</div>
              <Separator orientation="vertical" />
              <div>Source</div>
            </div>
          </div>
        )
      }
    ],
    codeExamples: [
      {
        title: 'Usage',
        code: `import { Separator } from '@sds/ui';

<div>
  <Separator orientation="vertical" />
</div>`,
        description: 'Basic usage'
      }
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/Separator.tsx',
  },

  ScrollArea: {
    component: ScrollArea,
    description: 'Augments native scroll functionality for custom, cross-browser styling.',
    props: {},
    examples: [
      {
        label: 'Default',
        props: {},
        children: (
          <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
            Jokester began sneaking into the castle in the middle of the night and leaving
            jokes all over the place: under the king's pillow, in his soup, even in the
            royal toilet. The king was furious, but he couldn't seem to stop Jokester. And
            then, one day, the people of the kingdom discovered the jokes. They laughed.
            They laughed so hard they cried. And then they realized that the king wasn't
            funny. He was actually quite boring. So, they decided to make Jokester the new
            king.
          </ScrollArea>
        )
      }
    ],
    codeExamples: [
      {
        title: 'Usage',
        code: `import { ScrollArea } from '@sds/ui';

<ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
  Content...
</ScrollArea>`,
        description: 'Scrollable area with custom scrollbar'
      }
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/ScrollArea.tsx',
  },

  Skeleton: {
    component: Skeleton,
    description: 'Placeholder component for loading states. Shows an animated pulse effect while content is loading.',
    props: {
      variant: {
        type: 'select',
        options: ['default', 'circular', 'rectangular', 'text'] as const,
        default: 'default',
        description: 'Shape variant of the skeleton',
      },
      width: {
        type: 'text',
        default: '100%',
        description: 'Width of the skeleton (CSS value)',
      },
      height: {
        type: 'text',
        default: '20px',
        description: 'Height of the skeleton (CSS value)',
      },
    },
    examples: [
      {
        label: 'Default',
        props: { variant: 'default', width: '200px', height: '20px' },
        children: null,
      },
      {
        label: 'Circular',
        props: { variant: 'circular', width: '40px', height: '40px' },
        children: null,
      },
      {
        label: 'Text Lines',
        props: { variant: 'text', width: '100%' },
        children: null,
      },
    ],
    codeExamples: [
      {
        title: 'Card Skeleton',
        code: `import { Skeleton } from '@sds/ui';

<div className="space-y-2">
  <Skeleton className="h-12 w-12 rounded-full" />
  <Skeleton className="h-4 w-[250px]" />
  <Skeleton className="h-4 w-[200px]" />
</div>`,
        description: 'Loading skeleton for a user card',
      },
      {
        title: 'List Skeleton',
        code: `import { Skeleton } from '@sds/ui';

<div className="space-y-3">
  {Array.from({ length: 5 }).map((_, i) => (
    <div key={i} className="flex items-center space-x-4">
      <Skeleton variant="circular" className="h-12 w-12" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ))}
</div>`,
        description: 'Loading skeleton for a list of items',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/Skeleton.tsx',
  },

  DropdownMenu: {
    component: DropdownMenu,
    description: 'Displays a menu of actions triggered by a button. Replaces the legacy Dropdown component with Radix UI primitives for enhanced accessibility and flexibility.',
    props: {
      open: {
        type: 'boolean',
        default: false,
        description: 'Controls the open state of the dropdown menu',
      },
    },
    examples: [
      {
        label: 'Basic Menu',
        props: {},
        children: (
          <>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Open Menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, Button } from '@sds/ui';

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>Open</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
        description: 'Simple dropdown menu with labeled sections',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/DropdownMenu.tsx',
    accessibilityNotes: [
      'Built on Radix UI DropdownMenu primitive with full ARIA support',
      'Keyboard navigation with arrow keys, Enter, and Escape',
      'Focus management and loop within menu items',
      'Screen reader accessible with proper roles and labels',
      'Supports typeahead to jump to menu items',
    ],
  },

  RadioGroup: {
    component: RadioGroup,
    description: 'A set of checkable buttons—known as radio buttons—where no more than one can be checked at a time. Built on Radix UI for accessibility.',
    props: {
      disabled: {
        type: 'boolean',
        default: false,
        description: 'When true, prevents interaction with all radio items',
      },
    },
    examples: [
      {
        label: 'Default',
        props: {},
        children: (
          <>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="default" id="r1" />
              <label htmlFor="r1">Default</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="comfortable" id="r2" />
              <label htmlFor="r2">Comfortable</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="compact" id="r3" />
              <label htmlFor="r3">Compact</label>
            </div>
          </>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { RadioGroup, RadioGroupItem } from '@sds/ui';

<RadioGroup defaultValue="option-one">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-one" id="option-one" />
    <label htmlFor="option-one">Option One</label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-two" id="option-two" />
    <label htmlFor="option-two">Option Two</label>
  </div>
</RadioGroup>`,
        description: 'Radio group with two options',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/RadioGroup.tsx',
    accessibilityNotes: [
      'Built on Radix UI RadioGroup primitive',
      'Keyboard navigation with arrow keys',
      'Proper radio group semantics with ARIA roles',
      'Screen reader accessible',
      'Focus management within group',
    ],
  },

  Sheet: {
    component: Sheet,
    description: 'Extends the Dialog component to display content that complements the main content of the screen. Slides in from top, right, bottom, or left.',
    props: {
      side: {
        type: 'select',
        options: ['top', 'right', 'bottom', 'left'] as const,
        default: 'right',
        description: 'The side from which the sheet slides in',
      },
    },
    examples: [
      {
        label: 'Right Side (Default)',
        props: {},
        children: (
          <>
            <SheetTrigger asChild>
              <Button variant="outline">Open Sheet</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Sheet Title</SheetTitle>
                <SheetDescription>
                  This is a sheet that slides in from the right side.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, Button } from '@sds/ui';

<Sheet>
  <SheetTrigger asChild>
    <Button>Open</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Title</SheetTitle>
      <SheetDescription>
        Description goes here.
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>`,
        description: 'Sheet that slides from the right (default)',
      },
      {
        title: 'Different Sides',
        code: `// Slide from left
<Sheet>
  <SheetTrigger asChild>
    <Button>Open from Left</Button>
  </SheetTrigger>
  <SheetContent side="left">
    <SheetHeader>
      <SheetTitle>Navigation</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>`,
        description: 'Sheet sliding from different sides',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/Sheet.tsx',
    accessibilityNotes: [
      'Built on Radix UI Dialog primitive (repurposed as sheet)',
      'Focus trap within sheet when open',
      'Escape key closes the sheet',
      'Click outside closes the sheet',
      'Prevents background scroll when open',
      'Proper ARIA roles and labels',
    ],
  },

  Table: {
    component: Table,
    description: 'A responsive table component for displaying tabular data with proper semantic HTML structure.',
    props: {},
    examples: [
      {
        label: 'Simple Table',
        props: {},
        children: (
          <>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>John Doe</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>$250.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Jane Smith</TableCell>
                <TableCell>Pending</TableCell>
                <TableCell>$150.00</TableCell>
              </TableRow>
            </TableBody>
          </>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@sds/ui';

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>john@example.com</TableCell>
      <TableCell>Active</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
        description: 'Simple table with header and body',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/Table.tsx',
    accessibilityNotes: [
      'Uses semantic HTML table elements',
      'Proper table structure with thead and tbody',
      'Responsive with horizontal scroll on overflow',
      'Screen reader accessible with table roles',
      'Clear visual distinction between headers and data',
    ],
  },

  Form: {
    component: Form,
    description: 'Building forms with React Hook Form and Zod. Provides composable components for building accessible forms with validation. Replaces the legacy Form component.',
    props: {},
    examples: [
      {
        label: 'Note',
        props: {},
        children: (
          <div className="text-sm text-muted-foreground p-4 border rounded">
            Form component requires react-hook-form and zod. See code examples for usage.
          </div>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Form',
        code: `import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@sds/ui"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@sds/ui"
import { Input } from "@sds/ui"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}`,
        description: 'Complete form with validation using react-hook-form and zod',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/Form.tsx',
    accessibilityNotes: [
      'Built on react-hook-form for accessibility',
      'Proper form field associations with labels',
      'Error messages announced to screen readers',
      'Keyboard navigation support',
      'Focus management on validation errors',
    ],
  },

  DataTable: {
    component: DataTable,
    description: 'Powerful data table with built-in sorting, filtering, and pagination using TanStack Table. Essential for dashboards and data display.',
    props: {},
    examples: [
      {
        label: 'Note',
        props: {},
        children: (
          <div className="text-sm text-muted-foreground p-4 border rounded">
            DataTable requires column definitions and data. See code examples for usage.
          </div>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Data Table',
        code: `import { DataTable } from "@sds/ui"
import { ColumnDef } from "@tanstack/react-table"

type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
]

const data: Payment[] = [
  {
    id: "1",
    amount: 100,
    status: "success",
    email: "user@example.com",
  },
  // ... more data
]

export function PaymentsTable() {
  return <DataTable columns={columns} data={data} />
}`,
        description: 'Data table with sorting and pagination',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/DataTable.tsx',
    accessibilityNotes: [
      'Built on TanStack Table with full accessibility support',
      'Keyboard navigation through table cells',
      'Sortable columns with keyboard activation',
      'Pagination controls are keyboard accessible',
      'Screen reader announces table structure and data',
    ],
  },

  Textarea: {
    component: Textarea,
    description: 'Multi-line text input field. Styled with SDS tokens.',
    props: {
      placeholder: {
        type: 'text',
        default: 'Type your message here.',
        description: 'Placeholder text',
      },
      disabled: {
        type: 'boolean',
        default: false,
        description: 'Disables the textarea',
      },
    },
    examples: [
      {
        label: 'Default',
        props: { placeholder: 'Type your message here.' },
        children: null,
      },
      {
        label: 'Disabled',
        props: { placeholder: 'Type your message here.', disabled: true },
        children: null,
      },
      {
        label: 'With Label',
        props: { placeholder: 'Type your message here.' },
        children: (
          <div className="grid w-full gap-1.5">
            <Label htmlFor="message">Your message</Label>
            <Textarea placeholder="Type your message here." id="message" />
          </div>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { Textarea } from "@sds/ui"

<Textarea placeholder="Type your message here." />`,
        description: 'Simple textarea',
      },
      {
        title: 'With Label',
        code: `import { Label } from "@sds/ui"
import { Textarea } from "@sds/ui"

<div className="grid w-full gap-1.5">
  <Label htmlFor="message">Your message</Label>
  <Textarea placeholder="Type your message here." id="message" />
</div>`,
        description: 'Textarea with a label',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/Textarea.tsx',
  },
  Combobox: {
    component: Combobox,
    description: 'Searchable dropdown component combining Command and Popover primitives. Perfect for forms with searchable select inputs.',
    props: {
      placeholder: {
        type: 'text',
        default: 'Select option...',
        description: 'Placeholder text for the trigger button',
      },
      disabled: {
        type: 'boolean',
        default: false,
        description: 'Disables the combobox',
      },
    },
    examples: [
      {
        label: 'Default',
        props: {
          options: [
            { value: 'react', label: 'React' },
            { value: 'vue', label: 'Vue' },
            { value: 'angular', label: 'Angular' },
            { value: 'svelte', label: 'Svelte' },
          ],
          placeholder: 'Select framework...',
        },
        children: null,
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { Combobox } from "@sds/ui"

const frameworks = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
]

<Combobox
  options={frameworks}
  placeholder="Select framework..."
  onValueChange={(value) => console.log(value)}
/>`,
        description: 'Searchable select with custom options',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/Combobox.tsx',
  },
  Command: {
    component: Command,
    description: 'Command menu component built with cmdk. Perfect for creating command palettes and searchable lists.',
    props: {},
    examples: [
      {
        label: 'Default',
        props: {},
        children: (
          <Command className="rounded-lg border shadow-md">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>Calendar</CommandItem>
                <CommandItem>Search Emoji</CommandItem>
                <CommandItem>Calculator</CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Settings">
                <CommandItem>Profile</CommandItem>
                <CommandItem>Billing</CommandItem>
                <CommandItem>Settings</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Command Menu',
        code: `import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@sds/ui"

<Command className="rounded-lg border shadow-md">
  <CommandInput placeholder="Type a command..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
      <CommandItem>Search Emoji</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`,
        description: 'Command palette with search and grouped items',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/Command.tsx',
  },
  Popover: {
    component: Popover,
    description: 'Floating content panel that appears near a trigger element. Built on Radix UI Popover primitive.',
    props: {},
    examples: [
      {
        label: 'Default',
        props: {},
        children: (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Open popover</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Dimensions</h4>
                  <p className="text-sm text-muted-foreground">
                    Set the dimensions for the layer.
                  </p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { Popover, PopoverContent, PopoverTrigger } from "@sds/ui"
import { Button } from "@sds/ui"

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open popover</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <div className="grid gap-4">
      <h4 className="font-medium">Popover Title</h4>
      <p className="text-sm text-muted-foreground">
        Popover content goes here.
      </p>
    </div>
  </PopoverContent>
</Popover>`,
        description: 'Popover with custom content',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/Popover.tsx',
  },
  Tabs: {
    component: Tabs,
    description: 'Tabbed interface for organizing content into multiple panels. Built on Radix UI Tabs primitive.',
    props: {
      defaultValue: {
        type: 'text',
        default: 'tab1',
        description: 'Default active tab value',
      },
    },
    examples: [
      {
        label: 'Default',
        props: { defaultValue: 'account' },
        children: (
          <Tabs defaultValue="account" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Card className="p-6">
                <p className="text-sm text-muted-foreground">
                  Make changes to your account here.
                </p>
              </Card>
            </TabsContent>
            <TabsContent value="password">
              <Card className="p-6">
                <p className="text-sm text-muted-foreground">
                  Change your password here.
                </p>
              </Card>
            </TabsContent>
          </Tabs>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Tabs',
        code: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@sds/ui"

<Tabs defaultValue="account" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    Make changes to your account here.
  </TabsContent>
  <TabsContent value="password">
    Change your password here.
  </TabsContent>
</Tabs>`,
        description: 'Basic tabbed interface',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/Tabs.tsx',
  },
  Toaster: {
    component: Toaster,
    description: 'Toast notification component powered by Sonner. Provides elegant, accessible toast notifications with better UX than traditional toasts.',
    props: {},
    examples: [
      {
        label: 'Usage',
        props: {},
        children: (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Add <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs">&lt;Toaster /&gt;</code> to your root layout, then use the <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs">toast()</code> function from the sonner package.
            </p>
            <Button
              onClick={() => {
                // Example - in actual use: import { toast } from 'sonner'
                console.log('Toast would appear here')
              }}
            >
              Show Toast
            </Button>
          </div>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Setup',
        code: `// Add to your root layout
import { Toaster } from "@sds/ui"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}`,
        description: 'Add Toaster to root layout',
      },
      {
        title: 'Usage',
        code: `import { toast } from "sonner"

// Show a toast
toast("Event has been created")

// Success toast
toast.success("Profile updated")

// Error toast
toast.error("Something went wrong")

// With action
toast("Event created", {
  action: {
    label: "Undo",
    onClick: () => console.log("Undo"),
  },
})`,
        description: 'Using toast notifications',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/Sonner.tsx',
  },
};
