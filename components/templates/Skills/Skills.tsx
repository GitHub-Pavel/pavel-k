import { FC } from "react";
import { SKILLS } from "@constants";
import css from "./Skills.module.css";
import { SkillItem } from "./SkillItem";
import classNames from "classnames";

export const Skills: FC = () => {
    const listClasses = classNames(css.list, 'skills-list');

    return (
        <section className="section">
            <div className="container">
                <ul className={listClasses} >
                    {SKILLS.map((skill, i) => (
                        <SkillItem 
                            position={i%2 === 0 ? "left" : "right"}
                            isLast={i+1 === SKILLS.length}
                            key={skill.slug}
                            {...skill}
                        />
                    ))}
                </ul>
            </div>
        </section>
    );
};