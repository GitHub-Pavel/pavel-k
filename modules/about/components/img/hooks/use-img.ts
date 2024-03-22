import { normalizeEquasion } from "@/utils"
import { useEffect, useRef } from "react"

export const useImg = () => {
    const imgRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const img = imgRef.current!.querySelector('img')
        const setRotate = (x: number, y: number) => {
            img!.style.transform = `rotate3d(${x}, ${y}, 0, 25deg)`
        }
        const moveHandler = (event: MouseEvent) => {
            if (window.matchMedia("(hover: none)").matches) return;

            const x = event.offsetX
            const y = event.offsetY
            const imgWidth = imgRef.current?.offsetWidth || 0
            const imgHeight = imgRef.current?.offsetHeight || 0
            const centerWidth = imgWidth/2
            const centerHeight = imgHeight/2
            const normalizeX = x - centerWidth
            const normalizeY = y - centerHeight
            const progressX = normalizeEquasion(normalizeX, 0, centerWidth)*100
            const progressY = normalizeEquasion(normalizeY, 0, centerHeight)*-100
    
            img!.classList.remove('leave')
            setRotate(progressY, progressX)
        }
        const leaveHandler = () => {
            img!.classList.add('leave')
            setRotate(0,0)
        }

        imgRef.current!.addEventListener('mousemove', moveHandler)
        imgRef.current!.addEventListener('mouseleave', leaveHandler)
        return () => {
            imgRef.current!.removeEventListener('mousemove', moveHandler)
            imgRef.current!.removeEventListener('mouseleave', leaveHandler)
        }
    }, [])

    return imgRef
}