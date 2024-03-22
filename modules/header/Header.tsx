import { Btn, Logo, Menu, Sidebar } from './components';
import styles from './styles/header.module.scss'

export const Header = () => {
    return (
        <header className={styles.header}>
            <div className="container-large">
                <div className={styles.row}>
                    <div className={styles.logo}>
                        <Logo />
                    </div>
                    <nav className={styles.menu}>
                        <Menu />
                    </nav>
                    <div className={styles.sidebar}>
                        <Sidebar />
                    </div>
                    <div className={styles.btn}>
                        <Btn />
                    </div>
                </div>
            </div>
        </header>
    );
}