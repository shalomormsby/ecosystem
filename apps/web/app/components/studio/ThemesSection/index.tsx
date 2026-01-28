'use client';

import { useState, useEffect } from 'react';
import { Breadcrumbs, type BreadcrumbItemLegacy } from '@thesage/ui';
import { PalettesTab } from './PalettesTab';
import { CustomizerTab } from './CustomizerTab';
import { TypographyTab } from './TypographyTab';
import { TypographyPlayground } from '../pages/typography/TypographyPlayground';
import { ThemesOverview } from '../ThemesOverview';

type ThemeTab = 'themes-overview' | 'palettes' | 'customizer' | 'typography' | 'typography-playground';

interface ThemesSectionProps {
    activeItemId?: string;
    breadcrumbs?: BreadcrumbItemLegacy[];
    onItemChange?: (itemId: string) => void;
}

export function ThemesSection({ activeItemId, breadcrumbs, onItemChange }: ThemesSectionProps) {
    const [activeTab, setActiveTab] = useState<ThemeTab>('themes-overview');

    // Update active tab when activeItemId changes
    useEffect(() => {
        if (activeItemId && ['palettes', 'customizer', 'typography', 'typography-playground'].includes(activeItemId)) {
            setActiveTab(activeItemId as ThemeTab);
        } else if (!activeItemId || activeItemId === 'themes') {
            setActiveTab('themes-overview');
        }
    }, [activeItemId]);

    const handleTabChange = (id: string) => {
        setActiveTab(id as ThemeTab);
        onItemChange?.(id);
    };

    return (
        <div className="w-full min-w-0">
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
                {activeTab === 'themes-overview' && <ThemesOverview onNavigate={handleTabChange} />}
                {activeTab === 'palettes' && <PalettesTab />}
                {activeTab === 'customizer' && <CustomizerTab />}
                {activeTab === 'typography' && <TypographyTab onNavigateToPlayground={() => onItemChange?.('typography-playground')} />}
                {activeTab === 'typography-playground' && <TypographyPlayground />}
            </div>
        </div>
    );
}
