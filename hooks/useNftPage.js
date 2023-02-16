import { useEffect, useState } from "react";
import client from "@/utils/ApolloClient";
import { gql } from "@apollo/client";

export default function useNftPage() {

    const [page, setPage] = useState(0)
    const [nftList, setNftList] = useState([])
    const [maxPage,setMaxPage] = useState(false)

    async function getData() {

        if(maxPage){
            return
        }

        const { data } = await client.query({
            query: gql`
                query Query($page: Int) {
                    nft_page(page: $page) {
                        mint_to
                        minted
                        prompt
                        id
                    }
                }
            `,
            variables:{
                page
            }
        })

        if(data.nft_page.length>0){
            setNftList([...nftList,...data.nft_page])
            setPage(page+1)
        }else{
            setMaxPage(true)
        }
        
    }

    useEffect(() => {
        getData()
    }, [])

    return {
        nftList,
        nextPage: getData,
        maxPage
    }

}