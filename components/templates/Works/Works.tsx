"use client";

import axios from "axios";
import { getWindowProp, serialize } from "@utils";
import { FC, useRef } from "react";
import classNames from "classnames";
import { MediaQueries, useMedia } from "@hooks";
import { WorksItem } from "./WorksItem";
import { useInfiniteQuery } from "react-query";
import { PageProps } from "../../../app/api/posts/route";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useScroll, useMotionValueEvent, motion } from "framer-motion";


const titleAnimation = {
    hidden: {
        opacity: 0,
        y: 100
    },
    visible: {
        opacity: 1,
        y: 0
    }
}

const getSkeletonHeight = (coef: number) => {
    const height = getWindowProp('innerHeight') || 0;
    return height - coef;
};

export const Works: FC = () => {
    const wrapRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: wrapRef,
        offset: ["start start", "end end"]
    });
    const mediaValues: MediaQueries<number> = {
        default: 628,
        xl: 628,
        lg: getSkeletonHeight(330),
        xs: getSkeletonHeight(300),
        sm: getSkeletonHeight(280)
    };
    const skeletonHeight = useMedia(mediaValues);

    const {
        data,
        status,
        hasNextPage,
        fetchNextPage
    } =
        useInfiniteQuery<PageProps>(
        'works', 
        ({ pageParam = 1 }) => {
            return axios.get<PageProps>(`/api/posts?${serialize({page: pageParam})}`)
                .then(res => res.data)
        },
        {
            getNextPageParam: (lastPage) => lastPage.nextPage
        }
    );

    const hasPages = data && Boolean(data.pages.length);
    const sectionClasses = classNames({"section": hasPages});

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest === 1 && hasNextPage) fetchNextPage();
    });

    return (
        <section className={sectionClasses}>
            <div className="container">
                {status === "error" || hasPages && (
                    <motion.h1
                        initial="hidden"
                        animate="visible"
                        variants={titleAnimation}
                        className="h2 text-center my-16 md:my-20"
                    >Works</motion.h1>
                )}
                {status !== "error" && (
                    <div ref={wrapRef}>
                        {!hasPages ? (
                            <SkeletonTheme baseColor="rgb(var(--primary-rgb))" highlightColor="rgb(var(--dark-rgb))">
                                <Skeleton 
                                    width={wrapRef.current?.offsetWidth || 0}
                                    className="h-screen"
                                />
                            </SkeletonTheme>
                        ) : (
                            <ul>
                                {data.pages.map(page => page.works.map(work => (
                                    <WorksItem 
                                        {...work}
                                        key={work.id}
                                    />
                                )))}
                                {hasNextPage && (
                                    <SkeletonTheme baseColor="rgb(var(--primary-rgb))" highlightColor="rgb(var(--dark-rgb))">
                                        <li>
                                            <Skeleton 
                                                height={skeletonHeight}
                                                width={wrapRef.current?.offsetWidth || 0}
                                            />
                                        </li>
                                    </SkeletonTheme>
                                )}
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};