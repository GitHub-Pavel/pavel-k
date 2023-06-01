import { FC } from "react";
import css from "./Preloader.module.css";
import { PavelK } from "@icons";


export const Preloader: FC = () => {
    return (
        <div className={css.preloader} id="preloader">
            <PavelK className={css.icon} />
        </div>
    );
};