import Head from 'next/head'
import Navbar from '@/components/navbar/navbar'
import Circle from '@/components/circle/circle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

import styles from '@/styles/Contact.module.css'
import Link from 'next/link'
import Container from '@/components/container/container'

export default function ContactPage() {
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
        <Container id={styles["contact-list-container"]} size="sm">
          <ul id={styles["contact-list"]}>
            <Link href="mailto:contact@onuryildiz.dev" target="_blank">
              <li>
                <FontAwesomeIcon icon={faEnvelope} />
                <span>contact@onuryildiz.dev</span>
              </li>
            </Link>
            <Link href="https://www.linkedin.com/in/onur-yildizz/" target="_blank">
              <li>
                <FontAwesomeIcon icon={faLinkedin} />
                <span>@onur-yildizz</span>
              </li>
            </Link>
            <Link href="https://github.com/onury5506" target="_blank">
              <li>
                <FontAwesomeIcon icon={faGithub} />
                <span>@onury5506</span>
              </li>
            </Link>
          </ul>
        </Container>
      </div>
    </>
  )
}
