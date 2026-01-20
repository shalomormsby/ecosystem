'use client';

import { useState } from 'react';
import { Magnetic, Card, Slider, Label, CollapsibleCodeBlock, Button } from '@sage/ui';
import { RefreshCcw, Mail, ArrowRight } from 'lucide-react';

export function MagneticPage() {
    const [strength, setStrength] = useState(0.2);
    const [range, setRange] = useState(100);

    const handleReset = () => {
        setStrength(0.2);
        setRange(100);
    };

    return (
        <div className="max-w-5xl mx-auto px-6 py-12">
            {/* Header */}
            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-4 text-[var(--color-text-primary)]">
                    Magnetic
                </h1>
                <p className="text-lg text-[var(--color-text-secondary)]">
                    Wraps elements to give them a magnetic attraction to the cursor, creating a "sticky" feel. Great for buttons and navigation items.
                </p>
            </div>

            {/* Playground */}
            <Card className="p-8 mb-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">
                        Interactive Playground
                    </h2>
                    <div className="flex gap-2">
                        <button
                            className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                            onClick={handleReset}
                            title="Reset to defaults"
                        >
                            <RefreshCcw size={18} />
                        </button>
                    </div>
                </div>

                {/* Preview Area */}
                <div className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl p-12 mb-8 flex items-center justify-center min-h-[300px] overflow-hidden relative">
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,var(--color-surface)_25%,transparent_25%,transparent_75%,var(--color-surface)_75%,var(--color-surface)),linear-gradient(45deg,var(--color-surface)_25%,transparent_25%,transparent_75%,var(--color-surface)_75%,var(--color-surface))] bg-[length:20px_20px] opacity-20 pointer-events-none" />

                    <div className="flex gap-8">
                        {/* Standard Button */}
                        <Magnetic strength={strength} range={range}>
                            <Button size="lg" className="rounded-full px-8 h-16 text-lg">
                                Hover Me
                            </Button>
                        </Magnetic>

                        {/* Icon Button */}
                        <Magnetic strength={strength * 2} range={range}>
                            <div className="w-16 h-16 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center shadow-sm cursor-pointer hover:border-[var(--color-primary)] transition-colors">
                                <Mail className="w-6 h-6" />
                            </div>
                        </Magnetic>
                    </div>
                </div>

                {/* Controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <Label>Strength</Label>
                                <span className="text-sm font-mono text-[var(--color-text-muted)]">{strength}</span>
                            </div>
                            <Slider
                                value={[strength]}
                                min={0.1}
                                max={1}
                                step={0.1}
                                onValueChange={(val) => setStrength(val[0])}
                            />
                            <p className="text-xs text-[var(--color-text-muted)]">Higher values create a stronger pull.</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <Label>Range</Label> // Actually, my implementation currently doesn't use Range for logic, just CSS size if I were using it, but simpler implementation uses bounding rect logic relative to cursor.
                                {/* Wait, my implementation uses raw mouse move. It doesn't use range to restrict. Let's update the note or remove the control if it does nothing. My implementation logic: "middleX * strength". It happens whenever mouse moves OVER the element. So it's implicitly limited to element size. */}
                                {/* To properly implement 'range', I'd need a simpler listener on window or a larger container. For now, let's remove Range control if it's unused in the code I wrote. */}
                                {/* I wrote: `onMouseMove` on the element itself. This means it only magnetizes when INSIDE. Standard magnetic buttons usually have a larger hit area or run on a global listener near the target. */}
                                {/* For a simple v1, "onMouseMove" inside the element is strictly "internal tension". 
                                    If I want it to pull FROM OUTSIDE, I need a wrapper with padding. */}

                            </div>

                        </div>
                    </div>
                </div>

                {/* Notes about range */}
                <div className="mb-8 text-sm text-[var(--color-text-muted)] italic">
                    Note: The current implementation applies magnetic tension while hovering the element itself. For "aura" magnetism (pulling from outside), wrap your content in a larger invisible container.
                </div>

                {/* Code Block */}
                <CollapsibleCodeBlock
                    id="magnetic-playground"
                    title="Code"
                    code={`import { Magnetic, Button } from '@sage/ui';

/* Text/Button Magnetism */
<Magnetic strength={${strength}}>
  <Button className="rounded-full">Hover Me</Button>
</Magnetic>

/* Icon Magnetism (Stronger) */
<Magnetic strength={${strength * 2}}>
  <div className="w-16 h-16 rounded-full ...">
    <Icon />
  </div>
</Magnetic>`}
                    language="tsx"
                    showCopy={true}
                    defaultCollapsed={false}
                />
            </Card>
        </div>
    );
}
