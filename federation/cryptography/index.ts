/**
 * Represents an HTTP verb.
 */
type HttpVerb =
    | "GET"
    | "POST"
    | "PUT"
    | "DELETE"
    | "PATCH"
    | "OPTIONS"
    | "HEAD";

const checkEvironmentSupport = async () => {
    // Check if WebCrypto is supported
    if (!globalThis.crypto || !globalThis.crypto.subtle) {
        throw new Error("WebCrypto is not supported in this environment");
    }

    // No way to check if Ed25519 is supported, so just return true
    return true;
};

/**
 * Validates the signature of a request.
 * @see https://lysand.org/security/signing
 */
export class SignatureValidator {
    /**
     * Creates a new instance of SignatureValidator.
     * @param public_key The public key used for signature verification.
     */
    constructor(private public_key: CryptoKey) {
        checkEvironmentSupport();
    }

    /**
     * Creates a SignatureValidator instance from a base64-encoded public key.
     * @param base64PublicKey The base64-encoded public key.
     * @returns A Promise that resolves to a SignatureValidator instance.
     * @example
     * const publicKey = "base64PublicKey";
     * const validator = await SignatureValidator.fromStringKey(publicKey);
     */
    static async fromStringKey(
        base64PublicKey: string,
    ): Promise<SignatureValidator> {
        return new SignatureValidator(
            await crypto.subtle.importKey(
                "spki",
                Buffer.from(base64PublicKey, "base64"),
                "Ed25519",
                false,
                ["verify"],
            ),
        );
    }

    /**
     * Validates the signature of a request.
     * @param request The request object to validate.
     * @returns A Promise that resolves to a boolean indicating whether the signature is valid.
     * @throws TypeError if any required headers are missing in the request.
     * @example
     * const request = new Request(); // Should be a Request from a Lysand federation request
     * const isValid = await validator.validate(request);
     */
    async validate(request: Request): Promise<boolean>;

    /**
     * Validates the signature of a request.
     * @param signature The signature string.
     * @param date The date that the request was signed.
     * @param method The HTTP verb.
     * @param url The URL object.
     * @param body The request body.
     * @returns A Promise that resolves to a boolean indicating whether the signature is valid.
     * @throws TypeError if any required parameters are missing or empty.
     * @example
     * const signature = "keyId=\"https://example.com\",algorithm=\"ed25519\",headers=\"(request-target) host date digest\",signature=\"base64Signature\"";
     * const date = new Date("2021-01-01T00:00:00.000Z");
     * const method = "GET";
     * const url = new URL("https://example.com/users/ff54ee40-2ce9-4d2e-86ac-3cd06a1e1480");
     * const body = "{ ... }";
     * const isValid = await validator.validate(signature, date, method, url, body);
     */
    async validate(
        signature: string,
        date: Date,
        method: HttpVerb,
        url: URL,
        body: string,
    ): Promise<boolean>;

    async validate(
        requestOrSignature: Request | string,
        date?: Date,
        method?: HttpVerb,
        url?: URL,
        body?: string,
    ): Promise<boolean> {
        if (requestOrSignature instanceof Request) {
            const signature = requestOrSignature.headers.get("Signature");
            const date = requestOrSignature.headers.get("Date");
            const url = new URL(requestOrSignature.url);
            const body = await requestOrSignature.text();
            const method = requestOrSignature.method as HttpVerb;

            const missingHeaders = [
                !signature && "Signature",
                !date && "Date",
                !method && "Method",
                !url && "URL",
                !body && "Body",
            ].filter(Boolean);

            // Check if all headers are present
            if (!signature || !date || !method || !url || !body) {
                // Say which headers are missing
                throw TypeError(
                    `Headers are missing in request: ${missingHeaders.join(
                        ", ",
                    )}`,
                );
            }

            if (signature.split("signature=").length < 2) {
                throw TypeError(
                    "Invalid Signature header (wrong format or missing signature)",
                );
            }

            const extractedSignature = signature
                .split("signature=")[1]
                .replace(/"/g, "");

            if (!extractedSignature) {
                throw TypeError(
                    "Invalid Signature header (wrong format or missing signature)",
                );
            }

            return this.validate(
                extractedSignature,
                new Date(date),
                method as HttpVerb,
                url,
                body,
            );
        }

        if (!date || !method || !url || !body) {
            throw TypeError(
                "Missing or empty required parameters: date, method, url or body",
            );
        }

        const signature = requestOrSignature;

        const digest = await crypto.subtle.digest(
            "SHA-256",
            new TextEncoder().encode(body),
        );

        const expectedSignedString =
            `(request-target): ${method.toLowerCase()} ${url.pathname}\n` +
            `host: ${url.host}\n` +
            `date: ${date.toISOString()}\n` +
            `digest: SHA-256=${Buffer.from(new Uint8Array(digest)).toString(
                "base64",
            )}\n`;

        // Check if signed string is valid
        const isValid = await crypto.subtle.verify(
            "Ed25519",
            this.public_key,
            Buffer.from(signature, "base64"),
            new TextEncoder().encode(expectedSignedString),
        );

        return isValid;
    }
}

/**
 * Constructs a signature for a request.
 * @see https://lysand.org/security/signing
 */
export class SignatureConstructor {
    /**
     * Creates a new instance of SignatureConstructor.
     * @param privateKey The private key used for signature generation.
     */
    constructor(
        private privateKey: CryptoKey,
        private keyId: string,
    ) {
        checkEvironmentSupport();
    }

