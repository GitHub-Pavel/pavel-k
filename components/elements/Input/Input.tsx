'use client';

import classNames from "classnames";
import { FC, forwardRef } from "react";
import { capitalizeFirstLetter, deleteProperty } from "@utils";


type InputProps = {
    type: string;
    name: string;
    className?: string;
    placeholder: string;
    error?: string | null;
};

export const Input: FC<InputProps> = forwardRef<HTMLLabelElement, InputProps>((props, ref) => {
    const labelClasses = classNames(props.className, "block");
    const inputClasses = classNames(
        "py-3 px-4 sm:py-4 sm:px-5 rounded border-solid border placeholder:text-placeholder bg-transparent w-full outline-none transition-colors duration-200", {
        "mb-4 md:mb-6 border-white focus:border-gray hover:border-gray": !props.error,
        "border-red": props.error
    })


    return (
        <label ref={ref} className={labelClasses}>
            <input 
                className={inputClasses}
                {...deleteProperty(props, ["className", "error"])}
            />
            {props.error && (
                <span className="block md:mt-2 text-red text-less italic pb-px">
                    {capitalizeFirstLetter(props.error)}
                </span>
            )}
        </label>
    );
});

Input.displayName = "Input";