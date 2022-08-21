import type { NextPage } from 'next'
import StyledButton from '../components/StyledButton'
import { Button } from '@mui/material'


const SsrPage: NextPage<{ title: string }> = ({ title }) => {
  return (
    <div>
      <p>{title}</p>
      <StyledButton onStyledButtonClick={() => console.log('HEY!')}>Sup</StyledButton>
      <Button variant="contained">Contained</Button>
    </div>
  )
}

export async function getStaticProps() {
  console.log('hohohoho')
  return { props: { title: 'YOOOOOOOO!' } };
}

export default SsrPage