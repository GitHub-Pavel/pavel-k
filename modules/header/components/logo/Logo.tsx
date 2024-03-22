import { SITE_NAME } from '@/configs';
import { Logo as LogoSVG } from '@/icons'
import styles from './styles/logo.module.scss'

export const Logo = () => {
    return (
        <button className={styles.logo} title={SITE_NAME}>
            <LogoSVG />
        </button>
    );
}