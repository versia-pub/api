import { z } from "zod";
import { CustomEmojiExtension } from "./extensions/custom_emojis";

export const ExtensionPropertySchema = z.object({
    "org.lysand:custom_emojis": CustomEmojiExtension.optional(),
});
