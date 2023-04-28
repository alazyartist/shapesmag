import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
export const eventsRouter = createTRPCRouter({
  createEvent: publicProcedure
    .input(
      z.object({
        contactinfo: z.string(),
        date: z.date(),
        details: z.string(),
        host: z.string(),
        location: z.string(),
        ticketlink: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { contactinfo, date, details, host, location, ticketlink } = input;
      const event = await ctx.prisma.events.create({
        data: {
          contactinfo,
          date,
          details,
          host,
          location,
          ticketlink,
        },
      });
      return event;
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    const athletes = ctx.prisma.athletes.findMany({});
    return athletes;
  }),
});
