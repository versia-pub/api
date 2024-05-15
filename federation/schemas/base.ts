import { z } from "zod";
import { ContentFormatSchema } from "./content_format";
import { ExtensionPropertySchema } from "./extensions";
import { CustomEmojiExtension } from "./extensions/custom_emojis";
import { VanityExtensionSchema } from "./extensions/vanity";
import { extensionTypeRegex } from "./regex";

const EntitySchema = z.object({
    id: z.string().uuid(),
    created_at: z.string(),
    uri: z.string().url(),
    type: z.string(),
    extensions: ExtensionPropertySchema.optional(),
});

const VisibilitySchema = z.enum(["public", "unlisted", "private", "direct"]);

const PublicationSchema = EntitySchema.extend({
    type: z.enum(["Note", "Patch"]),
    author: z.string().url(),
    content: ContentFormatSchema.optional(),
    attachments: z.array(ContentFormatSchema).optional(),
    replies_to: z.string().url().optional(),
    quotes: z.string().url().optional(),
    mentions: z.array(z.string().url()).optional(),
    subject: z.string().optional(),
    is_sensitive: z.boolean().optional(),
    visibility: VisibilitySchema,
    extensions: ExtensionPropertySchema.extend({
        "org.lysand:reactions": z
            .object({
                reactions: z.string(),
            })
            .optional(),
        "org.lysand:polls": z
            .object({
                poll: z.object({
                    options: z.array(ContentFormatSchema),
                    votes: z.array(z.number().int().nonnegative()),
                    multiple_choice: z.boolean().optional(),
                    expires_at: z.string(),
                }),
            })
            .optional(),
    }).optional(),
});

const NoteSchema = PublicationSchema.extend({
    type: z.literal("Note"),
});

const PatchSchema = PublicationSchema.extend({
    type: z.literal("Patch"),
    patched_id: z.string().uuid(),
    patched_at: z.string(),
});

const ActorPublicKeyDataSchema = z.object({
    public_key: z.string(),
    actor: z.string().url(),
});

const UserSchema = EntitySchema.extend({
    type: z.literal("User"),
    display_name: z.string().optional(),
    username: z.string(),
    avatar: ContentFormatSchema.optional(),
    header: ContentFormatSchema.optional(),
    indexable: z.boolean(),
    public_key: ActorPublicKeyDataSchema,
    bio: ContentFormatSchema.optional(),
    fields: z
        .array(
            z.object({
                name: ContentFormatSchema,
                value: ContentFormatSchema,
            }),
        )
        .optional(),
    featured: z.string().url(),
    followers: z.string().url(),
    following: z.string().url(),
    likes: z.string().url(),
    dislikes: z.string().url(),
    inbox: z.string().url(),
    outbox: z.string().url(),
    extensions: ExtensionPropertySchema.extend({
        "org.lysand:vanity": VanityExtensionSchema.optional(),
    }).optional(),
});

const ActionSchema = EntitySchema.extend({
    type: z.union([
        z.literal("Like"),
        z.literal("Dislike"),
        z.literal("Follow"),
        z.literal("FollowAccept"),
        z.literal("FollowReject"),
        z.literal("Announce"),
        z.literal("Undo"),
    ]),
    author: z.string().url(),
});

const LikeSchema = ActionSchema.extend({
    type: z.literal("Like"),
    object: z.string().url(),
});

const UndoSchema = ActionSchema.extend({
    type: z.literal("Undo"),
    object: z.string().url(),
});

const DislikeSchema = ActionSchema.extend({
    type: z.literal("Dislike"),
    object: z.string().url(),
});

const FollowSchema = ActionSchema.extend({
    type: z.literal("Follow"),
    followee: z.string().url(),
});

const FollowAcceptSchema = ActionSchema.extend({
    type: z.literal("FollowAccept"),
    follower: z.string().url(),
});

const FollowRejectSchema = ActionSchema.extend({
    type: z.literal("FollowReject"),
    follower: z.string().url(),
});

const ExtensionSchema = EntitySchema.extend({
    type: z.literal("Extension"),
    extension_type: z
        .string()
        .regex(
            extensionTypeRegex,
            "extension_type must be in the format 'namespaced_url:extension_name/ExtensionType', e.g. 'org.lysand:reactions/Reaction'. Notably, only the type can have uppercase letters.",
        ),
});

const ReportSchema = ExtensionSchema.extend({
    extension_type: z.literal("org.lysand:reports/Report"),
    objects: z.array(z.string().url()),
    reason: z.string(),
    comment: z.string().optional(),
});

const ServerMetadataSchema = EntitySchema.extend({
    type: z.literal("ServerMetadata"),
    name: z.string(),
    version: z.string(),
    description: z.string().optional(),
    website: z.string().optional(),
    moderators: z.array(z.string()).optional(),
    admins: z.array(z.string()).optional(),
    logo: ContentFormatSchema.optional(),
    banner: ContentFormatSchema.optional(),
    supported_extensions: z.array(z.string()),
    extensions: z.record(z.string(), z.any()).optional(),
});

export {
    EntitySchema,
    VisibilitySchema,
    PublicationSchema,
    NoteSchema,
    PatchSchema,
    ActorPublicKeyDataSchema,
    VanityExtensionSchema,
    UserSchema,
    ActionSchema,
    LikeSchema,
    UndoSchema,
    DislikeSchema,
    FollowSchema,
    FollowAcceptSchema,
    FollowRejectSchema,
    ExtensionSchema,
    ReportSchema,
    ServerMetadataSchema,
    ContentFormatSchema,
    CustomEmojiExtension,
    ExtensionPropertySchema,
};
