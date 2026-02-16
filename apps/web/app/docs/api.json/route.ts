import { NextResponse } from 'next/server';
import {
  COMPONENT_REGISTRY,
  COMPONENT_CATEGORIES,
} from '@thesage/mcp/registry';

const PRODUCT_NAME = 'Sage Design Engine';

export async function GET() {
  const components = Object.values(COMPONENT_REGISTRY).map((comp) => ({
    name: comp.name,
    category: comp.category,
    description: comp.description,
    keywords: comp.keywords,
    useCases: comp.useCases,
    dependencies: comp.dependencies,
    radixPrimitive: comp.radixPrimitive ?? null,
    props: comp.props ?? null,
    subComponents: comp.subComponents ?? null,
    example: comp.example ?? null,
  }));

  const categories = Object.entries(COMPONENT_CATEGORIES).map(
    ([id, cat]) => ({
      id,
      label: cat.label,
      description: cat.description,
      count: cat.count,
    })
  );

  const payload = {
    name: PRODUCT_NAME,
    version: '1.1.1',
    totalComponents: components.length,
    package: '@thesage/ui',
    install: 'pnpm add @thesage/ui',
    docs: 'https://thesage.dev/docs',
    llmsFullTxt: 'https://thesage.dev/llms-full.txt',
    mcp: '@thesage/mcp',
    themes: ['studio', 'terra', 'volt'],
    categories,
    components,
  };

  return NextResponse.json(payload, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
