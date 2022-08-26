import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import createEmotionCache from '../utils/createEmotionCache';
import Layout from '../components/Layout';
import theme from '../styles/theme';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <>
      <Script
        src={`https://cse.google.com/cse.js?cx=${process.env.NEXT_PUBLIC_CSE_CX}`}
        strategy="afterInteractive"
      />
      <Script
        id="gcse-config"
        dangerouslySetInnerHTML={{
          __html: `window.__gcse = {
            parsetags: 'explicit'
          }`,
        }}
        strategy="afterInteractive"
      />
      <CacheProvider value={emotionCache}>
        <Head>
          <title>TwRO Character Simulator</title>
          <meta content="minimum-scale=1, initial-scale=1, width=device-width" name="viewport" />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}
