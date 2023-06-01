'use client';

import { FC } from 'react';
import css from './Header.module.css';
import { motion } from 'framer-motion';
import { useAppSelector } from '@hooks';
import { HeaderLogo } from './HeaderLogo';
import { HeaderContact } from './HeaderContact';
import { HeaderHamburger } from './HeaderHamburger';

const headerAnimation = {
    hidden: {
        opacity: 0,
        y: -50
    },
    visible: {
        opacity: 1,
        y: 0
    }
}

export const Header: FC = () => {
    const isDocumentReady = useAppSelector(store => store.common.isDocumentReady);
    const animationType: keyof typeof headerAnimation = isDocumentReady ? "visible" : "hidden";

    return (
        <motion.header 
            initial="hidden"
            className={css.header}
            animate={animationType}
            variants={headerAnimation}
        >
            <div className="container">
                <div className={css.row}>
                    <div className="flex justify-start">
                        <HeaderLogo />
                    </div>
                    <div>
                        <HeaderContact />
                    </div>
                    <div className="flex justify-end">
                        <HeaderHamburger />
                    </div>
                </div>
            </div>
        </motion.header>
    );
}