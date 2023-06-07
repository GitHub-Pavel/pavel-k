import _ from "lodash";
import { MediaQueries } from "@hooks";


const mediaQueries: MediaQueries<number> = {
    xs: 0,
    sm: 600,
    md: 730,
    lg: 984,
    xl: 1155,
    default: 1480
}

export const getMedia = <T>(queries: MediaQueries<T>, width: number) => {
    let currentValue: T | undefined = undefined;

    _.forIn(mediaQueries, (value, screen) => {
        const key = screen as keyof MediaQueries<T>;
        const result = queries[key];

        if (currentValue === undefined) currentValue = result;
        if (value && width > value && result) currentValue = result;
    });

    if (currentValue === undefined) return queries.default;
    return currentValue;
}