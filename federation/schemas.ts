/**
 * @file TypeScript type definitions
 * @module federation/types
 */

import type { z } from "zod";
import type {
    DeleteSchema,
    EntitySchema,
    FollowAcceptSchema,
    FollowRejectSchema,
    FollowSchema,
    GroupSchema,
    InstanceMetadataSchema,
    NoteSchema,
    PublicKeyDataSchema,
    UnfollowSchema,
    UserSchema,
} from "./schemas/base";
import type {
    AudioOnlyContentFormatSchema,
    ContentFormatSchema,
    ImageOnlyContentFormatSchema,
    TextOnlyContentFormatSchema,
} from "./schemas/content_format";
import type { ExtensionPropertySchema } from "./schemas/extensions";
import type { CustomEmojiExtensionSchema } from "./schemas/extensions/custom_emojis";
import type { LikeSchema } from "./schemas/extensions/likes";
import type { VoteSchema } from "./schemas/extensions/polls";
import type { ReactionSchema } from "./schemas/extensions/reactions";
import type { ShareSchema } from "./schemas/extensions/share";
import type { VanityExtensionSchema } from "./schemas/extensions/vanity";

// biome-ignore lint/suspicious/noExplicitAny: Used only as a base type
type AnyZod = z.ZodType<any, any, any>;

type InferType<T extends AnyZod> = z.infer<T>;

export type Note = InferType<typeof NoteSchema>;
export type ActorPublicKeyData = InferType<typeof PublicKeyDataSchema>;
export type ExtensionProperty = InferType<typeof ExtensionPropertySchema>;
export type VanityExtension = InferType<typeof VanityExtensionSchema>;
export type User = InferType<typeof UserSchema>;
export type Follow = InferType<typeof FollowSchema>;
export type FollowAccept = InferType<typeof FollowAcceptSchema>;
export type FollowReject = InferType<typeof FollowRejectSchema>;
export type ContentFormat = InferType<typeof ContentFormatSchema>;
export type ImageContentFormat = InferType<typeof ImageOnlyContentFormatSchema>;
export type TextContentFormat = InferType<typeof TextOnlyContentFormatSchema>;
export type AudioContentFormat = InferType<typeof AudioOnlyContentFormatSchema>;
export type CustomEmojiExtension = InferType<typeof CustomEmojiExtensionSchema>;
export type Entity = InferType<typeof EntitySchema>;
export type Delete = InferType<typeof DeleteSchema>;
export type Group = InferType<typeof GroupSchema>;
export type InstanceMetadata = InferType<typeof InstanceMetadataSchema>;
export type Unfollow = InferType<typeof UnfollowSchema>;
export type Like = InferType<typeof LikeSchema>;
export type Dislike = InferType<typeof LikeSchema>;
export type Vote = InferType<typeof VoteSchema>;
export type Reaction = InferType<typeof ReactionSchema>;
export type Share = InferType<typeof ShareSchema>;
