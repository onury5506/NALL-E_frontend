import classNames from 'classnames'

import styles from './button.module.css'

export default function Button(props){
    const {children,className,...others} = props

    return(
        <button {...others} className={classNames(styles.button,className)}
            data-text={children}
        >
            {children}
        </button>
    )

}