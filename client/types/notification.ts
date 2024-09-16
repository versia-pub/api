import type { Account } from "./account.ts";
import type { Reaction } from "./reaction.ts";
import type { Status } from "./status.ts";

export type Notification = {
    account: Account | null;
    created_at: string;
    id: string;
    status?: Status;
    reaction?: Reaction;
    type: NotificationType;
    target?: Account;
};

export type NotificationType = string;
