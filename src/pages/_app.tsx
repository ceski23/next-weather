import type { AppProps } from 'next/app'
import { NextPage } from 'next';
import React, { useState } from 'react';
import { Global, ThemeProvider } from '@emotion/react';
import globalStyles from 'styles/globalStyles';
import Layout from 'components/layout/Layout';
import theme from 'styles/theme';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

// eslint-disable-next-line @typescript-eslint/ban-types
export type AppPage<Props = {}, InitialProps = Props> = NextPage<Props, InitialProps> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
}

type AppPropsWithLayout = AppProps<{
  session?: Session,
  dehydratedState?: unknown
}> & {
  Component: AppPage
}

const MyApp = ({ Component, pageProps: { session, dehydratedState, ...props } }: AppPropsWithLayout) => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  }));
  
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={dehydratedState}>

          <ThemeProvider theme={theme}>
            <Global styles={globalStyles} />
            {getLayout(<Component {...props} />)}
          </ThemeProvider>

        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp
