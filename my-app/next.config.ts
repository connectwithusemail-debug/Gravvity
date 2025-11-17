import type { NextConfig } from "next";

const isNetlify = process.env.NETLIFY === "true";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || (isNetlify ? "" : "http://localhost:4000");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  async rewrites() {
    // On Netlify, we use netlify.toml redirects to the serverless function.
    // Only generate rewrites if a BACKEND_URL is explicitly provided.
    if (!BACKEND_URL) return [];
    return [
      // Health check passthrough to backend
      {
        source: "/api/health",
        destination: `${BACKEND_URL}/api/health`,
      },
      // Public read-only endpoints consumed by the frontend
      {
        source: "/api/public/:path*",
        destination: `${BACKEND_URL}/api/public/:path*`,
      },
      // Admin/authenticated CRUD endpoints used by the dashboard
      {
        source: "/api/members/:path*",
        destination: `${BACKEND_URL}/api/members/:path*`,
      },
      {
        source: "/api/events/:path*",
        destination: `${BACKEND_URL}/api/events/:path*`,
      },
      {
        source: "/api/projects/:path*",
        destination: `${BACKEND_URL}/api/projects/:path*`,
      },
      {
        source: "/api/admin/:path*",
        destination: `${BACKEND_URL}/api/admin/:path*`,
      },
    ];
  },
};

export default nextConfig;
