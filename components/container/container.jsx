import classNames from 'classnames'

import styles from './container.module.css'

export default function Container(props) {
    const { size, className, children, ...others } = props

    return (
        <div
            {...others}
            className={classNames(styles.container, className)}
            data-size={size}
        >
            {children}
        </div>
    )
}