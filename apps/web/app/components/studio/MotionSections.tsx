'use client';

import { useState, useEffect } from 'react';
import { Breadcrumbs, type BreadcrumbItemLegacy } from '@thesage/ui';
import { MotionOverview } from './MotionOverview';

// Landing Pages
import { PrimitivesSection } from './PrimitivesSection';
import { TextEffectsSection } from './TextEffectsSection';
import { BackgroundsSection } from './BackgroundsSection';
import { CursorsSection } from './CursorsSection';
import { MicroInteractionsSection } from './MicroInteractionsSection';

// Detail Pages
import { WarpSpeedPage } from './pages/motion/WarpSpeedPage';
import { FaultyTerminalPage } from './pages/motion/FaultyTerminalPage';
import { SplashCursorPage } from './pages/motion/SplashCursorPage';
import { TargetCursorPage } from './pages/motion/TargetCursorPage';
import { VariableWeightPage } from './pages/motion/VariableWeightPage';
import { TypewriterPage } from './pages/motion/TypewriterPage';
import { MagneticPage } from './pages/motion/MagneticPage';
import { OrbBackgroundPage } from './pages/motion/OrbBackgroundPage';

type MotionTab =
  | 'overview' | 'primitives' | 'duration' | 'easing'
  | 'text-effects' | 'variable-weight' | 'typewriter'
  | 'backgrounds' | 'warp-speed' | 'faulty-terminal' | 'orb-background'
  | 'cursors' | 'target-cursor' | 'splash-cursor'
  | 'micro-interactions' | 'magnetic';

interface MotionSectionsProps {
  activeItemId?: string;
  breadcrumbs?: BreadcrumbItemLegacy[];
  onItemChange?: (itemId: string) => void;
}

export function MotionSections({ activeItemId, breadcrumbs, onItemChange }: MotionSectionsProps) {
  const [activeTab, setActiveTab] = useState<MotionTab>('overview');

  // Update active tab when activeItemId changes
  useEffect(() => {
    if (activeItemId) {
      if (activeItemId === 'motion') {
        setActiveTab('overview');
      } else {
        // We cast here assuming the navigation tree provides valid IDs that match our MotionTab type
        setActiveTab(activeItemId as MotionTab);
      }
    } else {
      setActiveTab('overview');
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
        {/* Overview */}
        {activeTab === 'overview' && <MotionOverview onNavigate={(id) => onItemChange?.(id)} />}

        {/* Primitives */}
        {activeTab === 'primitives' && <PrimitivesSection />}
        {activeTab === 'duration' && <PrimitivesSection />} {/* Redirect old duration tab */}
        {activeTab === 'easing' && <PrimitivesSection />} {/* Redirect old easing tab */}

        {/* Text Effects */}
        {activeTab === 'text-effects' && <TextEffectsSection />}
        {activeTab === 'variable-weight' && <VariableWeightPage />}
        {activeTab === 'typewriter' && <TypewriterPage />}

        {/* Backgrounds */}
        {activeTab === 'backgrounds' && <BackgroundsSection />}
        {activeTab === 'warp-speed' && <WarpSpeedPage />}
        {activeTab === 'faulty-terminal' && <FaultyTerminalPage />}
        {activeTab === 'orb-background' && <OrbBackgroundPage />}

        {/* Cursors */}
        {activeTab === 'cursors' && <CursorsSection />}
        {activeTab === 'target-cursor' && <TargetCursorPage />}
        {activeTab === 'splash-cursor' && <SplashCursorPage />}

        {/* Micro Interactions */}
        {activeTab === 'micro-interactions' && <MicroInteractionsSection />}
        {activeTab === 'magnetic' && <MagneticPage />}
      </div>
    </div>
  );
}
