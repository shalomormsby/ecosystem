'use client';

import { useState } from 'react';
import { Card, CollapsibleCodeBlock, Label, Switch, Slider } from '@sds/ui';
import { Sparkles, Terminal } from 'lucide-react';
import Galaxy from './examples/galaxy/Galaxy';
import FaultyTerminal from './examples/faulty-terminal/FaultyTerminal';

// --- Code Strings for Display ---
const GALAXY_CODE = `import Galaxy from './Galaxy';

export default function HeroSection() {
  return (
    <div className="relative w-full h-[500px] bg-black overflow-hidden">
      <Galaxy
        starSpeed={0.5}
        density={1.5}
        mouseInteraction={true}
        transparent={true}
      />
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <h1 className="text-6xl font-bold text-white tracking-tighter">
          Explore the Universe
        </h1>
      </div>
    </div>
  );
}`;

const TERMINAL_CODE = `import FaultyTerminal from './FaultyTerminal';

export default function NotFoundPage() {
  return (
    <div className="w-full h-screen relative bg-[#1a1a1a]">
      <FaultyTerminal
        glitchAmount={1.0}
        flickerAmount={0.5}
        tint="#ff0000"
        mouseReact={true}
      />
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        <h1 className="text-9xl font-mono font-bold text-red-500 mb-4 opacity-80">404</h1>
        <p className="text-xl font-mono text-red-400">System Malfunction</p>
      </div>
    </div>
  );
}`;

