'use client';

import { RefObject } from "react";

export const getTargetScroll = (
    target: RefObject<HTMLElement>,
    offset?: number
): number => {
    const element = target.current;
    const currentOffset = offset || 0;
    
    if (
        typeof window === "undefined"
        || element === null
    ) return 0;

    const scrollY = window.scrollY;
    const scroll = scrollY - ( element.offsetTop - currentOffset );
    const percent = element.offsetHeight/100;
    const currentPercent = scroll/percent;

    if (currentPercent < 0) return 0;
    if (currentPercent > 100) return 100;

    return currentPercent;
};

export const normalizeScroll = (
    scroll: number,
    startpoint: number,
    endpoint: number
) => {
    if (scroll < startpoint) return 0;
    if (scroll > endpoint) return 100;

    return (scroll - startpoint) / (endpoint - startpoint) * 100;
}