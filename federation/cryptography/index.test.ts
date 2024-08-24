import { beforeAll, beforeEach, describe, expect, test } from "bun:test";
import { SignatureConstructor, SignatureValidator } from "./index";

describe("SignatureValidator", () => {
    let validator: SignatureValidator;
    let privateKey: CryptoKey;
    let publicKey: CryptoKey;
    let body: string;
    let signature: string;
    let nonce: string;

    beforeAll(async () => {
        const keys = await crypto.subtle.generateKey("Ed25519", true, [
            "sign",
            "verify",
        ]);

        publicKey = keys.publicKey;
        privateKey = keys.privateKey;

        body = JSON.stringify({ key: "value" });

        const { headers } = await new SignatureConstructor(
            privateKey,
            "https://bob.org/users/6a18f2c3-120e-4949-bda4-2aa4c8264d51",
        ).sign("GET", new URL("https://example.com"), body);

        signature = headers.get("X-Signature") ?? "";
        nonce = headers.get("X-Nonce") ?? "";
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
                    "X-Signature": signature,
                    "X-Nonce": nonce,
                },
                body: body,
            });
            const isValid = await validator.validate(request);
            expect(isValid).toBe(true);
        });

        test("should return false with an invalid signature", async () => {
            const request = new Request("https://example.com", {
                method: "GET",
                headers: {
                    "X-Signature": "invalid",
                    "X-Nonce": nonce,
                },
                body: body,
            });

            const isValid = await validator.validate(request);

            expect(isValid).toBe(false);
        });

        test("should throw with missing nonce", async () => {
            const request = new Request("https://example.com", {
                method: "GET",
                headers: {
                    "X-Signature": signature,
                },
                body: body,
            });
            expect(() => validator.validate(request)).toThrow(
                "Headers are missing in request: X-Nonce",
            );
        });

        test("should not verify a valid signature with a different body", async () => {
            const request = new Request("https://example.com", {
                method: "GET",
                headers: {
                    "X-Signature": signature,
                    "X-Nonce": nonce,
                },
                body: "different",
            });

            const isValid = await validator.validate(request);
            expect(isValid).toBe(false);
        });

        test("should throw if signature is not base64", async () => {
            const request = new Request("https://example.com", {
                method: "GET",
                headers: {
                    "X-Signature": "thisIsNotbase64OhNo$^ù",
                    "X-Nonce": nonce,
                },
                body: body,
            });

            expect(() => validator.validate(request)).toThrow(
                "Signature is not valid base64",
            );
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
            headers = (await ctor.sign("GET", url, body)).headers;
            expect(headers.get("X-Signature")).toBeDefined();
            expect(headers.get("X-Nonce")).toBeDefined();

            expect(headers.get("X-Nonce")?.length).toBeGreaterThan(10);
            expect(headers.get("X-Signature")?.length).toBeGreaterThan(10);
        });

        test("should correctly sign a Request", async () => {
            const url = new URL("https://example.com");
            const request = new Request(url.toString(), {
                method: "GET",
                body: body,
            });
            const { request: newRequest } = await ctor.sign(request);

            headers = newRequest.headers;
            expect(headers.get("X-Signature")).toBeDefined();
            expect(headers.get("X-Nonce")).toBeDefined();

            expect(await newRequest.text()).toBe(body);
        });

        test("signing should also output a signed string", async () => {
            const url = new URL("https://example.com");
            const { signedString } = await ctor.sign("GET", url, body);
            expect(signedString).toBeString();
            expect(signedString.length).toBeGreaterThan(10);
        });
    });
});
