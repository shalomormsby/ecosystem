'use client';

import { useState, useEffect } from 'react';
import { Breadcrumbs, type BreadcrumbItemLegacy, Tabs, TabsList, TabsTrigger, TabsContent } from '@thesage/ui';
import { ChartsSections } from './ChartsSections';
import { OpenGraphCardPage } from './pages/blocks/OpenGraphCardPage';

type ToolsTab = 'open-graph-card' | 'charts';

interface ToolsSectionProps {
  activeItemId?: string;
  breadcrumbs?: BreadcrumbItemLegacy[];
  onItemChange?: (itemId: string) => void;
}

export function ToolsSection({ activeItemId = 'open-graph-card', breadcrumbs = [], onItemChange }: ToolsSectionProps) {
  const [activeTab, setActiveTab] = useState<ToolsTab>('open-graph-card');

  useEffect(() => {
    if (activeItemId.startsWith('charts') || activeItemId === 'area-chart' || activeItemId === 'bar-chart' || activeItemId === 'line-chart' || activeItemId === 'pie-chart') {
      setActiveTab('charts');
    } else if (activeItemId === 'open-graph-card') {
      setActiveTab('open-graph-card');
    }
  }, [activeItemId]);

  const handleTabChange = (value: string) => {
    const tab = value as ToolsTab;
    setActiveTab(tab);
    onItemChange?.(tab);
  };

  // If activeTab is charts, delegate to ChartsSections
  if (activeTab === 'charts') {
    return (
      <div className="max-w-5xl mx-auto">
        <Breadcrumbs items={breadcrumbs} />
        <Tabs value={activeTab} onValueChange={handleTabChange} className="mt-6">
          <TabsList>
            <TabsTrigger value="brand-builder">Brand Builder</TabsTrigger>
            <TabsTrigger value="charts">Charts</TabsTrigger>
          </TabsList>
          <TabsContent value="charts" className="mt-6">
            <ChartsSections
              activeItemId={activeItemId}
              breadcrumbs={breadcrumbs}
              onItemChange={onItemChange}
            />
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <Breadcrumbs items={breadcrumbs} />

      <Tabs value={activeTab} onValueChange={handleTabChange} className="mt-6">
        <TabsList>
          <TabsTrigger value="open-graph-card">Open Graph Card</TabsTrigger>
          <TabsTrigger value="charts">Charts</TabsTrigger>
        </TabsList>

        <TabsContent value="open-graph-card" className="mt-6">
          <OpenGraphCardPage />
        </TabsContent>
      </Tabs>
    </div>
  );
}
