/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@ecosystem/design-system', '@sds/ui', 'nativewind', 'react-native-css-interop'],
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web',
    }
    return config
  },
}

export default nextConfig
