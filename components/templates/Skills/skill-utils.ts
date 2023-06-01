import { RefObject } from "react";

export const pathUpdate = function(this: RefObject<any>, latest: number) {
    const item = this.current;
    const path = item?.querySelectorAll('svg path')[1] as SVGPathElement;

    if (!item || !path)
        return;

    let scroll = latest - ( item.offsetTop - window.innerHeight/7 );
    let percent = item.offsetHeight/100;
    let currentPercent = scroll/percent;

    if (currentPercent < 0)
        currentPercent = 0;
    
    if (currentPercent > 100)
        currentPercent = 100;

    const pathLength = path.getTotalLength();
    const currentLength = pathLength/100*currentPercent;

    path.style.strokeDasharray = `${pathLength}px ${currentLength}px`;
    path.style.strokeDashoffset = `${pathLength}px`;
}