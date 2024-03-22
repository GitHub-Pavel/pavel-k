import { Euler } from "three";
import { PiramydProps } from "../components/piramyd/Piramyd";


export const PIRAMYDS: PiramydProps[] = [
    {
        speed: 0.0005,
        startPosition: [-7, -6, 0]
    },
    {
        scale: 0.7,
        position: [3.6, .8, 0],
        startPosition: [6.6, -.1, 0],
        rotation: new Euler(Math.PI / 11 * -1, 0, Math.PI / 10)
    }
]