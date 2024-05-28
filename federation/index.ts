/**
 * @file index.ts
 * @fileoverview Main entrypoint and export for the module
 * @module federation
 * @see module:federation/schemas/base
 */

import type { ValidationError } from "zod-validation-error";
import { SignatureConstructor, SignatureValidator } from "./cryptography";
import { RequestParserHandler } from "./http";
import { EntityValidator } from "./validator";

export {
    EntityValidator,
    type ValidationError,
    SignatureConstructor,
    SignatureValidator,
    RequestParserHandler,
};
