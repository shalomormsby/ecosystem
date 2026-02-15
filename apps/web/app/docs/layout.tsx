import type { Metadata } from 'next';
import { BRAND } from '@thesage/ui';

export const metadata: Metadata = {
  title: `Documentation - ${BRAND.productName}`,
  description:
    '92 accessible React components built on Radix UI + Tailwind CSS. Three themes, design tokens, motion control, TypeScript strict mode.',
  alternates: {
    canonical: 'https://thesage.dev/docs',
  },
  openGraph: {
    title: `Documentation - ${BRAND.productName}`,
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

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
