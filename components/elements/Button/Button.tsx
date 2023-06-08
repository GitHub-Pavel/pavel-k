import { FC, ReactNode } from "react";
import classNames from "classnames";
import { Loader } from "@icons";

type ButtonProps = {
    loading?: boolean;
    className?: string;
    children: ReactNode;
    error?: boolean | string | null;
};

export const Button: FC<ButtonProps> = ({error, loading, children, className}) => {
    const buttonClasses = classNames(
        "py-3.5 md:py-4 px-10 rounded-full border-solid border bg-transparent focus:outline-none relative ease-in-out duration-200", {
        "border-white hover:bg-white hover:text-primary": !error && !loading,
        "border-red text-red cursor-not-allowed": error && !loading,
        "text-primary cursor-progress border-white": loading
    }, className)

    const disabled = Boolean(error) || loading;

    return (
        <button
            disabled={disabled}
            className={buttonClasses}
        >
            {children}
            {loading && (
                <Loader 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 stroke-4 stroke-white w-6 h-6"
                />
            )}
        </button>
    );
};