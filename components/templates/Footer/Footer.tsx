'use client';

import { FC } from "react";
import { motion } from "framer-motion";
import { useAppSelector } from "@hooks";
import { SocialList } from "@components";
import { FooterMenu } from "./FooterMenu";

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
    const isDocumentReady = useAppSelector(store => store.common.isDocumentReady);
    const animationType: keyof typeof reservedAnimation = isDocumentReady ? "visible" : "hidden";

    return (
        <footer className="pb-10 pt-24">
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