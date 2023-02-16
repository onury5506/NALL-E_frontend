import { useEffect, useMemo, useState } from "react"

import useNftPage from "@/hooks/useNftPage"
import useScrollPosition from "@/hooks/useScrollPosition"
import NftCard from "../nftCard/nftCard"
import Container from "../container/container"

import styles from './gallery.module.css'

export default function Gallery() {

    const { nftList, nextPage, maxPage } = useNftPage()
    const [loading, setLoading] = useState(false)
    const scrollPos = useScrollPosition()

    const renderNfts = useMemo(() => nftList.map((nft, i) => (
        <NftCard key={"nft-" + nft.id}
            {...nft}
            index={i}
        />
    )), [nftList])

    useEffect(() => {
        if (loading || scrollPos < 50) {
            return;
        }
        setLoading(true)
        nextPage().then(() => {
            setLoading(false)
        })

    }, [scrollPos])

    return (
        <Container id={styles.container} size="full">
            <h2>
                Discover NFTs!
            </h2>
            <div id={styles.gallery}>
                {renderNfts}
                {!maxPage &&
                    <NftCard id="loading" prompt="Another Wonderful NFT!" />
                }
            </div>
        </Container>

    )

}