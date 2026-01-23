import { ImageResponse } from 'next/og';
import { OpenGraphCard } from '@sage/ui';

export const runtime = 'edge';

export const alt = 'Sage UI - The Solopreneur\'s Development Stack';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <OpenGraphCard
                title="Sage UI"
                description="The Solopreneur's Development Stack"
            />
        ),
        {
            ...size,
        }
    );
}
