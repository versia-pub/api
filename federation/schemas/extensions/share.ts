import { z } from "zod";
import { EntitySchema } from "../base.ts";

/**
 * @description Share entity
 * @see https://versia.pub/extensions/share
 * @example
 * {
 *     "id": "3e7e4750-afd4-4d99-a256-02f0710a0520",
 *     "type": "pub.versia:share/Share",
 *     "created_at": "2021-01-01T00:00:00.000Z",
 *     "author": "https://example.com/users/6e0204a2-746c-4972-8602-c4f37fc63bbe",
 *     "uri": "https://example.com/shares/3e7e4750-afd4-4d99-a256-02f0710a0520",
 *     "shared": "https://otherexample.org/notes/fmKZ763jzIU8"
 * }
 */
export const ShareSchema = EntitySchema.extend({
    type: z.literal("pub.versia:share/Share"),
    author: z.string().url(),
    shared: z.string().url(),
});
