/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/blog/:slug.md",
        destination: "/api/blog/:slug/raw",
      },
    ];
  },
};

export default nextConfig;
