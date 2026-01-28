'use client';

import { LayoutTemplate, Layout, Sparkles, Ruler, Type, LayoutGrid, Scale } from 'lucide-react';
import { Heading, Text, Card, Badge } from '@thesage/ui';

interface TemplatesOverviewProps {
  onNavigate: (itemId: string) => void;
}

export function TemplatesOverview({ onNavigate }: TemplatesOverviewProps) {
  return (
    <div className="space-y-12">
      {/* Section Header */}
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="text-[var(--color-primary)]">
            <LayoutTemplate className="w-12 h-12" />
          </div>
          <div>
            <Heading level={1} className="mb-2">
              Templates
            </Heading>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">2 templates</Badge>
              <Badge variant="outline">Swiss Grid</Badge>
            </div>
          </div>
        </div>
        <Text variant="secondary" size="lg" className="max-w-3xl">
          Pre-composed page layouts and tools that combine functionally-organized components. Templates demonstrate Swiss Grid Design principles and provide opinionated structure for common patterns.
        </Text>
      </div>

      {/* What are Templates */}
      <section>
        <Heading level={2} className="mb-4">
          What are Templates?
        </Heading>
        <Card className="p-6">
          <Text variant="secondary" className="mb-4">
            Templates compose functionally-organized components into complete page layouts. They provide opinionated structure
            and best practices for common page patterns, combining components from across all categories.
          </Text>
          <ul className="space-y-2 text-[var(--color-text-secondary)]">
            <li className="flex items-start">
              <span className="mr-2 mt-1">•</span>
              <span>Compose multiple patterns and components into coherent page structures</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-1">•</span>
              <span>Enforce consistent spacing and layout principles</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-1">•</span>
              <span>Provide sensible defaults while allowing customization</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-1">•</span>
              <span>Demonstrate Swiss Grid Design principles in practice</span>
            </li>
          </ul>
        </Card>
      </section>

      {/* Swiss Grid Principles */}
      <section>
        <Heading level={2} className="mb-4">
          Swiss Grid Design Principles
        </Heading>
        <Card className="p-6">
          <Text variant="secondary" className="mb-4">
            Our templates are built on foundational design principles that create clean, structured, and functional layouts.
          </Text>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Ruler className="w-5 h-5 text-[var(--color-primary)] mt-1" />
              <div>
                <h3 className="font-semibold text-[var(--color-text-primary)] mb-1">Structured Spacing</h3>
                <Text variant="secondary" size="sm">
                  48-96px between major sections for clear visual hierarchy
                </Text>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Type className="w-5 h-5 text-[var(--color-primary)] mt-1" />
              <div>
                <h3 className="font-semibold text-[var(--color-text-primary)] mb-1">Typography Hierarchy</h3>
                <Text variant="secondary" size="sm">
                  36-48px titles, 18px subtitles, consistent ratios
                </Text>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <LayoutGrid className="w-5 h-5 text-[var(--color-primary)] mt-1" />
              <div>
                <h3 className="font-semibold text-[var(--color-text-primary)] mb-1">Grid-Based Alignment</h3>
                <Text variant="secondary" size="sm">
                  12-column Tailwind grid with consistent content widths
                </Text>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-[var(--color-primary)] mt-1" />
              <div>
                <h3 className="font-semibold text-[var(--color-text-primary)] mb-1">Generous Whitespace</h3>
                <Text variant="secondary" size="sm">
                  Breathing room for content to shine
                </Text>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Available Templates */}
      <section>
        <Heading level={2} className="mb-4">
          Available Templates
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => onNavigate('page-template')}
            className="text-left group"
          >
            <Card className="p-6 h-full transition-all duration-200 hover:border-[var(--color-primary)] hover:shadow-md cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="text-[var(--color-primary)] bg-[var(--color-primary)]/10 p-3 rounded-md group-hover:bg-[var(--color-primary)]/20 transition-colors">
                    <Layout className="w-6 h-6" />
                  </div>
                  <Heading
                    level={3}
                    className="text-lg group-hover:text-[var(--color-primary)] transition-colors"
                  >
                    Page Template
                  </Heading>
                </div>
              </div>
              <Text variant="secondary" size="sm">
                Swiss Grid-based page layout with header, title, breadcrumbs, and content area.
                Perfect for blog posts, documentation, and standard app pages. Includes optional secondary navigation and footer composition.
              </Text>
            </Card>
          </button>
        </div>
      </section>
    </div>
  );
}
