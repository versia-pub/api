import { z } from "zod";
import { EntitySchema } from "../base.ts";
import { TextOnlyContentFormatSchema } from "../content_format.ts";

export const GroupSchema = EntitySchema.extend({
    type: z.literal("pub.versia:groups/Group"),
    name: TextOnlyContentFormatSchema.optional().nullable(),
    description: TextOnlyContentFormatSchema.optional().nullable(),
    open: z.boolean().optional().nullable(),
    members: z.string().url(),
    notes: z.string().url().optional().nullable(),
});

export const GroupSubscribeSchema = EntitySchema.extend({
    type: z.literal("pub.versia:groups/Subscribe"),
    uri: z.null().optional(),
    subscriber: z.string().url(),
    group: z.string().url(),
});

export const GroupUnsubscribeSchema = EntitySchema.extend({
    type: z.literal("pub.versia:groups/Unsubscribe"),
    uri: z.null().optional(),
    subscriber: z.string().url(),
    group: z.string().url(),
});

export const GroupSubscribeAcceptSchema = EntitySchema.extend({
    type: z.literal("pub.versia:groups/SubscribeAccept"),
    uri: z.null().optional(),
    subscriber: z.string().url(),
    group: z.string().url(),
});

export const GroupSubscribeRejectSchema = EntitySchema.extend({
    type: z.literal("pub.versia:groups/SubscribeReject"),
    uri: z.null().optional(),
    subscriber: z.string().url(),
    group: z.string().url(),
});
