'use client';

import { DirectionalLight, Mesh, MeshStandardMaterial, Vector3 } from 'three';
import { PIRAMYDS } from "./configs"
import { Piramyd } from "./components"
import { Suspense, useRef } from 'react'
import { Preload } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { normalizeEquasion, speedEquasion } from '@/utils';
import { useCommonStore } from '@/store';

type SpaceProps = {
    className?: string;
}

const Sphere = ({position}: {position: number[]}) => {
    const mesh = useRef<Mesh>(null)
    const material = useRef<MeshStandardMaterial>(null)
    const { isLoaded } = useCommonStore((state) => state)
    useFrame(() => {
        const z = position[2]
        const opacity = normalizeEquasion(Math.abs(mesh.current!.position.z), z, z-z/5)
        const speed = speedEquasion(20, Math.abs(mesh.current!.position.z), z, z-z/4)

        if (!isLoaded || mesh.current!.position.z > 0) return

        mesh.current!.position.z += (speed < 0 ? 0 : speed) + 0.1
        material.current!.opacity = opacity > 1 ? 1 : opacity 
    })

    return (
        <mesh position={new Vector3(...position)} ref={mesh}>
            <sphereGeometry args={[2]}/>
            <meshStandardMaterial 
                ref={material} 
                color="#fff" 
                transparent 
                opacity={0} 
                emissive="#686868"
                roughness={0.5}
                metalness={0}
            />
        </mesh>
    );
}

export const Space = ({
    className
}: SpaceProps) => {
    return (
        <div className={className}>
            <Canvas>
                <Suspense fallback={null}>
                    {PIRAMYDS.map((piramydProps,key) => (
                        <Piramyd key={key} {...piramydProps}/>
                    ))}
                    <Preload all/>
                </Suspense>
                <ambientLight intensity={0.3} />
                <directionalLight position={[-5, 10, 0]} intensity={1} rotateX={(angle) => new DirectionalLight()} />
                {Array(100).fill('1').map((v,i) => (
                    <Sphere key={v+i} position={[Math.random() * 400 - 200,Math.random() * 400 - 200,Math.random() * -5000]}/>
                ))}
            </Canvas>
        </div>
    );
}