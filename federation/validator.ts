import type { z } from "zod";
import { fromError } from "zod-validation-error";
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
import { LikeSchema } from "./schemas/extensions/likes";
import { VoteSchema } from "./schemas/extensions/polls";
import { ReactionSchema } from "./schemas/extensions/reactions";
import { ShareSchema } from "./schemas/extensions/share";
import { VanityExtensionSchema } from "./schemas/extensions/vanity";
import type {
    Collection,
    ContentFormat,
    CustomEmojiExtension,
    Delete,
    DislikeExtension,
    Entity,
    EntityExtensionProperty,
    Follow,
    FollowAccept,
    FollowReject,
    Group,
    InstanceMetadata,
    LikeExtension,
    Note,
    PollVoteExtension,
    ReactionExtension,
    ShareExtension,
    Unfollow,
    User,
    VanityExtension,
} from "./types";

// biome-ignore lint/suspicious/noExplicitAny: Used only as a base type
type AnyZod = z.ZodType<any, any, any>;

type InferType<T extends AnyZod> = z.infer<T>;

/**
 * Validates entities against their respective schemas.
 * @module federation/validator
 * @see module:federation/schemas/base
 * @example
 * import { EntityValidator, type ValidationError } from "@versia/federation";
 * const validator = new EntityValidator();
 *
 * // Will throw a special ValidationError with a human-friendly error message
 * // and a machine-friendly error object if the data is invalid.
 * const note = await validator.Note({
 *     type: "Note",
 *     content: "Hello, world!",
 * });
 *
 * try {
 *     await validator.Note({
 *         type: "Note",
 *         content: 123,
 *     });
 * } catch (error) {
 *     sendUser((error as ValidationError).toString());
 * }
 *
 * // Types are also included for TypeScript users that don't use the extracted ones
 * import type { Note } from "@versia/federation/types";
 *
 * const note: Note = {
 *     ...
 * };
 */
export class EntityValidator {
    private async validate<T extends AnyZod>(
        schema: T,
        data: unknown,
    ): Promise<InferType<T>> {
        try {
            return (await schema.parseAsync(data)) as InferType<T>;
        } catch (error) {
            throw fromError(error);
        }
    }

    /**
     * Validates a Note entity.
     * @param data - The data to validate
     * @returns A promise that resolves to the validated data.
     */
    public Note(data: unknown): Promise<Note> {
        return this.validate(NoteSchema, data);
    }

    /**
     * Validates a Collection entity.
     * @param data - The data to validate
     * @returns A promise that resolves to the validated data.
     */
    public Collection(data: unknown): Promise<Collection> {
        return this.validate(CollectionSchema, data);
    }

    /**
     * Validates a VanityExtension entity.
     * @param data - The data to validate
     * @returns A promise that resolves to the validated data.
     */
    public VanityExtension(data: unknown): Promise<VanityExtension> {
        return this.validate(VanityExtensionSchema, data);
    }

    /**
     * Validates a User entity.
     * @param data - The data to validate
     * @returns A promise that resolves to the validated data.
     */
    public User(data: unknown): Promise<User> {
        return this.validate(UserSchema, data);
    }

    /**
     * Validates a Follow entity.
     * @param data - The data to validate
     * @returns A promise that resolves to the validated data.
     */
    public Follow(data: unknown): Promise<Follow> {
        return this.validate(FollowSchema, data);
    }

    /**
     * Validates a FollowAccept entity.
     * @param data - The data to validate
     * @returns A promise that resolves to the validated data.
     */
    public FollowAccept(data: unknown): Promise<FollowAccept> {
        return this.validate(FollowAcceptSchema, data);
    }

    /**
     * Validates a FollowReject entity.
     * @param data - The data to validate
     * @returns A promise that resolves to the validated data.
     */
    public FollowReject(data: unknown): Promise<FollowReject> {
        return this.validate(FollowRejectSchema, data);
    }

    /**
     * Validates a ContentFormat entity.
     * @param data - The data to validate
     * @returns A promise that resolves to the validated data.
     */
    public ContentFormat(data: unknown): Promise<ContentFormat> {
        return this.validate(ContentFormatSchema, data);
    }

    /**
     * Validates a CustomEmojiExtension entity.
     * @param data - The data to validate
     * @returns A promise that resolves to the validated data.
     */
    public CustomEmojiExtension(data: unknown): Promise<CustomEmojiExtension> {
        return this.validate(CustomEmojiExtensionSchema, data);
    }

    /**
     * Validates an Entity.
     * @param data - The data to validate
     * @returns A promise that resolves to the validated data.
     */
    public Entity(data: unknown): Promise<Entity> {
        return this.validate(EntitySchema, data);
    }

    /**
     * Validates an ExtensionProperty.
     * @param data - The data to validate
     * @returns A promise that resolves to the validated data.
     */
    public EntityExtensionProperty(
        data: unknown,
    ): Promise<EntityExtensionProperty> {
        return this.validate(ExtensionPropertySchema, data);
    }

    /**
     * Validates a Delete entity.
     * @param data - The data to validate
     * @returns A promise that resolves to the validated data.
     */
    public Delete(data: unknown): Promise<Delete> {
        return this.validate(DeleteSchema, data);
    }

    /**
     * Validates a Group entity.
     * @param data - The data to validate
     * @returns A promise that resolves to the validated data.
     */
    public Group(data: unknown): Promise<Group> {
        return this.validate(GroupSchema, data);
    }

    /**
     * Validates an InstanceMetadata entity.
     * @param data - The data to validate
     * @returns A promise that resolves to the validated data.
     */
    public InstanceMetadata(data: unknown): Promise<InstanceMetadata> {
        return this.validate(InstanceMetadataSchema, data);
    }

    /**
     * Validates an Unfollow entity.
     * @param data - The data to validate
     * @returns A promise that resolves to the validated data.
     */
    public Unfollow(data: unknown): Promise<Unfollow> {
        return this.validate(UnfollowSchema, data);
    }

    /**
     * Validates a Like entity.
     * @param data - The data to validate
     * @returns A promise that resolves to the validated data.
     */
    public LikeExtension(data: unknown): Promise<LikeExtension> {
        return this.validate(LikeSchema, data);
    }

    /**
     * Validates a Dislike entity.
     * @param data - The data to validate
     * @returns A promise that resolves to the validated data.
     */
    public DislikeExtension(data: unknown): Promise<DislikeExtension> {
        return this.validate(LikeSchema, data);
    }

    /**
     * Validates a Vote entity.
     * @param data - The data to validate
     * @returns A promise that resolves to the validated data.
     */
    public PollVoteExtension(data: unknown): Promise<PollVoteExtension> {
        return this.validate(VoteSchema, data);
    }

    /**
     * Validates a Reaction entity.
     * @param data - The data to validate
     * @returns A promise that resolves to the validated data.
     */
    public ReactionExtension(data: unknown): Promise<ReactionExtension> {
        return this.validate(ReactionSchema, data);
    }

    /**
     * Validates a Share entity.
     * @param data - The data to validate
     * @returns A promise that resolves to the validated data.
     */
    public ShareExtension(data: unknown): Promise<ShareExtension> {
        return this.validate(ShareSchema, data);
    }
}
