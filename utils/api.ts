import axios from "axios";
import { getQuery } from "@utils";
import { PageProps, WorkProps } from "../app/api/posts/route";
import { cache } from "react";

type CountParams = {
    count: number;
}

type PageParams = {
    pageParam: number;
}

type Params = CountParams | PageParams;

export const getPosts = cache(async (params: Params, client?: boolean) => {
    const query = getQuery('/api/posts', params, client);
    const { data } = await axios.get(query);
    return data;
});