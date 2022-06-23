/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    //if env not server side
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
  images: {
    domains: ["thrangra.sirv.com", "www.cnet.com", "i0.wp.com"],
  },
};

module.exports = nextConfig;
