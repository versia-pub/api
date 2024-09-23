/**
 * Polls extension
 * @module federation/schemas/extensions/polls
 * @see module:federation/schemas/base
 * @see https://versia.pub/extensions/polls
 */
import { z } from "zod";
import { EntitySchema } from "../base.ts";

/**
 * @description Vote extension entity
 * @see https://versia.pub/extensions/polls
 * @example
 * {
 *     "id": "6f27bc77-58ee-4c9b-b804-8cc1c1182fa9",
 *     "type": "pub.versia:polls/Vote",
 *     "uri": "https://example.com/actions/6f27bc77-58ee-4c9b-b804-8cc1c1182fa9",
 *     "created_at": "2021-01-01T00:00:00.000Z",
 *     "author": "https://example.com/users/6e0204a2-746c-4972-8602-c4f37fc63bbe",
 *     "poll": "https://example.com/notes/f08a124e-fe90-439e-8be4-15a428a72a19",
 *     "option": 1
 * }
 */
export const VoteSchema = EntitySchema.extend({
    type: z.literal("pub.versia:polls/Vote"),
    author: z.string().url(),
    poll: z.string().url(),
    option: z
        .number()
        .int()
        .nonnegative()
        .max(2 ** 64 - 1),
});
