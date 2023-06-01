'use client';

import { FC } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ALL_PAGES } from "@constants";
import { useAppSelector } from "@hooks";
import { PageConfigProps } from "@constants";
import { usePathname } from "next/navigation";


const listAnimation = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1
    }
}

const FooterMenuItem: FC<PageConfigProps> = ({name, path}) => {
    const pathname = usePathname();
    const isCurrentPage = path === pathname;    

    return (
        <li className="px-4">
            {isCurrentPage ? (
                <div className="text-gray opacity-90">{name}</div>
            ) : (
                <Link 
                    href={path} 
                    title={name}
                    className="hover:text-red ease-in-out duration-200"
                >
                    {name}
                </Link>
            )}
            
        </li>
    );
}

export const FooterMenu: FC = () => {
    const isDocumentReady = useAppSelector(store => store.common.isDocumentReady);
    const animationType: keyof typeof listAnimation = isDocumentReady ? "visible" : "hidden";

    return (
        <motion.ul 
            initial="hidden"
            className="flex my-7"
            variants={listAnimation}
            whileInView={animationType}
            transition={{
                delay: 0.2
            }}
        >
            {ALL_PAGES.map(page => (
                <FooterMenuItem 
                    {...page}
                    key={page.name.toLowerCase()}
                />
            ))}
        </motion.ul>
    );
};