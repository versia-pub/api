import type { History } from "./history.ts";

export type Tag = {
    name: string;
    url: string;
    history: History[];
    following?: boolean;
};
