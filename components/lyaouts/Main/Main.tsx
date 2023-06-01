"use client";

import classNames from "classnames";
import { motion } from "framer-motion";
import { useAppSelector } from "@hooks";
import { FC, ReactNode, useEffect } from "react";


type MainProps = {
    children: ReactNode;
    className?: string;
    animate?: boolean;
}

const mainAnimation = {
    hidden: {
        opacity: 0,
        y: 100
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.2,
            delay: 0.2
        }
    }
};

type Animate = keyof typeof mainAnimation;

export const Main: FC<MainProps> = ({children, animate, className}) => {
    const isDocumentReady = useAppSelector(store => store.common.isDocumentReady);
    const animationType: Animate = isDocumentReady ? "visible" : "hidden";
    const initialType: Animate = animate ? "hidden" : "visible";
    const mainClasses = classNames("flex-1", className);

    useEffect(() => {
        window.scrollTo({top:0});
    }, []);

    if (!animate) return (
        <main className={mainClasses}>
            {children}
        </main>
    );
    
    return (
        <motion.main
            variants={mainAnimation}
            className={mainClasses}
            animate={animationType}
            initial={initialType}
        >
            {children}
        </motion.main>
    );
}