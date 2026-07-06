import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https: ipfs: nftstorage: dweb:",
              "connect-src 'self' https://api.devnet.solana.com https://api.mainnet-beta.solana.com https://api.mainnet.solana.com https://api.testnet.solana.com https://*.solana.com https://nft.storage https://*.nftstorage.link https://*.ipfs.io https://*.dweb.link https://*.cloudflare-ipfs.com https://*.jup.ag wss://*.solana.com",
              "frame-src 'self' https://*.phantom.app https://*.solflare.com",
              "media-src 'self' blob: https:",
              "manifest-src 'self'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
  // ✅ Redirect /affiliate → /affiliates
  async redirects() {
    return [
      {
        source: '/affiliate',
        destination: '/affiliates',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
