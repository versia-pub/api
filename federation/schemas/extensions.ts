import { z } from "zod";
import { CustomEmojiExtensionSchema } from "./extensions/custom_emojis.ts";

export const ExtensionPropertySchema = z
    .object({
        "pub.versia:custom_emojis":
            CustomEmojiExtensionSchema.optional().nullable(),
    })
    .catchall(z.any());
