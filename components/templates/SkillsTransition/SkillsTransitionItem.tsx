'use client';

import { Skills } from "@icons";
import { FC, useRef } from "react";
import css from "./SkillsTransition.module.css";
import { useScroll, useTransform, motion } from "framer-motion";

export const SkillsTransitionItem: FC<{
    index: number
}> = ({
    index
}) => {
    const wordElement = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: wordElement,
        offset: [`start ${index/7}`, `0.7 0.7`]
    });
    const opacity = useTransform(scrollYProgress, [1, 0], [0, 1]);

    return (
        <motion.div
            className={css.skillsWord}
            style={{ opacity }}
            ref={wordElement}
        >
            <Skills />
        </motion.div>
    );
};