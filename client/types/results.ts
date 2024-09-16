import type { Account } from "./account.ts";
import type { Status } from "./status.ts";
import type { Tag } from "./tag.ts";

export type Results = {
    accounts: Account[];
    statuses: Status[];
    hashtags: Tag[];
};
