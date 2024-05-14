/**
 * @file index.ts
 * @fileoverview Main entrypoint and export for the module
 * @module federation
 * @see module:federation/schemas/base
 */

import type { z } from "zod";
import {
    Action,
    ActorPublicKeyData,
    ContentFormat,
    Dislike,
    Entity,
    Extension,
    Follow,
    FollowAccept,
    FollowReject,
    Like,
    Note,
    Patch,
    Publication,
    Report,
    ServerMetadata,
    Undo,
    User,
    VanityExtension,
    Visibility,
} from "./schemas/base";

export type InferType<T extends z.AnyZodObject> = z.infer<T>;

export {
    Entity,
    ContentFormat,
    Visibility,
    Publication,
    Note,
    Patch,
    ActorPublicKeyData,
    VanityExtension,
    User,
    Action,
    Like,
    Undo,
    Dislike,
    Follow,
    FollowAccept,
    FollowReject,
    Extension,
    Report,
    ServerMetadata,
};
