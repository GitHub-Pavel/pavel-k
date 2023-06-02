import { commonActions, Notifications } from "@store";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector, useEmitter } from "@hooks";


export const useNotifiction = (name: Notifications) => {
    const router = useRouter();
    const emitter = useEmitter();
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const popup = useAppSelector(store => store.common.currentPopup);

    const notificationHandler = () => {
        dispatch(commonActions.setNotification(name));
        emitter.off('popup/close', notificationHandler);
    }

    return () => {
        if (popup) {
            emitter.on('popup/close', notificationHandler);
            return router.push(pathname);
        }

        dispatch(commonActions.setNotification(name));
    };
};