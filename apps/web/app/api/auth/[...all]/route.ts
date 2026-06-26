import { convexBetterAuthNextJs } from "@repo/database/server/next";

const { handler, getToken } = convexBetterAuthNextJs({
  convexUrl: process.env.NEXT_PUBLIC_CONVEX_URL!,
  convexSiteUrl: process.env.NEXT_PUBLIC_CONVEX_SITE_URL!,
});

export const GET = handler.GET;
export const POST = handler.POST;
