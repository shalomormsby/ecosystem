'use client';

import { useState } from 'react';
import { Card, Button, Header, SecondaryNav } from '@ecosystem/design-system';

export function OrganismsSection() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2 text-[var(--color-text-primary)]">
          Organisms
        </h2>
        <p className="text-lg text-[var(--color-text-secondary)] mb-2">
          <strong>Distinct Sections:</strong> Complex compositions of molecules and/or atoms that form a discrete, functional section of an interface. Often manage state or layout for children.
        </p>
        <p className="text-base text-[var(--color-text-muted)]">
          Comprehensive, interactive sections that compose multiple components together.
        </p>
      </div>

      {/* Header Component */}
      <section className="space-y-6">
        <div>
          <h3 className="text-2xl font-semibold mb-2 text-[var(--color-text-primary)]">
            Header
          </h3>
          <Card className="p-6">
            <p className="text-[var(--color-text-primary)] mb-4">
              Sticky navigation header with glass morphism on scroll. Includes responsive mobile menu with full-screen overlay.
            </p>
            <div className="space-y-4">
              <div className="text-sm text-[var(--color-text-secondary)]">
                <strong>Key Features:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Dropdown menus with hover (desktop) and tap-to-expand (mobile) support</li>
                  <li>Active state indicator with underline (desktop) and primary color (mobile)</li>
                  <li>Sticky positioning with optional glass morphism effect on scroll</li>
                  <li>Responsive mobile menu with hamburger toggle</li>
                  <li>Full-screen mobile overlay navigation</li>
                  <li>Respects motion preferences (prefers-reduced-motion)</li>
                  <li>Keyboard accessible with focus indicators and aria-current</li>
                  <li>Theme-aware colors using CSS custom properties</li>
                </ul>
              </div>
              <div className="mt-4 p-3 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
                <p className="text-xs text-[var(--color-text-muted)]">
                  <strong>Note:</strong> In the preview below, "Products" has a dropdown menu with nested items. Hover over it (desktop) or tap it (mobile) to see the dropdown. "Product B" has <code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">active: true</code> to demonstrate nested active states.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Live Preview */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Live Preview
          </h4>
          <Card className="p-0 overflow-hidden">
            <div className="relative bg-[var(--color-background)] min-h-[400px]">
              <Header
                sticky={false}
                glassOnScroll={false}
                logo={
                  <a href="#" className="font-semibold text-lg text-[var(--color-text-primary)]">
                    Brand
                  </a>
                }
                navLinks={[
                  { label: 'Features', href: '#features' },
                  {
                    label: 'Products',
                    active: true,
                    children: [
                      { label: 'Product A', href: '#product-a' },
                      { label: 'Product B', href: '#product-b', active: true },
                      { label: 'Product C', href: '#product-c' },
                    ]
                  },
                  { label: 'About', href: '#about' },
                  { label: 'Contact', href: '#contact' },
                ]}
                actions={
                  <>
                    <a
                      href="#signin"
                      className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                    >
                      Sign In
                    </a>
                    <Button variant="primary" size="sm">
                      Get Started
                    </Button>
                  </>
                }
              />
              <div className="pt-20 px-8 pb-8">
                <div className="max-w-3xl mx-auto text-center">
                  <h1 className="text-3xl font-bold mb-4 text-[var(--color-text-primary)]">
                    Header Preview
                  </h1>
                  <p className="text-[var(--color-text-secondary)]">
                    This is a demo of the Header component. On mobile devices, click the hamburger menu to see the full-screen navigation overlay.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Code Example */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Code Example
          </h4>
          <Card className="p-6 bg-[var(--color-surface)]">
            <pre className="text-sm text-[var(--color-text-secondary)] overflow-x-auto">
              <code>{`<Header
  logo={
    <a href="/" className="font-semibold text-lg">
      Brand
    </a>
  }
  navLinks={[
    { label: 'Features', href: '/features' },
    {
      label: 'Products',
      active: true,
      children: [
        { label: 'Product A', href: '/products/a' },
        { label: 'Product B', href: '/products/b', active: true },
        { label: 'Product C', href: '/products/c' },
      ]
    },
    { label: 'About', href: '/about' },
  ]}
  actions={
    <>
      <a href="/signin">Sign In</a>
      <Button variant="primary" size="sm">
        Get Started
      </Button>
    </>
  }
  glassOnScroll={true}
  sticky={true}
/>`}</code>
            </pre>
          </Card>
        </div>
      </section>

      {/* SecondaryNav Component */}
      <section className="space-y-6">
        <div>
          <h3 className="text-2xl font-semibold mb-2 text-[var(--color-text-primary)]">
            SecondaryNav
          </h3>
          <Card className="p-6">
            <p className="text-[var(--color-text-primary)] mb-4">
              Secondary sticky navigation designed to sit below a primary sticky header. Commonly used for section/tab navigation within a page.
            </p>
            <div className="space-y-4">
              <div className="text-sm text-[var(--color-text-secondary)]">
                <strong>Key Features:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Sticky positioning below primary header (top-16 lg:top-20)</li>
                  <li>Z-index coordination (z-40, below header's z-50)</li>
                  <li>Glass morphism with backdrop blur</li>
                  <li>Horizontal scrollable on mobile</li>
                  <li>Active state with primary color background</li>
                  <li>Keyboard accessible with focus indicators</li>
                  <li>Theme-aware colors using CSS custom properties</li>
                </ul>
              </div>
              <div className="mt-4 p-3 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
                <p className="text-xs text-[var(--color-text-muted)]">
                  <strong>Pattern:</strong> The SecondaryNav uses <code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">top-16 lg:top-20</code> to position exactly below the Header's height (h-16 lg:h-20), creating a seamless stacked sticky navigation pattern.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Live Preview */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Live Preview
          </h4>
          <Card className="p-0 overflow-hidden">
            <SecondaryNavDemo />
          </Card>
        </div>

        {/* Code Example */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Code Example
          </h4>
          <Card className="p-6 bg-[var(--color-surface)]">
            <pre className="text-sm text-[var(--color-text-secondary)] overflow-x-auto">
              <code>{`const [activeSection, setActiveSection] = useState('overview');

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'details', label: 'Details' },
  { id: 'settings', label: 'Settings' },
];

<SecondaryNav
  items={sections}
  activeId={activeSection}
  onItemChange={setActiveSection}
/>`}</code>
            </pre>
          </Card>
        </div>
      </section>
    </div>
  );
}

// Demo component for SecondaryNav
function SecondaryNavDemo() {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: 'Features' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'docs', label: 'Documentation' },
    { id: 'api', label: 'API Reference' },
  ];

  return (
    <div className="relative bg-[var(--color-background)] min-h-[300px]">
      <div className="sticky top-0">
        <SecondaryNav
          items={sections}
          activeId={activeSection}
          onItemChange={setActiveSection}
        />
      </div>
      <div className="p-8">
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">
          {sections.find(s => s.id === activeSection)?.label}
        </h1>
        <p className="text-[var(--color-text-secondary)]">
          This is the content for the {sections.find(s => s.id === activeSection)?.label} section.
          In a real application, this would show different content based on the active tab.
        </p>
      </div>
    </div>
  );
}
