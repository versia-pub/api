/**
 * Vanity extension schema.
 * @module federation/schemas/extensions/vanity
 * @see module:federation/schemas/base
 * @see https://lysand.org/extensions/vanity
 */

import { z } from "zod";
import { ContentFormatSchema } from "../content_format";

/**
 * @description Vanity extension entity
 * @see https://lysand.org/extensions/vanity
 * @example
 * {
 *     // ...
 *     "type": "User",
 *     // ...
 *     "extensions": {
 *         "org.lysand:vanity": {
 *             "avatar_overlay": {
 *                 "image/png": {
 *                     "content": "https://cdn.example.com/ab5081cf-b11f-408f-92c2-7c246f290593/cat_ears.png",
 *                     "content_type": "image/png"
 *                 }
 *             },
 *             "avatar_mask": {
 *                 "image/png": {
 *                     "content": "https://cdn.example.com/d8c42be1-d0f7-43ef-b4ab-5f614e1beba4/rounded_square.jpeg",
 *                     "content_type": "image/jpeg"
 *                 }
 *             },
 *             "background": {
 *                 "image/png": {
 *                     "content": "https://cdn.example.com/6492ddcd-311e-4921-9567-41b497762b09/untitled-file-0019822.png",
 *                     "content_type": "image/png"
 *                 }
 *             },
 *             "audio": {
 *                 "audio/mpeg": {
 *                     "content": "https://cdn.example.com/4da2f0d4-4728-4819-83e4-d614e4c5bebc/michael-jackson-thriller.mp3",
 *                     "content_type": "audio/mpeg"
 *                 }
 *             },
 *             "pronouns": {
 *                 "en-us": [
 *                     "he/him",
 *                     {
 *                         "subject": "they",
 *                         "object": "them",
 *                         "dependent_possessive": "their",
 *                         "independent_possessive": "theirs",
 *                         "reflexive": "themself"
 *                     },
 *                 ]
 *             },
 *             "birthday": "1998-04-12",
 *             "location": "+40.6894-074.0447/",
 *             "activitypub": [
 *                 "@erikuden@mastodon.de"
 *             ],
 *             "aliases": [
 *                 "https://burger.social/accounts/349ee237-c672-41c1-aadc-677e185f795a",
 *                 "https://social.lysand.org/users/f565ef02-035d-4974-ba5e-f62a8558331d"
 *             ]
 *         }
 *     }
 * }
 */
export const VanityExtensionSchema = z.object({
    avatar_overlay: ContentFormatSchema.optional().nullable(),
    avatar_mask: ContentFormatSchema.optional().nullable(),
    background: ContentFormatSchema.optional().nullable(),
    audio: ContentFormatSchema.optional().nullable(),
    pronouns: z.record(
        z.string(),
        z.array(
            z.union([
                z.object({
                    subject: z.string(),
                    object: z.string(),
                    dependent_possessive: z.string(),
                    independent_possessive: z.string(),
                    reflexive: z.string(),
                }),
                z.string(),
            ]),
        ),
    ),
    birthday: z.string().optional().nullable(),
    location: z.string().optional().nullable(),
    activitypub: z.string().optional().nullable(),
});
