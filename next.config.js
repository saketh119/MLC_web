/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mlcevents.s3.eu-north-1.amazonaws.com',
      },
    ],
  },
}

module.exports = nextConfig;
