'use client';

import Image from "next/image";
import classNames from "classnames";
import { motion } from "framer-motion";
import { forwardRef, useState } from "react";
import css from "./SkeletonImage.module.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

type SkeletonImageProps = {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
    priority?: boolean;
};

export const SkeletonImage = forwardRef<HTMLDivElement, SkeletonImageProps>(({className, width, height, ...props}, ref) => {
    const [isLoaded, setLoaded] = useState(false);
    const SkeletonClasses = classNames(className, css.img);

    const loadingHandler = () => {
        setLoaded(true);
    }

    return (
        <div className={SkeletonClasses} ref={ref}>
            {!isLoaded && (
                <SkeletonTheme baseColor="rgb(var(--primary-rgb))" highlightColor="rgb(var(--dark-rgb))">
                    <div className={css.loading}>
                        <Skeleton />
                    </div>
                </SkeletonTheme>
            )}
            <Image
                {...props}
                width={width}
                quality={100}
                height={height}
                onLoad={loadingHandler}
            />
        </div>
    );
});

SkeletonImage.displayName = "SkeletonImage";

export const MotionSkeletonImage = motion(SkeletonImage);