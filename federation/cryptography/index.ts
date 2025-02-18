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

const base64ToArrayBuffer = (base64: string) =>
    Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));

const arrayBufferToBase64 = (arrayBuffer: ArrayBuffer) =>
    btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

const checkEvironmentSupport = () => {
    // Check if WebCrypto is supported
    if (!globalThis.crypto?.subtle) {
        throw new Error("WebCrypto is not supported in this environment");
    }

    // No way to check if Ed25519 is supported, so just return true
    return true;
};

/**
 * Validates the signature of a request.
 * @see https://versia.pub/signatures
 */
export class SignatureValidator {
    /**
     * Creates a new instance of SignatureValidator.
     * @param publicKey The public key used for signature verification.
     */
    constructor(private publicKey: CryptoKey) {
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
                base64ToArrayBuffer(base64PublicKey),
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
     * const request = new Request(); // Should be a Request from a Versia federation request
     * const isValid = await validator.validate(request);
     */
    async validate(request: Request): Promise<boolean>;

    /**
     * Validates the signature of a request.
     * @param signature The signature string.
     * @param timestamp Signature timestamp.
     * @param method The HTTP verb.
     * @param url The URL object.
     * @param body The request body.
     * @returns A Promise that resolves to a boolean indicating whether the signature is valid.
     * @throws TypeError if any required parameters are missing or empty.
     * @example
     * const signature = "k4QNt5Grl40KK8orIdiaq118Z+P5pa6vIeArq55wsvfL7wNy4cE3f2fhsGcpZql+PStm+x2ZjZIhudrAC/32Cg==";
     * const date = new Date(1549312452000)
     * const method = "GET";
     * const url = new URL("https://example.com/users/ff54ee40-2ce9-4d2e-86ac-3cd06a1e1480");
     * const body = "{ ... }";
     * const isValid = await validator.validate(signature, date, method, url, body);
     */
    async validate(
        signature: string,
        timestamp: Date,
        method: HttpVerb,
        url: URL,
        body: string,
    ): Promise<boolean>;

    async validate(
        requestOrSignature: Request | string,
        timestamp?: Date,
        method?: HttpVerb,
        url?: URL,
        body?: string,
    ): Promise<boolean> {
        if (requestOrSignature instanceof Request) {
            const signature =
                requestOrSignature.headers.get("Versia-Signature");
            const timestampHeader =
                requestOrSignature.headers.get("Versia-Signed-At");
            const timestamp = new Date(Number(timestampHeader) * 1000);
            const url = new URL(requestOrSignature.url);
            const body = await requestOrSignature.text();
            const method = requestOrSignature.method as HttpVerb;

            const missingHeaders = [
                !signature && "Versia-Signature",
                !timestampHeader && "Versia-Signed-At",
            ].filter(Boolean);

            // Check if all headers are present
            if (!(signature && timestampHeader && method && url && body)) {
                // Say which headers are missing
                throw new TypeError(
                    `Headers are missing in request: ${missingHeaders.join(
                        ", ",
                    )}`,
                );
            }

            return this.validate(signature, timestamp, method, url, body);
        }

        if (!(timestamp && method && url && body)) {
            throw new TypeError(
                "Missing or empty required parameters: timestamp, method, url or body",
            );
        }

        const signature = requestOrSignature;

        // Check if signature is base64
        try {
            atob(signature);
        } catch {
            throw new TypeError("Signature is not valid base64");
        }

        const digest = await crypto.subtle.digest(
            "SHA-256",
            new TextEncoder().encode(body),
        );

        const expectedSignedString = `${method.toLowerCase()} ${encodeURI(url.pathname)} ${timestamp.getTime() / 1000} ${arrayBufferToBase64(digest)}`;

        // Check if signed string is valid
        const isValid = await crypto.subtle.verify(
            "Ed25519",
            this.publicKey,
            base64ToArrayBuffer(signature),
            new TextEncoder().encode(expectedSignedString),
        );

        return isValid;
    }
}

/**
 * Constructs a signature for a request.
 * @see https://versia.pub/signatures
 */
export class SignatureConstructor {
    /**
     * Creates a new instance of SignatureConstructor.
     * @param privateKey The private key used for signature generation.
     * @param authorUri URI of the User who is signing the request.
     * @example
     * const privateKey = // CryptoKey
     * const authorUri = "https://example.com/users/6a18f2c3-120e-4949-bda4-2aa4c8264d51";
     * const constructor = new SignatureConstructor(privateKey, authorUri);
     */
    constructor(
        private privateKey: CryptoKey,
        private authorUri: URL | string,
    ) {
        checkEvironmentSupport();
    }

