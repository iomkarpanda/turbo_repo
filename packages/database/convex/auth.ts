import { createClient, type GenericCtx } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import { betterAuth } from "better-auth/minimal";
import authConfig from "./auth.config";
import { components } from "./_generated/api";
import { DataModel } from "./_generated/dataModel";
import { query } from "./_generated/server";

export const authComponent = createClient<DataModel>(components.betterAuth);

export function createAuth(ctx: GenericCtx) {
  return betterAuth({
    baseURL: process.env.SITE_URL!,
    database: authComponent.adapter(ctx),
    socialProviders: {
      google: {
        clientId: process.env.BETTER_AUTH_SECRET!,
        clientSecret: process.env.BETTER_AUTH_GOOGLE_SECRET!,
      },
    },
    plugins: [convex({ authConfig })],
  });
}

export const getCurrentUser = query({
  handler: async (ctx) => {
    return await authComponent.getAuthUser(ctx);
  },
});
