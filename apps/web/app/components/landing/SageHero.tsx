'use client';

import { HeroBlock, OrbBackground, Typewriter, useTheme, BRAND } from '@thesage/ui';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function SageHero() {
    const router = useRouter();
    const { theme, mode } = useTheme();

    const [hue, setHue] = useState(260); // Start with purple/blue

    return (
        <HeroBlock
            className="min-h-[90vh]" /* Increased height */
            headline={
                <span>
                    The Solopreneur's <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] animate-gradient-x">
                        Development Stack
                    </span>
                </span>
            }
            description="Ship stunning, full-stack web applications faster with a systematic collection of tokens, components, and templates."
            badge="Human Touch x AI Power"
            primaryCta={{
                label: "Get Started",
                onClick: () => router.push('/docs#getting-started'),
                variant: 'secondary'
            }}
            background={
                <OrbBackground
                    hue={hue}
                    hoverIntensity={0.5}
                    rotateOnHover={true}
                    forceHoverState={false}
                />
            }
        >
            <div className="mt-8 h-8 flex items-center justify-center text-[var(--color-text-secondary)] font-medium">
                <span className="mr-2">Build smarter with {BRAND.productName}</span>
                <span className="text-[var(--color-primary)]">
                    <Typewriter
                        text={['Tokens.', 'Components.', 'Blocks.', 'Templates.']}
                        speed={0.1}
                        loop={true}
                        delay={2}
                        cursor="|"
                    />
                </span>
            </div>

            {/* Controls removed as requested: "I do NOT want the customization panel to be exposed on the front-end at all." */}
        </HeroBlock>
    );
}
