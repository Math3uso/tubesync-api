export type SearchConfig = {
    maxResults: number;
    q: string;
    type: string;
}

export type SearchData = SearchConfig & {
    key: string;
    part: string;
}
