import Head from 'next/head'
import Navbar from '@/components/navbar/navbar'
import Circle from '@/components/circle/circle'
import Mint from '@/components/mint/mint'

import styles from '@/styles/Mint.module.css'

export default function MintPage() {
  return (
    <>
      <Head>
        <title>Nall-e</title>
        <meta name="description" content="Nall-e Mint Free NFT" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=EB+Garamond&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id={styles["background-circles"]}>
        <Circle startx={0} starty={5}
          endx={65} endy={50}
          size={30} color="red" />
        <Circle startx={55} starty={40}
          endx={0} endy={20}
          size={40} color="green" />
        <Circle startx={70} starty={15}
          endx={0} endy={40}
          size={20} color="blue" />
      </div>
      <div id={styles.container}>
        <Navbar />
        <Mint />
      </div>
    </>
  )
}
