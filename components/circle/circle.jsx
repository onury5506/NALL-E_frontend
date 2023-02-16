import classNames from 'classnames'

import styles from './circle.module.css'

export default function Circle({startx,endx,starty,endy,size,color,unit="viewport",className}){

    return(
        <div className={classNames(styles.circle,className)}
            style={{
                "--start-x" :`${startx}${unit=="viewport"?"vw":"%"}`,
                "--start-y" :`${starty}${unit=="viewport"?"vh":"%"}`,
                "--end-x": `${endx}${unit=="viewport"?"vw":"%"}`,
                "--end-y": `${endy}${unit=="viewport"?"vh":"%"}`,
                "--color": color,
                width: `${size}vw`,
                height: `${size}vw`
            }}
        >

        </div>
    )

}