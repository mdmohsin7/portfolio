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
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "Vary", value: "Accept, Accept-Encoding" }],
      },
    ];
  },
};

export default nextConfig;
