/**
 * Reactions extension
 * @module federation/schemas/extensions/reactions
 * @see module:federation/schemas/base
 * @see https://versia.pub/extensions/reactions
 */
import { z } from "zod";
import { EntitySchema } from "../base";

/**
 * @description Reaction extension entity
 * @see https://versia.pub/extensions/reactions
 * @example
 * {
 *     "id": "6f27bc77-58ee-4c9b-b804-8cc1c1182fa9",
 *     "type": "pub.versia:reactions/Reaction",
 *     "uri": "https://example.com/actions/6f27bc77-58ee-4c9b-b804-8cc1c1182fa9",
 *     "created_at": "2021-01-01T00:00:00.000Z",
 *     "author": "https://example.com/users/6e0204a2-746c-4972-8602-c4f37fc63bbe",
 *     "object": "https://example.com/publications/f08a124e-fe90-439e-8be4-15a428a72a19",
 *     "content": "😀",
 * }
 */
export const ReactionSchema = EntitySchema.extend({
    type: z.literal("pub.versia:reactions/Reaction"),
    author: z.string().url(),
    object: z.string().url(),
    content: z.string().min(1).max(256),
});
