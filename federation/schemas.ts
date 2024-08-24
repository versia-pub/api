/**
 * @file TypeScript type definitions
 * @module federation/types
 */

import type { z } from "zod";
import type {
    ActionSchema,
    ActorPublicKeyDataSchema,
    DislikeSchema,
    EntitySchema,
    ExtensionSchema,
    FollowAcceptSchema,
    FollowRejectSchema,
    FollowSchema,
    LikeSchema,
    NoteSchema,
    PatchSchema,
    PublicationSchema,
    ReportSchema,
    ServerMetadataSchema,
    UndoSchema,
    UserSchema,
    VisibilitySchema,
} from "./schemas/base";
import type { ContentFormatSchema } from "./schemas/content_format";
import type { ExtensionPropertySchema } from "./schemas/extensions";
import type { CustomEmojiExtensionSchema } from "./schemas/extensions/custom_emojis";
import type { VanityExtensionSchema } from "./schemas/extensions/vanity";

// biome-ignore lint/suspicious/noExplicitAny: Used only as a base type
type AnyZod = z.ZodType<any, any, any>;

type InferType<T extends AnyZod> = z.infer<T>;

export type Note = InferType<typeof NoteSchema>;
export type Patch = InferType<typeof PatchSchema>;
export type ActorPublicKeyData = InferType<typeof ActorPublicKeyDataSchema>;
export type ExtensionProperty = InferType<typeof ExtensionPropertySchema>;
export type VanityExtension = InferType<typeof VanityExtensionSchema>;
export type User = InferType<typeof UserSchema>;
export type Action = InferType<typeof ActionSchema>;
export type Like = InferType<typeof LikeSchema>;
export type Undo = InferType<typeof UndoSchema>;
export type Dislike = InferType<typeof DislikeSchema>;
export type Follow = InferType<typeof FollowSchema>;
export type FollowAccept = InferType<typeof FollowAcceptSchema>;
export type FollowReject = InferType<typeof FollowRejectSchema>;
export type Extension = InferType<typeof ExtensionSchema>;
export type Report = InferType<typeof ReportSchema>;
export type ServerMetadata = InferType<typeof ServerMetadataSchema>;
export type ContentFormat = InferType<typeof ContentFormatSchema>;
export type CustomEmojiExtension = InferType<typeof CustomEmojiExtensionSchema>;
export type Visibility = InferType<typeof VisibilitySchema>;
export type Publication = InferType<typeof PublicationSchema>;
export type Entity = InferType<typeof EntitySchema>;
