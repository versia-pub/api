/**
 * Custom emojis extension.
 * @module federation/schemas/extensions/custom_emojis
 * @see module:federation/schemas/base
 * @see https://versia.pub/extensions/custom-emojis
 */
import { z } from "zod";
import { ImageOnlyContentFormatSchema } from "../content_format";
import { emojiRegex } from "../regex";

/**
 * @description Used to validate the properties the extension's custom field
 * @see https://versia.pub/extensions/custom-emojis
 * @example
 * {
 *     // ...
 *     "extensions": {
 *         "pub.versia:custom_emojis": {
 *             "emojis": [
 *                 {
 *                     "name": ":happy_face:",
 *                     "url": {
 *                         "image/png": {
 *                             "content": "https://cdn.example.com/emojis/happy_face.png",
 *                             "remote": true
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
        z
            .object({
                name: z
                    .string()
                    .min(1)
                    .max(256)
                    .regex(
                        emojiRegex,
                        "Emoji name must be alphanumeric, underscores, or dashes, and surrounded by identifiers",
                    ),
                url: ImageOnlyContentFormatSchema,
            })
            .strict(),
    ),
});
