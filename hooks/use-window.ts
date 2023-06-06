import { useState } from "react";
import { useIsomorphicLayoutEffect } from "@hooks";

export const useWindow = () => {
    const [sizes, setSizes] = useState([0,0]);
    const handlerWindow = () => setSizes([window.innerWidth, window.innerHeight]);

    useIsomorphicLayoutEffect(() => {
        handlerWindow();
        window.addEventListener('resize', handlerWindow);
        return () => {
            window.removeEventListener('resize', handlerWindow);
        }
    }, []);
    
    return sizes;
}