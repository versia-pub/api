import type { Account } from "./account.ts";
import type { Application } from "./application.ts";
import type { Attachment } from "./attachment.ts";
import type { Card } from "./card.ts";
import type { Emoji } from "./emoji.ts";
import type { Mention } from "./mention.ts";
import type { Poll } from "./poll.ts";
import type { Reaction } from "./reaction.ts";

export type Status = {
    id: string;
    uri: string;
    url: string;
    account: Account;
    in_reply_to_id: string | null;
    in_reply_to_account_id: string | null;
    reblog: Status | null;
    content: string;
    plain_content: string | null;
    created_at: string;
    edited_at: string | null;
    emojis: Emoji[];
    replies_count: number;
    reblogs_count: number;
    favourites_count: number;
    reblogged: boolean | null;
    favourited: boolean | null;
    muted: boolean | null;
    sensitive: boolean;
    spoiler_text: string;
    visibility: StatusVisibility;
    media_attachments: Attachment[];
    mentions: Mention[];
    tags: StatusTag[];
    card: Card | null;
    poll: Poll | null;
    application: Application | null;
    language: string | null;
    pinned: boolean | null;
    emoji_reactions: Reaction[];
    quote: Status | null;
    bookmarked: boolean;
};

export type StatusTag = {
    name: string;
    url: string;
};

export type StatusVisibility = "public" | "unlisted" | "private" | "direct";
