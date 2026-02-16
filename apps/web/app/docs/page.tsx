'use client';

import { OverviewSection } from '../components/studio/OverviewSection';

export default function DocsPage() {
  // Hash redirects are handled by DocsShell in the layout.
  // This page renders the overview/landing content for /docs (no path suffix).
  return <OverviewSection />;
}
