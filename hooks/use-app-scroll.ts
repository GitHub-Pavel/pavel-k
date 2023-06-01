'use client';

import { RefObject } from "react";
import { useScroll, useTransform } from "framer-motion";

type OptionsProps = {
    offset?: any;
    point?: string;
    opacityDelay?: number;
};

const initialOptions = {
    offset: [0, 1],
    point: "-100px",
    opacityDelay: 0.2
};

export const useAppScroll = (
    target: RefObject<HTMLElement>, 
    options?: OptionsProps
) => {
    options = {...initialOptions, ...options};
    const {offset, point, opacityDelay = 0} = options;

    const { scrollYProgress } = useScroll({ target, offset });
    const first = useTransform(scrollYProgress, [1, 0], [point, '0px']);
    const second = useTransform(scrollYProgress, [1, opacityDelay], [0, 1]);

    return [first, second];
}