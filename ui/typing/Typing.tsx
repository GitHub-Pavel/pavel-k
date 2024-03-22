'use client'

import { useTyping } from "./hooks";
import styles from './styles/typing.module.scss'

export type TypingProps = {
    isBegin?: boolean;
    sentence: string;
    words?: string[];
    delay?: number;
}

export const Typing = (props: TypingProps) => {
    const {sentence, words = []} = props
    const typingRef = useTyping(props)

    return (
        <span ref={typingRef} className={styles.typing}>{sentence+' '+words[0]}</span>
    )
}