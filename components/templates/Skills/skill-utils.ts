import { RefObject } from "react";
import { MediaQueries } from "@hooks";
import { getMedia, getWindowProp }  from "@utils";


type MediaСoefficient = {
    offset: number,
    length: number
};

const getCoefs = (offset: number, length: number): MediaСoefficient => ({length, offset});

export const pathUpdate = function(this: RefObject<any>, latest: number) {
    const item = this.current;
    const wWidth = getWindowProp('innerWidth') || 0;
    const wHeight = getWindowProp('innerHeight') || 0;
    const path = item?.querySelectorAll('svg path')[1] as SVGPathElement;
    const mediaValues: MediaQueries<MediaСoefficient> = {
        default: getCoefs(wHeight/7, -25),
        lg: getCoefs(wHeight/7, -25),
        md: getCoefs(wHeight/2.4, -25),
        sm: getCoefs(wHeight/2.6, -25),
        xs: getCoefs(wHeight/2.3, -25)
    };
    const coefs = getMedia(mediaValues, wWidth);

    if (!item || !path)
        return;

    let scroll = latest - ( item.offsetTop - coefs.offset);
    let percent = item.offsetHeight/100;
    let currentPercent = scroll/percent;

    if (currentPercent < 0)
        currentPercent = 0;
    
    if (currentPercent > 100)
        currentPercent = 100;

    const pathLength = path.getTotalLength()-coefs.length;
    const currentLength = pathLength/100*currentPercent;
    const normalizeLength = pathLength+coefs.length*2;

    path.style.strokeDasharray = `${normalizeLength}px ${currentLength}px`;
    path.style.strokeDashoffset = `${normalizeLength}px`;
}