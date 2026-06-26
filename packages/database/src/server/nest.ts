import { betterAuth } from "better-auth";
import type { BetterAuthOptions } from "better-auth";

/**
 * Creates a Better Auth instance configured for NestJS server-side use.
 * This is a factory that the NestJS app calls once and passes to AuthModule.forRoot().
 * 
 * Uses the full better-auth SDK (not minimal) since NestJS runs in Node.js.
 */
export function createNestAuth(): ReturnType<typeof betterAuth> {
  const options: BetterAuthOptions = {
    baseURL: process.env.SITE_URL!,
    secret: process.env.BETTER_AUTH_SECRET,
    socialProviders: {
      google: {
        clientId: process.env.BETTER_AUTH_SECRET!,
        clientSecret: process.env.BETTER_AUTH_GOOGLE_SECRET!,
      },
    },
  };

  return betterAuth(options);
}
