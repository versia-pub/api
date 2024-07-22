import type {
    ActionSchema,
    ActorPublicKeyDataSchema,
    ContentFormatSchema,
    CustomEmojiExtensionSchema,
    DislikeSchema,
    EntitySchema,
    ExtensionPropertySchema,
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
    VanityExtensionSchema,
    VisibilitySchema,
} from "@/federation/schemas/base";
import type { z } from "zod";

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
