import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 親ディレクトリのlockfileを誤検出しないようワークスペースルートを固定
  turbopack: { root: __dirname },
};

export default nextConfig;
