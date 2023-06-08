"use client";

import axios from "axios";
import { FC } from "react";
import * as icons from "@icons";
import { useQuery } from "react-query";
import css from "./SocialList.module.css";
import { capitalizeFirstLetter } from "@utils";
import { SocialItem, SocialProps } from "./SocialItem";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

type SocialListProps = {
    delay?: number;
}

export const SocialList: FC<SocialListProps> = ({ delay = 0.14 }) => {
    const { isError, isLoading, data: socials } = useQuery<SocialProps[]>('socials', () =>
        axios.get('/api/socials')
            .then(res => res.data)
    );

    if (isError) return null;
    if (isLoading) 
        return (
            <SkeletonTheme baseColor="rgb(var(--primary-rgb))" highlightColor="rgb(var(--dark-rgb))">
                <Skeleton 
                    width={350}
                    height={50}
                />
            </SkeletonTheme>
        );

    return (
        <ul className={css.list}>
            {socials?.map((social, index) => {
                const Icon = icons[
                    capitalizeFirstLetter(social.slug) as keyof typeof icons
                ];
                return (
                    <SocialItem
                        {...social}
                        index={index}
                        delay={delay}
                        icon={<Icon />}
                        key={social.slug}
                    />
                )
            })}
        </ul>
    );
};