'use client';

import jump from "jump.js";
import { FC, useRef } from "react";
import { MouseDown } from "@icons";
import { motion } from "framer-motion";
import { useAppSelector } from "@hooks";
import css from "./NextSection.module.css";

const buttonAnimation = {
    hidden: {
        opacity: 0,
        y: 20
    },
    visible: {
        opacity: 1,
        y: 0
    }
}

export const NextSection: FC = () => {
    const buttonElement = useRef<HTMLButtonElement | null>(null);
    const isDocumentReady = useAppSelector(store => store.common.isDocumentReady);
    const animationType: keyof typeof buttonAnimation = isDocumentReady ? "visible" : "hidden";

    const clickHandler = () => {
        const section = buttonElement.current?.closest('section');
        if (section) jump(section.offsetHeight, {
            offset: -80
        });
    }

    return (
        <motion.button 
            whileInView={animationType}
            variants={buttonAnimation}
            className={css.button} 
            onClick={clickHandler}
            title={'Scroll down'} 
            ref={buttonElement}
            initial="hidden"
            transition={{
                delay: 0.5,
                duration: 0.5
            }}
            viewport={{
                once: true
            }}
        >
            <MouseDown className={css.icon} />
        </motion.button>
    );
};