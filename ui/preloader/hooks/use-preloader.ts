import classNames from "classnames"
import { useGSAP } from "@gsap/react"
import { useCommonStore } from "@/store"
import { useEffect, useRef } from "react"
import { preloaderDisappear } from "../configs"
import styles from '../styles/preloader.module.scss'

export const usePreloader = () => {
    const { isLoaded, loadingStatus, toggleLoading } = useCommonStore((state) => state)
    const className = classNames(styles.preloader, {
        [styles.start]: loadingStatus === 'loaded',
        [styles.dissapear]: loadingStatus === 'loaded' && isLoaded
    })
    const ref = useRef<HTMLDivElement>(null)
    const { contextSafe } = useGSAP({scope: ref})

    useEffect(() => {
        if (isLoaded || loadingStatus !== 'loaded') return
        contextSafe(preloaderDisappear(() => toggleLoading('loaded', true)))()
    }, [loadingStatus, isLoaded, toggleLoading, contextSafe])

    useEffect(() => toggleLoading('loaded'), [toggleLoading])

    return {ref, className}
}