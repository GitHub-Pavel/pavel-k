"use client";

import { FC, ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@hooks";
import { Portal } from "../Portal/Portal";
import css from "./Notifications.module.css";
import { commonActions } from "@store";
import { Close } from "@icons";


const popupBodyClass = 'noscroll';
const popupAnimation = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1 }
};
const backgroundAnimation = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
};

type NotificationProps = {
    children: ReactNode;
}

export const Notification: FC<NotificationProps> = ({children}) => {
    const dispatch = useAppDispatch();
    const [isOpen, setClose] = useState(true);
    const notification = useAppSelector(store => store.common.notification);
    const isDocumentReady = useAppSelector(store => store.common.isDocumentReady);
    const animationType: keyof typeof popupAnimation = isDocumentReady && isOpen ? "visible" : "hidden";

    const closeHandler = () => {
        setClose(() => false);
    }
    const closedHandler = () => {
        if (notification && !isOpen)
            dispatch(commonActions.setNotification(false));
    }

    useEffect(() => {
       document.body.classList.add(popupBodyClass);
       return () => {
           document.body.classList.remove(popupBodyClass);
       } 
    }, []);

    return (
        <Portal>
            <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-40">
                <motion.div
                    initial="hidden"
                    onClick={closeHandler} 
                    animate={animationType}
                    className={css.background}
                    variants={backgroundAnimation}
                />
                <motion.div 
                    initial="hidden"
                    className={css.wrap}
                    animate={animationType}
                    variants={popupAnimation}
                    onAnimationComplete={closedHandler}
                >
                    <button 
                        className={css.close} 
                        onClick={closeHandler}
                    >
                        <Close />
                    </button>
                    {children}
                </motion.div>
            </div>
        </Portal>
    );
}