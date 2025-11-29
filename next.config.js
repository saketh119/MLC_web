/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
   eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Skip type checking during build to speed up compilation.
    // NOTE: This disables type-error blocking on build; keep locally enabled during dev if desired.
    ignoreBuildErrors: true,
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
