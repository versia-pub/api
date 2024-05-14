import { types } from "mime-types";
import { z } from "zod";

export const ContentFormat = z.record(
    z.enum(Object.values(types) as [string, ...string[]]),
    z.object({
        content: z.string(),
        description: z.string().optional(),
        size: z.number().int().nonnegative().optional(),
        hash: z.record(z.string(), z.string()).optional(),
        blurhash: z.string().optional(),
        fps: z.number().int().nonnegative().optional(),
        width: z.number().int().nonnegative().optional(),
        height: z.number().int().nonnegative().optional(),
        duration: z.number().nonnegative().optional(),
    }),
);
