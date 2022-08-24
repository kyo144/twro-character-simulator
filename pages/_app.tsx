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
  // const cseInitCallback = (): void => {
  //   const cseInputField = document.querySelector('input.gsc-input') as HTMLInputElement | null;
  //   if (cseInputField) cseInputField.placeholder = 'Start typing to search for articles';
  //   const clearButton = document.querySelector('[title="Clear search box"]') as HTMLAnchorElement;
  //   clearButton.addEventListener('click', () => {
  //     setIsSearchStarting(false);
  //     setIsResultsReady(false);
  //   });
  // };
  return (
    <>
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
