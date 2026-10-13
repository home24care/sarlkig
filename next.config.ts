import type { NextConfig } from "next";

const legacyCategory: Record<string, string> = {
  "water-heaters": "water-heaters",
  boilers: "boilers",
  "space-heaters": "heating-cooling",
  furnaces: "heating-cooling",
  "air-conditioners": "heating-cooling",
  "heat-pumps": "water-heaters",
  refrigerant: "refrigerants",
  cleaners: "maintenance-supplies",
  controls: "heating-parts",
  accessories: "heating-parts",
};

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "sentaigas.com" },
      { protocol: "https", hostname: "mouchllc.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/products", destination: "/collections", permanent: true },
      { source: "/shipping", destination: "/policies/shipping", permanent: true },
      { source: "/returns", destination: "/policies/returns", permanent: true },
      { source: "/privacy", destination: "/policies/privacy", permanent: true },
      { source: "/terms", destination: "/policies/terms", permanent: true },
      ...Object.entries(legacyCategory).map(([from, to]) => ({
        source: `/categories/${from}`,
        destination: `/collections/${to}`,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
