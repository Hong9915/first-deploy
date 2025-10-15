// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",          // ★ 정적 산출물 내보내기
  images: { unoptimized: true }, // (이미지 최적화 비활성화)
  // basePath / assetPrefix 쓰면 out/ 경로가 달라지니 주의
};
export default nextConfig;