import { beforeAll, beforeEach, describe, expect, test } from "bun:test";
import { SignatureConstructor, SignatureValidator } from "./index";

describe("SignatureValidator", () => {
    let validator: SignatureValidator;
    let privateKey: CryptoKey;
    let publicKey: CryptoKey;
    let body: string;
    let signature: string;
    let date: string;

    beforeAll(async () => {
        const keys = await crypto.subtle.generateKey("Ed25519", true, [
            "sign",
            "verify",
        ]);

        publicKey = keys.publicKey;
        privateKey = keys.privateKey;

        body = JSON.stringify({ key: "value" });

        const headers = await new SignatureConstructor(
            privateKey,
            "https://bob.org/users/6a18f2c3-120e-4949-bda4-2aa4c8264d51",
        ).sign("GET", new URL("https://example.com"), body);

        signature = headers.get("Signature") ?? "";
        date = headers.get("Date") ?? "";
    });

    test("fromStringKey", async () => {
        const base64PublicKey = Buffer.from(
            await crypto.subtle.exportKey("spki", publicKey),
        ).toString("base64");
        validator = await SignatureValidator.fromStringKey(base64PublicKey);
        expect(validator).toBeInstanceOf(SignatureValidator);
    });

    describe("Validator", async () => {
        beforeEach(() => {
            validator = new SignatureValidator(publicKey);
        });

        test("should verify a valid signature", async () => {
            const request = new Request("https://example.com", {
                method: "GET",
                headers: {
                    Signature: signature,
                    Date: date,
                },
                body: body,
            });
            const isValid = await validator.validate(request);
            expect(isValid).toBe(true);
        });

        test("should throw with an invalid signature", async () => {
            const request = new Request("https://example.com", {
                method: "GET",
                headers: {
                    Signature: "invalid",
                    Date: date,
                },
                body: body,
            });

            expect(() => validator.validate(request)).toThrow(TypeError);
        });

        test("should throw with missing headers", async () => {
            const request = new Request("https://example.com", {
                method: "GET",
                headers: {
                    Signature: signature,
                },
                body: body,
            });
            expect(() => validator.validate(request)).toThrow(TypeError);
        });

        test("should throw with missing date", async () => {
            const request = new Request("https://example.com", {
                method: "GET",
                headers: {
                    Signature: signature,
                },
                body: body,
            });
            expect(() => validator.validate(request)).toThrow(TypeError);
        });

        test("should not verify a valid signature with a different body", async () => {
            const request = new Request("https://example.com", {
                method: "GET",
                headers: {
                    Signature: signature,
                    Date: date,
                },
                body: "different",
            });

            const isValid = await validator.validate(request);
            expect(isValid).toBe(false);
        });

        test("should not verify a signature with a wrong key", async () => {
            const request = new Request("https://example.com", {
                method: "GET",
                headers: {
                    Signature:
                        'keyId="badbbadwrong",algorithm="ed25519",headers="(request-target) host date digest",signature="ohno"',
                    Date: date,
                },
                body: body,
            });

            const isValid = await validator.validate(request);
            expect(isValid).toBe(false);
        });
    });
});

describe("SignatureConstructor", () => {
    let ctor: SignatureConstructor;
    let privateKey: CryptoKey;
    let body: string;
    let headers: Headers;

    beforeAll(async () => {
        const keys = await crypto.subtle.generateKey("Ed25519", true, [
            "sign",
            "verify",
        ]);
        privateKey = keys.privateKey;
        body = JSON.stringify({ key: "value" });
    });

    beforeEach(() => {
        ctor = new SignatureConstructor(
            privateKey,
            "https://bob.org/users/6a18f2c3-120e-4949-bda4-2aa4c8264d51",
        );
    });

    test("fromStringKey", async () => {
        const base64PrivateKey = Buffer.from(
            await crypto.subtle.exportKey("pkcs8", privateKey),
        ).toString("base64");
        const constructorFromString = await SignatureConstructor.fromStringKey(
            base64PrivateKey,
            "https://bob.org/users/6a18f2c3-120e-4949-bda4-2aa4c8264d51",
        );
        expect(constructorFromString).toBeInstanceOf(SignatureConstructor);
    });

    describe("Signing", () => {
        test("should correctly sign ", async () => {
            const url = new URL("https://example.com");
            headers = await ctor.sign("GET", url, body);
            expect(headers.get("Signature")).toBeDefined();
            expect(headers.get("Date")).toBeDefined();

            // Check structure of Signature
            const signature = headers.get("Signature") ?? "";
            const parts = signature.split(",");
            expect(parts).toHaveLength(4);

            expect(parts[0].split("=")[0]).toBe("keyId");
            expect(parts[1].split("=")[0]).toBe("algorithm");
            expect(parts[2].split("=")[0]).toBe("headers");
            expect(parts[3].split("=")[0]).toBe("signature");

            expect(parts[0].split("=")[1]).toBe(
                '"https://bob.org/users/6a18f2c3-120e-4949-bda4-2aa4c8264d51"',
            );
            expect(parts[1].split("=")[1]).toBe('"ed25519"');
            expect(parts[2].split("=")[1]).toBe(
                '"(request-target) host date digest"',
            );
            expect(parts[3].split("=")[1]).toBeString();
        });
    });
});
