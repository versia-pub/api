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
} from "./schemas/base.ts";
import { ContentFormatSchema } from "./schemas/content_format.ts";
import { ExtensionPropertySchema } from "./schemas/extensions.ts";
import { CustomEmojiExtensionSchema } from "./schemas/extensions/custom_emojis.ts";
import { DislikeSchema, LikeSchema } from "./schemas/extensions/likes.ts";
import { VoteSchema } from "./schemas/extensions/polls.ts";
import { ReactionSchema } from "./schemas/extensions/reactions.ts";
import { ShareSchema } from "./schemas/extensions/share.ts";
import { VanityExtensionSchema } from "./schemas/extensions/vanity.ts";

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
