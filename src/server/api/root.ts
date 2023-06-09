import { createTRPCRouter } from "~/server/api/trpc";
import { battleStatsRouter } from "~/server/api/routers/battlestats";
import { athletesRouter } from "./routers/athletes";
import { eventsRouter } from "./routers/events";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  battleStats: battleStatsRouter,
  athletes: athletesRouter,
  events: eventsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
