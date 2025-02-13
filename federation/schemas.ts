/**
 * @file Zod schema definitions
 * @module federation/schemas
 */

// biome-ignore lint/performance/noBarrelFile: library export
export {
    CollectionSchema as Collection,
    DeleteSchema as Delete,
    EntitySchema as Entity,
    FollowAcceptSchema as FollowAccept,
    FollowRejectSchema as FollowReject,
    FollowSchema as Follow,
    URICollectionSchema as URICollection,
    InstanceMetadataSchema as InstanceMetadata,
    NoteSchema as Note,
    UnfollowSchema as Unfollow,
    UserSchema as User,
} from "./schemas/base.ts";
export { ContentFormatSchema as ContentFormat } from "./schemas/content_format.ts";
export { ExtensionPropertySchema as EntityExtensionProperty } from "./schemas/extensions.ts";
export { CustomEmojiExtensionSchema as CustomEmojiExtension } from "./schemas/extensions/custom_emojis.ts";
export {
    GroupSchema as GroupExtension,
    GroupSubscribeSchema as GroupExtensionSubscribe,
    GroupSubscribeAcceptSchema as GroupExtensionSubscribeAccept,
    GroupSubscribeRejectSchema as GroupExtensionSubscribeReject,
    GroupUnsubscribeSchema as GroupExtensionUnsubscribe,
} from "./schemas/extensions/groups.ts";
export {
    DislikeSchema as DislikeExtension,
    LikeSchema as LikeExtension,
} from "./schemas/extensions/likes.ts";
export { VoteSchema as PollVoteExtension } from "./schemas/extensions/polls.ts";
export { ReactionSchema as ReactionExtension } from "./schemas/extensions/reactions.ts";
export { ShareSchema as ShareExtension } from "./schemas/extensions/share.ts";
export { VanityExtensionSchema as VanityExtension } from "./schemas/extensions/vanity.ts";
export { WebFingerSchema as WebFinger } from "./schemas/webfinger.ts";
