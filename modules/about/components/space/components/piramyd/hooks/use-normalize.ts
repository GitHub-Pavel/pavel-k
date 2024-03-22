import { useMemo } from "react";

type NormalizeProps = {
    position: number[];
    startPosition: number[];
}

type NormalizeResult = {
    normalize: (coords: number[]) => number[];
    getCoords: (coords: number[]) => number[];
}

export function useNormalize({
    position, 
    startPosition
}: NormalizeProps): NormalizeResult {
    const [centerX, centerY] = useMemo(() => {
        const [toX, toY] = position;
        const [fromX, fromY] = startPosition;
        
        if (fromX - toX > 0) return [fromX, toY]
        return [toX, fromY]
    }, [position, startPosition]);


    return {
        getCoords: ([x,y]) => [x+centerX, y+centerY],
        normalize: ([x,y]) => [x-centerX, y-centerY]
    }
} 