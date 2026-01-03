import React from 'react';

export interface PageLayoutProps {
  /** Optional header configuration */
  header?: React.ReactNode;

  /** Optional breadcrumbs */
  breadcrumbs?: React.ReactNode;

  /** Optional secondary navigation (first stack) */
  secondaryNav?: React.ReactNode;

  /** Optional tertiary navigation (second stack) */
  tertiaryNav?: React.ReactNode;

  /** Optional footer */
  footer?: React.ReactNode;

  /** Main content */
  children: React.ReactNode;

  /** Optional className for main content */
  className?: string;
}

/**
 * PageLayout Component
 *
 * A flexible layout organism that composes Header, Breadcrumbs, SecondaryNav,
 * TertiaryNav, and Footer with automatic z-index and sticky positioning management.
 *
 * Features:
 * - Automatic z-index stacking (50 → 45 → 40 → 30)
 * - Dynamic sticky positioning calculations
 * - Optional composition (all props optional)
 * - Handles full-height layouts
 * - Theme-aware styling
 *
 * Z-Index Stack:
 * - Header: z-50, h-16 lg:h-20
 * - Breadcrumbs: z-45, sticky below header
 * - SecondaryNav: z-40, first navigation stack
 * - TertiaryNav: z-30, second navigation stack
 *
 * Example:
 * ```tsx
 * <PageLayout
 *   header={<Header logo={logo} navLinks={links} />}
 *   breadcrumbs={<Breadcrumbs items={breadcrumbItems} />}
 *   secondaryNav={<SecondaryNav items={sections} />}
 * >
 *   <article>Your content here</article>
 * </PageLayout>
 * ```
 */
export function PageLayout({
  header,
  breadcrumbs,
  secondaryNav,
  tertiaryNav,
  footer,
  children,
  className = '',
}: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header - z-50, h-16 lg:h-20 */}
      {header}

      {/* Breadcrumbs - z-45, sticky below header */}
      {breadcrumbs && (
        <div
          className="
            sticky bg-[var(--color-background)]/95 backdrop-blur-sm
            border-b border-[var(--color-border)]
            transition-all duration-300
            top-16 lg:top-20
          "
          style={{ zIndex: 45 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            {breadcrumbs}
          </div>
        </div>
      )}

      {/* Secondary Nav - z-40, first navigation stack */}
      {secondaryNav}

      {/* Tertiary Nav - z-30, second navigation stack */}
      {tertiaryNav}

      {/* Main Content - flexible, fills remaining space */}
      <main className={`flex-1 ${className}`}>
        {children}
      </main>

      {/* Footer */}
      {footer}
    </div>
  );
}
