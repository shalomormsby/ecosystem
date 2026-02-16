import { notFound } from 'next/navigation';
import { SectionRenderer } from '../SectionRenderer';
import {
  VALID_SECTIONS,
  SECTION_ALIASES,
  sectionLabel,
  type Section,
} from '../route-config';

export async function generateStaticParams() {
  return VALID_SECTIONS.map((section) => ({ section }));
}

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const resolved = SECTION_ALIASES[section] || section;
  const label = sectionLabel(resolved);
  return {
    title: label,
    description: `${label} documentation for Sage Design Engine.`,
  };
}

export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;

  // Resolve aliases
  const resolved = SECTION_ALIASES[section] || section;

  if (!VALID_SECTIONS.includes(resolved as Section)) {
    notFound();
  }

  return <SectionRenderer section={resolved} />;
}
