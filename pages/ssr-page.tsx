import { useState, useEffect, useRef } from 'react';
import type { NextPage } from 'next';
import Script from 'next/script';
import { useRouter } from 'next/router';
import Head from 'next/head';
import useSize from '@react-hook/size';
import { Typography, Button, CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';

const GcseScript = () => {
  return (
    <Head>
      <script src={`https://cse.google.com/cse.js?cx=${process.env.NEXT_PUBLIC_CSE_CX}`} async />
    </Head>
  );
};

const SsrPage: NextPage<{ fact: string }> = ({ fact }) => {
  const router = useRouter();

  const refSearchBox = useRef<HTMLDivElement | null>(null);
  const refSearchResults = useRef<HTMLDivElement | null>(null);
  const [searchResultsWidth, searchResultsHeight] = useSize(refSearchResults);

  const [isSearchStarting, setIsSearchStarting] = useState<Boolean>(false);
  const [isResultsReady, setIsResultsReady] = useState<Boolean>(false);

  const [gcse, setGcse] = useState<React.ReactNode | null>(null);

  const onRouteChangeComplete = () => {
    setGcse(null);
    setGcse(<GcseScript />);
  };

  useEffect(() => {
    setGcse(<GcseScript />);
    // @ts-ignore
    window.__gcse.initializationCallback = () => {
      const cseInputField = document.querySelector('input.gsc-input') as HTMLInputElement | null;
      if (cseInputField) cseInputField.placeholder = 'Start typing to search for articles';
      const clearButton = document.querySelector('[title="Clear search box"]') as HTMLAnchorElement;
      clearButton?.addEventListener('click', () => {
        setIsSearchStarting(false);
        setIsResultsReady(false);
      });
    };
    // @ts-ignore
    window.__gcse.searchCallbacks = {
      web: {
        starting: () => {
          setIsSearchStarting(true);
          setIsResultsReady(false);
        },
        ready: () => {
          setIsSearchStarting(false);
          setIsResultsReady(true);
        },
      },
    };
    router.events.on('routeChangeComplete', onRouteChangeComplete);
  }, [router.events]);

  return (
    <>
      {gcse}
      <Script
        id="gcse-config"
        dangerouslySetInnerHTML={{
          __html: `window.__gcse = {}`,
        }}
        strategy="afterInteractive"
      />
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <Typography sx={{ flex: '1 1 50%' }} variant="h5">{`YOOOO!??????`}</Typography>
        <Box sx={{ flex: '1 1 50%' }}>
          <div ref={refSearchBox} className="gcse-searchbox" />
        </Box>
      </Box>
      <Typography variant="body1" sx={{ mb: 2 }}>{`${fact}`}</Typography>
      <Button variant="contained">Contained</Button>
      <Box sx={{ visibility: isResultsReady ? 'visible' : 'hidden' }}>
        <div ref={refSearchResults} className="gcse-searchresults" />
      </Box>
      <Box
        sx={{
          display: isSearchStarting && !isResultsReady ? 'flex' : 'none',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    </>
  );
};

export async function getStaticProps() {
  const res = await fetch('https://catfact.ninja/fact');
  const data = await res.json();
  return { props: { fact: data.fact } };
}

export default SsrPage;
