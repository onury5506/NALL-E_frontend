import Head from 'next/head'
import Image from 'next/image'
import client from "@/utils/ApolloClient";
import { gql } from "@apollo/client";
import { faOpens } from '@fortawesome/free-brands-svg-icons'

import Navbar from '@/components/navbar/navbar'
import Circle from '@/components/circle/circle'

import styles from '@/styles/Nft.module.css'
import Container from '@/components/container/container';
import Link from 'next/link';
import useOrientation from '@/hooks/useOrientation';


export async function getStaticPaths() {
    return { paths: [], fallback: "blocking" }
}

export async function getStaticProps({ params }) {
    const id = parseInt(params.id)
    try {
        const { data } = await client.query({
            query: gql`
                query ExampleQuery($nftFindOneId: Int!) {
                    nft_find_one(id: $nftFindOneId) {
                        mint_to
                        minted
                        prompt
                    }
                }
            `,
            variables: {
                nftFindOneId: id
            }
        })
        const nft = data.nft_find_one
        return {
            props: {
                id: params.id,
                mint_to: nft.mint_to,
                prompt: nft.prompt
            },
            revalidate: nft.minted ? 600 : 10
        }
    } catch (e) {
        console.log(e)
        return {
            notFound: true,
            revalidate: 10
        }
    }
}

export default function Nft({ id, mint_to, prompt }) {

    const mintedby = mint_to.slice(mint_to.length - 6, mint_to.length).toUpperCase()
    const orientation = useOrientation()

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
                <Container id={styles["nft-container"]} className={styles[orientation]} size="full">
                    <div id={styles["img-frame"]}>
                        <div id={styles.img}>
                            <Image
                                alt={prompt}
                                src={`https://nalle.s3.eu-west-3.amazonaws.com/${id}.png`}
                                fill="true"
                                draggable={false}
                                priority />
                        </div>
                    </div>
                    <div id={styles["content-frame"]}>
                        <div id={styles.content}>
                            <h1>#{id}</h1>
                            <p>
                                Minted By : <Link href={`https://opensea.io/${mint_to}`} target="_blank"> {mintedby} </Link>
                            </p>
                            <p>
                                <Link href={`https://opensea.io/assets/matic/${process.env.CONTRACT_ADDRESS}/${id}`} target="_blank">
                                    Check on Opensea
                                </Link>
                            </p>
                            <h2>Prompt</h2>
                            <p>
                                {prompt}
                            </p>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}
