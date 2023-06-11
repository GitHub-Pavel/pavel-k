'use client';

import { FC } from "react";
import classNames from 'classnames';
import css from "./HomeHero.module.css";
import { useScroll, useTransform } from "framer-motion";
import { MotionSkeletonImage, NextSection, TypeWriter } from "@components";


export const HomeHero: FC = () => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1200], ["0px", "200px"]);
    const sectionClasses = classNames("h-screen relative flex items-center xl:items-start", css.hero);

    return ( 
        <section className={sectionClasses}>
            <div className="container">
                <h1 className={css.title}>
                    <TypeWriter 
                        content='<span class="text-white">Hello.</span>|I’m|Pavel'
                    />
                </h1>
                <div className={css.wrap}>
                    <MotionSkeletonImage
                        alt='Pavel K.'
                        src='/main-screen.jpeg'
                        style={{ y }}
                        className={css.img}
                        height={642} 
                        width={642}
                        priority
                    />
                </div>
            </div>
            <NextSection />
        </section>
    );
};