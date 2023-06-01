'use client';

import Image from 'next/image';
import { FC, useRef } from "react";
import css from "./HomeHero.module.css";
import { NextSection, TypeWriter } from "@components";
import { motion, useScroll, useTransform } from "framer-motion";

const MotionImage = motion(Image);

export const HomeHero: FC = () => {
    const sectionElement = useRef<HTMLElement>(null);
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1200], ["0px", "200px"]);

    return (
        <section className="h-screen relative" ref={sectionElement}>
            <div className="container">
                <h1 className={css.title}>
                    <TypeWriter 
                        content='<span class="text-white">Hello.</span>|I’m|Pavel'
                    />
                </h1>
                <div className={css.wrap}>
                    <MotionImage
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