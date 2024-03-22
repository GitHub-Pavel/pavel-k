import styles from './styles/sidebar.module.scss'
import * as menuItems from './components'
import { FC } from 'react'

const components = menuItems as Record<string, FC>
const sidebarItems = ['SignIn', 'Contacts']

export const Sidebar = () => {
    return (
        <ul className={styles.sidebar}>
            {sidebarItems.map((key) => {
                const Component = components[key]
                return (
                    <li key={key}>
                        <Component />
                    </li>
                )  
            })}
        </ul>
    );
}