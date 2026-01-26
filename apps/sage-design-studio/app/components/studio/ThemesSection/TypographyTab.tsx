'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Badge,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  Input,
  Label,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  DragDropList,
  DragDropHandle,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@sage/ui';
import { rectSortingStrategy } from '@dnd-kit/sortable';
import { useTheme } from '@sage/ui';
import { useCustomizer } from '@sage/ui';
import { SecondaryNav, type SecondaryNavItem } from '@sage/ui';
import { fontThemes, type FontThemeCategory } from '@sage/tokens';
import { getAllFontNames } from '../../../../lib/fonts-dynamic';
import {
  Check, MoreVertical, Edit, Trash2, Plus, Info,
  Briefcase, Palette, FileText, Code, Smile,
  Minimize, Crown, Sparkles, Gamepad2, LayoutGrid, Star, Settings
} from 'lucide-react';

interface TypographyTabProps {
  onNavigateToPlayground?: () => void;
}

const NAV_ITEMS: SecondaryNavItem[] = [
  { id: 'all', label: 'All', icon: <LayoutGrid className="w-4 h-4" /> },
  { id: 'custom', label: 'My Themes', icon: <Star className="w-4 h-4" /> },
  { id: 'professional', label: 'Professional', icon: <Briefcase className="w-4 h-4" /> },
  { id: 'editorial', label: 'Editorial', icon: <FileText className="w-4 h-4" /> },
  { id: 'tech', label: 'Tech', icon: <Code className="w-4 h-4" /> },
  { id: 'friendly', label: 'Friendly', icon: <Smile className="w-4 h-4" /> },
  { id: 'minimal', label: 'Minimal', icon: <Minimize className="w-4 h-4" /> },
  { id: 'luxury', label: 'Luxury', icon: <Crown className="w-4 h-4" /> },
  { id: 'creative', label: 'Creative', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'playful', label: 'Playful', icon: <Gamepad2 className="w-4 h-4" /> },
];

