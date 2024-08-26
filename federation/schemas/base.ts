import { z } from "zod";
import {
    ContentFormatSchema,
    ImageOnlyContentFormatSchema,
    TextOnlyContentFormatSchema,
} from "./content_format";
import { ExtensionPropertySchema } from "./extensions";
import { VanityExtensionSchema } from "./extensions/vanity";
import { extensionRegex, isISOString, semverRegex } from "./regex";

export const EntitySchema = z
    .object({
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
        "pub.versia:reactions": z
            .object({
                reactions: z.string().url(),
            })
            .strict()
            .optional()
            .nullable(),
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
            /^[a-z0-9_-]+$/,
            "must be lowercase, alphanumeric, and may contain _ or -",
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
    target: z.string().url(),
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

export const GroupSchema = EntitySchema.extend({
    type: z.literal("Group"),
    name: TextOnlyContentFormatSchema.optional().nullable(),
    description: TextOnlyContentFormatSchema.optional().nullable(),
    members: z.string().url(),
    notes: z.string().url().optional().nullable(),
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
    description: TextOnlyContentFormatSchema.optional().nullable(),
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