    /**
     * Creates a SignatureConstructor instance from a base64-encoded private key.
     * @param base64PrivateKey The base64-encoded private key.
     * @returns A Promise that resolves to a SignatureConstructor instance.
     * @example
     * const privateKey = "base64PrivateKey";
     * const constructor = await SignatureConstructor.fromStringKey(privateKey);
     */
    static async fromStringKey(
        base64PrivateKey: string,
        keyId: string,
    ): Promise<SignatureConstructor> {
        return new SignatureConstructor(
            await crypto.subtle.importKey(
                "pkcs8",
                Buffer.from(base64PrivateKey, "base64"),
                "Ed25519",
                false,
                ["sign"],
            ),
            keyId,
        );
    }

    /**
     * Signs a request.
     * @param request The request object to sign.
     * @returns A Promise that resolves to the signed request.
     * @example
     * const request = new Request();
     * const signedRequest = await constructor.sign(request);
     */
    async sign(request: Request): Promise<Request>;

    /**
     * Signs a request.
     * @param method The HTTP verb.
     * @param url The URL object.
     * @param body The request body.
     * @param headers The request headers.
     * @returns A Promise that resolves to the signed headers.
     * @throws TypeError if any required parameters are missing or empty.
     * @example
     * const method = "GET";
     * const url = new URL("https://example.com");
     * const body = "request body";
     * const headers = new Headers();
     * const signedHeaders = await constructor.sign(method, url, body, headers);
     */
    async sign(
        method: HttpVerb,
        url: URL,
        body: string,
        headers?: Headers,
    ): Promise<Headers>;

    async sign(
        requestOrMethod: Request | HttpVerb,
        url?: URL,
        body?: string,
        headers: Headers = new Headers(),
    ): Promise<Request | Headers> {
        if (requestOrMethod instanceof Request) {
            const headers = await this.sign(
                requestOrMethod.method as HttpVerb,
                new URL(requestOrMethod.url),
                await requestOrMethod.text(),
                requestOrMethod.headers,
            );

            const request = requestOrMethod.clone();

            request.headers.set("Date", headers.get("Date") ?? "");
            request.headers.set("Signature", headers.get("Signature") ?? "");

            return request;
        }

        if (!url || !body || !headers) {
            throw TypeError(
                "Missing or empty required parameters: url, body or headers",
            );
        }

        const date = new Date().toISOString();

        const digest = await crypto.subtle.digest(
            "SHA-256",
            new TextEncoder().encode(body),
        );

        const signature = await crypto.subtle.sign(
            "Ed25519",
            this.privateKey,
            new TextEncoder().encode(
                `(request-target): ${requestOrMethod.toLowerCase()} ${
                    url.pathname
                }\n` +
                    `host: ${url.host}\n` +
                    `date: ${date}\n` +
                    `digest: SHA-256=${Buffer.from(
                        new Uint8Array(digest),
                    ).toString("base64")}\n`,
            ),
        );

        const signatureBase64 = Buffer.from(new Uint8Array(signature)).toString(
            "base64",
        );

        headers.set("Date", date);
        headers.set(
            "Signature",
            `keyId="${this.keyId}",algorithm="ed25519",headers="(request-target) host date digest",signature="${signatureBase64}"`,
        );

        return headers;
    }
}
