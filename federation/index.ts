/**
 * @file index.ts
 * @fileoverview Main entrypoint and export for the module
 * @module federation
 * @see module:federation/schemas/base
 */

import type { ValidationError } from "zod-validation-error";
import {
    SignatureConstructor,
    SignatureValidator,
} from "./cryptography/index.ts";
import { RequestParserHandler } from "./http.ts";
import {
    FederationRequester,
    type Output,
    ResponseError,
} from "./requester/index.ts";
import { EntityValidator } from "./validator.ts";

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
