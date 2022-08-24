import { useState, useEffect, useRef } from 'react';
import type { NextPage } from 'next';
import Script from 'next/script';
import { Typography, Button, Chip, CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';

const SsrPage: NextPage<{ name: string }> = ({ name }) => {
  const refSearchBox = useRef<HTMLDivElement | null>(null);
  const refSearchResults = useRef<HTMLDivElement | null>(null);

  const [isSearchStarting, setIsSearchStarting] = useState<Boolean>(false);
  const [isResultsReady, setIsResultsReady] = useState<Boolean>(false);

  useEffect(() => {
    // @ts-ignore
    if (window.google) {
      // @ts-ignore
      google?.search?.cse?.element?.render(
        {
          div: refSearchBox.current,
          tag: 'searchbox',
        },
        {
          div: refSearchResults.current,
          tag: 'searchresults',
        }
      );
    }
    // @ts-ignore
    if (window.__gcse) {
      // @ts-ignore
      window.__gcse.searchCallbacks = {
        web: {
          starting: () => {
            console.log('start searching');
            setIsSearchStarting(true);
            setIsResultsReady(false);
          },
          ready: () => {
            console.log('results ready');
            setIsSearchStarting(false);
            setIsResultsReady(true);
          },
        },
      };
    }
    return () => {};
  }, []);

  return (
    <>
      <Script
        src={`https://cse.google.com/cse.js?cx=${process.env.NEXT_PUBLIC_CSE_CX}`}
        strategy="afterInteractive"
      />
      <Script
        id="gcse-config"
        dangerouslySetInnerHTML={{
          __html: `window.__gcse = {}`,
        }}
        strategy="afterInteractive"
      />
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <Typography sx={{ flex: '1 1 50%' }} variant="h5">{`YOOOO! ${name}：Ｄ`}</Typography>
        <Box sx={{ flex: '1 1 50%' }}>
          <div ref={refSearchBox} className="gcse-searchbox" />
        </Box>
      </Box>
      <Button variant="contained">Contained</Button>
      <Box sx={{ display: isSearchStarting ? 'flex' : 'none', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>

      <Box sx={{ display: isResultsReady ? 'block' : 'none' }}>
        <div ref={refSearchResults} className="gcse-searchresults" />
      </Box>
      <Chip label="Chip Filled" />
    </>
  );
};

export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/api/hello');
  const data = await res.json();
  return { props: { name: data.name } };
}

export default SsrPage;
