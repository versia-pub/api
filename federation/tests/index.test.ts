import { describe, expect, it } from "bun:test";
import type { ValidationError } from "zod-validation-error";
import { EntityValidator } from "../index";

describe("Package testing", () => {
    it("should not validate a bad Note", async () => {
        const badObject = {
            IamBad: "Note",
        };

        const validator = new EntityValidator();

        expect(validator.Note(badObject)).rejects.toThrow();
    });
});
