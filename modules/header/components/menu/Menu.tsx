import styles from './styles/menu.module.scss'
import { HOME_SECTIONS } from "@/configs"
import { Link } from "./components"

export const Menu = () => {
    return (
        <ul className={styles.list}>
            {HOME_SECTIONS.map(text => (
                <Link key={text.toLocaleLowerCase().replaceAll(' ', '_')} text={text} />
            ))}
        </ul>
    );
}