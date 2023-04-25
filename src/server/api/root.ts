import { createTRPCRouter } from "~/server/api/trpc";
import { battleStatsRouter } from "~/server/api/routers/battlestats";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  battleStats: battleStatsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
