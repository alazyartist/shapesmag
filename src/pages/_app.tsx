import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import PageWrapper from "~/components/PageWrapper";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <PageWrapper>
        <Component {...pageProps} />
      </PageWrapper>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
