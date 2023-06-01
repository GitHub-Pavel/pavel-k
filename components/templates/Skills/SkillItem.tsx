'use client';

import { getWindowProp } from "@utils";
import classNames from "classnames";
import css from "./Skills.module.css";
import { WayLeft, WayRight } from "@icons";
import { pathUpdate } from "./skill-utils";
import { FC, useRef, useEffect } from "react";
import { useScroll, useTransform, useMotionValueEvent, motion } from "framer-motion";

export type SkillProps = {
    slug: string;
    title: string;
    text: string;
};

type SkillItemProps = {
    position?: 'left' | 'right';
    isLast?: boolean;
} & SkillProps;

export const SkillItem: FC<SkillItemProps> = ({
    slug, text, title, 
    position = 'left',
    isLast = false
}) => {
    const itemElement = useRef<HTMLLIElement>(null);
    const targetElement = useRef<HTMLDivElement>(null);
    const Icon = position === "left" ? WayLeft : WayRight;
    const itemClasses = classNames(css.item, css[position], css[slug]);
    const getTopOffset = () => (getWindowProp('innerHeight') || 0)/2.5*-1;

    const { scrollYProgress, scrollY } = useScroll({ 
        target: targetElement,
        offset: [`${getTopOffset()}px`, "-150px"] 
    });
    const height = useTransform(scrollYProgress, [1, 0], ['100%', '0%']);
    
    const normalize = () => {
        const item = itemElement.current;
        const svg = item?.querySelector('svg');
        const box = item?.firstChild as HTMLDivElement;
        const list = item?.closest<HTMLUListElement>('.skills-list');

        if (!item || !svg || !box || !list)
            return;

        const calculatedHeight = item.offsetHeight - box.offsetHeight / 2 + 5;

        svg.style.height = `${calculatedHeight}px`;


        const width = svg.getBoundingClientRect().width;
        const space = list.offsetWidth - box.offsetWidth - box.offsetWidth / 2;
        const calculatedPosition = box.offsetWidth - ( width - space );
        
        svg.style[position] = `${calculatedPosition+1}px`;
    };

    useEffect(() => {
        normalize();

        window.addEventListener('resize', normalize);
        return () => {
            window.removeEventListener('resize', normalize);
        } 
    }, []);

    useMotionValueEvent(scrollY, "change", pathUpdate.bind(itemElement));

    return (
        <li className={itemClasses} ref={itemElement}>
            <div className={css.itemBox}>
                <div className={css.itemWrap}>
                    <div className={css.itemContent}>
                        <h3 className={classNames("h2", css.itemTitle)}>{title}</h3>
                        <p className={css.itemText} dangerouslySetInnerHTML={{ __html: text }} />
                    </div>
                    <motion.div 
                        className={css.itemBackground} 
                        ref={targetElement}
                        style={{ height }}
                    />
                </div>
                {!isLast && (
                    <Icon className={css.itemIcon} />
                )}
            </div>
        </li>
    );
};