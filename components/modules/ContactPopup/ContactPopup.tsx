'use client';

import { FC } from "react";
import { useWindow } from "@hooks";
import css from "./ContactPopup.module.css";
import { ContactForm, Popup, SkeletonImage } from "@components";


export const ContactPopup: FC = () => {
    const [width] = useWindow();

    return (
        <Popup name="contact">
            <div className="px-8 pt-16 pb-10 sm:px-10 sm:py-16 md:p-16 lg:pt-16 lg:pb-20 lg:px-24">
                <h3 className="text-center md:text-left mb-3.5 md:mb-14">Contact</h3>
                {width <= 730 && (
                    <p className="text-gray text-center mb-14">Leave your contact and I will contact you</p>
                )}
                <div className={css.wrap}>
                    <ContactForm />
                    {width > 730 && (
                        <div>
                            <p className="text-gray mb-3.5">Leave your contact and I will contact you</p>
                            <SkeletonImage 
                                width={220}
                                height={164}
                                className={css.img}
                                src="/contact-popup-image.png"
                                alt="Leave your contact and I will contact you"
                            />
                        </div>
                    )}
                </div>
            </div>
        </Popup>
    );
}