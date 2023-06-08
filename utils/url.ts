import { serialize } from "@utils";

export function getQuery(query: string, params: Record<string, any>, withoutOrigin?: boolean) {
    const stringParams = serialize(params);
    const path = query+'?'+stringParams;

    if (withoutOrigin) return path;
    return process.env.URL_ORIGIN+path;
}