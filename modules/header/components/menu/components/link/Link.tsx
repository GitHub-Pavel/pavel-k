import styles from './styles/link.module.scss'

type LinkProps = {
    text: string
}

export const Link = ({text}: LinkProps) => {
    return (
        <li>
            <button className={styles.link} title={text}>{text}</button>
        </li>
    ); 
}