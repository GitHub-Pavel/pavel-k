'use client';

import Image from "next/image";
import classNames from "classnames";
import { FC, useState } from "react";
import css from "./SkeletonImage.module.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

type SkeletonImageProps = {
    src: string;
    width: number;
    height: number;
    alt: string;
    className?: string;
};

export const SkeletonImage: FC<SkeletonImageProps> = ({className, width, height, ...props}) => {
    const [isLoaded, setLoaded] = useState(false);
    const SkeletonClasses = classNames(className, css.img);

    const loadingHandler = () => {
        setLoaded(true);
    }

    return (
        <div className={SkeletonClasses}>
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
}