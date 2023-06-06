'use client';

import css from "./RecentWorks.module.css";
import { SkeletonImage } from "@components";
import { transform, motion } from "framer-motion";
import { WorkProps } from "../../../app/api/posts/route";
import { getTargetScroll, normalizeScroll } from "@utils";
import { FC, RefObject, useRef, useEffect, useState } from "react";


type RecentWorkProps = {
    index: number;
    allWorks: number;
    canvas: RefObject<HTMLElement>;
} & WorkProps;

const titleAnimation = {
    hidden: {
        opacity: 0,
        y: -50
    },
    visible: {
        opacity: 1,
        y: 0
    }
}

const linkAnimation = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1
    }
}

export const RecentWork: FC<RecentWorkProps> = ({
    image, title, url, canvas, index, allWorks
}) => {
    const workRef = useRef<HTMLDivElement>(null);
    const [visibleHead, setVisibleHead] = useState(false);
    const transformerScale = transform([60, 100], [1, 2]);
    const transformerOpacity = transform([60, 90], [1, 0]);
    const transformerY = transform([0, 80], ["0%", "-100%"]);
    const animationType: keyof typeof titleAnimation = visibleHead ? "visible" : "hidden";

    const getWorkScroll = () => {
        const oneWay = 100/allWorks;
        const endpoint = oneWay * (index+1);
        const startpoint = endpoint - oneWay;
        const canvasScroll = getTargetScroll(canvas, window.innerHeight/2.3);

        return normalizeScroll(canvasScroll, startpoint, endpoint);
    };

    const animationItem = () => {
        const work = workRef.current;
        const currentPercent = getWorkScroll();

        if (!work) return;

        const start = normalizeScroll(currentPercent, 0, 65);
        const end = normalizeScroll(currentPercent, 30, 100);

        const scale = `scale(${transformerScale(end)})`;
        const y = `translateY(${transformerY(start)})`;
        const opacity = transformerOpacity(end);

        work.style.transform = `${y} ${scale}`;
        work.style.opacity = opacity.toString();

        setTimeout(() => {
            if (currentPercent > 40 && currentPercent < 80) setVisibleHead(() => true);
            if (currentPercent > 80 && currentPercent < 100) setVisibleHead(() => false);
            if (currentPercent < 40) setVisibleHead(() => false);
        }, 0);
    };
    

    useEffect(() => {
        animationItem();
        window.addEventListener('scroll', animationItem);
        window.addEventListener('resize', animationItem);
        return () => {
            window.removeEventListener('scroll', animationItem);
            window.removeEventListener('resize', animationItem);
        }
    }, []);

    return (
        <li className={css.item}>
            <div className={css.work} ref={workRef}>
                <div className={css.workWrap}>
                    <SkeletonImage 
                        alt={title}
                        src={image}
                        width={1114}
                        height={628}
                        className={css.image}
                    />
                    <div className={css.content}>
                        <motion.h3 
                            initial="hidden"
                            className="h2 xl:mb-5 md:mb-3"
                            animate={animationType}
                            variants={titleAnimation}
                        >{title}</motion.h3>
                        <motion.a 
                            href={url} 
                            target="_blank" 
                            initial="hidden"
                            animate={animationType}
                            variants={linkAnimation}
                            rel="noopener noreferrer"
                            className="link-normal text-gray"
                        >See website</motion.a>
                    </div>
                </div>
            </div>
        </li>
    );
}