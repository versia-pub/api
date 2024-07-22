import { CustomEmojiExtensionSchema } from "@/federation/schemas/extensions/custom_emojis";
import { z } from "zod";

export const ExtensionPropertySchema = z.object({
    "org.lysand:custom_emojis":
        CustomEmojiExtensionSchema.optional().nullable(),
});
