'use client';

import { useState } from 'react';
import { TertiaryNav } from '@ecosystem/design-system';
import { ComponentPlayground } from './ComponentPlayground';
import { componentRegistry } from '../../lib/component-registry';

export function ComponentsSection() {
  const [selectedComponent, setSelectedComponent] = useState<string>('Button');

  const components = Object.keys(componentRegistry);
  const componentItems = components.map(name => ({ id: name, label: name }));

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2 text-[var(--color-text-primary)]">
          Atoms
        </h2>
        <p className="text-lg text-[var(--color-text-secondary)] mb-2">
          <strong>Elemental Independence:</strong> Elements that cannot be broken down further without losing their core identity or function.
        </p>
        <p className="text-base text-[var(--color-text-muted)]">
          Interactive component playground. Adjust props and see live changes.
        </p>
      </div>

      {/* Component Selector using TertiaryNav */}
      <TertiaryNav
        items={componentItems}
        activeId={selectedComponent}
        onItemChange={setSelectedComponent}
      />

      {/* Component Playground */}
      {selectedComponent && (
        <ComponentPlayground
          componentName={selectedComponent}
          config={componentRegistry[selectedComponent]}
        />
      )}
    </div>
  );
}
