import { useEffect, useRef, useState } from "react"
import { TypingProps } from "../Typing"

export const useTyping = (options: TypingProps) => {
    const {sentence, words = [], delay = 150, isBegin = true} = options
    const [startLooper, setStart] = useState(false)
    
    const wordIndex = useRef(0)
    const isDeleting = useRef(false)
    const typingRef = useRef<HTMLSpanElement>(null)
    
    useEffect(() => {
        if (!isBegin) return        

        const normalizeSentence = sentence+' '
        const sentenceLength = normalizeSentence.split('').length
        const sentenceContainer = document.createElement('span')

        const addToSentence = (index: number) => {
            const sentenceArray = normalizeSentence.split('')
            sentenceContainer.innerHTML += sentenceArray[index]            

            if (index < sentenceLength-1) {
                setTimeout(() => addToSentence(index+1), delay)
                return
            }

            setStart(() => true)
        }

        typingRef.current!.innerText = '';
        typingRef.current!.classList.add('view')
        typingRef.current!.appendChild(sentenceContainer)

        setTimeout(() => addToSentence(0), delay)
    }, [isBegin])

    useEffect(() => {
        if (!startLooper || !words.length) return

        const looperContainer = document.createElement('span')

        const setLooper = (index = 0) => {
            const wordArray = words[wordIndex.current].split('')
            const textInContainer = looperContainer.innerHTML
            const textArray = textInContainer.split('')

            if (isDeleting.current) {
                looperContainer.innerHTML = textArray.slice(0, textArray.length-1).join('')
                if (looperContainer.innerHTML === '') isDeleting.current = false
                setTimeout(() => setLooper(), isDeleting.current ? delay/1.5 : delay*4)
                return
            }

            if (textInContainer === words[wordIndex.current]) {
                isDeleting.current = true
                wordIndex.current = wordIndex.current !== words.length-1 ? wordIndex.current+1 : 0
                setTimeout(() => setLooper(), delay*20)
                return
            }

            looperContainer.innerHTML += wordArray[index]
            setTimeout(() => setLooper(index+1), delay)
        }

        typingRef.current!.appendChild(looperContainer)
        setTimeout(() => setLooper(), delay*7)
    }, [startLooper])

    return typingRef
}