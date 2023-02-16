import { useEffect, useState } from "react";
import client from "@/utils/ApolloClient";
import { gql } from "@apollo/client";
import Link from "next/link";

import Container from '../container/container'
import NftCard from "../nftCard/nftCard";

import styles from './about.module.css'
import useOrientation from "@/hooks/useOrientation";
import classNames from "classnames";
import Button from "../button/button";

export default function About() {

    const [nft, setNft] = useState(null)
    const orientation = useOrientation()

    async function randomNft() {
        const { data } = await client.query({
            query: gql`
                query Query{
                    nft_random {
                        id
                        mint_to
                        minted
                        prompt
                    }
                }
            `
        })

        setNft(data.nft_random)
    }

    useEffect(() => {
        randomNft()
    }, [])

    return (
        <Container id={styles.about} className={classNames(styles[orientation])} size="md">
            <div id={styles.description}>
                <h2>Discover, and get your free <span>NFTs</span> </h2>
                <p>
                    Free Nfts powered by Dall-E and Polygon.
                </p>
                <div className={styles["mint-button"]}>
                    <Link href="/mint">
                        <Button>Mint Your NFT Now!</Button>
                    </Link>
                </div>
            </div>
            <NftCard {...nft} />
        </Container>
    )

}