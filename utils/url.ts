import { serialize } from "@utils";

export function getQuery(query: string, params: Record<string, any>, client?: boolean) {
    const stringParams = serialize(params);
    const path = query+'?'+stringParams;

    if (client) return path;
    return process.env.URL_ORIGIN+path;
}