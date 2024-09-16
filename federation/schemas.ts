/**
 * @file Zod schema definitions
 * @module federation/schemas
 */

import {
    CollectionSchema,
    DeleteSchema,
    EntitySchema,
    FollowAcceptSchema,
    FollowRejectSchema,
    FollowSchema,
    GroupSchema,
    InstanceMetadataSchema,
    NoteSchema,
    UnfollowSchema,
    UserSchema,
} from "./schemas/base";
import { ContentFormatSchema } from "./schemas/content_format";
import { ExtensionPropertySchema } from "./schemas/extensions";
import { CustomEmojiExtensionSchema } from "./schemas/extensions/custom_emojis";
import { DislikeSchema, LikeSchema } from "./schemas/extensions/likes";
import { VoteSchema } from "./schemas/extensions/polls";
import { ReactionSchema } from "./schemas/extensions/reactions";
import { ShareSchema } from "./schemas/extensions/share";
import { VanityExtensionSchema } from "./schemas/extensions/vanity";

export {
    NoteSchema as Note,
    CollectionSchema as Collection,
    EntitySchema as Entity,
    FollowSchema as Follow,
    UnfollowSchema as Unfollow,
    FollowAcceptSchema as FollowAccept,
    FollowRejectSchema as FollowReject,
    GroupSchema as Group,
    InstanceMetadataSchema as InstanceMetadata,
    UserSchema as User,
    ContentFormatSchema as ContentFormat,
    ExtensionPropertySchema as EntityExtensionProperty,
    CustomEmojiExtensionSchema as CustomEmojiExtension,
    DeleteSchema as Delete,
    VanityExtensionSchema as VanityExtension,
    LikeSchema as LikeExtension,
    DislikeSchema as DislikeExtension,
    VoteSchema as PollVoteExtension,
    ReactionSchema as ReactionExtension,
    ShareSchema as ShareExtension,
};
