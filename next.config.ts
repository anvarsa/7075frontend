import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Игнорировать ошибки TypeScript во время сборки
    ignoreBuildErrors: true,
  },
};

export default nextConfig;