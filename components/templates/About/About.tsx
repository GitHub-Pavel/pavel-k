import { FC } from "react";
import css from "./About.module.css";
import { SocialList } from "@components";
import { AboutImage } from "./AboutImage";
import { AboutTitle } from "./AboutTitle";


type AboutProps = {
    page?: boolean;
}

export const About: FC<AboutProps> = ({page}) => {
    return (
        <section className="section">
            <div className="container">
                <AboutTitle page={page} />
                <div className={css.row}>
                    <AboutImage />
                    <div className={css.content}>
                        <p className={css.text}>I have been doing web development for <span className="text-red">over 3 years</span>. During this time, I managed to work both on large projects and on small, but no less interesting ones. I always try to be in touch so that we can resolve issues as quickly as possible!</p>
                        <div className="overflow-hidden">
                            <p className={css.social}>Socials</p>
                            <SocialList />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};