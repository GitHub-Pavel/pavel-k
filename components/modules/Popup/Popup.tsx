'use client';

import { Close } from "@icons";
import css from "./Popup.module.css";
import { motion } from "framer-motion";
import { Portal } from "../Portal/Portal";
import { Popups, commonActions } from "@store";
import { FC, ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector, useEmitter, useIsPopup } from "@hooks";


const popupBodyClass = 'noscroll';
const popupAnimation = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1 }
};
const backgroundAnimation = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
};
const mainMenuAnimation = {
    hidden: { opacity: 0, height: '0vh' },
    visible: { opacity: 1, height: '100vh' }
};


type PopupProps = {
    name: Popups;
    children: ReactNode;
    isMainMenu?: boolean;
};

export const Popup: FC<PopupProps> = ({
    name, 
    children, 
    isMainMenu = false,
}) => {
    const router = useRouter();
    const emitter = useEmitter();
    const pathname = usePathname();
    const isPopup = useIsPopup(name);
    const dispatch = useAppDispatch();
    const popup = useAppSelector(store => store.common.currentPopup);
    const isDocumentReady = useAppSelector(store => store.common.isDocumentReady);

    const isCurrentPopup = popup && popup === name;
    const animationType: keyof typeof popupAnimation = isDocumentReady && isPopup ? "visible" : "hidden";

    const closeHandler = () => router.push(pathname);
    const closedHandler = () => {
        if (!isPopup && isCurrentPopup) {
            dispatch(commonActions.setPopup(false));
            emitter.emit('popup/close');
        }
    };

    
    useEffect(() => {
        const mainMenuClass = isMainMenu && window.scrollY === 0 && "scroll-no-top";

        if (isPopup && !isCurrentPopup) {
            dispatch(commonActions.setPopup(name));
        }

        if (!isPopup) {
            document.body.classList.remove(popupBodyClass);
            if (mainMenuClass) document.body.classList.remove(mainMenuClass);
        }

        setTimeout(() => {
            if (isPopup) {
                document.body.classList.add(popupBodyClass);
                if (mainMenuClass) document.body.classList.add(mainMenuClass);
            }
        }, 0);
    }, [isPopup]);

    if (!isCurrentPopup) return null;

    return (
        <Portal>
            {isMainMenu ? (
                <motion.div
                    initial="hidden"
                    animate={animationType}
                    variants={mainMenuAnimation}
                    onAnimationComplete={closedHandler}
                    className="fixed top-0 left-0 w-screen flex flex-col z-20 bg-primary"
                >
                    {children}
                </motion.div>
            ) : (
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
            )}
        </Portal>
    );
};