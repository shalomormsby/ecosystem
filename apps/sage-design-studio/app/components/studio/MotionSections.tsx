'use client';

import { useState, useEffect } from 'react';
import { Breadcrumbs, type BreadcrumbItemLegacy } from '@sds/ui';
import { PrimitivesSection } from './PrimitivesSection';
import { TextEffectsSection } from './TextEffectsSection';
import { BackgroundsSection } from './BackgroundsSection';
import { CursorsSection } from './CursorsSection';
import { MicroInteractionsSection } from './MicroInteractionsSection';

type MotionTab = 'primitives' | 'text-effects' | 'backgrounds' | 'cursors' | 'micro-interactions';

interface MotionSectionsProps {
  activeItemId?: string;
  breadcrumbs?: BreadcrumbItemLegacy[];
  onItemChange?: (itemId: string) => void;
}

export function MotionSections({ activeItemId, breadcrumbs, onItemChange }: MotionSectionsProps) {
  const [activeTab, setActiveTab] = useState<MotionTab>('primitives');

  // Update active tab when activeItemId changes
  useEffect(() => {
    if (activeItemId && [
      'primitives',
      'text-effects',
      'backgrounds',
      'cursors',
      'micro-interactions'
    ].includes(activeItemId)) {
      setActiveTab(activeItemId as MotionTab);
    }
  }, [activeItemId]);

  return (
    <div>
      <div className="mb-8">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 1 && (
          <div className="mb-4">
            <Breadcrumbs variant="subtle" items={breadcrumbs} />
          </div>
        )}
      </div>

      {/* Tab Content with spacing for sticky nav */}
      <div className="mt-4">
        {activeTab === 'primitives' && <PrimitivesSection />}
        {activeTab === 'text-effects' && <TextEffectsSection />}
        {activeTab === 'backgrounds' && <BackgroundsSection />}
        {activeTab === 'cursors' && <CursorsSection />}
        {activeTab === 'micro-interactions' && <MicroInteractionsSection />}
      </div>
    </div>
  );
}
