'use client';

import { FC } from "react";
import { useWindow } from "@hooks";
import css from "./Work.module.css";
import { motion } from "framer-motion";
import { SkeletonImage } from "@components";
import { WorkProps } from "../../../app/api/posts/route";


const workAnimation = {
    hidden: {
        opacity: 0,
        y: 150
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4
        }
    }
}

const titleAnimation = {
    hidden: {
        opacity: 0,
        y: -100,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.2,
            delay: 0.2
        }
    }
}

const linkAnimation = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.2,
            delay: 0.2
        }
    }
}

export const WorksItem: FC<WorkProps> = ({
    image, title, url, tablet
}) => {
    const [width] = useWindow();

    return (
        <motion.li 
            initial="hidden"
            className={css.work}
            whileInView="visible"
            variants={workAnimation}
        >
            <div className={css.wrap}>
                {width > 600 ? (
                    <SkeletonImage 
                        alt={title}
                        src={image}
                        width={1420}
                        height={800}
                        className={css.img}
                    />
                ) : (
                    <SkeletonImage 
                        alt={title}
                        src={tablet}
                        width={300}
                        height={600}
                        className={css.img}
                    />
                )}
                <div className={css.content}>
                    <motion.h3 
                        initial="hidden"
                        className="h2 mb-3 lg:mb-5 text-center"
                        whileInView="visible"
                        variants={titleAnimation}
                    >{title}</motion.h3>
                    <motion.a 
                        href={url} 
                        target="_blank" 
                        initial="hidden"
                        whileInView="visible"
                        variants={linkAnimation}
                        rel="noopener noreferrer"
                        className="link-normal text-gray"
                    >See website</motion.a>
                </div>
            </div>
        </motion.li>
    );  
};