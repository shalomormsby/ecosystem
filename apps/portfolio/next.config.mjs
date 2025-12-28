import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    transpilePackages: ['@ecosystem/design-system'],
    async rewrites() {
        // Only enable studio proxy in development for now
        // In production, sage-design-studio will be deployed separately
        // Set STUDIO_URL in Vercel environment variables when ready
        if (process.env.NODE_ENV === 'development' || process.env.STUDIO_URL) {
            const studioUrl = process.env.STUDIO_URL || 'http://localhost:3001';
            return [
                {
                    source: '/studio',
                    destination: `${studioUrl}/`,
                },
                {
                    source: '/studio/:path*',
                    destination: `${studioUrl}/:path*`,
                },
            ];
        }
        // In production without STUDIO_URL, return empty array (no rewrites)
        return [];
    },
};

const withMDX = createMDX({
    // Add markdown plugins here, as desired
});

export default withMDX(nextConfig);
