/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Silence turbopack root warning in monorepo
  turbopack: {
    root: '..',
  },
};

export default nextConfig;
