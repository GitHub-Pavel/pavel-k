'use client';

import { createPortal } from "react-dom";
import { FC, ReactNode, useState, useEffect } from "react";

type PortalProps = {
    children: ReactNode;
};

export const Portal: FC<PortalProps> = ({children}) => {
    const [root, setRoot] = 
        useState<HTMLElement | null | false>(false);

    useEffect(() => setRoot(document.getElementById('portal')), []);

    if (root === null) {
        console.warn('Warn: portal root not found.');
        return null;
    }

    if (root === false) return null;

    return createPortal(children, root);
};

export const PortalRoot: FC = () => {
    return <div id="portal" />;
};