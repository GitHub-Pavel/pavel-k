import { FC } from "react";
import css from "./Contact.module.css";
import { ContactForm } from "@components";
import { ContactTitle } from "./ContactTitle";
import { ContactAnimationWrap } from "./ContactAnimationWrap";


type ContactProps = {
    page?: boolean;
}

export const Contact: FC<ContactProps> = ({page}) => {
    return (
        <section className="section">
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