import { z } from "zod";
import { EntitySchema } from "../base";

/**
 * @description Like entity
 * @see https://versia.pub/extensions/likes
 * @example
 * {
 *     "id": "3e7e4750-afd4-4d99-a256-02f0710a0520",
 *     "type": "pub.versia:likes/Like",
 *     "created_at": "2021-01-01T00:00:00.000Z",
 *     "author": "https://example.com/users/6e0204a2-746c-4972-8602-c4f37fc63bbe",
 *     "uri": "https://example.com/likes/3e7e4750-afd4-4d99-a256-02f0710a0520",
 *     "liked": "https://otherexample.org/notes/fmKZ763jzIU8"
 * }
 */
export const LikeSchema = EntitySchema.extend({
    type: z.literal("pub.versia:likes/Like"),
    author: z.string().url(),
    liked: z.string().url(),
});

/**
 * @description Dislike entity
 * @see https://versia.pub/extensions/likes
 * @example
 * {
 *     "id": "3e7e4750-afd4-4d99-a256-02f0710a0520",
 *     "type": "pub.versia:likes/Dislike",
 *     "created_at": "2021-01-01T00:00:00.000Z",
 *     "author": "https://example.com/users/6e0204a2-746c-4972-8602-c4f37fc63bbe",
 *     "uri": "https://example.com/dislikes/3e7e4750-afd4-4d99-a256-02f0710a0520",
 *     "disliked": "https://otherexample.org/notes/fmKZ763jzIU8"
 * }
 */
export const DislikeSchema = EntitySchema.extend({
    type: z.literal("pub.versia:likes/Dislike"),
    author: z.string().url(),
    disliked: z.string().url(),
});
