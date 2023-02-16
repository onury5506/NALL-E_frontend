import Link from 'next/link'

import Button from '../button/button'
import Container from '../container/container'

import styles from './navbar.module.css'

export default function Navbar() {

    return (
        <nav id={styles.navbar}>
            <Container id={styles["navbar-content"]} size="md">
                <div id={styles.logo}>
                    <Link href="/">
                        <h1>NALL-E</h1>
                    </Link>
                </div>
                <Link href="/contact">
                    <Button>Get In Touch</Button>
                </Link>
            </Container>
        </nav>
    )

}