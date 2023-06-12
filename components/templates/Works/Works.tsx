"use client";

import { getPosts } from "@utils";
import { FC, useRef } from "react";
import { WorksItem } from "./WorksItem";
import { useInfiniteQuery } from "react-query";
import { MediaQueries, useMedia } from "@hooks";
import { getSkeletonHeight } from "./works-utils";
import { PageProps } from "../../../app/api/posts/route";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useScroll, useMotionValueEvent, motion } from "framer-motion";


type WorksProps = {
    page: PageProps; 
}

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

export const Works: FC<WorksProps> = ({ page }) => {
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
    } = useInfiniteQuery<PageProps>(
        'works',
        {
            queryFn: ({ pageParam = 1 }) => getPosts({ pageParam }, true),
            getNextPageParam: (lastPage) => lastPage.nextPage,
            initialData: {
                pageParams: [undefined],
                pages: [page]
            }
        }
    );

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest === 1 && hasNextPage) fetchNextPage();
    });

    return (
        <section className="section">
            <div className="container">
                <motion.h1
                    initial="hidden"
                    animate="visible"
                    variants={titleAnimation}
                    className="h2 text-center my-16 md:my-20"
                >
                    Works
                </motion.h1>
                {status !== "error" && (
                    <div ref={wrapRef}>
                        <ul>
                            {data?.pages.map(page => Array.isArray(page?.works) && page.works.map(work => (
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
                    </div>
                )}
            </div>
        </section>
    );
};