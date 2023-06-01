'use client';

import { FC } from 'react';
import { usePopup } from '@hooks';
import css from './Header.module.css';

export const HeaderContact: FC = () => {
    const callPopup = usePopup('contact');

    return (
        <button className={css.button} onClick={callPopup}>Contact me</button>
    );
};