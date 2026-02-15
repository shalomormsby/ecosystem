/**
 * Component Registry for Sage UI
 *
 * This registry contains metadata for all 92 components in @thesage/ui,
 * organized into 7 core functional categories plus 4 specialty categories.
 *
 * Core Categories (7):
 * - actions: Interactive elements that trigger behaviors
 * - forms: Input controls for data collection
 * - navigation: Moving through content and hierarchy
 * - overlays: Contextual content above main UI
 * - feedback: Communicating system state
 * - data-display: Presenting information in structured formats
 * - layout: Spatial organization and structural elements
 *
 * Specialty Categories (4):
 * - backgrounds: Animated background effects
 * - cursor: Custom cursor effects
 * - motion: Animation components
 * - blocks: Composed page sections
 */

export interface PropInfo {
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

export interface ComponentMetadata {
  name: string;
  category: string;
  description: string;
  keywords: string[];
  useCases: string[];
  dependencies: string[];
  radixPrimitive?: string;
  props?: Record<string, PropInfo>;
  subComponents?: string[];
  example?: string;
}

export const COMPONENT_CATEGORIES = {
  actions: {
    label: 'Actions',
    description: 'Interactive elements that trigger behaviors',
    count: 5,
  },
  forms: {
    label: 'Forms',
    description: 'Input controls for data collection',
    count: 18,
  },
  navigation: {
    label: 'Navigation',
    description: 'Moving through content and hierarchy',
    count: 10,
  },
  overlays: {
    label: 'Overlays',
    description: 'Contextual content that appears above the main UI',
    count: 11,
  },
  feedback: {
    label: 'Feedback',
    description: 'Communicating system state and user action results',
    count: 7,
  },
  'data-display': {
    label: 'Data Display',
    description: 'Presenting information in structured formats',
    count: 16,
  },
  layout: {
    label: 'Layout',
    description: 'Spatial organization and structural elements',
    count: 17,
  },
  backgrounds: {
    label: 'Backgrounds',
    description: 'Animated background effects and decorative elements',
    count: 3,
  },
  cursor: {
    label: 'Cursor',
    description: 'Custom cursor effects and interactions',
    count: 2,
  },
  motion: {
    label: 'Motion',
    description: 'Animation components and motion effects',
    count: 1,
  },
  blocks: {
    label: 'Blocks',
    description: 'Composed page sections and layouts',
    count: 2,
  },
} as const;

export const COMPONENT_REGISTRY: Record<string, ComponentMetadata> = {
  // ============================================================================
  // ACTIONS (3)
  // ============================================================================
  button: {
    name: 'Button',
    category: 'actions',
    description: 'Primary interaction element with multiple variants for different use cases',
    keywords: ['button', 'click', 'action', 'submit', 'cta', 'interactive'],
    useCases: [
      'Form submission',
      'Navigation triggers',
      'Action confirmation',
      'Call-to-action elements',
    ],
    dependencies: ['@radix-ui/react-slot'],
    radixPrimitive: '@radix-ui/react-slot',
    props: {
      variant: { type: "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'", default: "'default'", description: 'Visual style variant' },
      size: { type: "'sm' | 'default' | 'lg' | 'icon'", default: "'default'", description: 'Size variant' },
      disabled: { type: 'boolean', default: 'false', description: 'Disable interaction' },
      asChild: { type: 'boolean', default: 'false', description: 'Render as child element via Radix Slot' },
    },
    example: `<Button variant="outline" size="sm" onClick={handleClick}>Click Me</Button>`,
  },
  toggle: {
    name: 'Toggle',
    category: 'actions',
    description: 'Binary state toggle with pressed/unpressed states',
    keywords: ['toggle', 'switch', 'binary', 'on-off', 'state'],
    useCases: [
      'Toolbar buttons',
      'Feature toggles',
      'View mode switches',
      'Filter activation',
    ],
    dependencies: ['@radix-ui/react-toggle'],
    radixPrimitive: '@radix-ui/react-toggle',
    props: {
      pressed: { type: 'boolean', description: 'Controlled pressed state' },
      onPressedChange: { type: '(pressed: boolean) => void', description: 'Callback on press change' },
      variant: { type: "'default' | 'outline'", default: "'default'", description: 'Visual variant' },
      size: { type: "'sm' | 'default' | 'lg'", default: "'default'", description: 'Size variant' },
      disabled: { type: 'boolean', default: 'false', description: 'Disable interaction' },
    },
    example: `<Toggle pressed={isBold} onPressedChange={setIsBold}><Bold className="h-4 w-4" /></Toggle>`,
  },
  'toggle-group': {
    name: 'ToggleGroup',
    category: 'actions',
    description: 'Multiple toggles with single or multi-select modes',
    keywords: ['toggle', 'group', 'selection', 'multi-select', 'options'],
    useCases: [
      'Text formatting toolbars',
      'View mode selection',
      'Filter groups',
      'Option selection',
    ],
    dependencies: ['@radix-ui/react-toggle-group'],
    radixPrimitive: '@radix-ui/react-toggle-group',
    props: {
      type: { type: "'single' | 'multiple'", description: 'Selection mode', required: true },
      value: { type: 'string | string[]', description: 'Selected value(s)' },
      onValueChange: { type: '(value) => void', description: 'Callback on value change' },
      variant: { type: "'default' | 'outline'", default: "'default'", description: 'Visual variant' },
      size: { type: "'sm' | 'default' | 'lg'", default: "'default'", description: 'Size variant' },
    },
    subComponents: ['ToggleGroupItem'],
    example: `<ToggleGroup type="single" value={align} onValueChange={setAlign}>\n  <ToggleGroupItem value="left">Left</ToggleGroupItem>\n  <ToggleGroupItem value="center">Center</ToggleGroupItem>\n</ToggleGroup>`,
  },

  // ============================================================================
  // FORMS (11)
  // ============================================================================
  checkbox: {
    name: 'Checkbox',
    category: 'forms',
    description: 'Boolean selection control for single or grouped choices',
    keywords: ['checkbox', 'selection', 'boolean', 'multi-select', 'form'],
    useCases: [
      'Multi-select options',
      'Terms acceptance',
      'Feature preferences',
      'Bulk actions',
    ],
    dependencies: ['@radix-ui/react-checkbox'],
    radixPrimitive: '@radix-ui/react-checkbox',
    props: {
      checked: { type: "boolean | 'indeterminate'", description: 'Checked state' },
      onCheckedChange: { type: '(checked: boolean) => void', description: 'Callback on check change' },
      disabled: { type: 'boolean', default: 'false', description: 'Disable interaction' },
    },
    example: `<div className="flex items-center gap-2">\n  <Checkbox id="terms" checked={accepted} onCheckedChange={setAccepted} />\n  <Label htmlFor="terms">Accept terms</Label>\n</div>`,
  },
  combobox: {
    name: 'Combobox',
    category: 'forms',
    description: 'Searchable select component with autocomplete functionality',
    keywords: ['combobox', 'autocomplete', 'search', 'select', 'dropdown', 'filter'],
    useCases: [
      'Country/state selection',
      'Tag selection',
      'User mention',
      'Large option lists',
    ],
    dependencies: ['cmdk', '@radix-ui/react-popover'],
    radixPrimitive: '@radix-ui/react-popover',
    props: {
      options: { type: '{ value: string; label: string }[]', description: 'List of options', required: true },
      value: { type: 'string', description: 'Selected value' },
      onValueChange: { type: '(value: string) => void', description: 'Callback on selection' },
      placeholder: { type: 'string', description: 'Trigger placeholder text' },
      searchPlaceholder: { type: 'string', description: 'Search input placeholder' },
      emptyText: { type: 'string', description: 'Text when no results found' },
    },
    example: `<Combobox\n  options={[{ value: 'react', label: 'React' }, { value: 'vue', label: 'Vue' }]}\n  value={framework}\n  onValueChange={setFramework}\n  placeholder="Select framework"\n/>`,
  },
  form: {
    name: 'Form',
    category: 'forms',
    description: 'Form wrapper with react-hook-form and zod validation integration',
    keywords: ['form', 'validation', 'zod', 'react-hook-form', 'schema'],
    useCases: [
      'User registration',
      'Settings forms',
      'Data entry',
      'Multi-step forms',
    ],
    dependencies: ['react-hook-form', '@hookform/resolvers', 'zod'],
    props: {
      '...form': { type: 'UseFormReturn', description: 'Spread react-hook-form useForm() return value', required: true },
    },
    subComponents: ['FormControl', 'FormDescription', 'FormField', 'FormItem', 'FormLabel', 'FormMessage'],
    example: `<Form {...form}>\n  <form onSubmit={form.handleSubmit(onSubmit)}>\n    <FormField control={form.control} name="email" render={({ field }) => (\n      <FormItem>\n        <FormLabel>Email</FormLabel>\n        <FormControl><Input {...field} /></FormControl>\n        <FormMessage />\n      </FormItem>\n    )} />\n    <Button type="submit">Submit</Button>\n  </form>\n</Form>`,
  },
  input: {
    name: 'Input',
    category: 'forms',
    description: 'Text input field supporting various types (text, email, password, number)',
    keywords: ['input', 'text', 'field', 'form', 'email', 'password'],
    useCases: [
      'Text entry',
      'Email addresses',
      'Passwords',
      'Numeric input',
    ],
    dependencies: [],
    props: {
      type: { type: 'string', default: "'text'", description: 'HTML input type' },
      placeholder: { type: 'string', description: 'Placeholder text' },
      disabled: { type: 'boolean', default: 'false', description: 'Disable interaction' },
    },
    example: `<Input type="email" placeholder="Enter email" />`,
  },
  'input-otp': {
    name: 'InputOTP',
    category: 'forms',
    description: 'One-time password input with individual character slots',
    keywords: ['otp', 'verification', 'security', 'authentication', '2fa', 'code'],
    useCases: [
      'Two-factor authentication',
      'Email verification',
      'Phone verification',
      'Security codes',
    ],
    dependencies: ['input-otp'],
    props: {
      maxLength: { type: 'number', default: '6', description: 'Maximum number of characters' },
      value: { type: 'string', description: 'Controlled input value' },
      onChange: { type: '(value: string) => void', description: 'Callback on value change' },
    },
    subComponents: ['InputOTPGroup', 'InputOTPSlot', 'InputOTPSeparator'],
    example: `<InputOTP maxLength={6}>\n  <InputOTPGroup>\n    <InputOTPSlot index={0} />\n    <InputOTPSlot index={1} />\n    <InputOTPSlot index={2} />\n  </InputOTPGroup>\n  <InputOTPSeparator />\n  <InputOTPGroup>\n    <InputOTPSlot index={3} />\n    <InputOTPSlot index={4} />\n    <InputOTPSlot index={5} />\n  </InputOTPGroup>\n</InputOTP>`,
  },
  label: {
    name: 'Label',
    category: 'forms',
    description: 'Form field labels with proper accessibility associations',
    keywords: ['label', 'form', 'accessibility', 'field-label'],
    useCases: [
      'Form field labels',
      'Input descriptions',
      'Accessible forms',
    ],
    dependencies: ['@radix-ui/react-label'],
    radixPrimitive: '@radix-ui/react-label',
    props: {
      htmlFor: { type: 'string', description: 'ID of the associated form control' },
    },
    example: `<Label htmlFor="email">Email Address</Label>\n<Input id="email" type="email" />`,
  },
  'radio-group': {
    name: 'RadioGroup',
    category: 'forms',
    description: 'Exclusive selection control for choosing one option from multiple',
    keywords: ['radio', 'selection', 'exclusive', 'single-select', 'options'],
    useCases: [
      'Single option selection',
      'Survey questions',
      'Payment methods',
      'Shipping options',
    ],
    dependencies: ['@radix-ui/react-radio-group'],
    radixPrimitive: '@radix-ui/react-radio-group',
    props: {
      value: { type: 'string', description: 'Controlled selected value' },
      onValueChange: { type: '(value: string) => void', description: 'Callback on selection' },
      disabled: { type: 'boolean', default: 'false', description: 'Disable interaction' },
    },
    subComponents: ['RadioGroupItem'],
    example: `<RadioGroup value={plan} onValueChange={setPlan}>\n  <div className="flex items-center gap-2">\n    <RadioGroupItem value="free" id="free" />\n    <Label htmlFor="free">Free</Label>\n  </div>\n</RadioGroup>`,
  },
  select: {
    name: 'Select',
    category: 'forms',
    description: 'Dropdown selection component for choosing from a list of options',
    keywords: ['select', 'dropdown', 'options', 'picker', 'choice'],
    useCases: [
      'Option selection',
      'Category filtering',
      'Settings choice',
      'Data sorting',
    ],
    dependencies: ['@radix-ui/react-select'],
    radixPrimitive: '@radix-ui/react-select',
    props: {
      value: { type: 'string', description: 'Controlled selected value' },
      onValueChange: { type: '(value: string) => void', description: 'Callback on selection' },
      defaultValue: { type: 'string', description: 'Default selected value' },
    },
    subComponents: ['SelectTrigger', 'SelectValue', 'SelectContent', 'SelectItem', 'SelectGroup', 'SelectLabel', 'SelectSeparator'],
    example: `<Select value={theme} onValueChange={setTheme}>\n  <SelectTrigger className="w-[180px]">\n    <SelectValue placeholder="Select theme" />\n  </SelectTrigger>\n  <SelectContent>\n    <SelectItem value="light">Light</SelectItem>\n    <SelectItem value="dark">Dark</SelectItem>\n  </SelectContent>\n</Select>`,
  },
  slider: {
    name: 'Slider',
    category: 'forms',
    description: 'Numeric input control via dragging for range selection',
    keywords: ['slider', 'range', 'numeric', 'volume', 'adjustment'],
    useCases: [
      'Volume control',
      'Price ranges',
      'Numeric settings',
      'Zoom level',
    ],
    dependencies: ['@radix-ui/react-slider'],
    radixPrimitive: '@radix-ui/react-slider',
    props: {
      value: { type: 'number[]', description: 'Current value(s)' },
      onValueChange: { type: '(value: number[]) => void', description: 'Callback on value change' },
      min: { type: 'number', default: '0', description: 'Minimum value' },
      max: { type: 'number', default: '100', description: 'Maximum value' },
      step: { type: 'number', default: '1', description: 'Step increment' },
      disabled: { type: 'boolean', default: 'false', description: 'Disable interaction' },
    },
    example: `<Slider value={[volume]} onValueChange={(v) => setVolume(v[0])} max={100} step={1} />`,
  },
  switch: {
    name: 'Switch',
    category: 'forms',
    description: 'Toggle switch for binary state changes in forms',
    keywords: ['switch', 'toggle', 'boolean', 'on-off', 'settings'],
    useCases: [
      'Feature toggles',
      'Notification settings',
      'Privacy options',
      'Mode switches',
    ],
    dependencies: ['@radix-ui/react-switch'],
    radixPrimitive: '@radix-ui/react-switch',
    props: {
      checked: { type: 'boolean', description: 'Controlled checked state' },
      onCheckedChange: { type: '(checked: boolean) => void', description: 'Callback on toggle' },
      size: { type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size variant' },
      disabled: { type: 'boolean', default: 'false', description: 'Disable interaction' },
      label: { type: 'string', description: 'Optional label text' },
    },
    example: `<Switch checked={enabled} onCheckedChange={setEnabled} size="md" />`,
  },
  textarea: {
    name: 'Textarea',
    category: 'forms',
    description: 'Multi-line text input for longer content',
    keywords: ['textarea', 'text', 'multiline', 'input', 'comment', 'description'],
    useCases: [
      'Comment fields',
      'Message composition',
      'Descriptions',
      'Long-form text',
    ],
    dependencies: [],
    props: {
      placeholder: { type: 'string', description: 'Placeholder text' },
      disabled: { type: 'boolean', default: 'false', description: 'Disable interaction' },
      rows: { type: 'number', description: 'Number of visible rows' },
    },
    example: `<Textarea placeholder="Write your message..." rows={4} />`,
  },

  // ============================================================================
  // NAVIGATION (6)
  // ============================================================================
  breadcrumb: {
    name: 'Breadcrumb',
    category: 'navigation',
    description: 'Hierarchical location indicator showing navigation path',
    keywords: ['breadcrumb', 'navigation', 'path', 'hierarchy', 'location'],
    useCases: [
      'Page hierarchy',
      'Multi-level navigation',
      'Location context',
      'Back navigation',
    ],
    dependencies: [],
    subComponents: ['BreadcrumbList', 'BreadcrumbItem', 'BreadcrumbLink', 'BreadcrumbPage', 'BreadcrumbSeparator', 'BreadcrumbEllipsis'],
    example: `<Breadcrumb>\n  <BreadcrumbList>\n    <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>\n    <BreadcrumbSeparator />\n    <BreadcrumbItem><BreadcrumbLink href="/docs">Docs</BreadcrumbLink></BreadcrumbItem>\n    <BreadcrumbSeparator />\n    <BreadcrumbItem><BreadcrumbPage>Current</BreadcrumbPage></BreadcrumbItem>\n  </BreadcrumbList>\n</Breadcrumb>`,
  },
  command: {
    name: 'Command',
    category: 'navigation',
    description: 'Command palette interface for searchable actions and navigation',
    keywords: ['command', 'palette', 'search', 'shortcuts', 'keyboard', 'cmdk'],
    useCases: [
      'Quick navigation',
      'Action search',
      'Keyboard shortcuts',
      'Power user features',
    ],
    dependencies: ['cmdk'],
    subComponents: ['CommandInput', 'CommandList', 'CommandEmpty', 'CommandGroup', 'CommandItem', 'CommandSeparator', 'CommandShortcut', 'CommandDialog'],
    example: `<Command>\n  <CommandInput placeholder="Type a command..." />\n  <CommandList>\n    <CommandEmpty>No results found.</CommandEmpty>\n    <CommandGroup heading="Actions">\n      <CommandItem>Search</CommandItem>\n      <CommandItem>Settings</CommandItem>\n    </CommandGroup>\n  </CommandList>\n</Command>`,
  },
  menubar: {
    name: 'Menubar',
    category: 'navigation',
    description: 'Desktop-style horizontal menu bar with dropdown menus',
    keywords: ['menubar', 'menu', 'navigation', 'desktop', 'toolbar'],
    useCases: [
      'Application menus',
      'Desktop-style navigation',
      'Action menus',
      'Editor toolbars',
    ],
    dependencies: ['@radix-ui/react-menubar'],
    radixPrimitive: '@radix-ui/react-menubar',
    subComponents: ['MenubarMenu', 'MenubarTrigger', 'MenubarContent', 'MenubarItem', 'MenubarSeparator', 'MenubarLabel', 'MenubarCheckboxItem', 'MenubarRadioGroup', 'MenubarRadioItem', 'MenubarSub', 'MenubarSubTrigger', 'MenubarSubContent', 'MenubarShortcut'],
    example: `<Menubar>\n  <MenubarMenu>\n    <MenubarTrigger>File</MenubarTrigger>\n    <MenubarContent>\n      <MenubarItem>New <MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>\n      <MenubarItem>Open <MenubarShortcut>⌘O</MenubarShortcut></MenubarItem>\n      <MenubarSeparator />\n      <MenubarItem>Exit</MenubarItem>\n    </MenubarContent>\n  </MenubarMenu>\n</Menubar>`,
  },
  'navigation-menu': {
    name: 'NavigationMenu',
    category: 'navigation',
    description: 'Complex header navigation with nested dropdown menus',
    keywords: ['navigation', 'menu', 'header', 'navbar', 'dropdown', 'mega-menu'],
    useCases: [
      'Site navigation',
      'Header menus',
      'Mega menus',
      'Multi-level navigation',
    ],
    dependencies: ['@radix-ui/react-navigation-menu'],
    radixPrimitive: '@radix-ui/react-navigation-menu',
    subComponents: ['NavigationMenuList', 'NavigationMenuItem', 'NavigationMenuTrigger', 'NavigationMenuContent', 'NavigationMenuLink', 'NavigationMenuIndicator', 'NavigationMenuViewport'],
    example: `<NavigationMenu>\n  <NavigationMenuList>\n    <NavigationMenuItem>\n      <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>\n      <NavigationMenuContent>\n        <NavigationMenuLink href="/docs">Documentation</NavigationMenuLink>\n      </NavigationMenuContent>\n    </NavigationMenuItem>\n  </NavigationMenuList>\n</NavigationMenu>`,
  },
  pagination: {
    name: 'Pagination',
    category: 'navigation',
    description: 'Multi-page navigation control for paginated content',
    keywords: ['pagination', 'pages', 'navigation', 'paging', 'next', 'previous'],
    useCases: [
      'Table pagination',
      'Search results',
      'Content lists',
      'Multi-page forms',
    ],
    dependencies: [],
    subComponents: ['PaginationContent', 'PaginationItem', 'PaginationLink', 'PaginationPrevious', 'PaginationNext', 'PaginationEllipsis'],
    example: `<Pagination>\n  <PaginationContent>\n    <PaginationItem><PaginationPrevious href="#" /></PaginationItem>\n    <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>\n    <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>\n    <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>\n    <PaginationItem><PaginationNext href="#" /></PaginationItem>\n  </PaginationContent>\n</Pagination>`,
  },
  tabs: {
    name: 'Tabs',
    category: 'navigation',
    description: 'Tabbed interface for organizing content into switchable panels',
    keywords: ['tabs', 'tabbed', 'navigation', 'panels', 'switching'],
    useCases: [
      'Settings panels',
      'Content organization',
      'Multi-view interfaces',
      'Dashboard sections',
    ],
    dependencies: ['@radix-ui/react-tabs'],
    radixPrimitive: '@radix-ui/react-tabs',
    props: {
      defaultValue: { type: 'string', description: 'Default active tab value' },
      value: { type: 'string', description: 'Controlled active tab value' },
      onValueChange: { type: '(value: string) => void', description: 'Callback on tab change' },
    },
    subComponents: ['TabsList', 'TabsTrigger', 'TabsContent'],
    example: `<Tabs defaultValue="account">\n  <TabsList>\n    <TabsTrigger value="account">Account</TabsTrigger>\n    <TabsTrigger value="password">Password</TabsTrigger>\n  </TabsList>\n  <TabsContent value="account">Account settings here.</TabsContent>\n  <TabsContent value="password">Password settings here.</TabsContent>\n</Tabs>`,
  },

  // ============================================================================
  // OVERLAYS (9)
  // ============================================================================
  'alert-dialog': {
    name: 'AlertDialog',
    category: 'overlays',
    description: 'Modal dialog for critical confirmations with cancel/confirm actions',
    keywords: ['alert', 'dialog', 'modal', 'confirmation', 'warning', 'destructive'],
    useCases: [
      'Delete confirmations',
      'Destructive actions',
      'Critical warnings',
      'Irreversible operations',
    ],
    dependencies: ['@radix-ui/react-alert-dialog'],
    radixPrimitive: '@radix-ui/react-alert-dialog',
    props: {
      open: { type: 'boolean', description: 'Controlled open state' },
      onOpenChange: { type: '(open: boolean) => void', description: 'Callback on open/close' },
    },
    subComponents: ['AlertDialogTrigger', 'AlertDialogContent', 'AlertDialogHeader', 'AlertDialogTitle', 'AlertDialogDescription', 'AlertDialogFooter', 'AlertDialogAction', 'AlertDialogCancel'],
    example: `<AlertDialog>\n  <AlertDialogTrigger asChild><Button variant="destructive">Delete</Button></AlertDialogTrigger>\n  <AlertDialogContent>\n    <AlertDialogHeader>\n      <AlertDialogTitle>Are you sure?</AlertDialogTitle>\n      <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>\n    </AlertDialogHeader>\n    <AlertDialogFooter>\n      <AlertDialogCancel>Cancel</AlertDialogCancel>\n      <AlertDialogAction>Delete</AlertDialogAction>\n    </AlertDialogFooter>\n  </AlertDialogContent>\n</AlertDialog>`,
  },
  'context-menu': {
    name: 'ContextMenu',
    category: 'overlays',
    description: 'Right-click context menu for contextual actions',
    keywords: ['context-menu', 'right-click', 'menu', 'actions', 'contextual'],
    useCases: [
      'Right-click actions',
      'Contextual operations',
      'File operations',
      'Item actions',
    ],
    dependencies: ['@radix-ui/react-context-menu'],
    radixPrimitive: '@radix-ui/react-context-menu',
    subComponents: ['ContextMenuTrigger', 'ContextMenuContent', 'ContextMenuItem', 'ContextMenuCheckboxItem', 'ContextMenuRadioItem', 'ContextMenuLabel', 'ContextMenuSeparator', 'ContextMenuShortcut', 'ContextMenuSub', 'ContextMenuSubTrigger', 'ContextMenuSubContent', 'ContextMenuRadioGroup'],
    example: `<ContextMenu>\n  <ContextMenuTrigger>Right click here</ContextMenuTrigger>\n  <ContextMenuContent>\n    <ContextMenuItem>Edit</ContextMenuItem>\n    <ContextMenuItem>Duplicate</ContextMenuItem>\n    <ContextMenuSeparator />\n    <ContextMenuItem>Delete</ContextMenuItem>\n  </ContextMenuContent>\n</ContextMenu>`,
  },
  dialog: {
    name: 'Dialog',
    category: 'overlays',
    description: 'Modal dialog for focused interactions and forms',
    keywords: ['dialog', 'modal', 'popup', 'overlay', 'form'],
    useCases: [
      'Form modals',
      'Detail views',
      'Focused tasks',
      'User input',
    ],
    dependencies: ['@radix-ui/react-dialog'],
    radixPrimitive: '@radix-ui/react-dialog',
    props: {
      open: { type: 'boolean', description: 'Controlled open state' },
      onOpenChange: { type: '(open: boolean) => void', description: 'Callback on open/close' },
    },
    subComponents: ['DialogTrigger', 'DialogContent', 'DialogHeader', 'DialogTitle', 'DialogDescription', 'DialogFooter', 'DialogClose'],
    example: `<Dialog>\n  <DialogTrigger asChild><Button>Open</Button></DialogTrigger>\n  <DialogContent>\n    <DialogHeader>\n      <DialogTitle>Title</DialogTitle>\n      <DialogDescription>Description here.</DialogDescription>\n    </DialogHeader>\n    <DialogFooter>\n      <Button variant="outline">Cancel</Button>\n      <Button>Confirm</Button>\n    </DialogFooter>\n  </DialogContent>\n</Dialog>`,
  },
  drawer: {
    name: 'Drawer',
    category: 'overlays',
    description: 'Mobile-friendly bottom drawer that slides up from screen bottom',
    keywords: ['drawer', 'bottom-sheet', 'mobile', 'slide-up', 'panel'],
    useCases: [
      'Mobile actions',
      'Mobile forms',
      'Bottom sheets',
      'Mobile menus',
    ],
    dependencies: ['vaul'],
    props: {
      open: { type: 'boolean', description: 'Controlled open state' },
      onOpenChange: { type: '(open: boolean) => void', description: 'Callback on open/close' },
    },
    subComponents: ['DrawerTrigger', 'DrawerContent', 'DrawerHeader', 'DrawerTitle', 'DrawerDescription', 'DrawerFooter', 'DrawerClose'],
    example: `<Drawer>\n  <DrawerTrigger asChild><Button>Open Drawer</Button></DrawerTrigger>\n  <DrawerContent>\n    <DrawerHeader>\n      <DrawerTitle>Settings</DrawerTitle>\n      <DrawerDescription>Adjust preferences.</DrawerDescription>\n    </DrawerHeader>\n    <div className="p-4">Content here.</div>\n    <DrawerFooter>\n      <Button>Save</Button>\n      <DrawerClose asChild><Button variant="outline">Cancel</Button></DrawerClose>\n    </DrawerFooter>\n  </DrawerContent>\n</Drawer>`,
  },
  'dropdown-menu': {
    name: 'DropdownMenu',
    category: 'overlays',
    description: 'Dropdown menu for actions and navigation options',
    keywords: ['dropdown', 'menu', 'actions', 'options', 'popover'],
    useCases: [
      'Action menus',
      'User menus',
      'Item options',
      'Overflow menus',
    ],
    dependencies: ['@radix-ui/react-dropdown-menu'],
    radixPrimitive: '@radix-ui/react-dropdown-menu',
    props: {
      open: { type: 'boolean', description: 'Controlled open state' },
      onOpenChange: { type: '(open: boolean) => void', description: 'Callback on open/close' },
    },
    subComponents: ['DropdownMenuTrigger', 'DropdownMenuContent', 'DropdownMenuItem', 'DropdownMenuLabel', 'DropdownMenuSeparator', 'DropdownMenuCheckboxItem', 'DropdownMenuRadioGroup', 'DropdownMenuRadioItem', 'DropdownMenuSub', 'DropdownMenuSubTrigger', 'DropdownMenuSubContent'],
    example: `<DropdownMenu>\n  <DropdownMenuTrigger asChild><Button variant="ghost">Options</Button></DropdownMenuTrigger>\n  <DropdownMenuContent>\n    <DropdownMenuLabel>Actions</DropdownMenuLabel>\n    <DropdownMenuSeparator />\n    <DropdownMenuItem>Edit</DropdownMenuItem>\n    <DropdownMenuItem>Delete</DropdownMenuItem>\n  </DropdownMenuContent>\n</DropdownMenu>`,
  },
  'hover-card': {
    name: 'HoverCard',
    category: 'overlays',
    description: 'Rich preview card that appears on hover',
    keywords: ['hover-card', 'preview', 'popover', 'tooltip', 'hover'],
    useCases: [
      'User previews',
      'Link previews',
      'Rich tooltips',
      'Additional context',
    ],
    dependencies: ['@radix-ui/react-hover-card'],
    radixPrimitive: '@radix-ui/react-hover-card',
    props: {
      openDelay: { type: 'number', default: '700', description: 'Delay in ms before opening' },
      closeDelay: { type: 'number', default: '300', description: 'Delay in ms before closing' },
    },
    subComponents: ['HoverCardTrigger', 'HoverCardContent'],
    example: `<HoverCard>\n  <HoverCardTrigger asChild><Link href="#">@username</Link></HoverCardTrigger>\n  <HoverCardContent className="w-80">\n    <div className="flex gap-4">\n      <Avatar />\n      <div><p className="text-sm font-semibold">Username</p><p className="text-sm text-muted-foreground">Bio here.</p></div>\n    </div>\n  </HoverCardContent>\n</HoverCard>`,
  },
  popover: {
    name: 'Popover',
    category: 'overlays',
    description: 'Floating content panel anchored to a trigger element',
    keywords: ['popover', 'floating', 'tooltip', 'overlay', 'panel'],
    useCases: [
      'Additional info',
      'Form helpers',
      'Contextual content',
      'Inline editors',
    ],
    dependencies: ['@radix-ui/react-popover'],
    radixPrimitive: '@radix-ui/react-popover',
    props: {
      open: { type: 'boolean', description: 'Controlled open state' },
      onOpenChange: { type: '(open: boolean) => void', description: 'Callback on open/close' },
    },
    subComponents: ['PopoverTrigger', 'PopoverContent', 'PopoverAnchor'],
    example: `<Popover>\n  <PopoverTrigger asChild><Button variant="outline">Open</Button></PopoverTrigger>\n  <PopoverContent className="w-80">Content here.</PopoverContent>\n</Popover>`,
  },
  sheet: {
    name: 'Sheet',
    category: 'overlays',
    description: 'Slide-in panel from screen edges for supplementary content',
    keywords: ['sheet', 'sidebar', 'slide-in', 'panel', 'drawer'],
    useCases: [
      'Mobile navigation',
      'Sidebar panels',
      'Settings panels',
      'Detail views',
    ],
    dependencies: ['@radix-ui/react-dialog'],
    radixPrimitive: '@radix-ui/react-dialog',
    props: {
      open: { type: 'boolean', description: 'Controlled open state' },
      onOpenChange: { type: '(open: boolean) => void', description: 'Callback on open/close' },
    },
    subComponents: ['SheetTrigger', 'SheetContent', 'SheetHeader', 'SheetTitle', 'SheetDescription', 'SheetClose'],
    example: `<Sheet>\n  <SheetTrigger asChild><Button>Open</Button></SheetTrigger>\n  <SheetContent side="right">\n    <SheetHeader><SheetTitle>Settings</SheetTitle></SheetHeader>\n    <div className="p-4">Content here.</div>\n  </SheetContent>\n</Sheet>`,
  },
  tooltip: {
    name: 'Tooltip',
    category: 'overlays',
    description: 'Contextual hints and additional information on hover',
    keywords: ['tooltip', 'hint', 'help', 'hover', 'info'],
    useCases: [
      'Icon explanations',
      'Additional context',
      'Help text',
      'Keyboard shortcuts',
    ],
    dependencies: ['@radix-ui/react-tooltip'],
    radixPrimitive: '@radix-ui/react-tooltip',
    subComponents: ['TooltipTrigger', 'TooltipContent', 'TooltipProvider'],
    example: `<Tooltip>\n  <TooltipTrigger asChild><Button variant="ghost" size="icon"><Info /></Button></TooltipTrigger>\n  <TooltipContent><p>Helpful information</p></TooltipContent>\n</Tooltip>`,
  },

  // ============================================================================
  // FEEDBACK (5)
  // ============================================================================
  alert: {
    name: 'Alert',
    category: 'feedback',
    description: 'Prominent message component for important information',
    keywords: ['alert', 'message', 'notification', 'warning', 'info', 'error', 'success'],
    useCases: [
      'Status messages',
      'Warnings',
      'Errors',
      'Success confirmations',
    ],
    dependencies: [],
    props: {
      variant: { type: "'default' | 'destructive'", default: "'default'", description: 'Visual variant' },
    },
    subComponents: ['AlertTitle', 'AlertDescription'],
    example: `<Alert variant="destructive">\n  <AlertTitle>Error</AlertTitle>\n  <AlertDescription>Your session has expired.</AlertDescription>\n</Alert>`,
  },
  progress: {
    name: 'Progress',
    category: 'feedback',
    description: 'Visual indicator for progress and completion status',
    keywords: ['progress', 'loading', 'bar', 'percentage', 'completion'],
    useCases: [
      'Upload progress',
      'Task completion',
      'Loading states',
      'Multi-step forms',
    ],
    dependencies: ['@radix-ui/react-progress'],
    radixPrimitive: '@radix-ui/react-progress',
    props: {
      value: { type: 'number', default: '0', description: 'Progress value (0-100)' },
      max: { type: 'number', default: '100', description: 'Maximum value' },
    },
    example: `<Progress value={60} />`,
  },
  skeleton: {
    name: 'Skeleton',
    category: 'feedback',
    description: 'Loading placeholder that mimics content structure',
    keywords: ['skeleton', 'loading', 'placeholder', 'shimmer', 'spinner'],
    useCases: [
      'Content loading',
      'Data fetching',
      'Initial load',
      'Lazy loading',
    ],
    dependencies: [],
    props: {
      variant: { type: "'default' | 'circular' | 'rectangular' | 'text'", default: "'default'", description: 'Shape variant' },
      width: { type: 'string', default: "'100%'", description: 'Width (CSS value)' },
      height: { type: 'string', default: "'20px'", description: 'Height (CSS value)' },
    },
    example: `<div className="space-y-2">\n  <Skeleton className="h-12 w-12 rounded-full" />\n  <Skeleton className="h-4 w-[250px]" />\n  <Skeleton className="h-4 w-[200px]" />\n</div>`,
  },
  sonner: {
    name: 'Sonner',
    category: 'feedback',
    description: 'Toast notification system with queuing and positioning. Use Toaster component in layout, call toast() to trigger.',
    keywords: ['toast', 'notification', 'sonner', 'message', 'alert'],
    useCases: [
      'Success messages',
      'Error notifications',
      'Action feedback',
      'System messages',
    ],
    dependencies: ['sonner'],
    subComponents: ['Toaster'],
    example: `// In layout: <Toaster />\n// To trigger:\nimport { toast } from 'sonner'\ntoast.success('Saved successfully')\ntoast.error('Something went wrong')\ntoast('Default notification')`,
  },
  toast: {
    name: 'Toast',
    category: 'feedback',
    description: 'Temporary notification messages that appear briefly',
    keywords: ['toast', 'notification', 'message', 'snackbar', 'alert'],
    useCases: [
      'Quick feedback',
      'Status updates',
      'Non-critical notifications',
      'Confirmation messages',
    ],
    dependencies: ['@radix-ui/react-toast'],
    radixPrimitive: '@radix-ui/react-toast',
    subComponents: ['ToastAction', 'ToastClose', 'ToastDescription', 'ToastProvider', 'ToastTitle', 'ToastViewport'],
    example: `// Prefer using Sonner (Toaster + toast()) for new projects.\n// This is the Radix-based alternative.\nimport { useToast } from '@thesage/ui'\nconst { toast } = useToast()\ntoast({ title: 'Success', description: 'Item saved.' })`,
  },

  // ============================================================================
  // DATA DISPLAY (6)
  // ============================================================================
  avatar: {
    name: 'Avatar',
    category: 'data-display',
    description: 'User profile image with fallback initials',
    keywords: ['avatar', 'profile', 'image', 'user', 'picture'],
    useCases: [
      'User profiles',
      'Comment authors',
      'Team members',
      'Chat participants',
    ],
    dependencies: ['@radix-ui/react-avatar'],
    radixPrimitive: '@radix-ui/react-avatar',
    subComponents: ['AvatarImage', 'AvatarFallback'],
    example: `<Avatar>\n  <AvatarImage src="/avatar.jpg" alt="User" />\n  <AvatarFallback>JD</AvatarFallback>\n</Avatar>`,
  },
  badge: {
    name: 'Badge',
    category: 'data-display',
    description: 'Status indicators and labels for categorization',
    keywords: ['badge', 'tag', 'label', 'status', 'chip', 'pill'],
    useCases: [
      'Status indicators',
      'Tags',
      'Categories',
      'Notification counts',
    ],
    dependencies: [],
    props: {
      variant: { type: "'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' | 'error' | 'info'", default: "'default'", description: 'Visual variant' },
      size: { type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size variant' },
      dot: { type: 'boolean', default: 'false', description: 'Show animated indicator dot' },
    },
    example: `<Badge variant="success" dot>Active</Badge>`,
  },
  calendar: {
    name: 'Calendar',
    category: 'data-display',
    description: 'Date selection calendar with month/year navigation',
    keywords: ['calendar', 'date', 'picker', 'month', 'day'],
    useCases: [
      'Date selection',
      'Event scheduling',
      'Booking systems',
      'Date ranges',
    ],
    dependencies: ['react-day-picker', 'date-fns'],
    props: {
      mode: { type: "'single' | 'multiple' | 'range'", default: "'single'", description: 'Selection mode' },
      selected: { type: 'Date | Date[] | DateRange', description: 'Selected date(s)' },
      onSelect: { type: '(date) => void', description: 'Callback on date selection' },
      showOutsideDays: { type: 'boolean', default: 'true', description: 'Show days from adjacent months' },
      disabled: { type: 'Matcher | Matcher[]', description: 'Dates to disable' },
    },
    example: `<Calendar mode="single" selected={date} onSelect={setDate} />`,
  },
  card: {
    name: 'Card',
    category: 'data-display',
    description: 'Container for grouping related content with optional header and footer',
    keywords: ['card', 'container', 'box', 'panel', 'content'],
    useCases: [
      'Content grouping',
      'Product cards',
      'Information panels',
      'Dashboard widgets',
    ],
    dependencies: [],
    props: {
      variant: { type: "'default' | 'glass' | 'outline'", default: "'default'", description: 'Visual variant' },
      hoverEffect: { type: 'boolean', default: 'false', description: 'Enable hover lift and shadow' },
    },
    subComponents: ['CardHeader', 'CardTitle', 'CardDescription', 'CardContent', 'CardFooter'],
    example: `<Card>\n  <CardHeader>\n    <CardTitle>Notifications</CardTitle>\n    <CardDescription>You have 3 unread messages.</CardDescription>\n  </CardHeader>\n  <CardContent><p>Content here.</p></CardContent>\n  <CardFooter><Button>View All</Button></CardFooter>\n</Card>`,
  },
  'data-table': {
    name: 'DataTable',
    category: 'data-display',
    description: 'Enhanced table with sorting, filtering, and pagination',
    keywords: ['table', 'data', 'grid', 'sorting', 'filtering', 'pagination', 'tanstack'],
    useCases: [
      'Data grids',
      'Admin tables',
      'Reports',
      'List management',
    ],
    dependencies: ['@tanstack/react-table'],
    props: {
      columns: { type: 'ColumnDef<TData, TValue>[]', description: 'Column definitions from @tanstack/react-table', required: true },
      data: { type: 'TData[]', description: 'Array of row data', required: true },
    },
    example: `import { DataTable } from '@thesage/ui/tables'\nconst columns = [\n  { accessorKey: 'name', header: 'Name' },\n  { accessorKey: 'email', header: 'Email' },\n]\n<DataTable columns={columns} data={users} />`,
  },
  table: {
    name: 'Table',
    category: 'data-display',
    description: 'Basic table component for tabular data display',
    keywords: ['table', 'data', 'rows', 'columns', 'grid'],
    useCases: [
      'Simple tables',
      'Data display',
      'Comparison tables',
      'Pricing tables',
    ],
    dependencies: [],
    subComponents: ['TableHeader', 'TableBody', 'TableFooter', 'TableRow', 'TableHead', 'TableCell', 'TableCaption'],
    example: `<Table>\n  <TableHeader>\n    <TableRow>\n      <TableHead>Name</TableHead>\n      <TableHead>Status</TableHead>\n    </TableRow>\n  </TableHeader>\n  <TableBody>\n    <TableRow>\n      <TableCell>John</TableCell>\n      <TableCell>Active</TableCell>\n    </TableRow>\n  </TableBody>\n</Table>`,
  },
  heading: {
    name: 'Heading',
    category: 'data-display',
    description: 'Semantic heading with automatic token-based styling and responsive sizes',
    keywords: ['heading', 'title', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'typography'],
    useCases: [
      'Page titles',
      'Section headings',
      'Content hierarchy',
      'Semantic HTML structure',
    ],
    dependencies: [],
    props: {
      level: { type: '1 | 2 | 3 | 4 | 5 | 6', default: '2', description: 'Heading level (renders h1-h6)' },
      as: { type: "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'", description: 'Override rendered HTML element' },
    },
    example: `<Heading level={1}>Page Title</Heading>\n<Heading level={2}>Section Title</Heading>`,
  },
  text: {
    name: 'Text',
    category: 'data-display',
    description: 'Semantic text component with variants for primary, secondary, and muted styles',
    keywords: ['text', 'paragraph', 'body', 'typography', 'content', 'p', 'span'],
    useCases: [
      'Body text',
      'Descriptions',
      'Helper text',
      'Labels and captions',
    ],
    dependencies: [],
    props: {
      variant: { type: "'default' | 'secondary' | 'muted' | 'lead'", default: "'default'", description: 'Text style variant' },
      as: { type: "'p' | 'span' | 'div'", default: "'p'", description: 'HTML element to render' },
      size: { type: "'sm' | 'base' | 'lg'", default: "'base'", description: 'Font size' },
    },
    example: `<Text variant="lead">Important introductory text.</Text>\n<Text variant="muted" size="sm">Helper text below an input.</Text>`,
  },
  code: {
    name: 'Code',
    category: 'data-display',
    description: 'Code display with syntax highlighting for inline and block code',
    keywords: ['code', 'syntax', 'highlighting', 'programming', 'snippet', 'pre'],
    useCases: [
      'Code snippets',
      'API documentation',
      'Technical content',
      'Inline code references',
    ],
    dependencies: [],
    props: {
      inline: { type: 'boolean', default: 'false', description: 'Render as inline code (true) or block (false)' },
      showCopy: { type: 'boolean', default: 'true', description: 'Show copy button for block code' },
    },
    example: `// Inline\n<Code inline>npm install @thesage/ui</Code>\n\n// Block\n<Code>{\`const x = 1;\nconst y = 2;\`}</Code>`,
  },
  'collapsible-code-block': {
    name: 'CollapsibleCodeBlock',
    category: 'data-display',
    description: 'Expandable code block with syntax highlighting, preview mode, and copy functionality',
    keywords: ['code', 'collapsible', 'expandable', 'syntax', 'copy', 'preview'],
    useCases: [
      'Long code examples',
      'Documentation code blocks',
      'Tutorial code snippets',
      'API examples',
    ],
    dependencies: ['@thesage/tokens'],
    props: {
      code: { type: 'string', description: 'Source code string', required: true },
      language: { type: "'tsx' | 'typescript' | 'javascript' | 'jsx' | 'css' | 'html' | 'json' | 'bash'", default: "'tsx'", description: 'Language for syntax highlighting' },
      title: { type: 'string', description: 'Optional title above the code block' },
      maxLines: { type: 'number', default: '10', description: 'Lines to show before collapsing' },
      defaultExpanded: { type: 'boolean', default: 'false', description: 'Start in expanded state' },
    },
    example: `<CollapsibleCodeBlock\n  code="const Button = () => <button>Click</button>"\n  language="tsx"\n  title="Button.tsx"\n  maxLines={5}\n/>`,
  },
  'description-list': {
    name: 'DescriptionList',
    category: 'data-display',
    description: 'Key-value pair list for displaying labeled data in row or column layout',
    keywords: ['description', 'list', 'key-value', 'definition', 'dl', 'dt', 'dd'],
    useCases: [
      'Product specifications',
      'User profile details',
      'Metadata display',
      'Settings summaries',
    ],
    dependencies: [],
    props: {
      items: { type: '{ label: string; value: ReactNode }[]', description: 'Array of label-value pairs', required: true },
      layout: { type: "'row' | 'column'", default: "'row'", description: 'Layout direction for label/value pairs' },
    },
    example: `<DescriptionList items={[\n  { label: 'Name', value: 'John Doe' },\n  { label: 'Email', value: 'john@example.com' },\n  { label: 'Role', value: <Badge>Admin</Badge> },\n]} />`,
  },

  // ============================================================================
  // LAYOUT (8)
  // ============================================================================
  accordion: {
    name: 'Accordion',
    category: 'layout',
    description: 'Collapsible content sections with expand/collapse functionality',
    keywords: ['accordion', 'collapsible', 'expandable', 'faq', 'sections'],
    useCases: [
      'FAQ sections',
      'Content organization',
      'Settings panels',
      'Information disclosure',
    ],
    dependencies: ['@radix-ui/react-accordion'],
    radixPrimitive: '@radix-ui/react-accordion',
    props: {
      type: { type: "'single' | 'multiple'", description: 'Allow single or multiple open items', required: true },
      collapsible: { type: 'boolean', default: 'false', description: 'Allow closing all items (type="single" only)' },
    },
    subComponents: ['AccordionItem', 'AccordionTrigger', 'AccordionContent'],
    example: `<Accordion type="single" collapsible>\n  <AccordionItem value="item-1">\n    <AccordionTrigger>Is it accessible?</AccordionTrigger>\n    <AccordionContent>Yes. It follows WAI-ARIA patterns.</AccordionContent>\n  </AccordionItem>\n</Accordion>`,
  },
  'aspect-ratio': {
    name: 'AspectRatio',
    category: 'layout',
    description: 'Container that maintains specific width-to-height ratio',
    keywords: ['aspect-ratio', 'ratio', 'responsive', 'media', 'image'],
    useCases: [
      'Responsive images',
      'Video embeds',
      'Media containers',
      'Card images',
    ],
    dependencies: ['@radix-ui/react-aspect-ratio'],
    radixPrimitive: '@radix-ui/react-aspect-ratio',
    props: {
      ratio: { type: 'number', default: '1', description: 'Aspect ratio as a number (e.g. 16/9)' },
    },
    example: `<AspectRatio ratio={16 / 9}>\n  <img src="/image.jpg" alt="Photo" className="rounded-md object-cover w-full h-full" />\n</AspectRatio>`,
  },
  carousel: {
    name: 'Carousel',
    category: 'layout',
    description: 'Scrollable content slider with navigation controls',
    keywords: ['carousel', 'slider', 'slideshow', 'gallery', 'swipe'],
    useCases: [
      'Image galleries',
      'Product showcases',
      'Content sliders',
      'Testimonials',
    ],
    dependencies: ['embla-carousel-react'],
    props: {
      orientation: { type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Scroll direction' },
      opts: { type: 'CarouselOptions', description: 'Embla Carousel options (loop, align, etc.)' },
      plugins: { type: 'CarouselPlugin', description: 'Embla Carousel plugins (autoplay, etc.)' },
      setApi: { type: '(api: CarouselApi) => void', description: 'Callback to get carousel API ref' },
    },
    subComponents: ['CarouselContent', 'CarouselItem', 'CarouselPrevious', 'CarouselNext'],
    example: `<Carousel>\n  <CarouselContent>\n    <CarouselItem>Slide 1</CarouselItem>\n    <CarouselItem>Slide 2</CarouselItem>\n    <CarouselItem>Slide 3</CarouselItem>\n  </CarouselContent>\n  <CarouselPrevious />\n  <CarouselNext />\n</Carousel>`,
  },
  collapsible: {
    name: 'Collapsible',
    category: 'layout',
    description: 'Simple show/hide content container',
    keywords: ['collapsible', 'expandable', 'toggle', 'show-hide', 'disclosure'],
    useCases: [
      'Sidebar sections',
      'Content reveals',
      'Advanced options',
      'Details disclosure',
    ],
    dependencies: ['@radix-ui/react-collapsible'],
    radixPrimitive: '@radix-ui/react-collapsible',
    props: {
      open: { type: 'boolean', description: 'Controlled open state' },
      onOpenChange: { type: '(open: boolean) => void', description: 'Callback on open/close' },
      defaultOpen: { type: 'boolean', default: 'false', description: 'Default open state' },
    },
    subComponents: ['CollapsibleTrigger', 'CollapsibleContent'],
    example: `<Collapsible>\n  <CollapsibleTrigger asChild><Button variant="ghost">Toggle</Button></CollapsibleTrigger>\n  <CollapsibleContent>\n    <p>Hidden content revealed on click.</p>\n  </CollapsibleContent>\n</Collapsible>`,
  },
  'date-picker': {
    name: 'DatePicker',
    category: 'layout',
    description: 'Calendar date picker combined with popover trigger',
    keywords: ['date-picker', 'calendar', 'date', 'popover', 'input'],
    useCases: [
      'Date selection',
      'Form dates',
      'Scheduling',
      'Filters',
    ],
    dependencies: ['react-day-picker', 'date-fns', '@radix-ui/react-popover'],
    props: {
      date: { type: 'Date', description: 'Selected date' },
      onDateChange: { type: '(date: Date | undefined) => void', description: 'Callback on date change' },
      placeholder: { type: 'string', default: "'Pick a date'", description: 'Placeholder text' },
      disabled: { type: 'boolean', default: 'false', description: 'Disable the date picker' },
    },
    example: `<DatePicker date={date} onDateChange={setDate} placeholder="Select date" />`,
  },
  resizable: {
    name: 'Resizable',
    category: 'layout',
    description: 'User-resizable panel containers with drag handles',
    keywords: ['resizable', 'panels', 'split', 'drag', 'resize'],
    useCases: [
      'Split views',
      'IDE panels',
      'Dashboard layouts',
      'Adjustable sidebars',
    ],
    dependencies: ['react-resizable-panels'],
    props: {
      direction: { type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Panel layout direction' },
    },
    subComponents: ['ResizablePanelGroup', 'ResizablePanel', 'ResizableHandle'],
    example: `<ResizablePanelGroup direction="horizontal">\n  <ResizablePanel defaultSize={50}>Left panel</ResizablePanel>\n  <ResizableHandle />\n  <ResizablePanel defaultSize={50}>Right panel</ResizablePanel>\n</ResizablePanelGroup>`,
  },
  'scroll-area': {
    name: 'ScrollArea',
    category: 'layout',
    description: 'Custom scrollbar styling for overflow content',
    keywords: ['scroll', 'scrollbar', 'overflow', 'custom-scroll'],
    useCases: [
      'Content overflow',
      'Scrollable lists',
      'Chat windows',
      'Code displays',
    ],
    dependencies: ['@radix-ui/react-scroll-area'],
    radixPrimitive: '@radix-ui/react-scroll-area',
    subComponents: ['ScrollBar'],
    example: `<ScrollArea className="h-[200px] w-full rounded-md border p-4">\n  <div>Long scrollable content here...</div>\n</ScrollArea>`,
  },
  separator: {
    name: 'Separator',
    category: 'layout',
    description: 'Visual divider for separating content sections',
    keywords: ['separator', 'divider', 'line', 'hr', 'border'],
    useCases: [
      'Content separation',
      'Menu dividers',
      'Section breaks',
      'Visual hierarchy',
    ],
    dependencies: ['@radix-ui/react-separator'],
    radixPrimitive: '@radix-ui/react-separator',
    props: {
      orientation: { type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Orientation' },
    },
    example: `<Separator orientation="horizontal" />`,
  },
  grid: {
    name: 'Grid',
    category: 'layout',
    description: 'Responsive CSS grid with column and gap configuration',
    keywords: ['grid', 'layout', 'columns', 'responsive', 'css-grid'],
    useCases: [
      'Card grids',
      'Gallery layouts',
      'Dashboard layouts',
      'Responsive content grids',
    ],
    dependencies: [],
    props: {
      columns: { type: 'number | { sm?: number; md?: number; lg?: number }', default: '3', description: 'Number of grid columns (responsive object supported)' },
      gap: { type: 'number | string', default: '4', description: 'Gap between grid items (Tailwind spacing scale)' },
    },
    example: `<Grid columns={{ sm: 1, md: 2, lg: 3 }} gap={4}>\n  <Card>Item 1</Card>\n  <Card>Item 2</Card>\n  <Card>Item 3</Card>\n</Grid>`,
  },
  container: {
    name: 'Container',
    category: 'layout',
    description: 'Content wrapper with consistent max-width and padding variants',
    keywords: ['container', 'wrapper', 'max-width', 'centered', 'layout'],
    useCases: [
      'Page content wrapper',
      'Centered layouts',
      'Responsive widths',
      'Content alignment',
    ],
    dependencies: [],
    props: {
      size: { type: "'sm' | 'md' | 'lg' | 'xl' | 'full'", default: "'lg'", description: 'Max-width variant' },
      padding: { type: 'boolean', default: 'true', description: 'Apply horizontal padding' },
    },
    example: `<Container size="lg">\n  <Heading level={1}>Page Title</Heading>\n  <Text>Content within max-width container.</Text>\n</Container>`,
  },
  stack: {
    name: 'Stack',
    category: 'layout',
    description: 'Flexbox layout for vertical or horizontal stacking with gap control',
    keywords: ['stack', 'flex', 'vertical', 'horizontal', 'spacing', 'layout'],
    useCases: [
      'Vertical layouts',
      'Horizontal layouts',
      'Form layouts',
      'Button groups',
    ],
    dependencies: [],
    props: {
      direction: { type: "'vertical' | 'horizontal'", default: "'vertical'", description: 'Stack direction' },
      gap: { type: 'number | string', default: '4', description: 'Gap between items (Tailwind spacing scale)' },
      align: { type: "'start' | 'center' | 'end' | 'stretch'", default: "'stretch'", description: 'Cross-axis alignment' },
      justify: { type: "'start' | 'center' | 'end' | 'between'", description: 'Main-axis alignment' },
    },
    example: `<Stack direction="horizontal" gap={2} align="center">\n  <Button>Save</Button>\n  <Button variant="outline">Cancel</Button>\n</Stack>`,
  },
  sidebar: {
    name: 'Sidebar',
    category: 'layout',
    description: 'Navigation sidebar with header, content, footer sections and mobile overlay',
    keywords: ['sidebar', 'navigation', 'panel', 'drawer', 'menu'],
    useCases: [
      'App navigation',
      'Dashboard sidebars',
      'Settings panels',
      'Mobile menus',
    ],
    dependencies: ['@radix-ui/react-slot'],
    radixPrimitive: '@radix-ui/react-slot',
    props: {
      isOpen: { type: 'boolean', default: 'true', description: 'Whether sidebar is visible/expanded' },
    },
    subComponents: ['SidebarHeader', 'SidebarContent', 'SidebarFooter', 'SidebarItem'],
    example: `<Sidebar>\n  <SidebarHeader><h2>My App</h2></SidebarHeader>\n  <SidebarContent>\n    <SidebarItem icon={<Home />} isActive>Dashboard</SidebarItem>\n    <SidebarItem icon={<Settings />}>Settings</SidebarItem>\n  </SidebarContent>\n  <SidebarFooter>\n    <SidebarItem icon={<LogOut />}>Logout</SidebarItem>\n  </SidebarFooter>\n</Sidebar>`,
  },
  header: {
    name: 'Header',
    category: 'layout',
    description: 'Page header with sticky positioning, glass morphism, and mobile menu',
    keywords: ['header', 'navbar', 'navigation', 'sticky', 'mobile-menu'],
    useCases: [
      'Site headers',
      'App navigation bars',
      'Sticky headers',
      'Mobile-friendly navigation',
    ],
    dependencies: ['lucide-react'],
    props: {
      logo: { type: 'ReactNode', description: 'Logo element for header' },
      links: { type: '{ label: string; href: string }[]', description: 'Navigation links' },
      sticky: { type: 'boolean', default: 'true', description: 'Stick to top on scroll' },
      transparent: { type: 'boolean', default: 'false', description: 'Transparent background (for hero sections)' },
    },
    example: `<Header\n  logo={<Brand />}\n  links={[\n    { label: 'Home', href: '/' },\n    { label: 'About', href: '/about' },\n  ]}\n/>`,
  },
  footer: {
    name: 'Footer',
    category: 'layout',
    description: 'Page footer with multi-column layout, social links, and copyright',
    keywords: ['footer', 'navigation', 'links', 'copyright', 'social'],
    useCases: [
      'Site footers',
      'Navigation sections',
      'Contact information',
      'Copyright notices',
    ],
    dependencies: [],
    props: {
      columns: { type: '{ title: string; links: { label: string; href: string }[] }[]', description: 'Footer navigation columns' },
      copyright: { type: 'string', description: 'Copyright text' },
      socialLinks: { type: '{ icon: ReactNode; href: string }[]', description: 'Social media links' },
    },
    example: `<Footer\n  columns={[{ title: 'Product', links: [{ label: 'Docs', href: '/docs' }] }]}\n  copyright="© 2026 My Company"\n/>`,
  },
  'customizer-panel': {
    name: 'CustomizerPanel',
    category: 'layout',
    description: 'Floating panel for theme, mode, and motion customization. Reads from ThemeProvider context.',
    keywords: ['customizer', 'theme', 'settings', 'preferences', 'dark-mode'],
    useCases: [
      'Theme selection',
      'Dark mode toggle',
      'Motion preferences',
      'User experience customization',
    ],
    dependencies: ['lucide-react', '@thesage/tokens'],
    example: `// Place in your layout. It reads theme state from ThemeProvider.\n<CustomizerPanel />`,
  },
  'page-layout': {
    name: 'PageLayout',
    category: 'layout',
    description: 'Flexible page layout with header, nav stacks, breadcrumbs, and footer',
    keywords: ['layout', 'page', 'template', 'structure', 'swiss-grid'],
    useCases: [
      'Page structure',
      'Content layouts',
      'Documentation pages',
      'Dashboard layouts',
    ],
    dependencies: [],
    props: {
      header: { type: 'ReactNode', description: 'Header element' },
      footer: { type: 'ReactNode', description: 'Footer element' },
      sidebar: { type: 'ReactNode', description: 'Optional sidebar' },
      breadcrumbs: { type: 'ReactNode', description: 'Breadcrumb navigation' },
    },
    example: `<PageLayout\n  header={<Header />}\n  footer={<Footer />}\n>\n  <main>Page content</main>\n</PageLayout>`,
  },
  'page-template': {
    name: 'PageTemplate',
    category: 'layout',
    description: 'Opinionated page template with Swiss Grid design and customizer',
    keywords: ['template', 'page', 'swiss-grid', 'layout', 'documentation'],
    useCases: [
      'Blog pages',
      'Documentation pages',
      'Standard app pages',
      'Content-focused layouts',
    ],
    dependencies: [],
    props: {
      title: { type: 'string', description: 'Page title' },
      description: { type: 'string', description: 'Page description' },
      showCustomizer: { type: 'boolean', default: 'true', description: 'Show customizer panel' },
    },
    example: `<PageTemplate title="Documentation" description="Learn the design system.">\n  <div>Content here.</div>\n</PageTemplate>`,
  },

  // ============================================================================
  // ACTIONS - Additional (2 more)
  // ============================================================================
  link: {
    name: 'Link',
    category: 'actions',
    description: 'Styled anchor element with theme-aware colors and hover states',
    keywords: ['link', 'anchor', 'href', 'navigation', 'a', 'url'],
    useCases: [
      'Text links',
      'Navigation links',
      'External references',
      'Inline actions',
    ],
    dependencies: [],
    props: {
      href: { type: 'string', description: 'Link URL', required: true },
      variant: { type: "'default' | 'inline'", default: "'default'", description: 'Default for standalone links, inline for text links' },
      hoverEffect: { type: 'boolean', default: 'true', description: 'Enable hover effect' },
    },
    example: `<Link href="/about" variant="inline">Learn More</Link>`,
  },
  magnetic: {
    name: 'Magnetic',
    category: 'actions',
    description: 'Magnetic hover effect that attracts elements toward cursor',
    keywords: ['magnetic', 'hover', 'effect', 'cursor', 'animation', 'interactive'],
    useCases: [
      'Interactive buttons',
      'Hover effects',
      'Playful interactions',
      'Cursor attraction',
    ],
    dependencies: ['framer-motion'],
    props: {
      children: { type: 'ReactNode', description: 'Element to apply magnetic effect to', required: true },
      strength: { type: 'number', default: '0.5', description: 'Magnetic pull strength (0-1)' },
    },
    example: `<Magnetic strength={0.5}>\n  <Button>Hover me</Button>\n</Magnetic>`,
  },

  // ============================================================================
  // FORMS - Additional (7 more)
  // ============================================================================
  'search-bar': {
    name: 'SearchBar',
    category: 'forms',
    description: 'Search input with icon, clear button, and keyboard shortcuts',
    keywords: ['search', 'input', 'find', 'query', 'filter', 'bar'],
    useCases: [
      'Site search',
      'Content filtering',
      'Command palette trigger',
      'Data filtering',
    ],
    dependencies: ['lucide-react'],
    props: {
      value: { type: 'string', description: 'Controlled search value' },
      onChange: { type: '(value: string) => void', description: 'Callback on value change' },
      placeholder: { type: 'string', default: "'Search...'", description: 'Placeholder text' },
      onClear: { type: '() => void', description: 'Callback on clear button click' },
    },
    example: `<SearchBar value={query} onChange={setQuery} placeholder="Search components..." />`,
  },
  'filter-button': {
    name: 'FilterButton',
    category: 'forms',
    description: 'Button for filtering content with active/inactive states',
    keywords: ['filter', 'button', 'toggle', 'category', 'selection'],
    useCases: [
      'Category filters',
      'Tag selection',
      'Content filtering',
      'Quick filters',
    ],
    dependencies: [],
    props: {
      active: { type: 'boolean', default: 'false', description: 'Whether filter is active' },
      onClick: { type: '() => void', description: 'Click handler' },
      children: { type: 'ReactNode', description: 'Filter label', required: true },
    },
    example: `<FilterButton active={category === 'all'} onClick={() => setCategory('all')}>All</FilterButton>`,
  },
  'theme-switcher': {
    name: 'ThemeSwitcher',
    category: 'forms',
    description: 'Multi-theme selector for switching between Studio, Terra, and Volt. Reads/writes to ThemeProvider context.',
    keywords: ['theme', 'switcher', 'selector', 'studio', 'terra', 'volt'],
    useCases: [
      'Theme selection',
      'Brand customization',
      'User preferences',
      'Design switching',
    ],
    dependencies: [],
    example: `// Reads from ThemeProvider context, no props needed.\n<ThemeSwitcher />`,
  },
  'theme-toggle': {
    name: 'ThemeToggle',
    category: 'forms',
    description: 'Light/dark mode toggle with smooth transitions. Reads/writes to ThemeProvider context.',
    keywords: ['theme', 'toggle', 'dark-mode', 'light-mode', 'mode'],
    useCases: [
      'Dark mode switch',
      'Light mode switch',
      'Theme mode control',
      'Accessibility preference',
    ],
    dependencies: ['lucide-react'],
    example: `// Reads from ThemeProvider context, no props needed.\n<ThemeToggle />`,
  },
  'color-picker': {
    name: 'ColorPicker',
    category: 'forms',
    description: 'Color selection input with preset swatches and custom color support',
    keywords: ['color', 'picker', 'palette', 'swatch', 'hex', 'customization'],
    useCases: [
      'Brand color selection',
      'Theme customization',
      'Design tools',
      'User preferences',
    ],
    dependencies: [],
    props: {
      value: { type: 'string', description: 'Selected color (hex string)' },
      onChange: { type: '(color: string) => void', description: 'Callback on color change' },
      presets: { type: 'string[]', description: 'Preset color swatches (hex values)' },
    },
    example: `<ColorPicker value={color} onChange={setColor} presets={['#ef4444', '#3b82f6', '#22c55e']} />`,
  },
  'drag-drop': {
    name: 'DragDrop',
    category: 'forms',
    description: 'Drag and drop file upload zone with preview support',
    keywords: ['drag', 'drop', 'upload', 'file', 'dropzone', 'input'],
    useCases: [
      'File uploads',
      'Image uploads',
      'Document uploads',
      'Bulk imports',
    ],
    dependencies: [],
    props: {
      onDrop: { type: '(files: File[]) => void', description: 'Callback when files are dropped', required: true },
      accept: { type: 'string', description: 'Accepted file types (e.g. "image/*")' },
      maxSize: { type: 'number', description: 'Max file size in bytes' },
      multiple: { type: 'boolean', default: 'true', description: 'Allow multiple files' },
    },
    example: `<DragDrop onDrop={(files) => handleUpload(files)} accept="image/*" maxSize={5242880} />`,
  },
  'text-field': {
    name: 'TextField',
    category: 'forms',
    description: 'Complete text input with label, helper text, and error states',
    keywords: ['text', 'field', 'input', 'label', 'form', 'validation'],
    useCases: [
      'Form fields',
      'Labeled inputs',
      'Validated inputs',
      'Complete form controls',
    ],
    dependencies: [],
    props: {
      label: { type: 'string', description: 'Field label text' },
      helperText: { type: 'string', description: 'Helper text below input' },
      error: { type: 'string', description: 'Error message (shows error state when set)' },
      required: { type: 'boolean', default: 'false', description: 'Mark as required' },
    },
    example: `<TextField label="Email" helperText="We'll never share your email." error={errors.email} required />`,
  },

  // ============================================================================
  // NAVIGATION - Additional (4 more)
  // ============================================================================
  'nav-link': {
    name: 'NavLink',
    category: 'navigation',
    description: 'Navigation link with active state indicators and variants',
    keywords: ['nav', 'link', 'navigation', 'active', 'menu', 'item'],
    useCases: [
      'Navigation menus',
      'Sidebar links',
      'Header navigation',
      'Active page indicators',
    ],
    dependencies: [],
    props: {
      href: { type: 'string', description: 'Link URL', required: true },
      isActive: { type: 'boolean', default: 'false', description: 'Active state indicator' },
      variant: { type: "'default' | 'subtle'", default: "'default'", description: 'Visual variant' },
    },
    example: `<NavLink href="/dashboard" isActive>Dashboard</NavLink>`,
  },
  'secondary-nav': {
    name: 'SecondaryNav',
    category: 'navigation',
    description: 'Horizontal secondary navigation bar for section switching',
    keywords: ['secondary', 'navigation', 'tabs', 'sections', 'subnav'],
    useCases: [
      'Section navigation',
      'Page subsections',
      'Tab-like navigation',
      'Category switching',
    ],
    dependencies: [],
    props: {
      items: { type: '{ label: string; href: string; isActive?: boolean }[]', description: 'Navigation items', required: true },
    },
    example: `<SecondaryNav items={[\n  { label: 'Overview', href: '/overview', isActive: true },\n  { label: 'Settings', href: '/settings' },\n]} />`,
  },
  'tertiary-nav': {
    name: 'TertiaryNav',
    category: 'navigation',
    description: 'Third-level navigation for deep content hierarchies',
    keywords: ['tertiary', 'navigation', 'deep', 'hierarchy', 'subnav'],
    useCases: [
      'Deep navigation',
      'Documentation sections',
      'Multi-level content',
      'Nested categories',
    ],
    dependencies: [],
    props: {
      items: { type: '{ label: string; href: string; isActive?: boolean }[]', description: 'Navigation items', required: true },
    },
    example: `<TertiaryNav items={[\n  { label: 'Props', href: '#props', isActive: true },\n  { label: 'Examples', href: '#examples' },\n]} />`,
  },
  breadcrumbs: {
    name: 'Breadcrumbs',
    category: 'navigation',
    description: 'Breadcrumb navigation with home icon and variants',
    keywords: ['breadcrumbs', 'navigation', 'path', 'trail', 'hierarchy'],
    useCases: [
      'Page location',
      'Navigation trail',
      'Hierarchical navigation',
      'Back navigation',
    ],
    dependencies: ['lucide-react'],
    props: {
      items: { type: '{ label: string; href?: string }[]', description: 'Breadcrumb trail items (last item is current page)', required: true },
      showHome: { type: 'boolean', default: 'true', description: 'Show home icon as first item' },
    },
    example: `<Breadcrumbs items={[\n  { label: 'Home', href: '/' },\n  { label: 'Components', href: '/components' },\n  { label: 'Button' },\n]} />`,
  },

  // ============================================================================
  // OVERLAYS - Additional (2 more)
  // ============================================================================
  modal: {
    name: 'Modal',
    category: 'overlays',
    description: 'Simple modal wrapper around Dialog with common patterns',
    keywords: ['modal', 'dialog', 'popup', 'overlay', 'window'],
    useCases: [
      'Simple modals',
      'Confirmation dialogs',
      'Form modals',
      'Content overlays',
    ],
    dependencies: ['@radix-ui/react-dialog'],
    radixPrimitive: '@radix-ui/react-dialog',
    props: {
      open: { type: 'boolean', description: 'Controlled open state' },
      onOpenChange: { type: '(open: boolean) => void', description: 'Callback on open/close' },
      title: { type: 'string', description: 'Modal title' },
      description: { type: 'string', description: 'Modal description' },
    },
    example: `<Modal open={isOpen} onOpenChange={setIsOpen} title="Confirm" description="Are you sure?">\n  <div className="flex gap-2 justify-end">\n    <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>\n    <Button onClick={handleConfirm}>Confirm</Button>\n  </div>\n</Modal>`,
  },
  dropdown: {
    name: 'Dropdown',
    category: 'overlays',
    description: 'Simple dropdown wrapper for common dropdown patterns',
    keywords: ['dropdown', 'menu', 'select', 'options', 'popover'],
    useCases: [
      'Action menus',
      'User menus',
      'Quick selections',
      'Option lists',
    ],
    dependencies: ['@radix-ui/react-dropdown-menu'],
    radixPrimitive: '@radix-ui/react-dropdown-menu',
    props: {
      open: { type: 'boolean', description: 'Controlled open state' },
      onOpenChange: { type: '(open: boolean) => void', description: 'Callback on open/close' },
    },
    example: `// For most cases, use DropdownMenu directly. This is a simplified wrapper.`,
  },

  // ============================================================================
  // FEEDBACK - Additional (2 more)
  // ============================================================================
  spinner: {
    name: 'Spinner',
    category: 'feedback',
    description: 'Animated loading spinner with size variants',
    keywords: ['spinner', 'loading', 'loader', 'progress', 'waiting'],
    useCases: [
      'Loading states',
      'Button loading',
      'Data fetching',
      'Async operations',
    ],
    dependencies: [],
    props: {
      size: { type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Spinner size' },
      variant: { type: "'primary' | 'secondary' | 'inherit'", default: "'primary'", description: 'Color variant' },
    },
    example: `<Spinner size="md" />\n<Button disabled><Spinner size="xs" variant="inherit" /> Loading...</Button>`,
  },
  'progress-bar': {
    name: 'ProgressBar',
    category: 'feedback',
    description: 'Horizontal progress bar with percentage display',
    keywords: ['progress', 'bar', 'loading', 'percentage', 'completion'],
    useCases: [
      'File uploads',
      'Task progress',
      'Loading indicators',
      'Step completion',
    ],
    dependencies: [],
    props: {
      value: { type: 'number', default: '0', description: 'Progress value (0-100)' },
      variant: { type: "'primary' | 'success' | 'warning' | 'error' | 'info'", default: "'primary'", description: 'Color variant' },
      size: { type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Bar height' },
      showLabel: { type: 'boolean', default: 'false', description: 'Show percentage label' },
    },
    example: `<ProgressBar value={75} variant="success" showLabel />`,
  },

  // ============================================================================
  // DATA DISPLAY - Additional (5 more)
  // ============================================================================
  brand: {
    name: 'Brand',
    category: 'data-display',
    description: 'Theme-aware brand/logo component with size variants and link support',
    keywords: ['brand', 'logo', 'identity', 'header', 'company'],
    useCases: [
      'Site logos',
      'Header branding',
      'Footer branding',
      'App identity',
    ],
    dependencies: [],
    props: {
      variant: { type: "'default' | 'mark'", default: "'default'", description: 'Full logo or mark only' },
      size: { type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Logo size' },
      href: { type: 'string', description: 'Optional link URL (wraps in anchor)' },
    },
    example: `<Brand size="md" href="/" />`,
  },
  'aspect-image': {
    name: 'AspectImage',
    category: 'data-display',
    description: 'Image with configurable aspect ratio, rounded corners, and captions',
    keywords: ['image', 'aspect', 'ratio', 'figure', 'caption', 'media'],
    useCases: [
      'Gallery images',
      'Article images',
      'Product images',
      'Thumbnails with captions',
    ],
    dependencies: [],
    props: {
      src: { type: 'string', description: 'Image source URL', required: true },
      alt: { type: 'string', description: 'Alt text for accessibility', required: true },
      ratio: { type: 'number', default: '16/9', description: 'Aspect ratio' },
      rounded: { type: "'none' | 'sm' | 'md' | 'lg' | 'full'", default: "'md'", description: 'Border radius' },
      caption: { type: 'string', description: 'Optional caption text below image' },
    },
    example: `<AspectImage src="/photo.jpg" alt="Team photo" ratio={4/3} caption="Our team" />`,
  },
  'variable-weight-text': {
    name: 'VariableWeightText',
    category: 'data-display',
    description: 'Animated text with breathing font-weight effect using variable fonts',
    keywords: ['variable', 'font', 'weight', 'animation', 'breathing', 'motion'],
    useCases: [
      'Hero text',
      'Emphasis text',
      'Attention grabbing',
      'Variable font showcase',
    ],
    dependencies: ['framer-motion'],
    props: {
      children: { type: 'string', description: 'Text content', required: true },
      speed: { type: 'number', default: '2', description: 'Animation speed in seconds' },
      minWeight: { type: 'number', default: '100', description: 'Minimum font weight' },
      maxWeight: { type: 'number', default: '900', description: 'Maximum font weight' },
    },
    example: `<VariableWeightText speed={2} minWeight={200} maxWeight={800}>Design</VariableWeightText>`,
  },
  typewriter: {
    name: 'Typewriter',
    category: 'data-display',
    description: 'Typewriter text animation with cursor and loop support',
    keywords: ['typewriter', 'typing', 'animation', 'cursor', 'text', 'effect'],
    useCases: [
      'Hero taglines',
      'Terminal effects',
      'Dynamic headings',
      'Attention text',
    ],
    dependencies: ['framer-motion'],
    props: {
      words: { type: 'string[]', description: 'Words to cycle through', required: true },
      speed: { type: 'number', default: '100', description: 'Typing speed in ms per character' },
      loop: { type: 'boolean', default: 'true', description: 'Loop through words continuously' },
      cursor: { type: 'boolean', default: 'true', description: 'Show blinking cursor' },
    },
    example: `<Typewriter words={['Developer', 'Designer', 'Creator']} speed={80} />`,
  },
  'github-icon': {
    name: 'GitHubIcon',
    category: 'data-display',
    description: 'GitHub logo icon that inherits text color for theme support',
    keywords: ['github', 'icon', 'social', 'logo', 'svg'],
    useCases: [
      'Social links',
      'Footer icons',
      'Repository links',
      'Open source badges',
    ],
    dependencies: [],
    props: {
      size: { type: 'number', default: '24', description: 'Icon size in pixels' },
    },
    example: `<a href="https://github.com/you"><GitHubIcon size={20} /></a>`,
  },

  // ============================================================================
  // SPECIALTY - Backgrounds (3)
  // ============================================================================
  'warp-background': {
    name: 'WarpBackground',
    category: 'backgrounds',
    description: 'Animated warp speed star field background effect',
    keywords: ['warp', 'stars', 'background', 'animation', 'space', 'effect'],
    useCases: [
      'Hero backgrounds',
      'Landing pages',
      'Loading screens',
      'Sci-fi themes',
    ],
    dependencies: ['framer-motion'],
    props: {
      speed: { type: 'number', default: '1', description: 'Warp speed multiplier' },
      density: { type: 'number', default: '200', description: 'Number of stars' },
      color: { type: 'string', default: "'white'", description: 'Star color' },
    },
    example: `<WarpBackground speed={1.5} density={300}>\n  <div className="relative z-10">Content over stars</div>\n</WarpBackground>`,
  },
  'faulty-terminal': {
    name: 'FaultyTerminal',
    category: 'backgrounds',
    description: 'Glitchy terminal background with flickering and scan lines',
    keywords: ['terminal', 'glitch', 'background', 'retro', 'crt', 'effect'],
    useCases: [
      'Retro themes',
      'Hacker aesthetics',
      'Error pages',
      'Terminal UIs',
    ],
    dependencies: [],
    props: {
      children: { type: 'ReactNode', description: 'Content to render inside terminal' },
    },
    example: `<FaultyTerminal>\n  <p>$ system initializing...</p>\n</FaultyTerminal>`,
  },
  'orb-background': {
    name: 'OrbBackground',
    category: 'backgrounds',
    description: 'Animated floating orb with gradient blur effect',
    keywords: ['orb', 'gradient', 'background', 'animation', 'blur', 'ambient'],
    useCases: [
      'Landing pages',
      'Hero sections',
      'Ambient backgrounds',
      'Modern aesthetics',
    ],
    dependencies: ['framer-motion'],
    props: {
      color: { type: 'string', description: 'Primary orb color' },
      size: { type: 'number', default: '400', description: 'Orb diameter in pixels' },
    },
    example: `<OrbBackground color="var(--color-primary)" size={500}>\n  <div className="relative z-10">Content</div>\n</OrbBackground>`,
  },

  // ============================================================================
  // SPECIALTY - Cursor (2)
  // ============================================================================
  'splash-cursor': {
    name: 'SplashCursor',
    category: 'cursor',
    description: 'Custom cursor with splash/ripple effect on click. WebGL-based fluid simulation.',
    keywords: ['cursor', 'splash', 'ripple', 'click', 'effect', 'interactive'],
    useCases: [
      'Interactive experiences',
      'Creative portfolios',
      'Playful interfaces',
      'Click feedback',
    ],
    dependencies: [],
    example: `// Place once in layout. Replaces default cursor globally.\n<SplashCursor />`,
  },
  'target-cursor': {
    name: 'TargetCursor',
    category: 'cursor',
    description: 'Custom cursor with target/crosshair appearance',
    keywords: ['cursor', 'target', 'crosshair', 'pointer', 'custom'],
    useCases: [
      'Gaming interfaces',
      'Precision tools',
      'Interactive elements',
      'Custom pointers',
    ],
    dependencies: [],
    example: `// Place once in layout. Replaces default cursor globally.\n<TargetCursor />`,
  },

  // ============================================================================
  // SPECIALTY - Motion (1)
  // ============================================================================
  'animated-beam': {
    name: 'AnimatedBeam',
    category: 'motion',
    description: 'Animated beam/line connecting two elements',
    keywords: ['beam', 'animation', 'connection', 'line', 'flow', 'motion'],
    useCases: [
      'Connecting elements',
      'Data flow visualization',
      'Architecture diagrams',
      'Interactive connections',
    ],
    dependencies: ['framer-motion'],
    props: {
      fromRef: { type: 'RefObject<HTMLElement>', description: 'Ref to source element', required: true },
      toRef: { type: 'RefObject<HTMLElement>', description: 'Ref to target element', required: true },
      duration: { type: 'number', default: '3', description: 'Animation duration in seconds' },
    },
    example: `const fromRef = useRef(null)\nconst toRef = useRef(null)\n<div ref={fromRef}>Source</div>\n<div ref={toRef}>Target</div>\n<AnimatedBeam fromRef={fromRef} toRef={toRef} />`,
  },

  // ============================================================================
  // SPECIALTY - Blocks (2)
  // ============================================================================
  hero: {
    name: 'Hero',
    category: 'blocks',
    description: 'Full-width hero section with title, subtitle, and CTA',
    keywords: ['hero', 'banner', 'header', 'landing', 'cta', 'section'],
    useCases: [
      'Landing pages',
      'Page headers',
      'Marketing sections',
      'Feature highlights',
    ],
    dependencies: [],
    props: {
      title: { type: 'string', description: 'Main heading text', required: true },
      subtitle: { type: 'string', description: 'Subtitle or tagline' },
      cta: { type: 'ReactNode', description: 'Call-to-action element (Button, etc.)' },
      background: { type: 'ReactNode', description: 'Optional background element (WarpBackground, OrbBackground, etc.)' },
    },
    example: `<Hero\n  title="Build Something Beautiful"\n  subtitle="A design system that brings joy."\n  cta={<Button size="lg">Get Started</Button>}\n/>`,
  },
  'open-graph-card': {
    name: 'OpenGraphCard',
    category: 'blocks',
    description: 'Social media preview card for Open Graph metadata. Use in opengraph-image.tsx.',
    keywords: ['open-graph', 'social', 'preview', 'card', 'meta', 'share'],
    useCases: [
      'Social sharing previews',
      'Link previews',
      'Meta card generation',
      'Marketing previews',
    ],
    dependencies: [],
    props: {
      title: { type: 'string', default: "'Sage Design Engine'", description: 'Main title text' },
      description: { type: 'string', description: 'Subtitle text' },
      variant: { type: "'primary' | 'secondary' | 'accent' | 'sage' | 'emerald' | 'gradient'", default: "'sage'", description: 'Visual style variant' },
      icon: { type: 'ReactNode', description: 'Custom logo or icon element' },
      gradient: { type: '{ type: string; angle: number; colors: string[] }', description: 'Custom gradient config (variant="gradient")' },
      primaryColor: { type: 'string', description: 'Override primary color (hex)' },
      secondaryColor: { type: 'string', description: 'Override secondary color (hex)' },
      accentColor: { type: 'string', description: 'Override accent color (hex)' },
    },
    example: `// In opengraph-image.tsx:\nexport default function OGImage() {\n  return <OpenGraphCard title="My Page" description="A great description" variant="primary" />\n}`,
  },
};

/**
 * Get all components by category
 */
export function getComponentsByCategory(category: string): ComponentMetadata[] {
  return Object.values(COMPONENT_REGISTRY).filter(
    (component) => component.category === category
  );
}

/**
 * Search components by keyword or description
 */
export function searchComponents(query: string): ComponentMetadata[] {
  const lowerQuery = query.toLowerCase();
  return Object.values(COMPONENT_REGISTRY).filter((component) => {
    return (
      component.name.toLowerCase().includes(lowerQuery) ||
      component.description.toLowerCase().includes(lowerQuery) ||
      component.keywords.some((keyword) => keyword.toLowerCase().includes(lowerQuery)) ||
      component.useCases.some((useCase) => useCase.toLowerCase().includes(lowerQuery))
    );
  });
}

/**
 * Get component by name (case-insensitive, accepts kebab-case or PascalCase)
 */
export function getComponent(name: string): ComponentMetadata | undefined {
  const kebabName = name.toLowerCase().replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  return COMPONENT_REGISTRY[kebabName];
}

/**
 * Get all component names
 */
export function getAllComponentNames(): string[] {
  return Object.keys(COMPONENT_REGISTRY);
}

/**
 * Get component count
 */
export function getComponentCount(): number {
  return Object.keys(COMPONENT_REGISTRY).length;
}
