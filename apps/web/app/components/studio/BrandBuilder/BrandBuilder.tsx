'use client';

import { useState, useEffect } from 'react';
import { Card, Button, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Slider } from '@thesage/ui';
import { Download, Copy, Check, Save, Trash2, RefreshCw } from 'lucide-react';
import { getAllFontNames } from '../../../../lib/fonts-dynamic';
import { colorPalettes } from '@thesage/tokens';

interface BrandConfig {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  headingFont: string;
  bodyFont: string;
  logoText: string;
  logoSize: number;
  logoWeight: number;
  logoSpacing: number;
  logoTransform: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
}

interface SavedBrand extends BrandConfig {
  id: string;
  createdAt: number;
}

const FONT_WEIGHTS = [
  { value: 300, label: 'Light' },
  { value: 400, label: 'Regular' },
  { value: 500, label: 'Medium' },
  { value: 600, label: 'Semibold' },
  { value: 700, label: 'Bold' },
  { value: 800, label: 'Extrabold' },
  { value: 900, label: 'Black' },
];

export function BrandBuilder() {
  const [copied, setCopied] = useState<string | null>(null);
  const [savedBrands, setSavedBrands] = useState<SavedBrand[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [brand, setBrand] = useState<BrandConfig>({
    name: 'My Brand',
    primaryColor: '#3B82F6',
    secondaryColor: '#8B5CF6',
    headingFont: 'Poppins',
    bodyFont: 'Inter',
    logoText: 'MY BRAND',
    logoSize: 48,
    logoWeight: 700,
    logoSpacing: 0,
    logoTransform: 'uppercase',
  });

  // Get all fonts from the system
  const allFonts = getAllFontNames();

  // Transform color palettes into quick presets
  const colorPresets = colorPalettes.slice(0, 12).map(palette => ({
    id: palette.id,
    name: palette.name,
    primary: palette.primary,
    secondary: palette.secondary,
  }));

  // Load saved brands from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('sage-brands');
    if (saved) {
      try {
        setSavedBrands(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved brands:', e);
      }
    }
  }, []);

  const updateBrand = (updates: Partial<BrandConfig>) => {
    setBrand(prev => ({ ...prev, ...updates }));
  };

  const applyColorPreset = (preset: typeof colorPresets[0]) => {
    updateBrand({ primaryColor: preset.primary, secondaryColor: preset.secondary });
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const exportCSS = () => {
    const css = `:root {
  /* Brand Colors */
  --brand-primary: ${brand.primaryColor};
  --brand-secondary: ${brand.secondaryColor};

  /* Typography */
  --font-heading: '${brand.headingFont}', sans-serif;
  --font-body: '${brand.bodyFont}', sans-serif;
}`;
    copyToClipboard(css, 'CSS');
  };

  const exportJSON = () => {
    const json = JSON.stringify({
      name: brand.name,
      colors: {
        primary: brand.primaryColor,
        secondary: brand.secondaryColor,
      },
      typography: {
        heading: brand.headingFont,
        body: brand.bodyFont,
      },
      logo: {
        text: brand.logoText,
        size: brand.logoSize,
        weight: brand.logoWeight,
        spacing: brand.logoSpacing,
        transform: brand.logoTransform,
      },
    }, null, 2);
    copyToClipboard(json, 'JSON');
  };

  const downloadSVG = () => {
    const svg = `<svg width="800" height="200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${brand.primaryColor};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${brand.secondaryColor};stop-opacity:1" />
    </linearGradient>
  </defs>
  <text
    x="50%"
    y="50%"
    font-family="${brand.headingFont}, sans-serif"
    font-size="${brand.logoSize}"
    font-weight="${brand.logoWeight}"
    letter-spacing="${brand.logoSpacing}"
    text-transform="${brand.logoTransform}"
    text-anchor="middle"
    dominant-baseline="middle"
    fill="url(#brandGradient)"
  >${brand.logoText || 'YOUR LOGO'}</text>
</svg>`;

    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${brand.name.toLowerCase().replace(/\s+/g, '-')}-logo.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const saveBrand = async () => {
    const newBrand: SavedBrand = {
      ...brand,
      id: `brand-${Date.now()}`,
      createdAt: Date.now(),
    };

    const updated = [...savedBrands, newBrand];
    setSavedBrands(updated);
    localStorage.setItem('sage-brands', JSON.stringify(updated));

    // Sync to Edge Config
    setIsSyncing(true);
    try {
      const response = await fetch('/api/edge-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: `brand_${newBrand.id}`,
          value: newBrand,
        }),
      });

      if (!response.ok) {
        console.error('Failed to sync to Edge Config');
      }
    } catch (error) {
      console.error('Edge Config sync error:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  const loadBrand = (savedBrand: SavedBrand) => {
    setBrand({
      name: savedBrand.name,
      primaryColor: savedBrand.primaryColor,
      secondaryColor: savedBrand.secondaryColor,
      headingFont: savedBrand.headingFont,
      bodyFont: savedBrand.bodyFont,
      logoText: savedBrand.logoText,
      logoSize: savedBrand.logoSize,
      logoWeight: savedBrand.logoWeight,
      logoSpacing: savedBrand.logoSpacing,
      logoTransform: savedBrand.logoTransform,
    });
  };

  const deleteBrand = (id: string) => {
    const updated = savedBrands.filter(b => b.id !== id);
    setSavedBrands(updated);
    localStorage.setItem('sage-brands', JSON.stringify(updated));
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-24">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--color-text-primary)]">
          Brand Builder
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)] max-w-3xl">
          Create your brand identity with professional typography, color palettes, and logotypes. Customize in real-time and export for any use.
        </p>
      </div>

      {/* Interactive Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls Panel */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-6 space-y-6">
            {/* Brand Name */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[var(--color-text-primary)]">
                Brand Information
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="brand-name">Brand Name</Label>
                  <Input
                    id="brand-name"
                    value={brand.name}
                    onChange={(e) => updateBrand({ name: e.target.value })}
                    placeholder="Enter your brand name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logo-text">Logo Text</Label>
                  <Input
                    id="logo-text"
                    value={brand.logoText}
                    onChange={(e) => updateBrand({ logoText: e.target.value })}
                    placeholder="Enter logo text"
                  />
                </div>
              </div>
            </div>

            {/* Logotype Settings */}
            <div className="border-t border-[var(--color-border)] pt-6">
              <h3 className="text-lg font-semibold mb-4 text-[var(--color-text-primary)]">
                Logotype Settings
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="logo-size">Size</Label>
                    <span className="text-sm text-[var(--color-text-secondary)]">
                      {brand.logoSize}px
                    </span>
                  </div>
                  <input
                    id="logo-size"
                    type="range"
                    min="24"
                    max="96"
                    step="4"
                    value={brand.logoSize}
                    onChange={(e) => updateBrand({ logoSize: Number(e.target.value) })}
                    className="w-full h-2 bg-[var(--color-surface)] rounded-lg appearance-none cursor-pointer accent-[var(--color-primary)]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logo-weight">Font Weight</Label>
                  <Select value={brand.logoWeight.toString()} onValueChange={(value) => updateBrand({ logoWeight: parseInt(value) })}>
                    <SelectTrigger id="logo-weight">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {FONT_WEIGHTS.map(weight => (
                        <SelectItem key={weight.value} value={weight.value.toString()}>{weight.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="logo-spacing">Letter Spacing</Label>
                    <span className="text-sm text-[var(--color-text-secondary)]">
                      {brand.logoSpacing}px
                    </span>
                  </div>
                  <input
                    id="logo-spacing"
                    type="range"
                    min="-5"
                    max="20"
                    step="1"
                    value={brand.logoSpacing}
                    onChange={(e) => updateBrand({ logoSpacing: Number(e.target.value) })}
                    className="w-full h-2 bg-[var(--color-surface)] rounded-lg appearance-none cursor-pointer accent-[var(--color-primary)]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logo-transform">Text Transform</Label>
                  <Select value={brand.logoTransform} onValueChange={(value: any) => updateBrand({ logoTransform: value })}>
                    <SelectTrigger id="logo-transform">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="uppercase">UPPERCASE</SelectItem>
                      <SelectItem value="lowercase">lowercase</SelectItem>
                      <SelectItem value="capitalize">Capitalize</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Color Palette */}
            <div className="border-t border-[var(--color-border)] pt-6">
              <h3 className="text-lg font-semibold mb-4 text-[var(--color-text-primary)]">
                Color Palette
              </h3>
              <div className="space-y-4">
                <div>
                  <Label className="mb-2 block">Quick Presets</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {colorPresets.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => applyColorPreset(preset)}
                        className="h-10 rounded-md flex overflow-hidden border border-border hover:border-primary transition-colors"
                        title={preset.name}
                      >
                        <div className="flex-1" style={{ backgroundColor: preset.primary }} />
                        <div className="flex-1" style={{ backgroundColor: preset.secondary }} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="space-y-2">
                    <Label htmlFor="primary-color">Primary</Label>
                    <div className="flex gap-2">
                      <Input
                        id="primary-color"
                        type="color"
                        value={brand.primaryColor}
                        onChange={(e) => updateBrand({ primaryColor: e.target.value })}
                        className="w-12 h-10 p-1 cursor-pointer"
                      />
                      <Input
                        value={brand.primaryColor}
                        onChange={(e) => updateBrand({ primaryColor: e.target.value })}
                        placeholder="#000000"
                        className="flex-1 text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondary-color">Secondary</Label>
                    <div className="flex gap-2">
                      <Input
                        id="secondary-color"
                        type="color"
                        value={brand.secondaryColor}
                        onChange={(e) => updateBrand({ secondaryColor: e.target.value })}
                        className="w-12 h-10 p-1 cursor-pointer"
                      />
                      <Input
                        value={brand.secondaryColor}
                        onChange={(e) => updateBrand({ secondaryColor: e.target.value })}
                        placeholder="#000000"
                        className="flex-1 text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Typography */}
            <div className="border-t border-[var(--color-border)] pt-6">
              <h3 className="text-lg font-semibold mb-4 text-[var(--color-text-primary)]">
                Typography
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="heading-font">Heading Font</Label>
                  <Select value={brand.headingFont} onValueChange={(value) => updateBrand({ headingFont: value })}>
                    <SelectTrigger id="heading-font">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {allFonts.map(font => (
                        <SelectItem key={font} value={font}>{font}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="body-font">Body Font</Label>
                  <Select value={brand.bodyFont} onValueChange={(value) => updateBrand({ bodyFont: value })}>
                    <SelectTrigger id="body-font">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {allFonts.map(font => (
                        <SelectItem key={font} value={font}>{font}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Save Brand */}
            <div className="border-t border-[var(--color-border)] pt-6">
              <h3 className="text-lg font-semibold mb-4 text-[var(--color-text-primary)]">
                Actions
              </h3>
              <div className="space-y-2">
                <Button onClick={saveBrand} className="w-full gap-2" disabled={isSyncing}>
                  <Save className="w-4 h-4" />
                  {isSyncing ? 'Saving...' : 'Save Brand'}
                </Button>
                <Button onClick={downloadSVG} variant="outline" className="w-full gap-2">
                  <Download className="w-4 h-4" />
                  Download SVG Logo
                </Button>
                <Button onClick={exportCSS} variant="outline" className="w-full gap-2">
                  {copied === 'CSS' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied === 'CSS' ? 'Copied!' : 'Copy CSS Variables'}
                </Button>
                <Button onClick={exportJSON} variant="outline" className="w-full gap-2">
                  {copied === 'JSON' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied === 'JSON' ? 'Copied!' : 'Copy JSON Config'}
                </Button>
              </div>
            </div>

            {/* Saved Brands */}
            {savedBrands.length > 0 && (
              <div className="border-t border-[var(--color-border)] pt-6">
                <h3 className="text-lg font-semibold mb-4 text-[var(--color-text-primary)]">
                  Saved Brands
                </h3>
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {savedBrands.map((savedBrand) => (
                    <Card key={savedBrand.id} className="p-3">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">
                              {savedBrand.name}
                            </p>
                            <p className="text-xs text-[var(--color-text-muted)] truncate">
                              {savedBrand.logoText}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteBrand(savedBrand.id)}
                            className="h-8 w-8 p-0 flex-shrink-0"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => loadBrand(savedBrand)}
                          className="w-full gap-2 text-xs"
                        >
                          <RefreshCw className="w-3 h-3" />
                          Load
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Preview Panel */}
        <div className="lg:col-span-2 space-y-4 sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto">
          <Card className="p-8 bg-[var(--color-surface)]">
            <div className="space-y-8">
              <div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                  Logo Preview
                </p>
                <div className="p-8 border-2 border-dashed border-border rounded-lg text-center bg-background min-h-[200px] flex items-center justify-center">
                  <style dangerouslySetInnerHTML={{
                    __html: `
                      .brand-logo-preview {
                        font-family: ${brand.headingFont};
                        font-size: ${brand.logoSize}px;
                        font-weight: ${brand.logoWeight};
                        letter-spacing: ${brand.logoSpacing}px;
                        text-transform: ${brand.logoTransform};
                        background: linear-gradient(135deg, ${brand.primaryColor}, ${brand.secondaryColor});
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        color: transparent;
                        display: inline-block;
                      }
                    `
                  }} />
                  <span className="brand-logo-preview">
                    {brand.logoText || 'YOUR LOGO'}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                  Typography Examples
                </p>
                <div className="space-y-4 p-6 border border-border rounded-lg bg-background">
                  <div>
                    <p className="text-xs text-[var(--color-text-muted)] mb-2">Heading ({brand.headingFont})</p>
                    <h3
                      style={{
                        fontFamily: brand.headingFont,
                        fontSize: '24px',
                        fontWeight: 600,
                        color: brand.primaryColor,
                      }}
                    >
                      The quick brown fox jumps
                    </h3>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--color-text-muted)] mb-2">Body ({brand.bodyFont})</p>
                    <p
                      style={{
                        fontFamily: brand.bodyFont,
                        fontSize: '16px',
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                  Color Palette
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border border-border rounded-lg bg-background">
                    <div
                      className="h-24 rounded-lg mb-3"
                      style={{ backgroundColor: brand.primaryColor }}
                    />
                    <p className="text-sm font-mono text-[var(--color-text-primary)]">{brand.primaryColor}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">Primary Color</p>
                  </div>
                  <div className="p-4 border border-border rounded-lg bg-background">
                    <div
                      className="h-24 rounded-lg mb-3"
                      style={{ backgroundColor: brand.secondaryColor }}
                    />
                    <p className="text-sm font-mono text-[var(--color-text-primary)]">{brand.secondaryColor}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">Secondary Color</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
