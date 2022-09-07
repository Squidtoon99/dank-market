/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  // add cdn.discordapp.com to the CDN domains
  images: {
    domains: ["cdn.discordapp.com"],
  },
};

module.exports = nextConfig;
