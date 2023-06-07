import { getMedia } from "@utils";
import { useWindow } from "./use-window";


export type MediaQueries<T> = {
    default: T;
    xs?: T;
    sm?: T;
    md?: T;
    lg?: T;
    xl?: T;
}

export const useMedia = <T>(queries: MediaQueries<T>) => {
    const [width] = useWindow();
    return getMedia(queries, width);
}