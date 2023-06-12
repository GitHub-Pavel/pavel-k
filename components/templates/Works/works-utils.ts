import { getWindowProp } from "@utils";

export const getSkeletonHeight = (coef: number) => {
    const height = getWindowProp('innerHeight') || 0;
    return height - coef;
};