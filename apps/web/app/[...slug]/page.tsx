import { redirect, notFound } from 'next/navigation';
import { VALID_SECTIONS, SECTION_ALIASES, type Section } from '../docs/route-config';

interface Props {
    params: Promise<{
        slug: string[];
    }>;
}

export default async function CatchAllPage({ params }: Props) {
    const { slug } = await params;

    let section = slug[0];
    const rest = slug.slice(1);

    // Check aliases
    if (SECTION_ALIASES[section]) {
        section = SECTION_ALIASES[section];
    }

    // Also handle legacy aliases
    const legacyAliases: Record<string, string> = {
        'components': 'actions',
    };
    if (legacyAliases[section]) {
        section = legacyAliases[section];
    }

    // Redirect to path-based docs URL if it's a known section
    if (VALID_SECTIONS.includes(section as Section)) {
        const path = rest.length > 0
            ? `/docs/${section}/${rest.join('/')}`
            : `/docs/${section}`;
        redirect(path);
    }

    // Otherwise, truly 404
    notFound();
}
