'use client';

import { useGLTF } from "@react-three/drei";
import { Euler, Vector3 } from "three";
import { usePiramyd } from "./hooks";

export type PiramydProps = {
    speed?: number;
    scale?: number;
    rotation?: Euler;
    position?: number[];
    startPosition?: number[];
    startTranslateSpeed?: number;
}

const initialRotation = new Euler(Math.PI / 5 * -1, 0, Math.PI / 4 * -1);

useGLTF.preload('/piramyd.gltf')

export const Piramyd = ({
    rotation = initialRotation,
    position = [-3.2, -2.9, 0],
    startPosition = position,
    scale = 0.5,
    ...props
}: PiramydProps) => {
    const group = usePiramyd({...props, startPosition, position})
    const { scene } = useGLTF('/piramyd.gltf')    

    return (
        <group 
            ref={group} 
            scale={scale}
            dispose={null}
            rotation={rotation}
            position={new Vector3(...startPosition)}
        >
            <primitive object={scene.clone()}/>
        </group>
    );
}