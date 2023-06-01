export const serialize = (queries: Record<string, any>) => {
    var str = [];
    for (var p in queries)
        if (queries.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(queries[p]));
        }
  return str.join("&");
};