import { redirect, notFound } from 'next/navigation';

interface Props {
    params: Promise<{
        slug: string[];
    }>;
}

export default async function CatchAllPage({ params }: Props) {
    const { slug } = await params;

    const validSections = [
        'getting-started', 'overview', 'architecture', 'adding-components', 'common-patterns',
        'contributing', 'mcp-server', 'tokens', 'themes', 'actions', 'forms', 'navigation',
        'overlays', 'feedback', 'data-display', 'layout', 'blocks',
        'hooks', 'templates', 'charts', 'motion', 'tools', 'backgrounds', 'cursor'
    ];

    const aliases: Record<string, string> = {
        'components': 'actions',
        'resources': 'templates'
    };

    let section = slug[0];
    const rest = slug.slice(1);

    // Check aliases
    if (aliases[section]) {
        section = aliases[section];
    }

    // Only redirect if it's a known section
    if (validSections.includes(section)) {
        // preserve the original slug parts for the hash construction if needed, 
        // but since we resolved the alias, maybe we should use the resolved section?
        // Actually, typical behavior is to keep the alias or resolve it. 
        // The StudioPage logic handles aliases in the hash too. 
        // Let's simplified: Redirect to /docs#{original_slug_joined} covers everything IF StudioPage handles it.
        // StudioPage handles 'components', 'resources'.
        // So we just need to check if slug[0] is in (validSections + aliases).

        const isKnown = validSections.includes(slug[0]) || ['components', 'resources'].includes(slug[0]);

        if (isKnown) {
            redirect(`/docs#${slug.join('/')}`);
        }
    }

    // Otherwise, truly 404
    notFound();
}
