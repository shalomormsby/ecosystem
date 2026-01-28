'use client';

import { useState, useEffect } from 'react';
import { Breadcrumbs, type BreadcrumbItemLegacy } from '@thesage/ui';

import { OverviewSection } from './OverviewSection';
import { ArchitectureSection } from './ArchitectureSection';
import { AddingComponentsSection } from './AddingComponentsSection';
import { CommonPatternsSection } from './CommonPatternsSection';
import { ContributingSection } from './ContributingSection';

interface GettingStartedSectionProps {
  breadcrumbs?: BreadcrumbItemLegacy[];
  activeItemId?: string;
  onItemChange?: (itemId: string) => void;
}

export function GettingStartedSection({
  breadcrumbs,
  activeItemId,
  onItemChange,
}: GettingStartedSectionProps) {
  const [selectedItem, setSelectedItem] = useState(activeItemId || 'getting-started-overview');

  // Sync selectedItem with activeItemId when it changes (from sidebar navigation)
  useEffect(() => {
    if (activeItemId) {
      setSelectedItem(activeItemId);
    } else {
      // If no activeItemId, show the overview
      setSelectedItem('getting-started-overview');
    }
  }, [activeItemId]);

  const handleItemChange = (id: string) => {
    setSelectedItem(id);
    onItemChange?.(id);
  };

  return (
    <div className="space-y-8 w-full min-w-0">

      {/* Content */}
      <div className="mt-4">
        {/* Getting Started Overview - shows when section is clicked */}
        {(selectedItem === 'getting-started-overview' || selectedItem === 'overview' || selectedItem === 'getting-started') && (
          <OverviewSection />
        )}

        {/* Individual pages */}
        {selectedItem === 'architecture' && <ArchitectureSection breadcrumbs={breadcrumbs} />}
        {selectedItem === 'adding-components' && (
          <AddingComponentsSection breadcrumbs={breadcrumbs} activeItemId={activeItemId} />
        )}
        {selectedItem === 'common-patterns' && <CommonPatternsSection breadcrumbs={breadcrumbs} />}
        {selectedItem === 'contributing' && <ContributingSection breadcrumbs={breadcrumbs} />}
      </div>
    </div >
  );
}
