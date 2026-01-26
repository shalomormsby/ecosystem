'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Card,
  Button,
  Input,
  Label,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  Slider,
  Switch,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Badge,
  CollapsibleCodeBlock,
} from '@sage/ui';
import { useTheme, useMotionPreference } from '@sage/ui';
import { fontThemes, generateScale, type FontTheme, type TypographyScale, type TypeLevel } from '@sage/tokens';
import { getAllFontNames, getFontVariable } from '../../../../../lib/fonts-dynamic';
import {
  Type,
  Download,
  Save,
  Trash2,
  RefreshCw,
  Check,
  Copy,
  Sun,
  Moon,
} from 'lucide-react';

// Saved scale interface for localStorage
interface SavedTypographyScale {
  id: string;
  name: string;
  description: string;
  scale: TypographyScale;
  createdAt: number;
  isActive?: boolean;
}

// Canvas content for preview
const CANVAS_CONTENT = {
  display: 'Lovable by Design',
  h1: 'Building Beautiful Interfaces',
  h2: 'Typography as Foundation',
  h3: 'Design Principles that Matter',
  h4: 'Core Concepts',
  body: 'Typography is the voice of your design. While color sets the mood, typography determines readability, hierarchy, and personality. Good typography is invisible—it serves the content without drawing attention to itself. Great typography elevates the message and creates an emotional connection.',
  list: [
    'Establish clear hierarchy through size and weight',
    'Maintain consistent vertical rhythm with line height',
    'Use whitespace generously to aid readability',
    'Limit font families to 2-3 maximum',
  ],
  blockquote: {
    text: 'Design is thinking made visual.',
    author: 'Saul Bass',
  },
  code: 'const scale = 1.25;\nconst baseSize = 16;\nconst sizes = [16, 20, 25, 31, 39];',
  small: 'Figure 1: Typography specimen showing scale and hierarchy',
};

// Available font weights
const FONT_WEIGHTS = [
  { value: 300, label: 'Light (300)' },
  { value: 400, label: 'Regular (400)' },
  { value: 500, label: 'Medium (500)' },
  { value: 600, label: 'Semi-Bold (600)' },
  { value: 700, label: 'Bold (700)' },
  { value: 800, label: 'Extra-Bold (800)' },
];

