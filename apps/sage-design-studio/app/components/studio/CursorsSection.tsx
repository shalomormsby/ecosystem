'use client';

import { Card } from '@sds/ui';
import { useRouter } from 'next/navigation';
import SplashCursor from './examples/splash-cursor/SplashCursor';

export function CursorsSection() {
    const router = useRouter();

    const navigateTo = (path: string) => {
        // Using hash navigation as per other sections
        window.location.hash = path;
    };

    return (
        <div className="max-w-5xl mx-auto px-6 py-12">
            {/* Header */}
            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-4 text-[var(--color-text-primary)]">
                    Cursor Effects
                </h1>
                <p className="text-lg text-[var(--color-text-secondary)] ">
                    Custom cursor animations and effects that follow user movement. Create immersive experiences with gradient pointers, magnetic effects, and custom cursors.
                </p>
            </div>

            {/* Overview Card */}
            <Card className="p-8 mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
                    Overview
                </h2>
                <div className="space-y-4 text-[var(--color-text-secondary)]">
                    <p>
                        Cursor effects add personality and visual interest to desktop experiences. These components create engaging
                        feedback that follows the user's mouse movement, enhancing the sense of interactivity.
                    </p>
                    <p>
                        Cursor effects are desktop-only and automatically disable on touch devices. They're optimized for 60fps performance
                        using requestAnimationFrame and CSS transforms.
                    </p>
                </div>
            </Card>

            {/* Splash Cursor */}
            <Card
                className="group relative overflow-hidden bg-[#1a1a1a] min-h-[400px] cursor-pointer transition-all duration-300 hover:shadow-2xl border-[var(--color-border)] mb-8"
                onClick={() => navigateTo('#motion/splash-cursor')}
            >
                <div className="absolute inset-0">
                    <SplashCursor
                        SPLAT_RADIUS={0.2}
                        SPLAT_FORCE={3000}
                        style={{ position: 'absolute' }}
                    />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end z-10 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-transparent">
                    <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
                        <h2 className="text-2xl font-bold text-white mb-2">
                            Splash Cursor
                        </h2>
                        <p className="text-white/80 max-w-md">
                            A high-performance fluid simulation that creates colorful splashes on interaction.
                            Reacts to mouse velocity and clicks.
                        </p>
                    </div>
                </div>
            </Card>

            {/* Gradient Pointer - Coming Soon */}
            <Card className="p-8 mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
                    Gradient Pointer
                </h2>
                <div className="p-12 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] text-center">
                    <div className="inline-block px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg">
                        <span className="text-[var(--color-text-muted)]">Coming Soon</span>
                    </div>
                    <p className="mt-4 text-sm text-[var(--color-text-secondary)] max-w-md mx-auto">
                        Radial gradient that follows the cursor with smooth easing. Perfect for hero sections, cards, and interactive backgrounds.
                    </p>
                </div>
            </Card>

            {/* Target Cursor */}
            <Card
                className="group relative overflow-hidden bg-[#1a1a1a] min-h-[400px] cursor-pointer transition-all duration-300 hover:shadow-2xl border-[var(--color-border)] mb-8"
                onClick={() => navigateTo('#motion/target-cursor')}
            >
                {/* Visual Preview */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="relative w-full h-full flex items-center justify-center">
                        {/* Simulated Trailing Ring */}
                        <div className="absolute w-12 h-12 border border-white/40 rounded-full transition-transform duration-700 ease-out group-hover:scale-110" />
                        {/* Dot */}
                        <div className="absolute w-2 h-2 bg-white rounded-full" />
                        {/* Crosshairs (decorative) */}
                        <div className="absolute w-24 h-[1px] bg-white/10" />
                        <div className="absolute h-24 w-[1px] bg-white/10" />
                    </div>
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end z-10 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-transparent">
                    <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
                        <h2 className="text-2xl font-bold text-white mb-2">
                            Target Cursor
                        </h2>
                        <p className="text-white/80 max-w-md">
                            A precision cursor replacement with a tracking ring and magnetic hover states.
                        </p>
                    </div>
                </div>
            </Card>

            {/* Magnetic Filings - Coming Soon */}
            <Card className="p-8">
                <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
                    Magnetic Filings
                </h2>
                <div className="p-12 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] text-center">
                    <div className="inline-block px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg">
                        <span className="text-[var(--color-text-muted)]">Coming Soon</span>
                    </div>
                    <p className="mt-4 text-sm text-[var(--color-text-secondary)] max-w-md mx-auto">
                        Particles or elements that follow the cursor like iron filings to a magnet. Creates playful, physics-based interactions with configurable particle count and behavior.
                    </p>
                </div>
            </Card>
        </div>
    );
}
