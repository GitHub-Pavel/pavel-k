import { ovalEquasion, speedEquasion } from "@/utils"
import { useNormalize } from "./use-normalize"
import { useFrame } from "@react-three/fiber"
import { Group, Vector3 } from "three"
import { useRef } from "react"
import { useCommonStore } from "@/store"

type PiramydHookProps = {
    speed?: number;
    position: number[];
    startPosition: number[];
    startTranslateSpeed?: number;
}

export const usePiramyd = ({
    speed = 0.0006,
    startTranslateSpeed = 0.04,
    ...normalizeProps
}: PiramydHookProps) => {
    const {startPosition, position} = normalizeProps

    const group = useRef<Group>(null!)
    const {getCoords, normalize} = useNormalize(normalizeProps)
    const { isLoaded } = useCommonStore((state) => state)

    const [toX, toY] = normalize(position)
    const [fromX, fromY] = normalize(startPosition)
    
    const isReversed = fromX < toX ? 1 : -1
    const deflectionX = Math.abs(toX - fromX);
    const deflectionY = Math.abs(toY - fromY);

    useFrame(() => {
        if (!isLoaded) return

        const {x} = group.current.position
        const [normalizeX] = normalize([x,0])
        const [coordX,coordY] = getCoords([
            normalizeX + speedEquasion(startTranslateSpeed, normalizeX, fromX, toX) * isReversed, 
            ovalEquasion(normalizeX, deflectionX, deflectionY) * isReversed
        ])

        group.current.position.x = coordX
        group.current.position.y = coordY
        group.current.rotateOnAxis(new Vector3(0, 1, 0), speed)
    })

    return group;
}