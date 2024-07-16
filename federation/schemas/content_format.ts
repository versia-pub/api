import { types } from "mime-types";
import { z } from "zod";

export const ContentFormatSchema = z.record(
    z.enum(Object.values(types) as [string, ...string[]]),
    z.object({
        content: z.string(),
        description: z.string().optional().nullable(),
        size: z.number().int().nonnegative().optional().nullable(),
        hash: z.record(z.string(), z.string()).optional().nullable(),
        blurhash: z.string().optional().nullable(),
        fps: z.number().int().nonnegative().optional().nullable(),
        width: z.number().int().nonnegative().optional().nullable(),
        height: z.number().int().nonnegative().optional().nullable(),
        duration: z.number().nonnegative().optional().nullable(),
    }),
);
