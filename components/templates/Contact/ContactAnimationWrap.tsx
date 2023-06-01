'use client';

import { useAppScroll } from "@hooks";
import { motion } from "framer-motion";
import { FC, ReactNode, useRef } from "react";


type ContacFormProps = {
    children: ReactNode;
}

export const ContactAnimationWrap: FC<ContacFormProps> = ({children}) => {
    const wrapRef = useRef<HTMLDivElement>(null);
    const [y, opacity] = useAppScroll(wrapRef, {
        offset: ["center center", "1.2 1.2"],
        point: "100px"
    });

    return (
        <motion.div
            ref={wrapRef}
            style={{ y, opacity }}
        >
            {children}
        </motion.div>
    );
}