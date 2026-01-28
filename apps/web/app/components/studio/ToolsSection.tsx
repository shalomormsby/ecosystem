'use client';

import { useState, useEffect } from 'react';
import { Breadcrumbs, type BreadcrumbItemLegacy, Tabs, TabsList, TabsTrigger, TabsContent } from '@thesage/ui';
import { ChartsSections } from './ChartsSections';
import { OpenGraphCardPage } from './pages/blocks/OpenGraphCardPage';
import { BrandBuilder } from './BrandBuilder/BrandBuilder';
import { ToolsOverview } from './ToolsOverview';

type ToolsTab = 'tools-overview' | 'brand-builder' | 'open-graph-card' | 'charts';

interface ToolsSectionProps {
  activeItemId?: string;
  breadcrumbs?: BreadcrumbItemLegacy[];
  onItemChange?: (itemId: string) => void;
}

export function ToolsSection({ activeItemId, breadcrumbs = [], onItemChange }: ToolsSectionProps) {
  const [activeTab, setActiveTab] = useState<ToolsTab>('tools-overview');

  useEffect(() => {
    if (!activeItemId) {
      setActiveTab('tools-overview');
    } else if (activeItemId === 'brand-builder') {
      setActiveTab('brand-builder');
    } else if (activeItemId.startsWith('charts') || activeItemId === 'area-chart' || activeItemId === 'bar-chart' || activeItemId === 'line-chart' || activeItemId === 'pie-chart') {
      setActiveTab('charts');
    } else if (activeItemId === 'open-graph-card') {
      setActiveTab('open-graph-card');
    } else {
      setActiveTab('tools-overview');
    }
  }, [activeItemId]);

  const handleTabChange = (value: string) => {
    const tab = value as ToolsTab;
    setActiveTab(tab);
    onItemChange?.(tab);
  };

  return (
    <div className="space-y-8 w-full min-w-0">
      <div className="mb-8">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 1 && (
          <div className="mb-4">
            <Breadcrumbs variant="subtle" items={breadcrumbs} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mt-4">
        {activeTab === 'tools-overview' && <ToolsOverview onNavigate={handleTabChange} />}
        {activeTab === 'brand-builder' && <BrandBuilder />}
        {activeTab === 'open-graph-card' && <OpenGraphCardPage />}
        {activeTab === 'charts' && (
          <ChartsSections
            activeItemId={activeItemId}
            breadcrumbs={[]}
            onItemChange={onItemChange}
          />
        )}
      </div>
    </div>
  );
}
