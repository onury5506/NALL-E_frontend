import Image from 'next/image'
import classNames from 'classnames'
import { useMemo, useState } from 'react'

import styles from './nftCard.module.css'
import Circle from '../circle/circle'
import Link from 'next/link'

export default function NftCard(props) {

    const { id, prompt: promptorginal, mint_to, minted, className, ...others } = props
    const [imgLoaded, setImgLoaded] = useState(false)

    let prompt = promptorginal

    if (prompt && prompt.length > 117) {
        prompt = prompt.slice(0, 120) + "..."
    }

    return (
        <div {...others} className={classNames(styles["nft-card"], className)}>
            <div className={styles["nft-card__id"]}>
                #{id}
            </div>

            <Link href={`/nft/${id}`} className={styles["nft-a"]}>
                <div className={styles["nft-card__frame"]}>
                    <div className={styles["nft-card__image"]}>
                        {
                            !imgLoaded && <div>
                                <Circle className={styles["loading-circle"]}
                                    unit='%'
                                    startx={0} endx={60}
                                    starty={0} endy={60}
                                    size={20}
                                    color="red"
                                />
                                <Circle className={styles["loading-circle"]}
                                    unit='%'
                                    startx={60} endx={0}
                                    starty={60} endy={0}
                                    size={10}
                                    color="blue"
                                />
                                <Circle className={styles["loading-circle"]}
                                    unit='%'
                                    startx={60} endx={0}
                                    starty={0} endy={60}
                                    size={15}
                                    color="green"
                                />
                            </div>
                        }
                        {minted && <Image
                            alt={prompt}
                            src={`https://nalle.s3.eu-west-3.amazonaws.com/${id}.png`}
                            fill="true"
                            onLoadingComplete={() => setImgLoaded(true)}
                            draggable={false}
                            style={{ visibility: imgLoaded ? "visible" : "hidden" }}
                            priority />
                        }
                    </div>
                </div>
            </Link>

            <div className={styles["nft-card__prompt"]}>
                {prompt}
            </div>
        </div>
    )

}