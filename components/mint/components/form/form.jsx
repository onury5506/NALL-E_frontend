import { useState } from "react";
import Web3 from "web3";
import client from "@/utils/ApolloClient";
import { gql } from "@apollo/client";

import Button from "@/components/button/button"

import styles from '../../mint.module.css'

export default function Form({ setMintedId }) {

    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        wallet: "0x",
        prompt: ""
    })
    const [formError, setFormError] = useState({
        wallet: "",
        prompt: "",
        server: ""
    })

    async function submit(ev) {
        ev.preventDefault()

        if (loading) {
            return;
        }

        setLoading(true)

        let buf = {
            wallet: "",
            prompt: "",
            server: ""
        }

        if (formData.wallet == "") {
            buf.wallet = "Empty wallet address!"
        } else if (!Web3.utils.isAddress(formData.wallet)) {
            buf.wallet = "It is not a valid wallet address!"
        }

        if (formData.prompt == "") {
            buf.prompt = "Empty prompt!"
        }

        setFormError(buf)

        if (buf.wallet || buf.prompt) {
            setLoading(false)
            return;
        }

        client.mutate({
            mutation: gql`
                mutation Mutation($input: NFT_MINT_INPUT!) {
                    nft_mint(input: $input)
                }
            `,
            variables: {
                input: {
                    prompt: formData.prompt,
                    mint_to: formData.wallet
                }
            }
        }).then(({ data }) => {
            setMintedId(data.nft_mint)
        }).catch(err => {
            buf.server = "Oops something went wrong, try again!"
            setFormError(buf)
        }).finally(() => {
            setLoading(false)
        })

    }

    function handleChange(ev) {

        if (loading) {
            return;
        }

        let buf = { ...formData }
        buf[ev.target.name] = ev.target.value

        buf[ev.target.name] = buf[ev.target.name].replace(/\n/g, "")
        buf[ev.target.name] = buf[ev.target.name].slice(0, Math.min(500, buf[ev.target.name].length))

        setFormData(buf)
    }

    return (
        <form onSubmit={submit}>
            <h2>Mint <span>NFT</span> </h2>
            <p>
                Free Nfts powered by Dall-E and Polygon.
            </p>
            <span className={styles.Error}>{formError.server}</span>
            <div>
                <label>Wallet Address</label>
                <span className={styles.Error}>{formError.wallet}</span>
                <input type="text" name="wallet" value={formData.wallet}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Prompt</label>
                <span className={styles.Error}>{formError.prompt}</span>
                <textarea name="prompt" value={formData.prompt}
                    onChange={handleChange}
                />
            </div>
            <div className={styles["mint-button"]}>
                <Button type="submit" >
                    {loading ? "Please Wait..." : "Mint Now!"}
                </Button>
            </div>
        </form>
    )
}