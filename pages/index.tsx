import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div>
      <Link href={`/ssr-page`}>SsrPage</Link>
    </div>
  )
}

export default Home
