/**
 * Custom emojis extension.
 * @module federation/schemas/extensions/custom_emojis
 * @see module:federation/schemas/base
 * @see https://lysand.org/extensions/custom-emojis
 */
import { z } from "zod";
import { ContentFormatSchema } from "../content_format";
import { emojiRegex } from "../regex";

/**
 * @description Used to validate the properties the extension's custom field
 * @see https://lysand.org/extensions/custom-emojis
 * @example
 * {
 *     // ...
 *     "extensions": {
 *         "org.lysand:custom_emojis": {
 *             "emojis": [
 *                 {
 *                     "name": "happy_face",
 *                     "url": {
 *                         "image/png": {
 *                             "content": "https://cdn.example.com/emojis/happy_face.png",
 *                             "content_type": "image/png"
 *                         }
 *                     }
 *                 },
 *                 // ...
 *             ]
 *         }
 *     }
 *     // ...
 * }
 */
export const CustomEmojiExtensionSchema = z.object({
    emojis: z.array(
        z.object({
            name: z
                .string()
                .min(1)
                .max(256)
                .regex(
                    emojiRegex,
                    "Emoji name must be alphanumeric, underscores, or dashes.",
                ),
            url: ContentFormatSchema,
        }),
    ),
});
