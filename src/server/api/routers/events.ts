import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
export const eventsRouter = createTRPCRouter({
  createEvent: publicProcedure
    .input(
      z.object({
        contactinfo: z.string(),
        date: z.string(),
        name: z.string(),
        details: z.string(),
        host: z.string(),
        location: z.string(),
        ticketlink: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { name, contactinfo, date, details, host, location, ticketlink } =
        input;
      const event = await ctx.prisma.events.create({
        data: {
          contactinfo,
          date: new Date(date),
          details,
          host,
          name,
          location,
          ticketlink,
        },
      });
      return event;
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    const athletes = ctx.prisma.events.findMany({});
    return athletes;
  }),
  getEventDetails: publicProcedure
    .input(z.object({ event_id: z.string() }))
    .query(async ({ ctx, input }) => {
      const events = ctx.prisma.events.findUnique({
        where: { event_id: input.event_id },
        include: { Battles: { include: { stats: true } } },
      });
      return events;
    }),
});