    /**
     * Creates a SignatureConstructor instance from a base64-encoded private key.
     * @param base64PrivateKey The base64-encoded private key.
     * @param authorUri URI of the User who is signing the request.
     * @returns A Promise that resolves to a SignatureConstructor instance.
     * @example
     * const privateKey = "base64PrivateKey";
     * const authorUri = "https://example.com/users/6a18f2c3-120e-4949-bda4-2aa4c8264d51";
     * const constructor = await SignatureConstructor.fromStringKey(privateKey, authorUri);
     */
    static async fromStringKey(
        base64PrivateKey: string,
        authorUri: URL | string,
    ): Promise<SignatureConstructor> {
        return new SignatureConstructor(
            await crypto.subtle.importKey(
                "pkcs8",
                base64ToArrayBuffer(base64PrivateKey),
                "Ed25519",
                false,
                ["sign"],
            ),
            authorUri,
        );
    }

    /**
     * Signs a request.
     * @param request The request object to sign.
     * @returns A Promise that resolves to the signed request, plus the signed string.
     * @example
     * const request = new Request();
     * const { request: signedRequest } = await constructor.sign(request);
     */
    async sign(request: Request): Promise<{
        request: Request;
        signedString: string;
    }>;

    /**
     * Signs a request.
     * @param method The HTTP verb.
     * @param url The URL object.
     * @param body The request body.
     * @param headers The request headers.
     * @param timestamp The signature timestamp (optional).
     * @returns A Promise that resolves to the signed headers, and the signed string.
     * @throws TypeError if any required parameters are missing or empty.
     * @example
     * const method = "GET";
     * const url = new URL("https://example.com");
     * const body = "request body";
     * const { headers: signedHeaders } = await constructor.sign(method, url, body);
     */
    async sign(
        method: HttpVerb,
        url: URL,
        body?: string,
        headers?: Headers,
        timestamp?: Date,
    ): Promise<{
        headers: Headers;
        signedString: string;
    }>;

    async sign(
        requestOrMethod: Request | HttpVerb,
        url?: URL,
        body?: string,
        headers: Headers = new Headers(),
        timestamp?: Date,
    ): Promise<
        | {
              headers: Headers;
              signedString: string;
          }
        | {
              request: Request;
              signedString: string;
          }
    > {
        if (requestOrMethod instanceof Request) {
            const request = requestOrMethod.clone();
            const signedAt = requestOrMethod.headers.get("Versia-Signed-At");

            const { headers, signedString } = await this.sign(
                requestOrMethod.method as HttpVerb,
                new URL(requestOrMethod.url),
                await requestOrMethod.text(),
                requestOrMethod.headers,
                signedAt ? new Date(Number(signedAt) * 1000) : undefined,
            );

            request.headers.set(
                "Versia-Signed-At",
                headers.get("Versia-Signed-At") ?? "",
            );
            request.headers.set(
                "Versia-Signature",
                headers.get("Versia-Signature") ?? "",
            );

            return { request, signedString };
        }

        if (!(url && headers)) {
            throw new TypeError(
                "Missing or empty required parameters: url, body or headers",
            );
        }

        const finalTimestamp = timestamp || new Date();

        const digest = await crypto.subtle.digest(
            "SHA-256",
            new TextEncoder().encode(body ?? ""),
        );

        const signedString = `${requestOrMethod.toLowerCase()} ${encodeURI(
            url.pathname,
        )} ${finalTimestamp.getTime() / 1000} ${arrayBufferToBase64(digest)}`;

        const signature = await crypto.subtle.sign(
            "Ed25519",
            this.privateKey,
            new TextEncoder().encode(signedString),
        );

        const signatureBase64 = arrayBufferToBase64(signature);

        headers.set(
            "Versia-Signed-At",
            String(finalTimestamp.getTime() / 1000),
        );
        headers.set("Versia-Signature", signatureBase64);
        headers.set("Versia-Signed-By", this.authorUri.toString());

        return {
            headers,
            signedString,
        };
    }
}
