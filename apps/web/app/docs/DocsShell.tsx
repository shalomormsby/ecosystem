'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { NavigationSidebar } from '../components/NavigationSidebar';
import { SearchCommandPalette } from '../components/SearchCommandPalette';
import { TableOfContents } from '../components/TableOfContents';
import { ModeSwitcher } from '../components/ModeSwitcher';
import { VALID_SECTIONS, SECTION_ALIASES, type Section } from './route-config';

export function DocsShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Derive active section/item from the URL pathname
  // /docs → overview, /docs/actions → actions, /docs/actions/button → actions/button
  const pathParts = pathname.replace('/docs', '').split('/').filter(Boolean);
  const activeSection = pathParts[0] || 'overview';
  const activeItemId = pathParts[1] || pathParts[0] || 'overview';

  // Redirect hash-based URLs to path-based URLs (backwards compatibility)
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      router.replace(`/docs/${hash}`);
    }
  }, [router]);

  // Cmd+K / Ctrl+K to toggle search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle navigation from search results
  const handleSearchNavigate = (path: string) => {
    // Hash-prefixed path from legacy search index entries
    if (path.startsWith('#')) {
      const cleaned = path.slice(1);
      router.push(`/docs/${cleaned}`);
      setSearchOpen(false);
      return;
    }

    // Path-based (e.g., /docs/actions/button)
    if (path.startsWith('/docs/')) {
      router.push(path);
      setSearchOpen(false);
      return;
    }

    // Simple section name (e.g., 'overview')
    if (path === 'overview') {
      router.push('/docs');
      setSearchOpen(false);
      return;
    }

    // Legacy dash-separated format (e.g., 'tokens-colors')
    const parts = path.split('-');
    const potentialSection = parts[0];
    if (VALID_SECTIONS.includes(potentialSection as Section)) {
      const itemId = parts.slice(1).join('-');
      const url = itemId ? `/docs/${potentialSection}/${itemId}` : `/docs/${potentialSection}`;
      router.push(url);
      setSearchOpen(false);
      return;
    }

    // Handle known compound sections like 'adding-components', 'data-display'
    for (const section of VALID_SECTIONS) {
      if (path.startsWith(section)) {
        const itemId = path.slice(section.length + 1); // +1 for the dash
        const url = itemId ? `/docs/${section}/${itemId}` : `/docs/${section}`;
        router.push(url);
        setSearchOpen(false);
        return;
      }
    }

    // Fallback: try as-is
    router.push(`/docs/${path}`);
    setSearchOpen(false);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] flex">
      <NavigationSidebar
        activeSection={activeSection}
        activeItemId={activeItemId}
        onNavigate={(section, itemId) => {
          // Resolve aliases
          const resolved = SECTION_ALIASES[section] || section;
          const path =
            itemId && itemId !== resolved
              ? `/docs/${resolved}/${itemId}`
              : `/docs/${resolved}`;
          router.push(path);
          setSidebarOpen(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSearchOpen={() => setSearchOpen(true)}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <main className="flex-1 min-h-screen flex flex-col lg:ml-[280px] min-w-0 w-full max-w-[100vw]">
        {/* Mobile Menu Button - Floating */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden fixed top-4 left-4 z-30 p-2 text-[var(--color-text-primary)] bg-[var(--color-surface)] hover:bg-[var(--color-hover)] border border-[var(--color-border)] rounded-lg transition-colors shadow-lg"
          aria-label="Toggle sidebar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Content Area */}
        <div className="flex-1 flex flex-row min-w-0 w-full">
          <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8 w-full max-w-7xl mx-auto min-w-0">
            {children}
          </div>
          <TableOfContents />
        </div>
      </main>

      <ModeSwitcher />

      <SearchCommandPalette
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={handleSearchNavigate}
      />
    </div>
  );
}
