/**
 * Reactions extension
 * @module federation/schemas/extensions/reactions
 * @see module:federation/schemas/base
 * @see https://lysand.org/extensions/reactions
 */
import { z } from "zod";
import { Extension } from "../base";

/**
 * @description Reaction extension entity
 * @see https://lysand.org/extensions/reactions
 * @example
 * {
 *     "type": "Extension",
 *     "id": "d6eb84ea-cd13-43f9-9c54-01244da8e5e3",
 *     "created_at": "2021-01-01T00:00:00.000Z",
 *     "uri": "https://example.com/reactions/d6eb84ea-cd13-43f9-9c54-01244da8e5e3",
 *     "extension_type": "org.lysand:reactions/Reaction",
 *     "object": "https://example.com/posts/d6eb84ea-cd13-43f9-9c54-01244da8e5e3",
 *     "content": "👍"
 * }
 */
export const Reaction = Extension.extend({
    extension_type: z.literal("org.lysand:reactions/Reaction"),
    object: z.string().url(),
    content: z.string(),
});
