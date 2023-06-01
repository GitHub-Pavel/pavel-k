export type PageConfigProps = {
    path: string;
    name: string;
}

export const HOME: PageConfigProps = {name: "Home", path: "/"};
export const ABOUT: PageConfigProps = {name: "About", path: "/about"};
export const PORTFOLIO: PageConfigProps = {name: "Works", path: "/works"};
export const CONTACT: PageConfigProps = {name: "Contact", path: "/contact"};

export const ALL_PAGES: PageConfigProps[] = [HOME, ABOUT, PORTFOLIO, CONTACT];