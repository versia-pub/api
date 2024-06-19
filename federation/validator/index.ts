import type { z } from "zod";
import { fromError } from "zod-validation-error";
import {
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
} from "../schemas/base";

// biome-ignore lint/suspicious/noExplicitAny: Used only as a base type
type AnyZod = z.ZodType<any, any, any>;

type InferType<T extends AnyZod> = z.infer<T>;

/**
 * Validates entities against their respective schemas.
 * @module federation/validator
 * @see module:federation/schemas/base
 * @example
 * import { EntityValidator, type ValidationError } from "@lysand-org/federation";
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
 * import type { Note } from "@lysand-org/federation/types";
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
    public Note(data: unknown): Promise<InferType<typeof NoteSchema>> {
        return this.validate(NoteSchema, data);
    }

    /**
     * Validates a Patch entity.
     * @param data - The data to validate
     * @returns A promise that resolves to the validated data.
     */
    public Patch(data: unknown): Promise<InferType<typeof PatchSchema>> {
        return this.validate(PatchSchema, data);
    }

    /**
     * Validates an ActorPublicKeyData entity.
     * @param data - The data to validate
     * @returns A promise that resolves to the validated data.
     */
    public ActorPublicKeyData(
        data: unknown,
    ): Promise<InferType<typeof ActorPublicKeyDataSchema>> {
        return this.validate(ActorPublicKeyDataSchema, data);
    }

    /**
     * Validates a VanityExtension entity.
     * @param data - The data to validate
     * @returns A promise that resolves to the validated data.
     */
    public VanityExtension(
        data: unknown,
    ): Promise<InferType<typeof VanityExtensionSchema>> {
        return this.validate(VanityExtensionSchema, data);
    }

    /**
     * Validates a User entity.
     * @param data - The data to validate
     * @returns A promise that resolves to the validated data.
     */
    public User(data: unknown): Promise<InferType<typeof UserSchema>> {
        return this.validate(UserSchema, data);
    }

    /**
     * Validates an Action entity.
     * @param data - The data to validate
     * @returns A promise that resolves to the validated data.
     */
    public Action(data: unknown): Promise<InferType<typeof ActionSchema>> {
        return this.validate(ActionSchema, data);
    }

    /**
     * Validates a Like entity.
     * @param data - The data to validate
     * @returns A promise that resolves to the validated data.
     */
    public Like(data: unknown): Promise<InferType<typeof LikeSchema>> {
        return this.validate(LikeSchema, data);
    }

    /**
     * Validates an Undo entity.
     * @param data - The data to validate
     * @returns A promise that resolves to the validated data.
     */
    public Undo(data: unknown): Promise<InferType<typeof UndoSchema>> {
        return this.validate(UndoSchema, data);
    }

    /**
     * Validates a Dislike entity.
     * @param data - The data to validate
     * @returns A promise that resolves to the validated data.
     */
    public Dislike(data: unknown): Promise<InferType<typeof DislikeSchema>> {
        return this.validate(DislikeSchema, data);
    }

    /**
     * Validates a Follow entity.
     * @param data - The data to validate
     * @returns A promise that resolves to the validated data.
     */
    public Follow(data: unknown): Promise<InferType<typeof FollowSchema>> {
        return this.validate(FollowSchema, data);
    }

    /**
     * Validates a FollowAccept entity.
     * @param data - The data to validate
     * @returns A promise that resolves to the validated data.
     */
    public FollowAccept(
        data: unknown,
    ): Promise<InferType<typeof FollowAcceptSchema>> {
        return this.validate(FollowAcceptSchema, data);
    }

    /**
     * Validates a FollowReject entity.
     * @param data - The data to validate
     * @returns A promise that resolves to the validated data.
     */
    public FollowReject(
        data: unknown,
    ): Promise<InferType<typeof FollowRejectSchema>> {
        return this.validate(FollowRejectSchema, data);
    }

    /**
     * Validates an Extension entity.
     * @param data - The data to validate
     * @returns A promise that resolves to the validated data.
     */
    public Extension(
        data: unknown,
    ): Promise<InferType<typeof ExtensionSchema>> {
        return this.validate(ExtensionSchema, data);
    }

    /**
     * Validates a Report entity.
     * @param data - The data to validate
     * @returns A promise that resolves to the validated data.
     */
    public Report(data: unknown): Promise<InferType<typeof ReportSchema>> {
        return this.validate(ReportSchema, data);
    }

    /**
     * Validates a ServerMetadata entity.
     * @param data - The data to validate
     * @returns A promise that resolves to the validated data.
     */
    public ServerMetadata(
        data: unknown,
    ): Promise<InferType<typeof ServerMetadataSchema>> {
        return this.validate(ServerMetadataSchema, data);
    }

    /**
     * Validates a ContentFormat entity.
     * @param data - The data to validate
     * @returns A promise that resolves to the validated data.
     */
    public ContentFormat(
        data: unknown,
    ): Promise<InferType<typeof ContentFormatSchema>> {
        return this.validate(ContentFormatSchema, data);
    }

    /**
     * Validates a CustomEmojiExtension entity.
     * @param data - The data to validate
     * @returns A promise that resolves to the validated data.
     */
    public CustomEmojiExtension(
        data: unknown,
    ): Promise<InferType<typeof CustomEmojiExtensionSchema>> {
        return this.validate(CustomEmojiExtensionSchema, data);
    }

    /**
     * Validates a Visibility entity.
     * @param data - The data to validate
     * @returns A promise that resolves to the validated data.
     */
    public Visibility(
        data: unknown,
    ): Promise<InferType<typeof VisibilitySchema>> {
        return this.validate(VisibilitySchema, data);
    }

    /**
     * Validates a Publication entity.
     * @param data - The data to validate
     * @returns A promise that resolves to the validated data.
     */
    public Publication(
        data: unknown,
    ): Promise<InferType<typeof PublicationSchema>> {
        return this.validate(PublicationSchema, data);
    }

    /**
     * Validates an Entity.
     * @param data - The data to validate
     * @returns A promise that resolves to the validated data.
     */
    public Entity(data: unknown): Promise<InferType<typeof EntitySchema>> {
        return this.validate(EntitySchema, data);
    }

    /**
     * Validates an ExtensionProperty.
     * @param data - The data to validate
     * @returns A promise that resolves to the validated data.
     */
    public ExtensionProperty(
        data: unknown,
    ): Promise<InferType<typeof ExtensionPropertySchema>> {
        return this.validate(ExtensionPropertySchema, data);
    }
}
