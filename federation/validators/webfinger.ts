import { z } from "zod";

export const WebFingerSchema = z.object({
    subject: z.string().url(),
    aliases: z.array(z.string().url()).optional(),
    properties: z.record(z.string().url(), z.string().or(z.null())).optional(),
    links: z
        .array(
            z.object({
                rel: z.string(),
                type: z.string().optional(),
                href: z.string().url().optional(),
                titles: z.record(z.string(), z.string()).optional(),
                properties: z
                    .record(z.string().url(), z.string().or(z.null()))
                    .optional(),
            }),
        )
        .optional(),
});
