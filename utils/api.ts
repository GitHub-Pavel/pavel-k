import axios from "axios";
import { getQuery } from "@utils";
import { PageProps, WorkProps } from "../app/api/posts/route";

type CountParams = {
    count: number;
}

type PageParams = {
    pageParam: number;
}

type Params = CountParams | PageParams;

export async function getPosts(params: Params) {
    const query = getQuery('/api/posts', params);
    const { status, data } = await axios.get(query);

    if (data && status === 200) {
        return data;
    }

    throw new Error('Not founded');
}