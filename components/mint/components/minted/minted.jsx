import { useEffect, useState } from "react";
import client from "@/utils/ApolloClient";
import { gql } from "@apollo/client";

import styles from '../../mint.module.css'
import NftCard from "@/components/nftCard/nftCard";

export default function Minted({id}){

    const [nft,setNft] = useState({
        id,
        minted:false
    })

    function getData(){
        client.query({
            query: gql`
                query Query($nftFindOneId: Int!) {
                    nft_find_one(id: $nftFindOneId) {
                        id
                        mint_to
                        minted
                        prompt
                    }
                }
            `,
            variables: {
                nftFindOneId:id
            },
            fetchPolicy: "network-only"
        }).then(({data})=>{
            if(data.nft_find_one.minted){
                setNft(data.nft_find_one)
            }else{
                setTimeout(()=>{
                    getData()
                },5000)
            }
        }).catch((...args)=>{
            console.error(args)
            setTimeout(()=>{
                getData()
            },5000)
        })
    }

    useEffect(()=>{
        setTimeout(()=>{
            getData()
        },5000)
    },[])

    return (
        <NftCard id={styles.minted} {...nft} prompt={nft.minted?nft.prompt:"loading"}></NftCard>
    )
}