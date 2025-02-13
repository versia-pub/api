import { z } from "zod";
import {
    ContentFormatSchema,
    ImageOnlyContentFormatSchema,
    TextOnlyContentFormatSchema,
} from "./content_format.ts";
import { ExtensionPropertySchema } from "./extensions.ts";
import { VanityExtensionSchema } from "./extensions/vanity.ts";
import { extensionRegex, isISOString, semverRegex } from "./regex.ts";

export const EntitySchema = z
    .object({
        // biome-ignore lint/style/useNamingConvention:
        $schema: z.string().url().optional().nullable(),
        id: z.string().max(512),
        created_at: z
            .string()
            .refine((v) => isISOString(v), "must be a valid ISO8601 datetime"),
        uri: z.string().url(),
        type: z.string(),
        extensions: ExtensionPropertySchema.optional().nullable(),
    })
    .strict();

export const NoteSchema = EntitySchema.extend({
    type: z.literal("Note"),
    attachments: z.array(ContentFormatSchema).optional().nullable(),
    author: z.string().url(),
    category: z
        .enum([
            "microblog",
            "forum",
            "blog",
            "image",
            "video",
            "audio",
            "messaging",
        ])
        .optional()
        .nullable(),
    content: TextOnlyContentFormatSchema.optional().nullable(),
    collections: z.object({
        replies: z.string().url(),
        quotes: z.string().url(),
        "pub.versia:reactions/Reactions": z
            .string()
            .url()
            .optional()
            .nullable(),
        "pub.versia:likes/Likes": z.string().url().optional().nullable(),
        "pub.versia:likes/Dislikes": z.string().url().optional().nullable(),
    }),
    device: z
        .object({
            name: z.string(),
            version: z.string().optional().nullable(),
            url: z.string().url().optional().nullable(),
        })
        .strict()
        .optional()
        .nullable(),
    group: z
        .string()
        .url()
        .or(z.enum(["public", "followers"]))
        .optional()
        .nullable(),
    is_sensitive: z.boolean().optional().nullable(),
    mentions: z.array(z.string().url()).optional().nullable(),
    previews: z
        .array(
            z
                .object({
                    link: z.string().url(),
                    title: z.string(),
                    description: z.string().optional().nullable(),
                    image: z.string().url().optional().nullable(),
                    icon: z.string().url().optional().nullable(),
                })
                .strict(),
        )
        .optional()
        .nullable(),
    quotes: z.string().url().optional().nullable(),
    replies_to: z.string().url().optional().nullable(),
    subject: z.string().optional().nullable(),
    extensions: ExtensionPropertySchema.extend({
        "pub.versia:polls": z
            .object({
                options: z.array(TextOnlyContentFormatSchema),
                votes: z.array(
                    z
                        .number()
                        .int()
                        .nonnegative()
                        .max(2 ** 64 - 1),
                ),
                multiple_choice: z.boolean(),
                expires_at: z
                    .string()
                    .refine(
                        (v) => isISOString(v),
                        "must be a valid ISO8601 datetime",
                    ),
            })
            .strict()
            .optional()
            .nullable(),
    })
        .optional()
        .nullable(),
});

export const CollectionSchema = z.object({
    author: z.string().url().nullable(),
    first: z.string().url(),
    last: z.string().url(),
    total: z
        .number()
        .int()
        .nonnegative()
        .max(2 ** 64 - 1),
    next: z.string().url().nullable(),
    previous: z.string().url().nullable(),
    items: z.array(z.any()),
});

export const URICollectionSchema = CollectionSchema.extend({
    items: z.array(z.string().url()),
});

export const PublicKeyDataSchema = z
    .object({
        key: z.string().min(1),
        actor: z.string().url(),
        algorithm: z.literal("ed25519"),
    })
    .strict();

export const UserSchema = EntitySchema.extend({
    type: z.literal("User"),
    avatar: ImageOnlyContentFormatSchema.optional().nullable(),
    bio: TextOnlyContentFormatSchema.optional().nullable(),
    display_name: z.string().optional().nullable(),
    fields: z
        .array(
            z
                .object({
                    key: TextOnlyContentFormatSchema,
                    value: TextOnlyContentFormatSchema,
                })
                .strict(),
        )
        .optional()
        .nullable(),
    username: z
        .string()
        .min(1)
        .regex(
            /^[a-zA-Z0-9_-]+$/,
            "must be alphanumeric, and may contain _ or -",
        ),
    header: ImageOnlyContentFormatSchema.optional().nullable(),
    public_key: PublicKeyDataSchema,
    manually_approves_followers: z.boolean().optional().nullable(),
    indexable: z.boolean().optional().nullable(),
    inbox: z.string().url(),
    collections: z
        .object({
            featured: z.string().url(),
            followers: z.string().url(),
            following: z.string().url(),
            outbox: z.string().url(),
            "pub.versia:likes/Likes": z.string().url().optional().nullable(),
            "pub.versia:likes/Dislikes": z.string().url().optional().nullable(),
        })
        .catchall(z.string().url()),
    extensions: ExtensionPropertySchema.extend({
        "pub.versia:vanity": VanityExtensionSchema.optional().nullable(),
    })
        .optional()
        .nullable(),
});

export const DeleteSchema = EntitySchema.extend({
    uri: z.null().optional(),
    type: z.literal("Delete"),
    author: z.string().url().nullable(),
    deleted_type: z.string(),
    deleted: z.string().url(),
});

export const FollowSchema = EntitySchema.extend({
    type: z.literal("Follow"),
    uri: z.null().optional(),
    author: z.string().url(),
    followee: z.string().url(),
});

export const FollowAcceptSchema = EntitySchema.extend({
    type: z.literal("FollowAccept"),
    uri: z.null().optional(),
    author: z.string().url(),
    follower: z.string().url(),
});

export const FollowRejectSchema = EntitySchema.extend({
    type: z.literal("FollowReject"),
    uri: z.null().optional(),
    author: z.string().url(),
    follower: z.string().url(),
});

export const UnfollowSchema = EntitySchema.extend({
    type: z.literal("Unfollow"),
    uri: z.null().optional(),
    author: z.string().url(),
    followee: z.string().url(),
});

export const InstanceMetadataSchema = EntitySchema.extend({
    type: z.literal("InstanceMetadata"),
    id: z.null().optional(),
    uri: z.null().optional(),
    name: z.string().min(1),
    software: z
        .object({
            name: z.string().min(1),
            version: z.string().min(1),
        })
        .strict(),
    compatibility: z
        .object({
            versions: z.array(
                z.string().regex(semverRegex, "must be a valid SemVer version"),
            ),
            extensions: z.array(
                z
                    .string()
                    .min(1)
                    .regex(
                        extensionRegex,
                        "must be in the format 'namespaced_url:extension_name', e.g. 'pub.versia:reactions'",
                    ),
            ),
        })
        .strict(),
    description: z.string().optional().nullable(),
    host: z.string(),
    shared_inbox: z.string().url().optional().nullable(),
    public_key: z
        .object({
            key: z.string().min(1),
            algorithm: z.literal("ed25519"),
        })
        .strict(),
    moderators: z.string().url().optional().nullable(),
    admins: z.string().url().optional().nullable(),
    logo: ImageOnlyContentFormatSchema.optional().nullable(),
    banner: ImageOnlyContentFormatSchema.optional().nullable(),
});
