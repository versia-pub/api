/**
 * Polls extension
 * @module federation/schemas/extensions/polls
 * @see module:federation/schemas/base
 * @see https://versia.pub/extensions/polls
 */
import { z } from "zod";
import { ExtensionSchema } from "../base";
import { ContentFormatSchema } from "../content_format";

/**
 * @description Poll extension entity
 * @see https://versia.pub/extensions/polls
 * @example
 * {
 *     "type": "Extension",
 *     "id": "d6eb84ea-cd13-43f9-9c54-01244da8e5e3",
 *     "extension_type": "org.lysand:polls/Poll",
 *     "uri": "https://example.com/polls/d6eb84ea-cd13-43f9-9c54-01244da8e5e3",
 *     "options": [
 *         {
 *             "text/plain": {
 *                 "content": "Red"
 *             }
 *         },
 *         {
 *             "text/plain": {
 *                 "content": "Blue"
 *             }
 *         },
 *         {
 *             "text/plain": {
 *                 "content": "Green"
 *             }
 *         }
 *     ],
 *     "votes": [
 *         9,
 *         5,
 *         0
 *     ],
 *     "multiple_choice": false,
 *     "expires_at": "2021-01-04T00:00:00.000Z"
 * }
 */
export const PollSchema = ExtensionSchema.extend({
    extension_type: z.literal("org.lysand:polls/Poll"),
    options: z.array(ContentFormatSchema),
    votes: z.array(z.number().int().nonnegative()),
    multiple_choice: z.boolean().optional().nullable(),
    expires_at: z.string(),
});

/**
 * @description Vote extension entity
 * @see https://versia.pub/extensions/polls
 * @example
 * {
 *     "type": "Extension",
 *     "id": "31c4de70-e266-4f61-b0f7-3767d3ccf565",
 *     "created_at": "2021-01-01T00:00:00.000Z",
 *     "uri": "https://example.com/votes/31c4de70-e266-4f61-b0f7-3767d3ccf565",
 *     "extension_type": "org.lysand:polls/Vote",
 *     "poll": "https://example.com/polls/31c4de70-e266-4f61-b0f7-3767d3ccf565",
 *     "option": 1
 * }
 */
export const VoteSchema = ExtensionSchema.extend({
    extension_type: z.literal("org.lysand:polls/Vote"),
    poll: z.string().url(),
    option: z.number(),
});

/**
 * @description Vote result extension entity
 * @see https://versia.pub/extensions/polls
 * @example
 * {
 *     "type": "Extension",
 *     "id": "c6d5755b-f42c-418f-ab53-2ee3705d6628",
 *     "created_at": "2021-01-01T00:00:00.000Z",
 *     "uri": "https://example.com/polls/c6d5755b-f42c-418f-ab53-2ee3705d6628/result",
 *     "extension_type": "org.lysand:polls/VoteResult",
 *     "poll": "https://example.com/polls/c6d5755b-f42c-418f-ab53-2ee3705d6628",
 *     "votes": [9, 5, 0]
 * }
 */
export const VoteResultSchema = ExtensionSchema.extend({
    extension_type: z.literal("org.lysand:polls/VoteResult"),
    poll: z.string().url(),
    votes: z.array(z.number().int().nonnegative()),
});
