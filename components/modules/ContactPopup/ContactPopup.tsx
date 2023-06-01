'use client';

import { FC } from "react";
import css from "./ContactPopup.module.css";
import { ContactForm, Popup, SkeletonImage } from "@components";


export const ContactPopup: FC = () => {
    return (
        <Popup name="contact">
            <div className="pt-16 pb-20 px-24">
                <h3 className="mb-14">Contact</h3>
                <div className={css.wrap}>
                    <ContactForm />
                    <div>
                        <p className="text-gray mb-3.5">Leave your contact and I will contact you</p>
                        <SkeletonImage 
                            width={220}
                            height={164}
                            src="/contact-popup-image.png"
                            alt="Leave your contact and I will contact you"
                        />
                    </div>
                </div>
            </div>
        </Popup>
    );
}