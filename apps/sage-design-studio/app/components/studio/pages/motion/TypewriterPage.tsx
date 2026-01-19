'use client';

import { useState } from 'react';
import { Typewriter, Card, Slider, Label, CollapsibleCodeBlock, Switch, Input } from '@sds/ui';
import { RefreshCcw } from 'lucide-react';

export function TypewriterPage() {
    const [speed, setSpeed] = useState(0.05);
    const [delay, setDelay] = useState(0);
    const [cursor, setCursor] = useState('|');
    const [loop, setLoop] = useState(false);
    const [text, setText] = useState('Typing this out...');

    // Force re-render on reset or text change for simple demo
    const [key, setKey] = useState(0);

    const handleReset = () => {
        setSpeed(0.05);
        setDelay(0);
        setCursor('|');
        setLoop(false);
        setText('Typing this out...');
        setKey(prev => prev + 1);
    };

    return (
        <div className="max-w-5xl mx-auto px-6 py-12">
            {/* Header */}
            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-4 text-[var(--color-text-primary)]">
                    Typewriter Effect
                </h1>
                <p className="text-lg text-[var(--color-text-secondary)]">
                    Simulate typing text character by character. Perfect for hero sections, code demos, or storytelling.
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

                    <div className="z-10 text-4xl font-mono text-[var(--color-text-primary)]">
                        <Typewriter
                            key={key}
                            text={text}
                            speed={speed}
                            delay={delay}
                            cursor={cursor}
                            loop={loop}
                        />
                    </div>
                </div>

                {/* Controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label>Text</Label>
                            <Input
                                value={text}
                                onChange={(e) => { setText(e.target.value); setKey(prev => prev + 1); }}
                                className="font-mono"
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <Label>Speed (s/char)</Label>
                                <span className="text-sm font-mono text-[var(--color-text-muted)]">{speed}s</span>
                            </div>
                            <Slider
                                value={[speed]}
                                min={0.01}
                                max={0.5}
                                step={0.01}
                                onValueChange={(val) => { setSpeed(val[0]); setKey(prev => prev + 1); }}
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <Label>Start Delay (s)</Label>
                                <span className="text-sm font-mono text-[var(--color-text-muted)]">{delay}s</span>
                            </div>
                            <Slider
                                value={[delay]}
                                min={0}
                                max={5}
                                step={0.1}
                                onValueChange={(val) => { setDelay(val[0]); setKey(prev => prev + 1); }}
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="space-y-2 flex-1">
                                <Label>Cursor Char</Label>
                                <Input
                                    value={cursor}
                                    onChange={(e) => setCursor(e.target.value)}
                                    className="font-mono w-16 text-center"
                                    maxLength={1}
                                />
                            </div>
                            {/* Loop momentarily disabled until effect is fully robust or simply removed from UI if unused 
                            <div className="flex items-center gap-2 pt-6">
                                <Switch checked={loop} onCheckedChange={(c) => { setLoop(c); setKey(prev => prev + 1); }} />
                                <Label>Loop</Label>
                            </div>
                             */}
                        </div>
                    </div>
                </div>

                {/* Code Block */}
                <CollapsibleCodeBlock
                    id="typewriter-playground"
                    title="Code"
                    code={`import { Typewriter } from '@sds/ui';

<Typewriter 
  text="${text}"
  speed={${speed}} 
  delay={${delay}}
  cursor="${cursor}"
  className="text-4xl font-mono"
/>`}
                    language="tsx"
                    showCopy={true}
                    defaultCollapsed={false}
                />
            </Card>

            {/* Implementation Notes */}
            <Card className="p-8">
                <h2 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">
                    Implementation Notes
                </h2>
                <div className="text-[var(--color-text-secondary)] space-y-2">
                    <p>
                        The Typewriter component uses `framer-motion` staggering for efficient character-by-character animation.
                    </p>
                    <ul className="list-disc list-inside ml-2 space-y-1">
                        <li>Wraps text in accessible `span` elements.</li>
                        <li>Respects `prefers-reduced-motion` if wrapped in accessibility hooks (todo).</li>
                        <li>Best used with monospaced fonts for authentic typewriter feel.</li>
                    </ul>
                </div>
            </Card>
        </div>
    );
}
