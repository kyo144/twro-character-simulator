import { useState, useEffect, useRef } from 'react';
import type { NextPage } from 'next';
import Script from 'next/script';
import Router from 'next/router';
import Head from 'next/head';
import useSize from '@react-hook/size';
import { Typography, Button, Chip, CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';

const SsrPage: NextPage<{ fact: string }> = ({ fact }) => {
  const refSearchBox = useRef<HTMLDivElement | null>(null);
  const refSearchResults = useRef<HTMLDivElement | null>(null);
  const [searchResultsWidth, searchResultsHeight] = useSize(refSearchResults);

  const [isSearchStarting, setIsSearchStarting] = useState<Boolean>(false);
  const [isResultsReady, setIsResultsReady] = useState<Boolean>(false);

  const renderGcse = () => {
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
    const cseInputField = document.querySelector('input.gsc-input') as HTMLInputElement | null;
    if (cseInputField) cseInputField.placeholder = 'Start typing to search for articles';
    const clearButton = document.querySelector('[title="Clear search box"]') as HTMLAnchorElement;
    clearButton?.addEventListener('click', () => {
      setIsSearchStarting(false);
      setIsResultsReady(false);
    });
    const searchToolForm = document.querySelector('form.gsc-search-box');
    // @ts-ignore
    searchToolForm?.addEventListener('keyup', (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (cseInputField?.value === '') return;
        setIsSearchStarting(true);
        setIsResultsReady(false);
      }
    });
    const searchButton = document.querySelector(
      'button.gsc-search-button.gsc-search-button-v2'
    ) as HTMLButtonElement;
    searchButton.addEventListener('click', () => {
      if (cseInputField?.value === '') return;
      setIsSearchStarting(true);
      setIsResultsReady(false);
    });
  };

  useEffect(() => {
    let gcseTimer: any = null;
    // @ts-ignore
    if (window?.google) {
      renderGcse();
    } else {
      gcseTimer = setTimeout(() => {
        renderGcse();
      }, 500);
    }
    return () => {
      clearTimeout(gcseTimer);
    };
  }, []);

  useEffect(() => {
    if (isSearchStarting && searchResultsHeight > 40) {
      setIsSearchStarting(false);
      setIsResultsReady(true);
    }
  }, [isSearchStarting, searchResultsHeight]);

  return (
    <>
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <Typography sx={{ flex: '1 1 50%' }} variant="h5">{`YOOOO!：Ｄ`}</Typography>
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
