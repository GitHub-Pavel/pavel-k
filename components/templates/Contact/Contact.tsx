import { FC } from "react";
import css from "./Contact.module.css";
import { ContactForm } from "@components";
import { ContactTitle } from "./ContactTitle";
import { ContactAnimationWrap } from "./ContactAnimationWrap";
import classNames from "classnames";


type ContactProps = {
    page?: boolean;
}

export const Contact: FC<ContactProps> = ({page}) => {
    const sectionClasses = classNames("section w-full", {
        "mt-20": page
    });

    return (
        <section className={sectionClasses}>
            <div className="container">
                <ContactTitle page={page} />
                <div className={css.content}>
                    <ContactAnimationWrap>
                        <ContactForm withMessage />
                    </ContactAnimationWrap>
                </div>
            </div>
        </section>
    );
}