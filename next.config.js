/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    serverActions: true,
  },
  generateBuildId: async () => {
    if (process.env.BUILD_ID) {
      return process.env.BUILD_ID;
    } else {
      return `${new Date().getTime()}`;
    }
  },
}

module.exports = nextConfig
