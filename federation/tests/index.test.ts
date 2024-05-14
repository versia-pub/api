import { describe, expect, it } from "bun:test";
import { Note } from "../schemas/base";

describe("Package testing", () => {
    it("should not validate a bad Note", () => {
        const badObject = {
            IamBad: "Note",
        };

        expect(Note.parseAsync(badObject)).rejects.toThrow();
    });
});
