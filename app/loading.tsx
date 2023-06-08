'use client';

import { Fragment, useLayoutEffect, useEffect } from "react";


export default function Loading() {
    useLayoutEffect(() => {
        document.body.classList.add('loading');
    }, []);
    
    useEffect(() => {
        return () => {
            document.body.classList.remove('loading');
        }
    }, []);

    return (
        <Fragment />
    );
}