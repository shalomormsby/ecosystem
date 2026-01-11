/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@ecosystem/design-system', '@sds/ui', '@sds/tokens', '@sds/core', '@sds/config'],
}

export default nextConfig
