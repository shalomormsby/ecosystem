'use client';

import { useState } from 'react';
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
  ColorPicker,
} from '@sage/ui';
import { useTheme } from '@sage/ui/hooks';
import { useCustomizer } from '@sage/ui';
import { colorPalettes, type PaletteCategory } from '@sage/tokens';
import { Check, MoreVertical, Edit, Type, Trash2 } from 'lucide-react';

const CATEGORIES: { value: PaletteCategory | 'all' | 'custom'; label: string; icon: string }[] = [
  { value: 'all', label: 'All', icon: '✨' },
  { value: 'custom', label: 'My Palettes', icon: '⭐' },
  { value: 'professional', label: 'Professional', icon: '💼' },
  { value: 'creative', label: 'Creative', icon: '🎨' },
  { value: 'nature', label: 'Nature', icon: '🌿' },
  { value: 'vibrant', label: 'Vibrant', icon: '⚡' },
  { value: 'minimal', label: 'Minimal', icon: '◻️' },
  { value: 'luxury', label: 'Luxury', icon: '👑' },
  { value: 'playful', label: 'Playful', icon: '🎈' },
];

export function PalettesTab() {
  const [selectedCategory, setSelectedCategory] = useState<PaletteCategory | 'all' | 'custom'>('all');
  const [accessibleOnly, setAccessibleOnly] = useState(false);
  const [editingPalette, setEditingPalette] = useState<any>(null);
  const [renamingPalette, setRenamingPalette] = useState<any>(null);
  const [deletingPalette, setDeletingPalette] = useState<any>(null);
  const [newPaletteName, setNewPaletteName] = useState('');
  const [editedPrimaryColor, setEditedPrimaryColor] = useState('');
  const [editedAccentColor, setEditedAccentColor] = useState('');

  const { theme, mode } = useTheme();
  const {
    setCustomPrimaryColor,
    getActiveColorPalette,
    resetCustomColors,
    getSavedPalettes,
    deletePalette,
    renamePalette,
    updatePalette,
  } = useCustomizer();

  const currentPalette = getActiveColorPalette(theme, mode);
  const savedPalettes = getSavedPalettes();

  // Combine curated and saved palettes
  const allPalettes = [
    ...colorPalettes,
    ...savedPalettes,
  ];

  const filteredPalettes = allPalettes
    .filter(p => selectedCategory === 'all' || p.category === selectedCategory)
    .filter(p => !accessibleOnly || p.wcagAA);

  const applyPalette = (paletteId: string) => {
    const palette = allPalettes.find(p => p.id === paletteId);
    if (!palette) return;

    setCustomPrimaryColor(theme, mode, palette.primary);
  };

  const handleDeletePalette = (paletteId: string) => {
    deletePalette(paletteId);
    setDeletingPalette(null);
  };

  const handleRenamePalette = () => {
    if (renamingPalette && newPaletteName.trim()) {
      renamePalette(renamingPalette.id, newPaletteName.trim());
      setRenamingPalette(null);
      setNewPaletteName('');
    }
  };

  const handleEditPalette = () => {
    if (editingPalette) {
      updatePalette(editingPalette.id, {
        primary: editedPrimaryColor,
        accent: editedAccentColor,
      });
      setEditingPalette(null);
    }
  };

  const resetColors = () => {
    resetCustomColors(theme, mode);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Curated Color Palettes</h3>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Pre-designed, accessible color schemes for quick customization.
          Choose a palette to instantly update your {mode} mode theme.
        </p>
      </div>

      {/* Current Status */}
      {currentPalette && (
        <Card className="p-4 border-[var(--color-primary)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded border border-[var(--color-border)]"
                style={{ backgroundColor: currentPalette.primary }}
              />
              <div>
                <p className="text-sm font-medium">Custom color active</p>
                <p className="text-xs text-[var(--color-text-secondary)] font-mono">
                  {currentPalette.primary.toUpperCase()}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={resetColors}
            >
              Reset to Theme Default
            </Button>
          </div>
        </Card>
      )}

      {/* Filters */}
      <div className="space-y-4">
        {/* Category Filter */}
        <div>
          <label className="text-sm font-medium mb-2 block">Category</label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <Button
                key={cat.value}
                variant={selectedCategory === cat.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(cat.value)}
              >
                <span className="mr-1">{cat.icon}</span>
                {cat.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Accessibility Filter */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="accessible-only"
            checked={accessibleOnly}
            onChange={(e) => setAccessibleOnly(e.target.checked)}
            className="rounded"
          />
          <label htmlFor="accessible-only" className="text-sm">
            Show only WCAG AA compliant palettes
          </label>
        </div>
      </div>

      {/* Palette Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPalettes.map(palette => {
          const isActive = currentPalette?.primary === palette.primary;
          const isCustom = palette.category === 'custom';

          return (
            <Card
              key={palette.id}
              className={`
                p-4 cursor-pointer transition-all relative
                hover:shadow-lg hover:border-[var(--color-primary)]
                ${isActive ? 'ring-2 ring-[var(--color-primary)]' : ''}
              `}
            >
              {/* Dropdown Menu for Custom Palettes */}
              {isCustom && (
                <div className="absolute top-2 right-2 z-10">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        setEditingPalette(palette);
                        setEditedPrimaryColor(palette.primary);
                        setEditedAccentColor(palette.accent);
                      }}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        setRenamingPalette(palette);
                        setNewPaletteName(palette.name);
                      }}>
                        <Type className="mr-2 h-4 w-4" />
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeletingPalette(palette);
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}

              {/* Color Preview */}
              <div className="flex gap-2 mb-3">
                {/* Primary Color */}
                <div className="flex-1">
                  <div
                    className="h-16 rounded mb-1"
                    style={{ backgroundColor: palette.primary }}
                    title={`Primary: ${palette.primary}`}
                  />
                  <div className="text-xs text-center text-[var(--color-text-secondary)] font-medium">
                    Primary
                  </div>
                </div>
                {/* Accent Color */}
                <div className="flex-1">
                  <div
                    className="h-16 rounded mb-1"
                    style={{ backgroundColor: palette.accent }}
                    title={`Accent: ${palette.accent}`}
                  />
                  <div className="text-xs text-center text-[var(--color-text-secondary)] font-medium">
                    Accent
                  </div>
                </div>
              </div>

              {/* Palette Info */}
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <h4 className="font-medium">{palette.name}</h4>
                  {isActive && (
                    <Badge variant="default" className="ml-2">
                      <Check className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                  )}
                </div>

                <p className="text-xs text-[var(--color-text-secondary)]">
                  {palette.description}
                </p>

                {/* Mood Tags */}
                <div className="flex flex-wrap gap-1">
                  {palette.mood.map(mood => (
                    <Badge key={mood} variant="secondary" className="text-xs">
                      {mood}
                    </Badge>
                  ))}
                </div>

                {/* Accessibility Badge */}
                {palette.wcagAAA && (
                  <Badge variant="default" className="text-xs bg-green-600">AAA</Badge>
                )}
                {palette.wcagAA && !palette.wcagAAA && (
                  <Badge variant="default" className="text-xs">AA</Badge>
                )}
                {!palette.wcagAA && (
                  <Badge variant="outline" className="text-xs">Vibrant</Badge>
                )}

                {/* Best For */}
                {palette.bestFor && (
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    Best for: {palette.bestFor.join(', ')}
                  </p>
                )}
              </div>

              {/* Apply Button */}
              <Button
                onClick={() => applyPalette(palette.id)}
                variant={isActive ? 'outline' : 'default'}
                size="sm"
                className="w-full mt-3"
              >
                {isActive ? 'Currently Active' : 'Apply Palette'}
              </Button>
            </Card>
          );
        })}
      </div>

      {filteredPalettes.length === 0 && (
        <div className="text-center py-12 text-[var(--color-text-secondary)]">
          No palettes found. Try a different category or disable accessibility filter.
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingPalette} onOpenChange={() => setDeletingPalette(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Palette</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deletingPalette?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDeletePalette(deletingPalette?.id)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Rename Dialog */}
      <Dialog open={!!renamingPalette} onOpenChange={() => {
        setRenamingPalette(null);
        setNewPaletteName('');
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Palette</DialogTitle>
            <DialogDescription>
              Give your palette a new name
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="palette-name">Palette Name</Label>
              <Input
                id="palette-name"
                value={newPaletteName}
                onChange={(e) => setNewPaletteName(e.target.value)}
                placeholder={renamingPalette?.name}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleRenamePalette();
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setRenamingPalette(null);
              setNewPaletteName('');
            }}>
              Cancel
            </Button>
            <Button onClick={handleRenamePalette} disabled={!newPaletteName.trim()}>
              Rename
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Palette Dialog */}
      <Dialog open={!!editingPalette} onOpenChange={() => setEditingPalette(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Palette</DialogTitle>
            <DialogDescription>
              Modify the colors in your palette
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Primary Color</Label>
              <ColorPicker
                value={editedPrimaryColor}
                onChange={setEditedPrimaryColor}
              />
            </div>
            <div className="space-y-2">
              <Label>Accent Color</Label>
              <ColorPicker
                value={editedAccentColor}
                onChange={setEditedAccentColor}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingPalette(null)}>
              Cancel
            </Button>
            <Button onClick={handleEditPalette}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
