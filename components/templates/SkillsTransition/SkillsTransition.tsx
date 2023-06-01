import { FC } from "react";
import css from "./SkillsTransition.module.css";
import { SkillsTransitionItem } from "./SkillsTransitionItem";
import { SkillsTransitionLine } from "./SkillsTransitionLine";

export const SkillsTransition: FC = () => {

    return (
        <section className="section">
            <div className="container">
                <div className={css.row}>
                    <div className={css.lineWrap}>
                        <SkillsTransitionLine />
                    </div>
                    <div className={css.skillsWrap}>
                        {new Array(3).fill('😎').map((v,i) => (
                            <SkillsTransitionItem key={i+v} index={i} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};