'use client';

import { Card, Code, CollapsibleCodeBlock } from '@thesage/ui';
import { BRAND } from '@thesage/ui';
import { Check, ShieldCheck } from 'lucide-react';

export function BrandTab() {
    return (
        <div className="space-y-8">
            {/* Brand Token Overview */}
            <Card className="p-6 bg-[var(--color-surface)]">
                <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-2 text-[var(--color-text-primary)]">
                            Tokenized Brand Identity
                        </h3>
                        <p className="text-[var(--color-text-secondary)] mb-4">
                            The entire product identity is encapsulated in a single source-of-truth object.
                            Instead of hardcoding "Sage Design Engine" or theme names across the codebase,
                            we consume the <code>BRAND</code> token. This enables a "Change once, ripple everywhere"
                            architecture for branding.
                        </p>
                    </div>
                </div>

                {/* Live Values */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-[var(--color-text-primary)] uppercase tracking-wider">
                            Current Values
                        </h4>
                        <div className="space-y-3">
                            <div className="p-3 bg-[var(--color-background)] rounded border border-[var(--color-border)] flex justify-between items-center">
                                <span className="text-sm text-[var(--color-text-secondary)]">Product Name</span>
                                <Code>{BRAND.productName}</Code>
                            </div>
                            <div className="p-3 bg-[var(--color-background)] rounded border border-[var(--color-border)] flex justify-between items-center">
                                <span className="text-sm text-[var(--color-text-secondary)]">Short Name</span>
                                <Code>{BRAND.productNameShort}</Code>
                            </div>
                            <div className="p-3 bg-[var(--color-background)] rounded border border-[var(--color-border)] flex justify-between items-center">
                                <span className="text-sm text-[var(--color-text-secondary)]">Tagline</span>
                                <span className="text-sm text-right text-[var(--color-text-primary)]">{BRAND.tagline}</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-[var(--color-text-primary)] uppercase tracking-wider">
                            Theme Mapping
                        </h4>
                        <div className="space-y-3">
                            {Object.entries(BRAND.themeNames).map(([key, value]) => (
                                <div key={key} className="p-3 bg-[var(--color-background)] rounded border border-[var(--color-border)] flex justify-between items-center">
                                    <span className="text-sm text-[var(--color-text-secondary)] capitalize">{key}</span>
                                    <Code>{value}</Code>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Card>

            {/* Usage Example */}
            <div>
                <h3 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">
                    Implementation
                </h3>
                <Card className="p-6">
                    <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                        Import the <code>BRAND</code> object from the UI package to use brand constants in your application.
                    </p>

                    <CollapsibleCodeBlock
                        id="brand-token-usage"
                        code={`import { BRAND } from '@thesage/ui';
import { Metadata } from 'next';

// 1. Use in Metadata
export const metadata: Metadata = {
  title: BRAND.productName, // "Sage Design Engine"
  description: BRAND.mission,
};

// 2. Use in UI Components
export function Header() {
  return (
    <header>
      <h1>{BRAND.productNameShort}</h1>
    </header>
  );
}`}
                        defaultCollapsed={false}
                        showCopy={true}
                    />
                </Card>
            </div>

            {/* Philosophy Card */}
            <Card className="p-6 border-l-4 border-l-[var(--color-primary)]">
                <h3 className="text-lg font-semibold mb-2 text-[var(--color-text-primary)]">
                    Why Tokenize Branding?
                </h3>
                <div className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                    <p>
                        Just as we tokenize colors and spacing to ensure visual consistency, we tokenize
                        brand identity to ensure <strong>semantic consistency</strong>.
                    </p>
                    <ul className="space-y-2 mt-2">
                        <li className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
                            <span>Decouples the <em>product name</em> from the <em>package name</em>.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
                            <span>Allows instant rebranding without a massive find-and-replace refactor.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
                            <span>Ensures every part of the app (SEO, UI, Copy) speaks with the same voice.</span>
                        </li>
                    </ul>
                </div>
            </Card>
        </div>
    );
}
