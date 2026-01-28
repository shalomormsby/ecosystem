'use client';

import { Heading, Text, Card, Badge } from '@thesage/ui';
import { ArrowRight, type LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

export interface SectionOverviewItem {
  id: string;
  label: string;
  description: string;
  icon: ReactNode;
}

export interface SectionOverviewProps {
  /**
   * Section title (e.g., "Components", "Hooks", "Design Tokens")
   */
  title: string;

  /**
   * Section icon component
   */
  icon: ReactNode;

  /**
   * Section description text
   */
  description: string;

  /**
   * Array of badges to display (e.g., [{label: "48 components", variant: "secondary"}])
   */
  badges?: Array<{
    label: string;
    variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'error';
  }>;

  /**
   * Heading for the items grid section (e.g., "Available Components")
   */
  itemsHeading?: string;

  /**
   * Array of items to display in the grid
   */
  items: SectionOverviewItem[];

  /**
   * Callback when an item is clicked
   */
  onNavigate: (itemId: string) => void;

  /**
   * Grid column configuration (default: 1 md:2 lg:3)
   */
  gridCols?: string;
}

/**
 * SectionOverview - Reusable template for section overview pages
 *
 * Displays a header with icon, title, badges, description, and a grid of clickable items.
 * Follows the pattern established in BlocksOverview and HooksOverview.
 *
 * @example
 * ```tsx
 * <SectionOverview
 *   title="Components"
 *   icon={<Component className="w-12 h-12" />}
 *   description="48 functional components organized by purpose"
 *   badges={[{ label: "48 components", variant: "secondary" }]}
 *   itemsHeading="Available Categories"
 *   items={componentCategories}
 *   onNavigate={(id) => navigate(id)}
 * />
 * ```
 */
export function SectionOverview({
  title,
  icon,
  description,
  badges = [],
  itemsHeading = 'Available Items',
  items,
  onNavigate,
  gridCols = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
}: SectionOverviewProps) {
  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="text-[var(--color-primary)]">
            {icon}
          </div>
          <div>
            <Heading level={1} className="mb-2">
              {title}
            </Heading>
            {badges.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                {badges.map((badge, index) => (
                  <Badge key={index} variant={badge.variant || 'secondary'}>
                    {badge.label}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
        <Text variant="secondary" size="lg" className="max-w-3xl">
          {description}
        </Text>
      </div>

      {/* Items Grid */}
      {items.length > 0 && (
        <div>
          <Heading level={2} className="mb-4">
            {itemsHeading}
          </Heading>
          <div className={`grid ${gridCols} gap-4`}>
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="text-left group"
              >
                <Card className="p-4 h-full transition-all duration-200 hover:border-[var(--color-primary)] hover:shadow-md cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-[var(--color-primary)] bg-[var(--color-primary)]/10 p-2 rounded-md group-hover:bg-[var(--color-primary)]/20 transition-colors">
                        {item.icon}
                      </div>
                      <Heading
                        level={3}
                        className="text-base group-hover:text-[var(--color-primary)] transition-colors"
                      >
                        {item.label}
                      </Heading>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] group-hover:translate-x-1 transition-all mt-1" />
                  </div>
                  <Text variant="secondary" size="sm" className="line-clamp-2">
                    {item.description}
                  </Text>
                </Card>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * SectionOverviewSimple - Alternative template for informational overview pages
 *
 * Displays explanatory content without navigation items.
 * Uses Cards with structured information for sections that don't have sub-items.
 *
 * @example
 * ```tsx
 * <SectionOverviewSimple
 *   title="Design Tokens"
 *   icon={<Palette className="w-12 h-12" />}
 *   description="Design tokens are the visual design atoms of the design system"
 *   sections={[
 *     {
 *       heading: "What are Design Tokens?",
 *       content: <p>...</p>
 *     }
 *   ]}
 * />
 * ```
 */
export interface SectionOverviewSimpleProps {
  title: string;
  icon: ReactNode;
  description: string;
  badges?: Array<{
    label: string;
    variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'error';
  }>;
  sections: Array<{
    heading: string;
    content: ReactNode;
  }>;
}

export function SectionOverviewSimple({
  title,
  icon,
  description,
  badges = [],
  sections,
}: SectionOverviewSimpleProps) {
  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="text-[var(--color-primary)]">
            {icon}
          </div>
          <div>
            <Heading level={1} className="mb-2">
              {title}
            </Heading>
            {badges.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                {badges.map((badge, index) => (
                  <Badge key={index} variant={badge.variant || 'secondary'}>
                    {badge.label}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
        <Text variant="secondary" size="lg" className="max-w-3xl">
          {description}
        </Text>
      </div>

      {/* Content Sections */}
      <div className="space-y-6">
        {sections.map((section, index) => (
          <Card key={index} className="p-6">
            <h3 className="text-xl font-semibold mb-3 text-[var(--color-text-primary)]">
              {section.heading}
            </h3>
            <div className="text-[var(--color-text-secondary)]">
              {section.content}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
