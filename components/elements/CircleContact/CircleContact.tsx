'use client';

import { FC } from "react";
import { Portal } from "@components";
import { ContactCircle } from "@icons";
import { motion } from "framer-motion";
import css from "./CircleContact.module.css";
import { useAppSelector, usePopup } from "@hooks";


const circleAnimation = {
    hidden: {
        opacity: 0,
        scale: 1.2
    },
    vidible: {
        opacity: 1,
        scale: 1
    }
}

export const CircleContact: FC = () => {
    const callPopup = usePopup('contact');
    const isDocumentReady = useAppSelector(store => store.common.isDocumentReady);
    const animationType: keyof typeof circleAnimation = isDocumentReady ? "vidible" : "hidden";

    return (
        <Portal>
            <motion.div
                variants={circleAnimation}
                animate={animationType}
                className={css.wrap}
                transition={{
                    delay: 0.6,
                    duration: 0.5
                }}
                initial="hidden"
            >
                <button 
                    className={css.button}
                    onClick={callPopup}
                    title="Contact me"
                >
                    <ContactCircle className={css.icon} />
                </button>
            </motion.div>
        </Portal>
    );
}