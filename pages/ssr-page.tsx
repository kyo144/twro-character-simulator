import { useState, useEffect, useRef } from 'react';
import type { NextPage } from 'next';
import Script from 'next/script';
import StyledButton from '../components/StyledButton';
import { Button } from '@mui/material';
import StyledEmotionButton from '../components/StyledEmotionButton';

const SsrPage: NextPage<{ name: string }> = ({ name }) => {
  console.log('yoo');
  return (
    <>
      <Script async src={`https://cse.google.com/cse.js?cx=${process.env.NEXT_PUBLIC_CSE_CX}`} />
      <div>
        <p>{`YOOOOOOOO! ${name}：Ｄ`}</p>
        <StyledButton onStyledButtonClick={() => console.log('HEY!')}>Sup</StyledButton>
        <Button variant="contained">Contained</Button>
        <StyledEmotionButton backgroundColor="salmon">Emotion</StyledEmotionButton>
      </div>
      <div className="gcse-search"></div>
    </>
  );
};

export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/api/hello');
  const data = await res.json();
  return { props: { name: data.name } };
}

export default SsrPage;
