import type { Account } from "./account.ts";
import type { Status } from "./status.ts";

export type Conversation = {
    id: string;
    accounts: Account[];
    last_status: Status | null;
    unread: boolean;
};
