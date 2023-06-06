import { useState } from "react";
import { useWindow } from "./use-window";
import _ from "lodash";

export type MediaQueries<T> = {
    default: T;
    xs?: T;
    sm?: T;
    md?: T;
    lg?: T;
    xl?: T;
}

const mediaQueries: MediaQueries<number> = {
    xs: 0,
    sm: 600,
    md: 730,
    lg: 984,
    xl: 1155,
    default: 1480
}

export const useMedia = <T>(queries: MediaQueries<T>) => {
    let currentValue: T | undefined = undefined;
    const [width] = useWindow();

    _.forIn(mediaQueries, (value, screen) => {
        const key = screen as keyof MediaQueries<T>;
        const result = queries[key];

        if (currentValue === undefined) currentValue = result;
        if (value && width > value && result) currentValue = result;
    });

    if (currentValue === undefined) return queries.default;
    return currentValue;
}