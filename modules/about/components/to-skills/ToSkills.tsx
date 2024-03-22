'use client';

import { Heading } from "@/ui";
import { AlignRight } from "@/icons";
import styles from './styles/to-skills.module.scss';
import classNames from "classnames";

type ToSkillsProps = {
    className?: string;
}

export const ToSkills = ({className}: ToSkillsProps) => {
    return (
        <div className={classNames(styles.toSkills, className)}>
            <Heading className={styles.heading} tag="h3">Skills</Heading>
            <div className={styles.line}/>
            <AlignRight />
        </div>
    );
}