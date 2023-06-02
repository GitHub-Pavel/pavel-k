import { commonActions, Notifications } from "@store";
import { useAppDispatch, useAppSelector } from "@hooks";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useState, useEffect } from "react";


export const useNotifiction = (name: Notifications) => {
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const [isOpen, setOpen] = useState(false);
    const popup = useAppSelector(store => store.common.currentPopup);

    useEffect(() => {
        if (isOpen && !popup) {
            dispatch(commonActions.setNotification(name));
            setOpen(false);
        }
    }, [popup]);

    return () => {
        if (popup) {
            setOpen(true);
            return router.push(pathname);
        }

        dispatch(commonActions.setNotification(name));
    };
};