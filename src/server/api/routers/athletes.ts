import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
export const athletesRouter = createTRPCRouter({
  createAthlete: publicProcedure
    .input(
      z.object({
        athlete_id: z.number(),
        clerk_id: z.string().optional().nullable(),
        name: z.string(),
        insta: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const athlete = await ctx.prisma.athletes.create({
        data: {
          insta: input.insta,
          clerk_id: input.clerk_id,
          name: input.name,
          athlete_id: input.athlete_id,
        },
      });
      return athlete;
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    const athletes = ctx.prisma.athletes.findMany({});
    return athletes;
  }),
  getAthleteDetails: publicProcedure
    .input(z.object({ athlete_id: z.number() }))
    .query(async ({ ctx, input }) => {
      const athlete = ctx.prisma.athletes.findUnique({
        where: { athlete_id: input.athlete_id },
        include: { battles: true, events: true, stats: true },
      });
      return athlete;
    }),
});
