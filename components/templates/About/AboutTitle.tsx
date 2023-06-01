'use client';

import { FC, useRef } from "react";
import css from "./About.module.css";
import { motion } from "framer-motion";
import { useAppScroll } from "@hooks";
import { getWindowProp } from "@utils";
import classNames from "classnames";


type AboutTitleProps = {
    page?: boolean;
}

export const AboutTitle: FC<AboutTitleProps> = ({page}) => {
    const titleElement = useRef<HTMLDivElement>(null);
    const getBottomOffset = () => (getWindowProp('innerHeight') || 0)*-0.8;
    
    const [y, opacity] = useAppScroll(titleElement, {
        point: '-50px',
        offset: [`center`, `${getBottomOffset()}px`]
    });

    const titleClasses = classNames(css.title, {[css.center]: page}); 

    return (
        <div className={titleClasses} ref={titleElement}>
            {page ? (
                <h1 className="h2">About me</h1>
            ) : (
                <motion.h2 className="h3" style={{ y, opacity }}>About me</motion.h2>
            )}
        </div>
    );
};