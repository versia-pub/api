/**
 * @file index.ts
 * @fileoverview Main entrypoint and export for the module
 * @module federation
 * @see module:federation/schemas/base
 */

import {
    SignatureConstructor,
    SignatureValidator,
} from "@/federation/cryptography";
import { RequestParserHandler } from "@/federation/http";
import {
    FederationRequester,
    type Output,
    ResponseError,
} from "@/federation/requester/index";
import { EntityValidator } from "@/federation/validator";
import type { ValidationError } from "zod-validation-error";

export {
    EntityValidator,
    type ValidationError,
    SignatureConstructor,
    SignatureValidator,
    RequestParserHandler,
    type Output,
    ResponseError,
    FederationRequester,
};
