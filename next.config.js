/**
 * @type {import('next').NextConfig}
 */

module.exports = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['i.ibb.co'],
  },

  reactStrictMode: true,
}
//  const nextConfig = {
//   basePath: "/admin-one-react-tailwind",
//   async redirects() {
//     return [
//       {
//           source: '/',
//           destination: '/admin-one-react-tailwind',
//           basePath: false,
//           permanent: false
//       }
//     ]
//   },
//   images: {
//     unoptimized: true,
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'static.justboil.me',
//       },
//     ],
//   },
// }

// export default nextConfig