export function TypographyTab({ onNavigateToPlayground }: TypographyTabProps = {}) {
  const [selectedCategory, setSelectedCategory] = useState<FontThemeCategory | 'all' | 'custom'>('all');
  const [accessibleOnly, setAccessibleOnly] = useState(false);
  const [editingTheme, setEditingTheme] = useState<any>(null);
  const [deletingTheme, setDeletingTheme] = useState<any>(null);
  const [creatingTheme, setCreatingTheme] = useState(false);
  const [newThemeName, setNewThemeName] = useState('');
  const [newThemeDescription, setNewThemeDescription] = useState('');
  const [editedHeadingFont, setEditedHeadingFont] = useState('');
  const [editedBodyFont, setEditedBodyFont] = useState('');
  const [editedMonoFont, setEditedMonoFont] = useState('');
  const [localThemeOrder, setLocalThemeOrder] = useState<any[]>([]);

  const { theme, mode } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Use proper Zustand selectors for reactive state
  const applyFontTheme = useCustomizer(state => state.applyFontTheme);
  const resetCustomFonts = useCustomizer(state => state.resetCustomFonts);
  const deleteFontTheme = useCustomizer(state => state.deleteFontTheme);
  const updateFontTheme = useCustomizer(state => state.updateFontTheme);
  const saveFontTheme = useCustomizer(state => state.saveFontTheme);
  const reorderFontThemes = useCustomizer(state => state.reorderFontThemes);
  const savedFontThemes = useCustomizer(state => state.savedFontThemes);

  // Subscribe to entire customFontThemes object to ensure reactivity
  const customFontThemes = useCustomizer(state => state.customFontThemes);

  const currentFontTheme = customFontThemes?.[theme]?.[mode] || null;

  // Combine curated and saved font themes
  const allFontThemes = [
    ...fontThemes,
    ...savedFontThemes,
  ];

  // Initialize local theme order on mount or when source data changes
  useEffect(() => {
    setLocalThemeOrder(allFontThemes);
  }, [savedFontThemes.length]);

  if (!mounted) {
    return null;
  }

  // Use local order if available, otherwise use allFontThemes
  const displayThemes = localThemeOrder.length > 0 ? localThemeOrder : allFontThemes;

  const filteredThemes = displayThemes
    .filter(ft => selectedCategory === 'all' || ft.category === selectedCategory)
    .filter(ft => !accessibleOnly || ft.wcagReadable);

  // Get all available font names for the selector
  const availableFonts = getAllFontNames();

  const applyTheme = (themeId: string) => {
    const fontTheme = allFontThemes.find(ft => ft.id === themeId);
    if (!fontTheme) return;

    applyFontTheme(theme, mode, fontTheme);
  };

  const handleDeleteTheme = (themeId: string) => {
    deleteFontTheme(themeId);
    setDeletingTheme(null);
  };

  const handleEditTheme = () => {
    if (editingTheme && newThemeName.trim() && editedHeadingFont && editedBodyFont && editedMonoFont) {
      const isCustom = editingTheme.category === 'custom';

      if (isCustom) {
        // Update existing custom theme
        updateFontTheme(editingTheme.id, {
          name: newThemeName.trim(),
          description: newThemeDescription.trim() || editingTheme.description,
          heading: editedHeadingFont,
          body: editedBodyFont,
          mono: editedMonoFont,
        });
      } else {
        // Create a copy of curated theme with edited fonts
        saveFontTheme({
          name: newThemeName.trim(),
          description: newThemeDescription.trim() || `Custom version of ${editingTheme.name}`,
          heading: editedHeadingFont,
          body: editedBodyFont,
          mono: editedMonoFont,
          headingWeight: editingTheme.headingWeight,
          bodyWeight: editingTheme.bodyWeight,
          letterSpacing: editingTheme.letterSpacing,
          lineHeight: editingTheme.lineHeight,
          wcagReadable: editingTheme.wcagReadable,
          mood: editingTheme.mood || [],
          bestFor: editingTheme.bestFor,
          pairing: editingTheme.pairing,
        });
      }

      setEditingTheme(null);
      setNewThemeName('');
      setNewThemeDescription('');
    }
  };

  const handleCreateTheme = () => {
    if (newThemeName.trim() && editedHeadingFont && editedBodyFont && editedMonoFont) {
      saveFontTheme({
        name: newThemeName.trim(),
        description: newThemeDescription.trim() || 'Custom font theme',
        heading: editedHeadingFont,
        body: editedBodyFont,
        mono: editedMonoFont,
        headingWeight: '700',
        bodyWeight: '400',
        wcagReadable: true,
        mood: [],
      });

      setCreatingTheme(false);
      setNewThemeName('');
      setNewThemeDescription('');
      setEditedHeadingFont('');
      setEditedBodyFont('');
      setEditedMonoFont('');
    }
  };

  const resetFonts = () => {
    resetCustomFonts(theme, mode);
  };

  const renderFontThemeCard = (fontTheme: any, isDragging = false) => {
    const isActive = currentFontTheme?.id === fontTheme.id ||
      (currentFontTheme?.heading === fontTheme.heading &&
       currentFontTheme?.body === fontTheme.body &&
       currentFontTheme?.mono === fontTheme.mono);
    const isCustom = fontTheme.category === 'custom';

    const handleCardClick = () => {
      if (onNavigateToPlayground) {
        localStorage.setItem('sage-typography-playground-preset', fontTheme.id);
        onNavigateToPlayground();
      }
    };

    return (
      <Card
        key={fontTheme.id}
        onClick={handleCardClick}
        className={`
          p-4 transition-all flex flex-col h-full cursor-pointer
          ${!isDragging ? 'hover:shadow-lg hover:border-[var(--color-primary)]' : 'shadow-xl'}
          ${isActive ? 'ring-2 ring-[var(--color-primary)]' : ''}
        `}
      >
        {/* Title and Menu */}
        <div className="flex items-start justify-between mb-3">
          {/* Drag Handle */}
          <div className="mr-2 mt-1">
            <DragDropHandle />
          </div>
          <div className="flex-1 pr-2">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-medium">{fontTheme.name}</h4>
              {isActive && (
                <Badge variant="default" className="text-xs">
                  <Check className="w-3 h-3 mr-1" />
                  Active
                </Badge>
              )}
            </div>
            <p className="text-xs text-[var(--color-text-secondary)]">
              {fontTheme.description}
            </p>
          </div>
          {isCustom && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={(e) => {
                  e.stopPropagation();
                  setEditingTheme(fontTheme);
                  setNewThemeName(fontTheme.name);
                  setNewThemeDescription(fontTheme.description || '');
                  setEditedHeadingFont(fontTheme.heading);
                  setEditedBodyFont(fontTheme.body);
                  setEditedMonoFont(fontTheme.mono);
                }}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeletingTheme(fontTheme);
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Font Preview */}
        <div className="space-y-3 mb-4 flex-1">
          {/* Heading Font Preview */}
          <div className="space-y-1">
            <p
              className="text-2xl font-bold"
              style={{
                fontFamily: `var(--font-${fontTheme.heading.toLowerCase().replace(/\s+/g, '-')})`,
                fontWeight: fontTheme.headingWeight || '700',
                letterSpacing: fontTheme.letterSpacing?.heading || '-0.01em',
              }}
            >
              Quick Brown Fox
            </p>
            <p className="text-xs text-[var(--color-text-secondary)]">
              <span className="font-semibold">Heading:</span> {fontTheme.heading}
            </p>
          </div>

          {/* Body Font Preview */}
          <div className="space-y-1">
            <p
              className="text-sm"
              style={{
                fontFamily: `var(--font-${fontTheme.body.toLowerCase().replace(/\s+/g, '-')})`,
                fontWeight: fontTheme.bodyWeight || '400',
                lineHeight: fontTheme.lineHeight?.body || '1.6',
              }}
            >
              The quick brown fox jumps over the lazy dog. This is body text.
            </p>
            <p className="text-xs text-[var(--color-text-secondary)]">
              <span className="font-semibold">Body:</span> {fontTheme.body}
            </p>
          </div>

          {/* Mono Font Preview */}
          <div className="space-y-1">
            <p
              className="text-xs"
              style={{
                fontFamily: `var(--font-${fontTheme.mono.toLowerCase().replace(/\s+/g, '-')})`,
              }}
            >
              const code = "example";
            </p>
            <p className="text-xs text-[var(--color-text-secondary)]">
              <span className="font-semibold">Mono:</span> {fontTheme.mono}
            </p>
          </div>
        </div>

        {/* Theme Info */}
        <div className="space-y-2 mb-4">
          {/* Mood Tags */}
          {fontTheme.mood && fontTheme.mood.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {fontTheme.mood.map((mood: string) => (
                <Badge key={mood} variant="secondary" className="text-xs">
                  {mood}
                </Badge>
              ))}
            </div>
          )}

          {/* Accessibility & Pairing */}
          <div className="flex gap-2 items-center flex-wrap">
            {fontTheme.wcagReadable && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="default" className="text-xs bg-green-600 text-white hover:bg-green-700 border-none cursor-help">
                    WCAG Readable
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs max-w-xs">
                    This font pairing meets WCAG accessibility guidelines with good contrast and readability at small sizes.
                  </p>
                </TooltipContent>
              </Tooltip>
            )}
            {fontTheme.pairing && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="outline" className="text-xs text-[var(--color-text-secondary)] cursor-help">
                    {fontTheme.pairing}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs max-w-xs">
                    Font pairing strategy: {fontTheme.pairing}
                  </p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>

          {/* Best For */}
          {fontTheme.bestFor && (
            <p className="text-xs text-[var(--color-text-secondary)]">
              <span className="font-semibold">Best for:</span> {fontTheme.bestFor}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-auto">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              applyTheme(fontTheme.id);
            }}
            variant="default"
            size="sm"
            className={`
              flex-1 transition-all border-none justify-center
              ${isActive
                ? 'bg-[var(--color-accent)] text-[var(--color-accent-foreground)] ring-1 ring-[var(--color-accent)]'
                : ''}
            `}
          >
            {isActive ? 'Active' : 'Apply'}
          </Button>
          {onNavigateToPlayground && (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                // Store the preset ID for the playground to load
                localStorage.setItem('sage-typography-playground-preset', fontTheme.id);
                onNavigateToPlayground();
              }}
              variant="outline"
              size="sm"
              className="px-3"
              title="Customize in Playground"
            >
              <Settings className="w-4 h-4" />
            </Button>
          )}
        </div>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-lg font-semibold">Typography Themes</h3>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
                <Info className="w-4 h-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <div className="space-y-2 text-xs">
                <p className="font-semibold">Font Pairing Principles</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li><strong>Contrast:</strong> Pair serif with sans-serif for visual interest</li>
                  <li><strong>Hierarchy:</strong> Use distinct weights for heading vs body</li>
                  <li><strong>Readability:</strong> Body fonts should be easy to read at small sizes</li>
                  <li><strong>Personality:</strong> Choose fonts that match your brand mood</li>
                </ul>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Expert font pairings for quick customization. Choose a typography theme to
          instantly update your fonts.
        </p>
      </div>

      {/* Typography Explanation */}
      <Card className="p-4 bg-[var(--color-surface)] border-[var(--color-border)]">
        <div className="space-y-2">
          <p className="text-sm font-medium">How Typography Themes Work</p>
          <ul className="text-xs text-[var(--color-text-secondary)] space-y-1 list-disc list-inside">
            <li><strong>Heading</strong>: Display font for titles, headings, and hero text</li>
            <li><strong>Body</strong>: Reading font for paragraphs, descriptions, and content</li>
            <li><strong>Mono</strong>: Monospace font for code blocks and technical text</li>
          </ul>
          <p className="text-xs text-[var(--color-text-tertiary)] italic mt-2">
            Fonts are saved per theme ({theme}) and mode ({mode}). Switch modes in the Customizer panel.
          </p>
        </div>
      </Card>

      {/* Current Status */}
      {currentFontTheme && (
        <Card className="p-4 border-[var(--color-primary)] bg-[var(--color-primary)]/5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[var(--color-primary)]" />
                <span className="text-sm font-semibold">Active Typography Theme</span>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {/* Heading Font */}
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase text-[var(--color-text-secondary)] tracking-wider font-semibold">Heading</span>
                  <span className="text-sm font-medium">{currentFontTheme.heading}</span>
                </div>

                {/* Body Font */}
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase text-[var(--color-text-secondary)] tracking-wider font-semibold">Body</span>
                  <span className="text-sm font-medium">{currentFontTheme.body}</span>
                </div>

                {/* Mono Font */}
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase text-[var(--color-text-secondary)] tracking-wider font-semibold">Mono</span>
                  <span className="text-sm font-medium">{currentFontTheme.mono}</span>
                </div>
              </div>
            </div>

            <Button
              variant="default"
              size="sm"
              onClick={resetFonts}
              className="w-full lg:w-auto whitespace-nowrap shrink-0 border-none"
            >
              Reset to Default
            </Button>
          </div>
        </Card>
      )}

      {/* Filters Header */}
      <SecondaryNav
        items={NAV_ITEMS}
        activeId={selectedCategory}
        onItemChange={(id) => setSelectedCategory(id as FontThemeCategory | 'all' | 'custom')}
        mode="standalone"
      />

      {/* Additional Filters */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="accessible-only"
          checked={accessibleOnly}
          onChange={(e) => setAccessibleOnly(e.target.checked)}
          className="rounded"
        />
        <label htmlFor="accessible-only" className="text-sm">
          Show only WCAG readable themes
        </label>
      </div>

      {/* Theme Grid with Drag & Drop */}
      <div className="space-y-4">
        <DragDropList
          items={filteredThemes as any}
          onReorder={(reordered) => {
            const reorderedMap = new Map(reordered.map((ft: any, index) => [ft.id, { item: ft, newIndex: index }]));
            const newOrder = [...displayThemes];
            const filteredOut = newOrder.filter(ft => !reorderedMap.has(ft.id));
            const finalOrder = [...reordered, ...filteredOut];

            setLocalThemeOrder(finalOrder);

            const reorderedSaved = reordered.filter((ft: any) => ft.category === 'custom');
            if (reorderedSaved.length > 0) {
              reorderFontThemes(reorderedSaved as any);
            }
          }}
          renderItem={(fontTheme, isDragging) => renderFontThemeCard(fontTheme, isDragging)}
          withHandle={true}
          strategy={rectSortingStrategy}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        />

        {/* Create New Theme Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card
            className="p-4 cursor-pointer transition-all border-dashed border-2 hover:shadow-lg hover:border-[var(--color-primary)] flex flex-col items-center justify-center min-h-[300px]"
            onClick={() => {
              setCreatingTheme(true);
              setEditedHeadingFont('Inter');
              setEditedBodyFont('Inter');
              setEditedMonoFont('Fira Code');
            }}
          >
            <Plus className="h-12 w-12 mb-3 text-[var(--color-text-secondary)]" />
            <p className="text-lg font-medium text-[var(--color-text-secondary)]">Create New Theme</p>
            <p className="text-sm text-[var(--color-text-tertiary)] mt-1">
              Design your own font pairing
            </p>
          </Card>
        </div>
      </div>

      {filteredThemes.length === 0 && (
        <div className="text-center py-12 text-[var(--color-text-secondary)]">
          No themes found. Try a different category or disable accessibility filter.
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingTheme} onOpenChange={() => setDeletingTheme(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Font Theme</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deletingTheme?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDeleteTheme(deletingTheme?.id)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Theme Dialog */}
      <Dialog open={!!editingTheme} onOpenChange={() => {
        setEditingTheme(null);
        setNewThemeName('');
        setNewThemeDescription('');
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Font Theme</DialogTitle>
            <DialogDescription>
              {editingTheme?.category === 'custom'
                ? 'Modify the name and fonts of your theme'
                : 'Editing will create a custom copy of this theme'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-theme-name">Theme Name</Label>
              <Input
                id="edit-theme-name"
                value={newThemeName}
                onChange={(e) => setNewThemeName(e.target.value)}
                placeholder="Enter theme name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-theme-description">Description</Label>
              <Input
                id="edit-theme-description"
                value={newThemeDescription}
                onChange={(e) => setNewThemeDescription(e.target.value)}
                placeholder="Enter description"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Heading Font</Label>
                <Select value={editedHeadingFont} onValueChange={setEditedHeadingFont}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availableFonts.map(font => (
                      <SelectItem key={font} value={font}>{font}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Body Font</Label>
                <Select value={editedBodyFont} onValueChange={setEditedBodyFont}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availableFonts.map(font => (
                      <SelectItem key={font} value={font}>{font}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Mono Font</Label>
                <Select value={editedMonoFont} onValueChange={setEditedMonoFont}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availableFonts.map(font => (
                      <SelectItem key={font} value={font}>{font}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setEditingTheme(null);
              setNewThemeName('');
              setNewThemeDescription('');
            }}>
              Cancel
            </Button>
            <Button onClick={handleEditTheme} disabled={!newThemeName.trim() || !editedHeadingFont || !editedBodyFont || !editedMonoFont}>
              {editingTheme?.category === 'custom' ? 'Save Changes' : 'Create Copy'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create New Theme Dialog */}
      <Dialog open={creatingTheme} onOpenChange={setCreatingTheme}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Font Theme</DialogTitle>
            <DialogDescription>
              Design your own custom typography theme
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="new-theme-name">Theme Name</Label>
              <Input
                id="new-theme-name"
                value={newThemeName}
                onChange={(e) => setNewThemeName(e.target.value)}
                placeholder="My Custom Fonts"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-theme-description">Description (optional)</Label>
              <Input
                id="new-theme-description"
                value={newThemeDescription}
                onChange={(e) => setNewThemeDescription(e.target.value)}
                placeholder="A description of your font theme"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Heading Font</Label>
                <Select value={editedHeadingFont} onValueChange={setEditedHeadingFont}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availableFonts.map(font => (
                      <SelectItem key={font} value={font}>{font}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Body Font</Label>
                <Select value={editedBodyFont} onValueChange={setEditedBodyFont}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availableFonts.map(font => (
                      <SelectItem key={font} value={font}>{font}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Mono Font</Label>
                <Select value={editedMonoFont} onValueChange={setEditedMonoFont}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availableFonts.map(font => (
                      <SelectItem key={font} value={font}>{font}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setCreatingTheme(false);
              setNewThemeName('');
              setNewThemeDescription('');
              setEditedHeadingFont('');
              setEditedBodyFont('');
              setEditedMonoFont('');
            }}>
              Cancel
            </Button>
            <Button
              onClick={handleCreateTheme}
              disabled={!newThemeName.trim() || !editedHeadingFont || !editedBodyFont || !editedMonoFont}
            >
              Create Theme
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
