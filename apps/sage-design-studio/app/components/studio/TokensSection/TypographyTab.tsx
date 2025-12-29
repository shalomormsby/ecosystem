'use client';

import { useState } from 'react';
import { Card } from '@ecosystem/design-system';
import { typographySystem } from '@ecosystem/design-system';

export function TypographyTab() {
  const [selectedTheme, setSelectedTheme] = useState<'studio' | 'sage' | 'volt'>('studio');

  const themes = [
    { id: 'studio' as const, label: 'Studio', emoji: '🏢' },
    { id: 'sage' as const, label: 'Sage', emoji: '🌿' },
    { id: 'volt' as const, label: 'Volt', emoji: '⚡' },
  ];

  const currentThemeFonts = typographySystem.families[selectedTheme];

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <Card className="p-6 bg-[var(--color-surface)]">
        <h3 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Typography System
        </h3>
        <p className="text-[var(--color-text-secondary)] mb-4">
          Our typography system provides a complete set of font families, sizes, weights, and presets.
          Each theme has its own carefully chosen font pairing that reflects its unique personality.
        </p>
        <div className="mt-4 p-4 bg-[var(--color-background)] rounded border border-[var(--color-border)]">
          <p className="text-sm text-[var(--color-text-muted)]">
            <strong className="text-[var(--color-text-primary)]">Design Philosophy:</strong>{' '}
            Typography creates personality and establishes hierarchy. Each theme's fonts were chosen to
            embody its values—professional clarity for Studio, elegant thoughtfulness for Sage, and
            bold energy for Volt.
          </p>
        </div>
      </Card>

      {/* Theme Selector */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Font Families by Theme
        </h3>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setSelectedTheme(theme.id)}
              className={`
                px-4 py-3 rounded-lg text-sm font-medium transition-all flex flex-col items-center gap-2 border
                ${
                  selectedTheme === theme.id
                    ? 'bg-[var(--color-primary)] text-white shadow-md border-[var(--color-primary)]'
                    : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border-[var(--color-border)]'
                }
              `}
            >
              <span className="text-xl">{theme.emoji}</span>
              <span>{theme.label}</span>
            </button>
          ))}
        </div>

        {/* Selected Theme Font Details */}
        <Card className="p-6 bg-[var(--color-surface)]">
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
              {themes.find(t => t.id === selectedTheme)?.label} Theme
            </h4>
            <p className="text-sm text-[var(--color-text-secondary)]">
              {currentThemeFonts.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Heading Font */}
            <Card className="p-6">
              <div className="mb-4">
                <p className="text-sm text-[var(--color-text-secondary)] mb-1">Heading Font</p>
                <p className="text-3xl font-bold text-[var(--color-text-primary)]">
                  {currentThemeFonts.heading}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-[var(--color-text-muted)]">
                  <strong className="text-[var(--color-text-primary)]">Usage:</strong>{' '}
                  {currentThemeFonts.usage.heading}
                </p>
                <p className="text-xs font-mono text-[var(--color-text-muted)]">
                  CSS Variable: <code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">
                    --font-{selectedTheme}-heading
                  </code>
                </p>
              </div>
            </Card>

            {/* Body Font */}
            <Card className="p-6">
              <div className="mb-4">
                <p className="text-sm text-[var(--color-text-secondary)] mb-1">Body Font</p>
                <p className="text-3xl font-medium text-[var(--color-text-primary)]">
                  {currentThemeFonts.body}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-[var(--color-text-muted)]">
                  <strong className="text-[var(--color-text-primary)]">Usage:</strong>{' '}
                  {currentThemeFonts.usage.body}
                </p>
                <p className="text-xs font-mono text-[var(--color-text-muted)]">
                  CSS Variable: <code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">
                    --font-{selectedTheme}-body
                  </code>
                </p>
              </div>
            </Card>

            {/* Serif Font (if applicable) */}
            {'serif' in currentThemeFonts && currentThemeFonts.serif && (
              <Card className="p-6">
                <div className="mb-4">
                  <p className="text-sm text-[var(--color-text-secondary)] mb-1">Serif Font</p>
                  <p className="text-3xl font-serif text-[var(--color-text-primary)]">
                    {currentThemeFonts.serif}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-[var(--color-text-muted)]">
                    <strong className="text-[var(--color-text-primary)]">Usage:</strong>{' '}
                    {currentThemeFonts.usage.serif || 'Long-form reading, elegant emphasis'}
                  </p>
                  <p className="text-xs font-mono text-[var(--color-text-muted)]">
                    CSS Variable: <code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">
                      --font-{selectedTheme}-serif
                    </code>
                  </p>
                </div>
              </Card>
            )}

            {/* Monospace Font */}
            <Card className="p-6">
              <div className="mb-4">
                <p className="text-sm text-[var(--color-text-secondary)] mb-1">Monospace Font</p>
                <p className="text-3xl font-mono text-[var(--color-text-primary)]">
                  {currentThemeFonts.mono}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-[var(--color-text-muted)]">
                  <strong className="text-[var(--color-text-primary)]">Usage:</strong>{' '}
                  {currentThemeFonts.usage.mono}
                </p>
                <p className="text-xs font-mono text-[var(--color-text-muted)]">
                  CSS Variable: <code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">
                    --font-{selectedTheme}-mono
                  </code>
                </p>
              </div>
            </Card>
          </div>
        </Card>
      </div>

      {/* All Themes Comparison */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Theme Comparison
        </h3>
        <Card className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border)]">
                  <th className="text-left py-3 px-4 text-[var(--color-text-primary)]">Theme</th>
                  <th className="text-left py-3 px-4 text-[var(--color-text-primary)]">Heading</th>
                  <th className="text-left py-3 px-4 text-[var(--color-text-primary)]">Body</th>
                  <th className="text-left py-3 px-4 text-[var(--color-text-primary)]">Personality</th>
                </tr>
              </thead>
              <tbody className="text-[var(--color-text-secondary)]">
                {themes.map((theme) => {
                  const fonts = typographySystem.families[theme.id];
                  return (
                    <tr key={theme.id} className="border-b border-[var(--color-border)] last:border-0">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span>{theme.emoji}</span>
                          <strong className="text-[var(--color-text-primary)]">{theme.label}</strong>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-semibold">{fonts.heading}</td>
                      <td className="py-3 px-4">{fonts.body}</td>
                      <td className="py-3 px-4 text-xs">{fonts.description}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Type Scale */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Type Scale
        </h3>
        <Card className="p-6">
          <p className="text-sm text-[var(--color-text-secondary)] mb-6">
            Universal scale used across all themes. Includes responsive sizing for mobile and desktop.
          </p>
          <div className="space-y-4">
            {Object.entries(typographySystem.sizes).slice(0, 7).map(([name, size]) => (
              <div key={name} className="border-b border-[var(--color-border)] pb-4 last:border-0">
                <div className="mb-2">
                  <p
                    className="text-[var(--color-text-primary)]"
                    style={{ fontSize: size.base }}
                  >
                    The quick brown fox jumps over the lazy dog
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <code className="font-mono text-[var(--color-primary)] px-2 py-1 bg-[var(--color-surface)] rounded">
                    {name}
                  </code>
                  <span className="text-[var(--color-text-secondary)]">
                    Base: {size.base}
                  </span>
                  <span className="text-[var(--color-text-muted)]">
                    Mobile: {size.mobile}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Font Weights */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Font Weights
        </h3>
        <Card className="p-6">
          <p className="text-sm text-[var(--color-text-secondary)] mb-6">
            Standard weight scale. Not all fonts support all weights—check font-specific availability.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(typographySystem.weights).map(([name, value]) => (
              <div key={name} className="flex items-center justify-between p-3 bg-[var(--color-background)] rounded">
                <p
                  className="text-lg text-[var(--color-text-primary)]"
                  style={{ fontWeight: value }}
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </p>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-[var(--color-text-muted)]">{value}</span>
                  <code className="font-mono text-[var(--color-text-muted)]">font-{name}</code>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Line Heights */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Line Heights
        </h3>
        <Card className="p-6">
          <p className="text-sm text-[var(--color-text-secondary)] mb-6">
            Unitless values for better scalability. Tighter for headings, relaxed for body text.
          </p>
          <div className="space-y-4">
            {Object.entries(typographySystem.lineHeights).map(([name, value]) => (
              <div key={name} className="border-b border-[var(--color-border)] pb-4 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <code className="text-sm font-mono text-[var(--color-primary)] px-2 py-1 bg-[var(--color-surface)] rounded">
                    {name}
                  </code>
                  <span className="text-sm text-[var(--color-text-muted)]">{value}</span>
                </div>
                <p
                  className="text-[var(--color-text-secondary)] text-sm"
                  style={{ lineHeight: value }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Letter Spacing */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Letter Spacing
        </h3>
        <Card className="p-6">
          <p className="text-sm text-[var(--color-text-secondary)] mb-6">
            In ems for scalability. Negative for headings, positive for small caps and all-caps.
          </p>
          <div className="space-y-3">
            {Object.entries(typographySystem.letterSpacing).map(([name, value]) => (
              <div key={name} className="flex items-center justify-between p-3 bg-[var(--color-background)] rounded">
                <p
                  className="text-lg text-[var(--color-text-primary)]"
                  style={{ letterSpacing: value }}
                >
                  LETTER SPACING EXAMPLE
                </p>
                <div className="flex items-center gap-2 text-xs">
                  <code className="font-mono text-[var(--color-primary)]">{name}</code>
                  <span className="text-[var(--color-text-muted)]">{value}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Type Presets */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">
          Type Presets
        </h3>
        <Card className="p-6">
          <p className="text-sm text-[var(--color-text-secondary)] mb-6">
            Ready-to-use combinations of size, weight, line height, and letter spacing for common use cases.
          </p>
          <div className="space-y-6">
            {Object.entries(typographySystem.presets).slice(0, 8).map(([name, preset]) => (
              <div key={name} className="border-b border-[var(--color-border)] pb-6 last:border-0">
                <div className="mb-3">
                  <p
                    className="text-[var(--color-text-primary)]"
                    style={{
                      fontSize: preset.size.base,
                      fontWeight: preset.weight,
                      lineHeight: preset.lineHeight,
                      letterSpacing: preset.letterSpacing,
                    }}
                  >
                    The quick brown fox jumps over the lazy dog
                  </p>
                </div>
                <div className="flex items-start gap-6 text-xs">
                  <div>
                    <code className="font-mono text-[var(--color-primary)] px-2 py-1 bg-[var(--color-surface)] rounded">
                      {name}
                    </code>
                  </div>
                  <div className="flex-1 text-[var(--color-text-muted)]">
                    {preset.description}
                  </div>
                  <div className="text-right text-[var(--color-text-muted)]">
                    <div>Size: {preset.size.base}</div>
                    <div>Weight: {preset.weight}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
