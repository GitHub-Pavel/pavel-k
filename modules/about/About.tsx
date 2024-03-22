'use client'

import { Heading, Typing } from "@/ui"
import { useCommonStore } from "@/store"
import { ABOUT_ME_TEXT } from "@/configs"
import { Img, Space, ToSkills } from "./components"
import styles from "./styles/about.module.scss"

export const About = () => {
    const { isLoaded } = useCommonStore((state) => state)
    return (
        <section className={styles.about}>
            <div className="container-large">
                <div className={styles.columns}>
                    <div className={styles.content}>
                        <Heading tag="h1" className={styles.heading}>
                            <Typing 
                                isBegin={isLoaded}
                                sentence="Hello, am"
                                words={["developer", "Pavel"]}
                            />
                        </Heading>
                        <p className={styles.desc}>{ABOUT_ME_TEXT}</p>
                        <Space className={styles.canvas}/>
                    </div>
                    <div className={styles.view}>
                        <ToSkills className={styles.line}/>
                        <Img />
                    </div>
                </div>
            </div>
        </section>
    );
}