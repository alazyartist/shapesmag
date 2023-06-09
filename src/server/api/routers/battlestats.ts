import { z } from "zod";
import { google } from "googleapis";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
async function getGoogleAuth() {
  const key = {
    type: process.env.GOOGLE_CRED_TYPE,
    project_id: process.env.GOOGLE_CRED_PROJECT_ID,
    private_key_id: process.env.GOOGLE_CRED_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_CRED_PRIVATE_KEY,
    client_email: process.env.GOOGLE_CRED_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_CRED_CLIENT_ID,
    auth_uri: process.env.GOOGLE_CRED_AUTH_URI,
    token_uri: process.env.GOOGLE_CRED_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.GOOGLE_CRED_X509_CERT_URL,
    client_x509_cert_url: process.env.GOOGLE_CRED_X509_CERT_URL,
  };

  const auth = new google.auth.GoogleAuth({
    credentials: key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
  const client = await auth.getClient();
  return client;
}

export const battleStatsRouter = createTRPCRouter({
  getSheets: publicProcedure.query(async () => {
    const auth = await getGoogleAuth();
    const sheets = google.sheets({
      version: "v4",
      auth: auth,
    });
    const spreadsheetId = "1-2ZTQPOIbNiwwN6IwMMHc0GFWPFvKETKIAocetAcOZU";
    const statsSheet = await sheets.spreadsheets.get({
      spreadsheetId,
    });

    return { statSheet: statsSheet.data };
  }),
  getSheetValues: publicProcedure
    .input(z.object({ sheet: z.string() }))
    .query(async ({ input }) => {
      const auth = await getGoogleAuth();
      const sheets = google.sheets({
        version: "v4",
        auth: auth,
      });
      const spreadsheetId = "1-2ZTQPOIbNiwwN6IwMMHc0GFWPFvKETKIAocetAcOZU";
      // const statsSheet = await sheets.spreadsheets.get({
      //   spreadsheetId,
      // });
      const range = input.sheet;
      const details = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
      });
      console.log(details);
      return details.data;
    }),
  getStatsByEvent: publicProcedure
    .input(z.object({ event_id: z.string() }))
    .query(async ({ ctx, input }) => {
      const eventStats = await ctx.prisma.events.findUnique({
        where: { event_id: input.event_id },
        include: { Battles: { include: { stats: true } } },
      });

      return eventStats;
    }),
  deleteBattleandStats: publicProcedure
    .input(
      z.object({
        battle_id: z.string(),
        event_id: z.string(),
        athlete_ids: z.array(z.number()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      for (let i = 0; i < input.athlete_ids.length; i++) {
        const deleteEventAssociation =
          await ctx.prisma.athlete_Events.deleteMany({
            where: {
              event_id: input.event_id,
              athlete_id: input.athlete_ids[i],
            },
          });
        const deleteRelation = await ctx.prisma.athlete_Battles.deleteMany({
          where: {
            battle_id: input.battle_id,
            athlete_id: input.athlete_ids[i],
          },
        });
      }

      const deletedStats = await ctx.prisma.battleStats.deleteMany({
        where: { battle_id: input.battle_id },
      });
      const deleted = await ctx.prisma.battles.delete({
        where: { battle_id: input.battle_id },
      });
      return deleted;
    }),
  addBattleStats: publicProcedure
    .input(
      z.object({
        name: z.string(),
        battleNum: z.number(),
        stats: z.array(
          z.object({
            Name: z.string(),
            Insta: z.string(),
            Votes: z.string(),
            "Battle #": z.string(),
            "% of votes": z.string(),
            "Total Voters": z.string(),
            "Stick Taps": z.string(),
            Impressions: z.string(),
          })
        ),
        versus: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const event = await ctx.prisma.events.findUnique({
        where: {
          name: input.name,
        },
      });

      const battle = await ctx.prisma.battles.create({
        data: {
          versus: input.versus,
          event_id: event.event_id,
          battleNum: input.battleNum,
        },
      });
      input.stats.forEach(async (stat) => {
        const athlete = await ctx.prisma.athletes.findFirst({
          where: { name: stat.Name },
        });

        const athleteBattle = await ctx.prisma.athlete_Battles.create({
          data: {
            athlete_id: athlete.athlete_id,
            battle_id: battle.battle_id,
          },
        });
        const athleteEvent = await ctx.prisma.athlete_Events.create({
          data: {
            athlete_id: athlete.athlete_id,
            event_id: battle.event_id,
          },
        });
        const stats = await ctx.prisma.battleStats.create({
          data: {
            battle_id: battle.battle_id,
            votes: parseInt(stat.Votes),
            stickerTaps: parseInt(stat["Stick Taps"]),
            totalVotes: parseInt(stat["Total Voters"]),
            impressions: parseInt(stat.Impressions),
            percent: parseFloat(stat["% of votes"]),
            athlete_id: athlete.athlete_id,
          },
        });
      });

      // console.log(event.event_id, battle);
      return event;
    }),
});
