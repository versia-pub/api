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
    request: Request;
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
 * @param signatureConstructor The constructor to sign requests with.
 * @param globalCatch A function to call when a request fails.
 * @example
 * const requester = new FederationRequester(
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
        private signatureConstructor?: SignatureConstructor,
        public globalCatch: (error: ResponseError) => void = () => {
            // Do nothing by default
        },
    ) {}

    /**
     * Get the user's profile link from their username.
     * @param username The username to get the profile link for.
     * @param hostname The hostname to get the profile link for (defaults to the server's hostname).
     * @param contentType The content type of the link to get (defaults to "application/json").
     * @param serverUrl The URL of the server to query for WebFinger. Useful for bridges. Defaults to hostname.
     * @returns The user's profile link.
     * @throws If the request fails or the response is invalid.
     * @example
     * const profileLink = await requester.webFinger("testuser", "example.com");
     *
     * console.log(profileLink);
     * // => "https://example.com/users/1"
     */
    public async webFinger(
        username: string,
        hostname: string,
        contentType = "application/json",
        serverUrl = `https://${hostname}`,
    ): Promise<string> {
        const result = await this.get<User>(
            new URL(
                `/.well-known/webfinger?${new URLSearchParams({
                    resource: `acct:${username}@${hostname}`,
                })}`,
                serverUrl,
            ),
        );

        // Validate the response
        const { error, success, data } = await WebFingerSchema.safeParseAsync(
            result.data,
        );

        if (!success) {
            throw fromZodError(error);
        }

        // Get the first link with a rel of "self"
        const selfLink = data.links?.find(
            (link) => link.rel === "self" && link.type === contentType,
        );

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
        const result = await fetch(request).catch((e) => {
            // If using https, try and use http
            const url = new URL(request.url);
            if (url.protocol === "https") {
                url.protocol = "http";
                return fetch(url, request);
            }

            throw e;
        });
        const isJson = result.headers.get("Content-Type")?.includes("json");

        if (!result.ok) {
            const error = isJson
                ? await result.clone().json()
                : await result.clone().text();
            throw new ResponseError(
                {
                    data: error,
                    ok: false,
                    raw: result,
                    request,
                },
                `Request failed (${result.status}): ${
                    error.error || error.message || result.statusText
                }`,
            );
        }

        return {
            data: isJson
                ? await result.clone().json()
                : (await result.clone().text()) || null,
            ok: true,
            raw: result,
            request,
        };
    }

    private async constructRequest(
        url: string | URL,
        method: HttpVerb,
        body?: object | FormData,
        extra?: RequestInit,
    ): Promise<Request> {
        const headers = new Headers({
            Accept: "application/json",
            "User-Agent": DEFAULT_UA,
            ...(extra?.headers instanceof Headers
                ? Object.fromEntries(extra.headers.entries())
                : extra?.headers),
        });

        if (body) {
            headers.set("Content-Type", "application/json; charset=utf-8");
        }

        const request = new Request(url, {
            method,
            headers,
            body: body
                ? body instanceof FormData
                    ? body
                    : JSON.stringify(body)
                : undefined,
            ...extra,
        });

        return this.signatureConstructor
            ? (await this.signatureConstructor.sign(request)).request
            : request;
    }

    /**
     * Make a GET request to a URL.
     * @param url The path to make the request to.
     * @param extra Any extra options to pass to the fetch function.
     * @returns The data returned by the request.
     */
    public async get<ReturnType>(
        url: string | URL,
        extra?: RequestInit,
    ): Promise<Output<ReturnType>> {
        return this.request<ReturnType>(
            await this.constructRequest(url, "GET", undefined, extra),
        ).catch((e) => {
            this.globalCatch(e);
            throw e;
        });
    }

    /**
     * Make a POST request to a URL.
     * @param url The path to make the request to.
     * @param body The body of the request.
     * @param extra Any extra options to pass to the fetch function.
     * @returns The data returned by the request.
     */
    public async post<ReturnType>(
        url: string | URL,
        body: object,
        extra?: RequestInit,
    ): Promise<Output<ReturnType>> {
        return this.request<ReturnType>(
            await this.constructRequest(url, "POST", body, extra),
        ).catch((e) => {
            this.globalCatch(e);
            throw e;
        });
    }
}
