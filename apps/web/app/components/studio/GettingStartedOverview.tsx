'use client';

import { BookOpen, FileText, Code2, Zap, Users } from 'lucide-react';
import { SectionOverview, type SectionOverviewItem } from './SectionOverview';

interface GettingStartedOverviewProps {
  onNavigate: (itemId: string) => void;
}

const GETTING_STARTED_ITEMS: SectionOverviewItem[] = [
  {
    id: 'overview',
    label: 'Overview',
    description: 'Introduction to The Sage design system philosophy, features, and getting started.',
    icon: <BookOpen className="w-6 h-6" />,
  },
  {
    id: 'architecture',
    label: 'Architecture',
    description: 'Learn about the technical architecture, file organization, and design decisions.',
    icon: <FileText className="w-6 h-6" />,
  },
  {
    id: 'adding-components',
    label: 'Adding Components',
    description: 'Step-by-step workflows for methodology, modifying, and troubleshooting components.',
    icon: <Code2 className="w-6 h-6" />,
  },
  {
    id: 'common-patterns',
    label: 'Common Patterns',
    description: 'Frequently used patterns and best practices for building with The Sage.',
    icon: <Zap className="w-6 h-6" />,
  },
  {
    id: 'contributing',
    label: 'Contributing',
    description: 'Guidelines for contributing to The Sage design system and ecosystem.',
    icon: <Users className="w-6 h-6" />,
  },
];

export function GettingStartedOverview({ onNavigate }: GettingStartedOverviewProps) {
  return (
    <SectionOverview
      title="Getting Started"
      icon={<BookOpen className="w-12 h-12" />}
      description="Welcome to The Sage design system. Learn how to use, extend, and contribute to this philosophy-driven design system built on human-centered principles."
      badges={[
        { label: 'Documentation', variant: 'secondary' },
        { label: 'Philosophy-Driven', variant: 'outline' },
      ]}
      itemsHeading="Documentation"
      items={GETTING_STARTED_ITEMS}
      onNavigate={onNavigate}
    />
  );
}
