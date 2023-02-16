import { useEffect, useState } from "react";
import client from "@/utils/ApolloClient";
import { gql } from "@apollo/client";
import classNames from "classnames";

import Container from '../container/container'
import NftCard from "../nftCard/nftCard";
import useOrientation from "@/hooks/useOrientation";

import styles from './mint.module.css'
import Form from "./components/form/form";
import Minted from "./components/minted/minted";

export default function Mint() {
    const [nft, setNft] = useState(null)
    const [mintedId, setMintedId] = useState(null)
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
        <Container id={styles.mint} className={classNames(styles[orientation])} size="md">
            <div id={styles["mint-form"]} className={classNames(mintedId!=null&&styles.full)}>
                {mintedId == null && <Form setMintedId={setMintedId} />}
                {mintedId != null && <Minted id={mintedId} />}
            </div>
            {mintedId == null && <NftCard className={styles.nft} {...nft} />}
        </Container>
    )

}