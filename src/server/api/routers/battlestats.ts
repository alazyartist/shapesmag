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
});
