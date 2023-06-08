'use client';

import { FC, useRef } from "react";
import classNames from "classnames";
import { RecentWork } from "./RecentWork";
import css from "./RecentWorks.module.css";
import { RecentWorksTitle } from "./RecentWorksTitle";
import { WorkProps } from "../../../app/api/posts/route";
import { useScroll, useTransform, motion } from "framer-motion";


type RecentWorksProps = {
    speed?: number;
    posts: WorkProps[];
}

export const RecentWorks: FC<RecentWorksProps> = ({posts, speed = 1}) => {
    const worksCanvas = useRef<HTMLDivElement>(null);
    const listClasses = classNames(css.works, "container");

    const { scrollYProgress } = useScroll({
        target: worksCanvas,
        offset: ["1.2 1.5", "1.2 1.2"]
    });
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
    const pointerEvents = useTransform(scrollYProgress, (progress) => progress === 1 ? "none" : "all");
    const wrapStyles = {height: posts.length * 170 * speed + "vh"};

    if (!posts.length) return null;

    return (
        <motion.section className="section" style={{ pointerEvents, opacity }}>
            <RecentWorksTitle />
            <div className="container">
                <div 
                    ref={worksCanvas} 
                    style={wrapStyles}
                    className={css.wrap}
                >
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
                </div>
            </div>
        </motion.section>
    );
};