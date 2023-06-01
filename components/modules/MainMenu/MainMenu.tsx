import { FC } from "react";
import { ALL_PAGES } from "@constants";
import { MainMenuItem } from "./MainMenuItem";
import { Popup, SocialList } from "@components";


export const MainMenu: FC = () => {
    return (
        <Popup name="main-menu" isMainMenu>
            <div className="container flex-1 flex flex-col items-center justify-center">
                <div className="flex-1 flex items-center w-full">
                    <ul className="w-full">
                        {ALL_PAGES.map((page, index) => (
                            <MainMenuItem 
                                {...page}
                                index={index}
                                key={page.name.toLowerCase()}
                            />
                        ))}
                    </ul>
                </div>
                <div className="pb-10 pt-20">
                    <SocialList delay={1}/>
                </div>
            </div>
        </Popup>
    );
}