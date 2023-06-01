'use client';

import { ArrowDown } from "@icons";
import css from "./SkillsTransition.module.css";
import { useScroll, useTransform, motion } from "framer-motion";
import { FC, useRef, RefObject, useState, useEffect } from "react";

export const SkillsTransitionLine: FC = () => {
    const [maxHeight, setMaxHeight] = useState(0);
    const lineElement = useRef<HTMLDivElement | null>(null);
    
    const getCurrentHeight = () => {
        if (!lineElement.current)
            return 0;

        const svg = lineElement.current.querySelector('svg');

        if (!svg)
            return lineElement.current.offsetHeight;

        return lineElement.current.offsetHeight - svg.getBoundingClientRect().height - 35;
    };
    const resizeHandler = () => setMaxHeight(getCurrentHeight());

    useEffect(() => {
        resizeHandler();

        window.addEventListener('resize', resizeHandler);
        return () => {
            window.removeEventListener('resize', resizeHandler);
        }
    }, []);

    return (
        <div className={css.lineBox} ref={lineElement}>
            {maxHeight && (
                <MotionLine 
                    target={lineElement}
                    maxHeight={maxHeight}
                />
            )}
            <ArrowDown />
        </div>
    );
};

const MotionLine: FC<{
    maxHeight: number,
    target: RefObject<HTMLElement>,
}> = ({
    target,
    maxHeight
}) => {
    const { scrollYProgress } = useScroll({
        target,
        offset: ["center start", "2 2"]
    });
    const height = useTransform(scrollYProgress, [1, 0], [0, maxHeight]);

    return (
        <motion.div 
            className={css.line}
            style={{ height }}
        />
    );
};