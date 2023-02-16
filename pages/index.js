import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Navbar from '@/components/navbar/navbar'
import Gallery from '@/components/gallery/gallery'
import About from '@/components/about/about'
import Circle from '@/components/circle/circle'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
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
        <About />
        <Gallery />
      </div>
    </>
  )
}
