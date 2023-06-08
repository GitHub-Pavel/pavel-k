'use client';

import axios from "axios";
import { serialize } from "@utils";
import { FC, useRef } from "react";
import classNames from "classnames";
import { useQuery } from "react-query";
import { RecentWork } from "./RecentWork";
import css from "./RecentWorks.module.css";
import { RecentWorksTitle } from "./RecentWorksTitle";
import { WorkProps } from "../../../app/api/posts/route";
import { useScroll, useTransform, motion } from "framer-motion";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";


type RecentWorksProps = {
    speed?: number;
}

const postsCount = 3;
const query = {
    count: postsCount
}

export const RecentWorks: FC<RecentWorksProps> = ({speed = 1}) => {
    const worksCanvas = useRef<HTMLDivElement>(null);
    const listClasses = classNames(css.works, "container");

    const { scrollYProgress } = useScroll({
        target: worksCanvas,
        offset: ["1.2 1.5", "1.2 1.2"]
    });
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
    const pointerEvents = useTransform(scrollYProgress, (progress) => progress === 1 ? "none" : "all");

    const { isError, isLoading, data: posts } = 
        useQuery<WorkProps[]>('recentWorks', () => 
            axios.get(`/api/posts?${serialize(query)}`)
                .then(res => res.data)
        );

    const wrapStyles = {height: postsCount * 170 * speed + "vh"};

    if (isError) return null;

    return (
        <motion.section className="section" style={{ pointerEvents, opacity }}>
            <RecentWorksTitle />
            <div className="container">
                <div 
                    ref={worksCanvas} 
                    style={wrapStyles}
                    className={css.wrap}
                >
                    {isLoading || posts === undefined ? (
                        <SkeletonTheme baseColor="rgb(var(--primary-rgb))" highlightColor="rgb(var(--dark-rgb))">
                            <Skeleton 
                                width={worksCanvas.current?.offsetWidth || 0}
                                height={worksCanvas.current?.offsetHeight || 0}
                            />
                        </SkeletonTheme>
                    ) : (
                        <ul className={listClasses}>
                            {posts.map((work, index) => (
                                <RecentWork 
                                    {...work}
                                    index={index}
                                    canvas={worksCanvas}
                                    allWorks={posts.length}
                                    key={work.title.toLowerCase().replaceAll(' ', '_')}
                                />
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </motion.section>
    );
};