import { z } from "zod";
import { google } from "googleapis";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import fs from "fs";
import { promisify } from "util";

const readFileAsync = promisify(fs.readFile);

async function getGoogleAuth() {
  const keyFileContent = await readFileAsync(
    process.env.GOOGLE_API_KEY,
    "utf-8"
  );
  const key = JSON.parse(keyFileContent);
  const auth = new google.auth.GoogleAuth({
    credentials: key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
  const client = await auth.getClient();
  return client;
}

export const battleStatsRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getSheets: publicProcedure.query(async ({ ctx }) => {
    const auth = await getGoogleAuth();
    const sheets = google.sheets({
      version: "v4",
      auth: auth,
    });
    const spreadsheetId = "1-2ZTQPOIbNiwwN6IwMMHc0GFWPFvKETKIAocetAcOZU";
    const range = "NEO 7";
    const response = await sheets.spreadsheets.get({
      spreadsheetId,
    });
    console.log(response);
    return response.data;
  }),
});
