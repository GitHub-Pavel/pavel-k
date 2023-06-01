'use client';

import { FC } from "react";
import Link from "next/link";
import { Logo } from '@icons';
import css from './Header.module.css';


export const HeaderLogo: FC = () => {
    return (
        <Link href={'/'} title='Pavel K.' className={css.logotype}>
            <Logo className={css.logotype__icon} />
        </Link>
    );
};