/**
 * @file TypeScript type definitions
 * @module federation/types
 */

import type { z } from "zod";
import type {
    CollectionSchema,
    DeleteSchema,
    EntitySchema,
    FollowAcceptSchema,
    FollowRejectSchema,
    FollowSchema,
    InstanceMetadataSchema,
    NoteSchema,
    URICollectionSchema,
    UnfollowSchema,
    UserSchema,
} from "./schemas/base.ts";
import type { ContentFormatSchema } from "./schemas/content_format.ts";
import type { ExtensionPropertySchema } from "./schemas/extensions.ts";
import type { CustomEmojiExtensionSchema } from "./schemas/extensions/custom_emojis.ts";
import type {
    GroupSchema,
    GroupSubscribeAcceptSchema,
    GroupSubscribeRejectSchema,
    GroupSubscribeSchema,
    GroupUnsubscribeSchema,
} from "./schemas/extensions/groups.ts";
import type { DislikeSchema, LikeSchema } from "./schemas/extensions/likes.ts";
import type { VoteSchema } from "./schemas/extensions/polls.ts";
import type { ReactionSchema } from "./schemas/extensions/reactions.ts";
import type { ShareSchema } from "./schemas/extensions/share.ts";
import type { VanityExtensionSchema } from "./schemas/extensions/vanity.ts";

// biome-ignore lint/suspicious/noExplicitAny: Used only as a base type
type AnyZod = z.ZodType<any, any, any>;

type InferType<T extends AnyZod> = z.infer<T>;

export type Note = InferType<typeof NoteSchema>;
export type Collection = InferType<typeof CollectionSchema>;
export type URICollection = InferType<typeof URICollectionSchema>;
export type EntityExtensionProperty = InferType<typeof ExtensionPropertySchema>;
export type VanityExtension = InferType<typeof VanityExtensionSchema>;
export type User = InferType<typeof UserSchema>;
export type Follow = InferType<typeof FollowSchema>;
export type FollowAccept = InferType<typeof FollowAcceptSchema>;
export type FollowReject = InferType<typeof FollowRejectSchema>;
export type ContentFormat = InferType<typeof ContentFormatSchema>;
export type CustomEmojiExtension = InferType<typeof CustomEmojiExtensionSchema>;
export type Entity = InferType<typeof EntitySchema>;
export type Delete = InferType<typeof DeleteSchema>;
export type InstanceMetadata = InferType<typeof InstanceMetadataSchema>;
export type Unfollow = InferType<typeof UnfollowSchema>;
export type GroupExtension = InferType<typeof GroupSchema>;
export type GroupExtensionSubscribe = InferType<typeof GroupSubscribeSchema>;
export type GroupExtensionSubscribeAccept = InferType<
    typeof GroupSubscribeAcceptSchema
>;
export type GroupExtensionSubscribeReject = InferType<
    typeof GroupSubscribeRejectSchema
>;
export type GroupExtensionUnsubscribe = InferType<
    typeof GroupUnsubscribeSchema
>;
export type LikeExtension = InferType<typeof LikeSchema>;
export type DislikeExtension = InferType<typeof DislikeSchema>;
export type PollVoteExtension = InferType<typeof VoteSchema>;
export type ReactionExtension = InferType<typeof ReactionSchema>;
export type ShareExtension = InferType<typeof ShareSchema>;
