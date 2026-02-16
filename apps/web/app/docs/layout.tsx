import type { Metadata } from 'next';

// Note: BRAND from @thesage/ui cannot be used here because tsup adds "use client"
// banner to all output files, making the module resolve to undefined in server contexts.
const PRODUCT_NAME = 'Sage Design Engine';

export const metadata: Metadata = {
  title: `Documentation - ${PRODUCT_NAME}`,
  description:
    '92 accessible React components built on Radix UI + Tailwind CSS. Three themes, design tokens, motion control, TypeScript strict mode.',
  alternates: {
    canonical: 'https://thesage.dev/docs',
  },
  openGraph: {
    title: `Documentation - ${PRODUCT_NAME}`,
    description:
      '92 accessible React components built on Radix UI + Tailwind CSS. Three themes, design tokens, motion control.',
    url: 'https://thesage.dev/docs',
    type: 'website',
  },
  other: {
    'sage:type': 'documentation',
    'sage:components': '92',
    'sage:categories':
      'actions,forms,navigation,overlays,feedback,data-display,layout,backgrounds,cursor,motion,blocks',
    'sage:themes': 'studio,terra,volt',
    'sage:llms-full': 'https://thesage.dev/llms-full.txt',
  },
};

const collectionJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: `Documentation - ${PRODUCT_NAME}`,
  description:
    '92 accessible React components built on Radix UI + Tailwind CSS. Three themes, design tokens, motion control.',
  url: 'https://thesage.dev/docs',
  mainEntity: {
    '@type': 'SoftwareSourceCode',
    name: PRODUCT_NAME,
    codeRepository: 'https://github.com/shalomormsby/ecosystem',
    programmingLanguage: ['TypeScript', 'React'],
    runtimePlatform: 'Node.js',
  },
  numberOfItems: 92,
  about: [
    { '@type': 'Thing', name: 'Actions', description: 'Interactive elements that trigger behaviors' },
    { '@type': 'Thing', name: 'Forms', description: 'Input controls for data collection' },
    { '@type': 'Thing', name: 'Navigation', description: 'Moving through content and hierarchy' },
    { '@type': 'Thing', name: 'Overlays', description: 'Contextual content above main UI' },
    { '@type': 'Thing', name: 'Feedback', description: 'Communicating system state' },
    { '@type': 'Thing', name: 'Data Display', description: 'Presenting information in structured formats' },
    { '@type': 'Thing', name: 'Layout', description: 'Spatial organization and structural elements' },
  ],
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      {children}
    </>
  );
}
