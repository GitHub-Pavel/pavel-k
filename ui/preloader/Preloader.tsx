'use client'

import classNames from "classnames"
import { usePreloader } from "./hooks/use-preloader"
import styles from './styles/preloader.module.scss'

export const Preloader = () => {
    const props = usePreloader()
    return (
        <div {...props}>
            <div className={classNames(styles.gateLeft, "gate-left")} />
            <div className={classNames(styles.gateRight, "gate-right")} />
            <div className={classNames(styles.caretLeft, "caret-left")} />
            <div className={classNames(styles.caretRight, "caret-right")} />
            <div className={classNames(styles.backgroundLeft, "background-left")} />
            <div className={classNames(styles.backgroundRight, "background-right")} />
        </div>
    )
}