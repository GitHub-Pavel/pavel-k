import { WORKS } from "@constants";
import { NextResponse } from "next/server";


type NextPage = null | number;

export type WorkProps = {
    id: number;
    url: string;
    image: string;
    title: string;
};

export type PageProps = {
    works: WorkProps[];
    nextPage: NextPage;
};

export async function GET(request: Request) {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const page = searchParams.get('page');
    const count = searchParams.get('count');
    

    if (count)
        return NextResponse.json(WORKS.slice(0, +count));
    
    if (page) {
        let nextPage: NextPage = null;
        let works: WorkProps[] = [];

        const currentPage = +page-1;
        const firstIndex = currentPage*5;
        const lastIndex = currentPage*5+5;

        works = WORKS.slice( firstIndex, lastIndex );

        if (lastIndex < WORKS.length-1) {
            nextPage = +page+1;
        }

        const res: PageProps = {works, nextPage};

        return NextResponse.json(res);
    }


    return NextResponse.json(WORKS);
}