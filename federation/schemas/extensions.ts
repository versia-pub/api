import { z } from "zod";
import { CustomEmojiExtensionSchema } from "./extensions/custom_emojis";

export const ExtensionPropertySchema = z
    .object({
        "pub.versia:custom_emojis":
            CustomEmojiExtensionSchema.optional().nullable(),
    })
    .catchall(z.any());
