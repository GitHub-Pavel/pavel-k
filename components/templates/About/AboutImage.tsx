'use client';

import { FC, useRef } from "react";
import css from "./About.module.css";
import { useAppScroll } from "@hooks";
import { motion } from "framer-motion";
import { getWindowProp } from "@utils";
import { SkeletonImage } from "@components";


export const AboutImage: FC = () => {
    const imageElement = useRef<HTMLDivElement>(null);
    const getTopOffset = () => (getWindowProp('innerHeight') || 0)/12+'px';
    const getBottomOffset = () => (getWindowProp('innerHeight') || 0)*-1+'px';
    
    const [x, opacity] = useAppScroll(imageElement, {
        point: '-50px',
        offset: [getTopOffset(), getBottomOffset()],
        opacityDelay: 0.2
    });

    return (
        <motion.div 
            ref={imageElement} 
            className="relative"
            style={{ x, opacity }}
        >
            <SkeletonImage 
                className={css.img}
                src="/about.jpeg"
                alt="About me"
                height={631}
                width={631}
            />
        </motion.div>
    );
};