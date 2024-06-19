import { describe, expect, it } from "bun:test";
import { EntityValidator } from "../index";

describe("Package testing", () => {
    it("should not validate a bad Note", () => {
        const badObject = {
            IamBad: "Note",
        };

        const validator = new EntityValidator();

        expect(validator.Note(badObject)).rejects.toThrow();
    });
});
