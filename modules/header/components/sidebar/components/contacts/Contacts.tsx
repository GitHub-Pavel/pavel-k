import { Chat } from "@/icons";
import styles from './styles/contacts.module.scss';

export const Contacts = () => {
    return (
        <button className={styles.contacts} title="Contacs">
            <Chat />
        </button>
    );
}