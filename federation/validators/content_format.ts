import { types } from "mime-types";
import { z } from "zod";

const hashes = {
    sha256: 64,
    sha512: 128,
    "sha3-256": 64,
    "sha3-512": 128,
    "blake2b-256": 64,
    "blake2b-512": 128,
    "blake3-256": 64,
    "blake3-512": 128,
    md5: 32,
    sha1: 40,
    sha224: 56,
    sha384: 96,
    "sha3-224": 56,
    "sha3-384": 96,
    "blake2s-256": 64,
    "blake2s-512": 128,
    "blake3-224": 56,
    "blake3-384": 96,
};

const contentFormatFromAllowedMimes = (allowedMimes: [string, ...string[]]) =>
    z.record(
        z.enum(allowedMimes),
        z
            .object({
                content: z.string(),
                remote: z.boolean(),
                description: z.string().optional().nullable(),
                size: z
                    .number()
                    .int()
                    .nonnegative()
                    .max(2 ** 64 - 1)
                    .optional()
                    .nullable(),
                hash: z
                    .object(
                        Object.fromEntries(
                            Object.entries(hashes).map(([k, v]) => [
                                k,
                                z.string().length(v).optional().nullable(),
                            ]),
                        ),
                    )
                    .strict()
                    .optional()
                    .nullable(),
                thumbhash: z.string().optional().nullable(),
                fps: z
                    .number()
                    .int()
                    .nonnegative()
                    .max(2 ** 64 - 1)
                    .optional()
                    .nullable(),
                width: z
                    .number()
                    .int()
                    .nonnegative()
                    .max(2 ** 64 - 1)
                    .optional()
                    .nullable(),
                height: z
                    .number()
                    .int()
                    .nonnegative()
                    .max(2 ** 64 - 1)
                    .optional()
                    .nullable(),
                duration: z
                    .number()
                    .nonnegative()
                    .max(2 ** 16 - 1)
                    .optional()
                    .nullable(),
            })
            .strict()
            .refine(
                (v) =>
                    v.remote
                        ? z.string().url().safeParse(v.content).success
                        : true,
                "if remote is true, content must be a valid URL",
            ),
    );

export const ContentFormatSchema = contentFormatFromAllowedMimes(
    Object.values(types) as [string, ...string[]],
);

export const ImageOnlyContentFormatSchema = contentFormatFromAllowedMimes(
    Object.values(types).filter((v) => v.startsWith("image/")) as [
        string,
        ...string[],
    ],
);

export const TextOnlyContentFormatSchema = contentFormatFromAllowedMimes(
    Object.values(types).filter((v) => v.startsWith("text/")) as [
        string,
        ...string[],
    ],
);

export const AudioOnlyContentFormatSchema = contentFormatFromAllowedMimes(
    Object.values(types).filter((v) => v.startsWith("audio/")) as [
        string,
        ...string[],
    ],
);
