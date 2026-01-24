import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";

// Use dummy values during build time if env vars are not available
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || "dummy-client-id";
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || "dummy-client-secret";
const BETTER_AUTH_SECRET = process.env.BETTER_AUTH_SECRET || "dummy-secret-key-for-build-time-only";

// Only validate in production runtime (not during build)
if (typeof window === "undefined" && process.env.NODE_ENV === "production") {
  if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
    console.warn("Missing required GitHub OAuth credentials");
  }
  if (!process.env.BETTER_AUTH_SECRET) {
    console.warn("Missing BETTER_AUTH_SECRET environment variable");
  }
}

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  secret: BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  socialProviders: {
    github: {
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
});
