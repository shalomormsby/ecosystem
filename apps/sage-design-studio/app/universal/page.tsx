'use client';

import { Button, Input, Label } from '@sds/ui';

export default function UniversalPage() {
    return (
        <div className="p-10 space-y-8 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Universal Component Test (Phase 2 - Web Only)</h1>

            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Inputs & Labels</h2>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" placeholder="Email" />
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Variants</h2>
                <div className="flex gap-4 items-center">
                    <Button onClick={() => alert('Standard Clicked')}>
                        Default Button
                    </Button>
                    <Button variant="destructive" onClick={() => alert('Destructive Clicked')}>
                        Destructive
                    </Button>
                    <Button variant="outline" onClick={() => alert('Outline Clicked')}>
                        Outline
                    </Button>
                    <Button variant="ghost" onClick={() => alert('Ghost Clicked')}>
                        Ghost
                    </Button>
                    <Button variant="link" onClick={() => alert('Link Clicked')}>
                        Link
                    </Button>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Sizes</h2>
                <div className="flex gap-4 items-center">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Debug Probe (Standard HTML)</h2>
                <div className="flex gap-4">
                    <button className="bg-red-500 text-white p-4 rounded hover:bg-red-700">
                        Tailwind HTML Button
                    </button>
                    <div className="bg-blue-500 text-white p-4 rounded">
                        Tailwind Div
                    </div>
                </div>
            </div>
        </div>
    );
}
