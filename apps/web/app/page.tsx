'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header, Button, BRAND } from '@thesage/ui';
import { Github } from 'lucide-react';
import { SageHero } from './components/landing/SageHero';
import { LayerVisualization } from './components/landing/LayerVisualization';
import { FeatureBento } from './components/landing/FeatureBento';
import { BuilderSection } from './components/landing/BuilderSection';
import { CallToAction } from './components/landing/CallToAction';

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    if (window.location.hash) {
      // Redirect hash-based URLs to path-based: /#actions/button → /docs/actions/button
      const hash = window.location.hash.slice(1);
      router.replace(`/docs/${hash}`);
    }
  }, [router]);

  return (
    <main className="min-h-screen bg-[var(--color-background)] selection:bg-[var(--color-primary)] selection:text-white">
      <Header
        logo={<span className="text-xl font-bold tracking-tight">{BRAND.productName}</span>}
        navAlignment="right"
        navLinks={[
          { label: 'Documentation', href: '/docs' },
          { label: 'Components', href: '/docs/components' },
          { label: 'Themes', href: '/docs/themes' },
        ]}
        actions={
          <Button
            variant="outline"
            size="sm"
            asChild
            className="gap-2"
          >
            <a
              href="https://github.com/shalomormsby/ecosystem"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-4 h-4" />
              Star on GitHub
            </a>
          </Button>
        }
      />
      <SageHero />
      <LayerVisualization />
      <BuilderSection />
      <FeatureBento />
      <CallToAction />
    </main>
  );
}
