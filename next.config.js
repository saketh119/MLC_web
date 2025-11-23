/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
   eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mlcevents.s3.eu-north-1.amazonaws.com',
      },
      // Adding Cloudinary domain
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      // Cloudinary console URLs (used for some asset links) and Unsplash
      {
        protocol: 'https',
        hostname: 'console.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

module.exports = nextConfig;