export function BackgroundsSection() {
    // Galaxy State
    const [galaxyConfig, setGalaxyConfig] = useState({
        starSpeed: 0.5,
        density: 1.5,
        mouseInteraction: true,
        transparent: false,
    });

    // Terminal State
    const [terminalConfig, setTerminalConfig] = useState({
        glitchAmount: 1.0,
        flickerAmount: 0.5,
        mouseReact: true,
        tint: '#3b82f6', // blue-500 default
    });

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            {/* Header */}
            <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-[var(--color-text-primary)]">
                        Backgrounds
                    </h1>
                </div>
                <p className="text-lg text-[var(--color-text-secondary)] max-w-3xl">
                    Immersive, shader-based backgrounds to create depth and atmosphere. These components are designed to be dropped into hero sections, 404 pages, or feature reveals.
                </p>
            </div>

            {/* Galaxy Showcase */}
            <section className="mb-20">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] flex items-center gap-2 mb-2">
                            <Sparkles className="w-5 h-5 text-indigo-500" />
                            Galaxy
                        </h2>
                        <p className="text-sm text-[var(--color-text-secondary)]">A 3D starfield with mouse repulsion and depth.</p>
                    </div>
                    <span className="px-2 py-1 text-xs font-mono bg-indigo-500/10 text-indigo-500 rounded border border-indigo-500/20">
                        WebGL / Three.js
                    </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Preview Area */}
                    <div className="lg:col-span-2 space-y-4">
                        <Card className="p-1 h-[500px] overflow-hidden relative bg-black border-indigo-500/20 shadow-2xl shadow-indigo-500/10">
                            <Galaxy
                                starSpeed={galaxyConfig.starSpeed}
                                density={galaxyConfig.density}
                                mouseInteraction={galaxyConfig.mouseInteraction}
                                transparent={galaxyConfig.transparent}
                            />
                            {/* Overlay Content Example */}
                            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
                                <h3 className="text-4xl font-bold text-white tracking-tight mb-2 opacity-90">
                                    Starfield
                                </h3>
                                <p className="text-indigo-200 text-sm font-mono opacity-70">
                                    Interactive WebGL Background
                                </p>
                            </div>
                        </Card>

                        <CollapsibleCodeBlock
                            id="galaxy-code"
                            title="Usage Example"
                            code={GALAXY_CODE}
                            language="typescript"
                            showCopy={true}
                            defaultCollapsed={true}
                        />
                    </div>

                    {/* Controls Panel */}
                    <Card className="p-6 h-fit sticky top-24">
                        <h3 className="font-semibold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            Customization
                        </h3>

                        <div className="space-y-8">
                            {/* Star Speed */}
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <Label>Star Speed</Label>
                                    <span className="text-xs font-mono text-[var(--color-text-muted)]">{galaxyConfig.starSpeed}</span>
                                </div>
                                <Slider
                                    value={[galaxyConfig.starSpeed]}
                                    min={0}
                                    max={2}
                                    step={0.1}
                                    onValueChange={([v]) => setGalaxyConfig(prev => ({ ...prev, starSpeed: v }))}
                                />
                            </div>

                            {/* Density */}
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <Label>Density</Label>
                                    <span className="text-xs font-mono text-[var(--color-text-muted)]">{galaxyConfig.density}</span>
                                </div>
                                <Slider
                                    value={[galaxyConfig.density]}
                                    min={0.5}
                                    max={3}
                                    step={0.5}
                                    onValueChange={([v]) => setGalaxyConfig(prev => ({ ...prev, density: v }))}
                                />
                            </div>

                            <div className="h-px bg-[var(--color-border)]" />

                            {/* Toggles */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label>Mouse Interaction</Label>
                                    <Switch
                                        checked={galaxyConfig.mouseInteraction}
                                        onCheckedChange={(checked) => setGalaxyConfig(prev => ({ ...prev, mouseInteraction: checked }))}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <Label>Transparent Background</Label>
                                    <Switch
                                        checked={galaxyConfig.transparent}
                                        onCheckedChange={(checked) => setGalaxyConfig(prev => ({ ...prev, transparent: checked }))}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>

            {/* Faulty Terminal Showcase */}
            <section>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] flex items-center gap-2 mb-2">
                            <Terminal className="w-5 h-5 text-red-500" />
                            Faulty Terminal
                        </h2>
                        <p className="text-sm text-[var(--color-text-secondary)]">Retro CRT monitor effect with glitches and scanlines.</p>
                    </div>
                    <span className="px-2 py-1 text-xs font-mono bg-red-500/10 text-red-500 rounded border border-red-500/20">
                        Use for 404
                    </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Preview Area */}
                    <div className="lg:col-span-2 space-y-4">
                        <Card className="p-0 h-[500px] overflow-hidden relative bg-[#1a1a1a] shadow-2xl">
                            <FaultyTerminal
                                glitchAmount={terminalConfig.glitchAmount}
                                flickerAmount={terminalConfig.flickerAmount}
                                tint={terminalConfig.tint}
                                mouseReact={terminalConfig.mouseReact}
                            />
                            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
                                <h1 className="text-9xl font-mono font-bold text-white/90 mb-4 mix-blend-overlay">404</h1>
                                <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded border border-white/10">
                                    <p className="text-white font-mono text-sm">System Malfunction_</p>
                                </div>
                            </div>
                        </Card>

                        <CollapsibleCodeBlock
                            id="terminal-code"
                            title="Usage Example"
                            code={TERMINAL_CODE}
                            language="typescript"
                            showCopy={true}
                            defaultCollapsed={true}
                        />
                    </div>

                    {/* Controls Panel */}
                    <Card className="p-6 h-fit sticky top-24">
                        <h3 className="font-semibold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
                            <Terminal className="w-4 h-4" />
                            Customization
                        </h3>

                        <div className="space-y-8">
                            {/* Glitch Amount */}
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <Label>Glitch Amount</Label>
                                    <span className="text-xs font-mono text-[var(--color-text-muted)]">{terminalConfig.glitchAmount}</span>
                                </div>
                                <Slider
                                    value={[terminalConfig.glitchAmount]}
                                    min={0}
                                    max={2}
                                    step={0.1}
                                    onValueChange={([v]) => setTerminalConfig(prev => ({ ...prev, glitchAmount: v }))}
                                />
                            </div>

                            {/* Flicker Amount */}
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <Label>Flicker Amount</Label>
                                    <span className="text-xs font-mono text-[var(--color-text-muted)]">{terminalConfig.flickerAmount}</span>
                                </div>
                                <Slider
                                    value={[terminalConfig.flickerAmount]}
                                    min={0}
                                    max={1}
                                    step={0.05}
                                    onValueChange={([v]) => setTerminalConfig(prev => ({ ...prev, flickerAmount: v }))}
                                />
                            </div>

                            {/* Tint Color */}
                            <div className="space-y-3">
                                <Label>Tint Color</Label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="color"
                                        value={terminalConfig.tint}
                                        onChange={(e) => setTerminalConfig(prev => ({ ...prev, tint: e.target.value }))}
                                        className="w-10 h-10 rounded cursor-pointer border-0 p-0"
                                    />
                                    <span className="text-xs font-mono text-[var(--color-text-muted)]">{terminalConfig.tint}</span>
                                </div>
                            </div>

                            <div className="h-px bg-[var(--color-border)]" />

                            {/* Toggles */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label>Mouse Scanline React</Label>
                                    <Switch
                                        checked={terminalConfig.mouseReact}
                                        onCheckedChange={(checked) => setTerminalConfig(prev => ({ ...prev, mouseReact: checked }))}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>

        </div>
    );
}
