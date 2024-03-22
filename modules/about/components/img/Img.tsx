'use client'

import { useImg } from './hooks'
import { ServerImage } from './components'
import styles from './styles/img.module.scss'

export const Img = () => {
    const img = useImg()
    return (
        <div ref={img} className={styles.img}>
            <ServerImage />
        </div>
    )
}