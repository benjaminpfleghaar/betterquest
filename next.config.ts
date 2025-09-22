import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL(
        "https://ovkgdfloifzxmvrarmmq.supabase.co/storage/v1/object/public/images/**",
      ),
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
};

export default nextConfig;
