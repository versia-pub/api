/**
 * Vanity extension schema.
 * @module federation/schemas/extensions/vanity
 * @see module:federation/schemas/base
 * @see https://versia.pub/extensions/vanity
 */

import { z } from "zod";
import {
    AudioOnlyContentFormatSchema,
    ImageOnlyContentFormatSchema,
} from "../content_format";
import { isISOString } from "../regex";

/**
 * @description Vanity extension entity
 * @see https://versia.pub/extensions/vanity
 * @example
 * {
 *     // ...
 *     "type": "User",
 *     // ...
 *     "extensions": {
 *         "pub.versia:vanity": {
 *             "avatar_overlays": [
 *                 {
 *                     "image/png": {
 *                         "content": "https://cdn.example.com/ab5081cf-b11f-408f-92c2-7c246f290593/cat_ears.png",
 *                         "remote": true,
 *                     }
 *                 }
 *             ],
 *             "avatar_mask": {
 *                 "image/png": {
 *                     "content": "https://cdn.example.com/d8c42be1-d0f7-43ef-b4ab-5f614e1beba4/rounded_square.jpeg",
 *                     "remote": true,
 *                 }
 *             },
 *             "background": {
 *                 "image/png": {
 *                     "content": "https://cdn.example.com/6492ddcd-311e-4921-9567-41b497762b09/untitled-file-0019822.png",
 *                     "remote": true,
 *                 }
 *             },
 *             "audio": {
 *                 "audio/mpeg": {
 *                     "content": "https://cdn.example.com/4da2f0d4-4728-4819-83e4-d614e4c5bebc/michael-jackson-thriller.mp3",
 *                     "remote": true,
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
 *             "aliases": [
 *                 "https://burger.social/accounts/349ee237-c672-41c1-aadc-677e185f795a",
 *                 "https://versia.social/users/f565ef02-035d-4974-ba5e-f62a8558331d"
 *             ]
 *         }
 *     }
 * }
 */
export const VanityExtensionSchema = z
    .object({
        avatar_overlays: z
            .array(ImageOnlyContentFormatSchema)
            .optional()
            .nullable(),
        avatar_mask: ImageOnlyContentFormatSchema.optional().nullable(),
        background: ImageOnlyContentFormatSchema.optional().nullable(),
        audio: AudioOnlyContentFormatSchema.optional().nullable(),
        pronouns: z.record(
            z.string(),
            z.array(
                z.union([
                    z
                        .object({
                            subject: z.string(),
                            object: z.string(),
                            dependent_possessive: z.string(),
                            independent_possessive: z.string(),
                            reflexive: z.string(),
                        })
                        .strict(),
                    z.string(),
                ]),
            ),
        ),
        birthday: z
            .string()
            .refine((v) => isISOString(v), "must be a valid ISO8601 datetime")
            .optional()
            .nullable(),
        location: z.string().optional().nullable(),
        aliases: z.array(z.string().url()).optional().nullable(),
    })
    .strict();
