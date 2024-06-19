import { z } from "zod";
import { CustomEmojiExtensionSchema } from "./extensions/custom_emojis";

export const ExtensionPropertySchema = z.object({
    "org.lysand:custom_emojis": CustomEmojiExtensionSchema.optional(),
});
