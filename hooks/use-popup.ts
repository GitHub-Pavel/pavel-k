import { Popups } from "@store";
import { useCallback } from "react";
import { commonActions } from "@store";
import { useAppDispatch, useAppSelector, useEmitter } from "@hooks";
import { useSearchParams, usePathname, useRouter } from "next/navigation";


export const usePopup = (popupName: Popups) => {
    const router = useRouter();
    const emitter = useEmitter();
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const searchParams = useSearchParams()!;
    const popup = useAppSelector(store => store.common.currentPopup);

    return useCallback(() => {
        const setPopup = (notReplace?: boolean) => {
            dispatch(commonActions.setLastScroll(window.scrollY));
            const params = new URLSearchParams(searchParams.toString());
            params.set('popup', popupName);
            if (!notReplace)
                return router.push(pathname+"?"+params.toString());
            router.replace(pathname+"?"+params.toString());
        };

        const closeHandler = () => {
            setPopup(true);
            emitter.off('popup/close', closeHandler);
        }

        if (popup) {
            emitter.on('popup/close', closeHandler);
            router.push(pathname);
            return;
        }

        setPopup();
    }, [searchParams, popup]);
}

export const useIsPopup = (popupName: Popups) => {
    const searchParams = useSearchParams();
    return searchParams.get('popup') === popupName;
}