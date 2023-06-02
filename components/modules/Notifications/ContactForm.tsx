"use client";

import { FC, useEffect, useRef } from "react";
import { Notifications } from "@store";
import { useAppSelector } from "@hooks";
import { Notification } from "./Notification";


export const ContactForm: FC = () => {
    const name: Notifications = "contact-form";
    const lottieRef = useRef<HTMLElement>(null);
    const notifiction = useAppSelector(store => store.common.notification);

    useEffect(() => {
        import("@lottiefiles/lottie-player");
    });

    if (name !== notifiction) return null;

    return (
        <Notification>
            <div className="pt-10 pb-12 px-14 text-center">
                <div className="flex justify-center pointer-events-none mb-5">
                    <lottie-player
                        autoplay
                        mode="normal"
                        ref={lottieRef}
                        src="/success.json"
                        style={{ width: "80px", height: "80px" }}          
                    />
                </div>
                <h4 className="mb-3.5">Thank you!</h4>
                <p className="text-gray">I will try to contact you as soon as possible.</p>
            </div>
        </Notification>
    );
}