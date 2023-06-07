'use client';

import { FC, useRef } from "react";
import { useAppScroll } from "@hooks";
import { motion } from "framer-motion";
import { getWindowProp } from "@utils";


type ContactTitleProps = {
    page?: boolean;
}

export const ContactTitle: FC<ContactTitleProps> = ({page}) => {
    const titleElement = useRef<HTMLDivElement>(null);
    const getBottomOffset = () => (getWindowProp('innerHeight') || 0)*-0.8;
    
    const [y, opacity] = useAppScroll(titleElement, {
        point: '-50px',
        offset: [`center`, `${getBottomOffset()}px`]
    });
    
    return (
        <div className="text-center" ref={titleElement}>
            {page ? (
                <h1 className="h2 mb-16">Contact</h1>
            ) : (
                <motion.h2 className="h3 mb-24" style={{ y, opacity }}>Contact</motion.h2>
            )}
        </div>
    );
};