import { query } from "./_generated/server";
import { authComponent } from "./auth";

// Example: how to access auth data from any Convex query
export const exampleGetCurrentUser = query({
  handler: async (ctx) => {
    return await authComponent.getAuthUser(ctx);
  },
});
