import type { Account } from "./account.ts";

export type Reaction = {
    count: number;
    me: boolean;
    name: string;
    url?: string;
    static_url?: string;
    accounts?: Account[];
    account_ids?: string[];
};
