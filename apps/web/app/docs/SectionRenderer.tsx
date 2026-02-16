'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { generateBreadcrumbs, type BreadcrumbItemLegacy } from '@thesage/ui';
import { OverviewSection } from '../components/studio/OverviewSection';
import { ArchitectureSection } from '../components/studio/ArchitectureSection';
import { AddingComponentsSection } from '../components/studio/AddingComponentsSection';
import { CommonPatternsSection } from '../components/studio/CommonPatternsSection';
import { ContributingSection } from '../components/studio/ContributingSection';
import { TokensSection } from '../components/studio/TokensSection';
import { ThemesSection } from '../components/studio/ThemesSection';
import { ComponentsSection } from '../components/studio/ComponentsSection';
import { BlocksSection } from '../components/studio/BlocksSection';
import { HooksSection } from '../components/studio/HooksSection';
import { TemplatesSection } from '../components/studio/TemplatesSection';
import { ChartsSections } from '../components/studio/ChartsSections';
import { MotionSections } from '../components/studio/MotionSections';
import { McpSection } from '../components/studio/McpSection';
import { ToolsSection } from '../components/studio/ToolsSection';
import { DragDropPage } from '../components/studio/pages/forms/DragDropPage';
import { ComponentsDashboard } from '../components/studio/ComponentsDashboard';
import { GettingStartedSection } from '../components/studio/GettingStartedSection';
import { COMPONENT_CATEGORIES, routeConfig, type Section } from './route-config';

interface SectionRendererProps {
  section: string;
  item?: string;
}

export function SectionRenderer({ section, item }: SectionRendererProps) {
  const router = useRouter();
  const activeItemId = item || section;

  // Generate breadcrumbs from the current path (reusing existing utility)
  const breadcrumbs: BreadcrumbItemLegacy[] = useMemo(() => {
    const hash = item && item !== section
      ? `#${section}/${item}`
      : `#${section}`;
    return generateBreadcrumbs(hash, routeConfig);
  }, [section, item]);

  // Navigate to a different item within the current section
  const handleItemChange = (itemId: string) => {
    router.push(`/docs/${section}/${itemId}`);
  };

  // Navigate to a different section (used by ComponentsDashboard)
  const handleNavigate = (targetSection: string, targetItem?: string) => {
    const path = targetItem && targetItem !== targetSection
      ? `/docs/${targetSection}/${targetItem}`
      : `/docs/${targetSection}`;
    router.push(path);
  };

  const isComponentSection = COMPONENT_CATEGORIES.includes(section as Section);

  // Getting Started
  if (section === 'getting-started') {
    return (
      <GettingStartedSection
        breadcrumbs={breadcrumbs}
        activeItemId={activeItemId}
        onItemChange={handleItemChange}
      />
    );
  }

  // Overview
  if (section === 'overview') return <OverviewSection />;

  // Architecture
  if (section === 'architecture') return <ArchitectureSection breadcrumbs={breadcrumbs} />;

  // Adding Components
  if (section === 'adding-components') {
    return (
      <AddingComponentsSection
        breadcrumbs={breadcrumbs}
        activeItemId={activeItemId}
      />
    );
  }

  // Common Patterns
  if (section === 'common-patterns') return <CommonPatternsSection breadcrumbs={breadcrumbs} />;

  // Contributing
  if (section === 'contributing') return <ContributingSection breadcrumbs={breadcrumbs} />;

  // MCP Server
  if (section === 'mcp-server') {
    return (
      <McpSection
        breadcrumbs={breadcrumbs}
        activeItemId={activeItemId}
        onItemChange={handleItemChange}
      />
    );
  }

  // Tokens
  if (section === 'tokens') {
    return (
      <TokensSection
        activeItemId={activeItemId}
        breadcrumbs={breadcrumbs}
        onItemChange={handleItemChange}
      />
    );
  }

  // Themes
  if (section === 'themes') {
    return (
      <ThemesSection
        activeItemId={activeItemId}
        breadcrumbs={breadcrumbs}
        onItemChange={handleItemChange}
      />
    );
  }

  // Components Dashboard
  if (section === 'components') {
    return (
      <ComponentsDashboard
        breadcrumbs={breadcrumbs}
        onNavigate={handleNavigate}
      />
    );
  }

  // Functional Component Sections (actions, forms, navigation, overlays, feedback, data-display, layout)
  if (isComponentSection) {
    // Special case: Drag & Drop has custom page
    if (section === 'forms' && activeItemId === 'drag-drop') {
      return <DragDropPage />;
    }
    return (
      <ComponentsSection
        activeItemId={activeItemId}
        category={section}
        breadcrumbs={breadcrumbs}
        onItemChange={handleItemChange}
      />
    );
  }

  // Blocks
  if (section === 'blocks') {
    return (
      <BlocksSection
        activeItemId={activeItemId}
        breadcrumbs={breadcrumbs}
        onItemChange={handleItemChange}
      />
    );
  }

  // Hooks
  if (section === 'hooks') {
    return (
      <HooksSection
        activeItemId={activeItemId}
        breadcrumbs={breadcrumbs}
        onItemChange={handleItemChange}
      />
    );
  }

  // Templates
  if (section === 'templates') {
    return (
      <TemplatesSection
        activeItemId={activeItemId}
        breadcrumbs={breadcrumbs}
        onItemChange={handleItemChange}
      />
    );
  }

  // Charts
  if (section === 'charts') {
    return (
      <ChartsSections
        activeItemId={activeItemId}
        breadcrumbs={breadcrumbs}
        onItemChange={handleItemChange}
      />
    );
  }

  // Motion
  if (section === 'motion') {
    return (
      <MotionSections
        activeItemId={activeItemId}
        breadcrumbs={breadcrumbs}
        onItemChange={handleItemChange}
      />
    );
  }

  // Tools
  if (section === 'tools') {
    return (
      <ToolsSection
        activeItemId={activeItemId}
        breadcrumbs={breadcrumbs}
        onItemChange={handleItemChange}
      />
    );
  }

  return null;
}
