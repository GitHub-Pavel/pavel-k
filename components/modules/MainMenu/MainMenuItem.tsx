'use client';

import { FC } from "react";
import Link from "next/link";
import { useHover } from "@hooks";
import classNames from "classnames";
import { motion } from "framer-motion";
import css from "./MainMenu.module.css";
import { TypeWriter } from "@components";
import { PageConfigProps } from "@constants";
import { usePathname } from "next/navigation";


type MainMenuItemProps = {
    index: number;
} & PageConfigProps;

const itemAnimation = {
    hidden: {
        opacity: 0,
        y: 50
    },
    visible: {
        opacity: 1,
        y: 0
    }
}

const getTransition = (index: number) => ({
    delay: 0.1 * index + 0.5
})


export const MainMenuItem: FC<MainMenuItemProps> = ({name, path, index}) => {
    const pathname = usePathname();
    const [hovered, eventHandlers] = useHover();

    const linkClasses = classNames("hover:text-red", css.link, {
        [css.hovered]: hovered
    })

    return (
        <motion.li 
            initial="hidden"
            animate="visible"
            variants={itemAnimation}
            className="mb-10 h2 relative"
            transition={getTransition(index)}
        >
            {pathname === path ? (
                <div className="text-gray opacity-90">{name}</div>
            ) : (
                <Link 
                    href={path} 
                    className={linkClasses}
                    {...eventHandlers as object}
                >
                    <span className={css.name}>{name}</span>
                    {hovered && (
                        <TypeWriter
                            content={name} 
                            lettersAnimation
                            delayIndex={0.1}
                            staggerChildren={0.05}
                            className={classNames(css.title, 'h1')}
                        />
                    )}
                </Link>
            )}
        </motion.li>
    );
}