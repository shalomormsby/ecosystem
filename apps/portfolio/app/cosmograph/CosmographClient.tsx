'use client';

import NextLink from 'next/link';
import { PageTemplate } from '@ecosystem/design-system';
import { ecosystemNavigation } from '@/lib/navigation';
import { NavigationFallback } from '@/components/cosmograph/NavigationFallback';
import type { Node } from '@/lib/content/types';

interface CosmographClientProps {
  nodes: Node[];
}

export function CosmographClient({ nodes }: CosmographClientProps) {
  return (
    <PageTemplate
      header={{
        logo: (
          <NextLink href="/" className="font-header font-bold text-lg text-foreground">
            Shalom Ormsby
          </NextLink>
        ),
        navLinks: ecosystemNavigation,
        sticky: true,
      }}
      title="Cosmograph"
      subtitle="Interactive network visualization exploring connections between thoughts, projects, and ideas"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Cosmograph' },
      ]}
      showCustomizer={false}
      variant="wide"
    >
      <NavigationFallback nodes={nodes} />
    </PageTemplate>
  );
}
