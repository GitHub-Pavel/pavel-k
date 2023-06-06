'use client';

import { useWindow } from "@hooks";
import classNames from "classnames";
import { FC, forwardRef } from "react";
import { deleteProperty } from "@utils";

type InputProps = {
    name: string;
    className?: string;
    placeholder: string;
    error?: string | null;
} & Record<string, any>;


export const Textarea: FC<InputProps> = forwardRef<HTMLLabelElement, InputProps>((props, ref) => {
    const [width] = useWindow();
    const inputProps: Omit<InputProps, "className"> = {...props};
    const labelClasses = classNames(props.className, "flex flex-col");
    const inputClasses = classNames(
        "py-4 px-5 rounded border-solid border placeholder:text-placeholder bg-transparent w-full outline-none transition-colors duration-200 resize-none flex-1", {
        "mb-6 border-white focus:border-gray hover:border-gray": !props.error,
        "border-red": props.error
    })

    return (
        <label ref={ref} className={labelClasses}>
            <textarea
                className={inputClasses}
                rows={width > 600 ? undefined : 7}
                {...deleteProperty(inputProps, ["error", "className"])}
            />
            {props.error && (
                <span className="block mt-2 text-red text-less italic pb-px">
                    {props.error}
                </span>
            )}
        </label>
    );
});

Textarea.displayName = "Textarea";