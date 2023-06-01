'use client';

import css from "./TypeWriter.module.css";
import { FC } from "react";
import { motion } from "framer-motion";
import { useAppSelector } from "@hooks";
import classNames from "classnames";


type TypeWriterProps = {
    content: string;
    separaton?: string;
    className?: string;
    delayIndex?: number;
    staggerChildren?: number;
    lettersAnimation?: boolean;
}

const child = {
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            damping: 12,
            stiffness: 100,
        },
    },
    hidden: {
        opacity: 0,
        y: 10,
        transition: {
            type: "spring",
            damping: 12,
            stiffness: 100,
        },
    },
};

export const TypeWriter: FC<TypeWriterProps> = ({
    content,
    className,
    separaton = '|',
    delayIndex = 0.14,
    staggerChildren = 0.06,
    lettersAnimation = false
}) => {
    const itemsSeparator = lettersAnimation ? "" : "\u00A0";
    const isDocumentReady = useAppSelector(store => store.common.isDocumentReady);
    const items = lettersAnimation ? Array.from(content) : content.split(separaton);
    const isReadyAnimation: keyof typeof container = isDocumentReady ? "visible" : "hidden";

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren, delayChildren: delayIndex * i },
        }),
    };

    return (
        <motion.span
            initial="hidden"
            variants={container}
            viewport={{ once: true }}
            whileInView={isReadyAnimation}
            className={classNames(css.typeWriter, className)}
        >
            <span>
                {items.map((item, index) => (
                    <motion.span 
                        key={index} 
                        variants={child} 
                        dangerouslySetInnerHTML={{ __html: 
                            index === items.length-1 ? item : item+itemsSeparator
                        }}
                    />
                ))}
            </span>
        </motion.span>
    );
};