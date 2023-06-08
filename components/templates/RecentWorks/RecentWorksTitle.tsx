'use client';

import { useAppScroll } from "@hooks";
import css from "./RecentWorks.module.css";
import { MediaQueries, useMedia } from "@hooks";
import { motion, useScroll, useTransform } from "framer-motion";
import { FC, useRef, forwardRef, useImperativeHandle } from "react";


const titlePositions: MediaQueries<number> = {
    default: 128,
    xl: 128,
    lg: 100
}

export const RecentWorksTitle: FC = forwardRef((props, ref) => {
    const titleElement = useRef<HTMLDivElement>(null);
    const [y, opacity] = useAppScroll(titleElement);
    const titleY = useMedia(titlePositions);
    const { scrollYProgress } = useScroll({
        target: titleElement,
        offset: ["end end", `start ${titleY}px`]
    });
    const position = useTransform(scrollYProgress, (latest) => latest === 1 ? 'fixed' : 'absolute');
    const top = useTransform(scrollYProgress, (latest) => latest === 1 ? `${titleY}px` : '0px');
    
    useImperativeHandle(ref, () => titleElement.current);

    return (
        <div ref={titleElement} className={css.title}>
            <motion.div className="text-center left-0 w-full" style={{ position, top }}>
                <div className="container">
                    <motion.h2 className="h3 mb-3 lg:mb-7" style={{ y, opacity }}>My Recent Work</motion.h2>
                    <motion.p className="text-gray pt-0.5 text-xl leading-tight" style={{ opacity }}>
                        Here is either what I developed, or what I took part in
                    </motion.p>
                </div>
            </motion.div>
        </div>
    );
});

RecentWorksTitle.displayName = "RecentWorksTitle";