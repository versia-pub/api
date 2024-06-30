import { fromZodError } from "zod-validation-error";
import type { SignatureConstructor } from "../cryptography";
import type { User } from "../schemas";
import { WebFingerSchema } from "../schemas/webfinger";
import { DEFAULT_UA } from "./constants";

type HttpVerb = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

/**
 * Output of a request. Contains the data and headers.
 * @template ReturnType The type of the data returned by the request.
 */
export interface Output<ReturnType> {
    data: ReturnType;
    ok: boolean;
    raw: Response;
}

/**
 * Wrapper around Error, useful for detecting if an error
 * is due to a failed request.
 *
 * Throws if the request returns invalid or unexpected data.
 */
export class ResponseError<
    ReturnType = {
        error?: string;
    },
> extends Error {
    constructor(
        public response: Output<ReturnType>,
        message: string,
    ) {
        super(message);
        this.name = "ResponseError";
    }
}

/**
 * Class to handle requests to a remote server.
 * @param serverUrl The URL of the server to send requests to.
 * @param signatureConstructor The constructor to sign requests with.
 * @param globalCatch A function to call when a request fails.
 * @example
 * const requester = new FederationRequester(
 *     new URL("https://example.com"),
 *     new SignatureConstructor(privateKey, keyId),
 * );
 *
 * const { data, ok } = await requester.get<User>("/users/1");
 *
 * if (!ok) {
 *     console.error(data);
 * }
 *
 * console.log(data);
 */
export class FederationRequester {
    constructor(
        private serverUrl: URL,
        private signatureConstructor: SignatureConstructor,
        public globalCatch: (error: ResponseError) => void = () => {
            // Do nothing by default
        },
    ) {}

    get url(): URL {
        return this.serverUrl;
    }

    /**
     * Get the user's profile link from their username.
     * @param username The username to get the profile link for.
     * @returns The user's profile link.
     * @throws If the request fails or the response is invalid.
     * @example
     * const profileLink = await requester.webFinger("example");
     *
     * console.log(profileLink);
     * // => "https://example.com/users/1"
     */
    public async webFinger(username: string): Promise<string> {
        const result = await this.get<User>(
            `/.well-known/webfinger?${new URLSearchParams({
                resource: `acct:${username}@${this.serverUrl.hostname}`,
            })}`,
        );

        // Validate the response
        const { error, success, data } = await WebFingerSchema.safeParseAsync(
            result.data,
        );

        if (!success) {
            throw fromZodError(error);
        }

        // Get the first link with a rel of "self"
        const selfLink = data.links?.find((link) => link.rel === "self");

        if (!selfLink) {
            throw new Error(
                "No link with rel=self found in WebFinger response",
            );
        }

        if (!selfLink.href) {
            throw new Error(
                "Link with rel=self has no href in WebFinger response",
            );
        }

        // Return user's profile link
        return selfLink.href;
    }

    private async request<ReturnType>(
        request: Request,
    ): Promise<Output<ReturnType>> {
        const result = await fetch(request);
        const isJson = result.headers.get("Content-Type")?.includes("json");

        if (!result.ok) {
            const error = isJson ? await result.json() : await result.text();
            throw new ResponseError(
                {
                    data: error,
                    ok: false,
                    raw: result,
                },
                `Request failed (${result.status}): ${
                    error.error || error.message || result.statusText
                }`,
            );
        }

        return {
            data: isJson ? await result.json() : (await result.text()) || null,
            ok: true,
            raw: result,
        };
    }

    private async constructRequest(
        path: string,
        method: HttpVerb,
        body?: object | FormData,
        extra?: RequestInit,
    ): Promise<Request> {
        const headers = new Headers({
            "User-Agent": DEFAULT_UA,
        });

        if (body) {
            headers.set("Content-Type", "application/json; charset=utf-8");
        }

        for (const [key, value] of Object.entries(extra?.headers || {})) {
            headers.set(key, value);
        }

        headers.set("Accept", "application/json");

        const request = new Request(new URL(path, this.serverUrl).toString(), {
            method,
            headers,
            body: body
                ? body instanceof FormData
                    ? body
                    : JSON.stringify(body)
                : undefined,
            ...extra,
        });

        return (await this.signatureConstructor.sign(request)).request;
    }

    public async get<ReturnType>(
        path: string,
        extra?: RequestInit,
    ): Promise<Output<ReturnType>> {
        return this.request<ReturnType>(
            await this.constructRequest(path, "GET", undefined, extra),
        ).catch((e) => {
            this.globalCatch(e);
            throw e;
        });
    }

    public async post<ReturnType>(
        path: string,
        body: object,
        extra?: RequestInit,
    ): Promise<Output<ReturnType>> {
        return this.request<ReturnType>(
            await this.constructRequest(path, "POST", body, extra),
        ).catch((e) => {
            this.globalCatch(e);
            throw e;
        });
    }
}
