import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'mk1th5bfau.ufs.sh',
          port: '',
          pathname: '/**',
        },
      ],
    }
};

export default nextConfig;
