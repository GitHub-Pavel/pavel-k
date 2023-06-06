'use client';

import { FC, useRef } from "react";
import { motion } from "framer-motion";
import { useAppSelector } from "@hooks";
import { SocialList } from "@components";
import { FooterMenu } from "./FooterMenu";
import { useScroll, useMotionValueEvent } from "framer-motion";

const reservedAnimation = {
    hidden: {
        opacity: 0,
        y: 50
    },
    visible: {
        opacity: 1,
        y: 0
    }
};

export const Footer: FC = () => {
    const footerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: footerRef,
        offset: ["0.8 center", "center end"]
    });
    const isDocumentReady = useAppSelector(store => store.common.isDocumentReady);
    const animationType: keyof typeof reservedAnimation = isDocumentReady ? "visible" : "hidden";
    
    useMotionValueEvent(scrollYProgress, 'change', latest => {
        if (latest === 1) return document.body.classList.remove('footer-visible');
        document.body.classList.add('footer-visible');
    });

    return (
        <footer className="pb-10 pt-24" ref={footerRef}>
            <div className="container">
                <div className="flex flex-col items-center">
                    <SocialList />
                    <FooterMenu />
                    <motion.div 
                        initial="hidden"
                        whileInView={animationType}
                        variants={reservedAnimation}
                        className="text-less text-gray"
                    >
                        ©{new Date().getFullYear()} Pavel Khatkevich | All Rights Reserved
                    </motion.div>
                </div>
            </div>
        </footer>
    );
};