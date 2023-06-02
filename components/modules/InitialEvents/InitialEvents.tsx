'use client';

import { commonActions } from "@store";
import { ContactPopup, MainMenu, Notifications } from "@components";
import { useAppDispatch, useAppSelector } from "@hooks";
import { usePathname, useSearchParams } from "next/navigation";
import { FC, Fragment, useEffect, useLayoutEffect } from "react";


export const InitialEvents: FC = () => {
    const pathname = usePathname();
    const dispacth = useAppDispatch();
    const searchParams = useSearchParams();
    const lastScroll = useAppSelector(store => store.common.lastScrollPosition);
    const isDocumentReady = useAppSelector(store => store.common.isDocumentReady);

    const bodyLoaded = () => document.body.classList.remove('loading');
    const bodyScrolling = () => {
        if (window.scrollY > 4)
            return document.body.classList.add('scroll-no-top');
        return document.body.classList.remove('scroll-no-top');
    };
    const preloaderHandler = () => {
        if (!isDocumentReady)
            dispacth(commonActions.setDocumentReady(true));
    }

    useLayoutEffect(() => {
        window.scrollTo({ top: lastScroll });
        
        if (searchParams.toString() === "" && lastScroll !== 0)
            dispacth(commonActions.setLastScroll(0));
    }, [pathname, searchParams]);

    useEffect(() => {
        const preloader = document.getElementById('preloader');
        
        bodyScrolling();
        setTimeout(bodyLoaded, 0);

        window.addEventListener('scroll', bodyScrolling);
        preloader?.addEventListener('transitionend', preloaderHandler);
        return () => {
            window.addEventListener('scroll', bodyScrolling);
            preloader?.removeEventListener('transitionend', preloaderHandler);
        };
    }, []);

    return (
        <Fragment>
            <MainMenu />
            <ContactPopup />
            <Notifications />
        </Fragment>
    );
};