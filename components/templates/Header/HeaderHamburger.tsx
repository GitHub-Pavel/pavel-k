'use client';

import { Hamb } from '@icons';
import classNames from 'classnames';
import css from './Header.module.css';
import { useIsPopup, usePopup } from '@hooks';
import { FC, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export const HeaderHamburger: FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const isPopup = useIsPopup('main-menu');
    const callPopup = usePopup('main-menu');
    const buttonElement = useRef<HTMLButtonElement | null>(null);

    const hambClasses = classNames(css.hamb, {
        [css.hambActive]: isPopup
    });

    const clickHandler = () => {
        if (isPopup)
            return router.push(pathname);
        callPopup();
    }

    const setSvgLength = () => {
        const svg = buttonElement.current?.querySelector('svg');
        const path = svg?.querySelectorAll<SVGPathElement>('path');
        
        if (path?.length) {
            const totalLength = Math.round( path[0].getTotalLength() - path[2].getTotalLength() );;
            svg?.setAttribute('style', `--active-hamb-length: -${totalLength}px;`);
        }
    }

    useEffect(() => {
        setSvgLength();
        window.addEventListener('resize', setSvgLength);
        return () => {
            window.removeEventListener('resize', setSvgLength);
        };
    }, []);

    return (
        <button 
            className={hambClasses} 
            onClick={clickHandler} 
            ref={buttonElement} 
            title='Open menu'
        >
            <Hamb className={css.hamb__icon} />
        </button>
    );
}