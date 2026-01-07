'use client';

import { Button } from '@sds/ui';

export default function UniversalPage() {
    return (
        <div className="p-10 space-y-8 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Universal Component Test (Phase 2)</h1>

            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Variants</h2>
                <div className="flex gap-4 items-center">
                    <Button onPress={() => alert('Standard Pressed')}>
                        Default Button
                    </Button>
                    <Button variant="destructive" onPress={() => alert('Destructive Pressed')}>
                        Destructive
                    </Button>
                    <Button variant="outline" onPress={() => alert('Outline Pressed')}>
                        Outline
                    </Button>
                    <Button variant="ghost" onPress={() => alert('Ghost Pressed')}>
                        Ghost
                    </Button>
                    <Button variant="link" onPress={() => alert('Link Pressed')}>
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
        </div>
    );
}
