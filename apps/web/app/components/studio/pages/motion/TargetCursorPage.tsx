'use client';

import { useState } from 'react';
import { Card, CollapsibleCodeBlock, Label, Slider, Switch, Button } from '@thesage/ui';
import { Target, MousePointer2 } from 'lucide-react';
import TargetCursor from '../../examples/target-cursor/TargetCursor';

const USAGE_CODE = `import TargetCursor from './TargetCursor';

export default function App() {
  return (
    <>
      <TargetCursor 
        color="255, 255, 255"
        outerSize={40}
        outerAlpha={0.4}
        innerSize={8}
        blendMode={true}
      />
      
      {/* Your app content */}
      <div className="min-h-screen bg-black text-white p-12">
        <h1 className="text-4xl font-bold mb-4">Target Acquired</h1>
        <button className="px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-colors">
          Hover Me
        </button>
      </div>
    </>
  );
}`;

export function TargetCursorPage() {
    const [enabled, setEnabled] = useState(false);
    const [config, setConfig] = useState({
        outerSize: 40,
        innerSize: 8,
        outerAlpha: 0.4,
        innerScale: 0.7,
        blendMode: true,
    });

    return (
        <div className="max-w-6xl mx-auto px-6 py-12 relative">
            {/* The Cursor Component - Conditionally Rendered */}
            {enabled && (
                <TargetCursor
                    outerSize={config.outerSize}
                    innerSize={config.innerSize}
                    outerAlpha={config.outerAlpha}
                    innerScale={config.innerScale}
                    blendMode={config.blendMode}
                />
            )}

            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-4 text-[var(--color-text-primary)]">
                    Target Cursor
                </h1>
                <p className="text-lg text-[var(--color-text-secondary)]">
                    A precision cursor replacement that adds a trailing ring and hover interactions.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Preview Area */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl bg-[#111] border border-[var(--color-border)] flex flex-col items-center justify-center p-8 text-center space-y-8">
                        {!enabled ? (
                            <div className="max-w-md space-y-4">
                                <div className="p-4 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)]">
                                    <Target className="w-12 h-12 text-[var(--color-text-muted)] mx-auto mb-2" />
                                    <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">Cursor Disabled</h3>
                                    <p className="text-sm text-[var(--color-text-secondary)]">
                                        Enable the cursor to see it in action. It will replace your default system cursor.
                                    </p>
                                </div>
                                <Button
                                    onClick={() => setEnabled(true)}
                                    className="px-8 py-3 bg-[var(--color-brand-primary)] text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                                >
                                    Enable Custom Cursor
                                </Button>
                            </div>
                        ) : (
                            <>
                                <h2 className="text-4xl font-bold text-white mix-blend-difference z-10">
                                    Target Locked
                                </h2>
                                <p className="text-white/60 max-w-sm mix-blend-difference z-10">
                                    Move your mouse around. Hover over the buttons below to see the reaction.
                                </p>
                                <div className="flex gap-4 z-10">
                                    <button className="px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                                        Hover Me
                                    </button>
                                    <button className="px-6 py-3 border border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors">
                                        Or Me
                                    </button>
                                </div>
                                <div className="absolute bottom-8 text-xs text-white/30 font-mono">
                                    Press ESC or toggle 'Active' to restore system cursor
                                </div>
                            </>
                        )}
                    </div>

                    <CollapsibleCodeBlock
                        id="target-cursor-code"
                        title="Usage Example"
                        code={USAGE_CODE}
                        language="typescript"
                        showCopy={true}
                        defaultCollapsed={true}
                    />
                </div>

                {/* Controls Panel */}
                <Card className="p-6 h-fit sticky top-24">
                    <h3 className="font-semibold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
                        <MousePointer2 className="w-4 h-4" />
                        Customization
                    </h3>

                    <div className="space-y-8">

                        {/* Status Toggle */}
                        <div className="p-4 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)]">
                            <div className="flex items-center justify-between">
                                <Label>Active Status</Label>
                                <Switch
                                    checked={enabled}
                                    onCheckedChange={setEnabled}
                                />
                            </div>
                        </div>

                        {/* Outer Size */}
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <Label>Outer Size</Label>
                                <span className="text-xs font-mono text-[var(--color-text-muted)]">{config.outerSize}px</span>
                            </div>
                            <Slider
                                value={[config.outerSize]}
                                min={20}
                                max={100}
                                step={1}
                                onValueChange={([v]) => setConfig(prev => ({ ...prev, outerSize: v }))}
                            />
                        </div>

                        {/* Inner Size */}
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <Label>Inner Size</Label>
                                <span className="text-xs font-mono text-[var(--color-text-muted)]">{config.innerSize}px</span>
                            </div>
                            <Slider
                                value={[config.innerSize]}
                                min={2}
                                max={20}
                                step={1}
                                onValueChange={([v]) => setConfig(prev => ({ ...prev, innerSize: v }))}
                            />
                        </div>

                        {/* Outer Alpha */}
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <Label>Outer Alpha</Label>
                                <span className="text-xs font-mono text-[var(--color-text-muted)]">{config.outerAlpha.toFixed(2)}</span>
                            </div>
                            <Slider
                                value={[config.outerAlpha]}
                                min={0}
                                max={1}
                                step={0.05}
                                onValueChange={([v]) => setConfig(prev => ({ ...prev, outerAlpha: v }))}
                            />
                        </div>

                        <div className="h-px bg-[var(--color-border)]" />

                        {/* Toggles */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label>Mix Blend Mode</Label>
                                <Switch
                                    checked={config.blendMode}
                                    onCheckedChange={(checked) => setConfig(prev => ({ ...prev, blendMode: checked }))}
                                />
                            </div>
                        </div>

                    </div>
                </Card>
            </div>
        </div>
    );
}