export function TypographyPlayground() {
  const { theme, mode } = useTheme();
  const { shouldAnimate } = useMotionPreference();
  const [mounted, setMounted] = useState(false);

  // Current typography scale state
  const [currentScale, setCurrentScale] = useState<TypographyScale | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<string>('');

  // Canvas display options
  const [canvasBackground, setCanvasBackground] = useState<'light' | 'dark'>('light');

  // Saved scales
  const [savedScales, setSavedScales] = useState<SavedTypographyScale[]>([]);
  const [scaleName, setScaleName] = useState('');
  const [scaleDescription, setScaleDescription] = useState('');
  const [justSaved, setJustSaved] = useState(false);
  const [justCopied, setJustCopied] = useState(false);

  // Export dialog
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<'json' | 'css' | 'tokens'>('json');

  // Get all available fonts
  const availableFonts = useMemo(() => getAllFontNames(), []);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);

    // Load saved scales from localStorage
    const saved = localStorage.getItem('sage-typography-scales');
    if (saved) {
      try {
        setSavedScales(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved scales:', e);
      }
    }

    // Check if a preset was selected from the Typography grid
    const presetId = localStorage.getItem('sage-typography-playground-preset');
    let initialPreset = 'studio'; // Default

    if (presetId) {
      // Load the selected preset
      const preset = fontThemes.find(ft => ft.id === presetId);
      if (preset) {
        initialPreset = presetId;
        const scale = generateScale(preset);
        setCurrentScale(scale);
        setSelectedPreset(presetId);
      }
      // Clear the stored preset
      localStorage.removeItem('sage-typography-playground-preset');
    } else {
      // Initialize with Studio theme as default
      const studioTheme = fontThemes.find(ft => ft.id === initialPreset);
      if (studioTheme) {
        const defaultScale = generateScale(studioTheme);
        setCurrentScale(defaultScale);
        setSelectedPreset(initialPreset);
      }
    }
  }, []);

  // Handle preset selection
  const handlePresetChange = useCallback((presetId: string) => {
    const preset = fontThemes.find(ft => ft.id === presetId);
    if (preset) {
      const scale = generateScale(preset);
      setCurrentScale(scale);
      setSelectedPreset(presetId);
    }
  }, []);

  // Update a specific type level property
  const updateTypeLevel = useCallback((
    level: keyof TypographyScale,
    property: keyof TypeLevel,
    value: string | number
  ) => {
    if (!currentScale) return;

    setCurrentScale(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        [level]: {
          ...prev[level],
          [property]: value,
        },
      };
    });
  }, [currentScale]);

  // Save current scale
  const saveScale = useCallback(() => {
    if (!currentScale) return;

    const newScale: SavedTypographyScale = {
      id: `scale-${Date.now()}`,
      name: scaleName || `Scale ${savedScales.length + 1}`,
      description: scaleDescription || 'Custom typography scale',
      scale: currentScale,
      createdAt: Date.now(),
    };

    const updated = [...savedScales, newScale];
    setSavedScales(updated);
    localStorage.setItem('sage-typography-scales', JSON.stringify(updated));
    setScaleName('');
    setScaleDescription('');
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  }, [currentScale, scaleName, scaleDescription, savedScales]);

  // Load a saved scale
  const loadScale = useCallback((scale: SavedTypographyScale) => {
    setCurrentScale(scale.scale);
    setSelectedPreset(''); // Clear preset selection
  }, []);

  // Delete a saved scale
  const deleteScale = useCallback((id: string) => {
    const updated = savedScales.filter(s => s.id !== id);
    setSavedScales(updated);
    localStorage.setItem('sage-typography-scales', JSON.stringify(updated));
  }, [savedScales]);

  // Reset to selected preset
  const resetToPreset = useCallback(() => {
    if (selectedPreset) {
      handlePresetChange(selectedPreset);
    }
  }, [selectedPreset, handlePresetChange]);

  // Generate export code
  const generateExportCode = useCallback((format: 'json' | 'css' | 'tokens') => {
    if (!currentScale) return '';

    switch (format) {
      case 'json':
        return JSON.stringify({
          name: scaleName || 'Custom Scale',
          description: scaleDescription || 'Custom typography scale',
          scale: currentScale,
        }, null, 2);

      case 'css':
        const cssVars = Object.entries(currentScale).map(([level, props]) => {
          return `  /* ${level.toUpperCase()} */
  --font-${level}-family: '${props.fontFamily}', sans-serif;
  --font-${level}-weight: ${props.weight};
  --font-${level}-size: ${props.size}px;
  --font-${level}-line-height: ${props.lineHeight};
  --font-${level}-letter-spacing: ${props.letterSpacing};`;
        }).join('\n\n');
        return `:root {\n${cssVars}\n}`;

      case 'tokens':
        const tokens = Object.entries(currentScale).reduce((acc, [level, props]) => {
          acc[level] = {
            fontFamily: { value: props.fontFamily, type: 'fontFamily' },
            fontWeight: { value: props.weight, type: 'fontWeight' },
            fontSize: { value: `${props.size}px`, type: 'fontSize' },
            lineHeight: { value: props.lineHeight, type: 'lineHeight' },
            letterSpacing: { value: props.letterSpacing, type: 'letterSpacing' },
          };
          return acc;
        }, {} as Record<string, any>);
        return JSON.stringify({ typography: tokens }, null, 2);

      default:
        return '';
    }
  }, [currentScale, scaleName, scaleDescription]);

  // Copy export code
  const copyExportCode = useCallback(async () => {
    const code = generateExportCode(exportFormat);
    try {
      await navigator.clipboard.writeText(code);
      setJustCopied(true);
      setTimeout(() => setJustCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [exportFormat, generateExportCode]);

  // Render type level controls
  const renderTypeLevelControls = (level: keyof TypographyScale, label: string) => {
    if (!currentScale) return null;
    const props = currentScale[level];

    return (
      <AccordionItem value={level}>
        <AccordionTrigger className="text-sm font-medium">
          {label}
          <span className="ml-2 text-xs text-muted-foreground">
            {props.size}px • {props.weight}
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4 pt-2">
            {/* Font Family */}
            <div className="space-y-2">
              <Label htmlFor={`${level}-family`}>Font Family</Label>
              <Select
                value={props.fontFamily}
                onValueChange={(value) => updateTypeLevel(level, 'fontFamily', value)}
              >
                <SelectTrigger id={`${level}-family`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableFonts.map((font) => (
                    <SelectItem key={font} value={font}>
                      {font}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Font Weight */}
            <div className="space-y-2">
              <Label htmlFor={`${level}-weight`}>Font Weight</Label>
              <Select
                value={props.weight.toString()}
                onValueChange={(value) => updateTypeLevel(level, 'weight', parseInt(value, 10))}
              >
                <SelectTrigger id={`${level}-weight`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FONT_WEIGHTS.map((w) => (
                    <SelectItem key={w.value} value={w.value.toString()}>
                      {w.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Font Size */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor={`${level}-size`}>Size (px)</Label>
                <Input
                  id={`${level}-size`}
                  type="number"
                  min={12}
                  max={120}
                  value={props.size}
                  onChange={(e) => updateTypeLevel(level, 'size', parseInt(e.target.value, 10))}
                  className="w-20 h-8 text-sm"
                />
              </div>
              <Slider
                value={[props.size]}
                onValueChange={([value]) => updateTypeLevel(level, 'size', value)}
                min={12}
                max={120}
                step={1}
              />
            </div>

            {/* Line Height */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor={`${level}-lineHeight`}>Line Height</Label>
                <Input
                  id={`${level}-lineHeight`}
                  type="number"
                  min={1.0}
                  max={2.0}
                  step={0.1}
                  value={props.lineHeight}
                  onChange={(e) => updateTypeLevel(level, 'lineHeight', parseFloat(e.target.value))}
                  className="w-20 h-8 text-sm"
                />
              </div>
              <Slider
                value={[props.lineHeight]}
                onValueChange={([value]) => updateTypeLevel(level, 'lineHeight', value)}
                min={1.0}
                max={2.0}
                step={0.1}
              />
            </div>

            {/* Letter Spacing */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor={`${level}-letterSpacing`}>Letter Spacing</Label>
                <Input
                  id={`${level}-letterSpacing`}
                  type="text"
                  value={props.letterSpacing}
                  onChange={(e) => updateTypeLevel(level, 'letterSpacing', e.target.value)}
                  className="w-24 h-8 text-sm"
                  placeholder="0em"
                />
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  };

  if (!mounted || !currentScale) {
    return <div className="flex items-center justify-center p-8">Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Type className="w-6 h-6" />
            Typography Playground
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Create and customize complete type scales with granular control
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={resetToPreset}
            variant="outline"
            size="sm"
            disabled={!selectedPreset}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset to Preset
          </Button>
          <Button
            onClick={() => setExportDialogOpen(true)}
            variant="outline"
            size="sm"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Main Content: Sidebar + Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6">
        {/* Sidebar Controls */}
        <Card className="p-6 space-y-6 h-fit">
          {/* Preset Selector */}
          <div className="space-y-2">
            <Label htmlFor="preset-select">Load Preset</Label>
            <Select value={selectedPreset} onValueChange={handlePresetChange}>
              <SelectTrigger id="preset-select">
                <SelectValue placeholder="Select a preset..." />
              </SelectTrigger>
              <SelectContent>
                {fontThemes.map((ft) => (
                  <SelectItem key={ft.id} value={ft.id}>
                    {ft.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Type Level Controls */}
          <div className="space-y-2">
            <Label>Customize Type Levels</Label>
            <Accordion type="single" collapsible className="w-full">
              {renderTypeLevelControls('display', 'Display')}
              {renderTypeLevelControls('h1', 'Heading 1')}
              {renderTypeLevelControls('h2', 'Heading 2')}
              {renderTypeLevelControls('h3', 'Heading 3')}
              {renderTypeLevelControls('h4', 'Heading 4')}
              {renderTypeLevelControls('body', 'Body')}
              {renderTypeLevelControls('small', 'Small/Caption')}
              {renderTypeLevelControls('code', 'Code')}
            </Accordion>
          </div>

          {/* Save Section */}
          <div className="space-y-3 pt-4 border-t">
            <Input
              placeholder="Scale name..."
              value={scaleName}
              onChange={(e) => setScaleName(e.target.value)}
            />
            <Input
              placeholder="Description (optional)..."
              value={scaleDescription}
              onChange={(e) => setScaleDescription(e.target.value)}
            />
            <Button onClick={saveScale} className="w-full" disabled={justSaved}>
              {justSaved ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Saved!
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Custom Scale
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Canvas Preview */}
        <Card className="p-8">
          {/* Canvas Controls */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b">
            <h3 className="text-sm font-medium">Live Preview</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Background:</span>
              <Button
                variant={canvasBackground === 'light' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCanvasBackground('light')}
              >
                <Sun className="w-4 h-4" />
              </Button>
              <Button
                variant={canvasBackground === 'dark' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCanvasBackground('dark')}
              >
                <Moon className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Canvas Content */}
          <div
            className={`space-y-6 p-8 rounded-lg ${
              canvasBackground === 'dark'
                ? 'bg-neutral-900 text-white'
                : 'bg-white text-neutral-900'
            }`}
          >
            {/* Display */}
            <div>
              <div className="text-xs text-muted-foreground mb-2">
                Display • {currentScale.display.size}px • {currentScale.display.weight}
              </div>
              <div
                style={{
                  fontFamily: getFontVariable(currentScale.display.fontFamily),
                  fontWeight: currentScale.display.weight,
                  fontSize: `${currentScale.display.size}px`,
                  lineHeight: currentScale.display.lineHeight,
                  letterSpacing: currentScale.display.letterSpacing,
                }}
              >
                {CANVAS_CONTENT.display}
              </div>
            </div>

            {/* H1 */}
            <div>
              <div className="text-xs text-muted-foreground mb-2">
                H1 • {currentScale.h1.size}px • {currentScale.h1.weight}
              </div>
              <div
                style={{
                  fontFamily: getFontVariable(currentScale.h1.fontFamily),
                  fontWeight: currentScale.h1.weight,
                  fontSize: `${currentScale.h1.size}px`,
                  lineHeight: currentScale.h1.lineHeight,
                  letterSpacing: currentScale.h1.letterSpacing,
                }}
              >
                {CANVAS_CONTENT.h1}
              </div>
            </div>

            {/* H2 */}
            <div>
              <div className="text-xs text-muted-foreground mb-2">
                H2 • {currentScale.h2.size}px • {currentScale.h2.weight}
              </div>
              <div
                style={{
                  fontFamily: getFontVariable(currentScale.h2.fontFamily),
                  fontWeight: currentScale.h2.weight,
                  fontSize: `${currentScale.h2.size}px`,
                  lineHeight: currentScale.h2.lineHeight,
                  letterSpacing: currentScale.h2.letterSpacing,
                }}
              >
                {CANVAS_CONTENT.h2}
              </div>
            </div>

            {/* H3 */}
            <div>
              <div className="text-xs text-muted-foreground mb-2">
                H3 • {currentScale.h3.size}px • {currentScale.h3.weight}
              </div>
              <div
                style={{
                  fontFamily: getFontVariable(currentScale.h3.fontFamily),
                  fontWeight: currentScale.h3.weight,
                  fontSize: `${currentScale.h3.size}px`,
                  lineHeight: currentScale.h3.lineHeight,
                  letterSpacing: currentScale.h3.letterSpacing,
                }}
              >
                {CANVAS_CONTENT.h3}
              </div>
            </div>

            {/* H4 */}
            <div>
              <div className="text-xs text-muted-foreground mb-2">
                H4 • {currentScale.h4.size}px • {currentScale.h4.weight}
              </div>
              <div
                style={{
                  fontFamily: getFontVariable(currentScale.h4.fontFamily),
                  fontWeight: currentScale.h4.weight,
                  fontSize: `${currentScale.h4.size}px`,
                  lineHeight: currentScale.h4.lineHeight,
                  letterSpacing: currentScale.h4.letterSpacing,
                }}
              >
                {CANVAS_CONTENT.h4}
              </div>
            </div>

            {/* Body */}
            <div>
              <div className="text-xs text-muted-foreground mb-2">
                Body • {currentScale.body.size}px • {currentScale.body.weight}
              </div>
              <div
                style={{
                  fontFamily: getFontVariable(currentScale.body.fontFamily),
                  fontWeight: currentScale.body.weight,
                  fontSize: `${currentScale.body.size}px`,
                  lineHeight: currentScale.body.lineHeight,
                  letterSpacing: currentScale.body.letterSpacing,
                }}
              >
                {CANVAS_CONTENT.body}
              </div>
            </div>

            {/* List */}
            <ul
              className="space-y-2"
              style={{
                fontFamily: getFontVariable(currentScale.body.fontFamily),
                fontWeight: currentScale.body.weight,
                fontSize: `${currentScale.body.size}px`,
                lineHeight: currentScale.body.lineHeight,
                letterSpacing: currentScale.body.letterSpacing,
              }}
            >
              {CANVAS_CONTENT.list.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Blockquote */}
            <blockquote className="border-l-4 pl-4 italic">
              <div
                style={{
                  fontFamily: getFontVariable(currentScale.body.fontFamily),
                  fontWeight: currentScale.body.weight,
                  fontSize: `${currentScale.body.size}px`,
                  lineHeight: currentScale.body.lineHeight,
                  letterSpacing: currentScale.body.letterSpacing,
                }}
              >
                {CANVAS_CONTENT.blockquote.text}
              </div>
              <footer className="mt-2 text-sm">— {CANVAS_CONTENT.blockquote.author}</footer>
            </blockquote>

            {/* Code */}
            <div>
              <div className="text-xs text-muted-foreground mb-2">
                Code • {currentScale.code.size}px • {currentScale.code.fontFamily}
              </div>
              <pre
                className="p-4 rounded bg-opacity-50 bg-neutral-800 overflow-x-auto"
                style={{
                  fontFamily: getFontVariable(currentScale.code.fontFamily),
                  fontWeight: currentScale.code.weight,
                  fontSize: `${currentScale.code.size}px`,
                  lineHeight: currentScale.code.lineHeight,
                  letterSpacing: currentScale.code.letterSpacing,
                }}
              >
                {CANVAS_CONTENT.code}
              </pre>
            </div>

            {/* Small */}
            <div>
              <div className="text-xs text-muted-foreground mb-2">
                Small/Caption • {currentScale.small.size}px
              </div>
              <div
                className="text-muted-foreground"
                style={{
                  fontFamily: getFontVariable(currentScale.small.fontFamily),
                  fontWeight: currentScale.small.weight,
                  fontSize: `${currentScale.small.size}px`,
                  lineHeight: currentScale.small.lineHeight,
                  letterSpacing: currentScale.small.letterSpacing,
                }}
              >
                {CANVAS_CONTENT.small}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Saved Scales Gallery */}
      {savedScales.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Saved Custom Scales</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedScales.map((scale) => (
              <Card key={scale.id} className="p-4 space-y-3">
                <div>
                  <h4 className="font-semibold">{scale.name}</h4>
                  <p className="text-sm text-muted-foreground">{scale.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => loadScale(scale)}
                    size="sm"
                    variant="outline"
                    className="flex-1"
                  >
                    Load
                  </Button>
                  <Button
                    onClick={() => deleteScale(scale.id)}
                    size="sm"
                    variant="ghost"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Export Dialog */}
      <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Export Typography Scale</DialogTitle>
            <DialogDescription>
              Choose a format to export your custom typography scale
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Button
                variant={exportFormat === 'json' ? 'default' : 'outline'}
                onClick={() => setExportFormat('json')}
                size="sm"
              >
                JSON
              </Button>
              <Button
                variant={exportFormat === 'css' ? 'default' : 'outline'}
                onClick={() => setExportFormat('css')}
                size="sm"
              >
                CSS Variables
              </Button>
              <Button
                variant={exportFormat === 'tokens' ? 'default' : 'outline'}
                onClick={() => setExportFormat('tokens')}
                size="sm"
              >
                Design Tokens
              </Button>
            </div>
            <CollapsibleCodeBlock
              id="typography-export"
              code={generateExportCode(exportFormat)}
              language={exportFormat === 'css' ? 'css' : 'json'}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setExportDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={copyExportCode}>
              {justCopied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy to Clipboard
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
