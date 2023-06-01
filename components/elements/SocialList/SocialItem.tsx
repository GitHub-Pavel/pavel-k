'use client';

import classNames from "classnames";
import { FC, ReactNode } from "react";
import { motion } from "framer-motion";
import css from "./SocialList.module.css";


export type SocialProps = {
    slug: string;
    url: string;
}

type SocialItemProps = {
    index: number;
    delay: number;
    icon: ReactNode;
} & SocialProps;

const itemAnimation = (index: number, delay: number) => ({
    hidden: {
        y: 50,
        opacity: 0,
    },
    visible:  {
        y: 0,
        opacity: 1,
        transition: {
            delay: index * 0.1 + delay
        }
    }
});

export const SocialItem: FC<SocialItemProps> = ({
    icon, slug, url, index, delay
}) => {
    const itemClasses = classNames(css[slug], css.item);

    return (
        <motion.li 
            initial="hidden"
            whileInView="visible"
            className={itemClasses}
            variants={itemAnimation(index, delay)}
        >
            <a 
                href={url} 
                className={css.link}
                rel="noopener noreferrer"
                target="_blank" 
            >
                {icon}
            </a>
        </motion.li>
    );
};