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
} from "./validators/base.ts";
import { ContentFormatSchema } from "./validators/content_format.ts";
import { ExtensionPropertySchema } from "./validators/extensions.ts";
import { CustomEmojiExtensionSchema } from "./validators/extensions/custom_emojis.ts";
import { DislikeSchema, LikeSchema } from "./validators/extensions/likes.ts";
import { VoteSchema } from "./validators/extensions/polls.ts";
import { ReactionSchema } from "./validators/extensions/reactions.ts";
import { ShareSchema } from "./validators/extensions/share.ts";
import { VanityExtensionSchema } from "./validators/extensions/vanity.ts";
import { WebFingerSchema } from "./validators/webfinger.ts";

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
    WebFingerSchema as WebFinger,
};
