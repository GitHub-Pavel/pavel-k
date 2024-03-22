import { ReactNode } from "react";
import classNames from "classnames";
import { JetBrains_Mono } from "next/font/google";
import styles from './styles/heading.module.scss';

type HeadingType = 'h1' | 'h2' | 'h3' | 'h4'

type HeadingProps = {
    tag: HeadingType;
    view?: HeadingType;
    className?: string;
    children: ReactNode;
}

const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], weight: ["700"] })

export const Heading = ({
    view,
    children, 
    className, 
    tag: TagName, 
}: HeadingProps) => {
    const headingClasses = classNames(className, styles.heading, styles[view || TagName], jetBrainsMono.className)

    return (
        <TagName className={headingClasses}>{children}</TagName>
    );
}