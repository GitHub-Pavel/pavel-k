import Image from "next/image"
import { SITE_NAME } from "@/configs"
import styles from './styles/server-image.module.scss'

export const ServerImage = () => {
    return (
        <Image 
            priority
            width={346}
            height={462}
            alt={SITE_NAME}
            src="pavel-k.jpg"
            className={styles.image}
        />
    );
}